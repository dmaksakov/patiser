import {Map} from 'immutable';
import actions from './actions';
import React from "react";

const initState = new Map({
    loading: false,
	sidebar: false,
	attributesSidebar: false,
	recipesSidebar: false,
	imagesSidebar: false,
	variationsSidebar: false,
	products: [],
	selectedProduct: {},
	selectedAttribute: {},
	selectedRecipe: {},
	selectedProductImage: {},
	productImages: [],
	productVariations: [],
	imagesRequestDone: false,
	recipeAmount: 0,
	pageParams: {
		page: 1,
		pageSize: 10,
		total: 0,
		search: '',
		sortDir: 'desc',
		sortField: '',
	},
	tour: {
		run: false,
		stepIndex: 0,
		steps: [
			{
				content: (
					<div>
						Click on the button to add new product
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				hideFooter: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.add-new',
				title: 'Add product',
			},
			{
				content: <div>
					Product can be one of two types: simple or variable.
					Simple product is a product that has only one variation (for example, always has
					the same type of filling, etc.).
					Variable product can have several variations (for example, several types of fillings
					or toppings).
				</div>,
				placement: 'left',
				target: '.product-type',
				title: 'Product type',
			},
			{
				content: <div>
					Product can be one of two types: recipe based or fixed price.
					Price of the recipe based product is calculated from recipe or recipes this product is based on.
					Fixed price product is not based on a recipe but has a constant price.
				</div>,
				placement: 'left',
				target: '.recipe-based',
				spotlightPadding: 18,
				title: 'Recipe based or Fixed price',
			},
			{
				content: <div>
					Enter a product name here
				</div>,
				placement: 'left',
				target: '.product-name',
				spotlightPadding: 15,
			},
			{
				content: <div>
					Every product must have a product category. Please make sure
					there is a product category for the product you want to add first.
				</div>,
				placement: 'left',
				target: '.product-category',
				title: 'Product category',
			},
			{
				content: <div>
					Here you can choose the tax category (for example, different states and
					counties can have different taxes)
				</div>,
				placement: 'left',
				target: '.tax-category',
				title: 'Tax category',
			},
		],
		steps2: [
			{
				content: (
					<div>
						Click on the product name to see the product details
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				hideFooter: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.ingredient-name',
				title: 'Product details',
			},
		],
	},
});

export default function productReducer(state = initState, action) {

    switch (action.type) {

		case actions.SET_TOUR:
			return state
				.set('tour', {
					...state.get('tour'),
					...action.tour
				})

		case actions.GENERATE_PRODUCT_VARIATIONS_REQUEST:
			return state
				.set('loading', true);

		case actions.GENERATE_PRODUCT_VARIATIONS_SUCCESS:
			return state
				.set('loading', false)

		case actions.GENERATE_PRODUCT_VARIATIONS_FAILURE:
			return state
				.set('loading', false)


		case actions.SET_PAGE_PARAMS:
			return state
				.set('pageParams', {
					...state.get('pageParams'),
					...action.params
				})

		case actions.SET_SIDEBAR:
			return state
				.set(action.sidebar, action.boolean);

        case actions.GET_PRODUCTS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_PRODUCTS_SUCCESS:
            return state
                .set('loading', false)
				.set('products', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

        case actions.GET_PRODUCTS_FAILURE:
            return state
                .set('loading', false)


        case actions.CREATE_PRODUCTS_REQUEST:
            return state
                .set('loading', true);

        case actions.CREATE_PRODUCTS_SUCCESS:
            return state
                .set('loading', false)

        case actions.CREATE_PRODUCTS_FAILURE:
            return state
                .set('loading', false)


        case actions.UPDATE_PRODUCTS_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_PRODUCTS_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_PRODUCTS_FAILURE:
            return state
                .set('loading', false)


        case actions.GET_PRODUCT_DETAILS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_PRODUCT_DETAILS_SUCCESS:
            return state
                .set('loading', false)

        case actions.GET_PRODUCT_DETAILS_FAILURE:
            return state
                .set('loading', false)


        case actions.DELETE_PRODUCT_REQUEST:
            return state
                .set('loading', true);

        case actions.DELETE_PRODUCT_SUCCESS:
            return state
                .set('loading', false)

        case actions.DELETE_PRODUCT_FAILURE:
            return state
                .set('loading', false)


		case actions.SELECT_PRODUCT:
            return state
                .set('selectedProduct', {
                	...action.product,
					recipe_based: action.product.recipe_based ? 'yes' : 'no'
				})

        case actions.SELECT_PRODUCT_ATTRIBUTE:
            return state
                .set('selectedAttribute', action.attribute)

        case actions.SELECT_PRODUCT_RECIPE:
            return state
                .set('selectedRecipe', action.recipe)


        case actions.SELECT_PRODUCT_IMAGE:
            return state
                .set('selectedProductImage', action.productImage)

        case actions.RESET_PRODUCT_IMAGES:
            return state
                .set('productImages', [])

///////////////////////////////////////////////////
/////////////////////////////// Product Recipes
///////////////////////////////////////////////////

		case actions.SET_RECIPE_AMOUNT:
			return state
				.set('recipeAmount', action.amount)

		case actions.ADD_PRODUCT_RECIPE_REQUEST:
			return state
				.set('loading', true)

		case actions.ADD_PRODUCT_RECIPE_SUCCESS:
			return state
				.set('loading', false)

		case actions.ADD_PRODUCT_RECIPE_FAILURE:
			return state
				.set('loading', false)

		case actions.UPDATE_PRODUCT_RECIPE_REQUEST:
			return state
				.set('loading', true)

		case actions.UPDATE_PRODUCT_RECIPE_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_PRODUCT_RECIPE_FAILURE:
			return state
				.set('loading', false)

///////////////////////////////////////////////////
/////////////////////////////// Product Attributes
///////////////////////////////////////////////////

		case actions.ADD_PRODUCT_ATTRIBUTE_REQUEST:
			return state
				.set('loading', true)

		case actions.ADD_PRODUCT_ATTRIBUTE_SUCCESS:
			return state
				.set('loading', false)

		case actions.ADD_PRODUCT_ATTRIBUTE_FAILURE:
			return state
				.set('loading', false)

		case actions.UPDATE_PRODUCT_ATTRIBUTE_REQUEST:
			return state
				.set('loading', true)

		case actions.UPDATE_PRODUCT_ATTRIBUTE_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_PRODUCT_ATTRIBUTE_FAILURE:
			return state
				.set('loading', false)

///////////////////////////////////////////////////
////////////////////////////// Product Images
///////////////////////////////////////////////////

		case actions.GET_SIMPLE_PRODUCT_IMAGES_REQUEST:
			return state
				.set('loading', true)
				.set('imagesRequestDone', false)

		case actions.GET_SIMPLE_PRODUCT_IMAGES_SUCCESS:
			return state
				.set('loading', false)
				.set('productImages', action.payload)
				.set('imagesRequestDone', true)

		case actions.GET_SIMPLE_PRODUCT_IMAGES_FAILURE:
			return state
				.set('loading', false)
				.set('imagesRequestDone', true)


		case actions.ADD_SIMPLE_PRODUCT_IMAGES_REQUEST:
			return state
				.set('loading', true);

		case actions.ADD_SIMPLE_PRODUCT_IMAGES_SUCCESS:
			return state
				.set('loading', false)

		case actions.ADD_SIMPLE_PRODUCT_IMAGES_FAILURE:
			return state
				.set('loading', false)


		case actions.UPDATE_SIMPLE_PRODUCT_IMAGES_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_SIMPLE_PRODUCT_IMAGES_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_SIMPLE_PRODUCT_IMAGES_FAILURE:
			return state
				.set('loading', false)


		case actions.DELETE_SIMPLE_PRODUCT_IMAGES_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_SIMPLE_PRODUCT_IMAGES_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_SIMPLE_PRODUCT_IMAGES_FAILURE:
			return state
				.set('loading', false)

/////////////////////////////////////////////////
///////////////// Variable products
/////////////////////////////////////////////////

		case actions.GET_PRODUCT_VARIATIONS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_PRODUCT_VARIATIONS_SUCCESS:
			return state
				.set('loading', false)
				.set('productVariations', action.payload)

		case actions.GET_PRODUCT_VARIATIONS_FAILURE:
			return state
				.set('loading', false)


		case actions.CREATE_VARIABLE_PRODUCTS_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_VARIABLE_PRODUCTS_SUCCESS:
			return state
				.set('loading', false)

		case actions.CREATE_VARIABLE_PRODUCTS_FAILURE:
			return state
				.set('loading', false)


		case actions.UPDATE_VARIABLE_PRODUCTS_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_VARIABLE_PRODUCTS_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIABLE_PRODUCTS_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_VARIABLE_PRODUCTS_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_VARIABLE_PRODUCTS_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_VARIABLE_PRODUCTS_FAILURE:
			return state
				.set('loading', false)

/////////////////////////////////////////////////
///////////////// Variable product attributes
/////////////////////////////////////////////////

		case actions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS:
			return state
				.set('loading', false)
				.set('productVariations', action.payload)

		case actions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE:
			return state
				.set('loading', false)

		case actions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST:
			return state
				.set('loading', true);

		case actions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS:
			return state
				.set('loading', false)

		case actions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE:
			return state
				.set('loading', false)

		default:
            return state;
    }
}
