import { IconApps, IconTool, IconMosaic,IconSunFill,IconLocation } from "@arco-design/web-vue/es/icon";
export const menuOptions = [
  {
    key: "1",
    title: "基础设置",
    icon: IconApps,
    subList: [
      { key: "1-1", title: "天空盒", path: "/basic/skyBox" },
      {
        key: "1-2",
        title: "地形数据",
        path: "/basic/terrain",
      },
    ],
  },
  {
    key: "2",
    title: "常用工具",
    icon: IconTool,
    subList: [
      { key: "2-1", title: "绘制工具", path: "/tools/drawer" },
      {
        key: "2-2",
        title: "量测工具",
        path: "/tools/measure",
      },
      {
        key: "2-3",
        title: "指南针",
        path: "/tools/compass",
      },
      {
        key: "2-4",
        title: "缩放控件",
        path: "/tools/zoom",
      },
      {
        key: "2-5",
        title: "tooltip",
        path: "/tools/tooltip",
      },
    ],
  },
  {
    key: "3",
    title: "粒子效果",
    icon: IconSunFill,
    subList: [
      { key: "3-1", title: "下雪", path: "/particle/snow" },
      { key: "3-2", title: "下雨", path: "/particle/rain" },
      { key: "3-3", title: "大雾", path: "/particle/fog" },
      { key: "3-4", title: "火焰", path: "/particle/fire" },
    ],
  }, {
    key: "4",
    title: "打点",
    icon: IconLocation,
    subList: [
      { key: "4-1", title: "primitive方式打点", path: "/mark/primitive" },
    
    ],
  },
];
