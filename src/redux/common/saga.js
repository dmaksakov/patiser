import {all, takeEvery, put} from 'redux-saga/effects'
import actions from "./actions"
import {
	getCurrencies,
	getCountries,
	getMeasureSystems,
	getDiscountTypes,
	getOrderStatuses,
	getMeasureUnitDetails,
} from '../../helpers/api/common.api'
import {callCheckingAuthentication} from '../../helpers/utility'

export function* getCurrenciesSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getCurrencies, {});
		yield put(actions.getCurrenciesSuccess(response.data));
	} catch (e) {
        yield put(actions.getCurrenciesFailure(e));
    }
}

export function* getCountriesSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getCountries, {});
		yield put(actions.getCountriesSuccess(response.data));
	} catch (e) {
        yield put(actions.getCountriesFailure(e));
    }
}

export function* getMeasureSystemsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getMeasureSystems, {});
        const formattedMeasureSystems = response.data.map(ms => {
        	return {
        		value: ms.id,
				label: ms.name
			}
		})
		yield put(actions.getMeasureSystemSuccess(formattedMeasureSystems));
	} catch (e) {
        yield put(actions.getMeasureSystemFailure(e));
    }
}

export function* getMeasureUnitDetailsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getMeasureUnitDetails, action.params);
        const formattedMeasureUnitDetails = response.data.conversions.map(c => {
        	return {
        		value: c.id,
				label: c.name
			}
		})
		yield put(actions.getMeasureUnitDetailsSuccess(formattedMeasureUnitDetails));
	} catch (e) {
        yield put(actions.getMeasureUnitDetailsFailure(e));
    }
}

export function* getDiscountTypesSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getDiscountTypes, {});
		yield put(actions.getDiscountTypesSuccess(response.data));
	} catch (e) {
		yield put(actions.getDiscountTypesFailure(e));
	}
}

export function* getOrderStatusesSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getOrderStatuses, {});
		yield put(actions.getOrderStatusesSuccess(response.data));
	} catch (e) {
		yield put(actions.getOrderStatusesFailure(e));
	}
}


export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_CURRENCIES_REQUEST, getCurrenciesSaga),
        takeEvery(actions.GET_CURRENCIES_SUCCESS, getCountriesSaga),
        takeEvery(actions.GET_MEASURE_SYSTEMS_REQUEST, getMeasureSystemsSaga),
        takeEvery(actions.GET_MEASURE_UNITS_DETAILS_REQUEST, getMeasureUnitDetailsSaga),
        takeEvery(actions.GET_DISCOUNT_TYPES_REQUEST, getDiscountTypesSaga),
        takeEvery(actions.GET_ORDER_STATUSES_REQUEST, getOrderStatusesSaga),
    ]);
}
