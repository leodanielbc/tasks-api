import { User } from '../entity/user';


export interface UserGateway {
findByEmail(email: string): Promise<User | null>;
save(user: User): Promise<User>;
}