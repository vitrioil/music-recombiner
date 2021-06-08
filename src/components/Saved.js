import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loading from "./utils/Loading";
import { getCookie } from "./utils/Auth";
import { setProject, setSignals } from "../redux/actions";

//add signal schema
function Cell({signal, setProject}) {
    console.log(signal);
    const loading = (
        <div className="saved__cell__loading">
            <Loading />
            <Link
                className="loading__open"
                to="/player"
                onClick={() => {
                    console.log(signal.signal_id);
                    setProject(signal.signal_id);
                }}>
                    Open
            </Link>
        </div>
    );
    return (
        <div className="saved__cell">
            <h2 className="saved__cell__title">{signal.signal_metadata.filename}</h2>
            {true ? loading:
                <>
                </>}
        </div>
    );
}

function Saved({signals, setProject, setSignals}) {
    const getSignalUrl = "http://192.168.1.108:8000/signal/";

    useEffect(() => {
      async function fetchSignals() {
        const controller = new AbortController();
        const { signal } = controller;
        const response = await fetch(getSignalUrl, {
            headers: new Headers({"Authorization": `Bearer ${getCookie("token")}`}),
            method: "GET",
            signal: signal
        });
        if(response.status === 200) {
            let data = await response.json();
            setSignals(data);
        } else {
            //error handling
        }
        return () => {controller.abort()};
      }
      fetchSignals();
    }, []);

    return (
        <div className="saved-container">
            {signals.map(c => <Cell key={c.signal.signal_id} setProject={setProject} signal={c.signal}  />)}
        </div>
    );
}

const mapStateToPropsPlayer = (state) => ({
    signals: state.signals
});

const mapDispatchToPropsPlayer = {
    setProject,
    setSignals
}

export default connect(mapStateToPropsPlayer, mapDispatchToPropsPlayer)(Saved);