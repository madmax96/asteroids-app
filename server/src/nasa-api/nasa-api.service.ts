import { HttpService } from '@nestjs/axios';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Config } from '../config';
import { FeedQueryParams, FindOneParams } from '../asteroids/asteroids.params';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { pick, omitBy, isUndefined } from 'lodash';
import {
  AsteroidFull,
  AsteroidsFeedResponse,
  AsteroidSimple,
} from './nasa-api.types';
import { ERROR_HTTP_STATUS, HttpError } from '../app.types';

export { AsteroidFull, AsteroidSimple };

const DATE_MAX_DIFF = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds

function getQueryString(data: Record<string, string> = {}) {
  return new URLSearchParams({
    ...omitBy(data, isUndefined),
    api_key: Config.NASA_API_KEY,
  }).toString();
}

function handleApiError(error: AxiosError, logger: Logger): never {
  if (error.response?.status === ERROR_HTTP_STATUS.NOT_FOUND) {
    throw new NotFoundException(
      new HttpError(
        ERROR_HTTP_STATUS.NOT_FOUND,
        'resource not found',
        'Not Found',
      ),
    );
  }
  logger.error({
    message: error.message,
    info: pick(error.response, [
      'config.headers',
      'config.method',
      'config.url',
      'data',
      'headers',
      'status',
    ]),
  });

  throw new InternalServerErrorException(
    new HttpError(
      ERROR_HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Unexpected error. Contact customer support!',
      'Internal Server Error',
    ),
  );
}

@Injectable()
export class NasaApiService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(NasaApiService.name);

  feed(query: Omit<FeedQueryParams, 'sort_by' | 'sort_dir'>) {
    const startDateTimestamp = +new Date(query.start_date);
    const endDateTimestamp = query.end_date && +new Date(query.end_date);

    const isEndDateLessThanStartDate =
      endDateTimestamp && endDateTimestamp < startDateTimestamp;

    const isDiffTooLArge =
      endDateTimestamp && endDateTimestamp - startDateTimestamp > DATE_MAX_DIFF;

    if (isEndDateLessThanStartDate || isDiffTooLArge) {
      throw new BadRequestException(
        new HttpError(
          ERROR_HTTP_STATUS.BAD_REQUEST,
          isEndDateLessThanStartDate
            ? 'end_date must be greater than or equal to start_date'
            : 'Maximum allowed difference between start_date and  end_date is 7 days',
          'Bad Request',
        ),
      );
    }
    return firstValueFrom(
      this.httpService
        .get<AsteroidsFeedResponse>(
          `${Config.NASA_API_URL}/feed?${getQueryString(query)}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            handleApiError(error, this.logger);
          }),
        ),
    );
  }

  getAsteroidById(id: FindOneParams['id']) {
    return firstValueFrom(
      this.httpService
        .get<AsteroidFull>(
          `${Config.NASA_API_URL}/neo/${id}?${getQueryString()}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            handleApiError(error, this.logger);
          }),
        ),
    );
  }
}
