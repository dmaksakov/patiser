import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
	loading: false,
	sidebar: false,
	taxCategories: [],
	selectedTaxCategory: {},
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

		case actions.SELECT_TAX_CATEGORY:
			return state
				.set('selectedTaxCategory', action.taxCategory)

		case actions.GET_TAX_CATEGORIES_REQUEST:
			return state
				.set('loading', true)

		case actions.GET_TAX_CATEGORIES_SUCCESS:
			return state
				.set('loading', false)
				.set('taxCategories', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

		case actions.GET_TAX_CATEGORIES_FAILURE:
			return state
				.set('loading', false)

		case actions.CREATE_TAX_CATEGORY_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_TAX_CATEGORY_SUCCESS:
			return state
				.set('loading', false)

		case actions.CREATE_TAX_CATEGORY_FAILURE:
			return state
				.set('loading', false)


		case actions.UPDATE_TAX_CATEGORY_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_TAX_CATEGORY_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_TAX_CATEGORY_FAILURE:
			return state
				.set('loading', false)


		case actions.DELETE_TAX_CATEGORY_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_TAX_CATEGORY_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_TAX_CATEGORY_FAILURE:
			return state
				.set('loading', false)

		default:
			return state;
	}
}
