import { Module } from '@nestjs/common';
import { RFQService } from './rfq.service';
import { RFQController } from './rfq.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [RFQService],
  controllers: [RFQController],
  exports: [RFQService],
})
export class RFQModule {}
