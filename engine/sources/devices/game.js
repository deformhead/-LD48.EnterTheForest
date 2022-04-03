import World from '../../../helpers/world.js'

class Game {

    $world;

    get world() {

        return this.$world;
    }

    constructor($cartridge) {

        this.$world = new World($cartridge);
    }
}

export {

    Game
};

export default Game;
