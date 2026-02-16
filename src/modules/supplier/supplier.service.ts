import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) { }

  async createSupplier(data: {
    buyerOrgId: string;
    name: string;
    email: string;
  }) {
    return this.prisma.supplier.create({
      data: {
        buyerOrgId: data.buyerOrgId,
        name: data.name,
        email: data.email,
        status: 'ACTIVE',
      },
    });
  }

  async getSuppliersByOrg(orgId: string) {
    return this.prisma.supplier.findMany({
      where: { buyerOrgId: orgId },
      orderBy: { name: 'asc' },
    });
  }
}
