import "dotenv/config";
import { ApiExpress } from "./infrastructure/api/express/api.express";
import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user.express.route";
import { initFirebase } from "./infrastructure/package/firebase";
import { UserRepositoryFirestore } from "./infrastructure/repositories/user/user.repository.firebase";
import { CreateUserUseCase } from "./usescases/create-user/create-user.usecase";
import { LoginUserRoute } from "./infrastructure/api/express/routes/user/login-user.express.route";
import { CreateTaskRoute } from "./infrastructure/api/express/routes/task/create-task.express.route";
import { TaskRepositoryFirestore } from "./infrastructure/repositories/task/task.repository.firebase";
import { CreateTaskUseCase } from "./usescases/create-task/create-task.usecase";
import { ListTasksRoute } from "./infrastructure/api/express/routes/task/list-task.express.route";
import { GetTasksUseCase } from "./usescases/get-tasks/get-task.usecase";
import { UpdateTaskUseCase } from "./usescases/update-task/update-task.usecase";
import { UpdateTaskRoute } from "./infrastructure/api/express/routes/task/update-task.express.route";
import { DeleteTaskRoute } from "./infrastructure/api/express/routes/task/delete-task.express.route";
import { DeleteTaskUseCase } from "./usescases/delete-task/delete-task.usecase";

export function createApp() {

    initFirebase();

    const userRepository = UserRepositoryFirestore.create();
    const taskRepository = TaskRepositoryFirestore.create();

    const createUserUsecase = CreateUserUseCase.create(userRepository);
    const createTaskUsecase = CreateTaskUseCase.create(taskRepository);
    const listTaskUseCase = GetTasksUseCase.create(taskRepository);
    const updateTaskUseCase = UpdateTaskUseCase.create(taskRepository);
    const deleteTaskUseCase = DeleteTaskUseCase.create(taskRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const loginUserRoute = LoginUserRoute.create();
    const listTaskRoute = ListTasksRoute.create(listTaskUseCase);
    const updateTaskRoute = UpdateTaskRoute.create(updateTaskUseCase);
    const deleteTaskRoute = DeleteTaskRoute.create(deleteTaskUseCase);

    const createTaskRoute = CreateTaskRoute.create(createTaskUsecase);

    const api = ApiExpress.create([
        createUserRoute,
        loginUserRoute,
        createTaskRoute,
        listTaskRoute,
        updateTaskRoute,
        deleteTaskRoute
    ]);

    return api;
}