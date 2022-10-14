import classnames from "classnames";

import styles from "./SectionWrapper.module.scss";

interface IProps {
	className?: string,
	children: React.ReactNode,
};

export const SectionWrapper = ({ className, children }: IProps) => (
	<section className={classnames(styles.contentSection, className)}>
		<div className={styles.contentContainer}>
			{children}
		</div>
	</section>
); 
