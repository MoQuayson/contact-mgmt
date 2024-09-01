import { plainToInstance } from 'class-transformer';
import { FormatValidationErrors } from './formatters.utils';
import { validate } from 'class-validator';

export function GetJwtSecret(): string {
  return 'ISPgDrQ9ISaUKML9zV2mnwZn6t0UaDPEqAVbXNPBIcGBEb3pnYNsuBblJB8caq3a';
}

export async function ValidateRequestPayload<Type>(
  payload: any,
): Promise<any[]> {
  let cls: new () => any;
  console.log('ttt: ', typeof cls);
  const _payload = plainToInstance(cls, payload);
  console.log('_payload: ', _payload);
  return FormatValidationErrors(await validate(_payload));
}
