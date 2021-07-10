import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { MusicIcon, PlusIcon, XIcon } from "./utils/Icon";
import Loading from "./utils/Loading";
import { getAuthCall, postAuthCall, deleteAuthCall } from "./utils/Auth";
import { setProject, setSignals } from "../redux/actions";
import Modal from "./utils/Modal";
import { InputTextForm, InputDropdown } from "./utils/Form";
import FileUpload from "./utils/FileUpload";

async function fetchSignals(setSignals) {
    const getSignalUrl = `${process.env.REACT_APP_SEPARATOR_API}/signal`;
    const {response, controller} = await getAuthCall(getSignalUrl);
    if(response.status === 200) {
        let data = await response.json();
        setSignals(data);
    } else {
        //error handling
    }
    return controller;
}

function AddCell({setSignals}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [fileStatus, setFileStatus] = useState(false);
    const [fileText, setFileText] = useState("Upload File");

    const [projectName, setProjectName] = useState("");
    const [signalType, setSignalType] = useState("Music");
    const [stem, setStem] = useState(2);
    const [file, setFile] = useState();

    const submitForm = async () => {
        setLoadingState(true);
        setErrorState(false);

        const {response, controller} = await postAuthCall(`${process.env.REACT_APP_SEPARATOR_API}/signal/${signalType}?stems=${stem}&project_name=${projectName}`, file);
        setTimeout(async () => {

            if(response.status === 201) {
                setLoadingState(false);
                setShowAddForm(false);
                setErrorState(false);
                await fetchSignals(setSignals);
            } else {
                setErrorState(true);
                setLoadingState(false);
            }
        }, 1000);
        setTimeout(() => {
            controller.abort();
            setLoadingState(false);
            setErrorState(true);
        }, 5000);
    }

    return (
        <>
            <div className="saved__cell add__cell" onClick={() => setShowAddForm(true)}>
                <PlusIcon className="add__icon__cell" />
            </div>
            <Modal show={showAddForm} modalClosed={() => {setShowAddForm(false)}}>
                <div className="modal-form">
                    <h1>Upload Project</h1>
                    <InputTextForm
                        labelText="Project Name"
                        maxLength="15"
                        inputValue=""
                        setValue={setProjectName}
                        errorState={errorState}
                        validator={(input) => {
                            return input.length > 0 ? "": "Project Name Required"
                        }}
                        setValid={setNameValid}
                        onChange={() => setErrorState(false)} />
                    <div className="form-input-signal-param">
                        <InputDropdown
                            labelText="Signal Type"
                            setValue={setSignalType}
                            options={["Music", "Speech"]} />
                        <InputDropdown
                            labelText="No. Stems"
                            setValue={setStem}
                            options={[2, 4, 5]} />
                    </div>
                    <FileUpload
                        setFile={setFile}
                        setFileStatus={setFileStatus}
                        fileText={fileText}
                        setFileText={setFileText} />
                    {loadingState ? <Loading className="upload-progress" />:
                    <div className="form-interaction">
                        <button
                            className="button"
                            disabled={!(nameValid && fileStatus)}
                            onClick={async() => {
                                await submitForm();
                            }}>
                            Upload
                        </button>
                        <button
                            className="button"
                            onClick={() => setShowAddForm(false)}>
                            Close
                        </button>
                    </div>}
                </div>
            </Modal>
        </>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        };
        if(delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [callback, delay]);
}

//add signal schema
function Cell({signal, setProject, setSignals}) {
    const [cellLoading, setCellLoading] = useState(signal.separated_stems.length === 0);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [deleteLoadingState, setDeleteLoadingState] = useState(false);

    const stems = signal.separated_stems.length;

    useInterval(async() => {
        if(cellLoading) {
            const {response, controller} = await getAuthCall(`${process.env.REACT_APP_SEPARATOR_API}/signal/state/${signal.signal_id}`);
            const signalState = await response.json();
            if(signalState["signal_state"] === "Complete") {
                setCellLoading(false);
            }
        }
    }, 5000);

    const submitForm = async () => {
        setDeleteLoadingState(true);

        const {response, controller} = await deleteAuthCall(`${process.env.REACT_APP_SEPARATOR_API}/signal/${signal.signal_id}`);
        setTimeout(async () => {

            if(response.status === 202) {
                setDeleteLoadingState(false);
                setShowDeleteForm(false);
                await fetchSignals(setSignals);
            } else {
                setDeleteLoadingState(false);
            }
        }, 1000);
        setTimeout(() => {
            controller.abort();
            setDeleteLoadingState(false);
        }, 5000);
    }

    const loading = (
        <div className="saved__cell__loading">
            <Loading />
        </div>
    );

    return (
        <>
            <div className="saved__cell">
                <div className="saved__cell__header">
                    <MusicIcon className="saved__cell__type" />
                    <h2 className="saved__cell__title">
                        {signal.signal_metadata.projectname}
                    </h2>
                    <XIcon
                        className="saved__cell__delete"
                        onClick={() => {setShowDeleteForm(true)}} />
                </div>
                {cellLoading ? loading:
                <Link
                    className="loading__open"
                    to="/player"
                    onClick={() => {
                        setProject(signal.signal_id);
                    }}>
                        Open
                </Link>}
            </div>
            <Modal
                show={showDeleteForm}
                modalClosed={() => {setShowDeleteForm(false)}}>
                <div className="modal-form modal-form__delete">
                    <h1>Delete Project</h1>
                    <h2>Do you want to delete this project?</h2>
                    {deleteLoadingState ? <Loading /> :
                    <div className="form-interaction">
                        <button
                            className="button error-message"
                            onClick={async() => {
                                await submitForm();
                            }}>
                                Delete
                        </button>
                        <button
                            className="button"
                            onClick={() => setShowDeleteForm(false)}>
                            Close
                        </button>
                    </div>}
                </div>
            </Modal>
        </>
    );
}

function Saved({signals, setProject, setSignals}) {

    useEffect(async () => {
      const controller = await fetchSignals(setSignals);
      return () => {controller.abort()};
    }, []);

    return (
        <div className="saved-container">
            <AddCell setSignals={setSignals} />
            {signals.map(c => <Cell
                                key={c.signal.signal_id}
                                setProject={setProject}
                                signal={c.signal}
                                setSignals={setSignals} />)}
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