/**
 * Creates game nodes from cartridge nodes.
 * @example
 * const node = new Node(cartridgenode);
 * node.translate([4, 0, 0]);
 */
class Node {

    /**
     * Stores the identifier of the game node.
     * @type {number}
     * @private
     */
    $identifier;

    /**
     * Stores the name of the game node.
     * @type {string}
     * @private
     */
    $name;

    /**
     * Stores the child nodes of the game node.
     * @type {Array<gamenode>}
     * @private
     */
    $nodes;

    /**
     * Stores the parameters of the game node.
     * @type {object}
     * @private
     */
    $parameters;

    /**
     * Stores the parent node of the game node.
     * @type {gamenode}
     * @private
     */
    $parent;

    /**
     * Stores the rotation of the game node.
     * @type {vector3}
     * @private
     */
    $rotation;

    /**
     * Stores the scale of the game node.
     * @type {vector3}
     * @private
     */
    $scale;

    /**
     * Stores the translation of the game node.
     * @type {vector3}
     * @private
     */
    $translation;

    /**
     * Stores the node type of the game node.
     * @type {nodetype}
     * @private
     */
    $type;

    /**
     * Tells if the the game node has child nodes.
     * @type {boolean}
     * @public
     * @readonly
     */
    get haschildren() {

        return this.$nodes.length !== 0;
    }

    /**
     * Tells if the the game node has a parent node.
     * @type {boolean}
     * @public
     * @readonly
     */
    get hasparent() {

        return typeof this.$parent !== 'undefined';
    }

    /**
     * Gets the identifier of the game node.
     * @type {number}
     * @public
     * @readonly
     */
    get identifier() {

        return this.$identifier;
    }

    /**
     * Gets the name of the game node.
     * @type {string}
     * @public
     * @readonly
     */
    get name() {

        return this.$name;
    }

    /**
     * Gets the child nodes of the game node.
     * @type {Array<gamenode>}
     * @public
     * @readonly
     */
    get nodes() {

        return this.$nodes;
    }

    /**
     * Gets the parameters of the game node.
     * @type {object}
     * @public
     * @readonly
     */
    get parameters() {

        return this.$immutable(this.$parameters);
    }

    /**
     * Gets the parent node of the game node.
     * @type {gamenode}
     * @public
     * @readonly
     */
    get parent() {

        return this.$parent;
    }

    /**
     * Gets the rotation of the game node.
     * @type {vector3}
     * @public
     * @readonly
     */
    get rotation() {

        return this.$immutable(this.$rotation);
    }

    /**
     * Gets the scale of the game node.
     * @type {vector3}
     * @public
     * @readonly
     */
    get scale() {

        return this.$immutable(this.$scale);
    }

    /**
     * Gets the translation of the game node.
     * @type {vector3}
     * @public
     * @readonly
     */
    get translation() {

        return this.$immutable(this.$translation);
    }

    /**
     * Gets the node type of the game node.
     * @type {nodetype}
     * @public
     * @readonly
     */
    get type() {

        return this.$type;
    }

    /**
     * Creates a game node from a cartridge node.
     * @param {(cartridgenodecamera|cartridgenodeempty|cartridgenodemodel)} cartridgenode The JSON representation of the game node.
     */
    constructor(cartridgenode) {

        const {type} = cartridgenode;

        if (type === 'CAMERA_NODE') {

            const cartridgenodecamera = /** @type {cartridgenodecamera} */ (cartridgenode);
            this.$constructornodecamera(cartridgenodecamera);
        }

        else if (type === 'MODEL_NODE') {

            const cartridgenodemodel = /** @type {cartridgenodemodel} */ (cartridgenode);
            this.$constructornodemodel(cartridgenodemodel);
        }

        else if (type === 'NODE') {

            const cartridgenodeempty = /** @type {cartridgenodeempty} */ (cartridgenode);
            this.$constructornodeempty(cartridgenodeempty);
        }
    }

    /**
     * Constructs a game node from a cartridge camera node.
     * @param {cartridgenodecamera} cartridgenodecamera The JSON representation of the game node.
     * @private
     */
    $constructornodecamera(cartridgenodecamera) {

        this.$identifier = cartridgenodecamera.identifier;
        this.$name = cartridgenodecamera.name;
        this.$type = cartridgenodecamera.type;
        this.$nodes = [];
        this.$parameters = cartridgenodecamera.parameters;
        this.$translation = cartridgenodecamera.parameters.translation;
        this.$rotation = cartridgenodecamera.parameters.rotation;
    }

