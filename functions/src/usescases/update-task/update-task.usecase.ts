import { Task } from "../../domain/task/entity/task";
import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type UpdateTaskInputDto = {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
    userId?: string;
    createdAt?: string;
};

export class UpdateTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway) {
        return new UpdateTaskUseCase(taskGateway);
    }

    public async execute(input: UpdateTaskInputDto): Promise<Task> {
        const { id, userId, title, description, completed } = input;

        const task = await this.taskGateway.findById(id);
        if (!task || task.userId !== userId) {
            throw new Error("Task not found");
        }

        const updatedTask = Task.create({
            ...task,
            title: title ?? task.title,
            description: description ?? task.description,
            completed: completed ?? task.completed,
        });

        return await this.taskGateway.update(input.id, updatedTask);
    }
}
