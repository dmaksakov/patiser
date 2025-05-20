import {createSelector} from 'reselect'

const getCurrentRange = state => state.params.range_type;
const getRanges = state => state.quick_ranges;

export const getSelectedRange = createSelector(
	[getCurrentRange, getRanges],
	(currentRange, ranges) => {
		return ranges.hasOwnProperty(currentRange) ? ranges[currentRange] : {};
	}
);

export const getRangeOptions = createSelector(
	[getRanges],
	( ranges) => {
		let options = [];
		Object.keys(ranges).forEach(key => {
			let current = ranges[key];
			options.push({
				"label" :current.label,
				"value" :current.name,
			})
		});
		return options;
	}
);

export const getCurrentOption = createSelector(
	[getRangeOptions, getCurrentRange],
	(options, currentRange) =>{
		let val;
		options.forEach(one =>{
			if(one.value === currentRange){
				val= one;
			}
		});
		return val;
	}
);


