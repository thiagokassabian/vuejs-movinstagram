import axios from "axios";

const urlBase = "http://localhost:3000";

const getPosts = async () => {
	const response = await axios.get(`${urlBase}/posts`);
	return response.data;
};

const getComments = async postId => {
	const response = await axios.get(`${urlBase}/comments?postId=${postId}`);
	return response.data;
};

const getLikes = async postId => {
	const response = await axios.get(`${urlBase}/likes?postId=${postId}`);
	return response.data;
};

const deleteLike = async id => {
	const response = await axios.delete(`${urlBase}/likes/${id}`);
	return response.data;
};

const addLike = async like => {
	const response = await axios.post(`${urlBase}/likes`, like);
	return response.data;
};

const addComment = async comment => {
	const response = await axios.post(`${urlBase}/comments`, comment);
	return response;
};

const getAllLikes = async () => {
	const response = await axios.get(`${urlBase}/likes`);
	return response.data;
};
const getAllComments = async () => {
	const response = await axios.get(`${urlBase}/comments`);
	return response.data;
};

export {
	getPosts,
	getComments,
	getLikes,
	deleteLike,
	addLike,
	addComment,
	getAllLikes,
	getAllComments,
};
