const vertex = (

    'attribute vec4 COLOR;' +
    'attribute vec3 NORMAL;' +
    'attribute vec4 POSITION;' +

    'uniform vec3 directional;' +
    'uniform vec3 directionalColor;' +
    'uniform mat4 projection;' +
    'uniform mat4 transformation;' +
    'uniform mat4 view;' +

    'varying highp vec4 v_color;' +
    'varying highp vec3 v_light;' +

    'void main(void) {' +

        'gl_Position = projection * view * transformation * POSITION;' +
        'v_color = COLOR;' +
        'v_light = directionalColor * dot(normalize(directional), normalize(mat3(transformation) * NORMAL));' +
    '}'
);

export {

    vertex
};

export default vertex;
