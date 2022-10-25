import { BASE_URL } from "../../constants/apiConstants";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";

import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";
import { useAppSelector } from "../../utils/useAppSelector";

import styles from "./ImageModal.module.scss";

interface IProps {
	idx: number,
	setIdx: (idx: number) => void;
};

export const ImageModal = ({ idx, setIdx }: IProps) => {

	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	const onPrevImage = () => {
		if (idx > 0) {
			setIdx(idx - 1);
		};
	};

	const onNextImage = () => {
		if (currentSuperhero && idx < currentSuperhero?.images.length - 1) {
			setIdx(idx + 1);
		};
	};
	return (
		<div className={styles.imageContainer}>
			<img
				src={BASE_URL + currentSuperhero?.images[idx]}
				alt={currentSuperhero?.nickname}
				width={500}
				className={styles.fullImage}
			/>
			<div className={styles.paginationContainer}>
				<Button className={styles.paginationButton} onClick={onPrevImage}>
					<GetIcon name="arrow-left" width={20} height={20} className={styles.icon} />
				</Button>
				<Button className={styles.paginationButton} onClick={onNextImage}>
					<GetIcon name="arrow-right" width={20} height={20} className={styles.icon} />
				</Button>
			</div>
		</div>
	);
};
