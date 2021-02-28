import { connect } from "react-redux";

import {PauseIcon, RewindIcon, StopIcon, ForwardIcon,
        SyncIcon} from "../../../utils/Icon";
import { toggleSync, setSync, rewindWave,
         playPauseWave, forwardWave, stopWave } from "../../../../redux/actions";
import Mix  from "../mix";
import BaseView from "./base";


class MixerView extends BaseView {

    render() {
        return (
            <div className="mix-view">
                <div className="mix-header">
                    <RewindIcon title="Rewind All"
                                className="img_icons mix-item"
                                onClick={this.props.rewindWave} />
                    <PauseIcon title="Pause All"
                            className="img_icons mix-item"
                            onClick={this.props.playPauseWave} />
                    <ForwardIcon title="Forward All"
                                className="img_icons mix-item"
                                onClick={this.props.forwardWave} />
                    <StopIcon title="Stop All"
                            className="img_icons mix-item"
                            onClick={this.props.stopWave} />
                    <SyncIcon title="Sync All"
                            className={`img_icons mix-item${this.props.sync ? " img_icons__active": ""}`}
                            onClick={this.props.toggleSync} />
                </div>
                <div className="mix-container">
                    {Object.entries(this.props.waves).map(([_, wave]) => (
                        <Mix key={wave.getId()} wave={wave} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    waves: state.waves,
    sync: state.sync.enabled,
});

const mapDispatchToProps = {
    setSync,
    toggleSync,
    rewindWave,
    playPauseWave,
    forwardWave,
    stopWave
};

export default connect(mapStateToProps, mapDispatchToProps)(MixerView);