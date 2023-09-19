import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: User): Observable<User | object>;
    getUserById(id: number): Observable<User>;
    getAllUsers(): Observable<User[]>;
    deleteUser(id: number): Observable<any>;
    updateUser(id: number, user: User): Observable<any>;
    login(user: User): Observable<object>;
    updateUserRole(id: number, user: User): Observable<User>;
}
