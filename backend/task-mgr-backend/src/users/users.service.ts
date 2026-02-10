import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../generated/prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async createUser(data: {email: string; fullName: string; password: string}) {
        return this.prisma.user.create({ 
            data,
            select:{
                id:true,
                email:true,
                fullName:true,
                createdAt:true,
            },
        });
    }

}
