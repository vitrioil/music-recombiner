import { Link } from "react-router-dom";

function RouteNav() {
    return (
        <nav>
            <ul className="route__ul">
                <li className="route__li"> <Link to="/saved"> Saved </Link> </li>
                <li className="route__li"> <Link to="/"> Home </Link> </li>
                <li className="route__li"> <Link to="/Player"> Player </Link> </li>
            </ul>
        </nav>
    );
}

function PlayerNav() {
    return (
        <nav>
            <ul className="player__ul">
                <li className="player__li"> <Link to="/"> Back </Link> </li>
                <li className="player__title"> Title </li>
                <li className="player__li"> Menu </li>
                <li className="player__li"> Edit </li>
            </ul>
        </nav>
    );
}

export { RouteNav, PlayerNav };