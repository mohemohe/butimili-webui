import * as React from "react";
import { style } from "typestyle/lib";
import { Redirect, match } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { COLORS } from "../../../constants/Style";
import { AuthStore } from "../../../stores/AuthStore";
import { LoginPage } from "./Login";
import {IPropsBase} from "../../../types/IPropsBase";

interface IProps extends IPropsBase<HTMLDivElement> {
	AuthStore?: AuthStore;
}

interface IState extends React.ComponentState {
	name: string;
	password: string;
}

const styles = {
	root: style({
		position: "absolute",
		height: "100vh",
		width: "100vw",
		top: 0,
		left: 0,
		zIndex: 10,
		display: "flex",
		flexDirection: "column",
		backgroundColor: COLORS.DarkColor,
		color: COLORS.EmotionalWhite,
	}),
	headerBar: {
		width: "100vw",
	},
	loginCardWrapper: style({
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		overflow: "auto",
	}),
	loginCard: style({
		backgroundColor: COLORS.EmotionalWhite,
		color: "#000000",
		width: 400,
		padding: 40,
		paddingBottom: 20,
		marginTop: 100,
		minHeight: "33.3333vh",
		display: "flex",
		flexDirection: "column",
	}),
	loginActions: style({
		display: "flex",
		justifyContent: "space-between",
		color: COLORS.EmotionalBlack,
		alignItems: "center",
		flex: 1,
	}),
	loginButton: style({
		backgroundColor: COLORS.BaseColor,
		color: COLORS.EmotionalWhite,
		textTransform: "none",
		$nest: {
			"&:hover": {
				backgroundColor: COLORS.DarkColor,
			},
		},
	}),
};

@inject("AuthStore")
@observer
export class LogoutPage extends LoginPage {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public componentDidMount() {
		this.props.AuthStore!.logout();
	}

	public render() {
		return <Redirect to="/"/>;
	}
}
