import { useEffect, createRef } from "react";

import Loading from "../utils/Loading";
import {PauseIcon, RewindIcon, StopIcon, ForwardIcon} from "../utils/Icon";
import { addRefWave, destroyWave, loadWave } from "../../redux/actions";
import { connect } from "react-redux";

function Wave({wave, isLoading, addRefWave, loadWave, destroyWave}) {
    const waveRef = createRef(null);
    const waveSurfRef = createRef(null);
    
    useEffect(() => {
        if(!isLoading) {
            addRefWave(wave.getName(), waveRef, waveSurfRef);
            loadWave(wave.getName());

            return () => {
                destroyWave(wave.getName());
            };
        }
    }, [isLoading]);

    return (
        <div className="wave">
            <div className="wave__side">
                <RewindIcon onClick={() => wave.rewind()}
                            title="Rewind"
                            className="img_icons wave__side__actions" />
                <PauseIcon onClick={() => wave.playPause()}
                           title="Pause"
                           className="img_icons wave__side__actions" />
                <ForwardIcon onClick={() => wave.forward()}
                             title="Forward"
                             className="img_icons wave__side__actions" />
                <StopIcon onClick={() => wave.stop()}
                          title="Stop"
                          className="img_icons wave__side__actions" />
            </div>
            <div className="wave__content">
                {isLoading ?
                    <Loading className="progress__wave"/>
                    :
                    <div className="waveform" ref={waveRef}></div>
                }
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    addRefWave,
    loadWave,
    destroyWave
};

export default connect(null, mapDispatchToProps)(Wave);