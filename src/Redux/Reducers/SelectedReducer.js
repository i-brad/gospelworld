import { ActionTypes } from "../Constants";

let initialState = {
	selectedItems: [],
};

export function SelectedReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ActionTypes.SELECTED:
			return {
				...state,
				selectedItems: [...state.selectedItems, payload],
			};
		case ActionTypes.REMOVE_SELECTED:
			let items = [];
			state.selectedItems.map((item) => {
				if (item.id !== payload.id) {
					return items.push(item);
				}
				return item;
			});

			return {
				...state,
				selectedItems: [...items],
			};
		case ActionTypes.CLEAR_SELECTED:
			return {
				...state,
				selectedItems: [],
			};
		default:
			return state;
	}
}
