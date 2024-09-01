import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ContactType } from '../enums/contact_type.enum.';

export function IsValidContactType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidContactType',
      target: object.constructor,
      propertyName: propertyName,

      options: validationOptions,

      validator: {
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `must be a value of phone,email,others`;
        },
        validate(value: any, args: ValidationArguments) {
          // const [relatedPropertyName] = args.constraints;
          // const relatedValue = (args.object as any)[relatedPropertyName];

          return (
            value == ContactType.Email ||
            value == ContactType.Phone ||
            value == ContactType.Others
          );
        },
      },
    });
  };
}
