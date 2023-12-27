import * as Cesium from "cesium";

export default class SnowEffect {
  constructor(viewer, option) {
    this.viewer = viewer;
    option = option || {};
    this.snowSize = option.snowSize || 0.02;
    this.snowSpeed = option.snowSpeed || 60.0;
    this.init();
  }
  init() {
    this.snowStage = new Cesium.PostProcessStage({
      name: "snow_stage",
      fragmentShader: this.snowShader(),
      uniforms: {
        snowSize: () => {
          return this.snowSize;
        },
        snowSpeed: () => {
          return this.snowSpeed;
        },
      },
    });
    this.snowStage.id = "snow_stage";

    //后处理阶段添加到场景
    this.viewer.scene.postProcessStages.add(this.snowStage);
  }
  destroy() {
    this.viewer.scene.postProcessStages.remove(this.snowStage);
    const isDestroy = this.snowStage.isDestroyed();
    if (!isDestroy) {
      this.snowStage.destroy();
    }
    this.snowStage = null;
  }

  //销毁
  show(flag) {
    this.snowStage.enabled = flag;
  }
  snowShader() {
    return "uniform sampler2D colorTexture;\n\
    in vec2 v_textureCoordinates;\n\
    uniform float snowSpeed;\n\
            uniform float snowSize;\n\
    float snow(vec2 uv,float scale)\n\
    {\n\
        float time=czm_frameNumber/snowSpeed;\n\
        float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n\
        uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n\
        uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n\
        p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n\
        k=smoothstep(0.,k,sin(f.x+f.y)*snowSize);\n\
        return k*w;\n\
    }\n\
    out vec4 fragColor;\n\
    void main(void){\n\
        vec2 resolution=czm_viewport.zw;\n\
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
        vec3 finalColor=vec3(0);\n\
        //float c=smoothstep(1.,0.3,clamp(uv.y*.3+.8,0.,.75));\n\
        float c=0.;\n\
        c+=snow(uv,30.)*.0;\n\
        c+=snow(uv,20.)*.0;\n\
        c+=snow(uv,15.)*.0;\n\
        c+=snow(uv,10.);\n\
        c+=snow(uv,8.);\n\
        c+=snow(uv,6.);\n\
        c+=snow(uv,5.);\n\
        finalColor=(vec3(c));\n\
        fragColor=mix(texture(colorTexture,v_textureCoordinates),vec4(finalColor,1),.5);\n\
        }\n\
        ";
  }
}
