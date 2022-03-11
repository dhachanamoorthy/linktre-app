import { auth } from "./firebase";
import { createUser } from "./api.js";
import * as storage from "./storage";
import { STORAGE } from "../constants/storage.constants";
export const login = async (user, token) => {
  let payload = {
    uuid: user?.uid,
    username: user?.displayName,
    email: user?.email,
    mobile: user?.phoneNumber,
    image_url: user?.photoURL,
  };
  const result = await createUser(payload);
  const dbUser = result.data;
  storage.setStorage(STORAGE.AUTH, token);
  storage.setStorage(STORAGE.USER, JSON.stringify(dbUser));
  return true;
};
export const isLogin = () => {
  if (storage.getStorage(STORAGE.AUTH)) {
    return true;
  }
  return false;
};
export const logout = () => {
  storage.deleteStorage("user");
  storage.deleteStorage("auth_token");
  auth.signOut();
};
