import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type DeleteTaskInputDto = {
    id: string;
};

export class DeleteTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway) {
        return new DeleteTaskUseCase(taskGateway);
    }

    public async execute(input: DeleteTaskInputDto): Promise<void> {
        const existingTask = await this.taskGateway.findById(input.id);
        if (!existingTask) {
            throw new Error("Task not found");
        }

        await this.taskGateway.delete(input.id);
    }
}
