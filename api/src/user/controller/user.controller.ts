import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { Pagination } from 'nestjs-typeorm-paginate';

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
    getAllUsers(@Query('page') page: number=1, @Query('limit') limit: number = 10): Observable<Pagination<User>>{
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({page: Number(page), limit: Number(limit), route:"http://localhost:3000/users"})
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
