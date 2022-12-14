export interface ISuperheroesSlice {
	superheroesList: ISuperheroes,
};

export interface ISuperheroes {
	superheroes: Array<ISuperheroItem>,
	page: number,
	amount: number;
	currentSuperhero: ISuperheroItem | null,
	isLoading: boolean,
	error: string | null,
};

export interface IGetAllSuperheroesResponce {
	superheroes: Array<ISuperheroItem>,
	amount: number,
};

export interface ISuperheroItem {
	_id: string,
	nickname: string,
	real_name: string,
	origin_description: string,
	superpowers: string,
	catch_phrase: string,
	images: Array<string>,
};

export interface IGetAllSuperheroesBody {
	page: number,
	nickname: string,
};

export interface IAddSuperheroBody extends IUpdateSuperhero {
	images: Array<File>,
};

export interface IUpdateSuperheroBody {
	id: string,
	updateBody: IUpdateSuperhero,
};

export interface IUpdateSuperhero {
	nickname: string,
	real_name: string,
	origin_description: string,
	superpowers: string,
	catch_phrase: string,
};

export interface IDeleteSuperheroImageBody {
	id: string,
	image: string,
};

export interface IAddImageBody {
	imageData: FormData,
	id: string;
};

export interface IAddImage {
	images: Array<File>,
};
