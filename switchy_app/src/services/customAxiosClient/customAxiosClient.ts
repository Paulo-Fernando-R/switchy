/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosInstance } from "axios";
import ICustomAxiosClient from "./IcustomAxiosClient";
import StorageService from "../storageService/storageService";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import IStorageService from "../storageService/IstorageService";
import Auth from "../../models/auth";
import RefreshTokenService from "../refreshTokenService/refreshTokenService";
import RNRestart from 'react-native-restart';

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
            timeout: 1000 * 30 // 30 seconds to timeout
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
          
            if (res) {
                const refresh = await this.refreshToken(res?.refreshToken);
               
                if (refresh) {
                    this.instance.defaults.headers.common["Authorization"] = refresh.accessToken;
                    response.status = 400;
                    return response;
                }
            }
            RNRestart.restart();
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
