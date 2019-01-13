import * as React from "react";
import {style} from "typestyle/lib";
import {inject, observer} from "mobx-react";
import {IPropsBase} from "../../../../types/IPropsBase";
import {ButimiListStore} from "../../../../stores/ButimiListStore";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {InstanceListStore} from "../../../../stores/InstanceListStore";
import {LinkButton} from "../../../../components/LinkButton";
import {ClipboardHelper} from "../../../../helpers/ClipboardHelper";
import {ToastStore} from "../../../../stores/ToastStore";
import {FilterNone, Share} from "@material-ui/icons";

interface IProps extends IPropsBase<HTMLDivElement> {
    ButimiListStore?: ButimiListStore;
    InstanceListStore?: InstanceListStore;
    ToastStore?: ToastStore;
}

interface IState extends React.ComponentState {
    selected: string;
}

const styles = {
    form: style({
        minWidth: 400,
        marginBottom: "1rem",
    }),
};

@inject("ButimiListStore", "InstanceListStore", "ToastStore")
@observer
export class ButimiListPreview extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props, state);

        this.state = {
            selected: "",
        };
    }

    public componentDidMount() {
        this.props.ButimiListStore!.getPreview();
        this.props.InstanceListStore!.getList();
    }

    public render() {

        let butimili = this.props.ButimiListStore!.butimiliPreview;
        if (this.state.selected !== "") {
            butimili = butimili.split(`@${this.state.selected}`).join("");
            if (butimili.length > 500) {
                butimili = butimili.substring(0, 500);
            }
        }
        const count = butimili.length;


        return (
            <div>
                <FormControl className={styles.form}>
                    <InputLabel htmlFor="instance-select">インスタンス</InputLabel>
                    <Select
                        value={this.state.selected}
                        onChange={(event) => {
                            this.setState({
                                selected: event.target.value,
                            });
                        }}
                        inputProps={{
                            id: "instance-select",
                        }}
                    >
                        <MenuItem value="">
                            <em>未選択</em>
                        </MenuItem>
                        {
                            Object.assign([], this.props.InstanceListStore!.instanceList).map((instance) => <MenuItem value={instance}>{instance}</MenuItem>)
                        }
                    </Select>
                </FormControl>

                <Card>
                    <CardContent>
                        <Typography component="h5" variant={"h5"} gutterBottom>
                            プレビュー
                        </Typography>
                        <Typography component="p" gutterBottom>
                            {butimili}
                        </Typography>
                        <Typography color="textSecondary">
                            {count} / 500
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <LinkButton disabled={this.state.selected === ""} variant="contained" color="primary" to={`https://${this.state.selected}/share?text=${encodeURIComponent(butimili)}`} target={"_blank"}><Share/> 共有</LinkButton>
                        <Button variant="contained" onClick={() => {
                            if (ClipboardHelper.copyToClipoboard(butimili)) {
                                this.props.ToastStore!.showToast("コピーしました");
                            } else {
                                this.props.ToastStore!.showToast("コピーに失敗しました");
                            }
                        }}><FilterNone/> コピー</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
