function Wave() {
    return (
        <div className="wave">
        </div>
    );
}

function Mixer() {
    return (
        <div className="mixer-container"></div>
    );
}

function Player() {
    const waves = [0, 1, 2, 3];
    return (
        <div className="player-container">
            <div className="wave-container">
               {waves.map(w => <Wave />)} 
            </div>
            <Mixer />
        </div>
    );
}

export default Player;