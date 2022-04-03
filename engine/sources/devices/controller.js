class Controller {

    $game;

    constructor($game) {

        this.$game = $game;

        window.addEventListener('keyup', this.handleinputs.bind(this));
    }

    destroy() {

        window.removeEventListener('keyup', this.handleinputs.bind(this));
    }

    handleinputs(event) {

        if (event.key === 'ArrowLeft'
        && this.$game.$world.$nodes[10].$translation[0] >= 0) {

            this.$game.$world.$nodes[10].$translation[0] -= 2
        }

        else if (event.key === 'ArrowRight'
        && this.$game.$world.$nodes[10].$translation[0] <= 0) {

            this.$game.$world.$nodes[10].$translation[0] += 2
        }
    }
}

export {

    Controller
};

export default Controller;
