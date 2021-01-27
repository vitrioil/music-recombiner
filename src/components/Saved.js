function Cell() {
    return (
        <div className="saved__cell">
        </div>
    );
}

function Saved() {
    const cells = [0, 1, 2, 3, 4, 5];
    return (
        <div className="saved-container">
            {cells.map(c => <Cell />)}
        </div>
    );
}

export default Saved;