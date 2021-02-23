import { PLAY_PAUSE_WAVE, STOP_WAVE, REWIND_WAVE,
         FORWARD_WAVE, SYNC_WAVE, LOAD_WAVE, INIT_WAVE,
         ADD_REF_WAVE } from "./actionTypes";

const initState = {
    waves: {}
}

const getWave = (state, payload) => {
    const { stem, ...other } = payload;
    const wave = state.waves[stem];
    return {wave, stem, ...other}
}

function rootReducer(state = initState, action) {
    switch (action.type) {
        case INIT_WAVE: {
            const { id, stem, effect, url } = action.payload;
            const wave = new Waveform(id, stem, effect, url);
            const { wave, stem, id, stem, effect, url } = getWave(state, payload);

            return {
                ...state,
                waves: {...waves, stem: wave}
            }
        }
        case ADD_REF_WAVE: {
            const { stem, waveRef, waveSurfRef } = action.payload;
            const wave = state.waves[stem];
            wave.setRef(waveRef, waveSurfRef);

            return {
                ...state,
                waves: {...waves, stem: wave}
            }
        }
        case LOAD_WAVE: {
            const { stem } = action.payload;
            const wave = state.waves[stem];
            wave.load();

            return {
                ...state,
                waves: {...waves, stem: wave}
            }
        }
        case PLAY_PAUSE_WAVE: {
            const { stem } = action.payload;
            const wave = state.waves[stem];
            wave.playPause();

            return state;
        }
        default:
            return state;
    }
}

export default rootReducer;