//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'purple_cameraman';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the purple_cameraman model
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

//Set camera distance for purple_cameraman
camera.position.z = 2;

//Add lights
const topLight = new THREE.DirectionalLight(0xffffff, 12);
topLight.position.set(500, 500, 500);
// topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 12);
scene.add(ambientLight);

//Add OrbitControls for purple_cameraman
controls = new OrbitControls(camera, renderer.domElement);

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

//Handle window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
