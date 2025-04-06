import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import '@nestjs/elasticsearch';

@Injectable()
export class BaseElasticsearchService {
  constructor(
    protected readonly elasticsearchService: ElasticsearchService,
    protected readonly index: string // Gán index khi khởi tạo service
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
    try {
      const data = await this.elasticsearchService.get({
        index: this.index, // Sử dụng index generic
        id: docId,
      });

      return data;
    } catch {
      return null;
    }
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

  /**
   * Delete document
   * @param id
   * @returns
   */
  public deleteByQuery(query: any) {
    return this.elasticsearchService.deleteByQuery({
      index: this.index, // Sử dụng index generic
      body: {
        query,
      },
    });
  }
}
