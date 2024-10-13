import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Método para obter todas as tarefas
  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // Método para obter uma tarefa pelo ID
  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  // Método para criar uma nova tarefa
  create(task: Task): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  // Método para atualizar uma tarefa existente
  async update(id: number, task: Task): Promise<Task> {
    await this.tasksRepository.update(id, task);
    const updatedTask = await this.tasksRepository.findOneBy({ id });
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  // Método para excluir uma tarefa
  async remove(id: number): Promise<void> {
    const deleteResult = await this.tasksRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
