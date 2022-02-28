import { auth } from "./firebaseConfig";
import { createUser } from "./api.js";
import * as storage from './storage';
import {USER,AUTH} from '../constants/storage.constants';
export const login = async (user, token) => {
	let payload = {
		uuid: user?.uid,
		username: user?.displayName,
		email: user?.email,
		mobile:user?.phoneNumber,
		image_url: user?.photoURL,
	};
	const result = await createUser(payload);
	const dbUser  = result.data;
	
	storage.setStorage("result",result.data.id);
	storage.setStorage(AUTH.auth_token, token);
	storage.setStorage(USER.id,dbUser.id);
	storage.setStorage(USER.uuid,dbUser.uuid);
};
export const isLogin = () => {
	if (storage.getStorage("auth_token")) {
		return true;
	}
	return false;
};
export const logout = () => {
	storage.deleteStorage("user");
	storage.deleteStorage("auth_token");
	auth.signOut();
};
