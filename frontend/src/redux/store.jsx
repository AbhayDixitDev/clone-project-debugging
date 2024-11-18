import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import playlistReducer from "./playListSlice"; 
import audioPlayerReducer from "./audioPlayer"; 
import userReducer from "./userSlice"; 

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "audioPlayer"],
};

const rootReducer = (state = {}, action) => { // Initialize state to an empty object
	return {
		auth: authReducer(state.auth, action),
		playlists: playlistReducer(state.playlists, action),
		audioPlayer: audioPlayerReducer(state.audioPlayer, action),
		user: userReducer(state.user, action),
	};
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export default store;
