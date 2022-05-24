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

  @Column("varchar", { array: true, nullable: true })
  photos: string[];

  @Column("integer", { nullable: false })
  difficult: number;

  @ManyToMany(() => Ingrediente, ingrediente => ingrediente.receitas, {
    cascade: true,
    lazy: true,
  })
  @JoinTable({
    name: 'ingredientes_receitas',
  })
  ingredientes: Ingrediente[];

  @ManyToOne(() => User, user => user.receitas, { nullable: false, cascade: ['remove', 'update'] })
  @JoinColumn({ name: 'user_id' })
  user: User;

}

export default Receita;