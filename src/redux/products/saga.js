import {all, takeEvery, put, delay, call, takeLatest, select} from 'redux-saga/effects'
import actions from "./actions"
import {history} from "../store"
import errorActions from "../errors/actions";
import {
	getProducts,
	createProduct,
	updateProduct,
	getProductDetails,
	deleteProduct,

	addProductAttribute,
	updateProductAttribute,
	deleteProductAttribute,

	addProductRecipe,
	updateProductRecipe,
	deleteProductRecipe,

	getSimpleProductImages,
	addSimpleProductImages,
	updateSimpleProductImages,
	deleteSimpleProductImages,

	generateProductVariations,

	getProductVariations,
	createVariableProduct,
	updateVariableProduct,
	deleteVariableProduct,

	createVariableProductAttribute,
	updateVariableProductAttribute,
	deleteVariableProductAttribute,

	addVariableProductAttributeValue,
	deleteVariableProductAttributeValue,

} from '../../helpers/api/products.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import {reset, startSubmit, stopSubmit} from "redux-form";

export const getErrors = (state) => state.errors.toJS().errors

export function* getProductsSaga(action) {
    try {
		const getPageParams = (state) => state.products.toJS().pageParams;
		const pageParams = yield select(getPageParams)
		const response = yield callCheckingAuthentication(getProducts, pageParams);
		yield put(actions.getProductsSuccess(response.data));
	} catch (e) {
        yield put(actions.getProductsFailure(e));
    }
}

export function* debounceGetProductsSaga(action) {
	yield delay(200);
	yield call(getProductsSaga, action);
}

export function* createProductsSaga(action) {
	try {
		yield put( startSubmit('ProductForm') )

		const response = yield callCheckingAuthentication(createProduct, action.params);
		yield put(actions.createProductsSuccess(response.data));

		yield put(actions.setTour(
			{
				run: true,
				stepIndex: 0,
			}
		))

		yield put(actions.setSidebar(false))
		yield put(reset('ProductForm') )
		yield put(stopSubmit('ProductForm') )

		yield put(actions.getProducts({}));
		yield put(errorActions.addNotification('Product added', 'The product was successfully added'));
		yield put(actions.selectProduct({
			sid: ''
		}));
	} catch (e) {
		yield put(actions.createProductsFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateProductsSaga(action) {
	try {
		yield put( startSubmit('ProductForm') )

		const response = yield callCheckingAuthentication(updateProduct, action.params);
		yield put(actions.updateProductsSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('ProductForm') )
		yield put(stopSubmit('ProductForm') )

		yield put(actions.getProducts({}));
		yield put(actions.getProductDetails({sid: action.params.sid}));
		yield put(errorActions.addNotification('Product updated', 'The product was successfully updated'));
	} catch (e) {
		yield put(actions.updateProductsFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* getProductDetailsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getProductDetails, action.params);
		yield put(actions.getProductDetailsSuccess(response.data));
		yield put(actions.selectProduct({
			...response.data,
			recipe_based: response.data.is_recipe_based,
			category: {
				label: response.data.category.name,
				value: response.data.category.sid,
			},
			tax_category: {
				label: response.data.tax_category.name,
				value: response.data.tax_category.sid,
			}
		}));
		if (response.data.is_variable) {
			yield put(actions.getProductVariations({sid: action.params.sid, vid: action.params.vid}))
		}
	} catch (e) {
		yield put(actions.getProductDetailsFailure(e));
	}
}

export function* deleteProductSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteProduct, action.params);
		yield put(actions.deleteProductSuccess(response.data));
		yield put(actions.getProducts({}));
		yield put(errorActions.addNotification('Product deleted', 'The product was successfully deleted'));
		history.push('/products')
	} catch (e) {
		yield put(actions.deleteProductFailure(e));
	}
}

///////////////////////////////////////////////////////
//////////////// Product Attributes
///////////////////////////////////////////////////////

