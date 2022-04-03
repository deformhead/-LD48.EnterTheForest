const fragment = (

    'varying highp vec4 v_color;' +
    'varying highp vec3 v_light;' +

    'void main(void) {' +

        'highp float fognear = 0.97;' +
        'highp float fogfar = 1.0;' +
        'highp vec4 fogcolor = vec4(0.0);' +

        'highp float fogamount = smoothstep(fognear, fogfar, gl_FragCoord.z);' +

        'gl_FragColor = mix(vec4(v_color.rgb * v_light * 1.0, 1.0), fogcolor, fogamount);' +
        // 'gl_FragColor = vec4(v_color.rgb * v_light * 0.5 + 0.5, 1.0);' +

    '}'
);

export {

    fragment
};

export default fragment;
