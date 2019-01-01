import * as React from "react";
import { style } from "typestyle/lib";
import { inject, observer } from "mobx-react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Header } from "./common/Header";
import { LeftNav } from "./common/LeftNav";
import { SIZES } from "../constants/Style";
import { IRouteInfo, ROUTES } from "../constants/Route";
import { Notfound } from "./page/Notfound";
import { AuthStore } from "../stores/AuthStore";
import { Toast } from "./common/Toast";
import { RouteHelper } from "../helpers/RouteHelper";
import { Breadcrumbs } from "./common/Breadcrumbs";
import {IPropsBase} from "../types/IPropsBase";

interface IProps extends IPropsBase<HTMLDivElement>{
	AuthStore?: AuthStore;
}

interface IState {
}

const styles = {
	root: style({
		height: "100vh",
		minHeight: "100vh",
		maxHeight: "100vh",
		minWidth: "1200px",
	}),
	bottom: style({
		display: "flex",
		height: `calc(100vh - ${SIZES.Header.height}px)`,
		overflow: "hidden" as "hidden",
	}),
	contentWrapper: style({
		flex: 1,
		overflow: "auto" as "auto",
	}),
	contentInner: style({
		display: "flex",
		minWidth: "100%",
		minHeight: "100%",
		padding: "1rem",
		boxSizing: "border-box",
		overflow: "hidden" as "hidden",
	}),
	contents: style({
		display: "flex",
		flex: 1,
		flexDirection: "column" as "column",
		minHeight: "100%",
		width: "100%",
		maxWidth: "100%",
	}),
};

@inject("AuthStore")
@observer
export class Router extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);

		this.routeArray = [];
		this.env = "";

		this.routeParser = this.routeParser.bind(this);
		this.generateRoute = this.generateRoute.bind(this);
	}

	private routeArray: any[];
	private env: string;

	private generateRoute() {
		this.routeArray = [];

		const routes: IRouteInfo[] = Object.assign([], ROUTES);
		const enableRoutes = RouteHelper.getRoute(routes, this.props.AuthStore!, false);
		this.routeParser(enableRoutes);
		this.routeArray.push(<Route component={Notfound} key={this.routeArray.length}/>);

		return this.routeArray;
	}

	private routeParser(routes: IRouteInfo[]) {
		routes.forEach((route) => {
			if (route.path) {
				this.routeArray.push(<Route exact path={route.path} component={route.component ? route.component : Notfound} key={this.routeArray.length}/>);
			}
			if (route.children) {
				this.routeParser(route.children);
			}
		});
	}

	public render() {
		return (
			<HashRouter>
				<div className={styles.root}>
					<Header {...this.props}/>
					<div className={styles.bottom}>
						<LeftNav/>
						<div className={styles.contentWrapper}>
							<div className={styles.contentInner}>
								<div className={styles.contents}>
									<Breadcrumbs/>
									<Switch>
										{this.generateRoute()}
									</Switch>
								</div>
							</div>
						</div>
					</div>
					<Toast/>
				</div>
			</HashRouter>
		);
	}
}
