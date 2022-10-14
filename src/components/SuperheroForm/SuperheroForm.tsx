import { Formik } from "formik";

import { useAppDispatch } from "../../utils/useAppDispatch";
import { addSuperhero } from "../../redux/superheroes/superheroesOperations";

import { ButtonTypes, EFormState } from "../../constants/frontenConstants";
import { IAddSuperheroBody } from "../../redux/superheroes/typings";
import { FormikInput } from "../../reusable/components/FormikInput";
import { Button } from "../../reusable/components/Button";

import styles from "./SuperheroForm.module.scss";

interface IProps {
	onCloseModal: () => void;
	formState: EFormState;
};

const initialValues: IAddSuperheroBody = {
	nickname: "",
	real_name: "",
	origin_description: "",
	superpowers: "",
	catch_phrase: "",
	images: []
};

export const SuperheroForm = ({ onCloseModal, formState }: IProps) => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<h3 className={styles.formTitle}>Add superhero</h3>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, { resetForm }) => {
					// dispatch(addSuperhero(values));
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
						<input
							id="file"
							name="images"
							type="file"
							onChange={(event) => {
								props.setFieldValue("images", event.currentTarget.files ?? []);
							}}
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
