import { Controller, Get, Param, Query } from '@nestjs/common';
import { AsteroidsService, Asteroid } from './asteroids.service';
import { FeedQueryParams, FindOneParams } from './asteroids.params';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AsteroidFull } from '../nasa-api/nasa-api.service';
import { HttpError } from '../app.types';

@ApiTags('asteroids')
@Controller('asteroids')
export class AsteroidsController {
  constructor(private readonly asteroidsService: AsteroidsService) {}

  @Get()
  @ApiOperation({ summary: 'Get asteroids feed' })
  @ApiResponse({
    status: 200,
    description: 'OK.',
    type: Asteroid,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check query params',
    type: HttpError,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpError,
  })
  async feed(@Query() queryParams: FeedQueryParams) {
    return this.asteroidsService.feed(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get asteroid by ID' })
  @ApiResponse({ status: 200, description: 'OK.', type: AsteroidFull })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Check query and path params',
    type: HttpError,
  })
  @ApiResponse({
    status: 404,
    description: 'Asteroid not found',
    type: HttpError,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpError,
  })
  getById(@Param() params: FindOneParams) {
    return this.asteroidsService.getById(params.id);
  }
}
