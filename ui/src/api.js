import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});



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