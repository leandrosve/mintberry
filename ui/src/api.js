import axios from "axios";
import i18next from "i18next";
import store from "./redux/store";

const instance = axios.create({
  baseURL: `http://${process.env.HOST_URL || "192.168.0.226"}:8081/api`,
});

instance.interceptors.request.use((config)=>{
  config.headers.common['Accept-Language'] = i18next.language;
  const token = store.getState().session.auth.accessToken;
  if(token)
    config.headers.common['Authorization'] = `Bearer ${token}`;
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


const API= {
  get(url) {
    return instance
      .get(url)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  post(url, data) {
    return instance
      .post(url, data)
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