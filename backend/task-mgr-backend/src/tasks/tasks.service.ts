import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../generated/prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async getTasks(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getTask(userId: string, taskId:number): Promise<Task> {
        const task = await this.prisma.task.findUnique({ where: { id: taskId } });
        if (!task) throw new NotFoundException('Task not found');
        if (task.userId !== userId) throw new ForbiddenException();
        return task;
    }

    async createTask(userId: string, dto: CreateTaskDto): Promise<Task> {
        return this.prisma.task.create({
            data: {...dto, userId},
        });
    }

    async updateTask(userId: string, taskId: number, dto: UpdateTaskDto): Promise<Task> {
        const task = await this.getTask(userId, taskId);
        return this.prisma.task.update({
            where: { id: taskId},
            data: dto,
        });
    }

    async deleteTask(userId: string, taskId: number): Promise<void> {
        const task = await this.getTask(userId, taskId);
        await this.prisma.task.delete({ where: { id: taskId} });
    }
}
