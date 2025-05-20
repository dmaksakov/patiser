import {all, put, take,takeLatest} from 'redux-saga/effects'
import salesReportsActions from "./actions"

import {callCheckingAuthentication} from '../../../helpers/utility'
import {getOptions, getChart} from "../../../helpers/api/reports/sales.api";

export function* getSalesChartSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getChart, action.params);
		yield put(salesReportsActions.getSalesChartSuccess(response.data));
	} catch (e) {
		yield put(salesReportsActions.getSalesChartFailure(e));
	}
}
export function* getSalesOptionsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getOptions, action.params);
		yield put(salesReportsActions.getSalesOptionsSuccess(response.data));
	} catch (e) {
		yield put(salesReportsActions.getSalesOptionsFailure(e));
	}
}

export default function* rootSaga() {
	yield all([
		takeLatest([salesReportsActions.GET_SALES_CHART_REQUEST], getSalesChartSaga),
		takeLatest([salesReportsActions.GET_SALES_PARAMS_CHANGE], getSalesChartSaga),
		takeLatest([salesReportsActions.GET_SALES_GROUP_BY_CHANGE], getSalesChartSaga),
		takeLatest(salesReportsActions.GET_SALES_OPTIONS_REQUEST, getSalesOptionsSaga),
	]);
}
