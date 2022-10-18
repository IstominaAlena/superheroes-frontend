import { useAppSelector } from "../../utils/useAppSelector";
import { selectCurrentSuperheroes } from "../../redux/superheroes/superheroesSelectors";
import { BASE_URL } from "../../constants/apiConstants";

import { ButtonTypes } from "../../constants/frontenConstants";
import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";

import styles from "./ImageGallery.module.scss";

export const ImageGallery = () => {
	const currentSuperhero = useAppSelector(selectCurrentSuperheroes);

	// TODO
	const renderGalleryItem = (item: File) => {
		const urlCreator = window.URL || window.webkitURL;
   	const imageUrl = urlCreator.createObjectURL(item);
		return (
			<li className={styles.galleryItem} key={imageUrl}>
				<img
					src={imageUrl}
					alt={currentSuperhero?.nickname}
					width={200}
					className={styles.image}
				/>
			</li>
		);
	};


	return (
		<div className={styles.galleryContainer}>
			<h2 className={styles.title}>Image gallery</h2>
			<ul className={styles.galleryList}>
				{currentSuperhero?.images.map(renderGalleryItem)}
			</ul>

			{/* <form
				id="image-add-form"
				encType="multipart/form-data"
				onSubmit={() => console.log("test")}
			>
				<input type="file" name="image" multiple />
				<Button className={styles.editButton} type={ButtonTypes.SUBMIT}>
					<GetIcon name="add" width={10} height={10} className={styles.icon} />
					<span>Add image</span>
				</Button>

				<label htmlFor="add-image" >
					<GetIcon name="add" width={10} height={10} className={styles.icon} />
					<span>Add image</span>
				</label>
				<input id="add-image" type="file" name="image" style={{ display: "none" }} multiple />
			</form> */}

		</div>
	);
};
