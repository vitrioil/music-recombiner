import { connect } from "react-redux";

import { setStem } from "../../../../redux/actions";

function EffectView({stem, effects, setStem}) {
    return (
        <div className="effect-view">
            <div className="effect-header">
                <button className="effect-button"
                        onClick={() => setStem("")}>
                        Back
                </button>
                <p className="effect-name">{stem} effects</p>
            </div>
            <div className="effect-container">
                {effects.map(e => 
                    <div id={e.id} className="effect">
                        {e.name}
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    stem: state.focusedStem,
    effects: state.waves[state.focusedStem].getEffects()
});

const mapDispatchToProps = {
    setStem
}

export default connect(mapStateToProps, mapDispatchToProps)(EffectView);