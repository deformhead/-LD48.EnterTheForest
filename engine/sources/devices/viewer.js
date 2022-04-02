/**
 * Creates viewers.
 * @example
 * const viewer = new Viewer(document.body);
 * const element = viewer.element;
 */
class Viewer {

    /**
     * Stores the viewer container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the canvas element.
     * @type {HTMLCanvasElement}
     * @private
     */
    $element;

    /**
     * Gets the canvas element.
     * @type {HTMLCanvasElement}
     * @public
     * @readonly
     */
    get element() {

        return this.$element;
    }

    /**
     * Creates a new viewer.
     * @param {HTMLElement} $container The container for the canvas element.
     */
    constructor($container) {

        this.$container = $container;
        this.$element = document.createElement('canvas');

        this.$element.style.width = '100%';
        this.$element.style.height = '100%';

        this.$container.appendChild(this.$element);

        this.setsize();
    }

    /**
     * Gets the device pixel ratio.
     * @returns {number}
     * @public
     */
    ratio() {

        return window.devicePixelRatio || 1;
    }

    /**
     * Sets the size of the viewer.
     * @public
     */
    setsize() {

        const ratio = this.ratio();

        const width = Math.floor(this.$element.offsetWidth * ratio);
        const height = Math.floor(this.$element.offsetHeight * ratio);

        this.$element.setAttribute('width', '' + width);
        this.$element.setAttribute('height', '' + height);
    }
}

export {

    Viewer
};

export default Viewer;
