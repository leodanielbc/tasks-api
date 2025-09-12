import { Response } from "express";
import { HttpMethod, Route, RouteHandler } from "../route";
import { authMiddleware, AuthRequest } from "../../middleware/auth.middleware";
import { GetTasksOutputDto, GetTasksUseCase } from "../../../../../usescases/get-tasks/get-task.usecase";


export type ListTasksResponseDto = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    userId: string;
}[];

export class ListTasksRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getTasksUseCase: GetTasksUseCase
    ) { }

    public static create(getTasksUseCase: GetTasksUseCase) {
        return new ListTasksRoute("/tasks", HttpMethod.GET, getTasksUseCase);
    }

    public getHandler(): RouteHandler[] {
        return [
            authMiddleware,
            async (req: AuthRequest, res: Response) => {
                try {
                    const userId = req.user!.id;
                    const tasks: GetTasksOutputDto = await this.getTasksUseCase.execute({ userId });

                    res.status(200).json(tasks);
                } catch (err) {
                    console.error("ListTasks error:", err);
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
