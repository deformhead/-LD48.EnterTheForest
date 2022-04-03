import {System} from '../../index.js';

import Renderer from '../../../helpers/renderer.js';
import WebGL from '../../../helpers/webgl.js';

/**
 * Creates Hypercube.js render systems.
 * @example
 * const render = new Render();
 *
 * // called by an update loop
 * render.update();
 */
class Render extends System {

    $renderer;

    /**
     * Starts the system.
     * @public
     */
    start() {

        if (typeof this.engine.deviceviewer === 'undefined') {

            return;
        }

        const context = new WebGL(this.engine.deviceviewer.element.getContext('webgl2', {

            antialias: false
        }));

        this.$renderer = new Renderer(this.engine.deviceviewer, context);
        this.$renderer.enabledepth();

        this.$renderer.clear();

        this.$renderer.usecamera(this.engine.devicegame.world.camera);
        this.$renderer.render(this.engine.devicegame.world.models, this.engine.devicegame.world.root, ['lights']);
    }

    destroy() {

        this.$renderer.destroy();
    }

    /**
     * Updates the system.
     * @public
     */
    update() {

        if (typeof this.engine.deviceviewer === 'undefined') {

            return;
        }

        this.$renderer.clear();

        this.$renderer.usecamera(this.engine.devicegame.world.camera);
        this.$renderer.render(this.engine.devicegame.world.models, this.engine.devicegame.world.root, ['lights']);
    }
}

export {

    Render
};

export default Render;
