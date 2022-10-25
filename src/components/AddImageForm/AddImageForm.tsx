import { Formik } from "formik";

import { ButtonTypes } from "../../constants/frontenConstants";
import { addSuperheroImage } from "../../redux/superheroes/superheroesOperations";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";
import { IAddImage } from "../../redux/superheroes/typings";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { useAppSelector } from "../../utils/useAppSelector";
import { ErrorAddImageSchema } from "../../utils/validationSchemas";

import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";

import styles from "./AddImageForm.module.scss";

const initialValues: IAddImage = {
	images: [],
};

export const AddImageForm = () => {
	const dispatch = useAppDispatch();
	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	return (
		<div className={styles.imagesFormContainer}>
			<Formik
				initialValues={initialValues}
				validationSchema={ErrorAddImageSchema}
				onSubmit={(values) => {
					const formData = new FormData();
					for (let key in values) {
						const item = values[key as keyof IAddImage];
						(item as Array<File>).forEach((el: File) => formData.append(key, el));
					}
					dispatch(addSuperheroImage({ id: currentSuperhero?._id ?? "", imageData: formData }));
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit} className={styles.form} encType="multipart/form-data">
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
							Add image
						</Button>
					</form>
				)}
			</Formik>
		</div >
	);
};
