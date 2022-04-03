/**
 * Creates WebGL 2.0 wrappers.
 * @example
 * const webgl = new WebGL(context);
 * const context = webgl.context;
 */
class WebGL {

    /**
     * Stores the WebGL 2.0 program currently being used.
     * @type {WebGLProgram}
     * @private
     */
    $program;

    /**
     * Stores the rendering context of the renderer.
     * @type {WebGL2RenderingContext}
     * @private
     */
    $context;

    /**
     * Gets the rendering context of the renderer.
     * @type {WebGL2RenderingContext}
     * @public
     * @readonly
     */
    get context() {

        return this.$context;
    }

    /**
     * Creates a new WebGL 2.0 wrapper.
     * @param {WebGL2RenderingContext} context The rendering context.
     */
    constructor(context) {

        this.$context = context;
    }

    /**
     * Gets an attribute from given WebGL program.
     * @param {string} name The attribute to get.
     * @returns {number}
     * @public
     */
    attribute(name) {

        return this.$context.getAttribLocation(this.$program, name);
    }

    /**
     * Destroys the rendering context and the canvas element.
     * @public
     */
    destroy() {

        // lose rendering context
        this.$context.getExtension('WEBGL_lose_context').loseContext();
    }

    /**
     * Creates a WebGL 2.0 fragment shader.
     * @param {string} source The shader source.
     * @returns {WebGLShader}
     * @public
     */
    fragment(source) {

        return this.shader(this.$context.FRAGMENT_SHADER, source);
    }

    /**
     * Gets a pixel from given position.
     * @param {number} x The x position of the pixel to get.
     * @param {number} y The y position of the pixel to get.
     * @returns {Uint8Array}
     */
    pixel(x, y) {

        const context = this.$context;

        // a pixel is defined by 4 components (RGBA) with a [0-255] range
        const components = 4;
        const buffer = new Uint8Array(components);

        context.readPixels(x, y, 1, 1, context.RGBA, context.UNSIGNED_BYTE, buffer);

        return buffer;
    }

    /**
     * Creates a WebGL 2.0 program from given shaders.
     * @param {WebGLShader} vertex The vertex shader.
     * @param {WebGLShader} fragment The fragment shader.
     * @returns {WebGLProgram}
     * @public
     */
    program(vertex, fragment) {

        const context = this.$context;

        // prepare the program to use
        const program = context.createProgram();

        // attach the program
        context.attachShader(program, vertex);
        context.attachShader(program, fragment);
        context.linkProgram(program);

        return program;
    }

    /**
     * Creates a WebGL 2.0 shader.
     * @param {number} type The shader type.
     * @param {string} source The shader source.
     * @returns {WebGLShader}
     * @public
     */
    shader(type, source) {

        const context = this.$context;

        const shader = context.createShader(type);

        // prepare the shader
        context.shaderSource(shader, source);
        context.compileShader(shader);

        return shader;
    }

    /**
     * Gets a uniform from given WebGL program.
     * @param {string} name The uniform to get.
     * @returns {WebGLUniformLocation}
     * @public
     */
    uniform(name) {

        return this.$context.getUniformLocation(this.$program, name);
    }

    /**
     * Uses a WebGL 2.0 program.
     * @param {WebGLProgram} program The program to use.
     * @public
     */
    use(program) {

        // use the program
        this.$context.useProgram(program);

        // store the WebGL 2.0 program currently being used
        this.$program = program;
    }

    /**
     * Creates a WebGL 2.0 vertex shader.
     * @param {string} source The shader source.
     * @returns {WebGLShader}
     * @public
     */
    vertex(source) {

        return this.shader(this.$context.VERTEX_SHADER, source);
    }
}

export {

    WebGL
};

export default WebGL;
