import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { ISuperheroes } from "./typings";
import {
	getAllSuperheroes,
	getSuperheroById,
	addSuperhero,
	deleteSuperhero,
	updateSuperheroInfo,
	deleteSuperheroImage,
	addSuperheroImage,
} from "./superheroesOperations";

const initialState: ISuperheroes = {
	superheroes: [],
	page: 1,
	amount: 0,
	currentSuperhero: null,
	isLoading: false,
	error: null
};

const superheroSlice = createSlice({
	name: "superheroes",
	initialState,
	reducers: {
		setPage: (state, { payload }: PayloadAction<number>) => ({
			...state,
			page: payload
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(
			getAllSuperheroes.fulfilled,
			(state, { payload }) => {
				state.superheroes = payload?.superheroes ?? initialState.superheroes;
				state.amount = payload?.amount ?? initialState.amount;
				state.isLoading = false;
				state.currentSuperhero = initialState.currentSuperhero;
			}
		);
		builder.addCase(
			getSuperheroById.fulfilled,
			(state, { payload }) => {
				state.currentSuperhero = payload ?? initialState.currentSuperhero;
				state.isLoading = false;
			}
		);
		builder.addCase(
			addSuperhero.fulfilled,
			(state, { payload }) => {
				state.superheroes = payload ? [payload, ...state.superheroes,] : state.superheroes;
				state.isLoading = false;
			}
		);
		builder.addCase(
			deleteSuperhero.fulfilled,
			(state, { payload }) => {
				state.superheroes = state.superheroes.filter((item) => item._id !== payload);
				state.isLoading = false;
				state.currentSuperhero = initialState.currentSuperhero;
			}
		);
		builder.addCase(
			updateSuperheroInfo.fulfilled,
			(state, { payload }) => {
				state.superheroes = state.superheroes.map(
					(item) => item._id === payload?._id ? payload : item
				);
				state.isLoading = false;
				state.currentSuperhero = payload ?? initialState.currentSuperhero;
			}
		);
		builder.addMatcher(
			isAnyOf(
				deleteSuperheroImage.fulfilled,
				addSuperheroImage.fulfilled,
			),
			(state, { payload }) => {
				state.isLoading = false;
				state.currentSuperhero = payload ?? initialState.currentSuperhero;
			}
		);
		builder.addMatcher(
			isAnyOf(
				getAllSuperheroes.pending,
				getSuperheroById.pending,
				addSuperhero.pending,
				deleteSuperhero.pending,
				updateSuperheroInfo.pending,
				deleteSuperheroImage.pending,
				addSuperheroImage.pending,
			),
			(state) => {
				state.isLoading = true;
				state.error = null;
			}
		);
		builder.addMatcher(
			isAnyOf(
				getAllSuperheroes.rejected,
				getSuperheroById.rejected,
				addSuperhero.rejected,
				deleteSuperhero.rejected,
				updateSuperheroInfo.rejected,
				deleteSuperheroImage.rejected,
				addSuperheroImage.rejected,
			),
			(state, { error }) => {
				state.error = error.message ?? initialState.error;
				state.isLoading = false;
			}
		);
	},
});

export const superheroesReducer = superheroSlice.reducer;
export const { setPage } = superheroSlice.actions;
