import { useState } from "react";

import { SuperheroesGallery } from "../../components/SuperheroesGallery";
import { SearchForm } from "../../components/SearchForm";
import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";
import { Modal } from "../../reusable/components/Modal";
import { AddSuperheroForm } from "../../components/AddSuperheroForm";

import styles from "./Home.module.scss";

export const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onAddButton = () => {
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className={styles.toolbarContainer}>
				<SearchForm />
				<Button className={styles.addButton} onClick={onAddButton}>
					<GetIcon name="add" width={10} height={10} className={styles.icon} />
					<span>Add superhero</span>
				</Button>
			</div>
			<SuperheroesGallery />

			{isModalOpen && (
				<Modal onClose={onCloseModal}>
					<AddSuperheroForm onCloseModal={onCloseModal} />
				</Modal>
			)}
		</>
	);
};
