import {all, takeEvery, put, call, takeLatest, delay, select} from 'redux-saga/effects'
import actions from "./actions"
import productActions from "../products/actions"
import {
	getVariations,
	getVariationDetails,
	createVariations,
	updateVariations,
	deleteVariations,

	createVariationsRecipe,
	updateVariationsRecipe,
	deleteVariationsRecipe,

	getVariationsImages,
	addVariationsImage,
	updateVariationsImage,
	deleteVariationsImage,

} from '../../helpers/api/variations.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import errorActions from "../errors/actions";
import {reset, startSubmit, stopSubmit} from "redux-form";
import {getErrors} from "../products/saga";

export function* getVariationsSaga(action) {
    try {
		const getPageParams = (state) => state.variation.toJS().pageParams;
		const pageParams = yield select(getPageParams)
        const response = yield callCheckingAuthentication(getVariations, pageParams);

		yield put(actions.getVariationsSuccess(response.data));
	} catch (e) {
        yield put(actions.getVariationsFailure(e));
    }
}

export function* debounceGetVariationsSaga(action) {
	yield delay(200);
	yield call(getVariationsSaga, action);
}

export function* getVariationDetailsSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getVariationDetails, action.params);
		yield put(actions.getVariationDetailsSuccess(response.data));
	} catch (e) {
        yield put(actions.getVariationDetailsFailure(e));
    }
}

export function* createVariationsSaga(action) {
	try {
		yield put( startSubmit('ProductVariationsForm') )

		const response = yield callCheckingAuthentication(createVariations, action.params);
		yield put(actions.createVariationsSuccess(response.data));

		yield put(productActions.setSidebar(false, 'variationsSidebar'))
		yield put(reset('ProductVariationsForm') )
		yield put(stopSubmit('ProductVariationsForm') )

		yield put(productActions.getProductVariations({sid: action.params.product}))
		yield put(errorActions.addNotification('Variation created', 'The variation was successfully created'));
	} catch (e) {
		yield put(actions.createVariationsFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductVariationsForm', combineErrors(storeErrors)) )
	}
}

export function* updateVariationsSaga(action) {
	try {
		yield put( startSubmit('ProductVariationsForm') )

		const response = yield callCheckingAuthentication(updateVariations, action.params);
		yield put(actions.updateVariationsSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('ProductVariationsForm') )
		yield put(stopSubmit('ProductVariationsForm') )

		yield put(actions.getVariationDetails({vid: action.params.vid}))
		yield put(errorActions.addNotification('Variation updated', 'The variation was successfully updated'));
	} catch (e) {
		yield put(actions.updateVariationsFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductVariationsForm', combineErrors(storeErrors)) )
	}
}

export function* deleteVariationsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteVariations, action.params);
		yield put(actions.deleteVariationsSuccess(response.data));
		yield put(productActions.getProductVariations({sid: action.params.pid}))
		yield put(errorActions.addNotification('Variation deleted', 'The variation was successfully deleted'));
		yield put(action.history.push('/products/' + action.params.pid + '/variations'));
	} catch (e) {
		yield put(actions.deleteVariationsFailure(e));
	}
}

////////////////////////////////////////////////////////////////////
//////////////// Variation recipes
////////////////////////////////////////////////////////////////////

