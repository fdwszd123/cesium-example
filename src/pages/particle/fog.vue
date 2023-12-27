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
import { ref } from "vue";
import {
  IconPlayCircleFill,
  IconPauseCircleFill,
} from "@arco-design/web-vue/es/icon";
import FogEffect from "@/utils/cesium-effect/fog";
import { nextTick, onMounted, onBeforeUnmount } from "vue";
const status = ref(true);
const changeStatus = () => {
  status.value = !status.value;
  fogEffect.show(status.value);
};
let fogEffect = null;
const initSnow = () => {
  fogEffect = new FogEffect(window.viewer);
};
onMounted(() => {
  nextTick(() => {
    initSnow();
  });
});
onBeforeUnmount(() => {
  fogEffect.destroy();
});
</script>

<style scoped></style>
