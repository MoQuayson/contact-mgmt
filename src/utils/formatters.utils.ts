import { ValidationError } from 'class-validator';
import { List } from 'linqts';
import { TSMap } from 'typescript-map';

// export function ConvertToJsonString(data: any): string {
//   return '';
//   //return instanceToPlain(data);
// }

export function FormatValidationErrors(
  validationErrors?: ValidationError[],
): any[] {
  const data = [];

  if (validationErrors != null || validationErrors.length > 0) {
    const groupedErrors = new List<any>(validationErrors).GroupBy(
      (x) => x.property,
    );

    for (const key in groupedErrors) {
      const errs = new List<any>(groupedErrors[key])
        .Select((x: ValidationError) => Object.values(x.constraints))
        .First();

      data.push(new TSMap().set(key, errs));
    }
  }

  return data;
}
