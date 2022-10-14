import { ISuperheroesSlice } from "./typings";

export const selectAllSuperheroes = (state: ISuperheroesSlice) => state.superheroesList.superheroes;
export const selectSuperheroesIsLoading = (
	state: ISuperheroesSlice
) => state.superheroesList.isLoading;
export const selectSuperheroesError = (state: ISuperheroesSlice) => state.superheroesList.error;
export const selectCurrentSuperheroes = (
	state: ISuperheroesSlice
) => state.superheroesList.currentSuperhero;
export const selectPage = (state: ISuperheroesSlice) => state.superheroesList.page;
export const selectSuperheroesAmount = (state: ISuperheroesSlice) => state.superheroesList.amount;