export function* addProductAttributeSaga(action) {
	try {
		yield put( startSubmit('ProductAttributesForm') )

		const response = yield callCheckingAuthentication(addProductAttribute, action.params);
		yield put(actions.addProductAttributeSuccess(response.data));

		yield put(actions.setSidebar(false, 'attributesSidebar'))
		yield put(reset('ProductAttributesForm') )
		yield put(stopSubmit('ProductAttributesForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(actions.selectAttribute({
			sid: ''
		}));
		yield put(errorActions.addNotification('Product attribute added', 'The product attribute was successfully added'));
	} catch (e) {
		yield put(actions.addProductAttributeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductAttributesForm', combineErrors(storeErrors)) )
	}
}

export function* updateProductAttributeSaga(action) {
	try {
		yield put( startSubmit('ProductAttributesForm') )

		const response = yield callCheckingAuthentication(updateProductAttribute, action.params);
		yield put(actions.updateProductAttributeSuccess(response.data));

		yield put(actions.setSidebar(false, 'attributesSidebar'))
		yield put(reset('ProductAttributesForm') )
		yield put(stopSubmit('ProductAttributesForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute updated', 'The product attribute was successfully updated'));
	} catch (e) {
		yield put(actions.updateProductAttributeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductAttributesForm', combineErrors(storeErrors)) )
	}
}

export function* deleteProductAttributeSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteProductAttribute, action.params);
		yield put(actions.deleteProductAttributeSuccess(response.data));
		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute delete', 'The product attribute was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteProductAttributeFailure(e));
	}
}

///////////////////////////////////////////////////////
//////////////// Product Recipes
///////////////////////////////////////////////////////

export function* addProductRecipeSaga(action) {
	try {
		yield put( startSubmit('ProductRecipesForm') )

		const response = yield callCheckingAuthentication(addProductRecipe, action.params);
		yield put(actions.addProductRecipeSuccess(response.data));

		yield put(actions.setSidebar(false, 'recipesSidebar'))
		yield put(reset('ProductRecipesForm') )
		yield put(stopSubmit('ProductRecipesForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(actions.selectRecipe({
			sid: ''
		}));
		yield put(errorActions.addNotification('Product recipe added', 'The product recipe was successfully added'));
	} catch (e) {
		yield put(actions.addProductRecipeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductRecipesForm', combineErrors(storeErrors)) )
	}
}

export function* updateProductRecipeSaga(action) {
	try {
		yield put( startSubmit('ProductRecipesForm') )

		const response = yield callCheckingAuthentication(updateProductRecipe, action.params);
		yield put(actions.updateProductRecipeSuccess(response.data));

		yield put(actions.setSidebar(false, 'recipesSidebar'))
		yield put(reset('ProductRecipesForm') )
		yield put(stopSubmit('ProductRecipesForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product updated', 'The product was successfully updated'));
	} catch (e) {
		yield put(actions.updateProductRecipeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductRecipesForm', combineErrors(storeErrors)) )
	}
}

export function* deleteProductRecipeSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteProductRecipe, action.params);
		yield put(actions.deleteProductRecipeSuccess(response.data));
		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product deleted', 'The product was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteProductRecipeFailure(e));
	}
}

///////////////////////////////////////////////////////
//////////////// Simple Product Images
///////////////////////////////////////////////////////

export function* getSimpleProductImagesSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getSimpleProductImages, action.params);
		yield put(actions.getSimpleProductImagesSuccess(response.data));
	} catch (e) {
		yield put(actions.getSimpleProductImagesFailure(e));
	}
}

export function* addSimpleProductImagesSaga(action) {
	try {
		const response = yield callCheckingAuthentication(addSimpleProductImages, action.params);
		yield put(actions.addSimpleProductImagesSuccess(response.data));
		yield put(actions.getSimpleProductImages({sid: action.params.sid}));
		yield put(errorActions.addNotification('Product image added', 'The product image was successfully added'));
	} catch (e) {
		yield put(actions.addSimpleProductImagesFailure(e));
	}
}

