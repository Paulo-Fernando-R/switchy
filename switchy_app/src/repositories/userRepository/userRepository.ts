import { BadRequestError, InternalServerError, NetworkError, NotFoundError } from "../../errors/customErrors";
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
        console.log(response.status)
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
