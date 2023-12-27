<template>
  <div>
    <a-row style="margin-bottom: 10px" v-for="item in operations">
      <a-col>
        <a-button
          @click="startDraw(item.type)"
          style="width: 100%"
          type="primary"
          shape="round"
          >{{ item.label }}
        </a-button>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 10px">
      <a-col>
        <a-button
          @click="clear"
          status="warning"
          style="width: 100%"
          type="primary"
          shape="round"
          >清除
        </a-button>
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
import { ref } from "vue";
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import { Drawer } from "cesium-extends";
import { Message, Notification } from "@arco-design/web-vue";
import { cartesianToWGS84 } from "@/utils/transform.js";
const operations = [
  {
    type: "POINT",
    label: "点",
  },
  {
    type: "POLYLINE",
    label: "线",
  },
  {
    type: "POLYGON",
    label: "多边形",
  },
  {
    type: "CIRCLE",
    label: "圆形",
  },
  {
    type: "RECTANGLE",
    label: "矩形",
  },
];
let DrawerTool;
const startDraw = (type) => {
  Message.info("开始绘制");
  DrawerTool.start({
    type: type,
    onEnd: (entity, positions) => {
      let str = ``;
      for (let i = 0; i < positions.length; i++) {
        const cartesian = positions[i];
        const pos = cartesianToWGS84(cartesian);
        const { longitude, latitude } = pos;
        str += `点${i}:经度${longitude},纬度${latitude}\n`;
      }
      Notification.info({
        content: str,
        style: { whiteSpace: "pre-wrap" },
      });
    },
  });
  console.log("🚀 ~ file: drawer.vue:76 ~ startDraw ~ entity:", entity);
  console.log("🚀 ~ file: drawer.vue:76 ~ startDraw ~ entity:", entity);
};
const clear = () => {
  DrawerTool.reset();
};
const initDrawer = () => {
  const viewer = window.viewer;
  DrawerTool = new Drawer(viewer, {
    tips: {
      init: "点击绘制",
      start: "左键添加点，右键移除点，双击结束绘制",
    },
  });
};
onMounted(() => {
  nextTick(() => {
    initDrawer();
  });
});
onBeforeUnmount(() => {
  DrawerTool.reset();
  DrawerTool.destroy();
});
</script>

<style scoped></style>
