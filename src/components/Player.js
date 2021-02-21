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

function Mix({wave, setStem, forceMute, soloStem, setSoloStem, sync, syncTime, setSyncTime}) {
    const [isMute, setIsMute] = useState(false);

    if(forceMute) {
        wave.mute();
    }

    // when solo state changes, one solo active to zero --> unmute all
    useEffect(() => {
        if(soloStem.length === 0) {
            wave.mute(false);
            setIsMute(false);
        }
    }, [soloStem]);

    // set sync time
    useEffect(() => {
        if(sync) {
            wave.seek(syncTime)
        }
    }, [wave, syncTime]);
    
    useEffect(() => {
        if(sync) {
            const onSeekUpdateTime = (progress) => {
                setSyncTime(progress);
            };
            wave.addEvent("seek", onSeekUpdateTime);
        }
    }, [sync]);

    return (
        <div className="mix">
            <div className="mix-title" onClick={() => setStem(wave.getName())}>
                {wave.getName()}
            </div>
            <div className="mix-gain">
                <input className="mix-slider"
                       min="0" max="100" value="100"
                       type="range" orient="vertical"
                       onChange={(e) => wave.setVolume(e.target.value)} />
            </div>
            <div className="mix-control">
                <MuteIcon title="Mute"
                          className={`img_icons mix-control-item${isMute ? " img_icons__active": ""}`}
                          onClick={() => {
                            wave.toggleMute();
                            setIsMute(wave.isMute());
                          }} />
                <SoloIcon title="Solo"
                          className={`img_icons mix-control-item${soloStem.length === 0 || forceMute ? "": " img_icons__active"}`}
                          onClick={() => {
                            let name = wave.getName(),
                                tempSoloStem = soloStem.filter(i => i !== name);
                            if(tempSoloStem.length !== soloStem.length) {
                                // remove solo
                                setSoloStem(tempSoloStem);
                                if(tempSoloStem.length !== 0) {
                                    wave.mute(true);
                                } else {
                                    wave.mute(false);
                                }
                            } else {
                                // solo
                                setSoloStem([...soloStem, name])
                                wave.mute(false);
                            }
                          }} />
                <Link to={{ pathname: wave.getUrl()}} target="_blank" download>
                    <DownloadIcon title="Download"
                        className="img_icons mix-control-item" />
                </Link>
            </div>
        </div>
    );
}

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
                        {e.name}
                    </div>
                )}
            </div>
        </div>
    );
}

function Mixer({isLoading, waves}) {
    const [focusedStem, setFocusedStem] = useState();

    let view = <LoadingView />;
    if(!isLoading) {
        if(focusedStem) {
            let [wave] = waves.filter(w => w.getName() === focusedStem);
            view = <EffectView stem={focusedStem}
                               setStem={setFocusedStem}
                               effects={wave.getEffects()} />;
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
    const url = "http://192.168.1.106:8080/";
    const waveData = [
        {id: 0, stem: "Vocal", url: url + "vocals.mp3", effect: [{id: 0, name: "Echo"}]},
        {id: 1, stem: "Piano", url: url + "piano.mp3", effect: []},
        {id: 2, stem: "Bass", url: url + "bass.mp3", effect: []},
        {id: 3, stem: "Drums", url: url + "drums.mp3", effect: []},
        {id: 4, stem: "Other", url: url + "other.mp3", effect: []}
    ];

    const waves = [];
    for(let wData of waveData) {
        let wave = new Waveform(wData.id, wData.stem, wData.effect, wData.url);
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