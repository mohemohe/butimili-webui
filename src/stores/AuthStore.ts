import {action, computed, observable} from "mobx";
import {Mode, State, StoreBase, IApiBase} from "./StoreBase";

export enum AuthStatus {
	Unauthorized = 0,
	Authorized = 1,
}

export interface IAuthResponse extends IApiBase<IAuthData> {
}

export interface IAuthData {
	token: string;
	user: IUserInfo;
}

export interface IUserInfo {
	username: string;
}

export class AuthStore extends StoreBase {
	@observable
	public authStatus: AuthStatus;

	@observable
	public accessToken: string;

	@observable
	public userInfo: IUserInfo;

	constructor() {
		super();

		this.userInfo = {} as IUserInfo;
		this.accessToken = localStorage.accessToken || "";
		this.authStatus = AuthStatus.Unauthorized;
	}

	@action
	public async login(username: string, password: string) {
		this.setMode(Mode.LOGIN);
		this.setState(State.RUNNING);

		try {
			const response = await fetch(this.apiBasePath + "v1/auth", {
				method: "POST",
				headers: this.generateFetchHeader(),
				body: JSON.stringify({
					username,
					password,
				}),
			});

			const result = await response.json() as IAuthResponse;
			if (result.error === 0) {
				this.accessToken = localStorage.accessToken = result.data.token;
			} else {
				throw new Error();
			}

			await this.checkAuth();
			this.setState(State.DONE);
			this.tryShowToast("ログインしました");
		} catch (e) {
			console.error(e);
			this.setState(State.ERROR);
			this.tryShowToast("ログインに失敗しました");
		}
	}

	@action
	public logout() {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		this.authStatus = AuthStatus.Unauthorized;
		this.accessToken = "";
		this.userInfo = {} as any;
	}

	@action
	public async checkAuth() {
		if (!this.accessToken) {
			this.logout();
			return;
		}
		const response = await fetch(this.apiBasePath + "v1/auth", {
			headers: this.generateFetchHeader(),
		});
		if (!response.ok) {
            this.tryShowToast("AccessTokenの有効期限が切れました");
            this.logout();
			return;
		}

		const result = await response.json() as IAuthResponse;
		if (result.error !== 0) {
            this.tryShowToast("AccessTokenの有効期限が切れました");
			this.logout();
		}

		this.userInfo = result.data.user;
		this.authStatus = AuthStatus.Authorized;
	}

    @action
    public async create(username: string, password: string) {
        this.setMode(Mode.CREATE);
        this.setState(State.RUNNING);

        try {
            const response = await fetch(this.apiBasePath + "v1/user", {
                method: "POST",
                headers: this.generateFetchHeader(),
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const result = await response.json() as IAuthResponse;
            if (result.error === 0) {
                this.accessToken = localStorage.accessToken = result.data.token;
            } else {
                throw new Error();
            }

            await this.checkAuth();
            this.setState(State.DONE);
            this.tryShowToast("アカウントを作成しました");
        } catch (e) {
            console.error(e);
            this.setState(State.ERROR);
            this.tryShowToast("アカウント作成に失敗しました");
        }
    }
}
