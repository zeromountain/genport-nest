import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from 'src/users/entities/user.entity';
import { JwtAccessStrategy } from './utils/jwt-access.strategy';
import { JwtRefreshStrategy } from './utils/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './utils/jwt-social-google';
import { JwtNaverStrategy } from './utils/jwt-social-naver';
import { JwtKakaoStrategy } from './utils/jwt-social-kakao';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  // providers: [
  //   GoogleStrategy,
  //   SessionSerializer,
  //   {
  //     provide: 'AUTH_SERVICE',
  //     useClass: AuthService,
  //   },
  // ],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthService,
    UsersService,
  ],
})
export class AuthModule {}
