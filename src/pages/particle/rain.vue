<template>
  <div>
    <a-row>
      <a-button shape="round" @click="changeStatus" style="width: 100%" type="primary">
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
import {
  IconPlayCircleFill,
  IconPauseCircleFill,
} from "@arco-design/web-vue/es/icon";
import { ref } from "vue";
import RainEffect from "@/utils/cesium-effect/rain";
import { nextTick, onMounted, onBeforeUnmount } from "vue";
const status = ref(true);
let rainEffect = null;
const changeStatus = () => {
  status.value = !status.value;
  rainEffect.show(status.value);
};
const initSnow = () => {
  rainEffect = new RainEffect(window.viewer);
};
onMounted(() => {
  nextTick(() => {
    initSnow();
  });
});
onBeforeUnmount(() => {
  rainEffect.destroy();
});
</script>

<style scoped></style>
