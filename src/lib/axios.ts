import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-teste-front-production.up.railway.app",
});
