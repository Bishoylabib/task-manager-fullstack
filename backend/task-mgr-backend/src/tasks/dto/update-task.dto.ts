import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiPropertyOptional({ description: 'Task title', maxLength: 100})
    title?: string;

    @ApiPropertyOptional({ description:'Task description', maxLength: 500})
    description?: string;

    @ApiPropertyOptional({ description: 'Task completion status' })
    completed?: boolean;
}