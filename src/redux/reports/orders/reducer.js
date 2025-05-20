import {Map} from 'immutable';
import actions from './actions';

const ordersChartState = new Map({
	loading: false,
	items: {
		name:"",
		series: [],
		categories:[]
	},
});

const ordersOptionsState = new Map({
	loading: false,
	quick_ranges:{},
	currentRange:"last_30_days",
	rangeDateMin:null,
	params:{
		range_type: "last_30_days",
		range_group:"day",
	}

});

export function ordersChartReducer(state = ordersChartState, action) {

	switch (action.type) {
		case actions.GET_ORDERS_CHART_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_ORDERS_CHART_SUCCESS:
			return state
				.set('loading', false)
				.set('items', action.payload)

		case actions.GET_ORDERS_CHART_FAILURE:
			return state
				.set('loading', false)
		default:
			return state;
	}
}
export function ordersOptionsReducer(state = ordersOptionsState, action) {

	switch (action.type) {

		case actions.GET_ORDERS_PARAMS_CHANGE:
			return state.set('params', {...state.params, ...action.params})

		case actions.GET_ORDERS_GROUP_BY_CHANGE:
			return state.set('params', {...state.params, ...action.params})

		case actions.GET_ORDERS_OPTIONS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_ORDERS_OPTIONS_SUCCESS:
			return state
				.set('loading', false)
				.set('quick_ranges', action.payload.quick_ranges)

		case actions.GET_ORDERS_OPTIONS_FAILURE:
			return state
				.set('loading', false)
		default:
			return state;
	}
}

export default function reportOrdersReducer(state = {}, action){
	return {
		chart: 	ordersChartReducer(state.chart, action),
		options: ordersOptionsReducer(state.options, action)
	};
}

