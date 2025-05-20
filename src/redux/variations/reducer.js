import {Map} from 'immutable';
import actions from './actions';

const initState = new Map({
    loading: false,
	sidebar: false,
	imagesSidebar: false,
	recipesSidebar: false,
	variations: [],
	variationImages: [],
	selectedVariation: {},
	imagesRequestDone: false,
	pageParams: {
		page: 1,
		pageSize: 4,
		total: 0,
		search: '',
		sortDir: 'asc',
		sortField: 'name',
	}
});

export default function variationReducer(state = initState, action) {

    switch (action.type) {

		case actions.SET_SIDEBAR:
			return state
				.set(action.sidebar, action.boolean);

		case actions.SET_PAGE_PARAMS:
            return state
                .set('pageParams', {
                	...state.get('pageParams'),
                	...action.params
				})

		case actions.SELECT_VARIATION:
			return state
				.set(
					'selectedVariation',
					action.variation
				)


		case actions.GET_VARIATIONS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_VARIATIONS_SUCCESS:
            return state
                .set('loading', false)
				.set('variations', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

        case actions.GET_VARIATIONS_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_VARIATION_DETAILS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_VARIATION_DETAILS_SUCCESS:
            return state
                .set('loading', false)
				.set('selectedVariation', action.payload)

        case actions.GET_VARIATION_DETAILS_FAILURE:
            return state
                .set('loading', false)

        case actions.CREATE_VARIATIONS_REQUEST:
            return state
                .set('loading', true);

        case actions.CREATE_VARIATIONS_SUCCESS:
            return state
                .set('loading', false)

        case actions.CREATE_VARIATIONS_FAILURE:
            return state
                .set('loading', false)

        case actions.UPDATE_VARIATIONS_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_VARIATIONS_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_VARIATIONS_FAILURE:
            return state
                .set('loading', false)

		case actions.DELETE_VARIATIONS_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_VARIATIONS_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_VARIATIONS_FAILURE:
			return state
				.set('loading', false)

////////////////////////////////////////////////////////////////////
//////////////// Variation recipes
////////////////////////////////////////////////////////////////////

		case actions.CREATE_VARIATIONS_RECIPE_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_VARIATIONS_RECIPE_SUCCESS:
			return state
				.set('loading', false)

		case actions.CREATE_VARIATIONS_RECIPE_FAILURE:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIATIONS_RECIPE_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_VARIATIONS_RECIPE_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIATIONS_RECIPE_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_VARIATIONS_RECIPE_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_VARIATIONS_RECIPE_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_VARIATIONS_RECIPE_FAILURE:
			return state
				.set('loading', false)

////////////////////////////////////////////////////////////////////
//////////////// Variation images
////////////////////////////////////////////////////////////////////

		case actions.ADD_VARIATIONS_IMAGE_REQUEST:
			return state
				.set('loading', true);

		case actions.ADD_VARIATIONS_IMAGE_SUCCESS:
			return state
				.set('loading', false)

		case actions.ADD_VARIATIONS_IMAGE_FAILURE:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIATIONS_IMAGE_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_VARIATIONS_IMAGE_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_VARIATIONS_IMAGE_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_VARIATIONS_IMAGE_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_VARIATIONS_IMAGE_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_VARIATIONS_IMAGE_FAILURE:
			return state
				.set('loading', false)

		case actions.GET_VARIATIONS_IMAGES_REQUEST:
			return state
				.set('loading', true)
				.set('imagesRequestDone', false)

		case actions.GET_VARIATIONS_IMAGES_SUCCESS:
			return state
				.set('loading', false)
				.set('imagesRequestDone', true)
				.set('variationImages', action.payload.map(image => image.name === 'blob'
					?
					{...image, name: 'New picture', description: 'Add your description'}
					:
					image
				))

		case actions.GET_VARIATIONS_IMAGES_FAILURE:
			return state
				.set('loading', false)
				.set('imagesRequestDone', true)


		default:
            return state;
    }
}
