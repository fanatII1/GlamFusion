import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarHandlingDto } from './create-calendar-handling.dto';

export class UpdateCalendarHandlingDto extends PartialType(CreateCalendarHandlingDto) {
  id: number;
}
