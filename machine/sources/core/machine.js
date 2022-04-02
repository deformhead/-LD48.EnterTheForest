import HYPERCUBEJS from '@hypercubejs/hypercubejs';

/**
 * Creates Hypercube.js Game Machines.
 * @example
 * const machine = new Machine();
 */
class Machine {

    /**
     * Stores the Hypercube.js Game Engine currently being used.
     * @type {import('@hypercubejs/hypercubejs').Engine}
     * @private
     */
    $engine;

    /**
     * Creates a new Hypercube.js Game Machine.
     */
    constructor() {

        this.$engine = new HYPERCUBEJS.Engine();

        this.$engine.deviceviewer = new HYPERCUBEJS.DeviceViewer(document.body);
        this.$engine.addsystem(new HYPERCUBEJS.SystemRender());
    }
}

export {

    Machine
};

export default Machine;
