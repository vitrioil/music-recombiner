import BaseEffect from "./base";
import EffectHeader from "./header";

class Volume extends BaseEffect {
    render() {
        return (
            <div className="effect-view">
                <EffectHeader headerText="Volume" />
                <div className="volume-container">

                </div>
            </div>
        )
    }
}

export default Volume;