import {all, takeEvery, put, delay, call, takeLatest, select} from 'redux-saga/effects'
import actions from "./actions"
import errorActions from "../errors/actions";
import {
	getProductCategories,
	createProductCategory,
	updateProductCategory,
	deleteProductCategory,
} from '../../helpers/api/categories.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import {reset, startSubmit, stopSubmit} from "redux-form";
import {getErrors} from "../ingredients/saga";

export function* getProductCategoriesSaga(action) {
	try {
		const getPageParams = (state) => state.categories.toJS().pageParams;
		const pageParams = yield select(getPageParams)

		const response = yield callCheckingAuthentication(getProductCategories, pageParams);
		yield put(actions.getByProductCategoriesSuccess(response.data));
	} catch (e) {
		yield put(actions.getByProductCategoriesFailure(e));
	}
}

export function* debounceGetProductCategoriesSaga(action) {
	yield delay(200);
	yield call(getProductCategoriesSaga, action);
}

export function* createProductCategorySaga(action) {
	try {
		yield put( startSubmit('ProductCategoryForm') )

		const response = yield callCheckingAuthentication(createProductCategory, action.params);
		yield put(actions.createProductCategorySuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('ProductCategoryForm') )
		yield put(stopSubmit('ProductCategoryForm') )

		yield put(actions.getProductCategories({}));
		yield put(errorActions.addNotification('Product category added', 'The product category was successfully added'));
		yield put(actions.selectProductCategory({
			sid: ''
		}));
	} catch (e) {
		yield put(actions.createProductCategoryFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateProductCategorySaga(action) {
	try {
		const response = yield callCheckingAuthentication(updateProductCategory, action.params);
		yield put(actions.updateProductCategorySuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('ProductCategoryForm') )
		yield put(stopSubmit('ProductCategoryForm') )

		yield put(actions.getProductCategories({}));
		yield put(errorActions.addNotification('Product category updated', 'The product category was successfully updated'));
	} catch (e) {
		yield put(actions.updateProductCategoryFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}
export function* deleteProductCategorySaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteProductCategory, action.params);
		yield put(actions.deleteProductCategorySuccess(response.data));
		yield put(actions.getProductCategories({}));
		yield put(errorActions.addNotification('Product category deleted', 'The product category was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteProductCategoryFailure(e));
	}
}

export default function* rootSaga() {
	yield all([

		takeEvery(actions.GET_PRODUCT_CATEGORIES_REQUEST, getProductCategoriesSaga),
		takeLatest(actions.GET_PRODUCT_CATEGORIES_DEBOUNCE, debounceGetProductCategoriesSaga),
		takeEvery(actions.CREATE_PRODUCT_CATEGORY_REQUEST, createProductCategorySaga),
		takeEvery(actions.UPDATE_PRODUCT_CATEGORY_REQUEST, updateProductCategorySaga),
		takeEvery(actions.DELETE_PRODUCT_CATEGORY_REQUEST, deleteProductCategorySaga),

	]);
}
