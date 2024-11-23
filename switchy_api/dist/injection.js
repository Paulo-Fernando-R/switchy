"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = container;
const node_dependency_injection_1 = require("node-dependency-injection");
function container() {
    return __awaiter(this, void 0, void 0, function* () {
        let container = new node_dependency_injection_1.ContainerBuilder(false, '/src');
        const autowire = new node_dependency_injection_1.Autowire(container);
        yield autowire.process();
        yield container.compile();
        return container;
    });
}
// Services
/*container.register('service.token', JwtTokenService);
container.register('service.encrypt', EncryptServiceBcrypt);
container.register('service.generatePassword', GeneratePasswordService);

// Repositories
container.register("repository.user", UserRepository);
container.register("repository.post", PostRepository);

// Cases

/// User
container.register('case.user.signUp', SignUpCase, ['repository.user', 'service.encrypt']);
container.register('case.user.getUserByEmailPassword', GetUserByEmailPasswordCase).addArgument('repository.user');
container.register('case.user.generateTokenFromUser', GenerateTokenFromUserCase, ['service.token']);
container.register('case.user.getUserFromToken', GetUserFromTokenCase, ['repository.user', 'service.token']);*/
