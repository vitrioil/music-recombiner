import { PLAY_PAUSE_WAVE, STOP_WAVE, REWIND_WAVE,
         FORWARD_WAVE, SYNC_WAVE, LOAD_WAVE, ADD_REF_WAVE,
         INIT_WAVE, DESTROY_WAVE, SET_STEM, TOGGLE_SYNC, SET_SYNC, SET_SYNC_TIME, SET_SOLO, SET_MIXER_VIEW, SET_EFFECT_ID, TOGGLE_EDIT, SET_MIXER_PARAMS, SET_EFFECT_NAME, DELETE_EFFECT, SET_EFFECT_PARAMS } from "./actionTypes";

export const playPauseWave = () => ({
    type: PLAY_PAUSE_WAVE
});

export const stopWave = () => ({
    type: STOP_WAVE
});

export const rewindWave = () => ({
    type: REWIND_WAVE
});

export const forwardWave = () => ({
    type: FORWARD_WAVE
});

export const syncWave = () => ({
    type: SYNC_WAVE
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

export const setSync = (syncStatus) => ({
    type: SET_SYNC,
    payload: {
        syncStatus: syncStatus
    }
});

export const toggleSync = () => ({
    type: TOGGLE_SYNC
})

export const setSyncTime = (time) => ({
    type: SET_SYNC_TIME,
    payload: {
        time: time
    }
});

export const setSolo = (stem, soloStatus) => ({
    type: SET_SOLO,
    payload: {
        stem: stem,
        soloStatus: soloStatus
    }
});

export const setMixerView = (viewName) => ({
    type: SET_MIXER_VIEW,
    payload: {
        viewName: viewName
    }
});

export const setEffectId = (effectId) => ({
    type: SET_EFFECT_ID,
    payload: {
        effectId: effectId
    }
});

export const toggleEdit = () => ({
    type: TOGGLE_EDIT
});

export const setMixerParams = (focusedStem, effectId, mixerView) => ({
    type: SET_MIXER_PARAMS,
    payload: {
        focusedStem: focusedStem,
        effectId: effectId,
        mixerView: mixerView
    }
});

export const setEffectName = (effectName) => ({
    type: SET_EFFECT_NAME,
    payload: {
        effectName: effectName
    }
});

export const deleteEffect = () => ({
    type: DELETE_EFFECT
});

export const setEffectParams = (params) => ({
    type: SET_EFFECT_PARAMS,
    payload: {
        params
    }
})