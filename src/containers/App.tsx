import * as React from "react";
import { Provider } from "mobx-react";
import store from "../stores";
import { Router } from "./Router";

interface IProps {
}

interface IState {
}

export class App extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public componentDidMount() {
		store.AuthStore.checkAuth();
	}

	public render() {
		return (
			<Provider {...store}>
				<Router/>
			</Provider>
		);
	}
}
