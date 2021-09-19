import { connect } from "react-redux";

import BaseEffect from "./base";
import EffectHeader from "./header";
import { InputText, InputSlider } from "../../../../utils/Form";

class Reverb extends BaseEffect {
    constructor(props) {
        super(props);
        this.state = {startTime: props.effect.startTime,
                      endTime: props.effect.endTime,
                      params: {
                          reverberance: props.effect.params.reverberance
                      }};
    }

    render() {
        const params = {startTime: this.state.startTime,
                        endTime: this.state.endTime,
                        params: this.state.params};

        return (
            <div className="effect-view">
                <EffectHeader headerText="Reverb"
                              params={params} />
                <div className="volume-container">
                    <InputText labelText="Start Time"
                               inputValue={this.props.effect.startTime.toFixed(2)}
                               onChange={(e) => {
                                   this.setState({startTime: parseFloat(e.target.value)});
                               }} />
                    <InputText labelText="End Time"
                               inputValue={this.props.effect.endTime.toFixed(2)}
                               onChange={(e) => {
                                   this.setState({endTime: parseFloat(e.target.value)});
                               }}/>
                    <InputSlider labelText="Reverb"
                                 onChange={(e) => {
                                     this.setState({params: {reverberance: parseFloat(e.target.value)}});
                                 }}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    effect: state.waves[state.focusedStem].getEffect(state.effectId)
});

export default connect(mapStateToProps)(Reverb);
