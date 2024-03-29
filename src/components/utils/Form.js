import { useState } from "react";


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

function InputTextForm({labelText, inputValue, setValue, onChange,
                        validator, setValid, errorState=false,
                        maxLength="100", type="text"}) {
    const [message, setMessage] = useState(null);

    const validate = (event) => {
        let invalidText = validator(event.target.value);
        setValid(invalidText.length === 0);
        setMessage(invalidText);
    };

    const onChangeInput = (event) => {
        console.log(setValue);
        setValue(event.target.value);
        onChange(event);
        validate(event);
    }
    return (
        <div className="input-container__form input__text">
            <label className="input-label" htmlFor="">
                {labelText}
            </label>
            <input className="input-text"
                   type={type}
                   maxLength={maxLength}
                   name="input"
                   id=""
                   defaultValue={inputValue}
                   onChange={onChangeInput}
                   onBlur={validate} />
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

function InputDropdown({labelText, options, setValue}) {
    return (
        <div className="input-container__form input__dropdown">
            <label htmlFor="" className="input-label">
                {labelText}
            </label>
            <select
                onChange={(e) => setValue(e.target.value)} >
                {options.map(element => 
                    <option value={element}>{element}</option>  
                )}
            </select>
        </div>
    )
}

export { InputText, InputTextForm, InputSlider, InputDropdown };