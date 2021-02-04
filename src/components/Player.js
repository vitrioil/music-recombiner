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
                    <></>
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

function MixerView({waves}) {
    return (
        <div className="mixer-view">
            {waves.map(w => 
                <div key={w} className="mixer">
                </div>
            )}
        </div>
    );
}

function Mixer({isLoading, waves}) {
    return (
        <div className="mixer-container">
            {isLoading ?
                <LoadingView />
                :
                <MixerView waves={waves}/>
            }
        </div>
    );
}

function Player({isLoading}) {
    const waves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className="player-container">
            <div className="wave-container">
               {waves.map(w => <Wave key={w} isLoading={isLoading} />)} 
            </div>
            <Mixer isLoading={isLoading} waves={waves}/>
        </div>
    );
}

export default Player;