export function* updateSimpleProductImagesSaga(action) {
	try {
		yield put( startSubmit('ProductImagesForm') )

		const response = yield callCheckingAuthentication(updateSimpleProductImages, action.params);
		yield put(actions.updateSimpleProductImagesSuccess(response.data));

		yield put(actions.setSidebar(false, 'imagesSidebar'))
		yield put(reset('ProductImagesForm') )
		yield put(stopSubmit('ProductImagesForm') )

		yield put(actions.getSimpleProductImages({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product image updated', 'The product image was successfully updated'));
	} catch (e) {
		yield put(actions.updateSimpleProductImagesFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductImagesForm', combineErrors(storeErrors)) )
	}
}

export function* deleteSimpleProductImagesSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteSimpleProductImages, action.params);
		yield put(actions.deleteSimpleProductImagesSuccess(response.data));
		yield put(actions.getSimpleProductImages({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product image deleted', 'The product image was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteSimpleProductImagesFailure(e));
	}
}

/////////////////////////////////////////////////
///////////////// Variable products
/////////////////////////////////////////////////

export function* generateProductVariationsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(generateProductVariations, action.params);
		yield put(actions.generateProductVariationsSuccess(response.data));
		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.sid}));
		// if (action.params.sid) {
		// 	yield put(actions.selectVariation({}, action.params.sid));
		// }
	} catch (e) {
		yield put(actions.generateProductVariationsFailure(e));
	}
}

export function* getProductVariationsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getProductVariations, action.params);
		yield put(actions.getProductVariationsSuccess(response.data));
		// if (action.params.vid) {
		// 	yield put(actions.selectVariation({}, action.params.vid));
		// }
	} catch (e) {
		yield put(actions.getProductVariationsFailure(e));
	}
}

export function* createVariableProductSaga(action) {
	try {
		yield put( startSubmit('ProductForm') )

		const response = yield callCheckingAuthentication(createVariableProduct, action.params);
		yield put(actions.createVariableProductSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('ProductForm') )
		yield put(stopSubmit('ProductForm') )

		yield put(actions.getProducts());
		yield put(errorActions.addNotification('Product added', 'The product was successfully added'));
		yield put(actions.selectProduct({
			sid: ''
		}));
	} catch (e) {
		yield put(actions.createVariableProductFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateVariableProductSaga(action) {
	try {
		yield put( startSubmit('ProductForm') )

		const response = yield callCheckingAuthentication(updateVariableProduct, action.params);
		yield put(actions.updateVariableProductSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('ProductForm') )
		yield put(stopSubmit('ProductForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.sid}));
		yield put(errorActions.addNotification('Product updated', 'The product was successfully updated'));
	} catch (e) {
		yield put(actions.updateVariableProductFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )

	}
}

export function* deleteVariableProductSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteVariableProduct, action.params);
		yield put(actions.deleteVariableProductSuccess(response.data));
		// yield put(actions.getProducts());
		// yield put(errorActions.addNotification('Product deleted', 'The product was successfully deleted'));
		// history.push('/products')
	} catch (e) {
		yield put(actions.deleteVariableProductFailure(e));
	}
}

/////////////////////////////////////////////////
///////////////// Variable product attributes
/////////////////////////////////////////////////

export function* createVariableProductAttributeSaga(action) {
	try {
		yield put( startSubmit('ProductAttributesForm') )

		const response = yield callCheckingAuthentication(createVariableProductAttribute, action.params);
		yield put(actions.createVariableProductAttributeSuccess(response.data));

		yield put(actions.setSidebar(false, 'attributesSidebar'))
		yield put(reset('ProductAttributesForm') )
		yield put(stopSubmit('ProductAttributesForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute added', 'The product attribute was successfully added'));
	} catch (e) {
		yield put(actions.createVariableProductAttributeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductAttributesForm', combineErrors(storeErrors)) )
	}
}

export function* updateVariableProductAttributeSaga(action) {
	try {
		yield put( startSubmit('ProductAttributesForm') )

		const response = yield callCheckingAuthentication(updateVariableProductAttribute, action.params);
		yield put(actions.updateVariableProductAttributeSuccess(response.data));

		yield put(actions.setSidebar(false, 'attributesSidebar'))
		yield put(reset('ProductAttributesForm') )
		yield put(stopSubmit('ProductAttributesForm') )

		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute updated', 'The product attribute was successfully updated'));
	} catch (e) {
		yield put(actions.updateVariableProductAttributeFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit('ProductAttributesForm', combineErrors(storeErrors)) )}
}

export function* deleteVariableProductAttributeSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteVariableProductAttribute, action.params);
		yield put(actions.deleteVariableProductAttributeSuccess(response.data));
		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute deleted', 'The product attribute was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteVariableProductAttributeFailure(e));
	}
}

