import { Request, Response } from 'express';
import { UserModel } from 'src/users/entities/user.entity';

export interface IAuthServiceGetAccessToken {
  user: UserModel;
}

export interface IAuthServiceSetRefreshToken {
  user: UserModel;
  res: Response;
  req: Request;
}
