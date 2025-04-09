import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformPropertyPipe implements PipeTransform {
  async transform(value: any) {
    // Check if property has transform function
    for (const property in value) {
      if (value.hasOwnProperty(property)) {
        const transformFn = this.hasMetadata(value, property);
        if (transformFn) {
          value[property] = transformFn({ value: value[property] }); // Áp dụng hàm chuyển đổi
        }
      }
    }

    // Return value
    return value;
  }

  hasMetadata(value: any, property: string) {
    try {
      return Reflect.getMetadata('transformProperty', value, property);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      return null;
    }
  }
}
