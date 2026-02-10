import { api } from "../api/axios";
import type { User } from "../auth/auth.types";

export const getMeApi = () => api.get<User>('/users/me');