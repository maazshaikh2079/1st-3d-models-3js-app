//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//Create a new camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of mouse position (to move the futuristic_spaceship)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object globally accessible
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'futuristic_spaceship';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the futuristic_spaceship model
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
        // object.scale.set(200, 20, 100);
    // object.scale.set(150, 20, 350);ff
    // object.position.set(0, 0, 0);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

//Instantiate renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the model
camera.position.z = 13;

//Add lights
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500);
// topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//OrbitControls for manual rotation/zoom
controls = new OrbitControls(camera, renderer.domElement);

//Render loop
function animate() {
  requestAnimationFrame(animate);

  // Make the futuristic_spaceship follow the mouse
  if (object) {
    object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
    object.rotation.x = -1.2 + (mouseY * 2.5 / window.innerHeight);
  }

  renderer.render(scene, camera);
}

//Resize handling
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Track mouse movement
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start rendering
animate();
