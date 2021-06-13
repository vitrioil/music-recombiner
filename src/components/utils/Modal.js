function Backdrop() {
    return (
        <div className="backdrop">

        </div>
    )
}
function Modal(props) {
    return (
        <>
            <Backdrop />
            <div className="modal">
                {props.children}
            </div>
        </>
    )
}

export default Modal;