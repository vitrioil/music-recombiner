import MixerView from "./mixer";
import LoadingView from "./loading";
import EffectView from "./effect";


class LoadingFactory {
    get type() {
        return "loading";
    }

    create() {
        return <LoadingView />
    }
}

class EffectFactory {
    get type() {
        return "effect";
    }

    create() {
        return <EffectView />
    }
}

class MixerFactory {
    get type() {
        return "mixer";
    }

    create() {
        return <MixerView />
    }
}

class FactoryMapper {
    constructor() {
        const loadingFactory = new LoadingFactory();
        const effectFactory = new EffectFactory();
        const mixerFactory = new MixerFactory();

        this.factories = {};
        this.factories[loadingFactory.type] = loadingFactory;
        this.factories[effectFactory.type] = effectFactory;
        this.factories[mixerFactory.type] = mixerFactory;
    }

    factory = type => type && this.factories[type];
}

class Factory {

    constructor() {
        this.factoryMapper = new FactoryMapper();
    }

    create(type) {
        const factory = this.factoryMapper.factory(type);
        return factory.create();
    }
}

export default Factory;