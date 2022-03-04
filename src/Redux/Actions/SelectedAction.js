import { ActionTypes } from "../Constants";

export function SelectedAction(selected) {
	return {
		type: ActionTypes.SELECTED,
		payload: selected,
	};
}

export function Remove_SelectedAction(unselected) {
	return {
		type: ActionTypes.REMOVE_SELECTED,
		payload: unselected,
	};
}

export function Clear_SelectedAction() {
	return {
		type: ActionTypes.CLEAR_SELECTED,
		payload: [],
	};
}
