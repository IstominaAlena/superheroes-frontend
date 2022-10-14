import classnames from "classnames";
import React from "react";

import { ButtonTypes } from "../../../constants/frontenConstants";

import styles from "./Button.module.scss";

interface IProps {
	children: React.ReactNode,
	type?: ButtonTypes,
	onClick?: () => void,
	className?: string,
};

export const Button = ({ type, onClick, className, children }: IProps) => (
	<button
		onClick={onClick ? onClick : undefined}
		type={type ? type : ButtonTypes.BUTTON}
		className={classnames(styles.defaultButton, className)}
	>
		{children}
	</button>
);
