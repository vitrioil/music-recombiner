import { Link } from "react-router-dom";
import { useEffect, createRef, useState } from "react";

import Loading from "./utils/Loading";
import {PauseIcon, RewindIcon, StopIcon, ForwardIcon,
        SyncIcon, MuteIcon, DownloadIcon, SoloIcon} from "./utils/Icon";
import {Waveform} from "./utils/PlayerUtils";


function Wave({wave, isLoading}) {
    const waveRef = createRef(null);
    const waveSurfRef = createRef(null);
    
    useEffect(() => {
        if(!isLoading) {
            wave.setRef(waveRef, waveSurfRef);
            wave.load();

            return () => {
                debugger;
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
                          className="img_icons mix-item" />
            </div>
            <div className="mix-container">
                {waves.map(w => 
                    <div key={w.id} className="mix">
                        <div className="mix-title" onClick={() => setStem(w.stem)}>
                            {w.stem}
                        </div>
                        <div className="mix-gain">
                            <input className="mix-slider"
                                   min="0" max="100"
                                   type="range" orient="vertical"
                                   onChange={(e) => w.setVolume(e.target.value)} />
                        </div>
                        <div className="mix-control">
                            <MuteIcon title="Mute"
                                      className="img_icons mix-control-item"
                                      onClick={() => w.mute()} />
                            <SoloIcon title="Solo" className="img_icons mix-control-item" />
                            <Link to={{ pathname: w.getUrl()}} target="_blank" download>
                                <DownloadIcon title="Download"
                                    className="img_icons mix-control-item" />
                            </Link>
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
                <button className="effect-button"
                        onClick={() => setStem("")}>
                        Back
                </button>
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
    console.log(
        "Player"
    );
    const url = "http://192.168.1.106:8080/song.mp3";
    const waveData = [
        {id: 0, stem: "Vocal", effect: [{id: 0, name: "Echo"}]},
        {id: 1, stem: "Piano", effect: []},
        {id: 2, stem: "Bass", effect: []},
        {id: 3, stem: "Other", effect: []}
    ];

    const waves = [];
    for(let wData of waveData) {
        let wave = new Waveform(wData.id, wData.stem, wData.effect, url);
        waves.push(wave);
    }

    return (
        <div className="player-container">
            <div className="wave-container">
               {waves.map(w => <Wave key={w.getId()} wave={w} isLoading={isLoading} />)} 
            </div>
            <Mixer isLoading={isLoading} waves={waves} />
        </div>
    );
}

export default Player;