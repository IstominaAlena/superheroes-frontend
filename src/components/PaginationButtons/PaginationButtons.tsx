import { useAppDispatch } from "../../utils/useAppDispatch";
import { useAppSelector } from "../../utils/useAppSelector";
import { selectPage, selectSuperheroesAmount } from "../../redux/superheroes/superheroesSelectors";
import { setPage } from "../../redux/superheroes/superheroesSlice";

import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";

import styles from "./PaginationButtons.module.scss";
import { SUPERHEROES_PER_PAGE } from "../../constants/apiConstants";

export const PaginationButtons = () => {
	const dispatch = useAppDispatch();

	const currentPage = useAppSelector(selectPage);
	const superheroesAmount = useAppSelector(selectSuperheroesAmount);
	const allPages = Math.ceil(superheroesAmount / SUPERHEROES_PER_PAGE);

	const incrementPage = () => {
		dispatch(setPage(currentPage + 1));
	};

	const decrementPage = () => {
		dispatch(setPage(currentPage - 1));
	};

	return (
		<div className={styles.paginationContainer}>
			{currentPage > 1 && (
				<Button className={styles.paginationButton} onClick={decrementPage}>
					<GetIcon name="arrow-left" width={20} height={20} className={styles.icon} />
				</Button>
			)}
			{currentPage < allPages && (
				<Button className={styles.paginationButton} onClick={incrementPage}>
					<GetIcon name="arrow-right" width={20} height={20} className={styles.icon} />
				</Button>
			)}
		</div>
	);
};
