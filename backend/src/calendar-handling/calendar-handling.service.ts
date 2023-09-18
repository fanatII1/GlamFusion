import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarHandlingService {
  handleCalendarData(calendarData, client?) {
    console.log(calendarData)
    return calendarData;
  }
}
