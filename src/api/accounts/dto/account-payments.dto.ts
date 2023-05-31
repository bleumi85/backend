import { ApiProperty } from "@nestjs/swagger";

export class AccountPaymentsDto {
    @ApiProperty({ description: 'Unique identifier', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'First Name', example: 'Johnny' })
    firstName: string;

    @ApiProperty({ description: 'Last Name', example: 'Walker' })
    lastName: string;

    @ApiProperty({ description: 'User Name', example: 'johnny.walker' })
    userName: string;
}