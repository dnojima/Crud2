import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Rota para obter todas as tarefas
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // Rota para obter uma tarefa específica pelo ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  // Rota para criar uma nova tarefa (apenas para administradores)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  // Rota para atualizar uma tarefa existente (apenas para administradores)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: Task,
  ): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  // Rota para excluir uma tarefa (apenas para administradores)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
