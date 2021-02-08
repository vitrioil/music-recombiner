import { useState } from "react";
import Loading from "./utils/Loading";

function Wave({isLoading}) {
    return (
        <div className="wave">
            <div className="wave__side">
                <button className="wave__side__button">Rew</button>
                <button className="wave__side__button">Play</button>
                <button className="wave__side__button">Pause</button>
                <button className="wave__side__button">Stop</button>
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
                <div className="mix-item">Re</div>
                <div className="mix-item">Pu</div>
                <div className="mix-item">Pl</div>
                <div className="mix-item">St</div>
                <div className="mix-item">Fo</div>
                <div className="mix-item">Sy</div>
            </div>
            <div className="mix-container">
                {waves.map(w => 
                    <div key={w.id} className="mix" onClick={() => setStem(w.stem)}>
                        <div className="mix-title">{w.stem}</div>
                        <div className="mix-gain"></div>
                        <div className="mix-control"></div>
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