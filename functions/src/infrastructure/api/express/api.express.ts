import express, { Express, Request, Response, NextFunction } from "express";
//import cors from 'cors';
import { Api } from "../api";
import { Route } from "./routes/route";
//import { corsOptions } from "./middleware/cors.middleware";
import 'dotenv/config';

export class ApiExpress implements Api {

    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', process.env.URL_FRONTEND || 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

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
            console.log(`Registered route: [${method.toUpperCase()}] ${path}`);
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