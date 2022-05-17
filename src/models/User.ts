import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import { IsEmail, Length } from 'class-validator'

import Receita from './Receita'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 40, nullable: false })
  @Length(3, 40, { message: 'Nome inválido número de caracteres ultrapassados ou insuficientes.' })
  name: string;

  @Column({ length: 100, nullable: false })
  @IsEmail({}, { message: "E-mail obrigatório." })
  email: string;

  @Column({ nullable: false })
  @Length(8, 40, { message: 'Preencha uma senha de no minímo 8 digitos.' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToMany(() => Receita, receita => receita.user)
  @JoinColumn({ name: 'user_id' })
  receitas: Receita[];


}

export default User;