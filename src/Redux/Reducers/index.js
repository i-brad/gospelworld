import { combineReducers } from "redux";
import { signReducer } from "./Auth";
import {
	latestReducer,
	featuredReducer,
	topReducer,
	artistsReducer,
} from "./LFT";
import { SongsReducer } from "./SongsReducer";
import { PlayReducer } from "./PlayReducer";
import { SelectedReducer } from "./SelectedReducer";
import { SearchReducer } from "./SearchReducer";

const rootReducer = combineReducers({
	signReducer,
	latest: latestReducer,
	featured: featuredReducer,
	top: topReducer,
	artists: artistsReducer,
	songs: SongsReducer,
	play: PlayReducer,
	selected: SelectedReducer,
	search: SearchReducer,
});

export default rootReducer;
