import { ActionTypes } from "../Constants";

let initialState = {
	latest: [],
};

export function latestReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ActionTypes.LATEST:
			return { ...state, latest: payload };
		default:
			return state;
	}
}

let initialF = {
	featured: {},
};

export function featuredReducer(state = initialF, { type, payload }) {
	switch (type) {
		case ActionTypes.FEATURED:
			return { ...state, featured: payload };
		default:
			return state;
	}
}

let initialT = {
	topSongs: [],
};

export function topReducer(state = initialT, { type, payload }) {
	switch (type) {
		case ActionTypes.TOP:
			return { ...state, topSongs: payload };
		default:
			return state;
	}
}

let initialA = {
	topArtists: {},
	artists: [],
	refined: [],
};

export function artistsReducer(state = initialA, { type, payload }) {
	switch (type) {
		case ActionTypes.TOP_ARTISTS:
			return { ...state, topArtists: payload };
		case ActionTypes.ARTISTS:
			return { ...state, artists: payload };
		case ActionTypes.REFINED:
			return {
				...state,
				refined: payload,
			};
		default:
			return state;
	}
}
