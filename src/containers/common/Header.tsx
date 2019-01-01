import * as React from "react";
import {style} from "typestyle/lib";
import {inject, observer} from "mobx-react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, PersonAdd, Send} from "@material-ui/icons";
import {HeaderBar} from "../../components/HeaderBar";
import {AuthStatus, AuthStore} from "../../stores/AuthStore";
import {COLORS, FONTS} from "../../constants/Style";
import {HistoryStore} from "../../stores/HistoryStore";
import {IPropsBase} from 'src/types/IPropsBase';
import {LinkButton} from "../../components/LinkButton";

const styles = {
	root: style({
		display: "flex",
		flexDirection: "row",
	}),
	domainInfo: style({
		marginRight: 26,
	}),
	userInfo: style({
		marginLeft: "0.5rem",
		color: COLORS.EmotionalWhite,
		textTransform: "none",
	}),
	menuIcon: style({
		color: COLORS.EmotionalWhite,
	}),
	menuText: style({
		fontFamily: FONTS.Default,
	}),
	endSpoofingAdminButton: style({
		display: "flex",
		alignItems: "center",
		marginRight: 23,
	}),
};

interface IProps extends IPropsBase<HTMLDivElement> {
	menu?: any;
	AuthStore?: AuthStore;
	HistoryStore?: HistoryStore;
}

interface IState extends React.ComponentState {
	anchorElement: HTMLElement | null;
}

@inject("AuthStore", "HistoryStore")
@observer
export class Header extends React.Component<IProps, IState> {
	public state = {
		anchorElement: null,
	};

	constructor(props: IProps, state: IState) {
		super(props, state);

		this.handleMenu = this.handleMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.logout = this.logout.bind(this);
	}

	public componentWillMount() {
		this.props.AuthStore!.checkAuth();
	}

	private logout() {
		this.handleClose();
		this.props.HistoryStore!.move("/auth/logout");
	}

	public render() {
		const {anchorElement} = this.state;
		const open = anchorElement !== null;
		const isAuthorized = this.props.AuthStore!.authStatus === AuthStatus.Authorized;

		const authorizedMenu = (
			<div>
				<Button
					aria-owns={open ? "menu-appbar" : undefined}
					aria-haspopup="true"
					onClick={this.handleMenu}

				>
					<AccountCircle className={styles.menuIcon}/>
					<div className={styles.userInfo}>
						{this.props.AuthStore!.userInfo.username}
					</div>
				</Button>
				<Menu
					id="menu-appbar"
					anchorEl={anchorElement ? anchorElement : undefined}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={open}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.logout} className={styles.menuText}>ログアウト</MenuItem>
				</Menu>
			</div>
		);
        const unauthorizedMenu = (
            <div>
                <LinkButton to={"/auth/signup"} variant={"flat"}>
                    <PersonAdd className={styles.menuIcon}/>
                    <div className={styles.userInfo}>
                        アカウント作成
                    </div>
                </LinkButton>
                <LinkButton to={"/auth/login"} variant={"flat"}>
                    <Send className={styles.menuIcon}/>
                    <div className={styles.userInfo}>
                        ログイン
                    </div>
                </LinkButton>

            </div>
        );

		const rightComponent = (
			<div className={styles.root}>
				{isAuthorized ? authorizedMenu : unauthorizedMenu}
			</div>
		);

		return (
			<div>
				<HeaderBar showLogo={this.props.HistoryStore!.current != "/" || this.props.AuthStore!.authStatus === AuthStatus.Authorized} rightComponent={rightComponent} elevation={isAuthorized ? 8 : 0} {...this.props}/>
			</div>
		);
	}

	private handleMenu(event: any) {
		this.setState({
			anchorElement: event.currentTarget,
		});
	}

	private handleClose() {
		this.setState({
			anchorElement: null,
		});
	}
}
