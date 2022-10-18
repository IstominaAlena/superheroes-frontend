import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../utils/axiosInstance";
import { EPath, SUPERHEROES_PER_PAGE } from "../../constants/apiConstants";
import {
	IAddSuperheroBody,
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
				const { data } = await instance.get<IGetAllSuperheroesResponce>(EPath.SUPERHEROES, {
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

export const addSuperhero = createAsyncThunk<ISuperheroItem | undefined, IAddSuperheroBody>(
	"superheroes/addSuperhero",
	async (superhero) => {		
		try {
			// TODO
			const formData = new FormData();
			for (let hero in superhero) {
				const item = superhero[hero as keyof IAddSuperheroBody];
				Array.isArray(item)
					? (item as Array<File>).forEach((el: File) => formData.append(hero, el))
				 	: formData.append(hero, item)
			}

			const { data } = await instance.post<ISuperheroItem>(EPath.SUPERHEROES, formData);
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
				const { data } = await instance.put<ISuperheroItem>(EPath.SUPERHEROES + "/" + id, updateBody);
				return data;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(error.message);
				};
			}
		}
	);

// export const updateSuperheroImage = createAsyncThunk(
// 	"superheroes/updateSuperheroImage",
// 	async() => {
		 
// 	 }
// );
	
