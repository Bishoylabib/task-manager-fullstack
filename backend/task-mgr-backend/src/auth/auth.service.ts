import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
        console.log('JWT service ready');
    }

    //Signup: hash password, create user, return JWT
    async signup(data: { email: string; fullName: string; password: string }) {
        //Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        //Create the user
        const user = await this.usersService.createUser({
            ...data,
            password: hashedPassword,
        });

        //Generate JWT
        const token = this.generateJWT(user.id);

        return { token, user };
    }

    //Login: verify email and password, return JWT
    async login(data: { email: string, password: string}) {
        const user = await this.usersService.findByEmail(data.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateJWT(user.id);
        const { password, ...safeUser } = user;
        return { token, user: safeUser };
    }

    //Helper to generate JWT
    private generateJWT(userId: string) {
        return this.jwtService.sign({ sub: userId });
    }
}
