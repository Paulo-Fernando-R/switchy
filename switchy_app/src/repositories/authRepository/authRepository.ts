import { BadRequestError, InternalServerError, NetworkError, NotFoundError } from "../../errors/customErrors";
import Auth from "../../models/auth";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";
import IAuthRepository from "./IauthRepository";
import baseAxios from "axios";
export default class AuthRepository implements IAuthRepository {
    private axios: ICustomAxiosClient;

    constructor() {
        this.axios = new CustomAxiosClient();
    }

    async login(email: string, password: string): Promise<Auth> {
        const data = {
            email: email,
            password: password,
        };

        const response = await this.axios.instance.post("/Login/SignIn", data);
        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError(400, "", "Email ou senha incorretos");
        }

        if (response.status === 404) {
            throw new NotFoundError(404, "", "Usuario nao encontrado");
        }

        if (response.status !== 200) {
            throw new InternalServerError();
        }

        return response.data;
    }

    async signUp(name: string, username: string, email: string, password: string): Promise<Auth> {
        const data = {
            name: name,
            userName: username,
            email: email,
            password: password,
        };

        const response = await this.axios.instance.post("/Login/SignUp", data);
        console.log(response.status);
        if (!response) {
            throw new NetworkError();
        }

        if (response.status === 400) {
            throw new BadRequestError();
        }

        if (response.status === 404) {
            throw new NotFoundError();
        }

        if (response.status !== 201) {
            throw new InternalServerError();
        }

        return response.data;
    }

    async recovery(email: string): Promise<void> {
        const data = {
            email: email,
        };

        const response = await this.axios.instance.post("/Login/Password/Recovery", data);

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
}
