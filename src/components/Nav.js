import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { EditIcon, ClockIcon, BackIcon } from "./utils/Icon";
import { toggleEdit, toggleSync } from "../redux/actions";

function LoginNav() {
    return (
        <nav>
            <ul className="login__ul">
                <li className="nav__li login__li"> <Link to="/"> Logo </Link> </li>
                <li className="nav__li login__li login__last"> <Link to="/"> About </Link> </li>
            </ul>
        </nav>
    )
}

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

function PlayerNav({edit, signal, toggleEdit}) {
    console.log(signal);
    return (
        <nav>
            <ul className="player__ul">
                <li className="nav_li player__li">
                    <Link to="/">
                        <BackIcon title="Back" className="img_icons img_icons__sec" />
                    </Link>
                </li>
                <li className="nav_li player__li player__title"> {signal.signal.signal_metadata.projectname} </li>
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
    signal: state.signals.find(s => s.signal.signal_id === state.openProject),
    edit: state.edit
});

const mapDispatchToPropsPlayer = {
    toggleEdit
}

PlayerNav = connect(mapStateToPropsPlayer, mapDispatchToPropsPlayer)(PlayerNav);

export { LoginNav, RouteNav, PlayerNav };