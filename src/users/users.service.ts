import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}
  async fetchAllUsers() {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return users;
  }

  async fetchUser({ id }) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return user;
  }

  async findUserByEmail({ email }) {
    const result = await this.userRepository.findOne({
      where: { email: email },
    });

    return result;
  }

  async create({ createUserInput }) {
    const { email, password, ...rest } = createUserInput;

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 가입된 이메일입니다');

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepository.save({
      email,
      password: hashedPassword,
      ...rest,
    });

    return result;
  }

  async update({ id, updateUserInput }) {
    const { ...user } = updateUserInput;

    const result = await this.userRepository.save({
      id: id,
      ...user,
    });

    return result;
  }

  async delete({ id }) {
    return await this.userRepository.delete({
      id: id,
    });
  }
}
