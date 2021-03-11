import { connect } from "react-redux";

import { BackIcon, CopyIcon, CrossIcon, SaveIcon } from "../../../../utils/Icon"; 
import { setEffectId, setMixerView, deleteEffect } from "../../../../../redux/actions";


function EffectHeader({headerText, setEffectId, setMixerView, deleteEffect,
                       buttonText="Back", deleteText="Delete", showBack=true,
                       showCopy=true}) {
    return (
        <div className="effect-header">
            {showBack && <BackIcon title={buttonText}
                                   className="img_icons img_icons__sec"
                                   onClick={() => {
                                        setEffectId("");
                                        setMixerView("effect");
                                   }} />}
            <CrossIcon title={deleteText}
                       className="img_icons img_icons__sec"
                       onClick={() =>{
                        deleteEffect();
                       }} />
            {showCopy && <CopyIcon title="Copy"
                                   className="img_icons img_icons__sec" /> }
            <SaveIcon title="Save"
                      className="img_icons img_icons__sec"/>
            <p className="effect-name">{headerText}</p>
        </div>
    );
}

const mapStateToProps = state => ({
    name: state.waves[state.focusedStem].getEffectName(state.mixerView.id)
});

const mapDispatchToProps = {
    setEffectId,
    setMixerView,
    deleteEffect
}

export default connect(mapStateToProps, mapDispatchToProps)(EffectHeader);