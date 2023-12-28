import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/basic",
  },
  {
    path: "/basic",
    redirect: "/basic/skyBox",
    meta: {
      title: "基础设置",
    },
    children: [
      {
        path: "skyBox",
        meta: {
          title: "天空盒",
        },
        component: () => import("@/pages/basic/skyBox.vue"),
      },
      {
        path: "terrain",
        meta: {
          title: "地形数据",
        },
        component: () => import("@/pages/basic/terrain.vue"),
      },
    ],
  },
  {
    path: "/tools",
    redirect: "/tools/drawer",
    meta: {
      title: "常用工具",
    },
    children: [
      {
        path: "drawer",
        meta: {
          title: "绘制工具",
        },
        component: () => import("@/pages/tools/drawer.vue"),
      },
      {
        path: "measure",
        meta: {
          title: "量测工具",
        },
        component: () => import("@/pages/tools/measure.vue"),
      },
      {
        path: "compass",
        meta: {
          title: "指南针",
        },
        component: () => import("@/pages/tools/compass.vue"),
      },
      {
        path: "zoom",
        meta: {
          title: "缩放控件",
        },
        component: () => import("@/pages/tools/zoom.vue"),
      },
      {
        path: "tooltip",
        meta: {
          title: "tooltip",
        },
        component: () => import("@/pages/tools/tooltip.vue"),
      },
    ],
  },
  {
    path: "/particle",
    redirect: "/particle/snow",
    meta: {
      title: "粒子效果",
    },
    children: [
      {
        path: "snow",
        meta: {
          title: "下雪",
        },
        component: () => import("@/pages/particle/snow.vue"),
      },
      {
        path: "rain",
        meta: {
          title: "下雨",
        },
        component: () => import("@/pages/particle/rain.vue"),
      },
      {
        path: "fog",
        meta: {
          title: "大雾",
        },
        component: () => import("@/pages/particle/fog.vue"),
      },
      {
        path: "fire",
        meta: {
          title: "火焰",
        },
        component: () => import("@/pages/particle/fire.vue"),
      },
    ],
  },
  {
    path: "/mark",
    redirect: "/mark/primitive",
    meta: {
      title: "打点",
    },
    children: [
      {
        path: "primitive",
        meta: {
          title: "primitive方式打点",
        },
        component: () => import("@/pages/mark/primitive.vue"),
      },
    ],
  },
  {
    path: "/model",
    redirect: "/model/clampModel",
    meta: {
      title: "模型",
    },
    children: [
      {
        path: "clampModel",
        meta: {
          title: "3dtiles贴模型取点",
        },
        component: () => import("@/pages/model/clampModel.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from) => {
  const matched = to.matched;
  const title = matched[0].meta.title + " | " + matched[1].meta.title;
  document.title = title; // 修改网页标题
  return true;
});
export default router;
