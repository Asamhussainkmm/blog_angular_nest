import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/user/model/user.interface';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {


    constructor(private readonly jwtService: JwtService){}

    generateJwtToken(user: User):Observable<string>{
        return from(this.jwtService.signAsync({user}));
    }

    generateHashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePassword(password: string, hashPassword: string): Observable<any | boolean>{
        return of<any| boolean>(bcrypt.compare(password, hashPassword));
    }

}

