import { useAppSelector } from "../../utils/useAppSelector";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";

import { SectionWrapper } from "../../reusable/components/SectionWrapper";
import { SuperheroInfo } from "../../components/SuperheroInfo";
import { EditSuperheroButtons } from "../../components/EditSuperheroButtons";
import { ImageGallery } from "../../components/ImageGallery";
import { imagePlaceholder } from "../../constants/frontenConstants";
import { BASE_URL } from "../../constants/apiConstants";

import styles from "./Superhero.module.scss";

export const Superhero = () => {
	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	const mainImage = currentSuperhero?.images
		? BASE_URL + currentSuperhero?.images[0]
		: imagePlaceholder;

	return (
		<SectionWrapper >
			<div className={styles.container}>
				<img
					src={mainImage}
					alt={currentSuperhero?.nickname}
					width={500}
					className={styles.image}
				/>
				<SuperheroInfo />
				<EditSuperheroButtons />
			</div>
			{currentSuperhero?.images && currentSuperhero?.images?.length > 0 && (
				<ImageGallery />
			)}
		</SectionWrapper>
	);
};
