import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

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

const matcap = textureLoader.load('/textures/matcaps/8.png')
matcap.colorSpace = THREE.SRGBColorSpace


const width = 30

// Font

const fontLoader = new FontLoader()

fontLoader.load('/font/helvetiker_regular.typeface.json', (font) => {
    const textGometry = new TextGeometry('Hello World !', {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
    })

    textGometry.computeBoundingBox()

    console.log(textGometry)

    textGometry.translate(- (textGometry.boundingBox.max.x + 0.02) * 0.5, - (textGometry.boundingBox.max.y + 0.02) * 0.5, - (textGometry.boundingBox.max.z + 0.03) * 0.5)

    const material = new THREE.MeshMatcapMaterial()
    material.matcap = matcap

    scene.add(new THREE.Mesh(textGometry, material))
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 62, 62)

    for (let i = 0; i < 1000; i++) {

        const donut = new THREE.Mesh(donutGeometry, material)

        donut.position.x = Math.random() * width - width / 2 
        donut.position.y = Math.random() * width - width / 2 
        donut.position.z = Math.random() * width - width / 2

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI
        donut.rotation.z = Math.random() * Math.PI

        const scale = Math.random() * 2

        donut.scale.x = scale
        donut.scale.y = scale
        donut.scale.z = scale

        scene.add(donut)
    }

})


// scene.add(new THREE.AxesHelper())





/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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