import { Module } from '@nestjs/common';
import { ApprovalController } from './approval.controller';
import { ApprovalService } from './approval.service';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { EmailModule } from '../../core/email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [ApprovalController],
  providers: [ApprovalService],
  exports: [ApprovalService],
})
export class ApprovalModule { }
