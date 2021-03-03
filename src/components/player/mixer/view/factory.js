import MixerView from "./mixer";
import LoadingView from "./loading";
import EffectView from "./effect";
import GenericEffectView from "./effects";


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

class GenericEffectFactory {
    get type() {
        return "generic-effect";
    }

    create() {
        return <GenericEffectView />;
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
        const genericEffectFactory = new GenericEffectFactory();

        this.factories = {};
        this.factories[loadingFactory.type] = loadingFactory;
        this.factories[effectFactory.type] = effectFactory;
        this.factories[mixerFactory.type] = mixerFactory;
        this.factories[genericEffectFactory.type] = genericEffectFactory;
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