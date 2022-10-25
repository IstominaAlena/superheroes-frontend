export enum ButtonTypes {
	BUTTON = "button",
	SUBMIT = "submit",
	RESET = "reset",
};

export enum EFormState {
	ADD_SUPERHERO = "addSuperhero",
	EDIT_SUPERHERO = "editSuperhero"
};

interface IErrorMessage {
	[name: string]: string;
};

export const errorMessage: IErrorMessage = {
	name: "* The field must contain from 2 to 15 characters.",
	email: "* Invalid email address.",
	password:
		"* At least 6 characters, one uppercase and one number character.",
	samePassword: "* This field should match to the previous one.",
	required: "* The field is required."
};

export const accentColor = "rgb(97, 149, 237)";

export const imagePlaceholder = "https://via.placeholder.com/150x200.png?text=No+image";

export const FILE_SIZE = 160 * 1024;

export const SUPPORTED_FORMATS = [
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/png"
];
