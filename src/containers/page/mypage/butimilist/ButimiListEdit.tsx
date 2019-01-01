import * as React from "react";
import {style} from "typestyle/lib";
import {inject, observer} from "mobx-react";
import {IPropsBase} from "../../../../types/IPropsBase";
import {ButimiListStore} from "../../../../stores/ButimiListStore";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    TextField
} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";
import {ValidatableTextField} from "../../../../components/ValidatableTextField";

interface IProps extends IPropsBase<HTMLDivElement> {
    ButimiListStore?: ButimiListStore;
}

interface IState extends React.ComponentState {
    selected: string;
    showAddDialog: boolean;
    showDeleteDialog: boolean;
}

const styles = {
    root: style({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 800,
    }),
    line: style({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    }),
    TextField: style({
        flex: 1,
    }),
    deleteButton: style({
        transform: "scale(0.8)",
    })
};

@inject("ButimiListStore")
@observer
export class ButimiListEdit extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props, state);

        this.state = {
            selected: "",
            showAddDialog: false,
            showDeleteDialog: false,
        };
    }

    public componentDidMount() {
        this.props.ButimiListStore!.getList();
    }

    public render() {
        const list = this.props.ButimiListStore!.butimiList;
        return (
            <>
                <div className={styles.root}>
                    {list.map((target, index) => {
                        return (
                            <div className={styles.line} key={index}>
                                <TextField disabled margin={"normal"} fullWidth value={target} className={styles.TextField}/>
                                <Fab color={"secondary"} size={"small"} onClick={() => this.setState({
                                    selected: target,
                                    showDeleteDialog: true,
                                })}>
                                    <Delete/>
                                </Fab>
                            </div>
                        );
                    })}
                    <Fab color={"primary"} onClick={() => this.setState({
                        showAddDialog: true,
                    })}>
                        <Add/>
                    </Fab>
                </div>

                <Dialog
                    open={this.state.showAddDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">追加</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            追加するユーザーをインスタンス名を含めて入力してください
                        </DialogContentText>
                        <ValidatableTextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="screen_name@instance_domain"
                            type="email"
                            fullWidth
                            validators={[
                                // {isValid: (text) => !!text.match(/.+?@.+?\..+/), errorText: "@区切りでインスタンスのドメインを入力してください"}
                            ]}
                            onChangeValue={(event) => this.setState({
                                selected: event.target.value,
                            })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({
                            showAddDialog: false,
                        })}>
                            キャンセル
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                showAddDialog: false,
                            });
                            this.props.ButimiListStore!.add(this.state.selected);
                        }} color="secondary" autoFocus>
                            追加
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.showDeleteDialog}>
                    <DialogTitle>確認</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            '{this.state.selected}' さんを削除しますか？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({
                            showDeleteDialog: false,
                        })}>
                            キャンセル
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                showDeleteDialog: false,
                            });
                            this.props.ButimiListStore!.delete(this.state.selected);
                        }} color="secondary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}
