import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/"
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    // flag -- the code below should have dynamic baseURL as per qa/prod server selected.
    // Working only with qa server as of now.
    if (error.response) {
      if (error.response.status === 400) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
