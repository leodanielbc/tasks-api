import { Response } from "express";
import { DeleteTaskUseCase } from "../../../../../usescases/delete-task/delete-task.usecase";
import { authMiddleware, AuthRequest } from "../../middleware/auth.middleware";
import { HttpMethod, Route, RouteHandler } from "../route";

export class DeleteTaskRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteTaskUseCase: DeleteTaskUseCase
    ) { }

    public static create(deleteTaskUseCase: DeleteTaskUseCase) {
        return new DeleteTaskRoute("/tasks/:id", HttpMethod.DELETE, deleteTaskUseCase);
    }

    public getHandler(): RouteHandler[] {
        return [
            authMiddleware,
            async (req: AuthRequest, res: Response) => {
                try {
                    const taskId = req.params.id;
                    const userId = req.user!.id;

                    await this.deleteTaskUseCase.execute({ id: taskId, userId });

                    res.status(204).send();
                } catch (err: any) {
                    console.error("DeleteTask error:", err);
                    res.status(500).json({ error: err.message || "Internal server error" });
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