import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // ... outros módulos
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // ou seu usuário do PostgreSQL
      password: 'nojimaT24', // ou sua senha do PostgreSQL
      database: 'task_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Em produção, isso deve ser false
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
