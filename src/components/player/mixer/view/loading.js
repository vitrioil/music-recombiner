import { connect } from "react-redux";

import BaseView from "./base";


class LoadingView extends BaseView {

    render() {
        return (
            <div className="loading-view">
                <div className="loading__step loading_step_complete">
                    <p>Queued!</p>
                    <div>tick</div>
                </div>
                <div className="loading__step loading_step_complete">
                    <p>Processed!</p>
                    <div>tick</div>
                </div>
                <div className="loading__step loading_step_pending">
                    <p>Completed!</p>
                    <div>tick</div>
                </div>
            </div>
        );
    }
}

export default connect()(LoadingView);