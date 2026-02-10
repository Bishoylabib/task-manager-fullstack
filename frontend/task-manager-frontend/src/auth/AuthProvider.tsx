import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { usersService } from "../users/users.service";
import { authService } from "./auth.service";
import type { User } from "./auth.types";

export const AuthProvider = ({ children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = authService.getToken();
            if(!token){
                setLoading(false);
                return;
            }

            try {
                const me = await usersService.getMe();
                setUser(me);
            } catch {
                authService.logout();
                setUser(null);
            } finally{
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};