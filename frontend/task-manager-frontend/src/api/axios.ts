import axios from "axios";
import { authService } from '../auth/auth.service';


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json', 
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = authService.getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
