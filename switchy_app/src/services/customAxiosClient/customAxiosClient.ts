/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosInstance } from "axios";
import ICustomAxiosClient from "./IcustomAxiosClient";
import StorageService from "../storageService/storageService";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import IStorageService from "../storageService/IstorageService";
import Auth from "../../models/auth";
import IAuthRepository from "../../repositories/authRepository/IauthRepository";
import AuthRepository from "../../repositories/authRepository/authRepository";
import RefreshTokenService from "../refreshTokenService/refreshTokenService";

const tempToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEwMDkzNGY4MTNmY2I5MjA3YmU0YjUiLCJpYXQiOjE3Mjk1MjQ3MTMsImV4cCI6MTcyOTYxMTExM30.WwKXgMqkeB8iIFW7gwPgu9tbdHxKaeu7VbgQZSGE4C4";

export default class CustomAxiosClient implements ICustomAxiosClient {
    instance: AxiosInstance;
    storage: IStorageService<Auth>;
    constructor() {
        this.storage = new StorageService<Auth>(StorageTypeEnum.auth);
        this.instance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: {
                Authorization: this.getTokenFromStorage()?.accessToken,
            },
        });

        this.instance.interceptors.request.use(this.reqInterceptor(), this.errorInterceptor());
        this.instance.interceptors.response.use(this.resInterceptor());
    }

    getTokenFromStorage() {
        const res = this.storage.getItem();
        return res;
    }
    private async refreshToken(token: string) {
        try {
            const res = await new RefreshTokenService().execute(token);
            this.storage.setItem(res);
            return res;
        } catch (error) {
            console.error(error);
            this.storage.removeItem();
            return;
        }
    }


    private resInterceptor() {
        const interceptor = async (response: AxiosResponse) => {
            if (response.status !== 401) return response;

            const res = this.getTokenFromStorage();
            if (res) await this.refreshToken(res?.refreshToken);
            return response;
        };

        return interceptor;
    }

    private reqInterceptor() {
        const interceptor = async (config: InternalAxiosRequestConfig<AxiosResponse>) => {
            config.validateStatus = () => true;

            return config;
        };

        return interceptor;
    }

    private errorInterceptor() {
        const interceptor = async (error: AxiosError) => {
            //  const {  } = error;
            //todo
            return Promise.reject(error);
        };

        return interceptor;
    }
}
