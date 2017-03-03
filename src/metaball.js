const THREE = require('three')
import Toolbox from './toolbox'

var SPHERE_GEO = new THREE.SphereBufferGeometry(1, 32, 32);
var LAMBERT_WHITE = new THREE.MeshLambertMaterial( { color: 0x9EB3D8, transparent: true, opacity: 0.5 });

export default class Metaball {
  constructor(pos, radius, vel, gridWidth, visualDebug) {
    this.init(pos, radius, vel, gridWidth, visualDebug);
  }

  init(pos, radius, vel, gridWidth, visualDebug) {
    this.gridWidth = gridWidth;
    this.pos = pos;
    this.vel = vel;

    this.radius = radius;
    this.radius2 = radius * radius;
    this.mesh = null;
    this.offset = radius * 1.5; // offset for boundary against the walls

    if (visualDebug) {      
      this.makeMesh();
    }
  }

  makeMesh() {
    this.mesh = new THREE.Mesh(SPHERE_GEO, LAMBERT_WHITE);
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.mesh.scale.set(this.radius, this.radius, this.radius);
  }

  show() {
    if (this.mesh) {
      this.mesh.visible = true;
    }
  };

  hide() {
    if (this.mesh) {
      this.mesh.visible = false;
    }
  };

  update() {
    var npos = new THREE.Vector3().addVectors(this.pos, this.vel);
    this.mesh.position.set(npos.x, npos.y, npos.z);

    var upperBound = this.gridWidth - this.offset;
    this.vel.x *= -1 * Toolbox.step(this.offset, 0.0) * Toolbox.step(Toolbox.step(upperbound, npos.x);
    this.vel.y *= -1 * Toolbox.step(this.offset, 0.0) * Toolbox.step(upperbound, npos.y);
    this.vel.z *= -1 * Toolbox.step(this.offset, 0.0) * Toolbox.step(upperbound, npos.z);
  }
}