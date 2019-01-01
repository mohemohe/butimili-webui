import * as React from "react";
import { style } from "typestyle/lib";
import { AppBar, Toolbar } from "@material-ui/core";
import { COLORS, SIZES } from "../constants/Style";
import { IPropsBase } from 'src/types/IPropsBase';
import {LinkButton} from "./LinkButton";

const styles = {
	appBar: style({
		height: SIZES.Header.height,
		minHeight: SIZES.Header.height,
		backgroundColor: COLORS.DarkColor,
		color: COLORS.EmotionalWhite,
	}),
	toolBar: style({
		height: SIZES.Header.height,
		minHeight: SIZES.Header.height,
		display: "flex",
		justifyContent: "space-between",
		// paddingRight: 0,
	}),
	logoButton: style({
		padding: 0,
	}),
	logo: style({
		fontSize: 32,
		color: COLORS.EmotionalWhite,
		textTransform: "none",
	}),
};

interface IProps extends IPropsBase<HTMLDivElement> {
	showLogo: boolean;
	style?: any;
	rightComponent?: any;
	elevation?: number;
}

interface IState extends React.ComponentState {
	anchorElement?: HTMLElement;
}

export class HeaderBar extends React.Component<IProps, IState> {
	public state = {
		anchorElement: undefined,
	};

	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		return (
			<div>
				<AppBar position="sticky" color="default" className={styles.appBar} elevation={this.props.elevation || 0}>
					<Toolbar className={styles.toolBar}>
						{this.props.showLogo ?
							<LinkButton to={"/"} variant={"flat"} className={styles.logoButton}>
								<span className={styles.logo} dangerouslySetInnerHTML={{__html: process.env.BRAND_NAME || ""}}/>
							</LinkButton> :
							<div/>
						}
						{this.props.rightComponent}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
