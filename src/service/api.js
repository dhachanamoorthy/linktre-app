const axios = require("axios");
const url = process.env.REACT_APP_API_BASE_URL;
export const createUser = async (user) => {
	let result = await axios.post(url + "/users", {
		user,
	});
	return result;
};

export const getAllTrees = async (user_id) => {
	let result = await axios.get(url + "/tree/all/" + user_id);
	return result.data;
};
