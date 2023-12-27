import * as Cesium from "cesium";
//火焰特效
export default class FireEffect {
  constructor(viewer) {
    this.viewer = viewer;
    this.viewModel = {
      startScale: 1, // 应用于粒子生命开始时的图像的初始比例。
      endScale: 4,
      minimumParticleLife: 1,
      maximumParticleLife: 3, // 设置粒子生命可能持续时间的最大边界(以秒为单位)，在此范围内，将随机选择粒子的实际生命。
      minimumSpeed: 1,
      maximumSpeed: 8, // 设置以米/每秒为单位的粒子的实际速度将被随机选择的最大边界。
      particleSize: 20,
      emissionRate: 5,
    };
    this.emitterModelMatrix = new Cesium.Matrix4();
    this.translation = new Cesium.Cartesian3();
    this.rotation = new Cesium.Quaternion();
    this.hpr = new Cesium.HeadingPitchRoll();
    this.trs = new Cesium.TranslationRotationScale();
    this.scene = this.viewer.scene;
    this.particleSystem = "";
    this.entity = this.viewer.entities.add({
      //选择粒子放置的坐标
      position: Cesium.Cartesian3.fromDegrees(120.36, 36.09),
    });
    this.entity.name = "fire";
    this.init();
  }

  init() {
    const _this = this;
    this.viewer.clock.shouldAnimate = true;
    this.viewer.scene.globe.depthTestAgainstTerrain = false;
    // this.viewer.trackedEntity = this.entity;
    const minimum = 10,
      maximum = 20;
    var particleSystem = this.scene.primitives.add(
      new Cesium.ParticleSystem({
        // 系统的粒子发射器
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(45.0)), //BoxEmitter 盒形发射器，ConeEmitter 锥形发射器，SphereEmitter 球形发射器，CircleEmitter圆形发射器

        image: "/images/fire.png",
        startColor: Cesium.Color.RED,
        endColor: Cesium.Color.YELLOW,
        startScale: 1.0,
        endScale: 3.0,
        particleLife: 1.5,
        speed: 10.0,
        emissionRate: 200.0,
        imageSize: new Cesium.Cartesian2(25, 25),
        bursts: [
          new Cesium.ParticleBurst({ time: 0.0, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.1, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.2, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.3, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.4, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.5, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.6, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.7, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.8, minimum, maximum }),
          new Cesium.ParticleBurst({ time: 0.9, minimum, maximum }),
        ],
      })
    );
    particleSystem.id = "fire";
    this.particleSystem = particleSystem;
    this.preUpdateEvent();
  }

  //场景渲染事件
  preUpdateEvent() {
    let _this = this;
    this.viewer.scene.preUpdate.addEventListener(function test(scene, time) {
      //发射器地理位置
      _this.particleSystem.modelMatrix = _this.computeModelMatrix(
        _this.entity,
        time
      );
      //发射器局部位置
      _this.particleSystem.emitterModelMatrix =
        _this.computeEmitterModelMatrix();
      // 将发射器旋转
      if (_this.viewModel.spin) {
        _this.viewModel.heading += 1.0;
        _this.viewModel.pitch += 1.0;
        _this.viewModel.roll += 1.0;
      }
    });
  }

  computeModelMatrix(entity, time) {
    return entity.computeModelMatrix(time, new Cesium.Matrix4());
  }

  computeEmitterModelMatrix() {
    this.hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, this.hpr);
    this.trs.translation = Cesium.Cartesian3.fromElements(
      -4.0,
      0.0,
      1.4,
      this.translation
    );
    this.trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(
      this.hpr,
      this.rotation
    );

    return Cesium.Matrix4.fromTranslationRotationScale(
      this.trs,
      this.emitterModelMatrix
    );
  }

  removeEvent() {
    this.viewer.scene.preUpdate.removeEventListener(this.preUpdateEvent, this);
    this.emitterModelMatrix = undefined;
    this.translation = undefined;
    this.rotation = undefined;
    this.hpr = undefined;
    this.trs = undefined;
  }
  show(flag) {
    this.entity.show = flag;
    this.particleSystem.show = flag;
  }
  //移除粒子特效
  remove() {
    () => {
      return this.removeEvent();
    }; //清除事件
    this.viewer.scene.primitives.remove(this.particleSystem); //删除粒子对象
    this.viewer.entities.remove(this.entity); //删除entity
  }
}
