import {Map} from 'immutable';
import actions from './actions';
import React from "react";

const initState = new Map({
    loading: false,
	sidebar: false,
	itemSidebar: false,
	recipes: [],
	selectedRecipe: {},
	recipeItems: [],
	recipeDetails: {},
	selectedRecipeItem: {},
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
						Click on the button to add new recipe
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				hideFooter: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.add-new',
				title: 'Add recipe',
			},
			{
				content: <div>Make sure all the ingredients from the recipe you want to add were already added on the ingredients page.</div>,
				placement: 'left',
				target: '.form-recipe',
				title: 'Fill the form out',
				spotlightPadding: 7,
			},
		],
		steps2: [
			{
				content: (
					<div>
						Click on the recipe name to see the recipe details
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				hideFooter: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.ingredient-name',
				title: 'Recipe details',
			},
		]
	},
});

export default function recipeReducer(state = initState, action) {

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

		case actions.SET_ITEM_SIDEBAR:
			return state
				.set('itemSidebar', action.boolean);

        case actions.GET_RECIPES_REQUEST:
            return state
                .set('loading', true)

        case actions.GET_RECIPES_SUCCESS:
            return state
                .set('loading', false)
				.set('recipes', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

        case actions.GET_RECIPES_FAILURE:
            return state
                .set('loading', false)

        case actions.CREATE_RECIPES_REQUEST:
            return state
                .set('loading', true);

        case actions.CREATE_RECIPES_SUCCESS:
            return state
                .set('loading', false)

        case actions.CREATE_RECIPES_FAILURE:
            return state
                .set('loading', false)

        case actions.UPDATE_RECIPES_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_RECIPES_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_RECIPES_FAILURE:
            return state
                .set('loading', false)

        case actions.GET_RECIPE_DETAILS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_RECIPE_DETAILS_SUCCESS:
            return state
                .set('loading', false)
				.set('recipeDetails', action.payload)

        case actions.GET_RECIPE_DETAILS_FAILURE:
            return state
                .set('loading', false)

        case actions.DELETE_RECIPE_REQUEST:
            return state
                .set('loading', true);

        case actions.DELETE_RECIPE_SUCCESS:
            return state
                .set('loading', false)

        case actions.DELETE_RECIPE_FAILURE:
            return state
                .set('loading', false)

        case actions.SELECT_RECIPE:
            return state
                .set('selectedRecipe', action.recipe)

		case actions.GET_RECIPE_ITEMS_REQUEST:
			return state
				.set('loading', true)

		case actions.GET_RECIPE_ITEMS_SUCCESS:
			return state
				.set('loading', false)
				.set('recipeItems', action.payload)

		case actions.GET_RECIPE_ITEMS_FAILURE:
			return state
				.set('loading', false)

		case actions.CREATE_RECIPE_ITEM_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_RECIPE_ITEM_SUCCESS:
			return state
				.set('loading', false)

		case actions.CREATE_RECIPE_ITEM_FAILURE:
			return state
				.set('loading', false)

		case actions.UPDATE_RECIPE_ITEM_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_RECIPE_ITEM_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_RECIPE_ITEM_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_RECIPE_ITEM_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_RECIPE_ITEM_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_RECIPE_ITEM_FAILURE:
			return state
				.set('loading', false)

		case actions.SELECT_RECIPE_ITEM:
			return state
				.set('selectedRecipeItem', action.item)

		default:
            return state;
    }
}
