import { UserRepository } from "./repositories/userRepository/userRepository";
import JwtTokenService from "./services/token/jwtTokenService";
import EncryptServiceBcrypt from "./services/encrypt/encryptService";
import GetUserByEmailPasswordCase from "./domain/user/cases/getUserByEmailPasswordCase";
import GenerateTokenFromUserCase from "./domain/auth/cases/generateTokenFromUserCase";
import GetUserFromTokenCase from "./domain/auth/cases/getUserFromTokenCase";
import { Container } from "inversify";
import IUserRepository from "./repositories/userRepository/IuserRepository";
import ITokenService from "./services/token/itokenService";
import IEncryptService from "./services/encrypt/iencryptService";
import "reflect-metadata";

let container = new Container();
container.bind<ITokenService>('TokenService').to(JwtTokenService);
container.bind<IEncryptService>('EncryptService').to(EncryptServiceBcrypt);

container.bind<IUserRepository>('UserRepository').to(UserRepository);

container.bind('GetUserByEmailPasswordCase').to(GetUserByEmailPasswordCase);
container.bind('GenerateTokenFromUserCase').to(GenerateTokenFromUserCase);
container.bind('GetUserFromTokenCase').to(GetUserFromTokenCase);

export default container;