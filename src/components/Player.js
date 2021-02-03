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
                    <Loading className="progress__wave"/>:
                    <></>
                }
            </div>
        </div>
    );
}

function Mixer({isLoading}) {
    return (
        <div className="mixer-container"></div>
    );
}

function Player({isLoading}) {
    const waves = [0, 1, 2, 3];
    return (
        <div className="player-container">
            <div className="wave-container">
               {waves.map(w => <Wave key={w} isLoading={isLoading} />)} 
            </div>
            <Mixer />
        </div>
    );
}

export default Player;