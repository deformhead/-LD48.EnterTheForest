import {RADIANS} from './mathematics.js';

import Matrix4 from './matrix4.js';
import Model from './model.js';

import modelBox from './box.js';
import modelGrid from './grid.js';

import fragmentColors from './colors.fragment.js';
import vertexColors from './colors.vertex.js';

import fragmentLights from './lights.fragment.js';
import vertexLights from './lights.vertex.js';

// @TODO : shader class
// @TODO : add shader shadows

// IMPORTANT : colors = unlit

class Renderer {

    $camera;

    $matrixcamera;

    $matrixprojection;

    $meshes;

    $programs;

    $webgl;

    get matrixcamera() {

        return this.$matrixcamera;
    }

    get matrixprojection() {

        return this.$matrixprojection;
    }

    get matrixview() {

        return new Matrix4()
        .clone(this.matrixcamera)
        .invert();
    }

    constructor(viewer, webgl) {

        this.$webgl = webgl;
        this.$viewer = viewer;
        this.$context = webgl.context;

        // @TODO : prepare meshes dynamically
        this.$meshes = {};
        this.$meshes.floor = new Model(webgl).prepare(modelBox(1.0, 1.0, 1.0));
        this.$meshes.hero = new Model(webgl).prepare(modelBox(0.4, 0.8, 0.6));
        this.$meshes.box = new Model(webgl).prepare(modelBox(1.0, 1.0, 1.0));
        this.$meshes.grid = new Model(webgl).prepare(modelGrid(16, 4));

        // @TODO : prepare shaders dynamically
        this.$programs = {};
        this.$programs.colors = webgl.program(webgl.vertex(vertexColors), webgl.fragment(fragmentColors));
        this.$programs.lights = webgl.program(webgl.vertex(vertexLights), webgl.fragment(fragmentLights));
    }

    clear() {

        this.$context.viewport(0, 0, this.$context.canvas.width, this.$context.canvas.height);
        this.$context.clearColor(0, 0, 0, 1);
        this.$context.clear(this.$context.COLOR_BUFFER_BIT | this.$context.DEPTH_BUFFER_BIT);
    }

    destroy() {

        this.$webgl.destroy();
    }

    enabledepth() {

        this.$context.enable(this.$context.DEPTH_TEST);
    }

    pick(x, y, width, height) {

        const ratio = this.$viewer.ratio();
        const pixels = this.$webgl.pixel(x * ratio, (height - y) * ratio);

        console.log(pixels);
    }

    // @TODO : remove world here et garder que root/graph/node
    render(models, root, attributes) {

        // @TODO : attributes validator

        const colors = (attributes.indexOf('colors') !== -1);
        const lights = (attributes.indexOf('lights') !== -1);

        if (colors === true) {

            this.$webgl.use(this.$programs.colors);

            this.$context.uniformMatrix4fv(this.$webgl.uniform('view'), false, this.matrixview.get());
            this.$context.uniformMatrix4fv(this.$webgl.uniform('projection'), false, this.matrixprojection.get());
        }

        // @TODO : refacto if/else lights/colors
        else if (lights === true) {

            this.$webgl.use(this.$programs.lights);

            // @TODO : add/set light
            const lightdirection = [0, 10, 10];
            const lightcolor = [1.0, 1.0, 1.0];

            this.$context.uniform3fv(this.$webgl.uniform('directional'), new Float32Array(lightdirection));
            this.$context.uniform3fv(this.$webgl.uniform('directionalColor'), new Float32Array(lightcolor));
            this.$context.uniformMatrix4fv(this.$webgl.uniform('view'), false, this.matrixview.get());
            this.$context.uniformMatrix4fv(this.$webgl.uniform('projection'), false, this.matrixprojection.get());
        }

        Object.values(models).forEach((node) => {

            const {parameters} = node;
            const {type} = parameters;




            // @TODO : faire à la création/update du node car minor perf issues

            const hierarchy = [node];

            let current = node;

            while (current.hasparent === true) {

                current = current.parent;

                hierarchy.unshift(current);
            }

            // @TODO : refacto - if current model is in the world but not child of root node, then discard it
            if (hierarchy.indexOf(root) === -1) {

                return;
            }





            const matrixtransformation = new Matrix4();

            hierarchy.forEach((node) => {

                // @TODO : faire à la création/update du node car perf issues
                matrixtransformation
                .translate(node.translation)
                .rotateY(node.rotation[1] * RADIANS)
                .rotateX(node.rotation[0] * RADIANS)
                .rotateZ(node.rotation[2] * RADIANS)
                .scale(node.scale)
                ;
            });

            if (colors === true) {

                this.$context.uniformMatrix4fv(this.$webgl.uniform('transformation'), false, matrixtransformation.get());

                this.$meshes[type].render({

                    'positions': true,
                    'colors': true
                });
            }

            // @TODO : refacto if/else lights/colors
            else if (lights === true) {

                this.$context.uniformMatrix4fv(this.$webgl.uniform('transformation'), false, matrixtransformation.get());

                this.$meshes[type].render({

                    'positions': true,
                    'colors': true,
                    'normals': true
                });
            }
        });
    }

    // @TODO : factoriser le get hierarchy
    setmatrixcamera() {

        let current = this.$camera;

        const hierarchy = [current];

        while (current.hasparent === true) {

            current = current.parent;

            hierarchy.unshift(current);
        }

        const matrixtransformation = new Matrix4();

        hierarchy.forEach((node) => {

            matrixtransformation

            // @TODO : remove (test only)
            // .rotateY(node.rotation[1] * RADIANS * performance.now() / 3600)


            .translate(node.translation)
            .rotateY(node.rotation[1] * RADIANS)
            .rotateX(node.rotation[0] * RADIANS)
            .rotateZ(node.rotation[2] * RADIANS)
            ;
        });

        // matrixtransformation
        // .translate(this.$camera.translation)
        // .rotateY(this.$camera.rotation[1] * RADIANS)
        // .rotateX(this.$camera.rotation[0] * RADIANS)
        // .rotateZ(this.$camera.rotation[2] * RADIANS)
        // ;

        this.$matrixcamera = matrixtransformation;
    }

    setmatrixprojection() {

        const {parameters} = this.$camera;
        const {projection} = parameters;
        const {far, fieldofview, near} = projection;

        const angle = fieldofview * RADIANS;
        const aspect = this.$viewer.aspect();

        this.$matrixprojection = new Matrix4()
        .perspective(angle, aspect, near, far);
    }

    usecamera(camera) {

        this.$camera = camera;

        this.setmatrixcamera();
        this.setmatrixprojection();
    }
}

export {

    Renderer
};

export default Renderer;
