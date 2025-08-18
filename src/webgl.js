import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
const scene = new THREE.Scene();
const loader = new OBJLoader();
var theTeaPot;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);
loader.load('./teapot.obj', function (obj) {
    const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = material2;
        }
    });
    theTeaPot = obj;
    scene.add(obj);
});
camera.position.z = 15;
camera.rotateZ(-0.15);
function animate() {
    renderer.render(scene, camera);
    if (theTeaPot) {
        theTeaPot.rotateY(0.02);
    }
}
renderer.setAnimationLoop(animate);
//# sourceMappingURL=webgl.js.map