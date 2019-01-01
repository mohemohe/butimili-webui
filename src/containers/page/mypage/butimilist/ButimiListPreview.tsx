import * as React from "react";
import {style} from "typestyle/lib";
import {inject, observer} from "mobx-react";
import {IPropsBase} from "../../../../types/IPropsBase";
import {ButimiListStore} from "../../../../stores/ButimiListStore";

interface IProps extends IPropsBase<HTMLDivElement> {
    ButimiListStore?: ButimiListStore;
}

interface IState extends React.ComponentState {
}

const styles = {
};

@inject("ButimiListStore")
@observer
export class ButimiListPreview extends React.Component<IProps, IState> {
    public componentDidMount() {
        this.props.ButimiListStore!.getPreview();
    }

    public render() {
        return (
            <div>{this.props.ButimiListStore!.butimiliPreview}</div>
        );
    }
}
