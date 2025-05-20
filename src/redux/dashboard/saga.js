import {all, put, takeEvery,} from 'redux-saga/effects'
import actions from "./actions"
import {getInsights, getUpcomingOrders,} from '../../helpers/api/dashboard.api'
import {callCheckingAuthentication} from '../../helpers/utility'

export function* getInsightsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getInsights, action.params);
		yield put(actions.getInsightsSuccess(response.data));
	} catch (e) {
		yield put(actions.getInsightsFailure(e));
	}
}

export function* getUpcomingSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getUpcomingOrders, action.params);
		yield put(actions.getUpcomingSuccess(response.data));
	} catch (e) {
		yield put(actions.getUpcomingFailure(e));
	}
}

export default function* rootSaga() {
	yield all([
		takeEvery(actions.GET_INSIGHTS_REQUEST, getInsightsSaga),
		takeEvery(actions.GET_UPCOMING_REQUEST, getUpcomingSaga),
	]);

}
