import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { Match } from 'src/common/decorators';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @ValidateIf((o) => o.password || o.confirmPassword)
    @IsNotEmpty({ message: 'Please provide a confirmPassword value'})
    @Match('password')
    confirmPassword?: string;
}
