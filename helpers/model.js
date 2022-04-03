import WebGL from './webgl.js';

const MODES = {

    'POINTS': 0,
    'LINES': 1,
    'LINE_STRIP': 2,
    'LINE_LOOP': 3,
    'TRIANGLES': 4,
    'TRIANGLE_STRIP': 5,
    'TRIANGLE_FAN': 6
};

const TYPEDARRAYS = {

    'BYTE': Int8Array,
    'UNSIGNED_BYTE': Uint8Array,
    'SHORT': Int16Array,
    'UNSIGNED_SHORT': Uint16Array,
    'INT': Int32Array,
    'UNSIGNED_INT': Uint32Array,
    'FLOAT': Float32Array
};

const TYPES = {

    'BYTE': 5120,
    'UNSIGNED_BYTE': 5121,
    'SHORT': 5122,
    'UNSIGNED_SHORT': 5123,
    'INT': 5124,
    'UNSIGNED_INT': 5125,
    'FLOAT': 5126
};

/**
 * Handles models to draw with WebGL 2.0.
 * @example <caption>With chaining:</caption>
 * const model = new Model(webgl).prepare(json).render();
 * @example <caption>Without chaining:</caption>
 * const model = new Model(webgl);
 * model.prepare(json);
 * model.render();
 */
class Model {

    /**
     * Stores the rendering context of the renderer.
     * @type {WebGL2RenderingContext}
     * @private
     */
    $context;

    /**
     * Stores the prepared model.
     * @type {modelPrepared}
     * @private
     */
    $model;

    /**
     * Stores the WebGL 2.0 wrapper.
     * @type {WebGL}
     * @private
     */
    $webgl;

    /**
     * Gets the prepared model.
     * @type {modelPrepared}
     * @public
     * @readonly
     */
    get model() {

        return this.$model;
    }

    /**
     * Handles a new model to draw with WebGL 2.0.
     * @param {WebGL} webgl The WebGL 2.0 wrapper.
     */
    constructor(webgl) {

        this.$webgl = webgl;
        this.$context = webgl.context;
    }

    /**
     * Prepares the model for rendering.
     * @param {modelJSON} json The JSON representation of the model to prepare.
     * @returns {this}
     * @public
     */
    prepare(json) {

        const model = {};

        const {colors, normals, draw, positions} = json;

        if (typeof colors !== 'undefined') {

            const {buffer, components, normalize, offset, stride, type} = colors;

            const attributeBuffer = this.$context.createBuffer();
            this.$context.bindBuffer(this.$context.ARRAY_BUFFER, attributeBuffer);
            this.$context.bufferData(this.$context.ARRAY_BUFFER, new TYPEDARRAYS[type](buffer), this.$context.STATIC_DRAW);

            model.colors = {

                'buffer': attributeBuffer,
                'components': components,
                'type': TYPES[type],
                'normalize': normalize,
                'stride': stride,
                'offset': offset
            };
        }

        if (typeof normals !== 'undefined') {

            const {buffer, components, normalize, offset, stride, type} = normals;

            const attributeBuffer = this.$context.createBuffer();
            this.$context.bindBuffer(this.$context.ARRAY_BUFFER, attributeBuffer);
            this.$context.bufferData(this.$context.ARRAY_BUFFER, new TYPEDARRAYS[type](buffer), this.$context.STATIC_DRAW);

            model.normals = {

                'buffer': attributeBuffer,
                'components': components,
                'type': TYPES[type],
                'normalize': normalize,
                'stride': stride,
                'offset': offset
            };
        }

        if (typeof positions !== 'undefined') {

            const {buffer, components, normalize, offset, stride, type} = positions;

            const attributeBuffer = this.$context.createBuffer();
            this.$context.bindBuffer(this.$context.ARRAY_BUFFER, attributeBuffer);
            this.$context.bufferData(this.$context.ARRAY_BUFFER, new TYPEDARRAYS[type](buffer), this.$context.STATIC_DRAW);

            model.positions = {

                'buffer': attributeBuffer,
                'components': components,
                'type': TYPES[type],
                'normalize': normalize,
                'stride': stride,
                'offset': offset
            };
        }

        if (typeof draw !== 'undefined') {

            const {count, method, mode, offset} = draw;

            model.draw = {

                'mode': MODES[mode],
                'method': method,
                'offset': offset,
                'count': count
            }
        }

        this.$model = model;

        return this;
    }

    /**
     * Renders the model.
     * @returns {this}
     * @public
     */
    render(filter) {

        const {colors, draw, normals, positions} = this.$model;

        if (typeof colors !== 'undefined'
        && filter.colors === true) {

            const {buffer, components, normalize, offset, stride, type} = colors;

            const attribute = this.$webgl.attribute('COLOR');

            this.$context.bindBuffer(this.$context.ARRAY_BUFFER, buffer);
            this.$context.vertexAttribPointer(attribute, components, type, normalize, stride, offset);
            this.$context.enableVertexAttribArray(attribute);
        }

        if (typeof normals !== 'undefined'
        && filter.normals === true) {

            const {buffer, components, normalize, offset, stride, type} = normals;

            const attribute = this.$webgl.attribute('NORMAL');

            this.$context.bindBuffer(this.$context.ARRAY_BUFFER, buffer);
            this.$context.vertexAttribPointer(attribute, components, type, normalize, stride, offset);
            this.$context.enableVertexAttribArray(attribute);
        }

        if (typeof positions !== 'undefined'
        && filter.positions === true) {

            const {buffer, components, normalize, offset, stride, type} = positions;

            const attribute = this.$webgl.attribute('POSITION');

            this.$context.bindBuffer(this.$context.ARRAY_BUFFER, buffer);
            this.$context.vertexAttribPointer(attribute, components, type, normalize, stride, offset);
            this.$context.enableVertexAttribArray(attribute);
        }

        if (draw.method === 'arrays') {

            const {count, mode, offset} = draw;

            this.$context.drawArrays(mode, offset, count);
        }

        return this;
    }
}

export {

    Model
};

export default Model;
