import { TasksService } from './tasks.service';
import { Task } from './task.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(task: Task): Promise<Task>;
    update(id: number, task: Task): Promise<Task>;
    remove(id: number): Promise<void>;
}
