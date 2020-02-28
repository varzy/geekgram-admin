import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosStatic } from 'axios';
import { Message as ElMessage } from 'element-ui';

interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  showError: boolean;
  errorMsg: string;
}

// export interface ICustomAxiosInstance extends AxiosInstance {
//   (config: ICustomAxiosRequestConfig): AxiosPromise;
// }
//
// interface ICustomAxiosStatic extends AxiosStatic {
//   create(config?: ICustomAxiosInstance): AxiosInstance;
// }

const instance = Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json; charset=utf-8'
  }
});

instance.interceptors.request.use(originalConfig => {
  const config = originalConfig as ICustomAxiosRequestConfig;

  config.showError = config.hasOwnProperty('showError') ? config.showError : true;
  config.errorMsg = config.hasOwnProperty('errorMsg') ? config.errorMsg : '网络异常，请稍候重试';

  return config;
});

instance.interceptors.response.use(
  res => res,
  err => {
    const res = err.response;

    if (res.config.showError && res.config.errorMsg) {
      ElMessage({ message: res.config.errorMsg, type: 'error' });
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn(`!!! HTTP ERROR !!!`);
      console.error(res);
    }

    return Promise.reject(res);
  }
);

export default instance;
