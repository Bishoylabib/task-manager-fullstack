import { loginApi, signupApi } from "./auth.api";
import type { LoginData, SignupData, AuthResponse } from "./auth.types";

const TOKEN_KEY = 'token'

export const authService = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const res = await loginApi(data);
        localStorage.setItem(TOKEN_KEY, res.data.token); // save token
        return res.data;
    },

    signup: async (data: SignupData): Promise<AuthResponse> => {
        const res = await signupApi(data);
        localStorage.setItem(TOKEN_KEY, res.data.token);
        return res.data;
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getToken: () => localStorage.getItem(TOKEN_KEY),
};