import * as React from "react";
import { style } from "typestyle/lib";

interface IProps extends React.ClassAttributes<HTMLDivElement> {
}

interface IState extends React.ComponentState {
}

const styles = {
	root: style({
		padding: "1rem",
	}),
};

export class Container extends React.PureComponent<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		return (
			<div className={styles.root} {...this.props}>
				{this.props.children}
			</div>
		);
	}
}
