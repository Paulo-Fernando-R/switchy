/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

const tempToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyYmE5MzkzOWRlNWEzZjFkZmU5NmEiLCJpYXQiOjE3MjkyODA2NTksImV4cCI6MTcyOTI4NDI1OX0.StEc8c6ItNo0qHnQ9CZnDONubeOi6ftsK8EdGgiTzeU";

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        Authorization: tempToken,
    },
});

const reqInterceptor = async (config: InternalAxiosRequestConfig<AxiosResponse>) => {
    config.validateStatus = () => true;
    return config;
};

const resInterceptor = (response: AxiosResponse) => {
    if (response.status === 401) {
        //todo
    }
    return response;
};

const errInterceptor = async (error: AxiosError) => {
    //  const {  } = error;
    //todo
    return Promise.reject(error);
};
instance.interceptors.response.use(resInterceptor);
instance.interceptors.request.use(reqInterceptor, errInterceptor);

const axiosInstance = instance;
export default axiosInstance;