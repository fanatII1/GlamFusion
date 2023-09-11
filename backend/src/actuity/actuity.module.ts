import { Module } from '@nestjs/common';
import { ActuityController } from './actuity.controller';
import { ActuityService } from './actuity.service';
import { CalendarHandlingModule } from '../calendar-handling/calendar-handling.module';

@Module({
  imports: [CalendarHandlingModule],
  controllers: [ActuityController],
  providers: [ActuityService]
})
export class ActuityModule {}
