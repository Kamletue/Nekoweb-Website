import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const loader = new OBJLoader();
const colorForOBJ = "rgb(230, 171, 11)";
console.log(colorForOBJ);
//Adapt size to css width and height.
const sizesForWebGLCanvas = getComputedStyle(document.documentElement);

let theTeaPot: THREE.Group<THREE.Object3DEventMap>;

const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(parseInt(sizesForWebGLCanvas.getPropertyValue("--width-webgl")),
    parseInt(sizesForWebGLCanvas.getPropertyValue("--height-webgl"))
);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({ color: colorForOBJ})
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);
loader.load('./teapot.obj', function (obj) {
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    })
    theTeaPot = obj;
    scene.add(obj);
});
camera.position.z = 10;
camera.rotateZ(-0.15)
function animate() {
    renderer.render(scene, camera);
    if (theTeaPot) {
        theTeaPot.rotateY(0.02);
    }
}
renderer.setAnimationLoop(animate);