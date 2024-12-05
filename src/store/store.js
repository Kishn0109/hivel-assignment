import { configureStore } from "@reduxjs/toolkit";
import { citiesApi } from "../services/citiesApi";

export const store = configureStore({
	reducer: {
		[citiesApi.reducerPath]: citiesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(citiesApi.middleware),
});
