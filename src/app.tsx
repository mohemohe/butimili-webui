import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./containers/App";
import { FONTS } from "./constants/Style";

const rootStyle = {
	margin: 0,
	padding: 0,
	height: "100%",
	width: "100%",
	fontFamily: FONTS.Default,
	overflowY: "hidden",
};

const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
button *,
table *,
input *,
form *,
.material-font * {
	font-family: "${FONTS.Default}"!important;
}
`;

const html = document.querySelector("html");
if (html) {
	Object.assign(html.style, rootStyle);
}
const body = document.querySelector("body");
if (body) {
	Object.assign(body.style, rootStyle);
	body.appendChild(globalStyle);
}

const app = document.querySelector("#app") as HTMLElement;
if (app) {
	Object.assign(app.style, rootStyle);
}

const props = {} as any;
ReactDOM.render(
	<App {...props}/>,
	app,
);
