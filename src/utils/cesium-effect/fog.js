import * as Cesium from "cesium";
export default class FogEffect {
  constructor(viewer, option) {
    this.viewer = viewer;
    option = option || {};
    this.visibility = Cesium.defaultValue(option.visibility, 0.1); // 能见度
    this.color = Cesium.defaultValue(
      option.color,
      new Cesium.Color(0.8, 0.8, 0.8, 0.5)
    );
    this.init();
  }

  init() {
    this.fogStage = new Cesium.PostProcessStage({
      name: "fog_stage",
      fragmentShader: this.fogShader(),
      uniforms: {
        visibility: () => {
          return this.visibility;
        },
        fogColor: () => {
          return this.color;
        },
      },
    });
    this.fogStage.id = "fog_stage";
    this.viewer.scene.postProcessStages.add(this.fogStage);
  }
  destroy() {
    this.viewer.scene.postProcessStages.remove(this.fogStage);
    const isDestroy = this.fogStage.isDestroyed();
    if (!isDestroy) {
      this.fogStage.destroy();
    }
    this.fogStage = null;
  }
  //销毁
  show(flag) {
    this.fogStage.enabled = flag;
  }
  fogShader() {
    return "uniform sampler2D colorTexture;\n\
       uniform sampler2D depthTexture;\n\
       uniform float visibility;\n\
       uniform vec4 fogColor;\n\
       in vec2 v_textureCoordinates; \n\
       out vec4 fragColor;\n\
       void main(void) \n\
       { \n\
          vec4 origcolor = texture(colorTexture, v_textureCoordinates); \n\
          float depth = czm_readDepth(depthTexture, v_textureCoordinates); \n\
          vec4 depthcolor = texture(depthTexture, v_textureCoordinates); \n\
          float f = visibility * (depthcolor.r - 0.3) / 0.2; \n\
          if (f < 0.0) f = 0.0; \n\
          else if (f > 1.0) f = 1.0; \n\
          fragColor = mix(origcolor, fogColor, f); \n\
       }\n";
  }
}
