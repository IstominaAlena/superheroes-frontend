import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { useAppSelector } from "../../utils/useAppSelector";
import {
	selectCurrentSuperheroes,
	selectSuperheroesError,
	selectSuperheroesIsLoading,
} from "../../redux/superheroes/superheroesSelectors";
import { BASE_URL } from "../../constants/apiConstants";
import { imagePlaceholder } from "../../constants/frontenConstants";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { getSuperheroById } from "../../redux/superheroes/superheroesOperations";

import { QueryWrapper } from "../../reusable/components/QueryWrapper";
import { SectionWrapper } from "../../reusable/components/SectionWrapper";
import { SuperheroInfo } from "../../components/SuperheroInfo";
import { EditSuperheroButtons } from "../../components/EditSuperheroButtons";
import { ImageGallery } from "../../components/ImageGallery";
import { AddImageForm } from "../../components/AddImageForm";

import styles from "./Superhero.module.scss";

export const Superhero = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(() => {
		const id = location.pathname.slice(1);
		dispatch(getSuperheroById(id));
	}, []);

	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);
	const isLoading = useAppSelector(selectSuperheroesIsLoading);
	const error = useAppSelector(selectSuperheroesError);

	const mainImage = currentSuperhero?.images?.length
		? BASE_URL + currentSuperhero?.images[0]
		: imagePlaceholder;

	return (
		<SectionWrapper >
			<QueryWrapper loading={isLoading} data={currentSuperhero} error={error}>
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
				<AddImageForm />

				{currentSuperhero?.images && currentSuperhero?.images?.length > 0 && (
					<ImageGallery />
				)}
			</QueryWrapper>
		</SectionWrapper>
	);
};
