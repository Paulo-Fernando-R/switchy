import { BadRequestError, InternalServerError, NetworkError, NotFoundError } from "../../errors/customErrors";
import Auth from "../../models/auth";

import baseAxios from "axios";
import IRefreshTokenService from "./IrefreshTokenService";
export default class RefreshTokenService implements IRefreshTokenService {
    async execute(token: string): Promise<Auth> {
        const data = {
            token: token,
        };

        const response = await baseAxios.post("/Login/RefreshToken", data, { validateStatus: () => true });
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
