import * as THREE from 'https://threejs.org/build/three.module.js';
import { FirstPersonControls } from 'https://threejs.org/examples/jsm/controls/FirstPersonControls.js';


const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

let scene, camera, renderer, surface, skySphere, clock, controls;


init();

function init(){
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color("green");
  camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.01, 1000);
  camera.position.set( 0,5,100 );
  
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
  scene.add(ambient);
  
  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  // light.position.set( 1, 10, 6);
  scene.add(light);

  // fog
  const color = 0x000000;  // black
  const near = 10;
  const far = 100;
  scene.fog = new THREE.Fog(color, near, far);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(winWidth, winHeight);
  
  // surface
  const geometry = new THREE.PlaneGeometry( 500, 500, 500 );
  const material = new THREE.MeshLambertMaterial( {color: 0x04B9BA, side: THREE.DoubleSide});
  surface = new THREE.Mesh(geometry, material);
  surface.position.set(0,0,8);
  surface.rotation.x = Math.PI / 2;
  scene.add(surface);


  //skySpheres
  const rand = Math.random()
  const geometry2 = new THREE.SphereGeometry( .5, 5, 5 );
  const material2 = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  const sphere = new THREE.Mesh(geometry2, material2);

  const group = new THREE.Group()

  for(let i = -100; i <= 100; i++){
        skySphere = sphere.clone();
        group.add( skySphere );
        skySphere.position.x = Math.random() * 100;
        skySphere.position.y = Math.random() * 100;
        skySphere.position.z = Math.random() * 100;
  }

  scene.add(group);
  group.position.set(-50,0,-150);
  
  document.body.appendChild(renderer.domElement);


  //grid helper
  var size = 500;
  var divisions = 50;

  var gridHelper = new THREE.GridHelper( size, divisions );
  gridHelper.rotation.x = Math.PI / 1;
  gridHelper.position.set(0,0,8);
  scene.add( gridHelper );

  
  //first person controls
  controls = new FirstPersonControls( camera, renderer.domElement );
  controls.lookSpeed = 0.1
  controls.movementSpeed = 10

  clock = new THREE.Clock(true)


  window.addEventListener('resize', resize, false);
  // window.addEventListener('keydown', getKeyCode, false);
  
  update();
  
}


  // function getKeyCode(event){
  //   var positionDelta = 5;
  //   var rotationDelta = 0.1;
  //   x = event.keyCode;
  //   console.log(x);
  
  //   switch(x){
  //       case 37:
  //           console.log('move left');
  //           camera.position.x -= positionDelta;
  //           break;
  //       case 38:
  //           console.log('move forward')
  //           camera.position.z -= positionDelta;
  //           break;
  //       case 39:
  //           console.log('move right')
  //           camera.position.x += positionDelta;
  //           break;
  //       case 40:
  //           camera.position.z += positionDelta;
  //           console.log('move back')
  //   }
  
  //   // left 37
  //   // forward 38
  //   // right 39
  //   // back 40
  // }

function update(){
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  controls.update(clock.getDelta())
}

function resize(){
  camera.aspect = winWidth / winHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(winWidth, winHeight);
}
