import * as React from "react";
import { style } from "typestyle";
import { CircularProgress } from "@material-ui/core";
import { COLORS } from "../constants/Style";

interface IProps extends React.ClassAttributes<HTMLDivElement> {
}

interface IState extends React.ComponentState {
}

const styles = {
	root: style({
		width: "100vw",
		height: "100vh",
		position: "fixed",
		top: 0,
		left: 0,
		zIndex: 99,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.ClarityBlack,
	}),
};

export class Kurukuru extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		return (
			<div className={styles.root}>
				<CircularProgress size={250}/>
			</div>
		);
	}
}
