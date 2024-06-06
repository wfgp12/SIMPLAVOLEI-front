import { UserDAO, UserDTO } from "./user";

export interface LoginResponse {
    user:  UserDAO;
    token: string;
}

export interface LoginForm {
    email: string,
    password: string
}

export interface validateTokenResponse {
    user: UserDAO
}

export interface RegisterForm extends Omit<UserDTO, 'id'|'roles' > {
    role: string
    password: string
    confirmPassword: string
}

export interface RegisterResponse {
    fullName:       string;
    email:          string;
    password:       string;
    documentNumber: string;
    dateOfBirth:    Date;
    country:        string;
    roles:          string[];
    _id:            string;
}