export function* createVariationsRecipeSaga(action) {
	try {
		yield put( startSubmit('ProductRecipesForm') )

		const response = yield callCheckingAuthentication(createVariationsRecipe, action.params);
		yield put(actions.createVariationsRecipeSuccess(response.data));

		yield put(actions.setSidebar(false, 'recipesSidebar'))
		yield put(reset('ProductRecipesForm') )
		yield put(stopSubmit('ProductRecipesForm') )

		yield put(productActions.getProductVariations({
			sid: action.params.pid,
			vid: action.params.vid
		}))
		yield put(actions.getVariationDetails({vid: action.params.vid}))
		yield put(errorActions.addNotification('Variation recipe added', 'The variation recipe was successfully added'));
	} catch (e) {
		yield put(actions.createVariationsRecipeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductRecipesForm', combineErrors(storeErrors)) )
	}
}

export function* updateVariationsRecipeSaga(action) {
	try {
		yield put( startSubmit('ProductRecipesForm') )

		const response = yield callCheckingAuthentication(updateVariationsRecipe, action.params);
		yield put(actions.updateVariationsRecipeSuccess(response.data));

		yield put(actions.setSidebar(false, 'recipesSidebar'))
		yield put(reset('ProductRecipesForm') )
		yield put(stopSubmit('ProductRecipesForm') )

		yield put(productActions.getProductVariations({
			sid: action.params.sid,
			vid: action.params.vid
		}))
		yield put(actions.getVariationDetails({vid: action.params.vid}))
		yield put(errorActions.addNotification('Variation recipe updated', 'The variation recipe was successfully updated'));
	} catch (e) {
		yield put(actions.updateVariationsRecipeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductRecipesForm', combineErrors(storeErrors)) )
	}
}

export function* deleteVariationsRecipeSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteVariationsRecipe, action.params);
		yield put(actions.deleteVariationsRecipeSuccess(response.data));
		yield put(productActions.getProductVariations({
			sid: action.params.pid,
			vid: action.params.vid,
		}))
		yield put(actions.getVariationDetails({vid: action.params.vid}))
		yield put(errorActions.addNotification('Variation recipe deleted', 'The variation recipe was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteVariationsRecipeFailure(e));
	}
}

////////////////////////////////////////////////////////////////////
//////////////// Variation images
////////////////////////////////////////////////////////////////////

export function* addVariationsImageSaga(action) {
	try {
		const response = yield callCheckingAuthentication(addVariationsImage, action.params);
		yield put(actions.addVariationsImageSuccess(response.data));
		yield put(actions.getVariationsImages({vid: action.params.sid}));
		yield put(errorActions.addNotification('Variation image added', 'The variation image was successfully added'));
	} catch (e) {
		yield put(actions.addVariationsImageFailure(e));
	}
}

export function* updateVariationsImageSaga(action) {
	try {
		yield put( startSubmit('ProductImagesForm') )

		const response = yield callCheckingAuthentication(updateVariationsImage, action.params);
		yield put(actions.updateVariationsImageSuccess(response.data));

		yield put(actions.setSidebar(false, 'imagesSidebar'))
		yield put(reset('ProductImagesForm') )
		yield put(stopSubmit('ProductImagesForm') )

		yield put(actions.getVariationsImages({vid: action.params.vid}));
		yield put(errorActions.addNotification('Variation image updated', 'The variation image was successfully updated'));
	} catch (e) {
		yield put(actions.updateVariationsImageFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductImagesForm', combineErrors(storeErrors)) )
	}
}

export function* deleteVariationsImageSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteVariationsImage, action.params);
		yield put(actions.deleteVariationsImageSuccess(response.data));
		yield put(actions.getVariationsImages({vid: action.params.vid}));
		yield put(errorActions.addNotification('Variation image deleted', 'The variation image was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteVariationsImageFailure(e));
	}
}

export function* getVariationsImagesSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getVariationsImages, action.params);
		yield put(actions.getVariationsImagesSuccess(response.data));
	} catch (e) {
		yield put(actions.getVariationsImagesFailure(e));
	}
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_VARIATIONS_REQUEST, getVariationsSaga),
		takeLatest(actions.GET_VARIATIONS_DEBOUNCE, debounceGetVariationsSaga),
		takeEvery(actions.GET_VARIATION_DETAILS_REQUEST, getVariationDetailsSaga),
        takeEvery(actions.CREATE_VARIATIONS_REQUEST, createVariationsSaga),
        takeEvery(actions.UPDATE_VARIATIONS_REQUEST, updateVariationsSaga),
        takeEvery(actions.DELETE_VARIATIONS_REQUEST, deleteVariationsSaga),

        takeEvery(actions.CREATE_VARIATIONS_RECIPE_REQUEST, createVariationsRecipeSaga),
        takeEvery(actions.UPDATE_VARIATIONS_RECIPE_REQUEST, updateVariationsRecipeSaga),
        takeEvery(actions.DELETE_VARIATIONS_RECIPE_REQUEST, deleteVariationsRecipeSaga),

        takeEvery(actions.ADD_VARIATIONS_IMAGE_REQUEST, addVariationsImageSaga),
        takeEvery(actions.UPDATE_VARIATIONS_IMAGE_REQUEST, updateVariationsImageSaga),
        takeEvery(actions.DELETE_VARIATIONS_IMAGE_REQUEST, deleteVariationsImageSaga),
        takeEvery(actions.GET_VARIATIONS_IMAGES_REQUEST, getVariationsImagesSaga),
    ]);
}
