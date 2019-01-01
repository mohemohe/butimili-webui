import * as React from "react";
import {IPropsBase} from "../../types/IPropsBase";

interface IProps extends IPropsBase<HTMLDivElement> {
}

interface IState extends React.ComponentState {
}

export class Notfound extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		return (
			<div>
				<h2>404 not found.</h2>
			</div>
		);
	}
}
