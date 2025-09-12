import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateUserInputDto, CreateUserUseCase } from "../../../../../usescases/create-user/create-user.usecase";

export type CreateUserResponseDto = {
    id: string;
}

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private createUserService: CreateUserUseCase
    ) { }

    public static create(createUserService: CreateUserUseCase) {
        return new CreateUserRoute(
            "/users",
            HttpMethod.POST,
            createUserService
        );
    }

    public getHandler(){
        return async (req: Request, res: Response) => {
            const { email } = req.body;

            const input: CreateUserInputDto = {
                email
            }

            const output: CreateUserResponseDto = await this.createUserService.execute(input);

            const responseBody = this.present(output);
            res.status(201).json(responseBody).send();
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateUserResponseDto): CreateUserResponseDto {
        const response = {
            id: input.id
        };

        return response;
    }
        
}