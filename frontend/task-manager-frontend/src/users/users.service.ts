import { getMeApi } from "./users.api";
import type { User } from "../auth/auth.types";

export const usersService = {
    getMe: async (): Promise<User> => {
        const res = await getMeApi();
        return res.data;
    },
};