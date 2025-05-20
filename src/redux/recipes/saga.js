import {all, takeEvery, put, delay, takeLatest, call, select} from 'redux-saga/effects'
import actions from "./actions"
import {
	getRecipes,
	createRecipe,
	updateRecipe,
	getRecipeDetails,
	deleteRecipe,
	getRecipeItems,
	createRecipeItem,
	updateRecipeItem,
	deleteRecipeItem,
} from '../../helpers/api/recipes.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import errorActions from "../errors/actions";
import {reset, startSubmit, stopSubmit} from "redux-form";
import React from "react";

export const getErrors = (state) => state.errors.toJS().errors

export function* getRecipesSaga(action) {
    try {
		const getPageParams = (state) => state.recipes.toJS().pageParams;
		const pageParams = yield select(getPageParams)
        const response = yield callCheckingAuthentication(getRecipes, pageParams);
        const formattedRecipes = response.data.items.map(recipe => ({
			...recipe,
			yield_measure_unit: {
				value: recipe.yield_measure_unit.id,
				label: recipe.yield_measure_unit.name
			}
        }))
		yield put(actions.getRecipesSuccess({...response.data, items: formattedRecipes}));
	} catch (e) {
        yield put(actions.getRecipesFailure(e));
    }
}

export function* debounceGetRecipesSaga(action) {
	yield delay(200);
	yield call(getRecipesSaga, action);
}

export function* createRecipesSaga(action) {
	try {
		yield put( startSubmit('RecipeForm') )

		const response = yield callCheckingAuthentication(createRecipe, action.params);
		yield put(actions.createRecipesSuccess(response.data));

		yield put(actions.setTour(
			{
				run: true,
				stepIndex: 0,
			}
		))

		yield put(actions.setSidebar(false))
		yield put(reset('RecipeForm') )
		yield put(stopSubmit('RecipeForm') )

		yield put(actions.getRecipesRequest({}));
		yield put(errorActions.addNotification('Recipe added', 'The recipe was successfully added'));
		yield put(actions.selectRecipe({
			sid: ''
		}));
	} catch (e) {
		yield put(actions.createRecipesFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateRecipesSaga(action) {
	try {
		yield put( startSubmit('RecipeForm') )

		const response = yield callCheckingAuthentication(updateRecipe, action.params);
		yield put(actions.updateRecipesSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('RecipeForm') )
		yield put(stopSubmit('RecipeForm') )

		yield put(actions.getRecipesRequest({}));
		yield put(errorActions.addNotification('Recipe updated', 'The recipe was successfully updated'));
	} catch (e) {
		yield put(actions.updateRecipesFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}
//***************** this method is a prototype and currently is not used*****************//
export function* getRecipeDetailsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getRecipeDetails, action.params);
		yield put(actions.getRecipeDetailsSuccess(response.data));
	} catch (e) {
		yield put(actions.getRecipeDetailsFailure(e));
	}
}

export function* deleteRecipeSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteRecipe, action.params);
		yield put(actions.deleteRecipeSuccess(response.data));
		yield put(errorActions.addNotification('Recipe deleted', 'The recipe was successfully deleted'));
		yield put(actions.getRecipesRequest({}));
		yield put(action.history.push('/recipes'));
	} catch (e) {
		yield put(actions.deleteRecipeFailure(e));
	}
}

///////////////////////////////////////////////////////////
//recipe items
///////////////////////////////////////////////////////////

export function* getRecipeItemsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getRecipeItems, action.params);
		yield put(actions.getByRecipeItemsSuccess(response.data));
	} catch (e) {
		yield put(actions.getByRecipeItemsFailure(e));
	}
}

export function* createRecipeItemSaga(action) {
	try {
		yield put( startSubmit('RecipeDetailsForm') )

		const response = yield callCheckingAuthentication(createRecipeItem, action.params);
		yield put(actions.createRecipeItemSuccess(response.data));

		yield put(actions.setItemSidebar(false))
		yield put(reset('RecipeDetailsForm') )
		yield put(stopSubmit('RecipeDetailsForm') )

		yield put(actions.getRecipeItems({sid: action.params.sid}));
		yield put(actions.getRecipesRequest({}));
		yield put(errorActions.addNotification('Recipe item added', 'The recipe item was successfully added'));
		yield put(actions.selectRecipeItem({
			sid: ''
		}));
	} catch (e) {
		yield put(actions.createRecipeItemFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateRecipeItemSaga(action) {
	try {
		yield put( startSubmit('RecipeDetailsForm') )

		const response = yield callCheckingAuthentication(updateRecipeItem, action.params);
		yield put(actions.updateRecipeItemSuccess(response.data));

		yield put(actions.setItemSidebar(false))
		yield put(reset('RecipeDetailsForm') )
		yield put(stopSubmit('RecipeDetailsForm') )

		yield put(actions.getRecipeItems({sid: action.params.rid}));
		yield put(actions.getRecipesRequest({}));
		yield put(errorActions.addNotification('Recipe item updated', 'The recipe item was successfully updated'));
	} catch (e) {
		yield put(actions.updateRecipeItemFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}
export function* deleteRecipeItemSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteRecipeItem, action.params);
		yield put(actions.deleteRecipeItemSuccess(response.data));
		yield put(errorActions.addNotification('Recipe item deleted', 'The recipe item was successfully deleted'));
		yield put(actions.getRecipeItems({sid: action.params.sid}));
		yield put(actions.getRecipesRequest({}));
	} catch (e) {
		yield put(actions.deleteRecipeItemFailure(e));
	}
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_RECIPES_REQUEST, getRecipesSaga),
		takeLatest(actions.GET_RECIPES_DEBOUNCE, debounceGetRecipesSaga),
        takeEvery(actions.CREATE_RECIPES_REQUEST, createRecipesSaga),
        takeEvery(actions.UPDATE_RECIPES_REQUEST, updateRecipesSaga),
        takeEvery(actions.GET_RECIPE_DETAILS_REQUEST, getRecipeDetailsSaga),
        takeEvery(actions.DELETE_RECIPE_REQUEST, deleteRecipeSaga),

		takeEvery(actions.GET_RECIPE_ITEMS_REQUEST, getRecipeItemsSaga),
		takeEvery(actions.CREATE_RECIPE_ITEM_REQUEST, createRecipeItemSaga),
		takeEvery(actions.UPDATE_RECIPE_ITEM_REQUEST, updateRecipeItemSaga),
		takeEvery(actions.DELETE_RECIPE_ITEM_REQUEST, deleteRecipeItemSaga),
    ]);
}
