import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SORT_BY, SORT_DIR } from '../src/asteroids/asteroids.params';
import { orderBy } from 'lodash';

describe('App e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  describe('GET /', () => {
    it('should return 404', () => {
      return request(app.getHttpServer()).get('/').expect(404);
    });
  });

  describe('GET /api/asteroids', () => {
    describe('when request params are not valid', () => {
      // TODO: add more cases
      it('should return 400 response when query params are incorrect', async () => {
        const response = await request(app.getHttpServer()).get(
          '/asteroids?start_date=2022-01-01&end_date=2021-12-31', // diff is greater than 7 days
        );

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe('Bad Request');
      });
    });

    describe('when request is valid', () => {
      // TODO: add more cases
      it('should return list of asteroids sorted by name in ASC order', async () => {
        const response = await request(app.getHttpServer()).get(
          '/asteroids?start_date=2023-07-14&end_date=2023-07-14',
        );

        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);

        const sortedAsteroids = orderBy(
          response.body,
          [SORT_BY.NAME],
          [SORT_DIR.ASC],
        );

        expect(response.body).toEqual(sortedAsteroids);
      });
    });
  });

  describe('GET /asteroids/:id', () => {
    describe('when request params are not valid', () => {
      it('should return 400 response when id is not number', async () => {
        const response = await request(app.getHttpServer()).get(
          '/asteroids/asd',
        );

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body).toBeDefined();
        expect(response.body.error).toEqual('Bad Request');
      });

      it('should return 404 response when asteroid is not found', async () => {
        const response = await request(app.getHttpServer()).get(
          '/asteroids/123',
        );

        expect(response.status).toBe(HttpStatus.NOT_FOUND);
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual(['resource not found']);
      });
    });

    describe('when request is valid', () => {
      it('should return an asteroid by ID', async () => {
        const validAsteroidId = '3160748';
        const response = await request(app.getHttpServer()).get(
          `/asteroids/${validAsteroidId}`,
        );

        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBe(validAsteroidId);
      });
    });
  });
});
