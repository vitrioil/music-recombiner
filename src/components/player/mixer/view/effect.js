import { connect } from "react-redux";

import { setStem, setMixerView, setEffectId } from "../../../../redux/actions";
import { BackIcon } from "../../../utils/Icon";
import BaseView from "./base";


function EffectCell({id, name, setMixerView, setEffectId}) {
    const loadEffect = () => {
        setMixerView("generic-effect");
        setEffectId(id);
    };

    return (
        <div className="effect"
             onClick={loadEffect.bind(this)}>
            <p>{name}</p>
        </div>
    );
}

class EffectView extends BaseView {

    render() {
        const back = () => {
            this.props.setMixerView("mixer");
            this.props.setStem("");
        };

        return (
            <div className="effect-view">
                <div className="effect-header">
                    <BackIcon title="Back"
                              className="img_icons img_icons__sec"
                              onClick={back.bind(this)} />
                    <p className="effect-name">{`${this.props.stem} effects`}</p>
                </div>
                <div className="effect-container">
                    {this.props.effects.map(e => 
                        <EffectCell key={e.id}
                                    name={e.name}
                                    id={e.id}
                                    setMixerView={this.props.setMixerView}
                                    setEffectId={this.props.setEffectId} />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stem: state.focusedStem,
    effects: state.waves[state.focusedStem].getEffects()
});

const mapDispatchToProps = {
    setStem,
    setMixerView,
    setEffectId
}

export default connect(mapStateToProps, mapDispatchToProps)(EffectView);