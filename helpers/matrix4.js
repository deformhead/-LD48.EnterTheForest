/**
 * Creates 4x4 matrices.
 * @example <caption>With chaining:</caption>
 * const elements = new Matrix4()
 * .set([...])
 * .translate([1, 0, 0])
 * .get();
 * @example <caption>Without chaining:</caption>
 * const matrix = new Matrix4();
 *
 * matrix.set([...]);
 * matrix.translate([1, 0, 0]);
 *
 * const elements = matrix.get();
 */
class Matrix4 {

    /**
     * Stores the elements of the matrix.
     * @type {number[]}
     * @private
     */
    $elements = [];

    /**
     * Stores the elements of the matrix.
     * @type {number[]}
     * @public
     * @readonly
     */
    get elements() {

        return this.$elements;
    }

    /**
     * Creates a new 4x4 matrix.
     */
    constructor() {

        this.identity();
    }

    /**
     * Adds a 4x4 matrix.
     * @param {Matrix4} matrix The 4x4 matrix to add.
     * @returns {this}
     */
    add(matrix) {

        const elements = matrix.get();

        this.$elements[0] += elements[0];
        this.$elements[1] += elements[1];
        this.$elements[2] += elements[2];
        this.$elements[3] += elements[3];

        this.$elements[4] += elements[4];
        this.$elements[5] += elements[5];
        this.$elements[6] += elements[6];
        this.$elements[7] += elements[7];

        this.$elements[8] += elements[8];
        this.$elements[9] += elements[9];
        this.$elements[10] += elements[10];
        this.$elements[11] += elements[11];

        this.$elements[12] += elements[12];
        this.$elements[13] += elements[13];
        this.$elements[14] += elements[14];
        this.$elements[15] += elements[15];

        return this;
    }

    /**
     * Clones a 4x4 matrix.
     * @param {Matrix4} matrix The 4x4 matrix to clone.
     * @returns {this}
     */
    clone(matrix){

        this.$elements = [...matrix.get()];

        return this;
    }



























    /**
     * @TODO -----------------------------------------
     */
    from(elements) {

        this.$elements = [...elements];

        return this;
    }



























    /**
     * Gets the elements of the 4x4 matrix.
     * @returns {number[]}
     */
    get() {

        return [...this.$elements];
    }

