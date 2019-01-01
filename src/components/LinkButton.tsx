import * as React from "react";
import { style } from "typestyle/lib";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";

interface IProps extends ButtonProps {
	to: string;
	buttonStyle?: any;
	typeStyle?: string;
}

interface IState extends React.ComponentState {
}

const styles = {
	link: style({
		textDecoration: "none",
	}),
};

export class LinkButton extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		const otherProps = Object.assign({}, this.props) as IProps;
		delete otherProps.variant;

		const button = (
			<Button variant={this.props.variant ? this.props.variant : "raised"} className={`${this.props.typeStyle} ${this.props.buttonStyle}`} {...otherProps}>
				{this.props.children}
			</Button>
		);

		return (
			this.props.disabled ?
				<div>{button}</div> :
			this.props.to.indexOf("http") === 0 ?
				<a href={this.props.to} className={styles.link}>
					{button}
				</a>
				:
				<Link to={this.props.to} className={styles.link}>
					{button}
				</Link>
		);
	}
}
