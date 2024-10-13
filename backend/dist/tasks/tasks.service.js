"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    findAll() {
        return this.tasksRepository.find();
    }
    findOne(id) {
        return this.tasksRepository.findOneBy({ id });
    }
    create(task) {
        const newTask = this.tasksRepository.create(task);
        return this.tasksRepository.save(newTask);
    }
    async update(id, task) {
        await this.tasksRepository.update(id, task);
        const updatedTask = await this.tasksRepository.findOneBy({ id });
        if (!updatedTask) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return updatedTask;
    }
    async remove(id) {
        const deleteResult = await this.tasksRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map