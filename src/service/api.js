import { getStorage, setStorage } from "./storage";
import { STORAGE } from "../constants/storage.constants";
import { getAuthToken } from "./firebase";
const axios = require("axios");
const url = process.env.REACT_APP_API_BASE_URL;
axios.interceptors.request.use(async (request) => {
  let accessToken = getStorage(STORAGE.AUTH);
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
  async function (error, response) {
    console.log("error - ", JSON.stringify(error));
    const originalRequest = error.config;
    if (error) {
      const user = JSON.parse(getStorage(STORAGE.FIRE_USER));
      if (error.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = false;
        const accessToken = await getAuthToken(user);
        setStorage(STORAGE.AUTH, accessToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        return axios(originalRequest);
      }
      return response;
    }
  }
);

export const createUser = async (user) => {
  console.log(user);
  let result = await axios.post(url + "/users", user);
  return result.data;
};

export const getAllTrees = async (userId) => {
  let result = await axios.get(url + `/users/${userId}/trees/`);
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

export const getAllLinks = async (treeId) => {
  let result = await axios.get(url + `/tree/${treeId}/links`);
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
  let result = await axios.patch(url + "/users/" + id, payload);
  return result;
};

export const getTreeByName = async (treeName) => {
  let result = await axios.get(url + "/tree", {
    params: { tree_name: treeName },
  });
  return result.data;
};
