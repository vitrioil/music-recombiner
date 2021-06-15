import { DELETE_EFFECT, DESTROY_WAVE, SET_EFFECT_ID, SET_EFFECT_NAME, 
         SET_EFFECT_PARAMS, SET_MIXER_PARAMS, SET_MIXER_VIEW,
         SET_PROJECT, SET_SIGNALS, SET_SOLO, SET_SYNC_TIME,
         TOGGLE_EDIT, TOGGLE_SYNC } from "../actionTypes";
import { PLAY_PAUSE_WAVE, STOP_WAVE, REWIND_WAVE,
         FORWARD_WAVE, SET_SYNC, LOAD_WAVE, INIT_WAVE,
         ADD_REF_WAVE, SET_STEM } from "../actionTypes";
import { Waveform } from "../../components/utils/PlayerUtils";


const initState = {
    waves: {},
    sync: { enabled: false, time: 0 },
    mixerView: "mixer",
    effectId: "",
    soloStem: [],
    isLoading: false,
    focusedStem: "",
    edit: false,
    openProject: "",
    signals: []
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

            let oldWaves = state.waves;
            oldWaves[stem] = wave;
            return {
                ...state,
                waves: oldWaves
            };
        }
        case ADD_REF_WAVE: {
            const { wave, stem, waveRef, waveSurfRef } = getWave(state, action.payload);
            wave.setRef(waveRef, waveSurfRef);

            return state;
        }
        case LOAD_WAVE: {
            const { wave, stem } = getWave(state, action.payload);
            wave.load();

            return state;
        }
        case DESTROY_WAVE: {
            const { wave, stem } = getWave(state, action.payload);
            wave.destroy();

            let oldWaves = state.waves;
            delete oldWaves[stem]
            return {
                ...state,
                waves: oldWaves
            }
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
        case SET_EFFECT_ID: {
            const { effectId } = action.payload;

            return {
                ...state,
                effectId: effectId
            };
        }
        case TOGGLE_EDIT: {
            const newEdit = !state.edit;
            Object.values(state.waves).map((wave) => wave.setRegionPlugin(newEdit));

            return {
                ...state,
                edit: newEdit
            };
        }
        case SET_MIXER_PARAMS: {
            const { focusedStem, effectId, mixerView } = action.payload;

            return {
                ...state,
                focusedStem: focusedStem,
                effectId: effectId,
                mixerView: mixerView
            };
        }
        case SET_EFFECT_NAME: {
            const { wave, effectName } = getWave(state, {...action.payload, stem: state.focusedStem});
            wave.setEffectName(state.effectId, effectName);

            return {
                ...state,
                effectId: state.effectId
            };
        }
        case DELETE_EFFECT: {
            const { wave } = getWave(state, {stem: state.focusedStem});
            wave.removeEffect(state.effectId)
            wave.setRegionPlugin(state.edit);

            return {
                ...state,
                effectId: "",
                mixerView: "effect"
            };
        }
        case SET_EFFECT_PARAMS: {
            const { wave, params } = getWave(state, {...action.payload, stem: state.focusedStem});
            wave.updateEffectParams(state.effectId, params);
            wave.setRegionPlugin(state.edit);
            
            return {
                ...state,
                effectId: state.effectId
            };
        }
        case SET_PROJECT: {
            const { id } = action.payload;
            return {
                ...state,
                openProject: id
            }
        }
        case SET_SIGNALS: {
            const { signals } = action.payload;

            return {
                ...state,
                signals
            }
        }
        default:
            return state;
    }
}

export default rootReducer;