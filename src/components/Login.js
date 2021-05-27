import { useState } from "react";

import Loading from "./utils/Loading";
import { AlertIcon } from "./utils/Icon";
import { InputTextForm } from "./utils/Form";

function AppDescription() {
    return (
        <div className="desc">
            <h1>Signal Recombiner</h1>
        </div>
    )
}

function LoginForm() {
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    return (
        <div className="form">
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
            <div className="alternate">
                <button className="forgot">Forgot Password</button>
                <button className="register">Register</button>
            </div>
            {errorState && <div className="error-message">
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
    )
}

function Login() {

    return (
        <div className="login-container">
            <AppDescription />
            <LoginForm />
        </div>
    )
}

export default Login;