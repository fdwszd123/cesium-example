<template>
  <div class="content">
    <div class="menu-demo">
      <a-menu mode="pop" theme="dark" :default-collapsed="true">
        <a-sub-menu v-for="item in menuOptions" :key="item.key">
          <template #icon><component :is="item.icon" /></template>
          <template #title>{{ item.title }}</template>
          <a-menu-item
            @click="subMenuClick(sub.path)"
            v-for="sub in item.subList"
            :key="sub.path"
            >{{ sub.title }}</a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu @click="collapsed = !collapsed" key="-1">
          <template #icon
            ><icon-menu-fold v-if="collapsed" /> <IconMenuUnfold v-else
          /></template>
          <template #title>{{ collapsed ? "收起" : "展开" }}</template>
          <a-menu-item key="-1-1">{{
            collapsed ? "收起" : "展开"
          }}</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div id="cesium-wrap"></div>
    <div v-show="collapsed" class="router-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { IconMenuFold, IconMenuUnfold } from "@arco-design/web-vue/es/icon";
import CesiumOperation from "@/utils/CesiumOperation";
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { menuOptions } from "@/config/menuConfig";
const collapsed = ref(true);
const router = useRouter();

const initMap = async () => {
  const cesiumOperation = new CesiumOperation();
  const viewer = cesiumOperation.initViewer("cesium-wrap");
  const arcGisMap = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
  );
  viewer.imageryLayers.addImageryProvider(arcGisMap);
  window.viewer = viewer;
  window.cesiumOperation = cesiumOperation;
};
const subMenuClick = (path) => {
  router.push({ path });
};
onMounted(() => {
  initMap();
});
</script>
<style scoped>
.content {
  position: relative;
  height: 100vh;
  width: 100vw;
}
#cesium-wrap {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.menu-demo {
  z-index: 2;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
  position: absolute;
  box-sizing: border-box;
}

.menu-demo .arco-menu {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.menu-demo
  .arco-menu:not(.arco-menu-collapsed)
  :deep(.arco-menu-collapse-button) {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo .arco-menu:not(.arco-menu-collapsed)::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48px;
  height: 48px;
  background-color: inherit;
  border-radius: 50%;
  box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
  width: 48px;
  height: auto;
  padding-top: 24px;
  padding-bottom: 24px;
  border-radius: 22px;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
  right: 8px;
  bottom: 8px;
}
.router-wrap {
  position: absolute;
  width: 200px;
  height: calc(100% - 100px);
  background-color: #fff;
  top: 50%;
  left: 70px;
  transform: translate(0, -50%);
  background-color: rgba(35, 35, 36
  );
  border-radius: 20px;
  color: #fff;
  padding: 20px 10px;
  box-sizing: border-box;
}
</style>
