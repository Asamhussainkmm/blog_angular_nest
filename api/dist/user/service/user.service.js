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
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(user) {
        return (0, rxjs_1.from)(this.userRepository.save(user));
    }
    getUserById(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: {
                id
            }
        }));
    }
    getAllUsers() {
        return (0, rxjs_1.from)(this.userRepository.find());
    }
    paginate(option) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, option)).pipe((0, rxjs_1.map)((usersPageable) => {
            return usersPageable;
        }));
    }
    deleteUserById(id) {
        return (0, rxjs_1.from)(this.userRepository.delete(id));
    }
    updateUser(id, user) {
        return (0, rxjs_1.from)(this.userRepository.update(id, user));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entitiy_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map