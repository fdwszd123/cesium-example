<template></template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import * as Cesium from "cesium";
import { Message } from "@arco-design/web-vue";
onMounted(() => {
  nextTick(() => {
    const terrain = new Cesium.Terrain(
      Cesium.CesiumTerrainProvider.fromUrl("http://data.marsgis.cn/terrain")
    );
    const viewer = window.viewer;
    viewer.scene.setTerrain(terrain);
    Message.success("地形加载成功！");
  });
});
onBeforeUnmount(() => {
  const viewer = window.viewer;
  viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
});
</script>

<style scoped></style>
