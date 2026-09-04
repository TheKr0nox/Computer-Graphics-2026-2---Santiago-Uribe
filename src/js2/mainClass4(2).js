import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const backgroundColor = 0x191970;
scene.background = new THREE.Color(backgroundColor);


const renderer = new THREE.WebGLRenderer();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);


// CÁMARA

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

camera.position.set(0, 5, 25);

controls.update();


// LUZ

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5, 10, 7);
scene.add(light);


// PLANETAS

const shapeData = [

    {
        name: 'Sol',
        geometry: new THREE.SphereGeometry(6, 50, 50),
        color: 0xffff00,
        posX: 0
    },

    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry(3.8, 40, 40),
        color: 0x555555,
        posX: 11.5
    },

    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry(3.2, 40, 40),
        color: 0xcc6600,
        posX: 20
    },

    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry(2.5, 35, 35),
        color: 0x0000aa,
        posX: 26.5
    },

    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry(2, 32, 32),
        color: 0xaa0000,
        posX: 31.5
    },

    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry(2, 30, 30),
        color: 0x996633,
        posX: 36.5
    },

    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry(1.6, 25, 25),
        color: 0xccaa66,
        posX: 42
    },

    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry(1.2, 20, 20),
        color: 0x33cccc,
        posX: 48
    },

    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry(1, 15, 15),
        color: 0x2222aa,
        posX: 53
    }

];


const meshes = [];


// PLANETAS

shapeData.forEach((shapeData) => {

    let material;


    // SOL

    if (shapeData.name === 'Sol') {

        material = new THREE.MeshBasicMaterial({
            color: 0xffff00
        });

    } else {

        material = new THREE.MeshStandardMaterial({
            color: shapeData.color,
            roughness: 0.8,
            metalness: 0.1
        });

    }


    const mesh = new THREE.Mesh(
        shapeData.geometry,
        material
    );

    mesh.position.x = shapeData.posX;

    scene.add(mesh);
    meshes.push(mesh);

});


// ANILLOS DE SATURNO

const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xb89b63,
    side: THREE.DoubleSide
});


const ring1 = new THREE.Mesh(
    new THREE.RingGeometry(1.5, 1.8, 64),
    ringMaterial
);

const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(1.85, 2.2, 64),
    ringMaterial
);

const ring3 = new THREE.Mesh(
    new THREE.RingGeometry(2.25, 2.6, 64),
    ringMaterial
);

const ring4 = new THREE.Mesh(
    new THREE.RingGeometry(2.65, 3, 64),
    ringMaterial
);


// ROTACIÓN DE LOS ANILLOS

ring1.rotation.x = Math.PI / 2;
ring2.rotation.x = Math.PI / 2;
ring3.rotation.x = Math.PI / 2;
ring4.rotation.x = Math.PI / 2;


// POSICIÓN INICIAL

ring1.position.x = 42;
ring2.position.x = 42;
ring3.position.x = 42;
ring4.position.x = 42;


// AGREGAR ANILLOS A LA ESCENA

scene.add(ring1);
scene.add(ring2);
scene.add(ring3);
scene.add(ring4);


// VELOCIDAD DE LOS PLANETAS

const velocidades = [
    0,       // Sol
    0.0008,  // Mercurio
    0.0006,  // Venus
    0.0005,  // Tierra
    0.0004,  // Marte
    0.0003,  // Jupiter
    0.0002,  // Saturno
    0.00015, // Urano
    0.0001   // Neptuno
];


// ÁNGULO DE CADA PLANETA

const angulos = [
    0, // Sol
    0, // Mercurio
    0, // Venus
    0, // Tierra
    0, // Marte
    0, // Jupiter
    0, // Saturno
    0, // Urano
    0  // Neptuno
];


// ANIMACIÓN

function animate(time) {

    controls.update();


    // MOVIMIENTO DE LOS PLANETAS

    meshes.forEach((mesh, index) => {

        // El Sol no se mueve

        if (index === 0) return;


        // Aumentar el ángulo

        angulos[index] += velocidades[index] * 10;


        // Movimiento discontinuo

        const anguloDiscontinuo =
            Math.floor(angulos[index] * 20) / 20;


        // Distancia del planeta al Sol

        const distancia = shapeData[index].posX;


        // Movimiento alrededor del Sol

        mesh.position.x =
            Math.cos(anguloDiscontinuo) * distancia;

        mesh.position.z =
            Math.sin(anguloDiscontinuo) * distancia;

    });


    // MOVER LOS ANILLOS CON SATURNO

    ring1.position.x = meshes[6].position.x;
    ring1.position.z = meshes[6].position.z;

    ring2.position.x = meshes[6].position.x;
    ring2.position.z = meshes[6].position.z;

    ring3.position.x = meshes[6].position.x;
    ring3.position.z = meshes[6].position.z;

    ring4.position.x = meshes[6].position.x;
    ring4.position.z = meshes[6].position.z;


    // MOSTRAR ESCENA

    renderer.render(scene, camera);

}