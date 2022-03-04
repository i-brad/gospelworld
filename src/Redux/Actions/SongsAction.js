import { ActionTypes } from "../Constants";

export function SongsAction(songs) {
	return {
		type: ActionTypes.SONGS,
		payload: songs,
	};
}
