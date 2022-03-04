import { ActionTypes } from "../Constants";

let initialState = {
	song: {},
};

export function PlayReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ActionTypes.PLAY:
			return {
				...state,
				song: payload,
			};

		default:
			return state;
	}
}
