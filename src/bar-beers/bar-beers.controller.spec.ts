import { Test, TestingModule } from '@nestjs/testing';
import { BarBeersController } from './bar-beers.controller';
import { BarBeersService } from './bar-beers.service';

describe('BarBeersController', () => {
  let controller: BarBeersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarBeersController],
      providers: [BarBeersService],
    }).compile();

    controller = module.get<BarBeersController>(BarBeersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
