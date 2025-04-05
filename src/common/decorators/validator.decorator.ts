import { registerDecorator, ValidationArguments } from 'class-validator';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY';

export function IsValidDate(format: DateFormat) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName,
      validator: {
        validate(value: string) {
          return dayjs(value, format, true).isValid();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date in the format ${format}`;
        },
      },
    });
  };
}
