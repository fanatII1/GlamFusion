import { Test, TestingModule } from '@nestjs/testing';
import { CalendarHandlingGateway } from './calendar-handling.gateway';
import { CalendarHandlingService } from './calendar-handling.service';

describe('CalendarHandlingGateway', () => {
  let gateway: CalendarHandlingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarHandlingGateway, CalendarHandlingService],
    }).compile();

    gateway = module.get<CalendarHandlingGateway>(CalendarHandlingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
