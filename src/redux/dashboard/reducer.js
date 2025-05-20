import {Map} from 'immutable';
import actions from './actions';

const insightsState = new Map({
	loading: false,
	items: [],
});

const upcomingState = new Map({
	loading: false,
	items: [],
	page: 1,
	pageSize: 10,
	total: 0,
	loaded: false,
});

export function dashboardInsightsReducer(state = insightsState, action) {

	switch (action.type) {

		case actions.GET_INSIGHTS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_INSIGHTS_SUCCESS:
			return state
				.set('loading', false)
				.set('items', action.payload)

		case actions.GET_INSIGHTS_FAILURE:
			return state
				.set('loading', false)
		default:
			return state;
	}
}

export function dashboardUpcomingOrdersReducer(state = upcomingState, action) {

	switch (action.type) {

		case actions.GET_UPCOMING_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_UPCOMING_SUCCESS:
			return state
				.set('loading', false)
				.set('items', action.payload.items)
				.set('page', action.payload.page)
				.set('pageSize', action.payload.per_page)
				.set('total', action.payload.total)
				.set('loaded', true)

		case actions.GET_UPCOMING_FAILURE:
			return state
				.set('loading', false)
				.set('loaded', true)
		default:
			return state;
	}
}


