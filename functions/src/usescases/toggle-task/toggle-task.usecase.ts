import { TaskGateway } from "../../domain/task/gateway/task.gateway";

export type ToggleTaskInputDto = {
  id: string;
};

export class ToggleTaskCompleteUseCase {
  constructor(private taskGateway: TaskGateway) {}

  public static create(taskGateway: TaskGateway) {
    return new ToggleTaskCompleteUseCase(taskGateway);
  }

  public async execute(input: ToggleTaskInputDto) {
    const existingTask = await this.taskGateway.findById(input.id);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    const toggledTask = existingTask.toggleComplete();

    return await this.taskGateway.update(input.id, toggledTask);
  }
}
