import { UserEntity } from '../model/user.entitiy';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(user: User): Observable<User>;
    getUserById(id: number): Observable<User>;
    getAllUsers(): Observable<User[]>;
    paginate(option: IPaginationOptions): Observable<Pagination<User>>;
    deleteUserById(id: number): Observable<any>;
    updateUser(id: number, user: User): Observable<any>;
}
