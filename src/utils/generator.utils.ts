import { v4 as uuid } from 'uuid';

export function GenerateUUID(): string {
  return uuid();
}
