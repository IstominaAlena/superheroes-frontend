import { useState } from "react";
import { useNavigate } from "react-router";

import { deleteSuperhero } from "../../redux/superheroes/superheroesOperations";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";
import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";
import { Modal } from "../../reusable/components/Modal";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { useAppSelector } from "../../utils/useAppSelector";
import { EditSuperheroForm } from "../EditSuperheroForm";

import styles from "./EditSuperheroButtons.module.scss";

export const EditSuperheroButtons = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const onClickEditButton = () => {
		setIsModalOpen(true);
	};

	const onClickDeleteButton = () => {
		navigate("/");
		dispatch(deleteSuperhero(currentSuperhero?._id ?? ""));
	};

	return (
		<>
			<div className={styles.editContainer}>
				<Button className={styles.editButton} onClick={onClickEditButton}>
					<GetIcon name="edit" width={15} height={15} className={styles.icon} />
				</Button>
				<Button className={styles.editButton} onClick={onClickDeleteButton}>
					<GetIcon name="trash" width={15} height={15} className={styles.icon} />
				</Button>
			</div>

			{isModalOpen && (
				<Modal onClose={onCloseModal}>
					<EditSuperheroForm onCloseModal={onCloseModal} />
				</Modal>
			)}
		</>
	);
};
