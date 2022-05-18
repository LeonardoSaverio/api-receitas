import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsUUID, Length } from 'class-validator'

import User from './User'
import Ingrediente from './Ingrediente'


@Entity('receitas')
class Receita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 40, nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  preparation: string;

  @Column("varchar", { array: true, nullable: false })
  photos: string[];

  @Column("integer", { nullable: false })
  difficult: number;

  @ManyToMany(() => Ingrediente, ingrediente => ingrediente.receitas, {
    cascade: true,
  })
  @JoinTable({
    name: 'ingredientes_receitas',
  })
  ingredientes: Ingrediente[];

  @ManyToOne(() => User, user => user.receitas)
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty({ message: 'ID de usuário obrigatório.' })
  @IsUUID()
  user: User;

}

export default Receita;