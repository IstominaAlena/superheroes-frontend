import { Formik } from "formik";

import { IUpdateSuperhero } from "../../redux/superheroes/typings";
import { ButtonTypes } from "../../constants/frontenConstants";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { useAppSelector } from "../../utils/useAppSelector";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";
import { updateSuperheroInfo } from "../../redux/superheroes/superheroesOperations";
import { ErrorAEditSuperheroSchema } from "../../utils/validationSchemas";

import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";

import styles from "../../reusable/styles/SuperheroForm.module.scss";

interface IProps {
	onCloseModal: () => void;
};

export const EditSuperheroForm = ({ onCloseModal }: IProps) => {
	const dispatch = useAppDispatch();

	const superhero = useAppSelector(selectCurrentSuperheroes);

	const initialValues: IUpdateSuperhero = {
		nickname: superhero?.nickname ?? "",
		real_name: superhero?.real_name ?? "",
		origin_description: superhero?.origin_description ?? "",
		superpowers: superhero?.superpowers ?? "",
		catch_phrase: superhero?.catch_phrase ?? "",
	};

	return (
		<div>
			<h3 className={styles.formTitle}>Edit superhero</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={ErrorAEditSuperheroSchema}
				onSubmit={(values) => {
					dispatch(updateSuperheroInfo({ id: superhero?._id ?? "", updateBody: values }));
					onCloseModal();
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit} className={styles.form}>
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
