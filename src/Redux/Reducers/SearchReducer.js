import { ActionTypes } from "../Constants";

let initialState = {
	searchData: [[], []],
	term: "",
};

export function SearchReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ActionTypes.SEARCH:
			return {
				...state,
				searchData: payload,
			};
		case ActionTypes.TERM:
			return {
				...state,
				term: payload,
			};
		default:
			return state;
	}
}
