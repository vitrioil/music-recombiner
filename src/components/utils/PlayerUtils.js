import WaveSurfer from "wavesurfer.js";

const waveOptions = (ref) => ({
    container: ref,
    responsive: false,
    waveColor: "#554080",
    progressColor: "#00ffc0",
    barWidth: 3,
    barRadius: 3,
    height: 100,
    showTime: true,
});

class Waveform {

    constructor(id, name, effects, url) {
        this.id = id;
        this.name = name;
        this.effects = effects;
        this.url = url;
    }

    setRef(waveRef, waveSurfRef) {
        this.waveRef = waveRef;
        this.waveSurfRef = waveSurfRef;
        waveSurfRef.current = WaveSurfer.create(waveOptions(waveRef.current));
    }

    setVolume(volume) {
        this.waveSurfRef.current.setVolume(volume / 100);
    }

    addEvent(eventName, callback) {
        this.waveSurfRef.current.on(eventName, callback);
    }

    removeEvent(eventName, callback) {
        this.waveSurfRef.current.un(eventName, callback);
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getUrl() {
        console.log(this.url);
        return this.url;
    }

    getEffects() {
        return this.effects;
    }

    isMute() {
        return this.waveSurfRef.current.getMute();
    }

    load() {
        this.waveSurfRef.current.load(this.url);
    }

    playPause() {
        this.waveSurfRef.current.playPause();
    }

    stop() {
        this.waveSurfRef.current.stop();
    }

    forward(skipSec = 5) {
        this.skip(skipSec);
    }

    rewind(skipSec = 5) {
        this.skip(-skipSec);
    }

    skip(skipSec) {
        this.waveSurfRef.current.skip(skipSec);
    }

    seek(progress) {
        this.waveSurfRef.current.seekTo(progress);
    }

    mute(val = true) {
        this.waveSurfRef.current.setMute(val);
    }

    toggleMute() {
        this.waveSurfRef.current.toggleMute();
    }

    destroy() {
        this.waveSurfRef.current.empty()
        this.waveSurfRef.current.destroy();
    }
}

export {Waveform};