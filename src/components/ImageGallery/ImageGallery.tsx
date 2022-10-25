import { useState } from "react";

import { useAppSelector } from "../../utils/useAppSelector";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";
import { BASE_URL } from "../../constants/apiConstants";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { deleteSuperheroImage } from "../../redux/superheroes/superheroesOperations";

import { Modal } from "../../reusable/components/Modal";
import { ImageModal } from "../ImageModal";
import { GetIcon } from "../../reusable/components/GetIcon";
import { Button } from "../../reusable/components/Button";

import styles from "./ImageGallery.module.scss";

export const ImageGallery = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageIdx, setImageIdx] = useState<number>(0);

	const dispatch = useAppDispatch();

	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	const renderGalleryItem = (item: string, idx: number) => {
		const imageUrl = BASE_URL + item;
		return (
			<li className={styles.galleryItem} key={item} onClick={onOpenModal(idx)}>
				<img
					src={imageUrl}
					alt={currentSuperhero?.nickname}
					width={200}
					className={styles.image}
				/>
				<Button className={styles.deleteImageButton} onClick={onDeletImageButton(item)}>
					<GetIcon name="trash" width={15} height={15} className={styles.icon} />
				</Button>
			</li>
		);
	};

	const onOpenModal = (idx: number) => () => {
		setIsModalOpen(true);
		setImageIdx(idx);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};


	const onDeletImageButton = (image: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(deleteSuperheroImage({ id: currentSuperhero?._id ?? "", image }));
	};

	return (
		<>
			<div className={styles.galleryContainer}>
				<h2 className={styles.title}>Image gallery</h2>
				<ul className={styles.galleryList}>
					{currentSuperhero?.images.map(renderGalleryItem)}
				</ul>
			</div>

			{isModalOpen && (
				<Modal onClose={onCloseModal}>
					<ImageModal idx={imageIdx} setIdx={setImageIdx} />
				</Modal>
			)}
		</>
	);
};
