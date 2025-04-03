import axios from "axios";

const api = axios.create({
  baseURL: "http://sumer-store-env.eba-sxq7spwp.eu-north-1.elasticbeanstalk.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
