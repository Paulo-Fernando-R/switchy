import { BadRequestError, InternalServerError, NetworkError, NotFoundError } from "../../errors/customErrors";
import Auth from "../../models/auth";

import baseAxios from "axios";
import IRefreshTokenService from "./IrefreshTokenService";
export default class RefreshTokenService implements IRefreshTokenService {
    private url: string;

    constructor(){
        this.url = process.env.EXPO_PUBLIC_API_URL??"";
    }

    async execute(token: string): Promise<Auth> {
        const data = {
            token: token,
        };

        const response = await baseAxios.post(this.url + "/Login/RefreshToken", data, { validateStatus: () => true });

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
