import { Module, Global } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule { }
