import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal:true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
