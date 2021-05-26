import { connect } from "react-redux";

import { initWave } from "../../redux/actions";
import Mixer from "./mixer"; 
import Waves from "./waves";


function Player({initWave}) {
    // make API call here or pass...
    const url = "http://192.168.1.108:8080/";
    const waveData = [
        {id: 0, stem: "Vocal", url: url + "vocals.mp3", effect: []},
        {id: 1, stem: "Piano", url: url + "piano.mp3", effect: []},
        {id: 2, stem: "Bass", url: url + "bass.mp3", effect: []},
        {id: 3, stem: "Drums", url: url + "drums.mp3", effect: []},
        {id: 4, stem: "Other", url: url + "other.mp3", effect: []}
    ];

    for(let wData of waveData) {
        initWave(wData.stem, wData.id, wData.effect, wData.url);
    }

    return (
        <div className="player-container">
            <Waves />
            <Mixer />
        </div>
    );
}

const mapDispatchToProps = {
    initWave
};

export default connect(null, mapDispatchToProps)(Player);