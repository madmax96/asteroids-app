import { Test, TestingModule } from '@nestjs/testing';
import { NasaApiService } from './nasa-api.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AxiosResponse, AxiosHeaders, AxiosError } from 'axios';
import { ERROR_HTTP_STATUS } from '../app.types';

const apiErrorResponse = new AxiosError('wrong api key', 'Unauthorized');

const apiSuccessResponse: AxiosResponse<any> = {
  data: { sample: 'data' },
  headers: new AxiosHeaders(),
  config: { url: 'http://localhost:3000/mockUrl', headers: new AxiosHeaders() },
  status: 200,
  statusText: 'OK',
};

describe('NasaApiService', () => {
  let service: NasaApiService;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [NasaApiService],
    }).compile();

    service = module.get<NasaApiService>(NasaApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('feed', () => {
    describe('when end_date is less than start_date', () => {
      it('should throw Bad Request http error with correct message', async () => {
        let error: any;
        try {
          await service.feed({
            start_date: '2023-07-12',
            end_date: '2023-07-07',
          });
        } catch (err) {
          error = err;
        }
        expect(error).toBeDefined();
        expect(error instanceof BadRequestException).toBe(true);
        expect(error.response).toEqual({
          statusCode: ERROR_HTTP_STATUS.BAD_REQUEST,
          message: ['end_date must be greater than or equal to start_date'],
          error: 'Bad Request',
        });
      });

      it('should not call Nasa API', async () => {
        const httpGetSpy = jest.spyOn(httpService, 'get');
        try {
          await service.feed({
            start_date: '2023-07-12',
            end_date: '2023-07-07',
          });
        } catch (err) {}

        expect(httpGetSpy.mock.calls.length).toEqual(0);
      });
    });

    describe('when difference between end_date is and start_date is greated than 7 days', () => {
      it('should throw Bad Request http error with correct message', async () => {
        let error: any;
        try {
          await service.feed({
            start_date: '2023-07-12',
            end_date: '2023-07-20',
          });
        } catch (err) {
          error = err;
        }
        expect(error).toBeDefined();
        expect(error instanceof BadRequestException).toBe(true);
        expect(error.response).toEqual({
          statusCode: ERROR_HTTP_STATUS.BAD_REQUEST,
          message: [
            'Maximum allowed difference between start_date and  end_date is 7 days',
          ],
          error: 'Bad Request',
        });
      });

      it('should not call Nasa API', async () => {
        const httpGetSpy = jest.spyOn(httpService, 'get');
        try {
          await service.feed({
            start_date: '2023-07-12',
            end_date: '2023-07-07',
          });
        } catch (err) {}

        expect(httpGetSpy.mock.calls.length).toEqual(0);
      });
    });

    describe('when  api call returns error', () => {
      it('should throw internal server error', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => throwError(() => apiErrorResponse));
        let error: any;
        try {
          await service.feed({
            start_date: '2023-07-12',
          });
        } catch (err) {
          error = err;
        }
        expect(error).toBeDefined();
        expect(error instanceof InternalServerErrorException).toBe(true);
        expect(error.response).toEqual({
          statusCode: ERROR_HTTP_STATUS.INTERNAL_SERVER_ERROR,
          message: ['Unexpected error. Contact customer support!'],
          error: 'Internal Server Error',
        });
      });
    });

    describe('when  api call is successfull', () => {
      it('should return api response', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => of(apiSuccessResponse));

        const response = await service.feed({
          start_date: '2023-07-12',
        });
        expect(response).toEqual(apiSuccessResponse);
      });
    });
  });

  describe('getAsteroidById', () => {
    const asteroidId = '123';
    describe('when  api call returns 404 error', () => {
      const axiosError404 = new AxiosError();
      axiosError404.response = {
        status: 404,
        data: {},
        statusText: 'Not Found',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      };

      it('should throw 404 error', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => throwError(() => axiosError404));
        let error: any;
        try {
          await service.getAsteroidById(asteroidId);
        } catch (err) {
          error = err;
        }
        expect(error).toBeDefined();
        expect(error instanceof NotFoundException).toBe(true);
        expect(error.response).toEqual({
          statusCode: ERROR_HTTP_STATUS.NOT_FOUND,
          message: ['resource not found'],
          error: 'Not Found',
        });
      });
    });

    describe('when  api call returns non 404 error', () => {
      it('should throw internal server error', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => throwError(() => apiErrorResponse));
        let error: any;
        try {
          await service.getAsteroidById(asteroidId);
        } catch (err) {
          error = err;
        }
        expect(error).toBeDefined();
        expect(error instanceof InternalServerErrorException).toBe(true);
        expect(error.response).toEqual({
          statusCode: ERROR_HTTP_STATUS.INTERNAL_SERVER_ERROR,
          message: ['Unexpected error. Contact customer support!'],
          error: 'Internal Server Error',
        });
      });
    });

    describe('when  api call is successfull', () => {
      it('should return api response', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementationOnce(() => of(apiSuccessResponse));

        const response = await service.getAsteroidById(asteroidId);
        expect(response).toEqual(apiSuccessResponse);
      });
    });
  });
});
