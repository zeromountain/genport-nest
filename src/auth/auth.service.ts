import {
  Injectable,
  // UnauthorizedException
} from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UserDetails } from 'src/utils/types';
// import { UserModel } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    // 모델에 해당되는 레포지토리를 주입하고 싶을때,
    // @InjectRepository(UserModel)
    // private readonly userRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // async validateUser(details: UserDetails) {
  //   console.log('AuthService');
  //   console.log(details);
  //   const user = await this.userRepository.findOneBy({ email: details.email });
  //   console.log(user);
  //   if (user) return user;
  //   console.log('User not found. Creating...');
  //   const newUser = this.userRepository.create(details);
  //   return this.userRepository.save(newUser);
  // }

  // async findUser(id: number) {
  //   const user = await this.userRepository.findOneBy({ id });

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
  getAccessToken({ user }): string {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
    return accessToken;
  }

  setRefreshToken({ user, res, req }: IAuthServiceSetRefreshToken): string {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.yoramyoram-backend.shop; SameSite=None; Secure; httpOnly;`,
    );

    return refreshToken;
  }

  async OAuthLogin({ req, res }) {
    console.log('OAuthLogin');

    let user = await this.userService.findUserByEmail({
      email: req.user.email,
    });

    if (!user) user = await this.userService.create({ ...req.user });

    this.setRefreshToken({ user, res, req });

    console.log({ user });
    // res.redirect(
    //   'http://localhost:5501/main-project/frontend/login/index.html',
    // );
    res.redirect('http://localhost:3000/api/auth/redirect');
    // return user;
  }
}
