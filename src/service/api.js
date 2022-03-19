import { getStorage } from "./storage";
import { STORAGE } from "../constants/storage.constants";
const axios = require("axios");
const url = process.env.REACT_APP_API_BASE_URL;
axios.interceptors.request.use((request) => {
  // console.info("Request:", JSON.stringify(request, null, 2));
  const accessToken = getStorage(STORAGE.AUTH);
  request.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };
  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const accessToken = getStorage(STORAGE.AUTH);
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return axios(originalRequest);
    }
  }
);

export const createUser = async (user) => {
  console.log(user);
  let result = await axios.post(url + "/users", user);
  return result.data;
};

export const getAllTrees = async (user_id) => {
  let result = await axios.get(url + "/tree/all/" + user_id);
  return result.data;
};

export const addTree = async (payload) => {
  let result = await axios.post(url + "/tree", payload);
  return result;
};

export const deleteTree = async (tree_id) => {
  let result = await axios.delete(url + "/tree/" + tree_id);
  return result;
};

export const getAllLinks = async (tree_id) => {
  let result = await axios.get(url + "/link/all/" + tree_id);
  console.log(result.data);
  return result.data;
};

export const addLink = async (payload) => {
  let result = await axios.post(url + "/link", payload);
  return result.data;
};

export const deleteLink = async (link_id) => {
  let result = await axios.delete(url + "/link/" + link_id);
  return result.data;
};

export const updateLinkVisibility = async (id, disable) => {
  let payload = {
    disabled: disable,
  };
  let result = await axios.patch(url + "/link/" + id, payload);
  return result.data;
};

export const updateLink = async (id, payload) => {
  let result = await axios.patch(url + "/link/" + id, payload);
  return result.data;
};

export const getUser = async (id) => {
  let result = await axios.get(url + "/users/" + id);
  return result;
};

export const updateUser = async (payload) => {
  const id = payload.id;
  console.log(payload);
  let result = await axios.patch(url + "/users/" + id, payload);
  return result;
};
