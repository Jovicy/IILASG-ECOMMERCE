import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Roles(Role.BUYER)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Allows a buyer to create an order with multiple items.',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    schema: {
      example: {
        id: 'ord_123',
        userId: 'user-uuid',
        totalAmount: 3999.98,
        status: 'PENDING',
        createdAt: '2025-09-02T10:00:00.000Z',
        items: [
          {
            id: 'item-uuid',
            productId: 'product-uuid',
            quantity: 2,
            price: 1999.99,
          },
        ],
        payment: {
          id: 'pay_123',
          orderId: 'ord_123',
          method: 'CARD',
          amount: 2199.97,
          reference: 'ref_1693658482',
          createdAt: '2025-09-02T10:00:01Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only buyers can create orders',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  create(
    @Request() req: { user: { userId: string } },
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const userId = req.user.userId;
    return this.ordersService.createOrder(userId, createOrderDto);
  }
}
