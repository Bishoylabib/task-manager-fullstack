import { getTasksApi, getTaskApi, createTaskApi, updateTaskApi, deleteTaskApi } from "./tasks.api";
import type { CreateTaskData, UpdateTaskData, Task } from "./task.types";

export const taskService = {
    getTasks: async (): Promise<Task[]> => {
        const res = await getTasksApi();
        return res.data;
    },

    getTask: async (id: number): Promise<Task> => {
        const res = await getTaskApi(id);
        return res.data;
    },

    createTask: async (data: CreateTaskData): Promise<Task> => {
        const res = await createTaskApi(data);
        return res.data;
    },

    updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
        const res = await updateTaskApi(id, data);
        return res.data;
    },

    deleteTask: async (id: number): Promise<void> => {
        await deleteTaskApi(id);
    },
};

