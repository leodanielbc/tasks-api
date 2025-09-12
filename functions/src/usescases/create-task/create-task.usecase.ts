import { Task } from "../../domain/task/entity/task";
import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type CreateTaskInputDto = {
    title: string;
    description: string;
    userId: string;
};

export type CreateTaskOutputDto = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    userId: string;
};

export class CreateTaskUseCase {
    constructor(private taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway) {
        return new CreateTaskUseCase(taskGateway);
    }

    public async execute(input: CreateTaskInputDto): Promise<CreateTaskOutputDto> {
        const task = Task.create({
            title: input.title,
            description: input.description,
            completed: false,
            createdAt: new Date().toISOString(),
            userId: input.userId,
        });

        const savedTask = await this.taskGateway.save(task);
        
        const output: CreateTaskOutputDto = {
            id: savedTask.id!,
            title: input.title,
            description: input.description,
            completed: savedTask.completed,
            createdAt: savedTask.createdAt,
            userId: savedTask.userId,
        };

        return output;
    }
}