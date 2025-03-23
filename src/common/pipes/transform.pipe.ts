import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformPropertyPipe implements PipeTransform {
  async transform(value: any) {
    // Check if property has transform function
    for (const property in value) {
      if (value.hasOwnProperty(property)) {
        const transformFn = Reflect.getMetadata('transformProperty', value, property);
        if (transformFn) {
          value[property] = transformFn({ value: value[property] }); // Áp dụng hàm chuyển đổi
        }
      }
    }

    // Return value
    return value;
  }
}
