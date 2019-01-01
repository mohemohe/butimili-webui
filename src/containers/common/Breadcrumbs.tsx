import * as React from "react";
import { inject, observer } from "mobx-react";
import { style } from "typestyle/lib";
import { Link } from "react-router-dom";
import { HistoryStore } from "../../stores/HistoryStore";
import { RouteHelper } from "../../helpers/RouteHelper";
import { COLORS } from "../../constants/Style";
import { IRouteInfo, ROUTES } from "../../constants/Route";
import { AuthStore } from "../../stores/AuthStore";

interface IProps extends React.ClassAttributes<{}> {
	AuthStore?: AuthStore;
	HistoryStore?: HistoryStore;
}

interface IState extends React.ComponentState {
}

const styles = {
	root: style({
		display: "flex" as "flex",
		justifyContent: "flex-start",
		height: "2rem",
		marginBottom: "0.5rem",
	}),
	linkStart: style({
		display: "flex",
		alignItems: "center",
		position: "relative",
		color: COLORS.EmotionalWhite,
		background: COLORS.UltraSuperExtraLightColor,
		fontSize: "1rem",
		outline: "none",
		padding: "0 0.5rem 0 1rem",
		textDecoration: "none",
		$nest: {
			"&:after": {
				content: "' '",
				display: "block",
				position: "absolute",
				width: 0,
				height: 0,
				borderTop: "1rem solid transparent",
				borderBottom: "1rem solid transparent",
				borderLeft: `1rem solid ${COLORS.UltraSuperExtraLightColor}`,
				top: "1rem",
				marginTop: "-1rem",
				left: "100%",
				zIndex: 2,
			},
		},
	}),
	link: style({
		display: "flex",
		alignItems: "center",
		position: "relative",
		color: COLORS.EmotionalWhite,
		background: COLORS.UltraSuperExtraLightColor,
		fontSize: "1rem",
		outline: "none",
		padding: "0 0.5rem 0 1.5rem",
		textDecoration: "none",
		$nest: {
			"&:before": {
				content: "' '",
				display: "block",
				position: "absolute",
				width: 0,
				height: 0,
				borderTop: "1rem solid transparent",
				borderBottom: "1rem solid transparent",
				borderLeft: `1rem solid white`,
				top: "1rem",
				marginTop: "-1rem",
				left: "0%",
				marginLeft: "1px",
				zIndex: 1,
			},
			"&:after": {
				content: "' '",
				display: "block",
				position: "absolute",
				width: 0,
				height: 0,
				borderTop: "1rem solid transparent",
				borderBottom: "1rem solid transparent",
				borderLeft: `1rem solid ${COLORS.UltraSuperExtraLightColor}`,
				top: "1rem",
				marginTop: "-1rem",
				left: "100%",
				zIndex: 2,
			},
		},
	}),
	linkEnd: style({
		display: "flex",
		alignItems: "center",
		position: "relative",
		color: COLORS.EmotionalWhite,
		background: COLORS.LightColor,
		fontSize: "1rem",
		outline: "none",
		padding: "0 0.5rem 0 1.5rem",
		textDecoration: "none",
		$nest: {
			"&:before": {
				content: "' '",
				display: "block",
				position: "absolute",
				width: 0,
				height: 0,
				borderTop: "1rem solid transparent",
				borderBottom: "1rem solid transparent",
				borderLeft: `1rem solid white`,
				top: "1rem",
				marginTop: "-1rem",
				left: "0%",
				marginLeft: "1px",
				zIndex: 1,
			},
			"&:after": {
				content: "' '",
				display: "block",
				position: "absolute",
				width: 0,
				height: 0,
				borderTop: "1rem solid transparent",
				borderBottom: "1rem solid transparent",
				borderLeft: `1rem solid ${COLORS.LightColor}`,
				top: "1rem",
				marginTop: "-1rem",
				left: "100%",
				zIndex: 2,
			},
		},
	}),
	linkStartEnd: style({
		display: "flex",
		alignItems: "center",
		position: "relative",
		color: COLORS.EmotionalWhite,
		background: COLORS.LightColor,
		fontSize: "1rem",
		outline: "none",
		padding: "0 0.5rem 0 1rem",
		textDecoration: "none",
		$nest: {
			"&:after": {
				content: "' '",
				display: "block",
				position: "absolute",
				width: 0,
				height: 0,
				borderTop: "1rem solid transparent",
				borderBottom: "1rem solid transparent",
				borderLeft: `1rem solid ${COLORS.LightColor}`,
				top: "1rem",
				marginTop: "-1rem",
				left: "100%",
				zIndex: 2,
			},
		},
	}),
};

@inject("AuthStore", "HistoryStore")
@observer
export class Breadcrumbs extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);

		this.generateBreadcrumbs = this.generateBreadcrumbs.bind(this);
	}

	private generateBreadcrumbs(routes: IRouteInfo[], current: string, isRoot: boolean) {
		const array: any[] = [];
		routes.forEach((route) => {
			if (route.path) {
				const routeDirectories = route.path.split("/");
				const currentDirectories = current.split("/");
				for (let i = 0; i < routeDirectories.length; i++) {
					if (routeDirectories[i].startsWith(":") && i < currentDirectories.length) {
						routeDirectories[i] = currentDirectories[i];
					}
				}
				route.path = routeDirectories.join("/");
			}
		});
		const root = routes.filter((route) => current.match(route.path || "")).pop();
		let children: any[] = [];
		if (root && root.children) {
			children = this.generateBreadcrumbs(root.children, current, false);
		}

		if (root) {
			if (root.path && (!root.children || (root.children && root.link === true))) {
				if (children.length === 0) {
					array.push(<Link key={root.name} to={root.path} className={isRoot ? styles.linkStartEnd : styles.linkEnd}>{root.name}</Link>);
				} else {
					array.push(<Link key={root.name} to={root.path} className={isRoot ? styles.linkStart : styles.link}>{root.name}</Link>);
				}
			} else {
				array.push(<span key={root.name} style={{cursor: "default"}} className={isRoot ? styles.linkStart : styles.link}>{root.name}</span>);
			}
		}

		return array.concat(children);
	}

	public render() {
		const routes = JSON.parse(JSON.stringify(RouteHelper.getRoute(ROUTES, this.props.AuthStore!, false)));
		const current = this.props.HistoryStore!.current;

		const paths = this.generateBreadcrumbs(routes, current, true);
		return (
			<div className={styles.root}>
				{paths}
			</div>
		);
	}
}
