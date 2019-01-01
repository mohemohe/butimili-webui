import {action, observable} from "mobx";
import BrowserHistory from "history/createBrowserHistory";
import {StoreBase} from "./StoreBase";

export class HistoryStore extends StoreBase {
	@observable
	public current: string;

	@observable
	public before: string;

	private history: any;

	@observable
	private moves: number;

	constructor() {
		super();
		this.history = BrowserHistory();
		this.current = this.history.location || "";
		this.before = "";
		this.moves = -1;

		this.update(this.history.location);
		this.history.listen(this.update);
	}

	@action.bound
	public update(location: any) {
		if (location.hash) {
			this.moves++;
			this.before = this.current;

			const hashTail = location.hash.split("#");
			if (hashTail.length > 0) {
				this.current = hashTail[1];
			} else {
				this.current = "";
			}
		} else {
			this.current = "";
		}
	}

	@action.bound
	public move(path: string) {
		const l = location;
		l.hash = `#${path}`;

		this.update(l);
	}
}
