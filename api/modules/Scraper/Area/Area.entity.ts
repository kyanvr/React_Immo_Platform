import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
} from "typeorm";

@Entity()
export default class Area extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string
}