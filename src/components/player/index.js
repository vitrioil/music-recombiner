import { useEffect } from "react";
import { connect } from "react-redux";

import { initWave } from "../../redux/actions";
import Mixer from "./mixer"; 
import Waves from "./waves";


function Player({signal, openProject, initWave}) {
    const stems = signal.signal.separated_stems;
    const url = `http://192.168.1.108:8000/signal/stem/${openProject}`;

    // useEffect(() => {
    for(let stem of stems) {
        initWave(stem, `${openProject}_${stem}`, [], `${url}/${stem}`);
    }
    // }, [openProject]);

    return (
        <div className="player-container">
            <Waves />
            <Mixer />
        </div>
    );
}

const mapStateToPropsPlayer = (state) => ({
    signal: state.signals.find(s => s.signal.signal_id === state.openProject),
    openProject: state.openProject
})

const mapDispatchToProps = {
    initWave
};

export default connect(mapStateToPropsPlayer, mapDispatchToProps)(Player);