import { connect } from "react-redux";

import { setStem, setMixerView } from "../../../../redux/actions";
import BaseView from "./base";


function EffectCell({name}) {
    return (
        <div className="effect">
            <p>{name}</p>
        </div>
    );
}

class EffectView extends BaseView {

    render() {
        return (
            <div className="effect-view">
                <div className="effect-header">
                    <button className="effect-button"
                            onClick={() => {
                                        this.props.setMixerView("mixer");
                                        this.props.setStem("");
                                    }}>
                            Back
                    </button>
                    <p className="effect-name">{`${this.props.stem} effects`}</p>
                </div>
                <div className="effect-container">
                    {this.props.effects.map(e => 
                        <EffectCell key={e.id} name={e.name} />
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
    setMixerView
}

export default connect(mapStateToProps, mapDispatchToProps)(EffectView);