const axios = require("axios");
axios.interceptors.request.use((request) => {
	console.info("Request:", JSON.stringify(request, null, 2));
	return request;
});

axios.interceptors.response.use((response) => {
	console.info("Response:", JSON.stringify(response, null, 2));
	return response;
});
const url = process.env.REACT_APP_API_BASE_URL;
export const createUser = async (user) => {
	console.log(user);
	let result = await axios.post(url + "/users",user);
	return result;
};

export const getAllTrees = async (user_id) => {
	let result = await axios.get(url + "/tree/all/" + user_id);
	return result.data;
};


