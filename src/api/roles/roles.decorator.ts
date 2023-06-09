import { SetMetadata } from '@nestjs/common';
import { Role } from '../accounts/accounts.interface';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
