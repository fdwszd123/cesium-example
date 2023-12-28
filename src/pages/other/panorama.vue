<template>
  <div style="line-height: 30px">
    cesium天空盒子做全景图浏览器，鼠标滚轮可控制天空盒子大小
  </div>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import * as Cesium from "cesium";
const handleWheel = (event) => {
  const viewer = window.viewer;
    
  // 获取默认相机
  const camera = viewer.camera;

  // 设置初始的视场角度
  const initialFieldOfView = Cesium.Math.toRadians(60); // 替换为初始视场角度
  camera.frustum.fov = initialFieldOfView;
  // 监听鼠标滚轮事件
  const zoomFactor = 0.001; // 调整放大/缩小的速度
  // 阻止默认滚动行为
  event.preventDefault();

  // // 获取滚轮事件的delta值
  const delta = event.deltaY || event.detail || event.wheelDelta;

  // 计算新的视场角度
  const currentFieldOfView = camera.frustum.fov;
  let newFieldOfView = currentFieldOfView + delta * zoomFactor;

  // 限制视场角度的范围，以防止过大或过小
  const minFieldOfView = Cesium.Math.toRadians(10); // 最小视场角度
  const maxFieldOfView = Cesium.Math.toRadians(120); // 最大视场角度

  if (newFieldOfView < minFieldOfView) {
    newFieldOfView = minFieldOfView;
  } else if (newFieldOfView > maxFieldOfView) {
    newFieldOfView = maxFieldOfView;
  }
  // 更新相机的视场角度
  camera.frustum.fov = newFieldOfView;
};
const initPanorama = () => {
  const viewer = window.viewer;
  viewer.scene.globe.show = false; //隐藏地球

  viewer.scene.sun.show = false; // 隐藏太阳
  viewer.scene.moon.show = false; // 隐藏月亮
  //设置相机位置
  viewer.camera.setView({
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0,
    },
  });

  viewer.canvas.addEventListener("wheel", handleWheel, false);
};
onMounted(() => {
  nextTick(() => {
    initPanorama();
  });
});
onBeforeUnmount(() => {
  const viewer = window.viewer;

  viewer.scene.globe.show = true; //隐藏地球
  viewer.scene.sun.show = true; // 隐藏太阳
  viewer.scene.moon.show = true; // 隐藏月亮
  viewer.canvas.addEventListener("wheel", handleWheelEvent);
});
</script>

<style scoped></style>
