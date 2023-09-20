import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarHandlingService {
  //send calendar webhook data to the frontend
  handleCalendarData(calendarData, client?) {
    return calendarData;
  }
}
