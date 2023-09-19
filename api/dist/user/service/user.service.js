"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entitiy_1 = require("../model/user.entitiy");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../../auth/service/auth.service");
const console_1 = require("console");
let UserService = class UserService {
    constructor(authService, userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    createUser(user) {
        return this.authService.generateHashPassword(user.password).pipe((0, rxjs_1.switchMap)((passwordHash) => {
            const newUser = new user_entitiy_1.UserEntity();
            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash;
            newUser.roles = user.roles;
            return (0, rxjs_1.from)(this.userRepository.save(newUser)).pipe((0, rxjs_1.map)((user) => {
                const { password, ...result } = user;
                return result;
            }));
        }));
    }
    getUserById(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: {
                id
            }
        })).pipe((0, rxjs_1.map)((user) => {
            const { password, ...results } = user;
            return results;
        }));
    }
    getAllUsers() {
        return (0, rxjs_1.from)(this.userRepository.find()).pipe((0, rxjs_1.map)((users) => {
            users.forEach(user => delete user.password);
            return users;
        }));
    }
    deleteUserById(id) {
        return (0, rxjs_1.from)(this.userRepository.delete(id));
    }
    updateUser(id, user) {
        delete user.email;
        delete user.password;
        return (0, rxjs_1.from)(this.userRepository.update(id, user));
    }
    login(user) {
        return this.validateUser(user.email, user.password).pipe((0, rxjs_1.switchMap)((user) => {
            if (user) {
                return this.authService.generateJwtToken(user);
            }
            else {
                return "Wrong Credintials";
            }
        }));
    }
    validateUser(email, password) {
        return this.getUserByEmail(email).pipe((0, rxjs_1.switchMap)((user) => {
            return this.authService.comparePassword(password, user.password).pipe((0, rxjs_1.map)((match) => {
                if (match) {
                    const { password, ...result } = user;
                    return result;
                }
                else {
                    throw console_1.error;
                }
            }));
        }));
    }
    getUserByEmail(email) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: {
                email
            }
        }));
    }
    updateUserRole(id, user) {
        return (0, rxjs_1.from)(this.userRepository.update(id, user));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entitiy_1.UserEntity)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map