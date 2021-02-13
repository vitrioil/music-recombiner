import { Link } from "react-router-dom";

import {EditIcon, MenuIcon, ClockIcon} from "./utils/Icon";

function RouteNav() {
    return (
        <nav>
            <ul className="route__ul">
                <li className="nav_li route__li"> <Link to="/saved"> Saved </Link> </li>
                <li className="nav_li route__li"> <Link to="/"> Home </Link> </li>
                <li className="nav_li route__li"> <Link to="/Player"> Player </Link> </li>
            </ul>
        </nav>
    );
}

function PlayerNav() {
    return (
        <nav>
            <ul className="player__ul">
                <li className="nav_li player__li"> <Link to="/"> Back </Link> </li>
                <li className="nav_li player__li player__title"> Title </li>
                <li className="nav_li player__li img_icons">
                    Recent
                </li>
                <li className="nav_li player__li img_icons">
                    Edit
                </li>
            </ul>
        </nav>
    );
}

export { RouteNav, PlayerNav };