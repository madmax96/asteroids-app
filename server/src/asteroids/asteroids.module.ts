import { Module } from '@nestjs/common';
import { AsteroidsService } from './asteroids.service';
import { AsteroidsController } from './asteroids.controller';
import { NasaApiModule } from '../nasa-api/nasa-api.module';

@Module({
  imports: [NasaApiModule],
  providers: [AsteroidsService],
  controllers: [AsteroidsController],
})
export class AsteroidsModule {}
