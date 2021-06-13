import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { MusicIcon, PlusIcon } from "./utils/Icon";
import Loading from "./utils/Loading";
import { getCookie } from "./utils/Auth";
import { setProject, setSignals } from "../redux/actions";
import Modal from "./utils/Modal";

function Upload() {
    return (
        <div className="upload">
            <h1>Upload Music</h1>
            <button className="upload__button">Upload</button>
            <button className="submit__button">Submit</button>
        </div>
    );
}

function AddCell() {
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <>
            <div className="saved__cell add__cell" onClick={() => setShowAddForm(true)}>
                <PlusIcon className="add__icon__cell" />
            </div>
            {showAddForm &&
                <Modal>
                    <Upload />
                </Modal>
            }
        </>
    )
}

//add signal schema
function Cell({signal, setProject}) {
    const stems = signal.separated_stems.length;
    const loading = (
        <div className="saved__cell__loading">
            <Loading />
        </div>
    );
    return (
        <div className="saved__cell">
            <div className="saved__cell__header">
                <MusicIcon className="saved__cell__type" />
                <h2 className="saved__cell__title">
                    {signal.signal_metadata.filename}
                </h2>
                <h3>{stems}</h3>
            </div>
            {false ? loading:
                <>
                </>}
            <Link
                className="loading__open"
                to="/player"
                onClick={() => {
                    setProject(signal.signal_id);
                }}>
                    Open
            </Link>
        </div>
    );
}

function Saved({signals, setProject, setSignals}) {
    const getSignalUrl = `${process.env.REACT_APP_SEPARATOR_API}/signal`;

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
            <AddCell />
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