import { Task } from "../entity/task";

export interface TaskGateway {
    findAllByUser(userId: string): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    save(task: Task): Promise<Task>;
    update(id: string, task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}