import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//


const gltfLoader = new GLTFLoader()

let duck

gltfLoader.load('./models/Duck/glTF-Binary/Duck.glb', (gltf) => {
    duck = gltf.scene
    scene.add(gltf.scene)
}, () => {
    console.log('onProgress')
}, (error) => {
    console.log(error)
})

const ambiantLight = new THREE.AmbientLight('#fff', 0.9)
const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
directionalLight.position.set(1, 2, 3)
scene.add(ambiantLight, directionalLight)

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3, 0 ,0)
// const rayDirection = new THREE.Vector3(10, 0 ,0)
// rayDirection.normalize()

// object1.updateMatrixWorld()
// object2.updateMatrixWorld()
// object3.updateMatrixWorld()

// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)


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

// Mouse

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (_event) => {
    mouse.x = _event.clientX / sizes.width * 2 - 1
    mouse.y = - ( _event.clientY / sizes.height * 2 - 1)
})

// window.addEventListener('mousedown', (_event) => {
//     mouse.x = _event.clientX / sizes.width * 2 - 1
//     mouse.y = - ( _event.clientY / sizes.height * 2 - 1)
// })


// window.addEventListener('mouseup', (_event) => {
//     mouse.x = undefined
//     mouse.y = undefined
// })

window.addEventListener('click', () => {
    if (currentIntersect)
        console.log(currentIntersect)
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

let currentIntersect

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    object1.position.y = - Math.sin(elapsedTime * 1.2 ) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.75 ) * 1.5
    object3.position.y = - Math.sin(elapsedTime) * 1.5

    const objects = [object1, object2, object3]

    // const rayOrigin = new THREE.Vector3(-3, 0 ,0)
    // const rayDirection = new THREE.Vector3(10, 0 ,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin, rayDirection)

    // const intersects = raycaster.intersectObjects(objects)
    // console.log(intersects)
    
    
    
    raycaster.setFromCamera(mouse, camera)


    const intersects = raycaster.intersectObjects(objects)

    let intersectDuck

    if (duck){
        intersectDuck = raycaster.intersectObject(duck)}

    if (intersectDuck?.length) {
        duck.scale.set(2, 2, 2)
    } else if (intersectDuck) {
        duck.scale.set(1, 1, 1)
    }


    objects.map(object => {
        object.material.color.set('red')
    })
    intersects.map(intersect => {
        intersect.object.material.color.set('blue')
    })

    if (intersects.length){
        if (currentIntersect === null)
            console.log('mouse enter')

        currentIntersect = intersects[0]
    } else {
        if (currentIntersect)
            console.log('mouse leave')
        currentIntersect = null
    }


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()