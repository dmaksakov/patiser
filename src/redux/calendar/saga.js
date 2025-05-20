import {all, takeEvery, put} from 'redux-saga/effects';
import actions from './actions';
import {
	fetchEvents,
	updateEvent,
} from '../../helpers/api/calendar.api';
import {callCheckingAuthentication} from '../../helpers/utility';
import moment from "moment";

export function* fetchEventsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(fetchEvents, action.params);
		yield put(actions.fetchEventsSuccess(response.data));
	} catch (e) {
        yield put(actions.fetchEventsFailure(e));
    }
}

export function* updateEventSaga(action) {
    try {
        const response = yield callCheckingAuthentication(updateEvent, action.params);
		yield put(actions.updateEventSuccess(response.data));
		yield put(actions.fetchEvents({
			start_time: moment(action.params.start_time).subtract(30, 'days').format(),
			end_time: moment(action.params.end_time).add(30, 'days').format(),
		}))
	} catch (e) {
        yield put(actions.updateEventFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.FETCH_EVENTS, fetchEventsSaga),
        takeEvery(actions.UPDATE_EVENT_REQUEST, updateEventSaga),
    ]);
}
