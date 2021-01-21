import { BrowserRouter, Switch, Route } from "react-router-dom";

// Css
import './css/App.css';

// Components
import Home from "./components/Home";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact render={Home} />
          {/* <Route path="/saved" exact render={Saved} />
          <Route path="/player" exact render={Player} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
