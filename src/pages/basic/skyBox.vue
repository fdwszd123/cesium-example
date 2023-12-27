<template>
  <div>
    <a-row>
      <a-col>
        <a-button
          @click="randomSkyBox"
          style="width: 100%"
          type="primary"
          shape="round"
          >随机一个天空盒 <template #icon> <icon-refresh /> </template
        ></a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import * as Cesium from "cesium";
import { Message } from "@arco-design/web-vue";
import { skyBoxList } from "@/config/skyBox";
import { getRandomInt } from "@/utils/math";

const randomSkyBox = () => {
  let randomIdx = getRandomInt(0, skyBoxList.length - 1);
  const viewer = window.viewer;
  viewer.scene.skyBox = skyBoxList[randomIdx];
};
onMounted(() => {
  nextTick(() => {
    randomSkyBox();
  });
});
onBeforeUnmount(() => {
  const viewer = window.viewer;
  viewer.scene.skyBox = undefined;
});
</script>

<style scoped></style>
