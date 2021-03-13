import { connect } from "react-redux";

import BaseEffect from "./base";
import EffectHeader from "./header";
import { InputText } from "../../../../utils/Form";


class Echo extends BaseEffect {
    constructor(props) {
        super(props);
        this.state = {startTime: props.effect.startTime,
                      endTime: props.effect.endTime};
    }

    render() {
        const params = {startTime: this.state.startTime,
                        endTime: this.state.endTime};

        return (
            <div className="effect-view">
                <EffectHeader headerText="Echo"
                              params={params} />
                <div className="echo-container">
                    <InputText labelText="Start Time"
                               inputValue={params.startTime.toFixed(2)}
                               onChange={(e) => {
                                   this.setState({startTime: parseFloat(e.target.value)});
                               }} />
                    <InputText labelText="End Time"
                               inputValue={params.endTime.toFixed(2)}
                               onChange={(e) => {
                                   this.setState({endTime: parseFloat(e.target.value)});
                               }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    effectId: state.effectId,
    effect: state.waves[state.focusedStem].getEffect(state.effectId)
});

export default connect(mapStateToProps)(Echo);