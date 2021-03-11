import { connect } from "react-redux";

import BaseEffect from "./base";
import EffectHeader from "./header";
import { setEffectName } from "../../../../../redux/actions";


function EffectCell({effectName, setEffectName}) {
    return (
        <div className="effect"
             onClick={() => {
                 setEffectName(effectName);
             }}>
            <p>{effectName}</p>
        </div>
    );
}

class Select extends BaseEffect {
    render() {
        const allEffects = ["echo", "volume"];
        return (
            <div className="effect-view">
                <EffectHeader buttonText="Cancel" headerText="Select Effect" />
                <div className="effect-container">
                    {allEffects.map(effect => 
                        <EffectCell key={effect}
                                    effectName={effect}
                                    setEffectName={this.props.setEffectName} />
                    )}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setEffectName    
};

export default connect(null, mapDispatchToProps)(Select);