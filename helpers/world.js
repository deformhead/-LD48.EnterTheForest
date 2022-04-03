import Node from './node.js';

/**
 * Creates game worlds from cartridges.
 * @example
 * const world = new World(cartridge);
 *
 * world.removenode(identifier);
 *
 * const download = world.tocartridge();
 */
class World {

    /**
     * Stores the main camera game node of the game.
     * @type {gamenode}
     * @private
     */
    $camera;

    /**
     * Stores the game nodes of type camera of the game.
     * @type {Object<number, gamenode>}
     * @private
     */
    $cameras;

     /**
     * Stores the JSON representation of the game.
     * @type {cartridge}
     * @private
     */
    $cartridge;

    /**
     * Stores the game nodes of type model of the game.
     * @type {Object<number, gamenode>}
     * @private
     */
    $models;

    /**
     * Stores all the game nodes of the game.
     * @type {Object<number, gamenode>}
     * @private
     */
    $nodes;

    /**
     * Stores the root game node of the game.
     * @type {gamenode}
     * @private
     */
    $root;

    /**
     * Gets the main camera game node of the game.
     * @type {gamenode}
     * @public
     * @readonly
     */
    get camera() {

        return this.$camera;
    }

    /**
     * Gets the game nodes of type camera of the game.
     * @type {Object<number, gamenode>}
     * @public
     * @readonly
     */
    get cameras() {

        return this.$cameras;
    }

    /**
     * Gets the game nodes of type model of the game.
     * @type {Object<number, gamenode>}
     * @public
     * @readonly
     */
    get models() {

        return this.$models;
    }

    /**
     * Gets all the game nodes of the game.
     * @type {Object<number, gamenode>}
     * @public
     * @readonly
     */
    get nodes() {

        return this.$nodes;
    }

    /**
     * Gets the root game node of the game.
     * @type {gamenode}
     * @public
     * @readonly
     */
    get root() {

        return this.$root;
    }

    /**
     * Sets the main camera game node of the game.
     * @type {gamenode}
     * @public
     */
    set camera(node) {

        this.$camera = node;
    }

    /**
     * Sets the root game node of the game.
     * @type {gamenode}
     * @public
     */
    set root(node) {

        this.$root = node;
    }

    /**
     * Creates a game world from the cartridge.
     * @param {cartridge} cartridge the JSON representation of the game.
     */
    constructor(cartridge) {

        this.$cartridge = this.$immutable(cartridge);

        this.$cameras = {};
        this.$models = {};
        this.$nodes = {};

        this.$cartridge.nodes.forEach((cartridgenode) => {

            const identifier = cartridgenode.identifier;

            if (typeof this.$nodes[identifier] === 'undefined') {

                this.$nodes[identifier] = this.$gethierarchy(identifier);
            }
        });

        this.$camera = this.$nodes[this.$cartridge.camera];
        this.$root = this.$nodes[this.$cartridge.node];
    }

