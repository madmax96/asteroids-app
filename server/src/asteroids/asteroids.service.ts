import { Injectable } from '@nestjs/common';
import { AsteroidSimple, NasaApiService } from '../nasa-api/nasa-api.service';
import { FeedQueryParams, FindOneParams } from './asteroids.params';
import { orderBy } from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

export class Asteroid extends AsteroidSimple {
  @ApiProperty()
  date: string;
}
@Injectable()
export class AsteroidsService {
  constructor(private readonly nasaApiService: NasaApiService) {}

  async feed({ start_date, end_date, sort_by, sort_dir }: FeedQueryParams) {
    const { data } = await this.nasaApiService.feed({
      start_date,
      end_date,
    });

    const asteroids: Asteroid[] = [];

    Object.entries(data.near_earth_objects).forEach(([date, dateAsteroids]) => {
      dateAsteroids.forEach((item) => {
        asteroids.push({ ...item, date });
      });
    });
    return orderBy(asteroids, [sort_by], [sort_dir]);
  }

  async getById(id: FindOneParams['id']) {
    const { data } = await this.nasaApiService.getAsteroidById(id);
    return data;
  }
}
