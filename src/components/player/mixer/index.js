import { connect } from "react-redux";

import { LoadingView, EffectView, MixerView } from "./view";

function Mixer({isLoading, focusedStem}) {
    let view = <LoadingView />;
    if(!isLoading) {
        if(focusedStem !== "") {
            view = <EffectView />;
        } else {
            view = <MixerView />;
        }
    }
    return (
        <div className="mixer-container">
            {view}
        </div>
    );
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    focusedStem: state.focusedStem
});

export default connect(mapStateToProps)(Mixer);