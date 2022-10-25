import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../utils/axiosInstance";
import { EPath, SUPERHEROES_PER_PAGE } from "../../constants/apiConstants";
import {
	IAddImageBody,
	IDeleteSuperheroImageBody,
	IGetAllSuperheroesBody,
	IGetAllSuperheroesResponce,
	ISuperheroItem,
	IUpdateSuperheroBody,
} from "./typings";

export const getAllSuperheroes = createAsyncThunk
	<IGetAllSuperheroesResponce | undefined, IGetAllSuperheroesBody>
	("superheroes/getAllSuperheroes",
		async ({ page, nickname }) => {
			try {
				const { data } = await instance.get<IGetAllSuperheroesResponce>(
					EPath.SUPERHEROES, {
					params: {
						limit: SUPERHEROES_PER_PAGE,
						page,
						nickname
					}
				});
				return data;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(error.message);
				};
			}
		}
	);

export const getSuperheroById = createAsyncThunk<ISuperheroItem | undefined, string>(
	"superheroes/getSuperheroById",
	async (id) => {
		try {
			const { data } = await instance.get<ISuperheroItem>(EPath.SUPERHEROES + "/" + id);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const addSuperhero = createAsyncThunk<ISuperheroItem | undefined, FormData>(
	"superheroes/addSuperhero",
	async (superhero) => {
		try {
			const { data } = await instance.post<ISuperheroItem>(EPath.SUPERHEROES, superhero);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const deleteSuperhero = createAsyncThunk<string | undefined, string>(
	"superheroes/deleteSuperhero",
	async (id) => {
		try {
			await instance.delete(EPath.SUPERHEROES + "/" + id);
			return id;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const updateSuperheroInfo = createAsyncThunk
	<ISuperheroItem | undefined, IUpdateSuperheroBody>
	("superheroes/updateSuperheroInfo",
		async ({ id, updateBody }) => {
			try {
				const { data } = await instance.put<ISuperheroItem>(
					EPath.SUPERHEROES + "/" + id, updateBody
				);
				return data;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(error.message);
				};
			}
		}
	);

export const deleteSuperheroImage = createAsyncThunk
	<ISuperheroItem | undefined, IDeleteSuperheroImageBody>
	("superheroes/deleteSuperheroImage",
		async ({ id, image }) => {
			try {
				const { data } = await instance.patch<ISuperheroItem>(
					EPath.SUPERHEROES + "/" + id + "/image-to-delete",
					{ image }
				);
				return data;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(error.message);
				};
			}
		}
	);

export const addSuperheroImage = createAsyncThunk
	<ISuperheroItem | undefined, IAddImageBody>
	("superheroes/addSuperheroImage",
		async ({ id, imageData }) => {
			try {
				const { data } = await instance.patch<ISuperheroItem>(
					EPath.SUPERHEROES + "/" + id + "/images",
					imageData
				);
				return data;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(error.message);
				};
			}
		}
	);

