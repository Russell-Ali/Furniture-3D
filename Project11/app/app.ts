//Imports
import * as THREE from "three";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TimelineMax } from "gsap";
//Imports End

//Test
// const geo = new THREE.BoxGeometry();
// const mat = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
// });
// const cube = new THREE.Mesh(geo, mat);
//Test End

//Variables
const tl = new TimelineMax();
const ambientLght = new THREE.AmbientLight(0x404040);
const lamp = new THREE.PointLight(0x404040, 6);
const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1 / 1, 0.1, 500);
const container = document.getElementById("scene");
const mainContainer = document.getElementById("mainContainer");
let armchair: any;
let armchairPosition: any;
let armchairRotation: any;
let hoverX: any;
let helpTxt: any = document.getElementById("helpTxt");
//Variables End

//Variable Settings
loader.load("../dist/assets/armchair/scene.gltf", (gltf) => {
  armchair = gltf.scene;
  scene.add(armchair);
  armchair.scale.set(0.45, 0.45, 0.45);
  armchairPosition = armchair.position.set(0, 0, 0);
  armchairRotation = armchair.rotation.set(0.2, -3.6, 0);
  gsap.from(armchairPosition, {
    duration: 1.6,
    ease: "power3.out",
    x: 45,
    z: 100,
  });
  tl.from(armchairRotation, {
    duration: 1.8,
    ease: "Sine.Out",
    y: "+=3.9",
  }).to(armchairRotation, {
    duration: 0.7,
    ease: "Sine.Out",
    y: "+=0.3",
  });
});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
container.addEventListener("mousemove", (e) => {
  let xAxis = e.pageX - (mainContainer.clientWidth - container.clientWidth);
  hoverX = (xAxis - 250) / 138 - 3;
  helpTxt.style.opacity = "0";
  gsap.to(armchairRotation, {
    duration: 1.2,
    ease: "Power1.Out",
    y: hoverX,
  });
});
container.addEventListener("mouseout", (c) => {
  gsap
    .to(armchairRotation, {
      duration: 1.2,
      ease: "Power1.Out",
      y: -3.3,
    })
    .delay(1.2);
});
scene.add(ambientLght, lamp);
lamp.position.set(0, 200, 15);
ambientLght.intensity = 4;
camera.position.z = 100;
camera.position.y = 15;
//Variable Settings End

//Function
function animate() {
  requestAnimationFrame(animate);
  if (helpTxt.style.opacity == "0") {
    setTimeout(display, 600);
  }
  renderer.render(scene, camera);
}
animate();

function display() {
  helpTxt.style.display = "none";
}
//Function End

//Hot Module
if (module.hot) {
  module.hot.accept();
}
//Hot Module End
