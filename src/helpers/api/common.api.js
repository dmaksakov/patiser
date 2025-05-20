import axios from 'axios';
import {API_URL} from '../../config';

const GET_CURRENCIES_URL = 'common/currencies';
const GET_COUNTRIES_URL = 'common/countries';
const GET_MEASURE_SYSTEMS_URL = 'common/measure-systems';
const GET_MEASURE_UNIT_DETAILS_URL = 'common/measure-units/';
const GET_DISCOUNT_TYPES_URL = 'common/discount-types';
const GET_ORDER_STATUSES_URL = 'common/order-statuses';

export const getCurrencies = () => {

    let url = API_URL + GET_CURRENCIES_URL;
    return axios.get(url);
}

export const getCountries = () => {

    let url = API_URL + GET_COUNTRIES_URL;
    return axios.get(url);
}

export const getMeasureSystems = () => {

    let url = API_URL + GET_MEASURE_SYSTEMS_URL;
    return axios.get(url);
}

export const getMeasureUnitDetails = (params) => {

    let url = API_URL + GET_MEASURE_UNIT_DETAILS_URL + params.id;
    return axios.get(url);
}

export const getDiscountTypes = () => {

    let url = API_URL + GET_DISCOUNT_TYPES_URL;
    return axios.get(url);
}

export const getOrderStatuses = () => {

    let url = API_URL + GET_ORDER_STATUSES_URL;
    return axios.get(url);
}
