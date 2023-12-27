import * as Cesium from "cesium";

export default class RainEffect {
  constructor(viewer, option) {
    this.viewer = viewer;
    option = option || {};
    this.tiltAngle = Cesium.defaultValue(option.tiltAngle, -0.6);
    this.rainSize = Cesium.defaultValue(option.rainSize, 0.3);
    this.rainSpeed = Cesium.defaultValue(option.rainSpeed, 60.0);
    this.init();
  }
  init() {
    this.rainStage = new Cesium.PostProcessStage({
      name: "rain_stage",
      fragmentShader: this.rainShader(),
      uniforms: {
        tiltAngle: () => {
          return this.tiltAngle;
        },
        rainSize: () => {
          return this.rainSize;
        },
        rainSpeed: () => {
          return this.rainSpeed;
        },
      },
    });
    this.rainStage.id = "rain_stage";
    this.viewer.scene.postProcessStages.add(this.rainStage);
  }
   destroy() {
    this.viewer.scene.postProcessStages.remove(this.rainStage);
    const isDestroy = this.rainStage.isDestroyed();
    if (!isDestroy) {
      this.rainStage.destroy();
    }
    this.rainStage = null;
  }
  //销毁
  show(flag) {
    this.rainStage.enabled = flag;
  }
  rainShader() {
    return "uniform sampler2D colorTexture;\n\
    in vec2 v_textureCoordinates;\n\
    uniform float tiltAngle;\n\
    uniform float rainSize;\n\
    uniform float rainSpeed;\n\
    float hash(float x) {\n\
        return fract(sin(x * 133.3) * 13.13);\n\
    }\n\
    out vec4 fragColor;\n\
    void main(void) {\n\
        float time = czm_frameNumber / rainSpeed;\n\
        vec2 resolution = czm_viewport.zw;\n\
        vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);\n\
        vec3 c = vec3(.6, .7, .8);\n\
        float a = tiltAngle;\n\
        float si = sin(a), co = cos(a);\n\
        uv *= mat2(co, -si, si, co);\n\
        uv *= length(uv + vec2(0, 4.9)) * rainSize + 1.;\n\
        float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);\n\
        float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;\n\
        c *= v * b;\n\
        fragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c, 1), .5);\n\
    }\n\
    ";
  }
}
