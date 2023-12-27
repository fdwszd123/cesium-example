import * as Cesium from "cesium";
// 笛卡尔转经纬高
export const cartesianToWGS84 = (cartesian) => {
  // 将Cartesian3坐标转换为经纬度坐标
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  const longitude = Cesium.Math.toDegrees(cartographic.longitude);
  const latitude = Cesium.Math.toDegrees(cartographic.latitude);
  const altitude = cartographic.height;
  return {
    longitude,
    altitude,
    latitude,
  };
};
