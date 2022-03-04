import { ActionTypes } from "../Constants/";

let initialState = {
	user: {},
	Logged: false,
};

export function signReducer(state = initialState, { type, payload, isLogged }) {
	switch (type) {
		case ActionTypes.SIGNIN:
			return {
				...state,
				user: payload,
				Logged: isLogged,
			};

		case ActionTypes.SIGNOUT:
			return {
				...state,
				user: payload,
				Logged: isLogged,
			};

		default:
			return state;
	}
}
