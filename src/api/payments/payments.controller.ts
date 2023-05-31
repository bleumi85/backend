import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './entities';

const name = 'payments';

@Controller(name)
@ApiTags(name)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'All payments', type: Payment, isArray: true })
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(+id, updatePaymentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(+id);
    }
}
