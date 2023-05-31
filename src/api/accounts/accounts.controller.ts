import { Controller, Get, HttpStatus, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from './entities';
import { AccountPaymentsDto } from './dto';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from './accounts.interface';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { AuthRequest } from '../auth/dto';
import { AuthHelper } from '../auth/auth.helper';

const name = 'accounts';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth(name)
@UseGuards(JwtGuard, RolesGuard)
export class AccountsController {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly authHelper: AuthHelper,
    ) { }

    @Post()
    @Roles(Role.ADMIN)
    async create(@Body() createAccountDto: CreateAccountDto) {
        return await this.accountsService.create(createAccountDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiResponse({ status: HttpStatus.OK, description: 'All accounts', type: Account, isArray: true })
    async findAll() {
        return await this.accountsService.findAll();
    }

    @Get(':id')
    @Roles()
    @ApiResponse({ status: HttpStatus.OK, description: 'Account by id', type: Account })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
    async findOne(@Param('id') id: string, @Req() req: AuthRequest) {
        // users can get their own account and admins can get any account
        this.authHelper.checkForAdmin(id, req);

        return await this.accountsService.findOne(id);
    }

    @Get(':id/payments')
    @Roles(Role.USER)
    @ApiResponse({ status: HttpStatus.OK, description: 'All payments for an account', type: AccountPaymentsDto })
    async findOnePayments(@Param('id') id: string) {
        return await this.accountsService.findOnePayments(id);
    }

    @Get(':id/seasons')
    @Roles(Role.USER)
    @ApiResponse({ status: HttpStatus.OK, description: 'All seasons the account participates in' })
    async findOneSeasons(@Param('id') id: string) {
        return await this.accountsService.findOneSeasons(id);
    }

    @Patch(':id')
    @Roles()
    async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @Req() req: AuthRequest) {
        // users can update their own account and admins can update any account
        this.authHelper.checkForAdmin(id, req);

        // only admins can update role
        if (req.user.role !== Role.ADMIN) {
            delete updateAccountDto.role;
        }

        return await this.accountsService.update(id, updateAccountDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.accountsService.remove(+id);
    }
}
