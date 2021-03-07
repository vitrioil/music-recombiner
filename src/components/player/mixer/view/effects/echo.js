import BaseEffect from "./base";
import EffectHeader from "./header";

class Echo extends BaseEffect {
    render() {
        return (
            <div className="effect-view">
                <EffectHeader />
                <div className="echo-container">

                </div>
            </div>
        )
    }
}

export default Echo;