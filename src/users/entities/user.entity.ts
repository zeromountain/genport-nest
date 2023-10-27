import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  displayName: string;
}
