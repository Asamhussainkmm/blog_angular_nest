import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entitiy';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { Observable, from, map } from 'rxjs';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    createUser(user: User): Observable<User>{
        return from(this.userRepository.save(user));
    }

    getUserById(id: number): Observable<User>{
        return from(this.userRepository.findOne({
            where:{
                id
            }
        }));
    }

    getAllUsers():Observable<User[]>{
        return from(this.userRepository.find());
    }

    paginate(option: IPaginationOptions): Observable<Pagination<User>>{
        return from(paginate<User>(this.userRepository, option)).pipe(
            map((usersPageable: Pagination<User>) => {
                return usersPageable;
            })
        )
    }

    deleteUserById(id:number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    updateUser(id:number, user:User): Observable<any>{
        return from(this.userRepository.update(id, user));
    }

}
