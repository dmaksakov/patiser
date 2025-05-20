import axios from 'axios';
import {API_URL} from '../../config';

const COMPANY_URL = 'client/company';

export const getCompany = () => {

    let url = API_URL + COMPANY_URL;
    return axios.get(url);
}

export const updateCompany = (params) => {

    let url = API_URL + COMPANY_URL;
    return axios.put(url, params);
}

export const getCompanyMeasureUnits = (params) => {

    let url = API_URL + COMPANY_URL + '/measure-units';
    return axios.get(url, params);
}
