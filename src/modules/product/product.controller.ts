import { BadRequestException, Body, Param, Query, Request, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from '@modules/product/product.service';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Get, Post, Delete, Put } from '@common/decorators/http.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SystemRole } from '@common/constants';
import { Product } from '@common/schemas/product-schema';
import { InsertResult, UpdateResult } from '@common/models/crud-result';
import { ProductDto } from '../../common/dtos/product.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginateDto } from '@common/dtos/paginate.dto';
import { IdsDto } from '@common/dtos/ids.dto';
import { UpdateProductDto } from '@common/dtos/update-product.dto';
import { ProductPaginateDto } from '@common/dtos/product-paginate.dto';
import { IdDto } from '@common/dtos/id.dto';
import { ReviewProductDto } from '@common/dtos/review-product.dto';
import { PaymentProductsDto } from '@common/dtos/payment-products.dto';

@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) { }

	@Get('/table')
	@ApiOperation({ summary: 'Get list of products for table' })
	@ApiOkResponse({
		type: Product
	})
	@Roles([SystemRole.ADMIN])
	getTableData(@Query() query: PaginateDto) {
		return this.productService.filterTableData(query);
	}

	@Post('/payment')
	@ApiOperation({ summary: 'Payment' })
	@Roles([SystemRole.CUSTOMER])
	pay(@Body() body: PaymentProductsDto, @Request() request: NestRequest,) {
		return this.productService.pay(request.user.sub, body);
	}

	@Get('/', { auth: false })
	@ApiOperation({ summary: 'Get list of products for table' })
	@ApiOkResponse({
		type: Product
	})
	get(@Query() query: ProductPaginateDto) {
		return this.productService.filter(query);
	}



	@Get(':id', { auth: false })
	@ApiOperation({ summary: 'Get list of products for table' })
	@ApiOkResponse({
		type: Product
	})
	async getDetail(@Param() param: IdDto) {
		return this.productService.get(param.id);
	}



	@Post()
	@ApiOperation({ summary: 'Create list of products' })
	@ApiBody({
		type: ProductDto,
		required: true
	})
	@ApiOkResponse({
		type: InsertResult
	})
	@Roles([SystemRole.ADMIN])
	@UseInterceptors(AnyFilesInterceptor())
	async post(
		@Body() body: { product: string },
		@UploadedFiles() files: Express.Multer.File[],
		@Request() request: NestRequest,
	) {
		const product = plainToClass(ProductDto, JSON.parse(body.product));
		const errors = await validate(product);
		if (errors.length) throw new BadRequestException();

		return this.productService.create(request.user.sub, product, files);
	}



	@Put(':id')
	@ApiOperation({ summary: 'Create list of products' })
	@ApiBody({
		type: UpdateProductDto,
		required: true
	})
	@ApiOkResponse({
		type: UpdateResult
	})
	@Roles([SystemRole.ADMIN])
	@UseInterceptors(AnyFilesInterceptor())
	async put(
		@Body() body: { product: string },
		@Param('id') productId: string,
		@UploadedFiles() files: Express.Multer.File[],
		@Request() request: NestRequest,
	) {
		const product = plainToClass(UpdateProductDto, JSON.parse(body.product));
		const errors = await validate(product);
		if (errors.length) throw new BadRequestException();

		return this.productService.update(request.user.sub, productId, product, files);
	}

	@Put(':id/rate')
	@ApiOperation({ summary: 'Create list of products' })
	@ApiBody({
		type: ReviewProductDto,
		required: true
	})
	@ApiOkResponse({
		type: UpdateResult
	})
	@Roles([SystemRole.CUSTOMER])
	@UseInterceptors(AnyFilesInterceptor())
	async review(
		@Body() body: ReviewProductDto,
		@Param('id') productId: string,
		@Request() request: NestRequest,
	) {
		return this.productService.rate(productId, request.user.sub, body.score);
	}



	@Delete()
	@ApiOperation({ summary: 'Delete products by id' })
	@ApiBody({
		type: IdsDto
	})
	@Roles(['admin'])
	delete(@Body() body: IdsDto) {
		return this.productService.delete(body.ids);
	}
}
