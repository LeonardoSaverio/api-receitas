import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsUUID, Length } from 'class-validator'
import Receita from './Receita'

@Entity('ingredientes')
class Ingrediente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 40, nullable: false })
  name: string;

  @Column({ nullable: false, type: 'decimal' })
  price: number;

  @Column("integer", { nullable: false })
  amount: number;

  @ManyToOne(() => Receita, receita => receita.user)
  receitas: Receita[];

}

export default Ingrediente;