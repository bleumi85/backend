import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Match } from '../../../common/decorators';
import { Password } from "../password.decorator";
import { Role } from "../accounts.interface";

const roles = Object.values(Role);

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'First Name', example: 'Johnny' })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Last Name', example: 'Walker' })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'User Name', example: 'johnny.walker' })
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'E-Mail', format: 'email' })
    email: string;

    @Password()
    @ApiProperty({ description: 'Password', example: 'Abcd1234' })
    password: string;

    @Match('password')
    @ApiProperty({ description: 'Confirm password', example: 'Abcd1234' })
    confirmPassword: string;

    @IsString()
    @IsIn(roles, { message: 'Role must be one of ' + roles.join(', ')})
    @ApiProperty({ description: 'Role', enum: roles.map((r) => r), example: Role.VISITOR })
    role: Role;
}
