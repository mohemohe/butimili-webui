import * as React from "react";
import {style} from "typestyle/lib";
import {inject, observer} from "mobx-react";
import {COLORS} from "../../constants/Style";
import {AuthStatus, AuthStore} from "../../stores/AuthStore";
import {IPropsBase} from "../../types/IPropsBase";

interface IProps extends IPropsBase<HTMLDivElement> {
    AuthStore?: AuthStore;
}

interface IState extends React.ComponentState {
    name: string;
    password: string;
}

const styles = {
    root: style({
        position: "absolute",
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.DarkColor,
        color: COLORS.EmotionalWhite,
    }),
    authorizedRoot: style({
        position: "static",
        height: "auto",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.PureWhite,
        color: COLORS.EmotionalBlack,
    }),
    headerBar: {
        width: "100vw",
    },
    inner: style({
        margin: "56px 4rem 0 4rem",
    }),
};

@inject("AuthStore")
@observer
export class Index extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props, state);

        this.state = {
            name: "",
            password: "",
        };
    }

    public componentDidMount() {
        if ((window as any).twttr) {
            (window as any).twttr.widgets.load();
        }
    }

    public render() {
        return (
            <div className={this.props.AuthStore!.authStatus === AuthStatus.Authorized ? styles.authorizedRoot : styles.root}>
                <div className={this.props.AuthStore!.authStatus === AuthStatus.Unauthorized ? styles.inner : undefined}>
                    {this.props.AuthStore!.authStatus === AuthStatus.Unauthorized ?
                        <h1 style={{fontSize:"5rem",margin: 0}}>butimi<span style={{color:"red"}}>.</span>li</h1> :
                        <></>
                    }

                    <blockquote className="twitter-tweet" data-lang="ja">
                        <a href="https://twitter.com/kenkov/status/539330478264680448"/>
                    </blockquote>
                </div>
            </div>
        );
    }
}
