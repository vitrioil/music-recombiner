import { connect } from "react-redux";

import BaseEffect from "./base";
import EffectHeader from "./header";
import { InputText } from "../../../../utils/Form";


class Echo extends BaseEffect {
    render() {
        return (
            <div className="effect-view">
                <EffectHeader headerText="Echo" />
                <div className="echo-container">
                    <InputText labelText="Start Time"
                               inputValue={this.props.effect.startTime.toFixed(2)} />
                    <InputText labelText="End Time"
                               inputValue={this.props.effect.endTime.toFixed(2)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    effect: state.waves[state.focusedStem].getEffect(state.effectId)
});

export default connect(mapStateToProps)(Echo);