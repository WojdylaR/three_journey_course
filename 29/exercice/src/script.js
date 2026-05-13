import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'


/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 1024, 1024)

const debugObj = {
    depthColor: '#186691',
    surfaceColor: '#9bd8ff',
}

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
        uBigWaveElevation: {
            value: 0.2
        },
        uBigWavesFrequency: {
            value: new THREE.Vector2(4, 1.5)
        },
        uTime: {
            value: 0
        },
        uSpeedWave: {
            value: 0.75
        },


        uDepthColor: {
            value: new THREE.Color(debugObj.depthColor)
        },
        uSurfaceColor: {
            value: new THREE.Color(debugObj.surfaceColor)
        },
        uColorOffset: {
            value: 0.2
        },
        uColorMultiplier: {
            value: 5
        },
        uFrequencySmallWave : {
            value: 4
        },
        uHeightWave : {
            value: 1.5
        },
    }
})

gui.add(waterMaterial.uniforms.uBigWaveElevation, 'value').min(0).max(1).step(0.001).name('uBigWaveElevation')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(20).step(0.1).name('uBigWavesFrequencyX')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(20).step(0.1).name('uBigWavesFrequencyY')
gui.add(waterMaterial.uniforms.uSpeedWave, 'value').min(0).max(20).step(0.1).name('uSpeedWavex')
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(10).step(0.1).name('uColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(100).step(0.1).name('uColorMultiplier')
gui.add(waterMaterial.uniforms.uFrequencySmallWave, 'value').min(0).max(10).step(1).name('uFrequencySmallWave')
gui.add(waterMaterial.uniforms.uHeightWave, 'value').min(0).max(10).step(0.001).name('uHeightWave')

gui.addColor(debugObj, 'depthColor').onChange((color) => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObj.depthColor);
})
gui.addColor(debugObj, 'surfaceColor').onChange((color) => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObj.surfaceColor);
})

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()