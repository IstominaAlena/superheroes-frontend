import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../utils/useAppDispatch";
import { selectAllSuperheroes, selectPage } from "../../redux/superheroes/superheroesSelectors";
import { useAppSelector } from "../../utils/useAppSelector";
import { ISuperheroItem } from "../../redux/superheroes/typings";
import { BASE_URL } from "../../constants/apiConstants";
import { getAllSuperheroes, getSuperheroById } from "../../redux/superheroes/superheroesOperations";
import { imagePlaceholder } from "../../constants/frontenConstants";

import { SectionWrapper } from "../../reusable/components/SectionWrapper";
import { PaginationButtons } from "../PaginationButtons";

import styles from "./SuperheroesGallery.module.scss";

export const SuperheroesGallery = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const superheroes = useAppSelector(selectAllSuperheroes);
	const currentPage = useAppSelector(selectPage);

	useEffect(() => {
		dispatch(getAllSuperheroes({ page: currentPage, nickname: "" }));
	}, [currentPage]);

	const renderSuperheroesCard = (item: ISuperheroItem) => {
		const imageUrl = item?.images && item.images.length > 0
			? BASE_URL + item.images[0]
			: imagePlaceholder;

		return (
			<li key={item._id} className={styles.superheroItem} onClick={onClickSuperhero(item._id)}>
				<img src={imageUrl} alt={item.nickname} className={styles.image} />
				<h2 className={styles.nickname}>{item.nickname}</h2>
			</li>
		);
	};

	const onClickSuperhero = (id: string) => () => {
		dispatch(getSuperheroById(id));
		navigate(`/${id}`);
	};



	return (
		<SectionWrapper className={styles.gallerySection}>
			<ul className={styles.superheroesList}>
				{superheroes.map(renderSuperheroesCard)}
			</ul>
			<PaginationButtons />
		</SectionWrapper>
	);
};
