import axios from 'axios';
import {API_URL} from '../../config';
import moment from "moment";

const EVENTS_URL = 'client/events';

export const fetchEvents = (params) => {

	const startTime = params.start_time ? params.start_time : moment().toISOString()
	const endTime = params.end_time ? params.end_time : moment().toISOString()

	let url = API_URL + EVENTS_URL + '?start_time=' +  encodeURIComponent(startTime) + '&end_time=' + encodeURIComponent(endTime);
	return axios.get(url);
}

export const updateEvent = (params) => {

	let url = API_URL + EVENTS_URL + '/' + params.id;

	return axios.put(url, {
		starts_at: params.start_time,
		ends_at: params.end_time
	});
}
