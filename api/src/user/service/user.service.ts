import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entitiy';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { Observable, from, map, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { error } from 'console';

@Injectable()
export class UserService {

    constructor(
        private authService: AuthService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>

    ){}

    createUser(user: User): Observable<User>{
        return this.authService.generateHashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.roles = user.roles;
                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    })
                )
            })
        )
    }

    getUserById(id: number): Observable<User>{
        return from(this.userRepository.findOne({
            where:{
                id
            }
        })).pipe(
            map((user: User) => {
                const{password, ...results} = user;
                return results;
            })
        );
    }

    getAllUsers():Observable<User[]>{
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(user => delete user.password)
                return users;
            })
        );
    }

    deleteUserById(id:number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    updateUser(id:number, user:User): Observable<any>{
        delete user.email;
        delete user.password;
        return from(this.userRepository.update(id, user))
    }

    login(user: User): Observable<string>{
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJwtToken(user);
                }
                else{
                    return "Wrong Credintials";
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User>{
        return this.getUserByEmail(email).pipe(
            switchMap((user: User) => {
                return this.authService.comparePassword(password, user.password).pipe(
                    map((match: boolean) => {
                        if (match) {
                            const { password, ...result } = user;
                            return result;
                        }
                        else {
                            throw error;
                        }
                    })
                );
            })
        );
    }

    getUserByEmail(email: string): Observable<User>{
        return from(this.userRepository.findOne({
            where:{
                email
            }
        }));
    }

    updateUserRole(id: number, user: User): Observable<any>{
        return from(this.userRepository.update(id, user));
    }

}
