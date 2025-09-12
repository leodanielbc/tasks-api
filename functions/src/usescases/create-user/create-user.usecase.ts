

import { User } from '../../domain/user/entity/user';
import { UserGateway } from '../../domain/user/gateway/user.gateway';

export type CreateUserInputDto = {
    email: string;
}

export type CreateUserOutputDto = {
    id: string;
}


export class CreateUserUseCase {
    constructor(private userGateway: UserGateway) { }

    public static create(userGateway: UserGateway) {
        return new CreateUserUseCase(userGateway);
    }


    public async execute({ email }: CreateUserInputDto): Promise<CreateUserOutputDto> {

        const user = User.create(email);
        
        const userAlreadyExists = await this.userGateway.findByEmail(user.email);
        if (userAlreadyExists) {
            throw new Error('User already exists with this email');
        }
        
        const createdUser = await this.userGateway.save(user);

        const output: CreateUserOutputDto = {
            id: createdUser.id!
        }

        return output;
    }
}