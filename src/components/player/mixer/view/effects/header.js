import { connect } from "react-redux";

import { setEffectId, setMixerView } from "../../../../../redux/actions";


function EffectHeader({name, setEffectId, setMixerView}) {
    return (
        <div className="effect-header">
            <button className="effect-button"
                    onClick={() => {
                        setEffectId("");
                        setMixerView("effect");
                    }}>
                Back
            </button>
            <p className="effect-name">{name}</p>
        </div>
    );
}

const mapStateToProps = state => ({
    name: state.waves[state.focusedStem].getEffectName(state.mixerView.id)
});

const mapDispatchToProps = {
    setEffectId,
    setMixerView
}

export default connect(mapStateToProps, mapDispatchToProps)(EffectHeader);