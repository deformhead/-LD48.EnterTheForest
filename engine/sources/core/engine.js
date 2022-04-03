import {Loop} from '../../../helpers/loop.js';

/**
 * Creates Hypercube.js Game Engines.
 * @example
 * const engine = new Engine();
 */
class Engine {

    $rafid;

    $devicecontroller;

    $machine;

    /**
     * Stores the game device.
     * @type {import('../../index.js').DeviceGame}
     * @private
     */
    $devicegame;

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

    $started;

    get devicecontroller() {

        return this.$devicecontroller;
    }

    /**
     * Gets the game device.
     * @type {import('../../index.js').DeviceGame}
     * @public
     * @readonly
     */
    get devicegame() {

        return this.$devicegame;
    }

    /**
     * Gets the viewer device.
     * @type {import('../../index.js').DeviceViewer}
     * @public
     * @readonly
     */
    get deviceviewer() {

        return this.$deviceviewer;
    }

    set devicecontroller($devicecontroller) {

        this.$devicecontroller = $devicecontroller;
    }

    /**
     * Sets the viewer device.
     * @type {import('../../index.js').DeviceGame}
     * @public
     */
    set devicegame($devicegame) {

        this.$devicegame = $devicegame;
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

        this.$loop = new Loop(this.tick.bind(this));
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

    // @TODO
    start() {

        this.$started = true;

        this.$systems.forEach(($system) => {

            $system.start();
        });

        this.$loop.update();
    }

    // @TODO
    stop() {

        this.$started = false;

        window.cancelAnimationFrame(this.$rafid);

        this.$rafid = undefined;

        this.$systems = [];
    }

    /**
     * Updates each system once.
     * @public
     */
    tick(timeframe) {

        // console.log('tick')

        this.$systems.forEach(($system) => {

            if (this.$started === false) return;

            $system.update(timeframe);
        });
    }
}

export {

    Engine
};

export default Engine;
