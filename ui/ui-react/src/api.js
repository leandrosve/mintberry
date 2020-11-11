import axios from "axios";
import i18next from "i18next";
import {
  refreshTokenFailure,
  refreshTokenSuccess,
} from "./redux/actions/session";
import store from "./redux/store";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { selectRefreshToken } from "./redux/reducers";

const instance = axios.create({
  baseURL: `http://${process.env.HOST_URL || "192.168.0.226"}:8081/api`,
});

const refreshAuth = (failedRequest) => {
  const refreshToken = selectRefreshToken(store.getState());
  if (!refreshToken) return Promise.reject();
  return axios
    .post(failedRequest.config.baseURL + "/users/token", { refreshToken })
    .then((res) => {
      store.dispatch(refreshTokenSuccess(res.data));
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + res.data.accessToken;
      return Promise.resolve();
    })
    .catch((err) => {
      store.dispatch(refreshTokenFailure(err));
      return Promise.reject();
    });
};

createAuthRefreshInterceptor(instance, refreshAuth);

instance.interceptors.request.use((config) => {
  config.headers.common["Accept-Language"] = i18next.language;
  const token = store.getState().session.auth.accessToken;
  if (token) config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err && err.response) {
      return Promise.reject(err.response.data && err.response.data.error);
    }
    return Promise.reject(err);
  }
);

const API = {
  get(url) {
    return instance
      .get(url)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  post(url, data, config) {
    return instance
      .post(url, data, config)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  put(url, data) {
    return instance
      .put(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  patch(url, data) {
    return instance
      .patch(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  delete(url, data) {
    return instance
      .delete(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },
};

export default API;
