import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import Loading from "./utils/Loading";
import {PauseIcon, RewindIcon, StopIcon, ForwardIcon,
        SyncIcon, MuteIcon, DownloadIcon, SoloIcon} from "./utils/Icon";
import { playPauseWave, skipWave, stopWave } from "./utils/PlayerUtils";

const waveOptions = (ref) => ({
    container: ref,
    responsive: true,
    waveColor: "#554080",
    progressColor: "#00ffc0",
    barWidth: 3,
    barRadius: 3,
    height: 100,
    showTime: true,
    customShowTimeStyle: {
        'background-color': '#000',
        color: '#fff',
        padding: '2px',
        'font-size': '10px'
    }
});

function Wave({isLoading}) {
    const waveRef = useRef(null);
    const waveSurfRef = useRef(null);
    const skipSec = 5;

    useEffect(() => {
       waveSurfRef.current = WaveSurfer.create(waveOptions(waveRef.current));
       waveSurfRef.current.load(`http://192.168.1.106:8080/song.mp3`) // use a url :(
    //    waveSurfRef.current.on('ready', function () {
    //        if(waveSurfRef.current) {
    //            waveSurfRef.current.setVolume(volume);
    //        }
    //    }); 

       return () => waveSurfRef.current.destroy();
    }, []);

    return (
        <div className="wave">
            <div className="wave__side">
                <RewindIcon onClick={() => skipWave(waveSurfRef.current, -skipSec)} title="Rewind" className="img_icons wave__side__actions" />
                <PauseIcon onClick={() => playPauseWave(waveSurfRef.current)} title="Pause" className="img_icons wave__side__actions" />
                <ForwardIcon onClick={() => skipWave(waveSurfRef.current, skipSec)} title="Forward" className="img_icons wave__side__actions" />
                <StopIcon onClick={() => stopWave(waveSurfRef.current)} title="Stop" className="img_icons wave__side__actions" />
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

function LoadingView() {
    return (
        <div className="loading-view">
            <div className="loading__step loading_step_complete">
                <p>Queued!</p>
                <div>tick</div>
            </div>
            <div className="loading__step loading_step_complete">
                <p>Processed!</p>
                <div>tick</div>
            </div>
            <div className="loading__step loading_step_pending">
                <p>Completed!</p>
                <div>tick</div>
            </div>
        </div>
    );
}

function MixerView({waves, setStem}) {
    return (
        <div className="mix-view">
            <div className="mix-header">
                <RewindIcon title="Rewind All" className="img_icons mix-item" />
                <PauseIcon title="Pause All" className="img_icons mix-item" />
                <ForwardIcon title="Forward All" className="img_icons mix-item" />
                <StopIcon title="Stop All" className="img_icons mix-item" />
                <SyncIcon title="Sync All" className="img_icons mix-item" />
            </div>
            <div className="mix-container">
                {waves.map(w => 
                    <div key={w.id} className="mix">
                        <div className="mix-title" onClick={() => setStem(w.stem)}>{w.stem}</div>
                        <div className="mix-gain">
                            <input className="mix-slider" min="0" max="100" type="range" orient="vertical" />
                        </div>
                        <div className="mix-control">
                            <MuteIcon title="Mute" className="img_icons mix-control-item" />
                            <SoloIcon title="Solo" className="img_icons mix-control-item" />
                            <DownloadIcon title="Download" className="img_icons mix-control-item" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function EffectView({stem, effects, setStem}) {
    return (
        <div className="effect-view">
            <div className="effect-header">
                <button className="effect-button" onClick={() => setStem("")}>Back</button>
                <p className="effect-name">{stem} effects</p>
            </div>
            <div className="effect-container">
                {effects.map(e => 
                    <div id={e.id} className="effect">
                    </div>
                )}
            </div>
        </div>
    );
}

function Mixer({isLoading, waves, effects}) {
    const [focusedStem, setFocusedStem] = useState();

    let view = <LoadingView />;
    if(!isLoading) {
        if(focusedStem) {
            view = <EffectView stem={focusedStem}
                               setStem={setFocusedStem}
                               effects={effects.filter(e => e.stem = focusedStem)} />;
        } else {
            view = <MixerView waves={waves} setStem={setFocusedStem}/>;
        }
    }
    return (
        <div className="mixer-container">
            {view}
        </div>
    );
}

function Player({isLoading}) {
    const waves = [
        {id: 0, stem: "Vocal"}, {id: 1, stem: "Piano"}, {id: 2, stem: "Bass"}, {id: 3, stem: "Other"}
    ];
    const effects = [
        {stem: "Vocal", effect: [{id: 0, name: "Echo"}]}, {stem: "Piano", effect: []}, {stem: "Bass", effect: []}, {stem: "Other", effect: []}, 
    ];
    return (
        <div className="player-container">
            <div className="wave-container">
               {waves.map(w => <Wave key={w.id} isLoading={isLoading} />)} 
            </div>
            <Mixer isLoading={isLoading} waves={waves} effects={effects}/>
        </div>
    );
}

export default Player;