import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { vertexColor } from 'three/src/nodes/accessors/VertexColorNode.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/particles/2.png')

//  texutre


// Geometry


const particulesGeometry = new THREE.SphereGeometry(1, 32, 32)

const geometry = new THREE.BufferGeometry()
const count = 5000

const positionArray = new Float32Array(count * 3)
const colorArray = new Float32Array(count * 3)


for (let i = 0; i < count * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 10
    colorArray[i] = (Math.random())
}

const positionAttribute  = new THREE.BufferAttribute(positionArray, 3)
const colorAttribute  = new THREE.BufferAttribute(colorArray, 3)

geometry.setAttribute('position', positionAttribute)
geometry.setAttribute('color', colorAttribute)

//   Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    alphaMap: texture,
    transparent: true,
    // alphaTest: 0.001
    // depthTest: false
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
})

// Points

const particles = new THREE.Points(particulesGeometry, particlesMaterial)
const randomParticles = new THREE.Points(geometry, particlesMaterial)

console.log(particles)
console.log(randomParticles)

scene.add(randomParticles)


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

    // Update Particules

    // randomParticles.rotation.y = elapsedTime
    
    for(let i = 0; i < count; i++) {

        const i3 = i * 3

        const x = randomParticles.geometry.attributes.position.array[i3]
        randomParticles.geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    randomParticles.geometry.attributes.position.needsUpdate =  true

    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()