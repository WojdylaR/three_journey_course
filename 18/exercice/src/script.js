import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Galaxy

const parameters = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 4,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
}

function resetGalaxy() {
    if (geometry) {
            geometry.dispose()
            particulesMarterial.dispose()
            scene.remove(particules)
        }
    }

gui.add(parameters, 'count').min(0).max(100000).step(10).onFinishChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.add(parameters, 'size').min(0).max(2).step(0.001).onFinishChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.add(parameters, 'branches').min(2).max(20).step(1).onChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.add(parameters, 'spin').min(-5).max(5).step(0.01).onChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.1).onChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.addColor(parameters, 'insideColor').onChange(() => {
    resetGalaxy()
    generateGalaxy()
})
gui.addColor(parameters, 'outsideColor').onChange(() => {
    resetGalaxy()
    generateGalaxy()
})

let geometry = null
let particulesMarterial = null
let particules = null

const generateGalaxy = () => {

    geometry =  new THREE.BufferGeometry()

    const positionsParticle = new Float32Array(parameters.count * 3)
    const colorParticle = new Float32Array(parameters.count * 3)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)
    
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i  * 3;

        const radius = Math.random() * parameters.radius
        const branchAngle = ((i % parameters.branches) / parameters.branches) * (2 * Math.PI)
        const spinAngle  = radius * parameters.spin

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
        const randomY = (Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)) / 2
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1)

        positionsParticle[i3] = Math.cos(branchAngle+ spinAngle) * radius + randomX
        positionsParticle[i3 + 1] = randomY
        positionsParticle[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)
        colorParticle[i3] = mixedColor.r
        colorParticle[i3 + 1] = mixedColor.g
        colorParticle[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positionsParticle, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colorParticle, 3))

    particulesMarterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,

    })

    particules = new THREE.Points(geometry, particulesMarterial)
    scene.add(particules)
}

generateGalaxy()

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

    tick()