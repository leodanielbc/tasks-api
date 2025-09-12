import { CreateUserUseCase, CreateUserInputDto } from '../../usescases/create-user/create-user.usecase';
import { UserGateway } from '../../domain/user/gateway/user.gateway';
import { User } from '../../domain/user/entity/user';

describe('CreateUserUseCase', () => {
  let userGateway: jest.Mocked<UserGateway>;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    userGateway = {
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    useCase = CreateUserUseCase.create(userGateway);
  });

  it('should create a new user if email does not exist', async () => {
    userGateway.findByEmail.mockResolvedValue(null);
    userGateway.save.mockImplementation(async (user: User) => {
      const id = '123';
      return { id } as User;
    });

    const input: CreateUserInputDto = { email: 'test@example.com' };
    const output = await useCase.execute(input);

    expect(output.id).toBe('123');
    expect(userGateway.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userGateway.save).toHaveBeenCalled();
  });

  it('should throw an error if user already exists', async () => {
    userGateway.findByEmail.mockResolvedValue(User.create('test@example.com'));

    const input: CreateUserInputDto = { email: 'test@example.com' };
    await expect(useCase.execute(input)).rejects.toThrow('User already exists with this email');
  });
});