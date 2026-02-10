import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {

    @ApiProperty({ description: 'Task title', maxLength: 100 })
    @IsNotEmpty()
    @MaxLength(100)
    title!: string;

    @ApiProperty({ description: 'Task description', maxLength: 500, required: false})
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @ApiProperty({ description: 'Task completion status', required: false })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}