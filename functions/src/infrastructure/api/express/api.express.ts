import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import { corsMiddleware } from "./middleware/cors.middleware";


export class ApiExpress implements Api {

    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(corsMiddleware);
        this.app.use(express.json());

        this.addRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    public getApp(): Express {
        return this.app;
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            if (Array.isArray(handler)) {
                this.app[method](path, ...handler);
            } else {
                this.app[method](path, handler);
            }
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes() {
        const routes = this.app.router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                }
            });
        console.log(routes);
    }
}