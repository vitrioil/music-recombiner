import { Link } from "react-router-dom";

import Loading from "./utils/Loading";

function Cell({title, isLoading}) {
    const loading = (
        <div className="saved__cell__loading">
            <Loading />
            <Link className="loading__open" to="/player"> Open </Link>
        </div>
    );
    return (
        <div className="saved__cell">
            <h2 className="saved__cell__title">{title}</h2>
            {isLoading ? loading:
                <>
                </>}
        </div>
    );
}

function Saved() {
    const cells = [{key: 1, isLoading: true, title: "One"},
                   {key: 2, isLoading: true, title: "Two"},
                   {key: 3, isLoading: true, title: "Three"},
                   {key: 4, isLoading: true, title: "Four"},
                   {key: 5, isLoading: true, title: "Five"}];
    return (
        <div className="saved-container">
            {cells.map(c => <Cell key={c.key} {...c}  />)}
        </div>
    );
}

export default Saved;