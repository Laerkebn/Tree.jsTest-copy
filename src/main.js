import './style.css'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0000ff)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Lys
const directionalLight = new THREE.DirectionalLight(0xA6EFFF, 1)
directionalLight.position.set(2, 1, 2)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0x060945, 0.5)
scene.add(ambientLight)

// Baggrund
const imgLoad = new THREE.TextureLoader()
imgLoad.load('/Billeder/dybtvand.webp', texture => {
  scene.background = texture
})

// Tekst
let textMesh // global variabel til animation
const fontLoader = new FontLoader()
fontLoader.load('/Fonts/Rubik.json', font => {
  const textGeo = new TextGeometry('dykker', {
    font: font,
    size: 2,
    height: 0.5,
    curveSegments: 12,
  })

  textGeo.center() // centrer geometrien, rotation fra midten

  const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
  textMesh = new THREE.Mesh(textGeo, textMaterial)
  scene.add(textMesh)
})
  
// Animation
function animate() {
  requestAnimationFrame(animate)
  if (textMesh) {
    textMesh.rotation.x += 0.03
    textMesh.rotation.y += 0.009
  }
  renderer.render(scene, camera)
}
animate()

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
