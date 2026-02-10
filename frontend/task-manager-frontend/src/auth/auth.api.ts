import type { AuthResponse, LoginData, SignupData } from "./auth.types";
import { api } from "../api/axios";

export const signupApi = (data: SignupData) => 
    api.post<AuthResponse>('/auth/signup', data);

export const loginApi = (data: LoginData) => 
    api.post<AuthResponse>('/auth/login', data);