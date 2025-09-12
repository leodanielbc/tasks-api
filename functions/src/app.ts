import "dotenv/config";
import { ApiExpress } from "./infrastructure/api/express/api.express";
import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user.express.route";
import { initFirebase } from "./infrastructure/package/firebase";
import { UserRepositoryFirestore } from "./infrastructure/repositories/user/user.repository.firebase";
import { CreateUserUseCase } from "./usescases/create-user/create-user.usecase";
import { LoginUserRoute } from "./infrastructure/api/express/routes/user/login-user.express.route";

export function createApp () {

    initFirebase();

    const userRepository = UserRepositoryFirestore.create();

    const createUserUsecase = CreateUserUseCase.create(userRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const loginUserRoute = LoginUserRoute.create();

    const api = ApiExpress.create([createUserRoute, loginUserRoute]);

    return api;
}