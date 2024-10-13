import { Task } from './task.entity';
import { Repository } from 'typeorm';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(task: Task): Promise<Task>;
    update(id: number, task: Task): Promise<Task>;
    remove(id: number): Promise<void>;
}
