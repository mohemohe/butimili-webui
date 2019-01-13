import {AuthStore} from "./AuthStore";
import {HistoryStore} from "./HistoryStore";
import {ToastStore} from "./ToastStore";
import {ButimiListStore} from "./ButimiListStore";
import {InstanceListStore} from "./InstanceListStore";

export default {
	AuthStore: new AuthStore(),
    ButimiListStore: new ButimiListStore(),
    InstanceListStore: new InstanceListStore(),
	HistoryStore: new HistoryStore(),
	ToastStore: new ToastStore(),
};
