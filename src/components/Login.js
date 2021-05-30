import { useState } from "react";

import Loading from "./utils/Loading";
import { AlertIcon } from "./utils/Icon";
import { InputText, InputTextForm } from "./utils/Form";

function AppDescription() {
    return (
        <div className="desc">
            <h1>Signal Recombiner</h1>
        </div>
    )
}

function RegisterForm({setView}) {
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    return (
        <div className="form form__login">
            <h3 className="header">
                Register
            </h3>
            <InputTextForm
                labelText="Email"
                inputValue=""
                errorState={errorState}
                onChange={() => setErrorState(false)} />
            <InputTextForm
                labelText="Password"
                inputValue=""
                errorState={errorState}
                type="password"
                onChange={() => setErrorState(false)} />
            <InputTextForm
                labelText="Confirm Password"
                inputValue=""
                errorState={errorState}
                type="password"
                onChange={() => setErrorState(false)} />
            <div className="alternate">
                <button
                    className="register"
                    onClick={() => setView("login")}>
                        Login
                </button>
            </div>
            {errorState && <div className="message error-message">
                <AlertIcon />
                <label className="error-text">
                    Incorrect Login Credentials
                </label>
            </div>}
            {loadingState ? <Loading />:
            <button
                className="button login-button"
                onClick={() => {
                    setErrorState(false);
                    setLoadingState(true);
                    setTimeout(() => {
                        setErrorState(true)
                        setLoadingState(false);
                    }, 1000);
                }} >
                    Register
            </button>}
        </div>
    );
}

function ForgotForm({setView}) {
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    return (
        <div className="form form__forgot">
            <h3 className="header">
                Reset Password
            </h3>
            <InputTextForm
                labelText="Email"
                inputValue=""
                errorState={errorState}
                onChange={() => setErrorState(false)} />
            {errorState && <div className="message info-message">
                <AlertIcon />
                <label className="info-text">
                    Password reset confirmation sent
                </label>
            </div>}
            {loadingState ? <Loading />:
            <div className="form-horizontal-container">
                <button
                    className="button login-button"
                    onClick={() => {
                        setErrorState(false);
                        setLoadingState(true);
                        setTimeout(() => {
                            setLoadingState(false)
                            setErrorState(true);
                        }, 1000);
                    }}>
                    Reset
                </button>
                <button 
                    className="button login-button"
                    onClick={() => setView("login")}>
                    Back
                </button>
            </div>}
        </div>
    );
}

function LoginForm({setView}) {
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    const exampleTextValidator = (event) => {
        let invalid = event.target.value.length > 5;
        if (invalid) {
            return "Invalid Input";
        }
        return "";
    };

    return (
        <div className="form form__login">
            <h3 className="header">
                Login
            </h3>
            <InputTextForm
                labelText="Email"
                inputValue=""
                errorState={errorState}
                onBlur={exampleTextValidator}
                onChange={() => setErrorState(false)} />
            <InputTextForm
                labelText="Password"
                inputValue=""
                errorState={errorState}
                onBlur={exampleTextValidator}
                type="password"
                onChange={() => setErrorState(false)} />
            <div className="alternate">
                <button
                    className="forgot"
                    onClick={() => setView("forgot")}>
                    Forgot Password
                </button>
                <button
                    className="register"
                    onClick={() => setView("register")}>
                    Register
                </button>
            </div>
            {errorState && <div className="message error-message">
                <AlertIcon />
                <label className="error-text">
                    Incorrect Login Credentials
                </label>
            </div>}
            {loadingState ? <Loading />:
            <button
                className="button login-button"
                onClick={() => {
                    setErrorState(false);
                    setLoadingState(true);
                    setTimeout(() => {
                        setErrorState(true)
                        setLoadingState(false);
                    }, 1000);
                }} >
                Login
            </button>}
        </div>
    );
}

function Login() {
    const [view, setView] = useState("login");
    let form;

    if(view === "forgot") {
        form = <ForgotForm setView={setView} />;
    } else if (view === "register") {
        form = <RegisterForm setView={setView} />
    } else {
        form = <LoginForm setView={setView} />;
    }

    return (
        <div className="login-container">
            <AppDescription />
            {form}
        </div>
    )
}

export default Login;