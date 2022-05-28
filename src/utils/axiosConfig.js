import axios from "axios";

export const emailInstance = axios.create({
  baseURL: "https://buildspace-ethcontract-api.herokuapp.com/",
  responseType: "json",
});
