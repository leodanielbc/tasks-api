import { Task } from "../../domain/task/entity/task";
import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type GetTasksInputDto = {
    userId: string;
};

export type GetTasksOutputDto = {
    tasks: Task[];
};

export class GetTasksUseCase {
    constructor(private taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway) {
        return new GetTasksUseCase(taskGateway);
    }

    public async execute(input: GetTasksInputDto): Promise<GetTasksOutputDto> {
        const tasks = await this.taskGateway.findAllByUser(input.userId);

        return { tasks };
    }
}
