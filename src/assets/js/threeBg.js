import * as THREE from 'three';
import images from "./images";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const container = document.querySelector('.three_bg');
const loader = new THREE.TextureLoader();



const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const geometry = new THREE.PlaneGeometry(18, 10, 15, 9);
const material = new THREE.MeshBasicMaterial({
  map: loader.load(images.bg1),
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

let mouse = new THREE.Vector2();
let mouseMoveEffect = 0.1;
let distortionRadius = 2; // Radius of the distortion effect
let distortionAmplitude = 0.5; // Amplitude of the distortion

// Mouse move event listener
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  const time = clock.getElapsedTime();

  for (let i = 0; i < count; i++) {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);

    // Get the distance from the mouse
    const distance = Math.sqrt((mouse.x * 9 - x) ** 2 + (mouse.y * 5 - y) ** 2);

    // Apply distortion if within radius
    let distortion = 0;
    if (distance < distortionRadius) {
      const influence = Math.exp(-distance * distance * 0.1);
      distortion = distortionAmplitude * Math.sin((distortionRadius - distance) * 10 - time * 3) * influence;
    }

    // Base animations
    const anim1 = 0.75 * Math.sin(x * 2 + time * 0.7);
    const anim2 = 0.25 * Math.sin(x + time * 0.9);
    const anim3 = 0.25 * Math.sin(y * 15 + time * 0.7);

    geometry.attributes.position.setZ(i, anim1 + anim2 + anim3 + distortion);
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
};

animate();
