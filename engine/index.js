import {Engine} from './sources/core/engine.js';
import {System} from './sources/core/system.js';

import {Controller as DeviceController} from './sources/devices/controller.js';
import {Game as DeviceGame} from './sources/devices/game.js';
import {Viewer as DeviceViewer} from './sources/devices/viewer.js';

import {Forward as SystemForward} from './sources/systems/forward';
import {Render as SystemRender} from './sources/systems/render.js';

export {

    Engine,
    System,

    DeviceController,
    DeviceGame,
    DeviceViewer,

    SystemForward,
    SystemRender
};

export default {

    Engine,
    System,

    DeviceController,
    DeviceGame,
    DeviceViewer,

    SystemForward,
    SystemRender
};
