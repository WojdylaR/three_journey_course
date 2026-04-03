import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')


const pi = Math.PI



// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#862f2f' })


const meshGroup = new THREE.Group()

const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)

meshGroup.add(mesh, mesh2)

meshGroup.position.y = -0.5

// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 0

mesh.position.set(0.7, -0.6, 0)
mesh2.position.set(0.7, 1.6, 0)

// scene.add(mesh)

mesh.position.normalize()
console.log(mesh.position.length())

//  Axes Helper

const axesHelper = new THREE.AxesHelper()

// Scale

mesh.scale.set(1.5, 1, 1)

// Rotation

mesh.rotation.reorder('YXZ')

mesh.rotation.z = pi / 4
mesh.rotation.y = pi / 4
mesh.rotation.z = pi / 4





scene.add(axesHelper, meshGroup)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3


camera.lookAt(mesh.position)


scene.add(camera)

console.log(mesh.position.distanceTo(camera.position))


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)