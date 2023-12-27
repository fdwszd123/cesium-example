<template>
  <div>
    <a-row>
      <a-button
        shape="round"
        @click="changeStatus"
        style="width: 100%"
        type="primary"
      >
        <template #icon>
          <icon-pause-circle-fill v-if="status" />
          <icon-play-circle-fill v-else />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>{{ status ? "停止" : "开始" }}</template>
      </a-button>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  IconPlayCircleFill,
  IconPauseCircleFill,
} from "@arco-design/web-vue/es/icon";
import FireEffect from "@/utils/cesium-effect/fire";
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import * as Cesium from "cesium";
const status = ref(true);
const changeStatus = () => {
  status.value = !status.value;
  fireEffect.show(status.value);
};
let fireEffect = null;
const initSnow = () => {
  fireEffect = new FireEffect(window.viewer);
  window.viewer.camera.flyTo({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(120.361, 36.0885, 80),
    orientation: {
      direction: new Cesium.Cartesian3(
        0.7458181136018,
        -0.4270255968894706,
        0.5112773034515067
      ),
      up: new Cesium.Cartesian3(
        -0.19274344830978868,
        0.5963500021825172,
        0.7792410654159365
      ),
    },
    duration: 3, // 飞行时间（s）
  });
};
onMounted(() => {
  nextTick(() => {
    initSnow();
  });
});
onBeforeUnmount(() => {
  fireEffect.remove();
  window.viewer.camera.flyHome(3);
});
</script>

<style scoped></style>
