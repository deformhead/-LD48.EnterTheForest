import {System} from '../../index.js';

/**
 * Creates Hypercube.js render systems.
 * @example
 * const render = new Render();
 *
 * // called by an update loop
 * render.update();
 */
class Render extends System {

    /**
     * Updates the system.
     * @public
     */
    update() {

        if (typeof this.engine.deviceviewer === 'undefined') {

            return;
        }

        console.log('Hypercube.js - Render system - update()');
    }
}

export {

    Render
};

export default Render;
