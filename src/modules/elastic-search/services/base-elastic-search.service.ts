import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { TMeta } from '@common/types/elastic-search.type';

import '@nestjs/elasticsearch';

import { QueryDslQueryContainer, SearchRequest, Script } from '@elastic/elasticsearch/lib/api/types';

import { PaginateRawMapper } from '@common/mappers';

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
  async search(query: QueryDslQueryContainer) {
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
  async paginate(body: SearchRequest, meta: TMeta) {
    const { page, limit } = meta;

    // Elastic search result
    const result = await this.elasticsearchService.search({
      index: this.index, // Sử dụng index generic
      body: {
        ...body,
        aggs: {},
        from: (page - 1) * limit,
        size: limit,
      },
    });

    // Get total items
    const totalItems = Number((result.hits.total as object)['value']);

    // Return result
    return new PaginateRawMapper({
      items: result.hits.hits.map((hit) => hit._source),
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        itemCount: result.hits.hits.length,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
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
  public deleteByQuery(query: QueryDslQueryContainer) {
    return this.elasticsearchService.deleteByQuery({
      index: this.index, // Sử dụng index generic
      body: {
        query,
      },
    });
  }

  /**
   * Delete document
   * @param id
   * @returns
   */
  public updateByQuery(query: QueryDslQueryContainer, script: string | Script | undefined) {
    return this.elasticsearchService.updateByQuery({
      index: this.index, // Sử dụng index generic
      body: {
        query,
        script,
      },
    });
  }
}
