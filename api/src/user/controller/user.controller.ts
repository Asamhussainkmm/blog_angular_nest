import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() user: User): Observable<User>{
        return this.userService.createUser(user);
    }

    @Get(':id')
    getUserById(@Param('id') id: number): Observable<User>{
        return this.userService.getUserById(id);
    }

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


}
