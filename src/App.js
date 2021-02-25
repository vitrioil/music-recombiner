import { BrowserRouter, Switch, Route } from "react-router-dom";

// Css
import './css/App.css';

// Components
import Home from "./components/Home";
import {RouteNav, PlayerNav} from "./components/Nav";
import Saved from "./components/Saved";
import Player from "./components/player";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // setTimeout(() => setIsLoading(false), 500);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <RouteNav />
            <Home />
          </Route>
          <Route path="/saved">
            <RouteNav />
            <Saved />
          </Route>
          <Route path="/player">
            <PlayerNav />
            <Player />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
