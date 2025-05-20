import axios from 'axios';
import qs from 'qs';
import {API_URL} from '../../config';

const ACTIVATE_URL = 'account/activate';

export const verifyToken = (token) => {

    let url = API_URL + ACTIVATE_URL;
    let qParams = qs.stringify({'token': token});
    return axios.post(url + "?"+ qParams);
};
