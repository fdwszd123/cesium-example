<template>
  <div>
    <a-row style="margin-bottom: 10px"
      >primitive相对于entity更加底层，性能更好。</a-row
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as Cesium from "cesium";
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import { $get } from "@/utils/request";
const billboardsCollection = new Cesium.BillboardCollection();

const handleFeature = (features) => {
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const coordinates = feature.geometry.coordinates;
    const position = Cesium.Cartesian3.fromDegrees(
      coordinates[0],
      coordinates[1]
    );
    //地址的名称和位置信息
    const placeInfo = {
      name: feature.properties.name,
      address: feature.properties.address,
    };
    const billboard = billboardsCollection.add({
      position: position,
      image: "/images/mark-icon.png",
      with: 24,
      height: 24,
    });
    billboard.placeInfo = placeInfo;
  }
};
onMounted(async () => {
  const { features } = await $get("/json/chuzhong.geojson");
  nextTick(() => {
    const viewer = window.viewer;
    viewer.scene.primitives.add(billboardsCollection);
    handleFeature(features);
    viewer.camera.flyTo({
      // 从以度为单位的经度和纬度值返回笛卡尔3位置。
      destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
    });
    
  });
});
onBeforeUnmount(() => {
  const viewer = window.viewer;
  viewer.scene.primitives.remove(billboardsCollection);
  viewer.camera.flyHome(3)
});
</script>

<style scoped></style>
