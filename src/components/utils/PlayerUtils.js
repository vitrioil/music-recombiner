import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions/index.js'

const waveOptions = (ref) => ({
    container: ref,
    responsive: false,
    waveColor: "#554080",
    progressColor: "#00ffc0",
    barWidth: 3,
    barRadius: 3,
    height: 100,
    showTime: true,
    plugins: [RegionsPlugin.create()]
});

class Waveform {

    constructor(id, name, effects, url) {
        this.id = id;
        this.name = name;
        this.effects = effects;
        this.url = url;
    }

    getRegions(edit = false) {
        let regions = [],
            start, end;
        this.effects.forEach((effect) => {
            start = effect.startTime;
            end = effect.endTime;
            regions.push({id: effect.id,
                          start: start,
                          end: end,
                          drag: edit,
                          resize: edit,
                          color: "hsla(200, 50%, 70%, 0.4)"});
        });
        return regions;
    }

    setRegionPlugin(edit, name = "region", reset = true) {
        const regions = this.getRegions(edit),
              params = {regions: regions, dragSelection: edit, regionsMinLength: 2, deferInit: false},
              activePlugins = this.waveSurfRef.current.getActivePlugins();
        if(reset && activePlugins[name]) {
            this.waveSurfRef.current.destroyPlugin(name);
        }
        this.registerPlugin(name, params, RegionsPlugin);
    }

    addEffect(region) {
        const effect = {
            //TODO: use better id
            id: region.id,
            startTime: region.start,
            endTime: region.end,
            name: "echo"
        }
        this.effects.push(effect);
    }

    registerPlugin(name, params, plugin) {
        this.waveSurfRef.current.registerPlugins([{name: name, params: params, instance: plugin}]);
    }

    setRef(waveRef, waveSurfRef) {
        this.waveRef = waveRef;
        this.waveSurfRef = waveSurfRef;
        waveSurfRef.current = WaveSurfer.create(waveOptions(waveRef.current));
        this.setRegionPlugin(false);
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

    getEffectName(id) {
        const [effect] = this.getEffects().filter(e => e.id === id);
        if(effect === undefined) {
            return "";
        }
        return effect.name;
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