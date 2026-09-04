import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const backgroundColor = 0x0b0c10; // Dark background color 
scene.background = new THREE.Color(backgroundColor);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(0, 10, 50);
scene.add(light);

// Definition of primitive shapes 
const shapeData = [

    {
        name: 'Sol',
        geometry: new THREE.SphereGeometry(6, 50, 50),
        color: 0xffff00,
        posX: 0,
        roughness: 0.9,
        metalness: 0

    },

    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry(3.8, 40, 40),
        color: 0x555555,
        posX: 15,
        roughness: 0.9,
        metalness: 0.5
    },

    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry(3.2, 40, 40),
        color: 0xcc6600,
        posX: 25,
        roughness: 0.7,
        metalness: 0
    },

    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry(2.5, 35, 35),
        color: 0x0000aa,
        posX: 33.5,
        roughness: 0.2,
        metalness: 0.1
    },

    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry(2, 32, 32),
        color: 0xaa0000,
        posX: 40,
        roughness: 0.9,
        metalness: 0
    },

    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry(2, 30, 30),
        color: 0x996633,
        posX: 45,
        roughness: 0.5,
        metalness: 0
    },

    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry(1.6, 25, 25),
        color: 0xccaa66,
        posX: 50,
        roughness: 0.6,
        metalness: 0
    },

    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry(1.2, 20, 20),
        color: 0x33cccc,
        posX: 55,
        roughness: 0.3,
        metalness: 0.1
    },

    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry(1, 15, 15),
        color: 0x2222aa,
        posX: 60,
        roughness: 0.3,
        metalness: 0.1
    }

];

const wireframeButton = document.getElementById("wireframeButton");

const meshes = [];
let isWireframe = false;

shapeData.forEach((shape) => {
    const material = new THREE.MeshStandardMaterial({
        color: shape.color,
        wireframe: isWireframe,
        roughness: shape.roughness,
        metalness: shape.metalness
    });
    const mesh = new THREE.Mesh(shape.geometry, material);
    mesh.position.x = shape.posX;
    scene.add(mesh);
    meshes.push(mesh);

    if (shape.name === 'Saturno') {
        const ringGeo = new THREE.RingGeometry(2, 2.8, 20);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xb89b63, side: THREE.DoubleSide });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);

        ringMesh.rotation.x = Math.PI / 2;
        mesh.add(ringMesh);
    }
    scene.add(mesh);
    meshes.push(mesh);
});

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(20, 30, 50);
controls.update();

// Grid  Helper 
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Axes Helper 
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function animate(time) {
    renderer.render(scene, camera);
    controls.update();

    meshes.forEach((mesh) => {
        const speed = 0.0005;

        mesh.rotation.x = time * speed;
        mesh.rotation.y = time * speed;
    }
    );

}

// 2. Handle Responsive Resizing
function onWindowResize() {
    // Update camera aspect ratio based on the new container bounds
    camera.aspect = window.innerWidth / window.innerHeight;

    // Crucial: Update the projection matrix to apply changes
    camera.updateProjectionMatrix();

    // Update renderer size and pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// 3. Listen for the resize event
window.addEventListener('resize', onWindowResize);




