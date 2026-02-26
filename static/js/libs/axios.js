import axios from "axios";
import $ from "jquery";


const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRFToken": $("input[name=csrfmiddlewaretoken]").val(),
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — handle logout or refresh here");
    }
    return Promise.reject(error);
  }
);


export function getApiWithHeaders(customHeaders = {}) {
  const instance = api.create({
    ...api.defaults,
    headers: {
      ...api.defaults.headers,
      ...customHeaders,
    },
  });
  return instance;
}

export default api;