import * as Yup from "yup";

import { FILE_SIZE, SUPPORTED_FORMATS } from "../constants/frontenConstants";

const errorMessage = {
	required: "* The field is required",
	field: {
		min: "* The field should contain at least 2 characters.",
		max: "* The field should contain less than 15 characters."
	},
	origin_description: "* Character limit exceeded",
	uploadedFile: {
		tooLarge: "* Uploaded file is too big.",
		format: "* Uploaded file has unsupported format.",
		amount: "* Maximum number of uploaded files 10"
	}
};

export const ErrorAddSuperheroSchema = Yup.object().shape({
	nickname: Yup.string()
		.trim()
		.min(2, errorMessage.field.min)
		.max(15, errorMessage.field.max)
		.required(errorMessage.required),
	real_name: Yup.string(),
	origin_description: Yup.string()
		.trim()
		.max(500, errorMessage.origin_description)
		.required(errorMessage.required),
	superpowers: Yup.string()
		.trim()
		.min(2, errorMessage.field.min)
		.max(15, errorMessage.field.max)
		.required(errorMessage.required),
	catch_phrase: Yup.string()
		.trim()
		.required(errorMessage.required),
	images: Yup.array().of(Yup.mixed()
		.nullable()
		.notRequired()
		.test("FILE_SIZE", errorMessage.uploadedFile.tooLarge,
			value => !value || (value && value.size <= FILE_SIZE))
		.test("FILE_FORMAT", errorMessage.uploadedFile.format,
			value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
	)
		.test("FILE_AMOUNT", errorMessage.uploadedFile.amount,
			(values) => !values || (values && values.length > 10 ? false : true)
		),
});

export const ErrorAEditSuperheroSchema = Yup.object().shape({
	nickname: Yup.string()
		.trim()
		.min(2, errorMessage.field.min)
		.max(15, errorMessage.field.max)
		.required(errorMessage.required),
	real_name: Yup.string().trim(),
	origin_description: Yup.string()
		.trim()
		.max(500, errorMessage.origin_description)
		.required(errorMessage.required),
	superpowers: Yup.string()
		.trim()
		.min(2, errorMessage.field.min)
		.max(15, errorMessage.field.max)
		.required(errorMessage.required),
	catch_phrase: Yup.string()
		.trim()
		.required(errorMessage.required),
});

export const ErrorAddImageSchema = Yup.object().shape({
	images: Yup.array().of(Yup.mixed()
		.nullable()
		.notRequired()
		.test("FILE_SIZE", errorMessage.uploadedFile.tooLarge,
			(value) => !value || (value && value.size <= FILE_SIZE)
		)
		.test("FILE_FORMAT", errorMessage.uploadedFile.format,
			(value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
		)
	)
		.test("FILE_AMOUNT", errorMessage.uploadedFile.amount,
			(values) => !values || (values && values.length > 10 ? false : true)
		)
});
