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
import { ZoomControl } from "cesium-extends";
import { Message, Notification } from "@arco-design/web-vue";
import { Cartesian3 } from "cesium";
let zoomController = null;
onMounted(() => {
  nextTick(() => {
    const viewer = window.viewer;
    zoomController = new ZoomControl(viewer, {
      home: Cartesian3.fromDegrees(116.3, 39.9, 15000000),
    });
    Message.success("添加缩放控件成功");
  });
});
onBeforeUnmount(() => {
  zoomController.destroy();
});
</script>

<style scoped></style>
