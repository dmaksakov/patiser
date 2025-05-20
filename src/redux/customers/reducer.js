import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    loading: false,
	sidebar: false,
	customers: [],
	allCustomers: [],
	selectedCustomer: {},
	pageParams: {
		page: 1,
		pageSize: 4,
		total: 0,
		search: '',
		sortDir: 'asc',
		sortField: 'name',
	}
});

export default function customerReducer(state = initState, action) {

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

		case actions.GET_ALL_CUSTOMERS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_ALL_CUSTOMERS_SUCCESS:
			return state
				.set('allCustomers', action.payload.items)

		case actions.GET_ALL_CUSTOMERS_FAILURE:
			return state
				.set('loading', false)

		case actions.GET_CUSTOMERS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_CUSTOMERS_SUCCESS:
            return state
                .set('loading', false)
				.set('customers', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

        case actions.GET_CUSTOMERS_FAILURE:
            return state
                .set('loading', false)

        case actions.CREATE_CUSTOMERS_REQUEST:
            return state
                .set('loading', true);

        case actions.CREATE_CUSTOMERS_SUCCESS:
            return state
                .set('loading', false)

        case actions.CREATE_CUSTOMERS_FAILURE:
            return state
                .set('loading', false)

        case actions.UPDATE_CUSTOMERS_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_CUSTOMERS_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_CUSTOMERS_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_CUSTOMER_DETAILS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_CUSTOMER_DETAILS_SUCCESS:
            return state
                .set('loading', false)

        case actions.GET_CUSTOMER_DETAILS_FAILURE:
            return state
                .set('loading', false)

        case actions.DELETE_CUSTOMER_REQUEST:
            return state
                .set('loading', true);

        case actions.DELETE_CUSTOMER_SUCCESS:
            return state
                .set('loading', false)

        case actions.DELETE_CUSTOMER_FAILURE:
            return state
                .set('loading', false)

        case actions.SELECT_CUSTOMER:
            return state
                .set('selectedCustomer', action.customer)

        default:
            return state;
    }
}
