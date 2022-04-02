/**
 * Creates Hypercube.js Game Engines.
 * @example
 * const engine = new Engine();
 */
class Engine {

    /**
     * Stores the viewer device.
     * @type {import('../../index.js').DeviceViewer}
     * @private
     */
    $deviceviewer;

    /**
     * Stores the systems.
     * @type {import('../../index.js').System[]}
     * @private
     */
    $systems;

    /**
     * Gets the viewer device.
     * @type {import('../../index.js').DeviceViewer}
     * @public
     * @readonly
     */
    get deviceviewer() {

        return this.$deviceviewer;
    }

    /**
     * Sets the viewer device.
     * @type {import('../../index.js').DeviceViewer}
     * @public
     */
    set deviceviewer($deviceviewer) {

        this.$deviceviewer = $deviceviewer;
    }

    /**
     * Creates a new Hypercube.js Game Engine.
     */
    constructor() {

        this.$systems = [];
    }

    /**
     * Adds a system.
     * @param {import('../../index.js').System} $system The system to add.
     * @public
     */
    addsystem($system) {

        $system.engine = this;

        this.$systems.push($system);
    }

    /**
     * Updates each system once.
     * @public
     */
    tick() {

        this.$systems.forEach(($system) => {

            $system.update();
        });
    }
}

export {

    Engine
};

export default Engine;
