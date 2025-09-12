import { Task } from "../../domain/task/entity/task";
import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type UpdateTaskInputDto = {
    id: string;
    title?: string;
    description?: string;
};

export class UpdateTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway) {
        return new UpdateTaskUseCase(taskGateway);
    }

    public async execute(input: UpdateTaskInputDto): Promise<Task> {
        const existingTask = await this.taskGateway.findById(input.id);
        if (!existingTask) {
            throw new Error("Task not found");
        }

        const updatedTask = existingTask.update({
            title: input.title,
            description: input.description,
        });

        return await this.taskGateway.update(input.id, updatedTask);
    }
}
