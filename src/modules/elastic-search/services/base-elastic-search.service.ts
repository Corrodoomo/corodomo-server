import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { } from '@nestjs/elasticsearch';

@Injectable()
export class BaseElasticsearchService {
	constructor(
		protected readonly elasticsearchService: ElasticsearchService,
		protected readonly index: string, // Gán index khi khởi tạo service
	) {}

	/**
	 * Index document
	 * @param body 
	 * @returns 
	 */
	async indexDocument(body: any) {
		return this.elasticsearchService.index({
			index: this.index,
			body,
		});
	}

	/**
	 * Search by query
	 * @param query 
	 * @returns 
	 */
	async search(query: any) {
		return this.elasticsearchService.search({
			index: this.index, // Sử dụng index generic
			body: { query },
		});
	}

	/**
	 * Search by query
	 * @param query 
	 * @returns 
	 */
	async getById(docId: string) {
		return this.elasticsearchService.get({
			index: this.index, // Sử dụng index generic
			id: docId,
		});
	}

	/**
	 * Delete document
	 * @param id 
	 * @returns 
	 */
	async deleteDocument(id: string) {
		return this.elasticsearchService.delete({
			index: this.index, // Sử dụng index generic
			id,
		});
	}
}
