import {
    BadRequestError,
    InternalServerError,
    NetworkError,
    NotFoundError,
    UnauthorizedError,
} from "../../errors/customErrors";
import User from "../../models/user";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";

export default class UserRepository {
    private readonly axios: ICustomAxiosClient;

    constructor() {
        this.axios = new CustomAxiosClient();
    }

    async getUserInfo() {
        const response = await this.axios.instance.get<User>("/User/Info");

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }

        return response.data;
    }

    async getUserById(userId: string) {
        const response = await this.axios.instance.get<User>("/User/Info/" + userId);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }

        return response.data;
    }

    async searchUser(query: string) {
        const response = await this.axios.instance.get<User[]>("/User/Search/" + query);

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }

        return response.data;
    }

    async updateUser(user: User) {
        const response = await this.axios.instance.put<User[]>("/User/Update");

        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError();
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }
    }

    async changePassword(oldPassword: string, newPassword: string) {
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };

        const response = await this.axios.instance.post("/User/Password/Change", data);
        console.log(response.status);
        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError(400, "", "Senha incorreta");
        }

        if (response.status === 401) {
            throw new UnauthorizedError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }
    }
}