    /**
     * Sets the 4x4 matrix to the identity matrix.
     * @returns {this}
     */
    identity() {

        this.$elements = [

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        return this;
    }

    /**
     * Inverts the 4x4 matrix.
     * @returns {this}
     */
    invert() {

        const [

            aa, ab, ac, ad,
            ba, bb, bc, bd,
            ca, cb, cc, cd,
            da, db, dc, dd

        ] = this.$elements;

        const eeff = aa * bb - ab * ba;
        const eefg = aa * bc - ac * ba;
        const eefh = aa * bd - ad * ba;
        const effg = ab * bc - ac * bb;
        const effh = ab * bd - ad * bb;
        const egfh = ac * bd - ad * bc;

        const gehf = ca * db - cb * da;
        const gehg = ca * dc - cc * da;
        const gehh = ca * dd - cd * da;
        const gfhg = cb * dc - cc * db;
        const gfhh = cb * dd - cd * db;
        const gghh = cc * dd - cd * dc;


        const determinant = eeff * gghh - eefg * gfhh + eefh * gfhg + effg * gehh - effh * gehg + egfh * gehf;

        if (determinant !== 0) {

            this.$elements[0] = (bb * gghh - bc * gfhh + bd * gfhg) / determinant;
            this.$elements[1] = (ac * gfhh - ab * gghh - ad * gfhg) / determinant;
            this.$elements[2] = (db * egfh - dc * effh + dd * effg) / determinant;
            this.$elements[3] = (cc * effh - cb * egfh - cd * effg) / determinant;

            this.$elements[4] = (bc * gehh - ba * gghh - bd * gehg) / determinant;
            this.$elements[5] = (aa * gghh - ac * gehh + ad * gehg) / determinant;
            this.$elements[6] = (dc * eefh - da * egfh - dd * eefg) / determinant;
            this.$elements[7] = (ca * egfh - cc * eefh + cd * eefg) / determinant;

            this.$elements[8] = (ba * gfhh - bb * gehh + bd * gehf) / determinant;
            this.$elements[9] = (ab * gehh - aa * gfhh - ad * gehf) / determinant;
            this.$elements[10] = (da * effh - db * eefh + dd * eeff) / determinant;
            this.$elements[11] = (cb * eefh - ca * effh - cd * eeff) / determinant;

            this.$elements[12] = (bb * gehg - ba * gfhg - bc * gehf) / determinant;
            this.$elements[13] = (aa * gfhg - ab * gehg + ac * gehf) / determinant;
            this.$elements[14] = (db * eefg - da * effg - dc * eeff) / determinant;
            this.$elements[15] = (ca * effg - cb * eefg + cc * eeff) / determinant;
        }

        return this;
    }




















    // @TODO ------------------------------

    multiply(b) {

        b = b.get();

        let a00 = this.$elements[0],
          a01 = this.$elements[1],
          a02 = this.$elements[2],
          a03 = this.$elements[3];

        let a10 = this.$elements[4],
          a11 = this.$elements[5],
          a12 = this.$elements[6],
          a13 = this.$elements[7];

        let a20 = this.$elements[8],
          a21 = this.$elements[9],
          a22 = this.$elements[10],
          a23 = this.$elements[11];

        let a30 = this.$elements[12],
          a31 = this.$elements[13],
          a32 = this.$elements[14],
          a33 = this.$elements[15];

        // Cache only the current line of the second matrix

        let b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];

        this.$elements[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.$elements[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.$elements[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.$elements[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];

        this.$elements[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.$elements[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.$elements[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.$elements[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];

        this.$elements[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.$elements[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.$elements[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.$elements[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];

        this.$elements[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.$elements[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.$elements[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.$elements[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return this;
    }






















    /**
     * Sets the 4x4 matrix to a finite perspective projection.
     * @param {number} angle The vertical field of view in radians.
     * @param {number} aspect The aspect ratio of the field of view (width / height).
     * @param {number} near The distance to the near clipping plane.
     * @param {number} far The distance to the far clipping plane.
     * @returns {this}
     */
    perspective(angle, aspect, near, far) {

        const tangent = Math.tan(angle / 2);
        const range = near - far;

        this.$elements[0] = 1 / (tangent * aspect);
        this.$elements[1] = 0;
        this.$elements[2] = 0;
        this.$elements[3] = 0;

        this.$elements[4] = 0;
        this.$elements[5] = 1 / tangent;
        this.$elements[6] = 0;
        this.$elements[7] = 0;

        this.$elements[8] = 0;
        this.$elements[9] = 0;
        this.$elements[10] = (near + far) / range;
        this.$elements[11] = -1;

        this.$elements[12] = 0;
        this.$elements[13] = 0;
        this.$elements[14] = 2 * near * far / range;
        this.$elements[15] = 0;

        return this;
    }

    /**
     * Rotates the 4x4 matrix.
     * @param {number} angle The angle of rotation in radians.
     * @param {number[]} vector3 The rotation to apply.
     * @returns {this}
     */
    rotate(angle, vector3) {

        let [x, y, z] = vector3;

        const hypotenuse = Math.hypot(x, y, z);

        if (hypotenuse < Number.EPSILON) {

            return this;
        }

        const sine = Math.sin(angle);
        const cosine = Math.cos(angle);
        const tangent = 1 - cosine;

        x /= hypotenuse;
        y /= hypotenuse;
        z /= hypotenuse;

        const ee = x * x * tangent + cosine;
        const ef = y * x * tangent + z * sine;
        const eg = z * x * tangent - y * sine;

        const fe = x * y * tangent - z * sine;
        const ff = y * y * tangent + cosine;
        const fg = z * y * tangent + x * sine;

        const ge = x * z * tangent + y * sine;
        const gf = y * z * tangent - x * sine;
        const gg = z * z * tangent + cosine;

        const {

            '0': aa,
            '1': ab,
            '2': ac,
            '3': ad,

            '4': ba,
            '5': bb,
            '6': bc,
            '7': bd,

            '8': ca,
            '9': cb,
            '10': cc,
            '11': cd

        } = this.$elements;

        this.$elements[0] = aa * ee + ba * ef + ca * eg;
        this.$elements[1] = ab * ee + bb * ef + cb * eg;
        this.$elements[2] = ac * ee + bc * ef + cc * eg;
        this.$elements[3] = ad * ee + bd * ef + cd * eg;

        this.$elements[4] = aa * fe + ba * ff + ca * fg;
        this.$elements[5] = ab * fe + bb * ff + cb * fg;
        this.$elements[6] = ac * fe + bc * ff + cc * fg;
        this.$elements[7] = ad * fe + bd * ff + cd * fg;

        this.$elements[8] = aa * ge + ba * gf + ca * gg;
        this.$elements[9] = ab * ge + bb * gf + cb * gg;
        this.$elements[10] = ac * ge + bc * gf + cc * gg;
        this.$elements[11] = ad * ge + bd * gf + cd * gg;

        return this;
    }

    /**
     * Rotates the 4x4 matrix on the x axis.
     * @param {number} angle The angle of rotation in radians.
     * @returns {this}
     */
    rotateX(angle) {

        const sine = Math.sin(angle);
        const cosine = Math.cos(angle);

        const {

            '4': ba,
            '5': bb,
            '6': bc,
            '7': bd,

            '8': ca,
            '9': cb,
            '10': cc,
            '11': cd

        } = this.$elements;

        this.$elements[4] = ba * cosine + ca * sine;
        this.$elements[5] = bb * cosine + cb * sine;
        this.$elements[6] = bc * cosine + cc * sine;
        this.$elements[7] = bd * cosine + cd * sine;

        this.$elements[8] = ca * cosine - ba * sine;
        this.$elements[9] = cb * cosine - bb * sine;
        this.$elements[10] = cc * cosine - bc * sine;
        this.$elements[11] = cd * cosine - bd * sine;

        return this;
    }

    /**
     * Rotates the 4x4 matrix on the y axis.
     * @param {number} angle The angle of rotation in radians.
     * @returns {this}
     */
    rotateY(angle) {

        const sine = Math.sin(angle);
        const cosine = Math.cos(angle);

        const {

            '0': aa,
            '1': ab,
            '2': ac,
            '3': ad,

            '8': ca,
            '9': cb,
            '10': cc,
            '11': cd

        } = this.$elements;

        this.$elements[0] = aa * cosine - ca * sine;
        this.$elements[1] = ab * cosine - cb * sine;
        this.$elements[2] = ac * cosine - cc * sine;
        this.$elements[3] = ad * cosine - cd * sine;

        this.$elements[8] = aa * sine + ca * cosine;
        this.$elements[9] = ab * sine + cb * cosine;
        this.$elements[10] = ac * sine + cc * cosine;
        this.$elements[11] = ad * sine + cd * cosine;

        return this;
    }

    /**
     * Rotates the 4x4 matrix on the z axis.
     * @param {number} angle The angle of rotation in radians.
     * @returns {this}
     */
    rotateZ(angle) {

        const sine = Math.sin(angle);
        const cosine = Math.cos(angle);

        const {

            '0': aa,
            '1': ab,
            '2': ac,
            '3': ad,

            '4': ba,
            '5': bb,
            '6': bc,
            '7': bd

        } = this.$elements;

        this.$elements[0] = aa * cosine + ba * sine;
        this.$elements[1] = ab * cosine + bb * sine;
        this.$elements[2] = ac * cosine + bc * sine;
        this.$elements[3] = ad * cosine + bd * sine;

        this.$elements[4] = ba * cosine - aa * sine;
        this.$elements[5] = bb * cosine - ab * sine;
        this.$elements[6] = bc * cosine - ac * sine;
        this.$elements[7] = bd * cosine - ad * sine;

        return this;
    }

    /**
     * Scales the 4x4 matrix.
     * @param {number[]} vector3 The scale to apply.
     * @returns {this}
     */
    scale(vector3) {

        const [x, y, z] = vector3;

        this.$elements[0] *= x;
        this.$elements[1] *= x;
        this.$elements[2] *= x;
        this.$elements[3] *= x;

        this.$elements[4] *= y;
        this.$elements[5] *= y;
        this.$elements[6] *= y;
        this.$elements[7] *= y;

        this.$elements[8] *= z;
        this.$elements[9] *= z;
        this.$elements[10] *= z;
        this.$elements[11] *= z;

        return this;
    }

    /**
     * Sets the elements of the 4x4 matrix.
     * @param {number[]} elements The elements to set.
     * @returns {this}
     */
    set(elements) {

        this.$elements = [...elements];

        return this;
    }

    /**
     * Subtracts a 4x4 matrix.
     * @param {Matrix4} matrix The 4x4 matrix to subtract.
     * @returns {this}
     */
    subtract(matrix) {

        const elements = matrix.get();

        this.$elements[0] -= elements[0];
        this.$elements[1] -= elements[1];
        this.$elements[2] -= elements[2];
        this.$elements[3] -= elements[3];

        this.$elements[4] -= elements[4];
        this.$elements[5] -= elements[5];
        this.$elements[6] -= elements[6];
        this.$elements[7] -= elements[7];

        this.$elements[8] -= elements[8];
        this.$elements[9] -= elements[9];
        this.$elements[10] -= elements[10];
        this.$elements[11] -= elements[11];

        this.$elements[12] -= elements[12];
        this.$elements[13] -= elements[13];
        this.$elements[14] -= elements[14];
        this.$elements[15] -= elements[15];

        return this;
    }

    /**
     * Translates the 4x4 matrix.
     * @param {number[]} vector3 The translation to apply.
     * @returns {this}
     */
    translate(vector3) {

        const [x, y, z] = vector3;

        const [

            aa, ab, ac, ad,
            ba, bb, bc, bd,
            ca, cb, cc, cd,
            da, db, dc, dd

        ] = this.$elements;

        this.$elements[12] = aa * x + ba * y + ca * z + da;
        this.$elements[13] = ab * x + bb * y + cb * z + db;
        this.$elements[14] = ac * x + bc * y + cc * z + dc;
        this.$elements[15] = ad * x + bd * y + cd * z + dd;

        return this;
    }

    /**
     * Transposes the 4x4 matrix.
     * @returns {this}
     */
    transpose() {

        const {

            '1': ab,
            '2': ac,
            '3': ad,

            '4': ba,
            '6': bc,
            '7': bd,

            '8': ca,
            '9': cb,
            '11': cd,

            '12': da,
            '13': db,
            '14': dc

        } = this.$elements;

        this.$elements[1] = ba;
        this.$elements[2] = ca;
        this.$elements[3] = da;

        this.$elements[4] = ab;
        this.$elements[6] = cb;
        this.$elements[7] = db;

        this.$elements[8] = ac;
        this.$elements[9] = bc;
        this.$elements[11] = dc;

        this.$elements[12] = ad;
        this.$elements[13] = bd;
        this.$elements[14] = cd;

        return this;
    }
}

export {

    Matrix4
};

export default Matrix4;
