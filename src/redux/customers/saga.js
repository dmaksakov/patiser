import {all, takeEvery, put, call, delay, takeLatest, select} from 'redux-saga/effects'
import actions from "./actions"
import {
	getCustomers,
	getAllCustomers,
	createCustomer,
	updateCustomer,
	getCustomerDetails,
	deleteCustomer,
} from '../../helpers/api/customers.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import errorActions from '../errors/actions'
import {reset, startSubmit, stopSubmit} from "redux-form";

export const getErrors = (state) => state.errors.toJS().errors

export function* getAllCustomersSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getAllCustomers);
		yield put(actions.getAllCustomersSuccess(response.data));
	} catch (e) {
        yield put(actions.getAllCustomersFailure(e));
    }
}

export function* getCustomersSaga(action) {
    try {
		const getPageParams = (state) => state.customers.toJS().pageParams;
		const pageParams = yield select(getPageParams)

        const response = yield callCheckingAuthentication(getCustomers, pageParams);
		yield put(actions.getCustomersSuccess(response.data));
	} catch (e) {
        yield put(actions.getCustomersFailure(e));
    }
}

export function* debounceGetCustomersSaga(action) {
	yield delay(200);
	yield call(getCustomersSaga, action);
}

export function* createCustomersSaga(action) {
    try {
		yield put( startSubmit('CustomerForm') )

		const response = yield callCheckingAuthentication(createCustomer, action.params);
		yield put(actions.createCustomersSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('CustomerForm') )
		yield put(stopSubmit('CustomerForm') )

		yield put(actions.getCustomersRequest({}));
		yield put(errorActions.addNotification('Customer added', 'The customer was successfully added'));
		yield put(actions.selectCustomer({
			sid: ''
		}));
	} catch (e) {
        yield put(actions.createCustomersFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
    }
}

export function* updateCustomersSaga(action) {
    try {
		yield put( startSubmit('CustomerForm') )

		const response = yield callCheckingAuthentication(updateCustomer, action.params);
		yield put(actions.updateCustomersSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('CustomerForm') )
		yield put(stopSubmit('CustomerForm') )

		yield put(errorActions.addNotification('Customer updated', 'The customer was successfully updated'));
		yield put(actions.getCustomersRequest({}));
	} catch (e) {
        yield put(actions.updateCustomersFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
    }
}

export function* getCustomerDetailsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getCustomerDetails, action.params);
		yield put(actions.getCustomerDetailsSuccess(response.data));
	} catch (e) {
        yield put(actions.getCustomerDetailsFailure(e));
    }
}

export function* deleteCustomerSaga(action) {
    try {
        const response = yield callCheckingAuthentication(deleteCustomer, action.params);
		yield put(actions.deleteCustomerSuccess(response.data));
		yield put(errorActions.addNotification('Customer deleted', 'The customer was successfully deleted'));
		yield put(actions.getCustomersRequest({}));
	} catch (e) {
        yield put(actions.deleteCustomerFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_CUSTOMERS_REQUEST, getCustomersSaga),
        takeEvery(actions.GET_ALL_CUSTOMERS_REQUEST, getAllCustomersSaga),
		takeLatest(actions.GET_CUSTOMERS_DEBOUNCE, debounceGetCustomersSaga),
		takeEvery(actions.CREATE_CUSTOMERS_REQUEST, createCustomersSaga),
        takeEvery(actions.UPDATE_CUSTOMERS_REQUEST, updateCustomersSaga),
        takeEvery(actions.GET_CUSTOMER_DETAILS_REQUEST, getCustomerDetailsSaga),
        takeEvery(actions.DELETE_CUSTOMER_REQUEST, deleteCustomerSaga),
    ]);
}
