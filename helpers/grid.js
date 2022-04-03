/**
 * Creates grid models on the x and z axes.
 * @param {number} size The number of divisions per half axis.
 * @param {number} steps The steps to highlight main divisions.
 * @returns {modelJSON}
 */
function grid(size, steps) {

    const positions = [];
    const colors = [];

    positions.push(

        0.0, 0.0, 0.0,
        -size, 0.0, 0.0,

        0.0, 0.0, 0.0,
        size, 0.0, 0.0,

        0.0, 0.0, 0.0,
        0.0, -size, 0.0,

        0.0, 0.0, 0.0,
        0.0, size, 0.0,

        0.0, 0.0, 0.0,
        0.0, 0.0, -size,

        0.0, 0.0, 0.0,
        0.0, 0.0, size
    );

    colors.push(

        1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,

        1.0, 0.4, 0.4, 1.0,
        1.0, 0.4, 0.4, 1.0,

        1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,

        0.4, 1.0, 0.4, 1.0,
        0.4, 1.0, 0.4, 1.0,

        1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,

        0.4, 0.4, 1.0, 1.0,
        0.4, 0.4, 1.0, 1.0
    );

    for (let iterator = 1; iterator < size + 1; iterator += 1) {

        let red = 0.2;
        let green = 0.2;
        let blue = 0.2;

        if (iterator % steps === 0) {

            red = 0.4;
            green = 0.4;
            blue = 0.4;
        }

        if (iterator === size) {

            red = 0.4;
            green = 0.4;
            blue = 0.4;
        }

        positions.push(

            -size, 0.0, -iterator,
            size, 0.0, -iterator,

            -size, 0.0, iterator,
            size, 0.0, iterator,

            -iterator, 0.0, -size,
            -iterator, 0.0, size,

            iterator, 0.0, -size,
            iterator, 0.0, size
        );

        colors.push(

            red, green, blue, 1.0,
            red, green, blue, 1.0,

            red, green, blue, 1.0,
            red, green, blue, 1.0,

            red, green, blue, 1.0,
            red, green, blue, 1.0,

            red, green, blue, 1.0,
            red, green, blue, 1.0
        );
    }

    return {

        'draw': {

            'method': 'arrays',
            'mode': 'LINES',
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

    grid
};

export default grid;
