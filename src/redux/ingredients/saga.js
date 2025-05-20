import {all, takeEvery, put, delay, takeLatest, call, select} from 'redux-saga/effects'
import actions from "./actions"
import errorActions from '../errors/actions'
import {
	getIngredients,
	getAllIngredients,
	createIngredients,
	updateIngredients,
	deleteIngredients,
} from '../../helpers/api/ingredients.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import { startSubmit, stopSubmit, reset } from 'redux-form'

export const getErrors = (state) => state.errors.toJS().errors

export function* getIngredientsSaga(action) {
    try {
		const getPageParams = (state) => state.ingredients.toJS().pageParams;
		const pageParams = yield select(getPageParams)
		const response = yield callCheckingAuthentication(getIngredients, pageParams);

		yield put(actions.getIngredientsSuccess(response.data));
	} catch (e) {
        yield put(actions.getIngredientsFailure(e));
    }
}

export function* getAllIngredientsSaga() {
    try {
		const response = yield callCheckingAuthentication(getAllIngredients);
		yield put(actions.getAllIngredientsSuccess(response.data));
	} catch (e) {
        yield put(actions.getAllIngredientsFailure(e));
    }
}

export function* debounceGetIngredientsSaga(action) {
	yield delay(200);
	yield call(getIngredientsSaga, action);
}

export function* createIngredientsSaga(action) {
	try {
		yield put( startSubmit('IngredientForm') )

		const response = yield callCheckingAuthentication(createIngredients, action.params);
		yield put(actions.createIngredientsSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('IngredientForm') )
		yield put(stopSubmit('IngredientForm') )

		yield put(actions.getIngredientsRequest({}));
		yield put(errorActions.addNotification('Ingredient added', 'The ingredient was successfully added'));
		yield put(actions.selectIngredient({
			sid: '',
			name: '',
		}));

	} catch (e) {
        yield put(actions.createIngredientsFailure(e));

        let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateIngredientsSaga(action) {
    try {
		yield put( startSubmit('IngredientForm') )

		const response = yield callCheckingAuthentication(updateIngredients, action.params);
		yield put(actions.updateIngredientsSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('IngredientForm') )
		yield put(stopSubmit('IngredientForm') )

		yield put(errorActions.addNotification('Ingredient updated', 'The ingredient was successfully updated'));
		yield put(actions.getIngredientsRequest({}));
	} catch (e) {
        yield put(actions.updateIngredientsFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* deleteIngredientsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(deleteIngredients, action.params);
		yield put(actions.deleteIngredientsSuccess(response.data));
		yield put(errorActions.addNotification('Ingredient deleted', 'The ingredient was successfully deleted'));
		yield put(actions.getIngredientsRequest({}));
	} catch (e) {
        yield put(actions.deleteIngredientsFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_INGREDIENTS_REQUEST, getIngredientsSaga),
        takeEvery(actions.GET_ALL_INGREDIENTS_REQUEST, getAllIngredientsSaga),
        takeEvery(actions.CREATE_INGREDIENTS_REQUEST, createIngredientsSaga),
		takeLatest(actions.GET_INGREDIENTS_DEBOUNCE, debounceGetIngredientsSaga),
		takeEvery(actions.UPDATE_INGREDIENTS_REQUEST, updateIngredientsSaga),
        takeEvery(actions.DELETE_INGREDIENTS_REQUEST, deleteIngredientsSaga),
    ]);

}
