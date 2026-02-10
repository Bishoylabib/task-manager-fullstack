import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ summary: 'Register a new user'})
    @ApiResponse({ status: 201, description: 'User registered successfully with JWT token'})
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user'})
    @ApiResponse({ status: 200, description: 'User logged in successfully with JWT token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials'})
    login(@Body() dto: LoginDto ) {
        return this.authService.login(dto);
    }
}
