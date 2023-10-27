// import { Inject, Injectable } from '@nestjs/common';
// import { PassportSerializer } from '@nestjs/passport';
// import { AuthService } from '../auth.service';
// import { UserModel } from 'src/users/entities/user.entity';

// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//   constructor(
//     @Inject('AUTH_SERVICE') private readonly authService: AuthService,
//   ) {
//     super();
//   }

//   serializeUser(
//     user: UserModel,
//     done: (err: Error, user: UserModel) => void,
//   ): any {
//     console.log('serializeUser', user);
//     done(null, user);
//   }

//   async deserializeUser(
//     payload: UserModel,
//     done: (err: Error, payload: UserModel) => void,
//   ) {
//     console.log('deserializeUser', payload);
//     const { id } = payload;
//     const user = await this.authService.findUser(id);

//     return user ? done(null, user) : done(null, null);
//   }
// }
