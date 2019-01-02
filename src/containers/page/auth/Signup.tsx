import * as React from "react";
import { style } from "typestyle/lib";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Card, CardActions, CardContent, Button, Typography, TextField } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { COLORS } from "../../../constants/Style";
import {AuthStore, AuthStatus} from "../../../stores/AuthStore";
import { HeaderBar } from "../../../components/HeaderBar";
import {IPropsBase} from "../../../types/IPropsBase";
import {ValidatableTextField} from "../../../components/ValidatableTextField";

interface IProps extends IPropsBase<HTMLDivElement> {
	AuthStore?: AuthStore;
}

interface IState extends React.ComponentState {
    name: string;
    password: string;
    passwordCheck: string;
    validName: boolean;
    validPassword: boolean;
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
		alignItems: "center",
		overflow: "auto",
	}),
	loginCard: style({
		backgroundColor: COLORS.EmotionalWhite,
		color: "#000000",
		width: 400,
		padding: 40,
		display: "flex",
		flexDirection: "column",
	}),
	loginActions: style({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		color: COLORS.EmotionalBlack,
		alignItems: "center",
		flex: 1,
	}),
	loginInputs: style({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		color: COLORS.EmotionalBlack,
		alignItems: "center",
		flex: 1,
	}),
	loginButtons: style({
		display: "flex",
		flexDirection: "column",
		width: "100%",
		color: COLORS.EmotionalBlack,
		alignItems: "center",
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
export class SignupPage extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);

		this.state = {
			name: "",
			password: "",
            passwordCheck: "",
            validName: false,
			validPassword: false,
		};
	}

	public render() {
		if (this.props.AuthStore!.authStatus === AuthStatus.Authorized) {
			return <Redirect to="/"/>;
		}

		return (
			<div className={styles.root}>
				<HeaderBar style={styles.headerBar} showLogo={true} {...this.props}/>

				<form className={styles.loginCardWrapper}>
					<Card className={styles.loginCard}>
						<Typography variant="headline" component="h3">
							アカウント作成
						</Typography>
						<CardContent className={styles.loginInputs}>
                            <ValidatableTextField
								label={"アカウント名"}
                                fullWidth
                                value={this.state.name}
								isValid={(valid) => {
									if (this.state.validName !== valid) {
                                        this.setState({
                                            validName: valid,
                                        });
									}
                                }}
                                validators={[
                                    {isValid: (text) => text !== "", errorText: "アカウント名は空にできません"},
                                    {isValid: (text) => !!text.match(/^[a-zA-Z0-9@.\-]+$/), errorText: "アカウント名に使用できるのは半角英数と@-.です"}
                                ]}
                                onChangeValue={(event) => this.setState({
                                    name: event.target.value,
                                })}
                            />
                            <ValidatableTextField
                                label="パスワード"
                                type="password"
                                fullWidth
                                value={this.state.password}
                                validators={[
                                    {isValid: (text) => text !== "", errorText: "パスワードは空にできません"},
                                ]}
                                onChangeValue={(event) => this.setState({
                                    password: event.target.value,
                                })}
                            />
                            <ValidatableTextField
                                label="パスワード（確認）"
                                type="password"
                                fullWidth
                                value={this.state.passwordCheck}
                                isValid={(valid) => {
                                	if (this.state.validPassword !== valid) {
                                        this.setState({
                                            validPassword: valid,
                                        });
									}
                                }}
                                validators={[
                                    {isValid: (text) => text !== "", errorText: "パスワードは空にできません"},
                                ]}
                                errorText={this.state.password !== this.state.passwordCheck ? "パスワードが一致していません" : undefined}
                                onChangeValue={(event) => this.setState({
                                    passwordCheck: event.target.value,
                                })}
                            />
						</CardContent>
						<CardActions className={styles.loginActions}>
							<div className={styles.loginButtons}>
								<Button
									fullWidth
									disabled={!(this.state.validName && this.state.password !== "" && this.state.password === this.state.passwordCheck)}
									variant="raised"
									classes={{root: styles.loginButton}}
									onClick={() => this.props.AuthStore!.create(this.state.name, this.state.password)}>
									<PersonAdd/>
									<span style={{marginLeft: ".5rem"}}>アカウント作成</span>
								</Button>
							</div>
						</CardActions>
					</Card>
				</form>
			</div>
		);
	}
}
