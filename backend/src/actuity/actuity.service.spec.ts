import { Test, TestingModule } from '@nestjs/testing';
import { ActuityService } from './actuity.service';

describe('ActuityService', () => {
  let service: ActuityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActuityService],
    }).compile();

    service = module.get<ActuityService>(ActuityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
