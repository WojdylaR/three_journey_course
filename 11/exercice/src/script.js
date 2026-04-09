import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


//Debug

const gui = new GUI

// Scene
const scene = new THREE.Scene()

// Texture

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

doorColorTexture.colorSpace= THREE.SRGBColorSpace
matcapTexture.colorSpace= THREE.SRGBColorSpace


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// MATERIAL


// const material = new THREE.MeshBasicMaterial()

// material.map = doorColorTexture
// material.color = new THREE.Color('red')

// material.transparent = true
// material.opacity = 0.5

// material.alphaMap = doorAlphaTexture

// material.side = THREE.DoubleSide

// MATERIAL 2

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true


// MATERIAL 3


// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MATERIAL 4

// const material = new THREE.MeshDepthMaterial()


//Material 5

// const material = new THREE.MeshLambertMaterial()

// Material 6

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 10
// material.specular = new THREE.Color('red')


// Material 7

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture


// Material 8

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// gui.add(material, 'metalness').min(0).max(1)

// material.roughness = 1
// gui.add(material, 'roughness').min(0).max(1)

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.displacementMap = doorHeightTexture
// material.displacementScale =  0.05
// material.roughnessMap = doorRoughnessTexture
// material.metalnessMap = doorMetalnessTexture
// material.normalMap = doorNormalTexture
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// material 9

const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
gui.add(material, 'metalness').min(0).max(1)

material.roughness = 1
gui.add(material, 'roughness').min(0).max(1)

material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.displacementMap = doorHeightTexture
material.displacementScale =  0.05
material.roughnessMap = doorRoughnessTexture
material.metalnessMap = doorMetalnessTexture
material.normalMap = doorNormalTexture
material.transparent = true
material.alphaMap = doorAlphaTexture


// material.clearcoat = 1
// gui.add(material, 'clearcoat').min(0).max(1)

// material.clearcoatRoughness = 1
// gui.add(material, 'clearcoatRoughness').min(0).max(1)


// material.sheen = 1
// gui.add(material, 'sheen').min(0).max(1)
// material.sheenRoughness = 0.25
// gui.add(material, 'sheenRoughness').min(0).max(1)
// material.sheenColor.set(1, 1, 1)


// material.iridescence = 1
// gui.add(material, 'iridescence').min(0).max(1)
// material.iridescenceIOR = 1
// gui.add(material, 'iridescenceIOR').min(0).max(1)
// material.iridescenceThicknessRange= [100, 800]


material.transmission = 1
material.ior = 1.5 
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(5)
gui.add(material, 'ior').min(0).max(5)
gui.add(material, 'thickness').min(0).max(5)



// Environement map


const rglbeLodaer = new RGBELoader()

rglbeLodaer.load('./textures/environmentMap/2k.hdr', (environementMap) => {
    environementMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environementMap
    scene.environment = environementMap
})


//LIGHT

// const ambiantLight= new THREE.AmbientLight('#ffffff', 1)

// const pointLight = new THREE.PointLight('#faffff', 30)
// pointLight.position.z = 2
// pointLight.position.y = 3
// pointLight.position.x = 2

// scene.add(ambiantLight, pointLight)

const sphereGeometry = new THREE.SphereGeometry(0.5, 62, 62)
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = -2

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const box = new THREE.Mesh(boxGeometry, material)
box.position.x = 2

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 62, 62),
    material
)

torus.position.y = 1.5

const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100)
const plane = new THREE.Mesh(planeGeometry, material)





scene.add(sphere, box, plane, torus)

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
    sphere.rotation.y = 0.2 * elapsedTime
    sphere.rotation.x = -0.4 * elapsedTime

    torus.rotation.y = 0.2 * elapsedTime
    torus.rotation.x = -0.4 * elapsedTime

    // plane.rotation.y = 0.4 * elapsedTime
    // plane.rotation.x = -0.2 * elapsedTime
    
    box.rotation.y = 0.2 * elapsedTime
    box.rotation.x = -0.4 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()