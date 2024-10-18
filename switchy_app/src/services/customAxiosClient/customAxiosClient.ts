import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

const url = process.env.EXPO_PUBLIC_API_URL;

const instance = axios.create({
    baseURL: url,
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
