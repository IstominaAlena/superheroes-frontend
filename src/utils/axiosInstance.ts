import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, } from "axios";

import { API_URL } from "../constants/apiConstants";

export const instance: AxiosInstance = axios.create({
	baseURL: API_URL,
});

// instance.interceptors.request.use(
// 	(config: AxiosRequestConfig) => {
// 		const token = getLocalToken();
// 		if (token) {
// 			config.headers!.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	}
// );

instance.interceptors.response.use(
	(response: AxiosResponse) => response
);
