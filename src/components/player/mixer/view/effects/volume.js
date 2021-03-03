import { connect } from "react-redux";

import BaseEffect from "./base";
import { setEffectId, setMixerView } from "../../../../../redux/actions";

class Volume extends BaseEffect {
    render() {
        const back = () => {
            this.props.setEffectId("");
            this.props.setMixerView("effect");
        };

        return (
            <div className="effect-view">
                <div className="effect-header">
                    <button className="effect-button"
                            onClick={back.bind(this)}>
                        Back
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setEffectId,
    setMixerView
}

export default connect(null, mapDispatchToProps)(Volume);
