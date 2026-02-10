import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
