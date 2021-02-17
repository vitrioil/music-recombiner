import { BrowserRouter, Switch, Route } from "react-router-dom";

// Css
import './css/App.css';

// Components
import Home from "./components/Home";
import {RouteNav, PlayerNav} from "./components/Nav";
import Saved from "./components/Saved";
import Player from "./components/Player";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => setIsLoading(false), 500);

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
            <Player isLoading={isLoading}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
