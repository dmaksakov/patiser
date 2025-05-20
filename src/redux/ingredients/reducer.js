import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    loading: false,
	ingredients: [],
	allIngredients: [],
	sidebar: false,
	selectedIngredient: {
    	name: '',
		price: '',
		amount: '',
		measure_unit: '',
		sid: ''
	},
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
		steps: [],
	},
});

export default function ingredientReducer(state = initState, action) {

    switch (action.type) {

		case actions.SET_TOUR:
			return state
				.set('tour', {
					...state.get('tour'),
					...action.tour
				})

		case actions.SET_PAGE_PARAMS:
			return state
				.set('pageParams', {
					...state.get('pageParams'),
					...action.params
				})

		case actions.SET_SIDEBAR:
			return state
				.set('sidebar', action.boolean);

        case actions.GET_INGREDIENTS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_INGREDIENTS_SUCCESS:
            return state
                .set('loading', false)
				.set('ingredients', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

        case actions.GET_INGREDIENTS_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_ALL_INGREDIENTS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_ALL_INGREDIENTS_SUCCESS:
            return state
                .set('loading', false)
				.set('allIngredients', action.payload.items)

        case actions.GET_ALL_INGREDIENTS_FAILURE:
            return state
                .set('loading', false)

        case actions.CREATE_INGREDIENTS_REQUEST:
            return state
                .set('loading', true);

        case actions.CREATE_INGREDIENTS_SUCCESS:
            return state
                .set('loading', false)

        case actions.CREATE_INGREDIENTS_FAILURE:
            return state
                .set('loading', false)

        case actions.UPDATE_INGREDIENTS_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_INGREDIENTS_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_INGREDIENTS_FAILURE:
            return state
                .set('loading', false)

        case actions.DELETE_INGREDIENTS_REQUEST:
            return state
                .set('loading', true);

        case actions.DELETE_INGREDIENTS_SUCCESS:
            return state
                .set('loading', false)

        case actions.DELETE_INGREDIENTS_FAILURE:
            return state
                .set('loading', false)

		case actions.SELECT_INGREDIENT:
			return state
				.set('selectedIngredient',
				{
					...action.ingredient,
					measure_unit:
						Object.keys(action.ingredient).length !== 0
							?
								{
									value: action.ingredient.measure_unit.value,
									label: action.ingredient.measure_unit.label
								}
							:
								{}
				})

        default:
            return state;
    }
}
