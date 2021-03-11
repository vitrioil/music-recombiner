import { connect } from "react-redux";

import { setEffectId, setMixerView } from "../../../../../redux/actions";


function EffectHeader({headerText, setEffectId, setMixerView, buttonText="Back"}) {
    return (
        <div className="effect-header">
            <button className="effect-button"
                    onClick={() => {
                        setEffectId("");
                        setMixerView("effect");
                    }}>
                        {buttonText}
            </button>
            <p className="effect-name">{headerText}</p>
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