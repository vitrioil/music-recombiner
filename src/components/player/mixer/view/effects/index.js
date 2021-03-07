import { connect } from "react-redux";

import Factory from "./factory";
import BaseView from "../base";


class GenericEffectView extends BaseView {

    constructor() {
        super("generic-effect");
        this.effectFactory = new Factory();
    }

    render() {
        const view = this.effectFactory.create(this.props.effect);

        return (
            <>
                {view}
            </>
        );
    }
}

const mapStateToProps = state => ({
    effect: state.waves[state.focusedStem].getEffectName(state.mixerView.id)
});

export default connect(mapStateToProps)(GenericEffectView);