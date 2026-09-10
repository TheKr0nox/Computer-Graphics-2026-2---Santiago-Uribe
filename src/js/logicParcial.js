import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { metalness, roughness } from 'three/src/nodes/core/PropertyNode.js';

// 1. ESCENA, CÁMARA Y RENDER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a); // Noche azulada

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 12, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.update();

// 2. ILUMINACIÓN Y PISO
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(15, 30, 20);
dirLight.castShadow = true;
scene.add(dirLight);

const floorGeo = new THREE.PlaneGeometry(40, 40);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const shapeData = [

    {
        name: 'Pilar 1',
        geometry: new THREE.CylinderGeometry(10, 10, 10),
        color: 0x965300,
        posX: -2,
        posY: 0,
        posZ: 0,
        roughness: 0.9,
        metalness: 0

    },

    {
        name: 'Pilar 2',
        geometry: new THREE.CylinderGeometry(10, 10, 10),
        color: 0x965300,
        posX: 2,
        posY: 0,
        posZ: 0,
        roughness: 0.9,
        metalness: 0
    },

    {
        name: 'Rueda',
        geometry: new THREE.TorusGeometry(20, 20, 20),
        color: 0x666666,
        posX: 0,
        roughness: 0.1,
        metalness: 0.1
    },

    {
        name: 'Barra 1',
        geometry: new THREE.CapsuleGeometry(20, 20, 20),
        color: 153 - 153 - 153,
        posX: 0,
        roughness: 0.1,
        metalness: 0.1
    },

    {
        name: 'Barra 2',
        geometry: new THREE.CapsuleGeometry(20, 20, 20),
        color: 153 - 153 - 153,
        posX: 0,
        roughness: 0.1,
        metalness: 0.1
    },

];

for (let i = 1; i <= 8; i++) {
    shapeData.push({
        name: 'Cabinas',
        geometry: new THREE.BoxGeometry(2, 2, 2),
        color: 0 - 0 - 255,
        posX: 0,
        posY: 0,
        posZ: 0,
        roughness: 0.2,
        metalness: 0.1
    });
}

for (let i = 1; i <= 8; i++) {
    shapeData.push({
        name: 'Techos',
        geometry: new THREE.ConeGeometry(2, 2, 2),
        color: 255 - 102 - 102,
        posX: 0,
        posY: 0,
        posZ: 0,
        roughness: 0.2,
        metalness: 0.1
    });
}
a
// =========================================================
// TODO: CONSTRUIR LA RUEDA DE LA FORTUNA
// =========================================================

// En esta seccion, debes crear la rueda de la fortuna utilizando geometrías y materiales de Three.js. 
const numCabinas = 8;
const radioRueda = 6;
const cabinas = [];

// Loop de Animación
let velocidadGiro = 0.01;

function animate() {
    requestAnimationFrame(animate);

    // Aqui colocar el codigo de Rotación de la rueda
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});