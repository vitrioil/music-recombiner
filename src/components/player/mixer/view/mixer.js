import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {PauseIcon, RewindIcon, StopIcon, ForwardIcon,
        SyncIcon} from "../../../utils/Icon";
import { toggleSync, setSync, setStem, rewindWave,
         playPauseWave, forwardWave, stopWave } from "../../../../redux/actions";
import Mix  from "../mix";


function MixerView({waves, sync, setStem, setSync, toggleSync, rewindWave, 
                    playPauseWave, forwardWave, stopWave}) {
    const [soloStem, setSoloStem] = useState([]);
    // const [sync, setSync] = useState(false);
    const [syncTime, setSyncTime] = useState(0);

    // time synced, reset sync
    useEffect(() => {
        setSync(false);
    }, [syncTime]);

    return (
        <div className="mix-view">
            <div className="mix-header">
                <RewindIcon title="Rewind All"
                            className="img_icons mix-item"
                            onClick={rewindWave} />
                <PauseIcon title="Pause All"
                           className="img_icons mix-item"
                           onClick={playPauseWave} />
                <ForwardIcon title="Forward All"
                             className="img_icons mix-item"
                             onClick={forwardWave} />
                <StopIcon title="Stop All"
                          className="img_icons mix-item"
                          onClick={stopWave} />
                <SyncIcon title="Sync All"
                          className={`img_icons mix-item${sync ? " img_icons__active": ""}`}
                          onClick={toggleSync} />
            </div>
            <div className="mix-container">
                {Object.entries(waves).map(([stem, wave]) => (
                    <Mix key={wave.getId()}
                        wave={wave}
                        setStem={setStem}
                        forceMute={ soloStem.length !== 0 &&
                                   !soloStem.includes(wave.getName()) }
                        soloStem={soloStem} 
                        setSoloStem={setSoloStem}
                        sync={sync}
                        syncTime={syncTime}
                        setSyncTime={setSyncTime} />
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    waves: state.waves,
    sync: state.sync.enabled
});

const mapDispatchToProps = {
    setStem,
    setSync,
    toggleSync,
    rewindWave,
    playPauseWave,
    forwardWave,
    stopWave
};

export default connect(mapStateToProps, mapDispatchToProps)(MixerView);