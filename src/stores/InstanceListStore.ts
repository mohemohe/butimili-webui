import {action, observable} from "mobx";
import {Mode, State, StoreBase, IApiBase} from "./StoreBase";

export interface IButimiListResponse extends IApiBase<string[]> {
}

export class InstanceListStore extends StoreBase {
	@observable
	public instanceList: string[];

	constructor() {
		super();

		this.instanceList = [];
	}

    @action
    public async getList() {
        this.setMode(Mode.GET);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/instance/list", {
                method: "GET",
                headers: this.generateFetchHeader(),
            });

            const result = await response.json() as IButimiListResponse;
            if (result.error === 0) {
                this.instanceList = result.data;
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("インスタンスリストの取得に失敗しました");
        }
    }

    @action
    public async delete(fqdn: string) {
        this.setMode(Mode.DELETE);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/instance/list/" + fqdn, {
                method: "DELETE",
                headers: this.generateFetchHeader(),
            });

            const result = await response.json() as IButimiListResponse;
            if (result.error === 0) {
            	this.instanceList = result.data;
                this.tryShowToast("インスタンスリストから削除しました");
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("インスタンスの削除に失敗しました");
        }
    }

    @action
    public async add(fqdn: string) {
        this.setMode(Mode.DELETE);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/instance/list", {
                method: "PUT",
                headers: this.generateFetchHeader(),
				body: JSON.stringify({
					fqdn,
				}),
            });

            const result = await response.json() as IButimiListResponse;
            if (result.error === 0) {
                this.instanceList = result.data;
                this.tryShowToast("インスタンスリストに追加しました");
            } else {
                throw new Error();
            }

            this.setState(State.DONE);
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("インスタンスの追加に失敗しました");
        }
    }
}
