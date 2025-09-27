import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  async getVendorProfileIdByUser(userId: string): Promise<string> {
    const vendorProfile = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!vendorProfile) {
      throw new NotFoundException(
        `Vendor profile not found for userId ${userId}`,
      );
    }

    return vendorProfile.id;
  }
}
