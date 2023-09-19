import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, map } from "rxjs";
import { User } from "src/user/model/user.interface";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector,
        @Inject(forwardRef( () => UserService))
        private userService: UserService){
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        //get it from hasRole() => ex: hasRole('admin') => roles will be admin
        const roles = this.reflector.get<string[]> ('roles', context.getHandler());
        if(!roles){
            return true
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user.user;
        
        return this.userService.getUserById(user.id).pipe(
            map((user: User) => {
                const  hasRole = () => roles.indexOf(user.roles) > -1;
                console.log('hasRole', hasRole())
                console.log(roles);
                //has ROle returning observable promis....
                let hasUserRole: boolean = false;
                if(hasRole()){
                    hasUserRole = true;
                }

                return user && hasUserRole
            })
        )
    }

}