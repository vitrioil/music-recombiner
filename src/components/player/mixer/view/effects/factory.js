import Select from "./select";
import Echo from "./echo";
import Volume from "./volume";


class SelectFactory {
    get type() {
        return "select";
    }

    create() {
        return <Select />;
    }
}

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
        const selectFactory = new SelectFactory();
        const echoFactory = new EchoFactory();
        const volumeFactory = new VolumeFactory();

        this.factories = {};
        // default value
        this.factories[""] = selectFactory;
        this.factories[selectFactory.type] = selectFactory;
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
