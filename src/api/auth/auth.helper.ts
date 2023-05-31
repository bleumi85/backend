import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Account } from '../accounts/entities';
import { AccountsRepository } from '../accounts/accounts.repository';
import { RefreshToken } from '../refresh-tokens/entities';
import { AuthRequest } from './dto';
import { Role } from '../accounts/accounts.interface';

@Injectable()
export class AuthHelper {
    constructor(private readonly accountsRepo: AccountsRepository, private readonly jwt: JwtService) {}

    // Check if account has admin role or if decoded id belongs to account
    checkForAdmin(id: string, req: AuthRequest) {
        if (id !== req.user.id && req.user.role !== Role.ADMIN) {
            throw new ForbiddenException('Forbidden resource');
        }
    }

    // Generate JWT Token
    public async generateJwtToken(account: Account): Promise<string> {
        return this.jwt.signAsync({
            id: account.id,
            email: account.email,
            userName: account.userName,
        });
    }

    // Generate RefreshToken
    public generateRefreshToken(account: Account, ipAddress: string): RefreshToken {
        const rt = new RefreshToken();
        rt.account = account;
        rt.token = this.randomTokenString();
        rt.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        rt.createdByIp = ipAddress;
        rt.created = new Date();
        return rt;
    }

    // Validate password
    public async isPasswordValid(password: string, comparePassword: string): Promise<boolean> {
        return bcrypt.compare(password, comparePassword);
    }

    // Generate random token string
    public randomTokenString(): string {
        return crypto.randomBytes(40).toString('hex');
    }

    // Get Account by Id we get from decode
    public async validateAccount(decoded: any): Promise<Account> {
        return await this.accountsRepo.findOne(decoded.id);
    }
}
