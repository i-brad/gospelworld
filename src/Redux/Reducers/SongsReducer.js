import { ActionTypes } from "../Constants";

let initialstate = {
  songs: [],
};

export function SongsReducer(state = initialstate, { type, payload }) {
  switch (type) {
    case ActionTypes.SONGS:
      return {
        ...state,
        songs: payload,
      };

    default:
      return state;
  }
}
