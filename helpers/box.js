function getnormals() {

    return [

        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,

        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,

        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0
    ];
}

function getpositions(x, y, z) {

    const positions = [

        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,

        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,

        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,

        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,

        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,

        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,

        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,

        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,

        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0

    ].map((value, index) => {

        if (index % 3 === 0) return value + x;
        if (index % 3 === 1) return value + y;
        if (index % 3 === 2) return value + z;
    });

    return positions;
}

/**
 * Creates box models.
 * @returns {modelJSON}
 */
function box(r = 1.0, g = 1.0, b = 1.0) {

    const positions = [];
    const colors = [];
    const normals = [];

    const count = 1;
    const space = 3;

    for (let x = 0; x < count; x += 1) {

        for (let y = 0; y < count; y += 1) {

            for (let z = 0; z < count; z += 1) {

                positions.push(

                    ...getpositions(((x - count/2) * space + (space/2)), ((y - count/2) * space + (space/2)), ((z - count/2) * space + (space/2)))
                );

                normals.push(

                    ...getnormals()
                );

                for (let iterator = 0, length = positions.length / 3; iterator < length; iterator += 1) {

                    colors.push(r, g, b, 1.0);
                }
            }
        }
    }

    return {

        'draw': {

            'method': 'arrays',
            'mode': 'TRIANGLES',
            'offset': 0,
            'count': positions.length / 3
        },
        'colors': {

            'buffer': colors,
            'components': 4,
            'type': 'FLOAT',
            'normalize': false,
            'stride': 0,
            'offset': 0
        },
        'normals': {

            'buffer': normals,
            'components': 3,
            'type': 'FLOAT',
            'normalize': false,
            'stride': 0,
            'offset': 0
        },
        'positions': {

            'buffer': positions,
            'components': 3,
            'type': 'FLOAT',
            'normalize': false,
            'stride': 0,
            'offset': 0
        }
    };
}

export {

    box
};

export default box;
