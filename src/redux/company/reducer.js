import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    loading: false,
	company: [],
	companyMeasureUnits: [],
});

export default function companyReducer(state = initState, action) {

    switch (action.type) {

        case actions.GET_COMPANY_REQUEST:
            return state
                .set('loading', true);

		case actions.GET_COMPANY_SUCCESS:
        	const address = action.payload.address ? action.payload.address : {}
			let flatCompany = action.payload
			const country_code = action.payload.address
				?
					{
						value: flatCompany.address.country.code,
						label: `${flatCompany.address.country.name} (${flatCompany.address.country.code})`
					}
        		:
					''

        	flatCompany = {
        		...flatCompany,
				...address,
				currency: {
        			value: flatCompany.currency.id,
					label: `${flatCompany.currency.name} (${flatCompany.currency.code})`
        		},
				country_code,
				measure_system: {
        			value: flatCompany.measure_system.id,
					label: flatCompany.measure_system.name,
				}
        	}
            return state
                .set('loading', false)
				.set('company', flatCompany)

        case actions.GET_COMPANY_FAILURE:
            return state
                .set('loading', false)

        case actions.UPDATE_COMPANY_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_COMPANY_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_COMPANY_FAILURE:
            return state
                .set('loading', false)

        case actions.COMPANY_MEASURE_UNITS_REQUEST:
            return state
                .set('loading', true);

        case actions.COMPANY_MEASURE_UNITS_SUCCESS:
            return state
                .set('loading', false)
				.set('companyMeasureUnits', action.payload)

        case actions.COMPANY_MEASURE_UNITS_FAILURE:
            return state
                .set('loading', false)

        default:
            return state;
    }
}
