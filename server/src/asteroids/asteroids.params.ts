import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class FindOneParams {
  @ApiProperty({ example: '3373174', description: 'The ID of the Asteroid' })
  @IsNumberString()
  id: string;
}

export enum SORT_BY {
  NAME = 'name',
}

export enum SORT_DIR {
  ASC = 'asc',
  DESC = 'desc',
}

export class FeedQueryParams {
  @ApiProperty({
    example: '2023-07-14',
    description: 'Close approach start date filter',
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({
    example: '2023-07-21',
    description:
      'Close approach end date filter, must be at most 7 days from start_date. If not present, the defult value is start_date + 7 days',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({
    enum: SORT_BY,
    enumName: 'SORT_BY',
    example: SORT_BY.NAME,
    description: 'Sort by which field',
    required: false,
    default: SORT_BY.NAME,
  })
  @IsEnum(SORT_BY)
  sort_by: SORT_BY = SORT_BY.NAME;

  @ApiProperty({
    enum: SORT_DIR,
    enumName: 'SORT_DIR',
    example: SORT_DIR.ASC,
    description: 'Sort direction',
    required: false,
    default: SORT_DIR.ASC,
  })
  @IsEnum(SORT_DIR)
  sort_dir: SORT_DIR = SORT_DIR.ASC;
}
