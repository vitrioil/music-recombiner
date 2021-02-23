import { Waveform } from "./utils/PlayerUtils";
import Mixer from "./mixer"; 
import Waves from "./wave";


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
            <Waves isLoading={isLoading} waves={waves} />
            <Mixer isLoading={isLoading} waves={waves} />
        </div>
    );
}

export default Player;