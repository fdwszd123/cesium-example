<template>
  <div>
    <a-row align="center" justify="space-between" style="margin-bottom: 10px">
      <a-col :span="8"> 插值个数 </a-col>
      <a-col :span="16">
        <a-input-number
          @change="handleChangeCount"
          v-model="count"
          :min="10"
          :max="100"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref } from "vue";
import CesiumOperation from "@/utils/CesiumOperation";
import * as Cesium from "cesium";
const count = ref(30);
const start = new Cesium.Cartesian3(
  1216390.063324395,
  -4736314.814479433,
  4081341.9787972216
);
const end = new Cesium.Cartesian3(
  1216329.5413318684,
  -4736272.029009798,
  4081407.9342479417
);
let modelPrimitive = null;
let polylinePrimitive = null;
let pointPrimitiveCollection = null;
const initModel = async () => {
  const viewer = window.viewer;
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(40866);
  modelPrimitive = viewer.scene.primitives.add(tileset);
  viewer.scene.camera.setView({
    destination: new Cesium.Cartesian3(
      1216411.0748779264,
      -4736313.10747583,
      4081359.5125561724
    ),
    orientation: new Cesium.HeadingPitchRoll(
      4.239925103568368,
      -0.4911293834802475,
      6.279849292088564
    ),
    endTransform: Cesium.Matrix4.IDENTITY,
  });
  await interpolation();
};
const handleChangeCount = () => {
  const viewer = window.viewer;
  if (polylinePrimitive) {
    viewer.scene.primitives.remove(polylinePrimitive);
    polylinePrimitive = null;
  }
  if (pointPrimitiveCollection) {
    viewer.scene.primitives.remove(pointPrimitiveCollection);
    pointPrimitiveCollection = null;
  }
  interpolation();
};
const interpolation = async () => {
  const viewer = window.viewer;
  const cartesians = new Array(count.value);
  for (let i = 0; i < count.value; ++i) {
    const offset = i / (count.value - 1);
    cartesians[i] = Cesium.Cartesian3.lerp(
      start,
      end,
      offset,
      new Cesium.Cartesian3()
    );
  }

  const clampedCartesians = await viewer.scene.clampToHeightMostDetailed(
    cartesians
  );
  pointPrimitiveCollection =
    CesiumOperation.createPointPrimitiveCollection(clampedCartesians);
  viewer.scene.primitives.add(pointPrimitiveCollection);
  polylinePrimitive =
    CesiumOperation.createPrimitivePolyline(clampedCartesians);
  viewer.scene.primitives.add(polylinePrimitive);
};
onMounted(() => {
  nextTick(() => {
    initModel();
  });
});
onBeforeUnmount(() => {
  const viewer = window.viewer;
  modelPrimitive && viewer.scene.primitives.remove(modelPrimitive);
  viewer.camera.flyHome(3);
});
</script>

<style scoped></style>
