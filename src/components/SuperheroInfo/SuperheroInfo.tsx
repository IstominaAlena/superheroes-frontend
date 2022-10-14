import classnames from "classnames";

import { useAppSelector } from "../../utils/useAppSelector";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";

import styles from "./SuperheroInfo.module.scss";

export const SuperheroInfo = () => {
	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	return (
		<div className={styles.superheroInfo}>
			<h1 className={styles.nickname}>{currentSuperhero?.nickname}</h1>
			<p className={styles.info}>
				<span>Real name:</span>
				{currentSuperhero?.real_name}
			</p>
			<p className={styles.info}>
				<span>Catchphrase:</span>
				{currentSuperhero?.catch_phrase}
			</p>
			<p className={styles.info}>
				<span>Description:</span>
				{currentSuperhero?.origin_description}
			</p>
			<p className={classnames(styles.info, styles.superpowers)}>
				<span>Superpowers:</span>
				{currentSuperhero?.superpowers}
			</p>
		</div>
	);
};
