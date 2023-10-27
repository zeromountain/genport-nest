import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;
}
