import { connect } from "react-redux";

import { initWave } from "../../redux/actions";
import Mixer from "./mixer"; 
import Waves from "./waves";


function Player({signal, initWave}) {
    // make API call here or pass...
    console.log(signal);
    const signalId = signal.signal.signal_id;
    const stems = signal.signal.separated_stems;
    const url = `http://192.168.1.108:8000/signal/stem/${signalId}`;

    const waveData = [
        {id: 0, stem: "Vocal", url: url + "vocals.mp3", effect: []},
        {id: 1, stem: "Piano", url: url + "piano.mp3", effect: []},
        {id: 2, stem: "Bass", url: url + "bass.mp3", effect: []},
        {id: 3, stem: "Drums", url: url + "drums.mp3", effect: []},
        {id: 4, stem: "Other", url: url + "other.mp3", effect: []}
    ];

    for(let stem of stems) {
        initWave(stem, `${signalId}_${stem}`, [], `${url}/${stem}`);
    }

    return (
        <div className="player-container">
            <Waves />
            <Mixer />
        </div>
    );
}

const mapStateToPropsPlayer = (state) => ({
    signal: state.signals.find(s => s.signal.signal_id === state.openProject)
})

const mapDispatchToProps = {
    initWave
};

export default connect(mapStateToPropsPlayer, mapDispatchToProps)(Player);