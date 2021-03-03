import { connect } from "react-redux";

import Factory from "./view";

function Mixer({mixerView}) {
    const viewFactory = new Factory();
    const view = viewFactory.create(mixerView);

    return (
        <div className="mixer-container">
            {view}
        </div>
    );
}

const mapStateToProps = state => ({
    mixerView: state.mixerView.viewName
});

export default connect(mapStateToProps)(Mixer);