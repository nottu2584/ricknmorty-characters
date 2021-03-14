import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getCharacters = (page) => {
  return axios
    .get(`/api/character/${page}`, { headers: authHeader() })
}

export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};
