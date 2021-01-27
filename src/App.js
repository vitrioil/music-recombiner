import { BrowserRouter, Switch, Route } from "react-router-dom";

// Css
import './css/App.css';

// Components
import Home from "./components/Home";
import Nav from "./components/Nav";
import Saved from "./components/Saved";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/saved">
            <Saved />
          </Route>
          {/* <Route path="/player" exact render={Player} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