    /**
     * Constructs a game node from a cartridge empty node.
     * @param {cartridgenodeempty} cartridgenodeempty The JSON representation of the game node.
     * @private
     */
    $constructornodeempty(cartridgenodeempty) {

        this.$identifier = cartridgenodeempty.identifier;
        this.$name = cartridgenodeempty.name;
        this.$type = cartridgenodeempty.type;
        this.$nodes = [];
        this.$parameters = cartridgenodeempty.parameters;
        this.$translation = cartridgenodeempty.parameters.translation;
        this.$rotation = cartridgenodeempty.parameters.rotation;
        this.$scale = cartridgenodeempty.parameters.scale;
    }

    /**
     * Constructs a game node from a cartridge model node.
     * @param {cartridgenodemodel} cartridgenodemodel The JSON representation of the game node.
     * @private
     */
    $constructornodemodel(cartridgenodemodel) {

        this.$identifier = cartridgenodemodel.identifier;
        this.$name = cartridgenodemodel.name;
        this.$type = cartridgenodemodel.type;
        this.$nodes = [];
        this.$parameters = cartridgenodemodel.parameters;
        this.$translation = cartridgenodemodel.parameters.translation;
        this.$rotation = cartridgenodemodel.parameters.rotation;
        this.$scale = cartridgenodemodel.parameters.scale;
    }

    /**
     * Gets immutable data from data source.
     * @param {any} data The data to make immutable.
     * @returns {any}
     * @private
     */
    $immutable(data) {

        if (typeof data === 'undefined') {

            return data;
        }

        return JSON.parse(JSON.stringify(data));
    }

    /**
     * Adds a child node to the game node.
     * @param {gamenode} node The child node to add to the game node.
     * @public
     */
    addchild(node) {

        this.$nodes.push(node);
    }

    /**
     * Sets the parent node of the game node.
     * @param {gamenode} node The parent node to set to the game node.
     * @public
     */
    addparent(node) {

        this.$parent = node;
    }

    /**
     * Removes a child node from the game node.
     * @param {gamenode} node The child node to remove from the game node.
     * @public
     */
    removechild(node) {

        const index = this.$nodes.indexOf(node);

        if (index !== -1) {

            this.$nodes.splice(index, 1);
        }
    }

    /**
     * Removes the parent node from the game node.
     * @public
     */
    removeparent() {

        this.$parent = undefined;
    }

    /**
     * Sets the rotate of the game node.
     * @param {vector3} rotate The rotate to set to the game node.
     * @public
     */
    rotateall([x, y, z]) {

        this.$rotation = [x, y, z];
    }

    /**
     * Sets the x rotate of the game node.
     * @param {number} x The x rotate to set to the game node.
     * @public
     */
    rotatex(x) {

        this.$rotation[0] = x;
    }

    /**
     * Sets the y rotate of the game node.
     * @param {number} y The y rotate to set to the game node.
     * @public
     */
    rotatey(y) {

        this.$rotation[1] = y;
    }

    /**
     * Sets the z rotate of the game node.
     * @param {number} z The z rotate to set to the game node.
     * @public
     */
    rotatez(z) {

        this.$rotation[2] = z;
    }

    /**
     * Sets the scale of the game node.
     * @param {vector3} scale The scale to set to the game node.
     * @public
     */
    scaleall([x, y, z]) {

        this.$scale = [x, y, z];
    }

    /**
     * Sets the x scale of the game node.
     * @param {number} x The x scale to set to the game node.
     * @public
     */
    scalex(x) {

        this.$scale[0] = x;
    }

    /**
     * Sets the y scale of the game node.
     * @param {number} y The y scale to set to the game node.
     * @public
     */
    scaley(y) {

        this.$scale[1] = y;
    }

    /**
     * Sets the z scale of the game node.
     * @param {number} z The z scale to set to the game node.
     * @public
     */
    scalez(z) {

        this.$scale[2] = z;
    }

    /**
     * Sets the translation of the game node.
     * @param {vector3} translation The translation to set to the game node.
     * @public
     */
    translateall([x, y, z]) {

        this.$translation = [x, y, z];
    }

    /**
     * Sets the x translation of the game node.
     * @param {number} x The x translation to set to the game node.
     * @public
     */
    translatex(x) {

        this.$translation[0] = x;
    }

    /**
     * Sets the y translation of the game node.
     * @param {number} y The y translation to set to the game node.
     * @public
     */
    translatey(y) {

        this.$translation[1] = y;
    }

    /**
     * Sets the z translation of the game node.
     * @param {number} z The z translation to set to the game node.
     * @public
     */
    translatez(z) {

        this.$translation[2] = z;
    }
}

export {

    Node
};

export default Node;
