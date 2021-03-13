import { connect } from "react-redux";

import { BackIcon, CopyIcon, CrossIcon, SaveIcon } from "../../../../utils/Icon"; 
import { setEffectId, setMixerView, deleteEffect, setEffectParams } from "../../../../../redux/actions";


function EffectHeader({headerText, params, setEffectId, setMixerView, deleteEffect,
                       setEffectParams, buttonText="Back", deleteText="Delete",
                       showBack=true, showCopy=true}) {
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
                      className="img_icons img_icons__sec"
                      onClick={() => {
                        setEffectParams(params); 
                      }}/>
            <p className="effect-name">{headerText}</p>
        </div>
    );
}

const mapDispatchToProps = {
    setEffectId,
    setMixerView,
    deleteEffect,
    setEffectParams
}

export default connect(null, mapDispatchToProps)(EffectHeader);