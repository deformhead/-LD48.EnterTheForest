import {System} from '../../index.js';

class Forward extends System {

    $deathplaying;

    $windplaying;

    /**
     * Starts the system.
     * @public
     */
    start() {

        //
    }

    /**
     * Updates the system.
     * @public
     */
    update(timeframe) {

        if (typeof this.engine.devicegame === 'undefined') {

            return;
        }

        const herocontainer = this.engine.devicegame.$world.$nodes[10];

        herocontainer.$translation[2] -= 16 * timeframe / 1000;

        if (this.engine.devicegame.$world.$camera.$parameters.projection.fieldofview < 110) {

            this.engine.devicegame.$world.$camera.$parameters.projection.fieldofview += 1 * timeframe / 1000;
        }

        let collision = false;

        Object.values(this.engine.devicegame.$world.$nodes).forEach((node) => {

            if (collision === true) return;

            if (node.name !== 'Cube') {

                return;
            }

            if (Math.abs(herocontainer.$translation[2] - node.$translation[2]) < 1
            && herocontainer.$translation[0] === node.$translation[0]) {

                collision = true;

                // if (this.$deathplaying !== true) {

                //     const sound = new Audio(blip);

                //     sound.oncanplaythrough = () => {

                //         sound.play();
                //     };

                //     sound.onended = () => {

                //         this.$deathplaying = false;
                //     }

                //     this.$deathplaying = true;
                // }
            }

            // else if (herocontainer.$translation[2] < node.$translation[2]
            // && herocontainer.$translation[0] !== node.$translation[0]
            // && this.$windplaying !== true) {

            //     const sound = new Audio(blip);

            //     sound.oncanplaythrough = () => {

            //         sound.play();
            //     };

            //     sound.onended = () => {

            //         this.$windplaying = false;
            //     }

            //     this.$windplaying = true;
            // }
        });

        if (herocontainer.$translation[2] <= -96) {

            herocontainer.$translation[2] = 0;
        }

        if (collision === true) this.engine.$machine.stop();
    }
}

export {

    Forward
};

export default Forward;
