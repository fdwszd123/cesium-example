<template>
  <div>
    <a-row style="margin-bottom: 10px">
      <a-col>
        插件：
        <a-link
          target="_blank"
          href="https://github.com/hongfaqiu/cesium-extends"
          status="success"
        >
          cesium-extends</a-link
        >
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import { Compass } from "cesium-extends";
import { Message, Notification } from "@arco-design/web-vue";
let compass = null;
onMounted(() => {
  nextTick(() => {
    const viewer = window.viewer;
    compass = new Compass(viewer);
    Message.success("添加指南针成功");
  });
});
onBeforeUnmount(() => {
  compass.destroy();
});
</script>

<style scoped></style>
