import { PLAY_PAUSE_WAVE, STOP_WAVE, REWIND_WAVE,
         FORWARD_WAVE, SYNC_WAVE, LOAD_WAVE, ADD_REF_WAVE,
         INIT_WAVE, DESTROY_WAVE, SET_STEM } from "./actionTypes";

export const playPauseWave = (stem) => ({
    type: PLAY_PAUSE_WAVE,
});

export const stopWave = (stem) => ({
    type: STOP_WAVE,
});

export const rewindWave = (stem) => ({
    type: REWIND_WAVE,
});

export const forwardWave = (stem) => ({
    type: FORWARD_WAVE,
});

export const syncWave = (stem) => ({
    type: SYNC_WAVE,
});

export const initWave = (stem, id, effect, url) => ({
    type: INIT_WAVE,
    payload: {
        stem: stem,
        id: id,
        effect: effect,
        url: url
    }
});

export const loadWave = (stem) => ({
    type: LOAD_WAVE,
    payload: {
        stem: stem
    }
});

export const addRefWave = (stem, waveRef, waveSurfRef) => ({
    type: ADD_REF_WAVE,
    payload: {
        stem: stem,
        waveRef: waveRef,
        waveSurfRef: waveSurfRef
    }
});

export const destroyWave = (stem) => ({
    type: DESTROY_WAVE,
    payload: {
        stem: stem
    }
});

export const setStem = (stem) => ({
    type: SET_STEM,
    payload: {
        stem: stem
    }
});