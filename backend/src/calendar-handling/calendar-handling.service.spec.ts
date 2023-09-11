import { Test, TestingModule } from '@nestjs/testing';
import { CalendarHandlingService } from './calendar-handling.service';

describe('CalendarHandlingService', () => {
  let service: CalendarHandlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarHandlingService],
    }).compile();

    service = module.get<CalendarHandlingService>(CalendarHandlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
