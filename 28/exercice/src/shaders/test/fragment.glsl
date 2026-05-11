varying vec2 vUv;

float random (vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

void main() {


    // Pattern 3

    // float strenght = vUv.x;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    //Pattern 4

    // float strenght = vUv.y;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    //Pattern 5

    // float strenght =  1.0 - vUv.y ;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    //Pattern 6

    // float strenght =  vUv.y * 10.0;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    //Pattern 7

    // float strenght =  mod(vUv.y * 10.0, 1.0);

    // gl_FragColor = vec4(vec3(strenght), 1.0);


    //Pattern 8

    // float strenght = step(mod(vUv.y * 10.0, 1.0), 0.5) ;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    // //Pattern 9

    // float strenght = step(0.8, mod(vUv.y * 10.0, 1.0)) ;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    //Pattern 10

    // float strenght = step(0.8, mod(vUv.x * 10.0, 1.0)) ;

    // gl_FragColor = vec4(vec3(strenght), 1.0);

    //Pattern 11

    // float strenght = step(0.8, mod(vUv.x * 10.0, 1.0)) + step(0.8, mod(vUv.y * 10.0, 1.0)) ;

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 12

    // float strenght = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0)) ;

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 13

    // float strenght = step(0.5, mod(vUv.x * 10.0, 1.0)) * step(0.85, mod(vUv.y * 10.0, 1.0)) ;

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 15

    // // float barX = step(0.5, mod(vUv.x * 10.0, 1.0)) * step(0.85, mod(vUv.y * 10.0, 1.0));
    // // float barY = step(0.85, mod(vUv.x * 10.0, 1.0)) * step(0.5, mod(vUv.y * 10.0, 1.0)) ;

    // // float strenght = barX + barY;

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 15

    // float barX = step(0.5, mod(vUv.x * 10.0, 1.0)) * step(0.85, mod((vUv.y + 0.0175) * 10.0, 1.0));
    // float barY = step(0.85, mod((vUv.x + 0.0175) * 10.0, 1.0)) * step(0.5, mod(vUv.y * 10.0, 1.0));

    //Pattern 16

    // float strenght = abs(0.5 - vUv.x);

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 17

    // float strenght = min(abs(0.5 - vUv.x), abs(0.5 - vUv.y));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);


    //Pattern 18

    // float strenght = max(abs(0.5 - vUv.x), abs(0.5 - vUv.y));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 19

    // float strenght = step(0.2, max(abs(0.5 - vUv.x), abs(0.5 - vUv.y)));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 20

    // float firstSquare = step(0.2, max(abs(0.5 - vUv.x), abs(0.5 - vUv.y)));
    // float secondSquare = 1.0 - step(0.25, max(abs(0.5 - vUv.x), abs(0.5 - vUv.y)));

    // float strenght = firstSquare * secondSquare;

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    //Pattern 21

    // float strenght = round(vUv.x * 10.0) / 10.0;

    // // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 22

    // float strenght = (floor(vUv.x * 10.0) / 10.0) * (floor(vUv.y * 10.0) / 10.0);

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);


    //Pattern 23

    // float strenght = random(vUv);

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);
    
    
    // //Pattern 24

    // float strenght = random(vec2((floor(vUv.x * 10.0) / 10.0), (floor(vUv.y * 10.0) / 10.0)));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);
    
    // //Pattern 25

    // float strenght = random(vec2((floor(vUv.x * 10.0) / 10.0), (floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0)));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // // //Pattern 26

    // float strenght = length(vUv);

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 27

    // float strenght = distance(vUv, vec2(0.5)) * 0.8;

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 28

    // float strenght = 1.0 - distance(vUv, vec2(0.5));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 29

    // float strenght = 0.015 / distance(vUv, vec2(0.5));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 30

    // vec2 lightUv = vec2(
    //     vUv.x * 0.1 + 0.45,
    //     vUv.y * 0.5 + 0.25);

    // float strenght = 0.015 / distance(lightUv, vec2(0.5));

    // gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

    // //Pattern 31

    vec2 lightUv = vec2(
        vUv.x * 0.1 + 0.45,
        vUv.y * 0.5 + 0.25);

    float strenght = 0.015 / distance(lightUv, vec2(0.5));

    gl_FragColor = vec4(vec3(strenght, strenght, strenght), 1.0);

}