import { useState } from "react";
import Loading from "./utils/Loading";

import {PauseIcon, RewindIcon, StopIcon, ForwardIcon,
        SyncIcon, MuteIcon, DownloadIcon, SoloIcon} from "./utils/Icon";

function Wave({isLoading}) {
    return (
        <div className="wave">
            <div className="wave__side">
                <img title="Rewind" className="img_icons wave__side__actions" src={RewindIcon} alt="Rewind"/>
                <img title="Pause" className="img_icons wave__side__actions" src={PauseIcon} alt="Pause" />
                <img title="Forward" className="img_icons wave__side__actions" src={ForwardIcon} alt="Forward" />
                <img title="Stop" className="img_icons wave__side__actions" src={StopIcon} alt="Stop" />
            </div>
            <div className="wave__content">
                {isLoading ?
                    <Loading className="progress__wave"/>
                    :
                    <Loading className="progress__wave"/>
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
                <img title="Rewind All" className="img_icons mix-item" src={RewindIcon} alt="Rewind" />
                <img title="Pause All" className="img_icons mix-item" src={PauseIcon} alt="Pause" />
                <img title="Forward All" className="img_icons mix-item" src={ForwardIcon} alt="Forward" />
                <img title="Stop All" className="img_icons mix-item" src={StopIcon} alt="Stop" />
                <img title="Sync All" className="img_icons mix-item" src={SyncIcon} alt="Sync" />
            </div>
            <div className="mix-container">
                {waves.map(w => 
                    <div key={w.id} className="mix">
                        <div className="mix-title" onClick={() => setStem(w.stem)}>{w.stem}</div>
                        <div className="mix-gain">
                            <input className="mix-slider" min="0" max="100" type="range" orient="vertical" />
                        </div>
                        <div className="mix-control">
                            <img title="Mute" className="img_icons mix-control-items" src={MuteIcon} alt="Mute" />
                            <img title="Solo" className="img_icons mix-control-items" src={SoloIcon} alt="Solo" />
                            <img title="Download" className="img_icons mix-control-items" src={DownloadIcon} alt="Download" />
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