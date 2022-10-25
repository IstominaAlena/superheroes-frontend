import { configureStore, PreloadedState, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { superheroesReducer } from "./superheroes/superheroesSlice";

const superheroesPersistConfig = {
	key: "superheroes",
	storage,
	whitelist: ["page"]
};

const superheroesPersistReducer = persistReducer(superheroesPersistConfig, superheroesReducer);

const rootReducer = combineReducers({
	superheroesList: superheroesPersistReducer,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore(
	{
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
		devTools: process.env.NODE_ENV === "development",
		preloadedState
	}
);

export const store = setupStore();
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
