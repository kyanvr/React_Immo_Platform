import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
} from "typeorm";

@Entity()
export default class House extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    price: string

    @Column()
    bedrooms: string

    @Column()
    address: string

    @Column()
    houseNumber: string

    @Column()
    city: string

    @Column()
    zipcode: string

    @Column()
    surfaceArea: string

    @Column()
    buildYear: string

    @Column()
    action: string

    @Column("text", {array: true})
    images: string[]
}