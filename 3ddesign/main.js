import * as THREE from "https://unpkg.com/three@0.138.0/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let spaceTexture = new THREE.TextureLoader().load('assets/text1.png');

const Kartick = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 4, 32),
    new THREE.MeshBasicMaterial({ map: spaceTexture })
);

Kartick.position.z = 0;
Kartick.position.x = 0;

scene.add(Kartick);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color: white, Intensity: 1
scene.add(ambientLight);

camera.position.z = 5;

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);


//texture image 
const textureImage = document.getElementById('textureImage');
// Button to change texture
const textureButton = document.getElementById('textureButton');

const textureFolderPath = 'assets/';
const numTextures = 9; // Specify the total number of textures in your folder

let currentTextureIndex = 1;

textureButton.addEventListener('click', () => {
    const texturePath = `${textureFolderPath}test ${currentTextureIndex}.png`;
    const textureLoader = new THREE.TextureLoader();
     textureImage.src = texturePath;

    textureLoader.load(texturePath, (texture) => {
        Kartick.material.map = texture;
        Kartick.material.needsUpdate = true;
    }, undefined, (error) => {
        console.error(`Failed to load texture: ${texturePath}`, error);
    });

    currentTextureIndex++;
    if (currentTextureIndex > numTextures) {
        currentTextureIndex = 1;
    }
});


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
