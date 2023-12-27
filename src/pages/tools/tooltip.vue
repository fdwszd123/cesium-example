<template>
  <div>
    <a-row align="center" justify="space-between" style="margin-bottom: 10px">
      <a-col :span="4"> 文字 </a-col>
      <a-col :span="20">
        <a-input
          @change="handleChangeToolTip"
          v-model="toolTip"
          :style="{ width: '100%' }"
        />
      </a-col>
    </a-row>

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
import { nextTick, onMounted, onBeforeUnmount, ref } from "vue";
import { MouseTooltip } from "cesium-extends";
import { Message, Notification } from "@arco-design/web-vue";
const toolTip = ref("这是一个跟随鼠标的tooltip");
let mouseTooltip = null;
const initToolTip = () => {
  const viewer = window.viewer;
  mouseTooltip = new MouseTooltip(viewer);
  mouseTooltip.content = toolTip.value;
  Message.success("添加tooltip成功");
};
const handleChangeToolTip = () => {
  mouseTooltip.content = toolTip.value;
};
onMounted(() => {
  nextTick(() => {
    initToolTip();
  });
});
onBeforeUnmount(() => {
  mouseTooltip.destroy();
});
</script>

<style scoped></style>
