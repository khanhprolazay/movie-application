import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@app/shared';

export const User = createParamDecorator(
  (key: string, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);