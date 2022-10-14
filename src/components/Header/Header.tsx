import { useEffect, useRef } from "react";

import { useAppSelector } from "../../utils/useAppSelector";
import { selectPage } from "../../redux/superheroes/superheroesSelectors";

import { SectionWrapper } from "../../reusable/components/SectionWrapper";

import styles from "./Header.module.scss";

export const Header = () => {
	const currentPage = useAppSelector(selectPage);

	const listStartRef = useRef<null | HTMLDivElement>(null);

	const scrollToStart = () => {
		listStartRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToStart();
	}, [currentPage]);

	return (
		<SectionWrapper className={styles.headerSection}>
			<div ref={listStartRef}></div>
			<header className={styles.headerContainer}>
				<a href="/" className={styles.logoLink}>
					Superheroes
				</a>
			</header>
		</SectionWrapper>
	);
};
