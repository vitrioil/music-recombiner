import { InputTextForm } from "./utils/Form";

function AppDescription() {
    return (
        <div className="desc">
            <h1>Signal Recombiner</h1>
        </div>
    )
}

function LoginForm() {
    return (
        <div className="form">
            <InputTextForm
                labelText="Email"
                inputValue=""
                onChange={() => {}} />
            <InputTextForm
                labelText="Password"
                inputValue=""
                onChange={() => {}} />
            <button className="button">
                Login
            </button>
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