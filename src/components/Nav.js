import { Link } from "react-router-dom";

import { EditIcon, ClockIcon, BackIcon } from "./utils/Icon";

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
                <li className="nav_li player__li">
                    <Link to="/">
                        <BackIcon title="Back" className="img_icons" />
                    </Link>
                </li>
                <li className="nav_li player__li player__title"> Title </li>
                <li className="nav_li player__li">
                    <ClockIcon title="Recent" className="img_icons"/>
                </li>
                <li className="nav_li player__li">
                    <EditIcon title="Edit" className="img_icons"/>
                </li>
            </ul>
        </nav>
    );
}

export { RouteNav, PlayerNav };