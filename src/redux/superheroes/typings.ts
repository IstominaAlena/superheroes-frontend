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

export interface ISuperheroItem extends IAddSuperheroBody {
	_id: string,
};

export interface IGetAllSuperheroesBody {
	page: number,
	nickname: string,
};

export interface IAddSuperheroBody extends IUpdateSuperhero {
	images?: Array<any>,
};

export interface IUpdateSuperheroBody {
	id: string,
	updateBody: IUpdateSuperhero;
};

export interface IUpdateSuperhero {
	nickname: string,
	real_name: string,
	origin_description: string,
	superpowers: string,
	catch_phrase: string,
};
