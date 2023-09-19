import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User, UserRoles } from '../model/user.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { HasRoles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() user: User): Observable<User | object>{
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Get(':id')
    getUserById(@Param('id') id: number): Observable<User>{
        return this.userService.getUserById(id);
    }

    @HasRoles(UserRoles.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllUsers(): Observable<User[]>{
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number):Observable<any>{
        return this.userService.deleteUserById(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() user: User):Observable<any>{
        return this.userService.updateUser(id, user);
    }


    @Post('login')
    login(@Body() user: User): Observable<object>{
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt}
            })
        )
    }

    @Put(':id/role')
    updateUserRole(@Param('id') id: number, @Body() user:User): Observable<User>{
        return this.userService.updateUserRole(id, user);
    }

}
