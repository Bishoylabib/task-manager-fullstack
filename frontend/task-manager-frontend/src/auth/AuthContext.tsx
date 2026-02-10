import { createContext } from "react";
import type { User } from "./auth.types";

interface AuthContextType{
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);