export function* addVariableProductAttributeValueSaga(action) {
	try {
		const response = yield callCheckingAuthentication(addVariableProductAttributeValue, action.params);
		yield put(actions.addVariableProductAttributeValueSuccess(response.data));
		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute value added', 'The product attribute value was successfully added'));
	} catch (e) {
		yield put(actions.addVariableProductAttributeValueFailure(e));
	}
}

export function* deleteVariableProductAttributeValueSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteVariableProductAttributeValue, action.params);
		yield put(actions.deleteVariableProductAttributeValueSuccess(response.data));
		yield put(actions.getProducts());
		yield put(actions.getProductDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Product attribute value deleted', 'The product attribute value was successfully deleted'));
	} catch (e) {
		yield put(actions.deleteVariableProductAttributeValueFailure(e));
	}
}

export default function* rootSaga() {
    yield all([

    	/////////////////////////// Simple products ///////////////////////////////

        takeEvery(actions.GET_PRODUCTS_REQUEST, getProductsSaga),
		takeLatest(actions.GET_PRODUCTS_DEBOUNCE, debounceGetProductsSaga),
        takeEvery(actions.CREATE_PRODUCTS_REQUEST, createProductsSaga),
        takeEvery(actions.UPDATE_PRODUCTS_REQUEST, updateProductsSaga),
        takeEvery(actions.GET_PRODUCT_DETAILS_REQUEST, getProductDetailsSaga),
        takeEvery(actions.DELETE_PRODUCT_REQUEST, deleteProductSaga),

		takeEvery(actions.ADD_PRODUCT_ATTRIBUTE_REQUEST, addProductAttributeSaga),
		takeEvery(actions.UPDATE_PRODUCT_ATTRIBUTE_REQUEST, updateProductAttributeSaga),
		takeEvery(actions.DELETE_PRODUCT_ATTRIBUTE_REQUEST, deleteProductAttributeSaga),

		takeEvery(actions.ADD_PRODUCT_RECIPE_REQUEST, addProductRecipeSaga),
		takeEvery(actions.UPDATE_PRODUCT_RECIPE_REQUEST, updateProductRecipeSaga),
		takeEvery(actions.DELETE_PRODUCT_RECIPE_REQUEST, deleteProductRecipeSaga),

		takeEvery(actions.GET_SIMPLE_PRODUCT_IMAGES_REQUEST, getSimpleProductImagesSaga),
		takeEvery(actions.ADD_SIMPLE_PRODUCT_IMAGES_REQUEST, addSimpleProductImagesSaga),
		takeEvery(actions.UPDATE_SIMPLE_PRODUCT_IMAGES_REQUEST, updateSimpleProductImagesSaga),
		takeEvery(actions.DELETE_SIMPLE_PRODUCT_IMAGES_REQUEST, deleteSimpleProductImagesSaga),

		////////////////////////////// Variable products ///////////////////////////

		takeEvery(actions.GENERATE_PRODUCT_VARIATIONS_REQUEST, generateProductVariationsSaga),

		takeEvery(actions.GET_PRODUCT_VARIATIONS_REQUEST, getProductVariationsSaga),
		takeEvery(actions.CREATE_VARIABLE_PRODUCTS_REQUEST, createVariableProductSaga),
		takeEvery(actions.UPDATE_VARIABLE_PRODUCTS_REQUEST, updateVariableProductSaga),
		takeEvery(actions.DELETE_VARIABLE_PRODUCTS_REQUEST, deleteVariableProductSaga),

		takeEvery(actions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST, createVariableProductAttributeSaga),
		takeEvery(actions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST, updateVariableProductAttributeSaga),
		takeEvery(actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST, deleteVariableProductAttributeSaga),
		takeEvery(actions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST, addVariableProductAttributeValueSaga),
		takeEvery(actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST, deleteVariableProductAttributeValueSaga),

	]);
}
