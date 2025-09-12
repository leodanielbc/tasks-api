import { Request, Response } from "express";
import { HttpMethod, Route, RouteHandler } from "../route";
import { CreateTaskInputDto, CreateTaskUseCase } from "../../../../../usescases/create-task/create-task.usecase";
import { authMiddleware } from "../../middleware/auth.middleware";

export type CreateTaskResponseDto = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    userId: string;
}

export class CreateTaskRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTaskService: CreateTaskUseCase
    ) { }

    public static create(createTaskService: CreateTaskUseCase) {
        return new CreateTaskRoute("/tasks", HttpMethod.POST, createTaskService);
    }

    public getHandler(): RouteHandler[] {
        return [
            authMiddleware,
            async (req: Request, res: Response) => {
                try {
                    const { title, description, userId } = req.body;
                    if (!title) {
                        res.status(400).json({ error: "Title is required" });
                        return;
                    }

                    const input: CreateTaskInputDto = {
                        title,
                        description,
                        userId
                    }

                    const output: CreateTaskResponseDto = await this.createTaskService.execute(input);

                    res.status(201).json(output).send();
                } catch (err) {
                    console.error("CreateTask error:", err);
                    res.status(500).json({ error: "Internal server error" });
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
