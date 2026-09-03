import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const backgroundColor = 0x0b0c10; 
scene.background = new THREE.Color(backgroundColor);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5, 10, 7);
scene.add(light);

const shapesData = [
    {
        name: 'Sol',
        geometry: new THREE.SphereGeometry(10, 32, 32),
        color: 255-255-0,
        posX: 0
    },
    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry(1, 32, 32),
        color: 0x00e676,
        posX: 10
    },
    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry(2, 32, 32),
        color: 0xff9800,
        posX: 20
    },
    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry(3, 32, 32),
        color: 0x9c27b0,
        posX: 30
    },
    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry(4, 32, 32),
        color: 0xf44336,
        posX: 40
    },
    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry(5, 32, 32),
        color: 0x00ffff,
        posX: 50
    },
    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry(6, 32, 32),
        color: 0x00ffff,
        posX: 60
    },
    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry(7, 32, 32),
        color: 0x00ffff,
        posX: 70
    },
    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry(8, 32, 32),
        color: 0x00ffff,
        posX: 80
    },
];






