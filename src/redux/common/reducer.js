import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    loading: false,
	isMobile: window.innerWidth <= 760,
	currencies: [],
	countries: [],
	measureSystems: [
		{
			value: 'METRIC',
			label: 'Metric'
		},
		{
			value: 'IMPERIAL',
			label: 'Imperial'
		},
	],
	discountTypes: [],
	orderStatuses: [],
	conversions: [],
	ads: {
    	lowTier: '<script type="text/javascript">\n' +
			'amzn_assoc_placement = "adunit0";\n' +
			'amzn_assoc_tracking_id = "patiser-20";\n' +
			'amzn_assoc_ad_mode = "manual";\n' +
			'amzn_assoc_ad_type = "smart";\n' +
			'amzn_assoc_marketplace = "amazon";\n' +
			'amzn_assoc_region = "US";\n' +
			'amzn_assoc_linkid = "6341574b79a7294db326430568763c5a";\n' +
			'amzn_assoc_asins = "B00BTI827K,B07F89XFJJ,B01I527F84,B00IYTQKOO,B079RCL5Z1,B00TM6VO7Q";\n' +
			'amzn_assoc_design = "in_content";\n' +
			'</script>\n' +
			'<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>',
    	midTier: '<script type="text/javascript">\n' +
			'amzn_assoc_placement = "adunit0";\n' +
			'amzn_assoc_tracking_id = "patiser-20";\n' +
			'amzn_assoc_ad_mode = "manual";\n' +
			'amzn_assoc_ad_type = "smart";\n' +
			'amzn_assoc_marketplace = "amazon";\n' +
			'amzn_assoc_region = "US";\n' +
			'amzn_assoc_linkid = "6341574b79a7294db326430568763c5a";\n' +
			'amzn_assoc_asins = "B00004TUCV,B0753XHTJB,B07G9DNNGF,B07Z5XF1R1,B07QSDYRND";\n' +
			'amzn_assoc_design = "in_content";\n' +
			'</script>\n' +
			'<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>',
    	highTier: '<script type="text/javascript">\n' +
			'amzn_assoc_placement = "adunit0";\n' +
			'amzn_assoc_tracking_id = "patiser-20";\n' +
			'amzn_assoc_ad_mode = "manual";\n' +
			'amzn_assoc_ad_type = "smart";\n' +
			'amzn_assoc_marketplace = "amazon";\n' +
			'amzn_assoc_region = "US";\n' +
			'amzn_assoc_linkid = "6341574b79a7294db326430568763c5a";\n' +
			'amzn_assoc_asins = "B008PU126I,B009TCMOMC,B08SHXZJQ2,B07RD58G24";\n' +
			'amzn_assoc_design = "in_content";\n' +
			'</script>\n' +
			'<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>',
	}
});

export default function commonReducer(state = initState, action) {

    switch (action.type) {

		case actions.SET_MOBILE:
			return state
				.set('isMobile', action.mobile);

		case actions.GET_MEASURE_UNITS_DETAILS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_MEASURE_UNITS_DETAILS_SUCCESS:
			return state
				.set('loading', false)
				.set('conversions', action.payload)

		case actions.GET_MEASURE_UNITS_DETAILS_FAILURE:
			return state
				.set('loading', false)

		case actions.GET_CURRENCIES_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_CURRENCIES_SUCCESS:
        	const modifiedCurrencies = action.payload.map(currency => {
        		return {
        			value: currency.id,
					label: `${currency.name} (${currency.code})`
				}
			})
            return state
                .set('loading', false)
				.set('currencies', modifiedCurrencies)

        case actions.GET_CURRENCIES_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_COUNTRIES_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_COUNTRIES_SUCCESS:
			const modifiedCountries = action.payload.map(country => {
				return {
					value: country.code,
					label: `${country.name} (${country.code})`
				}
			})
            return state
                .set('loading', false)
				.set('countries', modifiedCountries)

        case actions.GET_COUNTRIES_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_MEASURE_SYSTEMS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_MEASURE_SYSTEMS_SUCCESS:
            return state
                .set('loading', false)
				.set('measureSystems', action.payload)

        case actions.GET_MEASURE_SYSTEMS_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_DISCOUNT_TYPES_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_DISCOUNT_TYPES_SUCCESS:
            return state
                .set('loading', false)
				.set('discountTypes', action.payload)

        case actions.GET_DISCOUNT_TYPES_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_ORDER_STATUSES_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_ORDER_STATUSES_SUCCESS:
            return state
                .set('loading', false)
				.set('orderStatuses', action.payload)

        case actions.GET_ORDER_STATUSES_FAILURE:
            return state
                .set('loading', false)

        default:
            return state;
    }
}
