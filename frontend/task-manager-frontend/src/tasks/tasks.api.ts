import { api } from "../api/axios";
import type { CreateTaskData, UpdateTaskData, Task } from "./task.types";

export const getTasksApi = () => 
    api.get<Task[]>('/tasks');

export const getTaskApi = (id: number) => 
    api.get<Task>(`/tasks/${id}`);

export const createTaskApi = (data: CreateTaskData) => 
    api.post<Task>('/tasks', data);

export const updateTaskApi = (id: number, data: UpdateTaskData) => 
    api.patch<Task>(`/tasks/${id}`, data);

export const deleteTaskApi = (id: number) => 
    api.delete(`/tasks/${id}`);

