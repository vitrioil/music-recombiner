import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {MuteIcon, DownloadIcon, SoloIcon} from "../../utils/Icon";

function Mix({wave, setStem, forceMute, soloStem, setSoloStem, sync, syncTime, setSyncTime}) {
    const [isMute, setIsMute] = useState(false);

    if(forceMute) {
        wave.mute();
    }

    // when solo state changes, one solo active to zero --> unmute all
    useEffect(() => {
        if(soloStem.length === 0) {
            wave.mute(false);
            setIsMute(false);
        }
    }, [soloStem]);

    // set sync time
    useEffect(() => {
        if(sync) {
            wave.seek(syncTime)
        }
    }, [wave, syncTime]);
    
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
            <div className="mix-title" onClick={() => setStem(wave.getName())}>
                {wave.getName()}
            </div>
            <div className="mix-gain">
                <input className="mix-slider"
                       min="0" max="100" value="100"
                       type="range" orient="vertical"
                       onChange={(e) => wave.setVolume(e.target.value)} />
            </div>
            <div className="mix-control">
                <MuteIcon title="Mute"
                          className={`img_icons mix-control-item${isMute ? " img_icons__active": ""}`}
                          onClick={() => {
                            wave.toggleMute();
                            setIsMute(wave.isMute());
                          }} />
                <SoloIcon title="Solo"
                          className={`img_icons mix-control-item${soloStem.length === 0 || forceMute ? "": " img_icons__active"}`}
                          onClick={() => {
                            let name = wave.getName(),
                                tempSoloStem = soloStem.filter(i => i !== name);
                            if(tempSoloStem.length !== soloStem.length) {
                                // remove solo
                                setSoloStem(tempSoloStem);
                                if(tempSoloStem.length !== 0) {
                                    wave.mute(true);
                                } else {
                                    wave.mute(false);
                                }
                            } else {
                                // solo
                                setSoloStem([...soloStem, name])
                                wave.mute(false);
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

export default Mix;