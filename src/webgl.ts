import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const loader = new OBJLoader();
let renderer;
const canvasParent = document.getElementById("webGLcanvas");
const webglDiv =  document.getElementById("webGLdiv");
const welcomePDiv =  document.getElementById("divWelcome");
const colorForOBJ = "rgb(230, 171, 11)";

const sizesForWebGLCanvas = getComputedStyle(document.documentElement);

let theTeaPot: THREE.Group<THREE.Object3DEventMap>;

const camera = new THREE.PerspectiveCamera(65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
if (canvasParent && webglDiv && welcomePDiv) {
   renderer = new THREE.WebGLRenderer({canvas: canvasParent, antialias: true});
   welcomePDiv.appendChild(webglDiv)
   .appendChild(renderer.domElement);
}
/* renderer.setSize(parseInt(sizesForWebGLCanvas.getPropertyValue("--width-webgl")),
    parseInt(sizesForWebGLCanvas.getPropertyValue("--height-webgl"))
); */
renderer.setSize(parseInt(sizesForWebGLCanvas.getPropertyValue("--width-webgl")),
 parseInt(sizesForWebGLCanvas.getPropertyValue("--height-webgl")));
webglDiv?.setAttribute("style", "width:" + canvasParent?.clientWidth + "px;"
     + "height:" + canvasParent?.clientHeight + "px;")
const material = new THREE.MeshBasicMaterial({ color: colorForOBJ});
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
camera.position.z = 5;
camera.position.y = 2;
camera.rotateZ(-0.20)

function animate() {
    renderer.render(scene, camera);
    if (theTeaPot) {
        theTeaPot.rotateY(0.02);
    }
}
renderer.setAnimationLoop(animate);