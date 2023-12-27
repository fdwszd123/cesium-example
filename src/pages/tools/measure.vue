<template>
  <div>
    <a-row style="margin-bottom: 10px" v-for="item in measureOptions">
      <a-col>
        <a-button
          @click="startMeasure(item.key, item.tool)"
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
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import {
  AreaMeasure,
  AreaSurfaceMeasure,
  DistanceMeasure,
  DistanceSurfaceMeasure,
  Measure,
} from "cesium-extends";
import {
  Cartesian3,
  CesiumTerrainProvider,
  IonResource,
  Viewer,
  Math as CMath,
} from "cesium";
let measure = undefined;
let activeTool = undefined;
const measureOptions = [
  {
    label: "距离测量",
    key: "Distance",
    tool: DistanceMeasure,
  },
  {
    label: "距离测量(贴地)",
    key: "SurfaceDistance",
    tool: DistanceSurfaceMeasure,
  },
  {
    label: "面积测量",
    key: "Area",
    tool: AreaMeasure,
  },
  {
    label: "面积测量(贴地)",
    key: "SurfaceArea",
    tool: AreaSurfaceMeasure,
  },
];
const initMeasure = () => {
  const viewer = window.viewer;
  // 创建 TerrainProvider 对象
  CesiumTerrainProvider.fromIonAssetId(1).then((terrainProvider) => {
    if (viewer) {
      // 将 TerrainProvider 对象添加到 Viewer 中
      viewer.terrainProvider = terrainProvider;
      viewer.current.camera.setView({
        destination: Cartesian3.fromDegrees(120, 28, 50000),
        orientation: {
          heading: CMath.toRadians(0),
          pitch: CMath.toRadians(-45),
          roll: CMath.toRadians(0),
        },
      });
    }
  });
};

const startMeasure = (name, Tool) => {
  const viewer = window.viewer;

  if (!viewer) return;

  if (measure) {
    measure.destroy();
    measure = undefined;
  }
  const newToolName = activeTool === name ? null : name;
  activeTool = newToolName;

  if (newToolName && Tool) {
    measure = new Tool(viewer, {
      units: "kilometers",
      locale: {
        start: "起点",
        area: "面积",
        total: "总计",
        formatLength: (length, unitedLength) => {
          if (length < 1000) {
            return length + "米";
          }
          return unitedLength + "千米";
        },
        formatArea: (area, unitedArea) => {
          if (area < 1000000) {
            return area + "平方米";
          }
          return unitedArea + "平方千米";
        },
      },
      drawerOptions: {
        tips: {
          init: "点击绘制",
          start: "左键添加点，右键移除点，双击结束绘制",
        },
      },
    });
    measure.start();
  }
};
const clear = () => {
  measure?.end();
};
onMounted(() => {
  nextTick(() => {
    initMeasure();
  });
});
onBeforeUnmount(() => {
  if (measure) {
    measure.destroy();
    measure = undefined;
  }
});
</script>

<style scoped></style>
