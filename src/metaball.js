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
    this.upperbound = this.gridWidth - this.offset;
    // lowerbound is just the offset

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
    this.pos = npos;
    this.mesh.position.set(npos.x, npos.y, npos.z);

    this.vel.x += -2.0 * (Toolbox.step(npos.x, this.offset) + Toolbox.step(this.upperbound, npos.x)) * this.vel.x;
    this.vel.y += -2.0 * (Toolbox.step(npos.y, this.offset) + Toolbox.step(this.upperbound, npos.y)) * this.vel.y;
    this.vel.z += -2.0 * (Toolbox.step(npos.z, this.offset) + Toolbox.step(this.upperbound, npos.z)) * this.vel.z;
  }
}




















