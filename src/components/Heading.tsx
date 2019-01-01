import * as React from "react";
import { style } from "typestyle/lib";
import { Typography } from "@material-ui/core";
import { COLORS, FONTS } from "../constants/Style";

interface IProps extends React.ClassAttributes<HTMLDivElement> {
	component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	text: string;
	rightComponent?: any;
}

interface IState extends React.ComponentState {
}

const styles = {
	root: style({
		width: "100%",
		marginBottom: "1rem",
	}),
	wrapper: style({
		display: "flex",
		justifyContent: "space-between",
	}),
	typography: style({
		color: COLORS.ClarityBlack,
		fontFamily: FONTS.Default,
	}),
	hr: style({
		height: 0,
		border: 0,
		borderBottom: `solid #dadada 2px`,
		margin: 0,
	}),
};

export class Heading extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	private toVariant(component: string) {
		switch (component) {
			case "h1":
				return "display4";
			case "h2":
				return "display3";
			case "h3":
				return "display2";
			case "h4":
				return "display1";
			case "h5":
				return "headline";
			case "h6":
				return "subheading";
			default:
				return undefined;
		}
	}

	public render() {
		const variant = this.toVariant(this.props.component);
		return (
			<div className={styles.root}>
				<div className={styles.wrapper}>
					<Typography variant={variant} component={this.props.component} className={styles.typography}>
						{this.props.text}
					</Typography>
					{this.props.rightComponent}
				</div>
				<hr className={styles.hr} />
			</div>
		);
	}
}
