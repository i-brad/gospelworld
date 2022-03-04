import { createStore } from "redux";
import rootReducer from "./Reducers";

// const initialstate = {
// 	videos: [],
// 	recent: [],
// 	playlists: [],
// 	favourites: [],
// };

const store = createStore(
	rootReducer,
	{},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
