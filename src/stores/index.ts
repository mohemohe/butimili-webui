import {AuthStore} from "./AuthStore";
import {HistoryStore} from "./HistoryStore";
import {ToastStore} from "./ToastStore";
import {ButimiListStore} from "./ButimiListStore";

export default {
	AuthStore: new AuthStore(),
	ButimiListStore: new ButimiListStore(),
	HistoryStore: new HistoryStore(),
	ToastStore: new ToastStore(),
};
