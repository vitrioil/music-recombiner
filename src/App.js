import { BrowserRouter, Switch, Route } from "react-router-dom";

// Css
import './css/App.css';

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import {LoginNav, RouteNav, PlayerNav} from "./components/Nav";
import Saved from "./components/Saved";
import Player from "./components/player";
import { useEffect, useState } from "react";

import { getCookie } from "./components/utils/Auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  //creates weird effect that shows login for ~1ms
  useEffect(() => {
    async function checkLoggedIn() {
        const controller = new AbortController();
        const { signal } = controller;
        const response = await fetch("http://127.0.0.1:8000/signal", {
            headers: new Headers({"Authorization": `Bearer ${getCookie("token")}`}),
            method: "GET",
            signal: signal
        });

        if(response.status === 200) {
          setLoggedIn(true);
        }

        return () => {controller.abort()};
    }
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            {loggedIn ? 
              <>
                <RouteNav />
                <Home />
              </>:
              <>
                <LoginNav />
                <Login setLoggedIn={setLoggedIn} />
              </>
            }
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
