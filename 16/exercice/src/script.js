import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const textureLoader = new THREE.TextureLoader()


// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorColorTexture.colorSpace = THREE.SRGBColorSpace  

floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall



const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace  

// ROOF

const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace  

roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)


roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


// Bush



const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace  

// Grave

const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')


graveColorTexture.colorSpace = THREE.SRGBColorSpace  

// Door 

const doorColorTexture = textureLoader.load('./door/color.webp')
const doorAlpaTexture = textureLoader.load('./door/alpha.webp')
const doorAmbientOcclusionrTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')


doorColorTexture.colorSpace = THREE.SRGBColorSpace  
/**
 * House
 */
// Temporary sphere

const house = new THREE.Group()

const wall = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
            map: wallColorTexture,
            aoMap: wallARMTexture,
            roughnessMap: wallARMTexture,
            metalnessMap: wallARMTexture,
            normalMap: wallNormalTexture
        }
    )
)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofColorTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
    })
)

roof.rotation.y = Math.PI / 4
roof.position.y += 2.5 + 0.75
wall.position.y += 1.25

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: doorAlpaTexture,
        transparent: true,
        map: doorColorTexture,
        aoMap: doorAmbientOcclusionrTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.12,
        displacementBias: -0.04,
    })
)
door.position.y += 1.1
door.position.z += 2.001

const bushesGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
        color: '#57e0ac',
        map: bushColorTexture,
        aoMap: bushColorTexture,
        roughnessMap: bushARMTexture,
        metalnessMap: bushARMTexture,
        normalMap: bushNormalTexture,
    })

const bush1 = new THREE.Mesh(bushesGeometry, bushMaterial)
bush1.scale.setScalar(0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x += - 0.75

const bush2 = new THREE.Mesh(bushesGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x += - 0.75

const bush3 = new THREE.Mesh(bushesGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x += - 0.75

const bush4 = new THREE.Mesh(bushesGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1 , 0.05, 2.6)
bush4.rotation.x += - 0.75




house.add(wall, roof, door, bush1, bush2, bush3, bush4)

const graves = new THREE.Group()

const graveGrometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
            map: graveColorTexture,
            aoMap: graveARMTexture,
            roughnessMap: graveARMTexture,
            metalnessMap: graveARMTexture,
            normalMap: graveNormalTexture
        })

for (let i = 0; i < 35; i++) {

    const grave = new THREE.Mesh(
        graveGrometry,
        graveMaterial
    )
    grave.position.y += Math.random() * 0.5
    grave.position.x = Math.random() * 12 - (12 / 2)
    grave.position.z = Math.random() * 12 - (12 / 2)

    grave.rotation.x = (Math.random() - 0.5 ) * 0.8
    grave.rotation.z = (Math.random() - 0.5) * 0.8
    grave.rotation.y = Math.random() * (Math.PI * 2)

    if ((Math.abs(grave.position.x) > 2.2) || (Math.abs(grave.position.z) > 2.2))
        graves.add(grave)
}



scene.add(house, graves)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100,100,),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.2,
        displacementBias: -0.13
        
    })
)

gui.add(floor.material, 'displacementScale').min(0).max(1)
gui.add(floor.material, 'displacementBias').min(-1).max(1)

floor.rotation.x -= Math.PI / 2

scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86Cdff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86Cdff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)

const gost1 = new THREE.PointLight('#4b1341', 6)
const gost2 = new THREE.PointLight('#2054a1', 6)
const gost3 = new THREE.PointLight('#d37a7a', 6)

wall.receiveShadow = true
wall.castShadow = true
roof.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

graves.children.map(item => {
    item.castShadow = true
    item.receiveShadow = true
})


const sky = new Sky()


sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value =3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

sky.scale.set(100, 100, 100)
scene.add(sky)


// Fog

scene.fog = new THREE.FogExp2('#02343f', 0.1)

scene.add(doorLight, gost1, gost2, gost3)
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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


// Shadow

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

directionalLight.castShadow = true
gost1.castShadow = true
gost2.castShadow = true
gost3.castShadow = true

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near  = 1
directionalLight.shadow.camera.far = 20
directionalLight.shadow

gost1.shadow.mapSize.width = 256
gost1.shadow.mapSize.height = 256
gost1.shadow.mapSize.far = 10

gost2.shadow.mapSize.width = 256
gost2.shadow.mapSize.height = 256
gost2.shadow.mapSize.far = 10

gost3.shadow.mapSize.width = 256
gost3.shadow.mapSize.height = 256
gost3.shadow.mapSize.far = 10
/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
    const gost1Angle  = elapsedTime
    gost1.position.set(Math.cos(gost1Angle)  * 4, Math.sin(gost1Angle) * Math.sin( gost1Angle * 2.34), Math.sin(gost1Angle)  * 4)

    const gost2Angle  = - elapsedTime  * 0.38
    gost2.position.set(Math.cos(gost2Angle)  * 5, Math.sin(gost2Angle) * Math.sin( gost2Angle * 2.35), Math.sin(gost2Angle)  * 5)

    const gost3Angle  = - elapsedTime  * 0.23
    gost3.position.set(Math.cos(gost3Angle)  * 6, Math.sin(gost3Angle) * Math.sin( gost3Angle * 2.36), Math.sin(gost3Angle)  * 6)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()