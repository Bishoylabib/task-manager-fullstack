import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @ApiOperation({ summary: 'Get current logged-in user profile'})
    @ApiResponse({ status: 200, description: 'Returns the authenticated user info'})
    @ApiResponse({ status: 401, description: 'Unauthorized, invalid or missing JWT token'})
    getProfile(@Req() req) {
        return {
            message: 'Protected route',
            user: req.user,
        };
    }
}
