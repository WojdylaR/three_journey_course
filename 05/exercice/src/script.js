import * as THREE from 'three' 

const pi = Math.PI

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#942f2f' })
const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)
scene.add(mesh, mesh2)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Time

// let time  = Date.now()

const clock = new THREE.Clock()


// Animation

function tick() {

    const x = 20

    // const currentTime = Date.now()
    // const deltaTime = currentTime - time 

    // time = currentTime

    // console.log(deltaTime)

    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.z += 0.005 * deltaTime
    // mesh.rotation.y += pi / 60 * deltaTime
    // mesh.rotation.x += pi / 1000 * deltaTime

    
    mesh.rotation.z = pi / 4  * elapsedTime
    mesh.rotation.y = pi / 2 * elapsedTime
    mesh.rotation.x = pi / 2 * elapsedTime

    mesh.position.x = Math.sin(elapsedTime) * 2

    camera.lookAt(mesh.position)

    // mesh.position.x += pi / x

    window.requestAnimationFrame(tick)
    console.log()
    renderer.render(scene, camera)
}

tick()