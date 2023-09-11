import { Test, TestingModule } from '@nestjs/testing';
import { ActuityController } from './actuity.controller';

describe('ActuityController', () => {
  let controller: ActuityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActuityController],
    }).compile();

    controller = module.get<ActuityController>(ActuityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
