import { ActionTypes } from "../Constants";

export function LatestAction(songs) {
	return {
		type: ActionTypes.LATEST,
		payload: songs,
	};
}

export function FeaturedAction(song) {
	return {
		type: ActionTypes.FEATURED,
		payload: song,
	};
}

export function TopAction(songs) {
	return {
		type: ActionTypes.TOP,
		payload: songs,
	};
}

export function Top_ArtistsAction(artists) {
	return {
		type: ActionTypes.TOP_ARTISTS,
		payload: artists,
	};
}

export function ArtistsAction(artists) {
	return {
		type: ActionTypes.ARTISTS,
		payload: artists,
	};
}

export function RefinedArtistsAction(artists) {
	return {
		type: ActionTypes.REFINED,
		payload: artists,
	};
}
