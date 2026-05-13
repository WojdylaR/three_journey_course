uniform float uStarSize;
uniform float uStarSizeScale;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;



void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.1;

    angle += angleOffset;

    modelPosition.x = cos(angle) * distanceToCenter * 2.0;
    modelPosition.z = sin(angle) * distanceToCenter * 2.0;

    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = aScale * uStarSizeScale * uStarSize;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}