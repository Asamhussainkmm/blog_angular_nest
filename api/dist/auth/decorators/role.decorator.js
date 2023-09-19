"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRoles = void 0;
const common_1 = require("@nestjs/common");
const HasRoles = (...HasRoles) => (0, common_1.SetMetadata)('roles', HasRoles);
exports.HasRoles = HasRoles;
//# sourceMappingURL=role.decorator.js.map