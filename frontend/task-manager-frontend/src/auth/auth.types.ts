export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData extends LoginData {
    fullName:string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
}


export interface AuthResponse {
    token: string;
    user: User;
}