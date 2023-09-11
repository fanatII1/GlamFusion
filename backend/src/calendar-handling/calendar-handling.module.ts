import { Module } from '@nestjs/common';
import { CalendarHandlingService } from './calendar-handling.service';
import { CalendarHandlingGateway } from './calendar-handling.gateway';

@Module({
  providers: [CalendarHandlingGateway, CalendarHandlingService],
  exports: [CalendarHandlingGateway]
})
export class CalendarHandlingModule {}
