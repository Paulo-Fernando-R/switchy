/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosInstance } from "axios";
import ICustomAxiosClient from "./IcustomAxiosClient";

const tempToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE1MWM1ZWM3ZTU2NWJmNjdiOTQ2MjkiLCJpYXQiOjE3Mjk0MzY3NjYsImV4cCI6MTcyOTUyMzE2Nn0.o5wJu_b9lA4axdPBB5soTZXfGdT5iWCP93UKM2LkOFU";



export default class CustomAxiosClient implements ICustomAxiosClient {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: {
                Authorization: tempToken,//mudar para storage
            },
        });

        this.instance.interceptors.request.use(this.reqInterceptor(), this.errorInterceptor());
        this.instance.interceptors.response.use(this.resInterceptor());
    }

    private resInterceptor() {
        const interceptor = (response: AxiosResponse) => {
            if (response.status === 401) {
                //todo
            }
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
