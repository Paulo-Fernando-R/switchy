import { inject, injectable } from "inversify";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserNotFoundError } from "../errors/userErrors";
import IUserByIdResponse from "../responses/userByIdResponse";
import "reflect-metadata";

@injectable()
export default class GetUserByIdCase {
    private readonly userRepository: IUserRepository;

    constructor(
        @inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<IUserByIdResponse> {
        const user = await this.userRepository.getById(userId);
        if (user == null) {
            throw new UserNotFoundError();
        }

        const response: IUserByIdResponse = {
            id: user.id!.toString(),
            email: user.email,
            userName: user.userName!,
            description: user.description ?? null,
            name: user.name,
            createdAt: user.createdAt!,
            followers: user.followers ?? [],
            following: user.following ?? [],
        };

        return response;
    }
}