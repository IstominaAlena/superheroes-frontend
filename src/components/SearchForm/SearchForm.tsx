import { Formik } from "formik";

import { ButtonTypes } from "../../constants/frontenConstants";
import { getAllSuperheroes } from "../../redux/superheroes/superheroesOperations";
import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";
import { GetIcon } from "../../reusable/components/GetIcon";
import { useAppDispatch } from "../../utils/useAppDispatch";

import styles from "./SearchForm.module.scss";

interface ISearchValues {
	nickname: string;
};

const initialValues: ISearchValues = {
	nickname: ""
};

export const SearchForm = () => {
	const dispatch = useAppDispatch();

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={({ nickname }) => {
				dispatch(getAllSuperheroes({ page: 1, nickname }));
			}}
		>
			{props => (
				<form onSubmit={props.handleSubmit} className={styles.searchForm}>
					<Button
						type={ButtonTypes.SUBMIT}
						className={styles.searchButton}
					>
						<GetIcon name="search" width={15} height={15} className={styles.icon} />
					</Button>
					<FormikInput
						type="text"
						onChange={props.handleChange}
						value={props.values.nickname}
						name="nickname"
						error={props.errors.nickname}
						placeholder="Search"
						className={styles.searchInput}
					/>
				</form>
			)}
		</Formik>
	);
};
