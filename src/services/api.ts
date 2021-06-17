import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const api = axios.create({
  baseURL: "https://apienjoy.loop3.com.br",
  // baseURL: 'http://localhost:3535',
  headers: {
    Authorization: `Bearer ${cookies["enjoy.token"]}`,
  },
});

export default api;
