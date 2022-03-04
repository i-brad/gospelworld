import { ActionTypes } from "../Constants";

export function signInAction(user) {
	return {
		type: ActionTypes.SIGNIN,
		payload: user,
		isLogged: true,
	};
}

export function signOutAction(user = []) {
	return {
		type: ActionTypes.SIGNOUT,
		payload: user,
		isLogged: false,
	};
}
