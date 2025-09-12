
export type UpdateTaskInputDto = {
    title?: string;
    description?: string;
    completed?: boolean;
}

export type UpdateTaskResponseDto = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    userId: string;
}

import { Request, Response } from "express";
import { HttpMethod, Route, RouteHandler } from "../route";
import { authMiddleware, AuthRequest } from "../../middleware/auth.middleware";
import { UpdateTaskUseCase } from "../../../../../usescases/update-task/update-task.usecase";


export class UpdateTaskRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTaskUseCase: UpdateTaskUseCase
    ) { }

    public static create(updateTaskUseCase: UpdateTaskUseCase) {
        return new UpdateTaskRoute("/tasks/:id", HttpMethod.PUT, updateTaskUseCase);
    }

    public getHandler(): RouteHandler[] {
        return [
            authMiddleware,
            async (req: AuthRequest, res: Response) => {
                try {
                    const taskId = req.params.id;
                    const userId = req.user!.id; // el middleware asegura que exista
                    const { title, description, completed } = req.body;

                    const input: UpdateTaskInputDto = { title, description, completed };

                    const updatedTask: UpdateTaskInputDto = await this.updateTaskUseCase.execute({ id: taskId, userId, ...input });

                    res.status(200).json(updatedTask);
                } catch (err: any) {
                    console.error("UpdateTask error:", err);
                    res.status(err.message === "Task not found" ? 404 : 500).json({ error: err.message });
                }
            }
        ];
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}
