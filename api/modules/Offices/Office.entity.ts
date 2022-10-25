import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import User from "../User/User.entity";

@Entity()
export default class Office extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column()
    contactEmail: string;

    @IsDefined({ always: true })
    @Column()
    contactName: string;

    @IsDefined({ always: true })
    @Column()
    city: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => User, (user) => user.office, {
        cascade: true,
    })
    users: User[];
}
