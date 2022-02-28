import { auth } from "./firebase-config";
import { createUser } from "./api.js";
export const login = async (user, token) => {
	localStorage.setItem("user", user);
	localStorage.setItem("auth_token", token);
	console.log(user);
	let payload = {
		uuid: user?.uid,
		username: user?.displayName,
		email: user?.email,
		mobile:user?.phoneNumber,
		image_url: user?.photoURL,
	};
	console.log(payload);
	let result = await createUser(payload);
	console.log(result);
};
export const isLogin = () => {
	if (localStorage.getItem("auth_token")) {
		return true;
	}

	return false;
};

export const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("auth_token");
	auth.signOut();
};
