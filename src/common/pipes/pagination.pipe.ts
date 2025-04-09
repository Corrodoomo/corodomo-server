import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: Record<string, unknown>) {
    const filter = {};

    // Kiểm tra nếu value có tham số filter
    Object.entries(value).forEach(([key, val]) => {
      if (key.startsWith('filter.')) {
        const filterKey = key.substring(7);
        filter[filterKey] = val;
      }
    });

    if (Object.keys(filter).length === 0) {
      return value;
    }

    return { ...value, filter };
  }
}
