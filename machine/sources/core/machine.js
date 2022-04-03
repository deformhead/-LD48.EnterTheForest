import HYPERCUBEJS from '@hypercubejs/hypercubejs';

import background from '../../../game/background.mp3';
import cartridge from '../../../game/cartridge.json';

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

    $started;

    $audio;

    /**
     * Creates a new Hypercube.js Game Machine.
     */
    constructor() {

        document.getElementById('start').addEventListener('click', () => {

            this.start();
        });

        document.addEventListener('keydown', (event) => {

            if (event.key === 'Enter'
            && this.$started !== true) {

                this.start();
            }

            else if (event.key === ' '
            && this.$started !== true) {

                this.start();
            }
        });
    }

    restart() {

        this.stop();
        this.start();

        // window.a = this.$engine;
        // window.b = this.$engine.devicegame.$world.$nodes[10].$translation;
    }

    start() {

        if (this.$audio !== true) {

            const sound = new Audio(background);

            sound.oncanplaythrough = () => {

                sound.play();
                sound.loop = true;
            };

            this.$audio = true;
        }

        this.$engine = new HYPERCUBEJS.Engine();
        this.$engine.$machine = this;

        this.$engine.devicegame = new HYPERCUBEJS.DeviceGame(JSON.parse(JSON.stringify(cartridge)));
        this.$engine.deviceviewer = new HYPERCUBEJS.DeviceViewer(document.body);
        this.$engine.devicecontroller = new HYPERCUBEJS.DeviceController(this.$engine.devicegame);
        this.$engine.addsystem(new HYPERCUBEJS.SystemRender());
        this.$engine.addsystem(new HYPERCUBEJS.SystemForward());
        this.$engine.start();

        this.$started = true;

        // window.game = this.$engine.devicegame;
    }

    stop() {

        this.$engine.stop();
        this.$engine.deviceviewer.destroy();
        this.$engine.devicecontroller.destroy();
        this.$engine.devicegame = undefined;
        delete this.$engine;

        this.$started = false;
    }
}

export {

    Machine
};

export default Machine;
