import { Test, TestingModule } from '@nestjs/testing';
import { AsteroidsController } from './asteroids.controller';
import { Asteroid, AsteroidsService } from './asteroids.service';
import { NasaApiModule } from '../nasa-api/nasa-api.module';
import { FeedQueryParams, SORT_BY, SORT_DIR } from './asteroids.params';
import { AsteroidFull } from '../nasa-api/nasa-api.service';

describe('AsteroidsController', () => {
  let controller: AsteroidsController;
  let service: AsteroidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NasaApiModule],
      controllers: [AsteroidsController],
      providers: [AsteroidsService],
    }).compile();

    controller = module.get<AsteroidsController>(AsteroidsController);
    service = module.get<AsteroidsService>(AsteroidsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('feed', () => {
    const queryParams: FeedQueryParams = {
      start_date: '2023-07-14',
      sort_by: SORT_BY.NAME,
      sort_dir: SORT_DIR.DESC,
    };

    describe(' when a service call is successfull', () => {
      it('should return asteroids feed', async () => {
        const a1 = new Asteroid();

        a1.id = '1';
        a1.name = 'first evil asteroid';
        a1.date = queryParams.start_date;

        const a2 = new Asteroid();
        a2.id = '2';
        a2.name = 'second evil asteroid';
        a2.date = queryParams.start_date;
        const expectedFeed = [a1, a2];

        jest.spyOn(service, 'feed').mockResolvedValue(expectedFeed);

        const result = await controller.feed(queryParams);

        expect(service.feed).toHaveBeenCalledWith(queryParams);
        expect(result).toEqual(expectedFeed);
      });
    });

    describe(' when a service call fails', () => {
      it('should rethrow error', async () => {
        const thrownMockError = new Error('kabooom');
        let thrownError;
        jest.spyOn(service, 'feed').mockRejectedValue(thrownMockError);

        try {
          await controller.feed(queryParams);
        } catch (err) {
          thrownError = err;
        }

        expect(service.feed).toHaveBeenCalledWith(queryParams);
        expect(thrownError).toEqual(thrownMockError);
      });
    });
  });

  describe('getById', () => {
    const asteroidId = '123';
    const expectedAsteroid = new AsteroidFull();
    expectedAsteroid.id = asteroidId;
    expectedAsteroid.name = 'second evil asteroid';
    const params = { id: asteroidId };

    describe(' when a service call is successfull', () => {
      it('should return asteroid', async () => {
        jest.spyOn(service, 'getById').mockResolvedValue(expectedAsteroid);

        const result = await controller.getById(params);

        expect(service.getById).toHaveBeenCalledWith(asteroidId);
        expect(result).toEqual(expectedAsteroid);
      });
    });

    describe(' when a service call fails', () => {
      it('should rethrow error', async () => {
        const thrownMockError = new Error('kabooom');
        let thrownError;
        jest.spyOn(service, 'getById').mockRejectedValue(thrownMockError);

        try {
          await controller.getById(params);
        } catch (err) {
          thrownError = err;
        }

        expect(service.getById).toHaveBeenCalledWith(asteroidId);
        expect(thrownError).toEqual(thrownMockError);
      });
    });
  });
});
