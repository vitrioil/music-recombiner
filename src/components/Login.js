import { useState } from "react";

import Loading from "./utils/Loading";
import { AlertIcon } from "./utils/Icon";
import { InputTextForm } from "./utils/Form";
import { setCookie } from "./utils/Auth";

function NonEmptyValidator(input) {
    let text = "Input cannot be empty";
    return input.length > 0 ? "": text;
}

function AppDescription() {
    return (
        <div className="desc">
            <h1>Signal Recombiner</h1>
        </div>
    )
}

const submitForm = async ({endpoint, payload}) => {
    const response = await fetch(endpoint, {
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        method: 'POST',
        body: payload
    });
    return response;
  }

function RegisterForm({setView}) {
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    const[emailValid, setEmailValid] = useState(false);
    const[passwordValid, setPasswordValid] = useState(false);
    const[confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    return (
        <div className="form form__register">
            <h3 className="header">
                Register
            </h3>
            <InputTextForm
                labelText="Email"
                inputValue=""
                errorState={errorState}
                validator={NonEmptyValidator}
                setValid={setEmailValid}
                onChange={() => setErrorState(false)} />
            <InputTextForm
                labelText="Password"
                inputValue=""
                errorState={errorState}
                validator={NonEmptyValidator}
                setValid={setPasswordValid}
                type="password"
                onChange={() => setErrorState(false)} />
            <InputTextForm
                labelText="Confirm Password"
                inputValue=""
                errorState={errorState}
                validator={NonEmptyValidator}
                setValid={setConfirmPasswordValid}
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
                disabled={!(emailValid && passwordValid && confirmPasswordValid)}
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

    const[emailValid, setEmailValid] = useState(false);

    return (
        <div className="form form__forgot">
            <h3 className="header">
                Reset Password
            </h3>
            <InputTextForm
                labelText="Email"
                inputValue=""
                errorState={errorState}
                validator={NonEmptyValidator}
                setValid={setEmailValid}
                onChange={() => setErrorState(false)} />
            {errorState && <div className="message info-message">
                <AlertIcon />
                <label className="info-text">
                    Password reset confirmation sent
                </label>
            </div>}
            {loadingState ? <Loading className="forgot-form-loading" />:
            <div className="form-horizontal-container">
                <button
                    disabled={!emailValid}
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

function LoginForm({setView, setLoggedIn}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    const[emailValid, setEmailValid] = useState(false);
    const[passwordValid, setPasswordValid] = useState(false);

    return (
        <div className="form form__login">
            <h3 className="header">
                Login
            </h3>
            <InputTextForm
                labelText="Email"
                inputValue=""
                setValue={setEmail}
                errorState={errorState}
                validator={NonEmptyValidator}
                setValid={setEmailValid}
                type="text"
                onChange={() => setErrorState(false)} />
            <InputTextForm
                labelText="Password"
                inputValue=""
                setValue={setPassword}
                errorState={errorState}
                validator={NonEmptyValidator}
                setValid={setPasswordValid}
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
                disabled={!(emailValid && passwordValid)}
                className="button login-button"
                onClick={async () => {
                    setLoadingState(true);
                    setErrorState(false);

                    let payload = {"grant_type": "password", "username": email, "password": password};
                    payload = Object.keys(payload).map(k => `${k}=${payload[k]}`).join('&');

                    let response = await submitForm({endpoint: `${process.env.REACT_APP_SEPARATOR_API}/token`, payload})
                    let token = await response.json();
                    setTimeout(() => {

                        if(response.status === 200) {
                            setLoadingState(false);
                            setLoggedIn(true);
                            setCookie("token", token["access_token"], 1);
                        } else {
                        // setTimeout(() => {
                            setErrorState(true);
                            setLoadingState(false);
                        // }, 1000);
                        }
                    }, 1000);
                }} >
                Login
            </button>}
        </div>
    );
}

function Login({setLoggedIn}) {
    const [view, setView] = useState("login");
    let form;

    if(view === "forgot") {
        form = <ForgotForm setView={setView} />;
    } else if (view === "register") {
        form = <RegisterForm setView={setView} />
    } else {
        form = <LoginForm setLoggedIn={setLoggedIn} setView={setView} />;
    }

    return (
        <div className="login-container">
            <AppDescription />
            {form}
        </div>
    )
}

export default Login;