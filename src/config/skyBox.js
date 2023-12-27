import * as Cesium from "cesium";
let skyBox0 = new Cesium.SkyBox({
  sources: {
    positiveX: "/images/Standard-Cube-Map/px1.png",
    negativeX: "/images/Standard-Cube-Map/nx1.png",
    positiveY: "/images/Standard-Cube-Map/pz.png",
    negativeY: "/images/Standard-Cube-Map/nz1.png",
    positiveZ: "/images/Standard-Cube-Map/py.png",
    negativeZ: "/images/Standard-Cube-Map/ny1.png",
  },
});
let skyBox1 = new Cesium.SkyBox({
  sources: {
    positiveX: "/images/skyBox1/px.png",
    negativeX: "/images/skyBox1/nx.png",
    positiveY: "/images/skyBox1/py.png",
    negativeY: "/images/skyBox1/ny.png",
    positiveZ: "/images/skyBox1/pz.png",
    negativeZ: "/images/skyBox1/nz.png",
  },
});
let skyBox2 = new Cesium.SkyBox({
  sources: {
    positiveX: "/images/skyBox2/px.png",
    negativeX: "/images/skyBox2/nx.png",
    positiveY: "/images/skyBox2/py.png",
    negativeY: "/images/skyBox2/ny.png",
    positiveZ: "/images/skyBox2/pz.png",
    negativeZ: "/images/skyBox2/nz.png",
  },
});

let skyBox3 = new Cesium.SkyBox({
  sources: {
    positiveX: "/images/skyBox3/px.png",
    negativeX: "/images/skyBox3/nx.png",
    positiveY: "/images/skyBox3/py.png",
    negativeY: "/images/skyBox3/ny.png",
    positiveZ: "/images/skyBox3/pz.png",
    negativeZ: "/images/skyBox3/nz.png",
  },
});

export const skyBoxList = [skyBox0, skyBox1, skyBox2, skyBox3];
