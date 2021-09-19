import Select from "./select";
import Echo from "./echo";
import Volume from "./volume";
import Reverb from "./reverb";


class SelectFactory {
    get type() {
        return "Select";
    }

    create() {
        return <Select />;
    }
}

class EchoFactory {
    get type() {
        return "Echo";
    }

    create() {
        return <Echo />
    }
}

class VolumeFactory {
    get type() {
        return "Volume";
    }

    create() {
        return <Volume />
    }
}

class ReverbFactory {
    get type() {
        return "Reverb";
    }

    create() {
        return <Reverb />
    }
}

class FactoryMapper {
    constructor() {
        const selectFactory = new SelectFactory();
        const echoFactory = new EchoFactory();
        const volumeFactory = new VolumeFactory();
        const reverbFactory = new ReverbFactory();

        this.factories = {};
        // default value
        this.factories[""] = selectFactory;
        this.factories[selectFactory.type] = selectFactory;
        this.factories[echoFactory.type] = echoFactory;
        this.factories[volumeFactory.type] = volumeFactory;
        this.factories[reverbFactory.type] = reverbFactory;
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
