import { Module } from '@nestjs/common';
import { NasaApiService } from './nasa-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NasaApiService],
  exports: [NasaApiService],
})
export class NasaApiModule {}
