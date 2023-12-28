import * as Cesium from "cesium";
// 默认到中国上空
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  75.0, // 东
  0.0, // 南
  140.0, // 西
  60.0 // 北
);
export const defaultOpt = {
  scene3DOnly: true, // 当为 true时。每个几何实例将仅以3D呈现以节省GPU 内存
  infoBox: false, // 默认点击时候弹出的信息窗
  shouldAnimate: true, // 当为true时，默认尝试提前模拟时间
  vrButton: false, // VR按钮
  geocoder: false, // 地理搜索框
  homeButton: false, // home按钮
  sceneModePicker: false,
  baseLayerPicker: false, // 基础图层选择器
  navigationHelpButton: false,
  selectionIndicator: false, //选择框
  animation: false, // 时间动画小控件
  timeline: false, //时间线
  fullscreenButton: false, //全屏按钮
  shadows: false, // 去掉阴影
  skyAtmosphere: false, //去掉地球光圈
};

class CesiumOperation {
  constructor() {}
  initViewer(containerId, opt = defaultOpt) {
    this.viewer = new Cesium.Viewer(containerId, {
      ...opt,
    });
    let creditContainer = this.viewer.cesiumWidget.creditContainer;
    creditContainer.style.display = "none"; //去除cesium图标
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    ); //取消cesium默认双击事件
    // 启用透明度
    this.viewer.scene.globe.translucency.enabled = true;
    this.viewer.imageryLayers.removeAll();
    this.viewer.scene.debugShowFramesPerSecond = false;
    this.viewer.scene.globe.terrainExaggeration = 1.0; //地形夸张
    return this.viewer;
  }
  //图元方式创建多段线
  static createPrimitivePolyline(
    positions,
    opt = {
      width: 5.0,
      color: new Cesium.Color(0, 153, 0, 0.5),
    }
  ) {
    //定义几何形状
    const polyline = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: positions,
        width: opt.width,
      }),
    });
    //定义外观
    const polylineAppearance = new Cesium.PolylineMaterialAppearance({
      material: Cesium.Material.fromType("Color", {
        color: opt.color,
      }),
    });
    //创建Primitive
    const polylineGeometry = new Cesium.Primitive({
      geometryInstances: polyline,
      appearance: polylineAppearance,
    });
    return polylineGeometry;
  }
  //图元方式创建点集合

  static createPointPrimitiveCollection(
    positions,
    opt = {
      color: Cesium.Color.WHITE,
      pixelSize: 20,
      outlineColor: Cesium.Color.TRANSPARENT,
      outlineWidth: 0,
    }
  ) {
    const pointPrimitives = new Cesium.PointPrimitiveCollection();
    positions.forEach((position, index) => {
      pointPrimitives.add({
        ...opt,
        position,
      });
    });
    return pointPrimitives;
  }
}

export default CesiumOperation;
