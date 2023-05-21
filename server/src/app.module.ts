import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AsteroidsModule } from './asteroids/asteroids.module';
import { NasaApiModule } from './nasa-api/nasa-api.module';
import { AppLoggerMiddleware } from './app.logger';
@Module({
  imports: [AsteroidsModule, NasaApiModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
