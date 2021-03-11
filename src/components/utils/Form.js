function InputText({labelText, inputValue, inputType}) {
    return (
        <div className="input-container">
            <label className="input-label"
                   htmlFor="">
                {labelText}
            </label>
            <input className="input-text"
                   type="text"
                   name="input"
                   id=""
                   value={inputValue} />
        </div>
    );
}

export { InputText };