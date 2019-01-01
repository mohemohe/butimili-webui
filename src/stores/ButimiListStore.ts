import {action, observable} from "mobx";
import {Mode, State, StoreBase, IApiBase} from "./StoreBase";

export interface IButimiListResponse extends IApiBase<string[]> {
}

export class ButimiListStore extends StoreBase {
	@observable
	public butimiliPreview: string;

	@observable
	public butimiList: string[];

	constructor() {
		super();

		this.butimiliPreview = "";
		this.butimiList = [];
	}

    @action
    public async getPreview() {
        this.setMode(Mode.GET);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/butimili", {
                method: "GET",
                headers: this.generateFetchHeader(),
            });

            if (response.ok) {
                this.butimiliPreview = await response.text();
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("ブチミリプレビューの取得に失敗しました");
        }
    }

    @action
    public async getList() {
        this.setMode(Mode.GET);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/butimili/list", {
                method: "GET",
                headers: this.generateFetchHeader(),
            });

            const result = await response.json() as IButimiListResponse;
            if (result.error === 0) {
                this.butimiList = result.data;
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("ブチミリストの取得に失敗しました");
        }
    }

    @action
    public async delete(screenName: string) {
        this.setMode(Mode.DELETE);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/butimili/list/" + screenName, {
                method: "DELETE",
                headers: this.generateFetchHeader(),
            });

            const result = await response.json() as IButimiListResponse;
            if (result.error === 0) {
            	this.butimiList = result.data;
                this.tryShowToast("ブチミリストから削除しました");
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("ユーザーの削除に失敗しました");
        }
    }

    @action
    public async add(screenName: string) {
        this.setMode(Mode.DELETE);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/butimili/list", {
                method: "PUT",
                headers: this.generateFetchHeader(),
				body: JSON.stringify({
					screen_name: screenName,
				}),
            });

            const result = await response.json() as IButimiListResponse;
            if (result.error === 0) {
                this.butimiList = result.data;
                this.tryShowToast("ブチミリストに追加しました");
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("ユーザーの追加に失敗しました");
        }
    }
}
