import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersService } from './users/users.service';
// import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtAccessStrategy } from './auth/utils/jwt-access.strategy';
import { JwtRefreshStrategy } from './auth/utils/jwt-refresh.strategy';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            envFilePath: '.production.env',
          }
        : {
            envFilePath: '.development.env',
          },
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UserModel],
      synchronize: true,
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAccessStrategy, //
    JwtRefreshStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
