import {all, takeEvery, put, select} from 'redux-saga/effects'
import actions from "./actions"
import errorActions from "../errors/actions";
import {
	getTaxCategories,
	createTaxCategory,
	updateTaxCategory,
	deleteTaxCategory,
} from '../../helpers/api/taxes.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import {reset, startSubmit, stopSubmit} from "redux-form";
import {getErrors} from "../ingredients/saga";

export function* getTaxCategoriesSaga(action) {
	try {
		const getPageParams = (state) => state.taxes.toJS().pageParams;
		const pageParams = yield select(getPageParams)

		const response = yield callCheckingAuthentication(getTaxCategories, pageParams);
		yield put(actions.getByTaxCategoriesSuccess(response.data));
	} catch (e) {
		yield put(actions.getByTaxCategoriesFailure(e));
	}
}

export function* createTaxCategorySaga(action) {
	try {
		yield put( startSubmit('TaxCategoryForm') )

		const response = yield callCheckingAuthentication(createTaxCategory, action.params);
		yield put(actions.createTaxCategorySuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('TaxCategoryForm') )
		yield put(stopSubmit('TaxCategoryForm') )

		yield put(actions.getTaxCategories({}));
		yield put(errorActions.addNotification('Tax category added', 'The tax category was successfully added'));
		yield put(actions.selectTaxCategory({
			sid: ''
		}));
	} catch (e) {
		yield put(actions.createTaxCategoryFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateTaxCategorySaga(action) {
	try {
		const response = yield callCheckingAuthentication(updateTaxCategory, action.params);
		yield put(actions.updateTaxCategorySuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('TaxCategoryForm') )
		yield put(stopSubmit('TaxCategoryForm') )

		yield put(actions.getTaxCategories({}));
		yield put(errorActions.addNotification('Tax category updated', 'The tax category was successfully updated'));
	} catch (e) {
		yield put(actions.updateTaxCategoryFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}
export function* deleteTaxCategorySaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteTaxCategory, action.params);
		yield put(actions.deleteTaxCategorySuccess(response.data));
		yield put(actions.getTaxCategories({}));
		yield put(errorActions.addNotification('Tax category deleted', 'The tax category was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteTaxCategoryFailure(e));
	}
}

export default function* rootSaga() {
	yield all([

		takeEvery(actions.GET_TAX_CATEGORIES_REQUEST, getTaxCategoriesSaga),
		takeEvery(actions.CREATE_TAX_CATEGORY_REQUEST, createTaxCategorySaga),
		takeEvery(actions.UPDATE_TAX_CATEGORY_REQUEST, updateTaxCategorySaga),
		takeEvery(actions.DELETE_TAX_CATEGORY_REQUEST, deleteTaxCategorySaga),

	]);
}
