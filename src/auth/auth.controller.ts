import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';

// import { GoogleAuthGuard } from './utils/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('유저 인증 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly userService: UsersService,
  ) {}
  // @Get('google/login')
  // @UseGuards(GoogleAuthGuard)
  // handleLogin() {
  //   return { msg: 'Google Authentication' };
  // }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async handleRedirect(@Req() req, @Res() res) {
    console.log({ msg: 'OK' });
    const { user } = req;

    return res.send(user);
  }

  @Get('status')
  user(@Req() req) {
    console.log(req.user);
    if (req.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  /****************************** restore 토큰 ******************************/
  @ApiBearerAuth()
  @UseGuards(AuthGuard('access'))
  @ApiOperation({ summary: 'accessToken 복구' })
  @Post('/restoreToken')
  restoreAccessToken(@Req() req): string {
    return this.authService.getAccessToken({ user: req.user });
  }

  /******************* 구글 로그인 *******************/
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: '구글 소셜 로그인' })
  async loginGoogle(
    @Req() req: Request, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  /******************* 카카오 로그인 *******************/
  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({ summary: '카카오 소셜 로그인' })
  async loginKakao(
    @Req() req: Request, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  /******************* 네이버 로그인 *******************/
  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({ summary: '네이버 소셜 로그인' })
  async loginNaver(
    @Req() req: Request, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }
}
