import { UserGateway } from "../../domain/user/gateway/user.gateway";

export type FindUserInputDto = {
    email: string;
};

export type FindUserOutputDto = {
    id: string;
    email: string;
} | null;

export class FindUserUseCase {
    constructor(private readonly userGateway: UserGateway) { }

    public static create(userGateway: UserGateway) {
        return new FindUserUseCase(userGateway);
    }

    public async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const { email } = input;
        const user = await this.userGateway.findByEmail(email);
        if (!user) return null;

        return {
            id: user.id!,
            email: user.email,
        };
    }
}