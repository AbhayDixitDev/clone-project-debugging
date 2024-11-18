import axios from "axios";
import {jwtDecode }from "jwt-decode";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure } from "./index";

export const login = async (payload, dispatch) => {
	dispatch(loginStart());
	try {
		const url = `http://localhost:8080/api/login`; // Use environment variable
		const { data } = await axios.post(url, payload);

		const decodeData = jwtDecode(data.data);

		// Optional: Check for token expiration
		if (decodeData.exp * 1000 < Date.now()) {
			throw new Error("Token has expired");
		}

		dispatch(loginSuccess({ ...decodeData, token: data.data }));
		toast.success(data.message);
		
		// Use React Router for navigation
		window.location = "/home"; // Replace with navigate("/home") if using hooks

		return true;
	} catch (error) {
		dispatch(loginFailure());
		if (error.response && error.response.status >= 400 && error.response.status < 500) {
			toast.error(error.response.data.message);
		} else {
			console.error(error); // Log the error for further investigation
			toast.error("Something went wrong!");
		}
		return false;
	}
};