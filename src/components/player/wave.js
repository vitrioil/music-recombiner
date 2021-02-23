import { useEffect, createRef } from "react";

import Loading from "./utils/Loading";
import {PauseIcon, RewindIcon, StopIcon, ForwardIcon} from "./utils/Icon";


function Wave({wave, isLoading}) {
    const waveRef = createRef(null);
    const waveSurfRef = createRef(null);
    
    useEffect(() => {
        if(!isLoading) {
            wave.setRef(waveRef, waveSurfRef);
            wave.load();

            return () => {
                wave.destroy();
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

function Waves({isLoading, waves}) {
    return (
        <div className="wave-container">
            {waves.map(w => <Wave key={w.getId()} wave={w} isLoading={isLoading} />)} 
        </div>
    )
}

export default Waves;