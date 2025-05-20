import {all, put, take,takeLatest} from 'redux-saga/effects'
import actions from "./actions"

import {callCheckingAuthentication} from '../../../helpers/utility'
import {getOptions, getChart} from "../../../helpers/api/reports/orders.api";

export function* getOrdersChartSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getChart, action.params);
		yield put(actions.getOrdersChartSuccess(response.data));
	} catch (e) {
		yield put(actions.getOrdersChartFailure(e));
	}
}
export function* getOrdersOptionsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getOptions, action.params);
		yield put(actions.getOrdersOptionsSuccess(response.data));
	} catch (e) {
		yield put(actions.getOrdersOptionsFailure(e));
	}
}

export default function* rootSaga() {
	yield all([
		takeLatest([actions.GET_ORDERS_CHART_REQUEST], getOrdersChartSaga),
		takeLatest([actions.GET_ORDERS_PARAMS_CHANGE], getOrdersChartSaga),
		takeLatest([actions.GET_ORDERS_GROUP_BY_CHANGE], getOrdersChartSaga),
		takeLatest(actions.GET_ORDERS_OPTIONS_REQUEST, getOrdersOptionsSaga),
	]);
}
