import { toast } from "react-toastify";
import * as actions from "./index";
import axios from "axios"; // Import axios

const apiUrl = "http://localhost:8080/api/playlists"; // Updated API URL

const getAuthHeaders = () => {
	const root = JSON.parse(localStorage.getItem("persist:root"));
	const token = root ? JSON.parse(root.auth).user.token : null; // Extract token from persisted state
	return token ? { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5OTg4ODg3M2JjYmVmN2Q2YjdiNmEiLCJuYW1lIjoiQWJoYXkiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMxODQ3NTE5LCJleHAiOjE3MzI0NTIzMTl9.H3CR1hOQNYlSBur2yFptX8cZxquj1eFTKrR-OrmTypQ" } : {};
};

export const createPlayList = async (payload, dispatch) => {
	dispatch(actions.createPlayListStart());
	const headers = getAuthHeaders(); // Get headers with token from local storage
	try {
		if (!payload.img) {
			throw new Error('"img" is not allowed to be empty'); // Validate payload
		}
		const { data } = await axios.post(apiUrl, payload, { headers }); // Use token here
		dispatch(actions.createPlayListSuccess(data.data));
		return true;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			toast.error("Unauthorized access. Please log in.");
		} else if (error.message === '"img" is not allowed to be empty') {
			toast.error(error.message); // Handle specific validation error
		} else {
			console.error("Error creating playlist:", error.response ? error.response.data : error.message);
		}
		dispatch(actions.createPlayListFailure(error.response ? error.response.data : "Error creating playlist")); // Pass error message
		return false;
	}
};

export const addSongToPlaylist = async (payload, dispatch) => {
	dispatch(actions.addSongStart());
	const headers = getAuthHeaders(); // Get headers with token
	try {
		const { data } = await axios.put(`${apiUrl}/add-song`, payload, { headers });
		dispatch(actions.addSongSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			toast.error("Unauthorized access. Please log in.");
		} else {
			console.error("Error adding song to playlist:", error.response ? error.response.data : error.message);
		}
		dispatch(actions.addSongFailure(error.response ? error.response.data : "Error adding song")); // Pass error message
		return false;
	}
};

export const removeSongFromPlaylist = async (payload, dispatch) => {
	dispatch(actions.removeSongStart());
	const headers = getAuthHeaders(); // Get headers with token
	try {
		const { data } = await axios.put(`${apiUrl}/remove-song`, payload, { headers });
		dispatch(actions.removeSongSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			toast.error("Unauthorized access. Please log in.");
		} else {
			console.error("Error removing song from playlist:", error.response ? error.response.data : error.message);
		}
		dispatch(actions.removeSongFailure(error.response ? error.response.data : "Error removing song")); // Pass error message
		return false;
	}
};

export const getPlayLists = async (dispatch) => {
	dispatch(actions.getPlayListStart());
	const headers = getAuthHeaders(); // Get headers with token
	try {
		const { data } = await axios.get(`${apiUrl}/favourite`, { headers });
		dispatch(actions.getPlayListSuccess(data.data));
		return true;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			toast.error("Unauthorized access. Please log in.");
		} else if (error.response && error.response.status === 404) {
			toast.error("Playlists not found.");
		} else {
			console.error("Error fetching playlists:", error.response ? error.response.data : error.message);
		}
		dispatch(actions.getPlayListFailure(error.response ? error.response.data : "Error fetching playlists")); // Pass error message
		return false;
	}
};

export const deletePlayList = async (id, dispatch) => {
	dispatch(actions.deletePlayListStart());
	const headers = getAuthHeaders(); // Get headers with token
	try {
		const { data } = await axios.delete(`${apiUrl}/${id}`, { headers });
		dispatch(actions.deletePlayListSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			toast.error("Unauthorized access. Please log in.");
		} else {
			console.error("Error deleting playlist:", error.response ? error.response.data : error.message);
		}
		dispatch(actions.deletePlayListFailure(error.response ? error.response.data : "Error deleting playlist")); // Pass error message
		return false;
	}
};
