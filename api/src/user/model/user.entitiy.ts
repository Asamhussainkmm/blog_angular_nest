import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user.interface";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    username: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRoles, default: UserRoles.USER})
    roles: UserRoles;

    @BeforeInsert()
    emailToLowercase(){
        this.email = this.email.toLowerCase();
    }
    
}