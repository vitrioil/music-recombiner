import { connect } from "react-redux";

// import { LoadingView, EffectView, MixerView } from "./view";
import Factory from "./view/factory";

function Mixer({mixerView}) {
    const viewFactory = new Factory();
    // let type = "loading";
    // if(!isLoading)

    // let view = <LoadingView />;
    // if(!isLoading) {
    //     if(focusedStem !== "") {
    //         view = <EffectView />;
    //     } else {
    //         view = <MixerView />;
    //     }
    // }

    const view = viewFactory.create(mixerView);
    return (
        <div className="mixer-container">
            {view}
        </div>
    );
}

const mapStateToProps = state => ({
    mixerView: state.mixerView
});

export default connect(mapStateToProps)(Mixer);