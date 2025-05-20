import axios from 'axios';
import {API_URL} from '../../config';

const ORDER_URL = 'client/orders';

export const getOrders = (params) => {

    let url = API_URL + ORDER_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
    return axios.get(url);
}

export const setOrderDiscount = (params) => {

    let url = API_URL + ORDER_URL + '/' + params.id + '/discount';
    return axios.post(url, params);
}

export const createOrder = (params) => {

    let url = API_URL + ORDER_URL;
    return axios.post(url, {
		customer: params.customer ? params.customer.value : '',
		handling_shipping: params.handling_shipping,
		notes: params.notes,
		status: params.status ? params.status : 1,
	});
}

export const completeOrder = (params) => {

    let url = API_URL + ORDER_URL + '/' + params.sid + '/complete';
    return axios.post(url, {
		completed_at: params.completedAt,
		payment_amount: params.paymentAmount,
	});
}

export const updateOrder = (params) => {

    let url = API_URL + ORDER_URL + '/' + params.sid;
    return axios.put(url, {
    	status: params.status.value,
		notes: params.notes,
		scheduled_at: params.scheduled_at,
		handling_shipping: params.handling_shipping,
	});
}

export const scheduleOrder = (params) => {

    let url = API_URL + ORDER_URL + '/' + params.sid + '/schedule';
    return axios.put(url, {
		starts_at: params.startsAt,
		ends_at: params.endsAt,
	});
}

export const getOrderDetails = (params) => {

	let url = API_URL + ORDER_URL + '/' + params.sid;
	return axios.get(url);
}

export const deleteOrder = (params) => {

	let url = API_URL + ORDER_URL + '/' + params.sid;
	return axios.delete(url);
}

//Order items

export const getOrderItems = (params) => {

	let url = API_URL + ORDER_URL + '/' + params.sid + '/items';
	return axios.get(url);
}

export const createOrderItem = (params) => {

    let url = API_URL + ORDER_URL + '/' + params.pid + '/items';
    return axios.post(url, {
    	amount: params.amount,
		variation: params.variation
	});
}

export const updateOrderItem = (params) => {

    let url = API_URL + ORDER_URL + '/' + params.pid + '/items/' + params.sid;
    return axios.put(url, {
    	amount: params.amount,
		notes: params.notes ? params.notes : ''
	});
}

export const deleteOrderItem = (params) => {

	let url = API_URL + ORDER_URL + '/' + params.pid + '/items/' + params.sid;
	return axios.delete(url);
}

