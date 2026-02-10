import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private taskService: TasksService) {}

        @Get()
        @ApiOperation({ summary: 'Get all tasks for the authenticated user'})
        @ApiResponse({ status: 200, description: 'List of tasks returned successfully'})
        getTasks(@Req() req) {
            return this.taskService.getTasks(req.user.userId);
        }

        @Get(':id')
        @ApiOperation({summary: 'Get a task by ID'})
        @ApiResponse({ status: 200, description: 'Task found and returned'})
        @ApiResponse({ status: 404, description: 'Task not found'})
        getTask(@Req() req, @Param('id', ParseIntPipe) id: number) {
            return this.taskService.getTask(req.user.userId, id);
        }

        @Post()
        @ApiOperation({ summary: 'Create a new task'})
        @ApiResponse({ status:201, description: 'Task created successfully'})
        creatTask(@Req() req, @Body() dto: CreateTaskDto) {
            return this.taskService.createTask(req.user.userId, dto);
        }

        @Patch(':id')
        @ApiOperation({ summary: 'Update an existing task'})
        @ApiResponse({ status: 200, description: 'Task updated successfully'})
        @ApiResponse({ status: 404, description: 'Task not found'})
        updateTask(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
            return this.taskService.updateTask(req.user.userId, id, dto);
        }

        @Delete(':id')
        @ApiOperation({ summary: 'Delete a task'})
        @ApiResponse({ status: 200, description: 'Task deleted successfully'})
        @ApiResponse({ status: 404, description: 'Task not found'})
        deleteTask(@Req() req, @Param('id', ParseIntPipe) id: number) {
            return this.taskService.deleteTask(req.user.userId, id);
        }
}
