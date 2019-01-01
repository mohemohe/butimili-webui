import * as React from "react";
import {style} from "typestyle/lib";
import {inject, observer} from "mobx-react";
import {IPropsBase} from "../../../types/IPropsBase";
import {ButimiListStore} from "../../../stores/ButimiListStore";

interface IProps extends IPropsBase<HTMLDivElement> {
    ButimiListStore?: ButimiListStore;
}

interface IState extends React.ComponentState {
}

const styles = {
};

@inject("ButimiListStore")
@observer
export class InstanceList extends React.Component<IProps, IState> {
    public componentDidMount() {
    }

    public render() {
        return (
            <div>
                ここにはMastoshare互換のトゥートをするための管理画面が入る予定だけどAPI未実装につきしばし待たれよ
            </div>
        );
    }
}
