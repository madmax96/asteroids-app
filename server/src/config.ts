import * as dotenv from 'dotenv';
import { validateSync, IsInt, IsUrl, IsEnum, IsString } from 'class-validator';

dotenv.config();

enum NODE_ENV {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod',
}

class AppConfig {
  @IsInt()
  HTTP_PORT: number;

  @IsEnum(NODE_ENV)
  NODE_ENV: NODE_ENV;

  @IsString()
  NASA_API_KEY: string;

  @IsUrl({ protocols: ['https'] })
  NASA_API_URL: string;
}

export const Config = new AppConfig();

Config.HTTP_PORT = Number.parseInt(process.env.port) || 8080;
Config.NASA_API_KEY = process.env.NASA_API_KEY.trim();
Config.NASA_API_URL = process.env.NASA_API_URL.trim();
Config.NODE_ENV = process.env.NODE_ENV.trim() as NODE_ENV;

const errors = validateSync(Config);
if (errors.length) {
  console.error('ENV config error');
  throw new Error(errors.toString());
}
