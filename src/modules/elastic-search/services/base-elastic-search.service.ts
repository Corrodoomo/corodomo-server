import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class BaseElasticsearchService {
	constructor(
		protected readonly elasticsearchService: ElasticsearchService,
		protected readonly index: string, // Gán index khi khởi tạo service
	) {}

	async indexDocument(body: any) {
		return this.elasticsearchService.index({
			index: this.index,
			body,
		});
	}

	async search(query: any) {
		return this.elasticsearchService.search({
			index: this.index, // Sử dụng index generic
			body: { query },
		});
	}

	async deleteDocument(id: string) {
		return this.elasticsearchService.delete({
			index: this.index, // Sử dụng index generic
			id,
		});
	}
}
