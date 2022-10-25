import { Formik } from "formik";

import { useAppDispatch } from "../../utils/useAppDispatch";
import { addSuperhero } from "../../redux/superheroes/superheroesOperations";
import { ErrorAddSuperheroSchema } from "../../utils/validationSchemas";
import { IAddSuperheroBody } from "../../redux/superheroes/typings";
import { ButtonTypes } from "../../constants/frontenConstants";

import { FormikInput } from "../../reusable/components/FormikInput";
import { Button } from "../../reusable/components/Button";

import styles from "../../reusable/styles/SuperheroForm.module.scss";

interface IProps {
	onCloseModal: () => void;
};

const initialValues: IAddSuperheroBody = {
	nickname: "",
	real_name: "",
	origin_description: "",
	superpowers: "",
	catch_phrase: "",
	images: [],
};

export const AddSuperheroForm = ({ onCloseModal }: IProps) => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<h3 className={styles.formTitle}>Add superhero</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={ErrorAddSuperheroSchema}
				onSubmit={(values) => {
					const formData = new FormData();
					for (let key in values) {
						const item = values[key as keyof IAddSuperheroBody];
						Array.isArray(item)
							? (item as Array<File>).forEach((el: File) => formData.append(key, el))
							: formData.append(key, item);
					}
					dispatch(addSuperhero(formData));
					onCloseModal();
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit} className={styles.form} encType="multipart/form-data">
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.nickname}
							name="nickname"
							error={props.errors.nickname}
							label="Superhero name:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.real_name}
							name="real_name"
							error={props.errors.real_name}
							label="Real name:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.catch_phrase}
							name="catch_phrase"
							error={props.errors.catch_phrase}
							label="Catchphrase:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.origin_description}
							name="origin_description"
							error={props.errors.origin_description}
							label="Description:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.superpowers}
							name="superpowers"
							error={props.errors.superpowers}
							label="Superpowers:"
						/>
						<FormikInput
							className={styles.uploadInput}
							name="images"
							type="file"
							onChange={event => props.setFieldValue('images', Array.from(event.target.files!))}
							error={props.errors["images"]?.toLocaleString()}
							multiple
						/>
						<Button
							type={ButtonTypes.SUBMIT}
							className={styles.continueButton}
						>
							Create
						</Button>
					</form>
				)}
			</Formik>
		</div >
	);
};
