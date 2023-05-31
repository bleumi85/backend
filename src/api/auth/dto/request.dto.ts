import { Request } from 'express';
import { Account } from '../../accounts/entities';

export interface AuthRequest extends Request {
    user: Account;
}
