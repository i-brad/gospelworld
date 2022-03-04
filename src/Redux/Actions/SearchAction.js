import { ActionTypes } from "../Constants";

export function SearchAction(data) {
	return {
		type: ActionTypes.SEARCH,
		payload: data,
	};
}

export function TermAction(term) {
	return {
		type: ActionTypes.TERM,
		payload: term,
	};
}
