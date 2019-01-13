import * as React from "react";
import { List, Domain, Edit, RemoveRedEye } from "@material-ui/icons";
import { Index } from "../containers/page/Index";
import { LoginPage } from "../containers/page/auth/Login";
import { LogoutPage } from "../containers/page/auth/Logout";
import {SignupPage} from "../containers/page/auth/Signup";
import {ButimiListEdit} from "../containers/page/mypage/butimilist/ButimiListEdit";
import {InstanceList} from "../containers/page/mypage/InstanceList";
import {ButimiListPreview} from "../containers/page/mypage/butimilist/ButimiListPreview";
import {InstanceListEdit} from "../containers/page/mypage/instancelist/InstanceListEdit";

export interface IRouteInfo {
	name: string;
	path?: string;
	component?: any;
	showLeftNav: boolean;
	permission: number[];
	icon?: any;
	children?: IRouteInfo[];
	link?: boolean;
}

export const ROUTES: IRouteInfo[] = [
	// 全般
	{
		name: "index",
		path: "/",
		component: Index,
		showLeftNav: false,
		permission: [],
	},
	{
		name: "ログイン",
		path: "/auth/login",
		component: LoginPage,
		showLeftNav: false,
		permission: [],
	},
    {
        name: "ログアウト",
        path: "/auth/logout",
        component: LogoutPage,
        showLeftNav: false,
        permission: [],
    },
    {
        name: "アカウント作成",
        path: "/auth/signup",
        component: SignupPage,
        showLeftNav: false,
        permission: [],
    },
    {
        name: "ブチミリスト管理",
        path: "/mypage/butimilist",
        icon: <List/>,
        component: ButimiListEdit,
        showLeftNav: true,
        permission: [],
		children: [
            {
                name: "ブチミリプレビュー",
                path: "/mypage/butimilist/preview",
                icon: <RemoveRedEye/>,
                component: ButimiListPreview,
                showLeftNav: true,
                permission: [],
            },
            {
                name: "ブチミリスト編集",
                path: "/mypage/butimilist/edit",
                icon: <Edit/>,
                component: ButimiListEdit,
                showLeftNav: true,
                permission: [],
            },
		],
    },
    {
        name: "インスタンス管理",
        path: "/mypage/instance",
        icon: <Domain/>,
        component: InstanceListEdit,
        showLeftNav: true,
        permission: [],
		children: [
            {
                name: "インスタンス編集",
                path: "/mypage/instance/edit",
                icon: <Edit/>,
                component: InstanceListEdit,
                showLeftNav: true,
                permission: [],
            },
		],
    },
];
