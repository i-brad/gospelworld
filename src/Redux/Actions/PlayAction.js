import { ActionTypes } from "../Constants";

export function PlayAction(song = {}) {
	return {
		type: ActionTypes.PLAY,
		payload: song,
	};
}
