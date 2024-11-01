import axios, { AxiosResponse } from "axios";

export const API_URL = "http://188.94.156.53/api";
export const API = axios.create({
  baseURL: API_URL,
  validateStatus: (status: number) => status < 501,
});

const notificationConfig = {
  duration: 3,
  showProgress: true,
  pauseOnHover: true,
  placement: 'bottomRight',
};
export const responseAnswer = (response: AxiosResponse, api: any) => {
  // if (response.data.data?.message === "msgUnauthorized") {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("zustand-roles");
  //   localStorage.removeItem("zustand-rolemode");
  //   localStorage.removeItem("zustand-mood-skipped");
  //   window.location.reload();
  //   throw `Unauthorized: ${response.data.data.message}`;
  // }

  if (
    response.status === 200
    || response.status === 201
  ) {
    // api.success({
    //   message: "Данные успешно загружены",
    //   description: response.data.message,
    //   ...notificationConfig,
    // });
    return response.data;
  } else if (response.status === 400) {
    console.log("SON.stringify(response.detail)", JSON.stringify(response));
    api.warning({
      message: "Ошибка",
      description: JSON.stringify(response?.data?.detail),
      ...notificationConfig,
    });
    return response.data.payload;
  } else if (response.status === 401) {
    api.warning({
      message: "Авторизуйтесь",
      description: response.data.message,
      ...notificationConfig,
    });
    localStorage.removeItem("accessToken");

    throw `Bad Request: ${response.data.message}`;
  } else if (response.status === 404) {
    api.warning({
      message: "Данных нет",
      description: response.data.message,
      ...notificationConfig,
    });
    return response.data.payload;
    // throw `Bad Request: ${response.data.message}`;
  } else if (response.status === 500) {
    api.error({
      message: "Сбой сервера",
      description: response.data.message,
      ...notificationConfig,
    });
    throw `Internal Server Error: ${response.data.data.message}`;
  }

  throw `
      Failed to post place: Unexpected status code: 
      ${response.data.data.message}`;
};

export const errorAnswer = (error: string) => {
  if (error === "Bad Request: invalid token") {
    window.location.reload();
  }
  throw error;
};
export const axiosConfig = {
  validateStatus: (status: number) => status < 501,
};

export const multiPartFormDataConfig = {
  headers: { "Content-Type": "multipart/form-data" },
  validateStatus: axiosConfig.validateStatus,
};

// request interceptor for adding token to headers
API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken",
  )}`;
  return config;
});

// expired token interceptor to logout
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.debug("wait wait ", error);
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "msgUnauthorized"
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("zustand-roles");
      localStorage.removeItem("zustand-rolemode");
      localStorage.removeItem("zustand-mood-skipped");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
