import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { rendererReference } from 'three/src/nodes/TSL.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()

const textureLoader = new THREE.TextureLoader()

const woodImage = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')
woodImage.colorSpace = THREE.SRGBColorSpace
const woodARM = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg')
const woodNormal = textureLoader.load('./textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png')

const bricksImage = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg')
bricksImage.colorSpace = THREE.SRGBColorSpace
const bricksARM = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg')
const bricksNormal = textureLoader.load('./textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png')

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
 * Update all materials
 */
const updateAllMaterials = () =>
{
    console.log(scene)
    scene.traverse((child) =>
    {
        if(child.isMesh)
        {
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1
gui
    .add(scene, 'environmentIntensity')
    .min(0)
    .max(10)
    .step(0.001)

// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        map: woodImage,
        normalMap: woodNormal,
        aoMap: woodARM,
        roughnessMap: woodARM,
        metalnessMap: woodARM,
    })
)


floor.rotation.x = - Math.PI / 2
scene.add(floor)


const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        map: bricksImage,
        normalMap: bricksNormal,
        aoMap: bricksARM,
        roughnessMap: bricksARM,
        metalnessMap: bricksARM,
    })
)


wall.position.set(0, 5, - 5)
scene.add(wall)

const directionalLight = new THREE.DirectionalLight('#ffffff', 6)
directionalLight.position.set(- 8 , 8  , 1)

directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15

directionalLight.shadow.mapSize.set(1024, 1024)  

scene.add(directionalLight)

gui.add(directionalLight, 'intensity').min(0).max(10).name('intensity')
// gui.add(directionalLight.position, 'x').min(-10).max(10)
// gui.add(directionalLight.position, 'y').min(-10).max(10)
// gui.add(directionalLight.position, 'z').min(-10).max(10)

// const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

directionalLight.shadow.bias = - 0.004
directionalLight.shadow.normalBias = 0.027

// scene.add(directionalLightHelper)
gui.add(directionalLight.shadow, 'normalBias').min(-0.05).max(0.05)
gui.add(directionalLight.shadow, 'bias').min(-0.05).max(0.05)

directionalLight.target.position.set(0, 4, 0)
directionalLight.target.updateWorldMatrix()

/**
 * Models
 */
// Helmet
// gltfLoader.load(
//     '/models/FlightHelmet/glTF/FlightHelmet.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(10, 10, 10)
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )


gltfLoader.load(
    '/models/hamburger.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(0.4, 0.4, 0.4)
    
        scene.add(gltf.scene)


        updateAllMaterials()
    }
)


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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3

gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
})
gui.add(renderer, 'toneMappingExposure').min(0).max(10)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap



/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()