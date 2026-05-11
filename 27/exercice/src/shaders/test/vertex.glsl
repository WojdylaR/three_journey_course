// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrequency;

// attribute vec3 position;

uniform float uTime;

// attribute float aRandom;

// varying float vRandom;

varying float vElevation;

// attribute vec2 uv;
varying vec2 vUv;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin((modelPosition.x * uFrequency.x) - uTime * 2.0) * 0.1;
    elevation += sin((modelPosition.y * uFrequency.y) + uTime * 3.0) * 0.1;
    
    modelPosition.z += elevation;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectPosition = projectionMatrix * viewPosition;

    gl_Position = projectPosition;
    vElevation = elevation;

    vUv = uv;
    
    // vRandom = aRandom;
}