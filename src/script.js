import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import './style.css'

const sizes = {
    width:window.innerWidth, 
    height:window.innerHeight
}

// Get Canvas DOM
const canvas = document.querySelector('.webgl-canvas')

// Scene
const scene = new THREE.Scene()

// Grometry (x, y, z) Mesh Material
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshPhongMaterial()
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

// Camera = PerspectiveCamera(Field_of_view, screen_width/height)
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.x = 2
pointLight.y = 3
pointLight.z = 4
scene.add(ambientLight, pointLight)

// Resizing
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

// full screen
window.addEventListener('dblclick',()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement){
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(canvas.webkitExitFullscreen)
        {
            canvas.webkitExitFullscreen()
        }
    }
})

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})
// resize renderer
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

// makes the camera zoomed in
renderer.render(scene,camera)

// Animation
const tick = ()=>{
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick()