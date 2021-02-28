import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {MuteIcon, DownloadIcon, SoloIcon} from "../../utils/Icon";
import { setStem, setSync, setSyncTime, setSolo, setMixerView } from "../../../redux/actions";


function Mix({sync, syncTime, soloStem, wave,
              setStem, setSync, setSyncTime, setSolo, setMixerView}) {
    const [isMute, setIsMute] = useState(false);
    const stem = wave.getName();
    const forceMute = soloStem.length !== 0 && !soloStem.includes(stem);

    // when solo state changes, one solo active to zero --> unmute all
    useEffect(() => {
        if(soloStem.length === 0 || soloStem.includes(stem)) {
            wave.mute(false);
            setIsMute(false);
        } else if (!soloStem.includes(stem)) {
            wave.mute(true);
        }
    }, [soloStem]);

    // set sync time
    useEffect(() => {
        if(sync) {
            wave.seek(syncTime)
            wave.removeEvent("seek");
            setSync(false);
        }
    }, [syncTime]);
    
    useEffect(() => {
        if(sync) {
            const onSeekUpdateTime = (progress) => {
                setSyncTime(progress);
            };
            wave.addEvent("seek", onSeekUpdateTime);
        }
    }, [sync]);

    return (
        <div className="mix">
            <div className="mix-title" onClick={() => {
                    setStem(wave.getName());
                    setMixerView("effect");
                }}>
                {wave.getName()}
            </div>
            <div className="mix-gain">
                <input className="mix-slider"
                       min="0" max="100" defaultValue="100"
                       type="range" orient="vertical"
                       onChange={(e) => wave.setVolume(e.target.value)} />
            </div>
            <div className="mix-control">
                <MuteIcon title="Mute"
                          className={`img_icons mix-control-item${isMute ? " img_icons__active": ""}`}
                          onClick={() => {
                            if(soloStem.includes(stem)) {
                                setSolo(stem, "REMOVE");
                            } else if(soloStem.length === 0) {
                                wave.toggleMute();
                                setIsMute(wave.isMute());
                            }
                          }} />
                <SoloIcon title="Solo"
                          className={`img_icons mix-control-item${soloStem.length === 0 || forceMute ? "": " img_icons__active"}`}
                          onClick={() => {
                            const isSolo = soloStem.includes(stem);
                            if(isSolo) {
                                // remove solo
                                setSolo(stem, "REMOVE")
                            } else {
                                // solo
                                setSolo(stem, "ADD");
                            }
                          }} />
                <Link to={{ pathname: wave.getUrl()}} target="_blank" download>
                    <DownloadIcon title="Download"
                        className="img_icons mix-control-item" />
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    sync: state.sync.enabled,
    syncTime: state.sync.time,
    soloStem: state.soloStem
});

const mapDispatchToProps = {
    setStem,
    setSync,
    setSyncTime,
    setSolo,
    setMixerView
}

export default connect(mapStateToProps, mapDispatchToProps)(Mix);