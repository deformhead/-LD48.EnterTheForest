const vertex = (

    'attribute vec4 COLOR;' +
    'attribute vec4 POSITION;' +

    'uniform mat4 projection;' +
    'uniform mat4 transformation;' +
    'uniform mat4 view;' +

    'varying highp vec4 v_color;' +

    'void main(void) {' +

        'gl_Position = projection * view * transformation * POSITION;' +
        'v_color = COLOR;' +
    '}'
);

export {

    vertex
};

export default vertex;
