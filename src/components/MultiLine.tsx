import * as React from "react";
import { style } from "typestyle/lib";

interface IProps extends React.ClassAttributes<HTMLParagraphElement> {
	text: string;
}

interface IState extends React.ComponentState {
}

const styles = {
	line: style({
		minHeight: "1rem",
		margin: "initial",
	}),
};

export class MultiLine extends React.Component<IProps, IState> {
	public render() {
		return (
			this.props.text.split("\n").map((line) => {
				return <p className={styles.line}>{line}</p>;
			})
		);
	}
}
