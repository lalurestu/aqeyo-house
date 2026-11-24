import { AxiosInstance } from 'axios';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    const route: any;
}

export {};
