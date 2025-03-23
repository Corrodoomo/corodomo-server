/**
 * Transform Property Decorator
 * @param transformFn 
 * @returns 
 */
export function TransformProperty(transformFn: (value: any) => any) {
  return function (object: any, propertyName: string) {
    Reflect.defineMetadata('transformProperty', transformFn, object, propertyName);
  };
}
