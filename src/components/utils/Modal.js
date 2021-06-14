function Backdrop({close}) {
    return (
        <div className="backdrop" onClick={close}>

        </div>
    )
}
function Modal(props) {
    if(!props.show) {
        return (<></>);
    }

    return (
        <>
            <Backdrop close={props.modalClosed}/>
            <div className="modal">
                {props.children}
            </div>
        </>
    )
}

export default Modal;