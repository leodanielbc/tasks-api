import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { JwtService } from "../../../../auth/jwt.service";
import { UserRepositoryFirestore } from "../../../../repositories/user/user.repository.firebase";


export type LoginUserResponseDto = {
    token: string;
};

export class LoginUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly userRepository: UserRepositoryFirestore
    ) { }

    public static create() {
        return new LoginUserRoute(
            "/users/login",
            HttpMethod.POST,
            UserRepositoryFirestore.create()
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            try {
                const { email } = req.body;

                if (!email) {
                    res.status(400).json({ error: "Email is required" });
                    return;
                }
                
                const user = await this.userRepository.findByEmail(email);
                
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                
                const token = JwtService.generateToken({
                    id: user?.id,
                    email: user?.email,
                });
                
                const responseBody: LoginUserResponseDto = { token };
                
                res.status(200).json(responseBody);
            } catch (error) {
                console.error("Login error:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}