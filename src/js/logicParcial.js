import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
        geometry: new THREE.CylinderGeometry(0.5, 0.5, 11.5),
        color: 0x965300,
        posX: -2.5,
        posY: 5,
        posZ: 0,
        rotZ: -0.50,
        roughness: 0.9,
        metalness: 0

    },

    {
        name: 'Pilar 2',
        geometry: new THREE.CylinderGeometry(0.5, 0.5, 11.5),
        color: 0x965300,
        posX: 2.5,
        posY: 5,
        posZ: 0,
        rotZ: 0.50,
        roughness: 0.9,
        metalness: 0
    },

    {
        name: 'Pilar 3',
        geometry: new THREE.CylinderGeometry(0.5, 0.5, 11.5),
        color: 0x965300,
        posX: -2.5,
        posY: 5,
        posZ: 2,
        rotX: 0.25,
        rotZ: -0.35,
        roughness: 0.9,
        metalness: 0

    },

    {
        name: 'Pilar 4',
        geometry: new THREE.CylinderGeometry(0.5, 0.5, 11.5),
        color: 0x965300,
        posX: 2.5,
        posY: 5,
        posZ: -2,
        rotX: -0.15,
        rotZ: 0.35,
        roughness: 0.9,
        metalness: 0
    },

    {
        name: 'Rueda',
        geometry: new THREE.TorusGeometry(6, 0.2, 15, 100),
        color: 0x666666,
        posX: 0,
        posY: 10,
        posZ: 1,
        rotz: 1,
        roughness: 0.1,
        metalness: 0.5
    },

    {
        name: 'Rueda2',
        geometry: new THREE.TorusGeometry(6, 0.2, 15, 100),
        color: 0x666666,
        posX: 0,
        posY: 10,
        posZ: -1,
        rotz: -1,
        roughness: 0.1,
        metalness: 0.5
    },

    {
        name: 'medioRueda',
        geometry: new THREE.CylinderGeometry(0.5, 0.5, 1.5),
        color: 0x666666,
        posX: 0,
        posY: 10,
        posZ: 1.2,
        rotX: 4.7,
        roughness: 0.1,
        metalness: 0.1
    },

    {
        name: 'medioRueda2',
        geometry: new THREE.CylinderGeometry(0.5, 0.5, 1.5),
        color: 0x666666,
        posX: 0,
        posY: 10,
        posZ: -1.2,
        rotX: 4.7,
        roughness: 0.1,
        metalness: 0.1
    },

    {
        name: 'EsferamedioRueda ',
        geometry: new THREE.SphereGeometry(1, 22, 22),
        color: 0xffff00,
        posX: 0,
        posY: 10.2,
        posZ: 0,
        rotX: 4.7,
        roughness: 0.1,
        metalness: 0.1
    },
];

for (let i = 1; i <= 8; i++) {
    shapeData.push({
        name: 'Cabinas',
        geometry: new THREE.BoxGeometry(2, 2, 2),
        color: 0x0000ff,
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
        color: 0xff6666,
        posX: 0,
        posY: 0,
        posZ: 0,
        roughness: 0.2,
        metalness: 0.1
    });
}

for (let i = 1; i <= 8; i++) {
    shapeData.push({
        name: 'BarrasMedio',
        geometry: new THREE.CylinderGeometry(2, 2, 2),
        color: 0x666666,
        posX: 0,
        posY: 0,
        posZ: 0,
        roughness: 0.2,
        metalness: 0.1
    });
    shapeData.push({
        name: 'BarrasMedioAtras',
        geometry: new THREE.CylinderGeometry(0.1, 0.1, 12),
        color: 0x666666,
        posX: 0,
        posY: 10,             
        posZ: -1,           
        rotZ: i/8 * Math.PI,
        roughness: 0.2,
        metalness:0
    });

    shapeData.push({
        name: 'BarrasMedioAdelante',
        geometry: new THREE.CylinderGeometry(0.1, 0.1, 12),
        color: 0x666666,
        posX: 0,
        posY: 10,             
        posZ: 1,           
        rotZ: i/8 * Math.PI,
        roughness: 0.2,
        metalness:0
    });
}

// =========================================================
// TODO: CONSTRUIR LA RUEDA DE LA FORTUNA
// =========================================================

shapeData.forEach((shape) => {
    const material = new THREE.MeshStandardMaterial({
        color: shape.color,
        roughness: shape.roughness,
        metalness: shape.metalness
    });

    const mesh = new THREE.Mesh(shape.geometry, material);

    mesh.position.set(
        shape.posX || 0,
        shape.posY || 0,
        shape.posZ || 0
    );

    mesh.rotation.x = shape.rotX || 0;
    mesh.rotation.y = shape.rotX || 0;
    mesh.rotation.z = shape.rotZ || 0;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
});

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