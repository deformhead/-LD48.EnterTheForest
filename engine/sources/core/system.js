/**
 * Abstract Hypercube.js system.
 * @example
 * class Example extends System {
 *
 *     update() {}
 * }
 */
class System {

    /**
     * Stores the Hypercube.js Game Engine running the system.
     * @type {import('../../index.js').Engine}
     * @private
     */
    $engine;

    /**
     * Gets the Hypercube.js Game Engine running the system.
     * @type {import('../../index.js').Engine}
     * @public
     * @readonly
     */
    get engine() {

        return this.$engine;
    }

    /**
     * Sets the Hypercube.js Game Engine running the system.
     * @type {import('../../index.js').Engine}
     * @public
     */
    set engine($engine) {

        this.$engine = $engine;
    }

    /**
     * Updates the system.
     * @public
     */
    update() {}
}

export {

    System
};

export default System;
