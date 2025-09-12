import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type DeleteTaskInputDto = {
    id: string;
    userId: string;
};

export class DeleteTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway) {
        return new DeleteTaskUseCase(taskGateway);
    }

    public async execute(input: DeleteTaskInputDto): Promise<void> {
        const { id, userId } = input;
        const existingTask = await this.taskGateway.findById(input.id);
        if (!existingTask || existingTask.userId !== userId) {
            throw new Error("Task not found or access denied");
        }

        await this.taskGateway.delete(input.id);
    }
}
