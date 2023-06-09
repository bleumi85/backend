import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Account } from '../../accounts/entities';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements IAuthGuard {
    public handleRequest(err: unknown, user: Account): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const { user }: Request = context.switchToHttp().getRequest();

        return user ? true : false;
    }
}
