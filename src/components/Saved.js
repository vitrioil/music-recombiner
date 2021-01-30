import { Link } from "react-router-dom";

function Cell({title, isLoading}) {
    const loading = (
        <div className="saved__cell__loading">
            <div className="loading__progress"></div>
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
    const cells = [{isLoading: true, title: "One"},
                   {isLoading: true, title: "Two"},
                   {isLoading: true, title: "Three"},
                   {isLoading: true, title: "Four"},
                   {isLoading: true, title: "Five"}];
    return (
        <div className="saved-container">
            {cells.map(c => <Cell {...c}  />)}
        </div>
    );
}

export default Saved;