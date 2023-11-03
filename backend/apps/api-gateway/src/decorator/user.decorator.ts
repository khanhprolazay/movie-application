import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@app/shared';

export const GetUser = createParamDecorator(
  (key: Exclude<keyof User, "hasId" | "password" | "hashPassword">, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);