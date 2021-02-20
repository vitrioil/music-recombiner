function Button({className, buttonText, isToggleable = false}) {
    return <button className={className}>
        {buttonText}
    </button>
}