import axios from 'axios';
import {API_URL} from '../../config';

const SIGNUP_URL = 'account/register';
const FORGOT_PASSWORD_URL = 'account/forgot-password';
const RESET_PASSWORD_URL = 'account/reset-password';
const GET_PROFILE_URL = 'profile';

export const signup = (params) => {

    let url = API_URL + SIGNUP_URL;
    return axios.post(url, params);
}

export const forgotPassword = (username) => {

    let url = API_URL + FORGOT_PASSWORD_URL + '?username=' + username;
    return axios.post(url, {});
}

export const resetPassword = (params) => {

    let url = API_URL + RESET_PASSWORD_URL;
    return axios.post(url, params);
}

export const getProfile = () => {

	let url = API_URL + GET_PROFILE_URL;
	return axios.get(url);
}

export const updateProfile = (params) => {

	let url = API_URL + GET_PROFILE_URL;
	return axios.put(url, params);
}
