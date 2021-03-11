import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { EditIcon, ClockIcon, BackIcon } from "./utils/Icon";
import { toggleEdit, toggleSync } from "../redux/actions";

function RouteNav() {
    return (
        <nav>
            <ul className="route__ul">
                <li className="nav_li route__li"> <Link to="/saved"> Saved </Link> </li>
                <li className="nav_li route__li"> <Link to="/"> Home </Link> </li>
                <li className="nav_li route__li"> <Link to="/player"> Player </Link> </li>
            </ul>
        </nav>
    );
}

function PlayerNav({edit, toggleEdit}) {
    return (
        <nav>
            <ul className="player__ul">
                <li className="nav_li player__li">
                    <Link to="/">
                        <BackIcon title="Back" className="img_icons img_icons__sec" />
                    </Link>
                </li>
                <li className="nav_li player__li player__title"> Title </li>
                <li className="nav_li player__li">
                    <ClockIcon title="Recent" className="img_icons img_icons__sec"/>
                </li>
                <li className="nav_li player__li">
                    <EditIcon title="Edit"
                              className={`img_icons img_icons__sec${edit ? " img_icons__sec__active": ""}`}
                              onClick={toggleEdit} />
                </li>
            </ul>
        </nav>
    );
}

const mapStateToPropsPlayer = state => ({
    edit: state.edit
});

const mapDispatchToPropsPlayer = {
    toggleEdit
}

PlayerNav = connect(mapStateToPropsPlayer, mapDispatchToPropsPlayer)(PlayerNav);

export { RouteNav, PlayerNav };