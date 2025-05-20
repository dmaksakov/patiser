import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
	loading: false,
	sidebar: false,
	productCategories: [],
	selectedProductCategory: {},
	pageParams: {
		page: 1,
		pageSize: 10,
		total: 0,
		search: '',
		sortDir: 'asc',
		sortField: 'name',
	}
});

export default function categoryReducer(state = initState, action) {

	switch (action.type) {

		case actions.SET_PAGE_PARAMS:
			return state
				.set('pageParams', {
					...state.get('pageParams'),
					...action.params
				})

		case actions.SET_SIDEBAR:
			return state
				.set('sidebar', action.boolean);

		case actions.SELECT_PRODUCT_CATEGORY:
			return state
				.set('selectedProductCategory', action.productCategory)

		case actions.GET_PRODUCT_CATEGORIES_REQUEST:
			return state
				.set('loading', true)

		case actions.GET_PRODUCT_CATEGORIES_SUCCESS:
			return state
				.set('loading', false)
				.set('productCategories', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

		case actions.GET_PRODUCT_CATEGORIES_FAILURE:
			return state
				.set('loading', false)


		case actions.CREATE_PRODUCT_CATEGORY_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_PRODUCT_CATEGORY_SUCCESS:
			return state
				.set('loading', false)

		case actions.CREATE_PRODUCT_CATEGORY_FAILURE:
			return state
				.set('loading', false)


		case actions.UPDATE_PRODUCT_CATEGORY_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_PRODUCT_CATEGORY_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_PRODUCT_CATEGORY_FAILURE:
			return state
				.set('loading', false)


		case actions.DELETE_PRODUCT_CATEGORY_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_PRODUCT_CATEGORY_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_PRODUCT_CATEGORY_FAILURE:
			return state
				.set('loading', false)

		default:
			return state;
	}
}
