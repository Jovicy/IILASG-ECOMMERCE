import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const itemsWithPrice = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    );

    const totalAmount = itemsWithPrice.reduce(
      (sum, i) => sum + i.price.toNumber() * i.quantity,
      0,
    );

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: { create: itemsWithPrice },
        },
      });

      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          method: createOrderDto.paymentMethod,
          amount: totalAmount,
          reference: `ref_${Date.now()}`,
        },
      });

      return newOrder;
    });

    return order;
  }
}
