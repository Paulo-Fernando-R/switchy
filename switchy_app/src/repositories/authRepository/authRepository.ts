import { BadRequestError, InternalServerError, NetworkError, NotFoundError } from "../../errors/customErrors";
import Auth from "../../models/auth";
import ICustomAxiosClient from "../../services/customAxiosClient/IcustomAxiosClient";
import CustomAxiosClient from "../../services/customAxiosClient/customAxiosClient";

export default class AuthRepository {
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
