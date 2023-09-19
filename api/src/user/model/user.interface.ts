export enum UserRoles{
    ADMIN = "admin",
    CHIEFEDITOR = "chiefeditor",
    EDITOR = "editor",
    USER = "user"
}
export interface User{
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    roles?: UserRoles;
}