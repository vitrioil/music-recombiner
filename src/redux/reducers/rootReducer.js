import { DESTROY_WAVE, SET_MIXER_VIEW, SET_SOLO, SET_SYNC_TIME, TOGGLE_SYNC } from "../actionTypes";
import { PLAY_PAUSE_WAVE, STOP_WAVE, REWIND_WAVE,
         FORWARD_WAVE, SET_SYNC, LOAD_WAVE, INIT_WAVE,
         ADD_REF_WAVE, SET_STEM } from "../actionTypes";
import { Waveform } from "../../components/utils/PlayerUtils";


const initState = {
    waves: {},
    isLoading: false,
    focusedStem: "",
    sync: { enabled: false, time: 0 },
    soloStem: [],
    mixerView: "mixer"
};

const getWave = (state, payload) => {
    const { stem, ...other } = payload;
    const wave = state.waves[stem];
    return {wave, stem, ...other}
};

function rootReducer(state = initState, action) {
    switch (action.type) {
        case INIT_WAVE: {
            const { id, stem, effect, url } = action.payload;
            const wave = new Waveform(id, stem, effect, url);

            return {
                ...state,
                waves: {...state.waves, [stem]: wave}
            };
        }
        case ADD_REF_WAVE: {
            const { wave, stem, waveRef, waveSurfRef } = getWave(state, action.payload);
            wave.setRef(waveRef, waveSurfRef);

            return {
                ...state,
                waves: {...state.waves, [stem]: wave}
            };
        }
        case LOAD_WAVE: {
            const { wave, stem } = getWave(state, action.payload);
            wave.load();

            return {
                ...state,
                waves: {...state.waves, [stem]: wave}
            };
        }
        case DESTROY_WAVE: {
            const { wave, stem } = getWave(state, action.payload);
            wave.destroy();

            return state;
        };
        case PLAY_PAUSE_WAVE: {
            Object.values(state.waves).map((wave) => wave.playPause());
            return state;
        }
        case STOP_WAVE: {
            Object.values(state.waves).map((wave) => wave.stop());
            return state;
        }
        case REWIND_WAVE: {
            Object.values(state.waves).map((wave) => wave.rewind());
            return state;
        }
        case FORWARD_WAVE: {
            Object.values(state.waves).map((wave) => wave.forward());
            return state;
        }
        case SET_STEM: {
            const { stem } = action.payload;

            return {
                ...state,
                focusedStem: stem
            }
        }
        case TOGGLE_SYNC: {
            return {
                ...state,
                sync: {...state.sync, enabled: !state.sync.enabled}
            };
        }
        case SET_SYNC: {
            const { syncStatus } = action.payload;

            return {
                ...state,
                sync: {...state.sync, enabled: syncStatus}
            };
        }
        case SET_SYNC_TIME: {
            const { time } = action.payload;

            return {
                ...state,
                sync: {...state.sync, time: time}
            }
        }
        case SET_SOLO: {
            const { stem, soloStatus } = action.payload;
            let newSolo = state.soloStem;
            if(soloStatus === "ADD" && !newSolo.includes(stem)) {
                return {
                    ...state,
                    soloStem: [...state.soloStem, stem]
                };
            } else if(soloStatus === "REMOVE") {
               newSolo = newSolo.filter(item => item !== stem);
               return {
                   ...state,
                   soloStem: newSolo
               };
            } else {
                return state;
            }
        }
        case SET_MIXER_VIEW: {
            const { viewName } = action.payload;

            return {
                ...state,
                mixerView: viewName
            };
        }
        default:
            return state;
    }
}

export default rootReducer;