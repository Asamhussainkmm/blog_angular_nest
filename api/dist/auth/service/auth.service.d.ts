import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/user/model/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwtToken(user: User): Observable<string>;
    generateHashPassword(password: string): Observable<string>;
    comparePassword(password: string, hashPassword: string): Observable<any | boolean>;
}
