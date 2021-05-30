function InputText({labelText, inputValue, onChange}) {
    return (
        <div className="input-container input__text">
            <label className="input-label" htmlFor="">
                {labelText}
            </label>
            <input className="input-text"
                   type="text"
                   name="input"
                   id=""
                   defaultValue={inputValue}
                   onChange={onChange} />
        </div>
    );
}

function InputTextForm({labelText, inputValue, onChange, onBlur, errorState=false, type="text", message=""}) {
    return (
        <div className="input-container__form input__text">
            <label className="input-label" htmlFor="">
                {labelText}
            </label>
            <input className="input-text"
                   type={type}
                   name="input"
                   id=""
                   defaultValue={inputValue}
                   onChange={onChange}
                   onBlur={onBlur} />
            {message && <p className="form-message error-message">{message}</p>}
            <span className={`border ${errorState ? "border__error": ""}`} />
        </div>
    );
}

function InputSlider({labelText, onChange}) {
    return (
        <div className="input-container input__slider">
            <label className="input-label" htmlFor="">
                {labelText}
            </label>
            <input className="input-slider input__slider__horizontal"
                   min="0" max="100" defaultValue="100"
                   type="range" orient="horizontal"
                   onChange={onChange} />
        </div>
    );
}

export { InputText, InputTextForm, InputSlider };