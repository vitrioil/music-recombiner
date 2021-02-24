import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {PauseIcon, RewindIcon, StopIcon, ForwardIcon,
        SyncIcon} from "../../../utils/Icon";
import { setStem } from "../../../../redux/actions";
import Mix  from "../mix";


function MixerView({waves, setStem}) {
    const [soloStem, setSoloStem] = useState([]);
    const [sync, setSync] = useState(false);
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
                            onClick={() => {
                                waves.map((wave) => wave.rewind())
                            }} />
                <PauseIcon title="Pause All"
                           className="img_icons mix-item"
                           onClick={() => {
                               waves.map((wave) => wave.playPause())
                           }} />
                <ForwardIcon title="Forward All"
                             className="img_icons mix-item"
                             onClick={() => {
                                 waves.map((wave) => wave.forward())
                             }} />
                <StopIcon title="Stop All"
                          className="img_icons mix-item"
                          onClick={() => {
                              waves.map((wave) => wave.stop())
                          }} />
                <SyncIcon title="Sync All"
                          className={`img_icons mix-item${sync ? " img_icons__active": ""}`}
                          onClick={() => setSync(!sync)} />
            </div>
            <div className="mix-container">
                {waves.map(w => 
                    <Mix key={w.id}
                        wave={w}
                        setStem={setStem}
                        forceMute={ soloStem.length !== 0 &&
                                   !soloStem.includes(w.getName()) }
                        soloStem={soloStem} 
                        setSoloStem={setSoloStem}
                        sync={sync}
                        syncTime={syncTime}
                        setSyncTime={setSyncTime} />
                )}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    waves: state.waves
});

const mapDispatchToProps = {
    setStem
};

export default connect(mapStateToProps, mapDispatchToProps)(MixerView);