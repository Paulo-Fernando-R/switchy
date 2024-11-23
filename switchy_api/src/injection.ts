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
import { PostRepository } from "./repositories/postRepository/postRepository";
import IPostRepository from "./repositories/postRepository/IpostRepository";
import SaveCommentCase from "./domain/post/cases/saveCommentCase";
import GetCommentsCase from "./domain/post/cases/getCommentsCase";
import GetUserByIdCase from "./domain/user/cases/getUserByIdCase";

let container = new Container();
container.bind<ITokenService>('TokenService').to(JwtTokenService);
container.bind<IEncryptService>('EncryptService').to(EncryptServiceBcrypt);

container.bind<IUserRepository>('UserRepository').to(UserRepository);
container.bind<IPostRepository>('PostRepository').to(PostRepository);

container.bind('GetUserByEmailPasswordCase').to(GetUserByEmailPasswordCase);
container.bind('GenerateTokenFromUserCase').to(GenerateTokenFromUserCase);
container.bind('GetUserFromTokenCase').to(GetUserFromTokenCase);
container.bind('SaveCommentCase').to(SaveCommentCase);
container.bind('GetCommentsCase').to(GetCommentsCase);
container.bind('GetUserByIdCase').to(GetUserByIdCase);

export default container;