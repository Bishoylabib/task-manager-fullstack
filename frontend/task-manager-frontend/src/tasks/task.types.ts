export interface CreateTaskData{
    title: string;
    description?: string;
    completed?: boolean;
}

export interface UpdateTaskData{
    title?: string;
    description?: string;
    completed?: boolean
}

export interface Task{
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    userId: string;
    createdAt: string;
}