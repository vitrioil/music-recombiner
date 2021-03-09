import Echo from "./echo";
import Volume from "./volume";


class EchoFactory {
    get type() {
        return "echo";
    }

    create() {
        return <Echo />
    }
}

class VolumeFactory {
    get type() {
        return "volume";
    }

    create() {
        return <Volume />
    }
}

class FactoryMapper {
    constructor() {
        const echoFactory = new EchoFactory();
        const volumeFactory = new VolumeFactory();

        this.factories = {};
        this.factories[echoFactory.type] = echoFactory;
        this.factories[volumeFactory.type] = volumeFactory;
    }

    factory = type => type && this.factories[type];
}

class Factory {

    constructor() {
        this.factoryMapper = new FactoryMapper();
    }

    create(type) {
        console.log(type);
        const factory = this.factoryMapper.factory(type);
        return factory.create();
    }
}

export default Factory;