    /**
     * Gets the full hierarchy (top to bottom) of a game node from the cartridge node.
     * @param {number} identifier The identifier of the cartridge node.
     * @returns {gamenode}
     * @private
     */
    $gethierarchy(identifier) {

        const cartridgenode = this.$cartridge.nodes.find((cartridgenode) => cartridgenode.identifier === identifier);
        const node = new Node(cartridgenode);

        if (node.type === 'CAMERA_NODE') {

            this.$cameras[identifier] = node;
        }

        else if (node.type === 'MODEL_NODE') {

            this.$models[identifier] = node;
        }

        if (cartridgenode.nodes.length !== 0) {

            const parent = node;

            cartridgenode.nodes.forEach((identifier) => {

                if (typeof this.$nodes[identifier] === 'undefined') {

                    this.$nodes[identifier] = this.$gethierarchy(identifier);
                }

                const current = this.$nodes[identifier];

                current.addparent(parent);
                parent.addchild(current);
            });
        }

        return node;
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
     * Adds a model node to the game world.
     * @param {object} properties The properties needed to add the model node.
     * @param {string} [properties.$name] The name of the model node.
     * @param {string} [properties.$type] The model type of the model node.
     * @param {gamenode} parent The game node to set as parent.
     * @returns {gamenode}
     * @public
     */
    addmodel(properties, parent, identifier = Date.now()) {

        const {

            '$name': $name = 'Model',
            '$type': $type = 'box'

        } = properties;

        const node = new Node({

            'identifier': identifier,
            'name': $name,
            'type': 'MODEL_NODE',
            'nodes': [],
            'parameters': {

                'translation': [0, 0, 0],
                'rotation': [0, 0, 0],
                'scale': [1, 1, 1],
                'type': $type
            }
        });

        this.$nodes[identifier] = node;
        this.$models[identifier] = node;

        node.addparent(parent);
        parent.addchild(node);

        return node;
    }

    /**
     * Adds a simple node to the game world.
     * @param {object} properties The properties needed to add the simple node.
     * @param {string} [properties.$name] The name of the simple node.
     * @param {gamenode} parent The game node to set as parent.
     * @returns {gamenode}
     * @public
     */
    addnode(properties, parent) {

        const {

            '$name': $name = 'Node'

        } = properties;

        const identifier = Date.now();

        const node = new Node({

            'identifier': identifier,
            'name': $name,
            'type': 'NODE',
            'nodes': [],
            'parameters': {

                'translation': [0, 0, 0],
                'rotation': [0, 0, 0],
                'scale': [1, 1, 1]
            }
        });

        this.$nodes[identifier] = node;

        node.addparent(parent);
        parent.addchild(node);

        return node;
    }

    /**
     * Gets a game node from an identifier.
     * @param {number} identifier The identifier of the game node.
     * @returns {gamenode}
     * @public
     */
    getnode(identifier) {

        return this.$nodes[identifier];
    }

    /**
     * Gets all the parents of a game node in the game world from top to bottom.
     * @param {gamenode} node The game node to get the game world transformations from.
     * @returns {Array<gamenode>}
     * @public
     */
    getparents(node) {

        const parents = [];

        if (typeof node.parent !== 'undefined') {

            parents.push(...this.getparents(node.parent));
        }

        parents.push(node);

        return parents;
    }

    /**
     * Removes a game node from the game world.
     * @param {number} identifier The identifier of the game node.
     * @returns {Array<number>}
     * @public
     */
    removenode(identifier) {

        const removed = [];

        const node = this.$nodes[identifier];

        removed.push(node.identifier);

        if (node.haschildren === true) {

            const parent = node;

            [...parent.nodes].forEach((node) => {

                removed.push(...this.removenode(node.identifier));
            });
        }

        if (node.hasparent === true) {

            node.parent.removechild(node);
            node.removeparent();
        }

        if (node === this.$camera) {

            this.$camera = undefined;
        }

        if (node === this.$root) {

            this.$root = undefined;
        }

        delete this.$cameras[identifier];
        delete this.$models[identifier];
        delete this.$nodes[identifier];

        return removed;
    }

    /**
     * Changes the parent node of a game node.
     * @param {gamenode} node The game node to reparent.
     * @param {gamenode} parent The game node to set as new parent.
     * @public
     */
    reparent(node, parent) {

        if (node === parent
        || node.parent === parent
        || parent.type !== 'NODE') {

            return;
        }

        if (node.hasparent === true) {

            node.parent.removechild(node);
            node.removeparent();
        }

        node.addparent(parent);
        parent.addchild(node);

        return node;
    }

    /**
     * Gets the JSON representation of the game.
     * @returns {cartridge}
     * @public
     */
    tocartridge() {

        const cartridge = {};

        cartridge.nodes = [];

        Object.values(this.$nodes).forEach((node) => {

            const {identifier, name, nodes, parameters, type} = node;

            const cartridgenode = {};

            cartridgenode.identifier = identifier;
            cartridgenode.name = name;
            cartridgenode.type = type;
            cartridgenode.nodes = nodes.map((node) => node.identifier);
            cartridgenode.parameters = parameters;

            cartridge.nodes.push(cartridgenode);
        });

        cartridge.camera = this.$camera.identifier;
        cartridge.node = this.$root.identifier;

        return this.$immutable(cartridge);
    }
}

export {

    World
};

export default World;
