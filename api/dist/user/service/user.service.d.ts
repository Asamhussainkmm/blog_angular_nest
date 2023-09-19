import { UserEntity } from '../model/user.entitiy';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
export declare class UserService {
    private authService;
    private readonly userRepository;
    constructor(authService: AuthService, userRepository: Repository<UserEntity>);
    createUser(user: User): Observable<User>;
    getUserById(id: number): Observable<User>;
    getAllUsers(): Observable<User[]>;
    deleteUserById(id: number): Observable<any>;
    updateUser(id: number, user: User): Observable<any>;
    login(user: User): Observable<string>;
    validateUser(email: string, password: string): Observable<User>;
    getUserByEmail(email: string): Observable<User>;
    updateUserRole(id: number, user: User): Observable<any>;
}
