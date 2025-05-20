import axios from 'axios';
import qs from 'qs';
import {API_URL} from '../../config';

const FORGOT_PASSWORD_REQUEST_URL = 'forgot-password/request';
const FORGOT_PASSWORD_RESET_URL = 'forgot-password/reset';

export const forgotPasswordRequest = (email) => {

    let url = API_URL + FORGOT_PASSWORD_REQUEST_URL;
    let qParams = qs.stringify({'email': email});
    return axios.post(url + "?"+ qParams);
};

export const resetPasswordRequest = (params) => {

    let url = API_URL + FORGOT_PASSWORD_RESET_URL;
    return axios.post(url, params);
};
