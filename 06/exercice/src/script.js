import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}


const mouse = {
    clientX: 0,
    clientY: 0,
}


window.addEventListener('mousemove' , (e) => {
    mouse.clientX =( e.clientX  / sizes.width -0.5);
    mouse.clientY = (e.clientY / sizes.height - 0.5) ;
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)

const aspectRation = sizes.width /sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRation, 1 * aspectRation, 1, -1)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()


// Controls

const controls = new OrbitControls(camera, canvas)

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    // console.log(mouse.clientX)

    // camera.rotation.y = mouse.clientX
    // camera.rotation.x = mouse.clientY

    // camera.position.y = Math.cos(mouse.clientY * Math.PI * 2) * 2
    // camera.position.x = - Math.sin(mouse.clientX * Math.PI * 2) * 2

    // camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()