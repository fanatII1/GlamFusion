import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActuityModule } from './actuity/actuity.module';
import { CalendarHandlingModule } from './calendar-handling/calendar-handling.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ActuityModule, CalendarHandlingModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
