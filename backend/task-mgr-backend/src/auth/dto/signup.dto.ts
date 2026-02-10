import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'Full Name', maxLength: 100, example: 'John Doe'})
    @IsNotEmpty()
    @MaxLength(100)
    fullName!: string;

    @ApiProperty({
        description:'Password with at least 1 uppercase, lowercase, 1 number, 1 special character, min length 8, max 64',
        minLength: 8,
        maxLength: 64,
        example: 'StrongP@ssw0rd'
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/, {
        message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character',
    })
    password!: string;
}