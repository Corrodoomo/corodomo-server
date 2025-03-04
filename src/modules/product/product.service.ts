import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from '@common/dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@common/schemas/product-schema';
import { Model } from 'mongoose';
import { StorageService } from '@modules/storage/storage.service';
import { PaginateDto } from '@common/dtos/paginate.dto';
import { InsertResult, DeleteResult, UpdateResult } from '@common/models/crud-result';
import { UpdateProductDto } from '@common/dtos/update-product.dto';
import { ProductPaginateDto } from '@common/dtos/product-paginate.dto';
import { Types } from 'mongoose';
import { Customer } from '@common/schemas/customer-schema';
import { Payment } from '@common/schemas/payment.schema';
import { PaymentProductsDto } from '@common/dtos/payment-products.dto';


@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private ProductSchema: Model<Product>,
		@InjectModel(Customer.name) private CustomerSchema: Model<Customer>,
		@InjectModel(Payment.name) private PaymentSchema: Model<Payment>,
		private storageService: StorageService
	) { }

	/**
	 * Insert a list of products
	 * @param id 
	 * @param products 
	 * @returns 
	 */
	async create(id: string, product: ProductDto, files: Express.Multer.File[]): Promise<InsertResult<any>> {
		const pictures: (string | Express.Multer.File)[] = ["", "", "", ""];

		files.forEach((file, index) => {
			if (file.fieldname.replace('picture', '') === index.toString()) {
				pictures[index] = file;
			}
		});


		for (const index in pictures) {
			const picture = pictures[index];
			if (picture) {
				pictures[index] = await this.storageService.product().upload(
					picture as Express.Multer.File
				);
			}
		}

		const addedProduct = await this.ProductSchema.create({
			code: product.code,
			title: product.title,
			description: product.description || '',
			price: product.price,
			category: product.category,
			created_by: id,
			pictures: pictures as string[],
		});

		return {
			inserted: 1,
			items: [
				{
					id: addedProduct['_id']?.toString(),
					createdOn: addedProduct.created_on,
					updatedOn: addedProduct.updated_on,
					code: product.code,
					title: product.title,
					description: product.description || '',
					price: product.price,
					category: product.category,
					created_by: id,
					pictures: pictures as string[],
				}
			],
		};
	}

	/**
	 * Insert a list of products
	 * @param id 
	 * @param products 
	 * @returns 
	 */
	async update(id: string, productId: string, product: UpdateProductDto, files: Express.Multer.File[]): Promise<UpdateResult<unknown>> {
		const myProduct = await this.ProductSchema.findById(productId);

		if (myProduct && id === myProduct.created_by) {
			for (const index in files) {
				const file = files[index];
				const pictureIndex = file.fieldname.replace('picture', '');
				if (pictureIndex) {
					const url = await this.storageService.product().upload(
						file
					);
					myProduct.pictures[pictureIndex] = url
				}
			}

			if (product.deleted) {
				for (const index of product.deleted) {
					const picture = myProduct.pictures[index];
					await this.storageService.deleteFromUrl(picture)
					myProduct.pictures[index] = '';
				}
			}


			for (const key in product) {
				if (product[key]) myProduct[key] = product[key];
			}
			myProduct.updated_on = new Date();

			await myProduct.save();

			return {
				updated: 1,
				items: [
					{
						updatedOn: myProduct?.updated_on
					}
				],
			};
		}

		throw new BadRequestException();
	}

	/**
	 * Delete a list of products
	 * @param id 
	 * @param products 
	 * @returns 
	 */
	async delete(ids: string[]): Promise<DeleteResult> {
		const products = await this.ProductSchema.find({ _id: { $in: ids } });
		const deletedResult = await this.ProductSchema.deleteMany({ _id: { $in: ids } });

		for (const product of products) {
			for (const picture of product.pictures) {
				await this.storageService.deleteFromUrl(picture)
			}
		}

		return {
			deleted: deletedResult.deletedCount,
		};
	}

	/**
	 * Filter a list of products
	 * @param query
	 * @returns
	 */
	async filterTableData(pagination: PaginateDto): Promise<PaginatedResult<Product>> {
		const { page, limit, keyword } = pagination;

		const filters = [
			{
				$project: {
					_id: 0,
					id: { $toString: '$_id' },
					code: "$code",
					title: "$title",
					description: "$description",
					price: "$price",
					pictures: "$pictures",
					category: "$category",
					createdOn: "$created_on",
					updatedOn: "$updated_on",
				},
			},
			{
				$match: {
					$or: [
						{ _id: { $regex: keyword, $options: 'i' } },
						{ title: { $regex: keyword, $options: 'i' } },
						{ description: { $regex: keyword, $options: 'i' } },
						{
							$expr: {
								$regexMatch: {
									input: { $toString: "$price" },
									regex: keyword,
									options: 'i'
								}
							}
						},
						{ category: { $regex: keyword, $options: 'i' } },
					]
				}
			},
		];

		const items = await this.ProductSchema
			.aggregate(filters)
			.skip(page * limit)
			.limit(limit)
			.exec();

		const [summary] = await this.ProductSchema
			.aggregate([...filters, { $count: 'total' }])
			.exec();

		return {
			items,
			page,
			limit,
			total: summary.total
		}
	}

	/**
	 * Filter a list of products
	 * @param query
	 * @returns
	 */
	async filter(pagination: ProductPaginateDto): Promise<PaginatedResult<Product>> {
		await this.ProductSchema.updateOne({}, { $set: { favorites: [] } })
		const { page, limit, keyword, category, sort } = pagination;
		const [_, order] = sort.split(':');

		const filters: any[] = [
			{
				$project: {
					_id: 0,
					id: { $toString: '$_id' },
					title: "$title",
					price: "$price",
					discount: "$discount",
					pictures: "$pictures",
					category: "$category",
					favoriteScore: "$favorite_score",
				},
			},
			{
				$match: {
					$and: [
						{
							$or: [
								{ title: { $regex: keyword, $options: 'i' } },
								{ description: { $regex: keyword, $options: 'i' } }
							]
						},
						category ? {
							$expr: {
								$eq: [{ $strcasecmp: ["$category", category] }, 0]
							}
						} : {}
					],
				}
			},
		];

		if (order && order !== '0') {
			filters.push({
				$sort: {
					price: parseInt(order)
				}
			})
		}

		const items = await this.ProductSchema
			.aggregate(filters)
			.skip(page * limit)
			.limit(limit)
			.exec();

		const totalResult = await this.ProductSchema
			.aggregate([
				...filters,
				{ $count: 'total' }
			])
			.exec();

		return {
			items,
			page,
			limit,
			total: totalResult?.[0]?.total
		}
	}

	/**
	 * Get detail products
	 * @param query
	 * @returns
	 */
	async get(id: string) {
		const product = await this.ProductSchema.aggregate([
			{ $match: { _id: new Types.ObjectId(id) } }, // Tìm document theo ID
			{
				$project: {
					_id: 0,
					id: { $toString: '$_id' },
					code: "$code",
					title: "$title",
					description: "$description",
					price: "$price",
					discount: "$discount",
					pictures: "$pictures",
					category: "$category",
					favoriteScore: "$favorite_score",
					favoriteCount: {
						$size: "$favorites"
					}
				}
			},
			{ $limit: 1 }
		]).exec();

		if (!product?.[0]) return new BadRequestException();

		return product[0];
	}

	/**
	 * Rate product
	 * @param query
	 * @returns
	 */
	async rate(productId: string, auth0Id: string, score: number): Promise<UpdateResult<{ favoriteScore: number }>> {
		const customer = await this.CustomerSchema
			.findOne({
				auth0_id: auth0Id
			})
			.select("_id")
			.lean()
			.exec()



		const product = await this.ProductSchema
			.findById(productId)
			.select("favorite_score favorites")
			.exec();


		if (!customer || !product) throw new BadRequestException();


		let sum: number = 0;
		let existedIndex = -1;
		product.favorites.forEach((favorite, index) => {
			if (favorite.customer_id.toString() === customer._id.toString()) {
				existedIndex = index;
				sum += score;
			}
			else {
				sum += favorite.score;
			}
		});

		if (existedIndex >= 0) {
			product.favorites[existedIndex].score = score;
			product.favorite_score = parseFloat((sum / product.favorites.length).toFixed(1));
		}
		else {
			product.favorite_score = parseFloat(((sum + score) / (product.favorites.length + 1)).toFixed(1));
			product.favorites.push({
				customer_id: customer._id as Types.ObjectId,
				score,
			});
		}

		await product.save()

		return {
			updated: 1,
			items: [
				{
					favoriteScore: sum
				}
			]
		};
	}

	async pay(auth0Id: string, order: PaymentProductsDto): Promise<InsertResult> {
		console.log('13123', auth0Id, order);
		await this.PaymentSchema.create({
			address: order.address,
			orders: order.products,
			created_by: auth0Id,
		});

		return {
			inserted: 1,
		};
	}
}
