import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestBody = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    console.log('body: ', body);
    // If a specific property is requested, return it; otherwise, return the full body
    return data ? body?.[data] : body;
  },
);

export const CustomBody = <T extends object>(data?: keyof T) =>
  createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    // If a specific property is requested, return it; otherwise, return the full body
    return data ? body?.[data] : body;
  })();
