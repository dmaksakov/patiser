import {all, takeEvery, put, call} from 'redux-saga/effects'
import actions from "./actions"
import accountActions from "../account/actions"
import {
	getCompany,
	updateCompany,
	getCompanyMeasureUnits,
} from '../../helpers/api/company.api'
import {callCheckingAuthentication} from '../../helpers/utility'
import {history} from "../store"
import errorActions from "../errors/actions";

export function* getCompanyMeasureUnitsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getCompanyMeasureUnits, {});
		yield put(actions.getCompanyMeasureUnitsSuccess(response.data));
	} catch (e) {
        yield put(actions.getCompanyMeasureUnitsFailure(e));
    }
}

export function* getCompanySaga(action) {
    try {
        const response = yield callCheckingAuthentication(getCompany, {});
		yield put(actions.getCompanySuccess(response.data));
	} catch (e) {
        yield put(actions.getCompanyFailure(e));
    }
}

export function* updateCompanySaga(action) {
    try {
        const response = yield callCheckingAuthentication(updateCompany, action.params);
		yield put(actions.updateCompanySuccess(response.data));
		yield put(accountActions.getProfileRequest());
		yield put(errorActions.addNotification('Company updated', 'The company profile was successfully updated'));
		if (action.redirect) {
			history.push('/')
		}
	} catch (e) {
        yield put(actions.updateCompanyFailure(e));
	}
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_COMPANY_REQUEST, getCompanySaga),
        takeEvery(actions.UPDATE_COMPANY_REQUEST, updateCompanySaga),
        takeEvery(actions.COMPANY_MEASURE_UNITS_REQUEST, getCompanyMeasureUnitsSaga),
    ]);
}
