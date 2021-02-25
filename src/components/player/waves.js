import { connect } from "react-redux";

import Wave from "./wave";

function Waves({waves, isLoading}) {
    return (
        <div className="wave-container">
            {Object.entries(waves).map(([_, wave]) => (
                <Wave key={wave.getId()}
                      wave={wave}
                      isLoading={isLoading} />
            ))} 
        </div>
    )
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    waves: state.waves
});

export default connect(mapStateToProps)(Waves);