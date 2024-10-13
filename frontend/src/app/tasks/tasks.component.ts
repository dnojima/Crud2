import { Component, OnInit } from '@angular/core';
import { TasksService, Task } from '../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    isCompleted: false,
  };

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (this.newTask.title) {
      this.tasksService.createTask(this.newTask).subscribe(() => {
        this.newTask = { title: '', description: '', isCompleted: false };
        this.loadTasks();
      });
    }
  }

  markAsCompleted(task: Task) {
    task.isCompleted = true;
    this.tasksService.updateTask(task.id!, task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task.id!).subscribe(() => {
      this.loadTasks();
    });
  }
}
