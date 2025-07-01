(self.webpackChunkextract_css=self.webpackChunkextract_css||[]).push([["95031"],{305695:function(f,M,t){"use strict";t.d(M,{Z:()=>Z});var z=t(392338),h=t(276937),O=t.n(h),T=t(460898),I=t.n(T),F=t(29134),x=t.n(F),y=t(248031),D=t.n(y),L=t(455995),B=t.n(L),j=t(767632),u=t.n(j),a=t(536123),o=t.n(a),S=t(429039),c=t.n(S),A=t(898173),C=t(179119),W=`
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float easeOut(float t) {
  return sin(t * HALF_PI);
}

uniform vec4 uViewport;
uniform sampler2D uImage;
uniform float uCenterRadius;
uniform float uMaxRings;
uniform float uRingSize;
uniform float uRotation;
uniform float uScaleEven;
uniform float uScaleOdd;
uniform float uScaleTaperEven;
uniform float uScaleTaperOdd;
uniform float uShiftIntensity;
uniform float uStepFlipRotation;
uniform float uStepFlipX;
uniform float uStepFlipY;
uniform vec2 uResolution;
uniform vec2 uShift;
varying vec2 vUv;

vec2 rotate(vec2 uv, float amount) {
  vec2 prime = vec2(uv.x * cos(amount) + uv.y * sin(amount),
    -uv.x * sin(amount) + uv.y * cos(amount));
  return prime;
}

float getStep (vec2 uv) {
  return (floor(max(0.0, distance(uv, vec2(0.0)) - uCenterRadius) / uRingSize));
}

vec2 getFragCoord () {
  float scale = uResolution.x / uViewport.z;
  vec2 coord = gl_FragCoord.xy;
  coord.y -= uViewport.y;

  return coord * scale;
}

void main () {
  vec2 uv = vUv - 0.5;
  float aspect = uResolution.x / uResolution.y;
  vec2 stepCoord = (getFragCoord() / uResolution) - 0.5;

  float step = min(getStep(stepCoord * uResolution), uMaxRings);
  float isEven = mod(step, 2.0);
  float flipRotation = sign((1.0 - isEven + uStepFlipRotation) * 2.0 - 1.0);
  vec2 flipAxis = vec2(
    sign((1.0 - isEven + uStepFlipX) * 2.0 - 1.0),
    sign((1.0 - isEven + uStepFlipY) * 2.0 - 1.0)
  );
  float progress = easeOut((step + 1.0) / (uMaxRings + 1.0));
  float progressRotation = easeOut((step) / (uMaxRings));
  float rotation = progressRotation * (uRotation) * flipRotation;
  float scale = mix(uScaleOdd, uScaleEven, isEven);
  float taper = mix(uScaleTaperEven, uScaleTaperOdd, isEven);
  float taperScale = (1.0 - progress) * taper;
  vec2 shift = uShift * uShiftIntensity * progress;

  uv.x *= aspect;
  uv = rotate(uv, rotation);
  uv.x /= aspect;
  uv =
    (uv + shift) *
      flipAxis *
      scale *
      (1.0 + taperScale) +
    0.5;

  vec4 tx = texture2D(uImage, mod(uv * -sign(mod(uv, 2.0) - 1.0), 1.0));
  tx.xyz *= tx.a;

  gl_FragColor = tx;
}
`;function K(v,R){var p=Object.keys(v);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(v);R&&(l=l.filter(function(e){return Object.getOwnPropertyDescriptor(v,e).enumerable})),p.push.apply(p,l)}return p}function X(v){for(var R=1;R<arguments.length;R++){var p=arguments[R]!=null?arguments[R]:{};R%2?K(Object(p),!0).forEach(function(l){c()(v,l,p[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(v,Object.getOwnPropertyDescriptors(p)):K(Object(p)).forEach(function(l){Object.defineProperty(v,l,Object.getOwnPropertyDescriptor(p,l))})}return v}function Y(v){var R=w();return function(){var l=o()(v),e;if(R){var n=o()(this).constructor;e=Reflect.construct(l,arguments,n)}else e=l.apply(this,arguments);return u()(this,e)}}function w(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(v){return!1}}var Z=function(v){B()(p,v);var R=Y(p);function p(l,e){var n;return O()(this,p),n=R.call(this,l,X({programKey:"refracted-circles-program",frag:W,uniforms:{uCenterRadius:100,uMaxRings:-1,uShift:[0,0]}},e)),c()(x()(n),"isIntersecting",!1),c()(x()(n),"onIntersection",function(i){n.isIntersecting=i,n.interaction.setIsIntersecting(i)}),c()(x()(n),"onScrollProgress",function(i){n.interaction.setScrollProgress(i)}),n.autoUpdate=!1,n.updateInteraction(),n.setSize(),n}return I()(p,[{key:"updateInteraction",value:function(){this.interaction&&this.interaction.destroy();var e=(0,C.Z)(this.props.interactionType);this.interaction=new e({shiftUniform:this.uniforms.uShift,props:this.props,node:this.node.closest("section")||this.node}),this.interaction.setIsIntersecting(this.isIntersecting)}},{key:"onUpdateProps",value:function(e){D()(o()(p.prototype),"onUpdateProps",this).call(this,e),this.props.interactionType!==e.interactionType?this.updateInteraction():this.interaction.setProps(this.props)}},{key:"getUniformsFromProps",value:function(){var e=this.props,n=e.size,i=e.rotation,s=e.scaleEven,r=e.scaleOdd,g=e.scaleTaperEven,d=e.scaleTaperOdd,P=e.shiftIntensity,m=e.isStepFlipRotation,E=e.isStepFlipX,U=e.isStepFlipY,b=e.contextScale;return{uRotation:i*Math.PI/180,uRingSize:n*b,uScaleEven:s*.01,uScaleOdd:r*.01,uScaleTaperEven:g*.01,uScaleTaperOdd:d*.01,uStepFlipRotation:1-+m,uStepFlipX:1-+E,uStepFlipY:1-+U,uShiftIntensity:P*.002}}},{key:"update",value:function(){this.interaction.update()&&(this.isDirty=!0)}},{key:"onRefresh",value:function(){D()(o()(p.prototype),"onRefresh",this).call(this),this.setSize()}},{key:"setSize",value:function(){var e=this.width,n=this.height,i=this.props,s=i.centerOffsetSize,r=i.isLimitRings,g=i.numRings,d=i.size,P=i.contextScale,m=Math.min(e,n)*.5,E=Math.sqrt(e*e+n*n)*.5,U=m*(s*.01*P),b=Math.ceil((E-s*P)/(d*P)),N=r?Math.min(g,b):b;this.uniforms.uCenterRadius=U,this.uniforms.uMaxRings=N}},{key:"onDestroy",value:function(){D()(o()(p.prototype),"onDestroy",this).call(this),this.interaction.destroy()}}]),p}(A.Z);c()(Z,"defaultProps",{isLimitRings:!1,numRings:0,centerOffsetSize:0,size:0,rotation:0,scaleEven:0,scaleOdd:0,scaleTaperEven:0,scaleTaperOdd:0,isStepFlipRotation:!1,isStepFlipX:!1,isStepFlipY:!1,interactionType:"none",shiftIntensity:0,shiftSpeed:0,contextScale:1,scrollProgress:-1,mouseX:-1,mouseY:-1})},179119:function(f,M,t){"use strict";t.d(M,{Z:()=>l});var z=t(429039),h=t.n(z),O=function(){return!!("ontouchstart"in window||window.navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0||window.DocumentTouch&&document instanceof DocumentTouch)}(),T=O,I=t(148154),F=t(276937),x=t.n(F),y=t(460898),D=t.n(y),L=function(){function e(n){var i=n.shiftUniform,s=n.props,r=n.node;x()(this,e),this.shiftUniform=i,this.props=s,this.node=r}return D()(e,[{key:"setProps",value:function(i){this.props=i}},{key:"setImmediate",value:function(){}},{key:"setIsIntersecting",value:function(){}},{key:"setScrollProgress",value:function(){}},{key:"update",value:function(){return this.shiftUniform[0]=0,this.shiftUniform[1]=0,!1}},{key:"destroy",value:function(){}}]),e}(),B=t(392338),j=t(29134),u=t.n(j),a=t(455995),o=t.n(a),S=t(767632),c=t.n(S),A=t(536123),C=t.n(A);function W(e){var n=K();return function(){var s=C()(e),r;if(n){var g=C()(this).constructor;r=Reflect.construct(s,arguments,g)}else r=s.apply(this,arguments);return c()(this,r)}}function K(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}var X=function(e){o()(i,e);var n=W(i);function i(){var s;x()(this,i);for(var r=arguments.length,g=new Array(r),d=0;d<r;d++)g[d]=arguments[d];return s=n.call.apply(n,[this].concat(g)),h()(u()(s),"shiftTarget",[0,0]),h()(u()(s),"shiftResetTID",-1),h()(u()(s),"onPointerMove",function(P){var m=s.node.getBoundingClientRect(),E=(P.clientX-m.left)/m.width,U=(P.clientY-m.top)/m.height;s.shiftTarget[0]=E*-2+1,s.shiftTarget[1]=U*2-1,s.onPointerLeave()}),h()(u()(s),"onPointerLeave",function(){clearTimeout(s.shiftResetTID),s.shiftResetTID=setTimeout(s.resetShift,2e3)}),h()(u()(s),"resetShift",function(){s.shiftTarget=[0,0]}),s}return D()(i,[{key:"setIsIntersecting",value:function(r){if(r){this.enable();return}this.disable()}},{key:"enable",value:function(){this.node.addEventListener("mousemove",this.onPointerMove),this.node.addEventListener("mouseleave",this.onPointerLeave)}},{key:"disable",value:function(){this.node.removeEventListener("mousemove",this.onPointerMove),this.node.removeEventListener("mouseleave",this.onPointerLeave)}},{key:"update",value:function(){var r=this.props,g=r.shiftSpeed,d=r.mouseX,P=r.mouseY,m=this.shiftUniform,E=this.shiftTarget;d!==-1&&P!==-1&&(E=[d*.01*-2+1,P*.01*2-1]);var U=E[0]-m[0],b=E[1]-m[1];return U===0&&b===0?!1:(m[0]+=U*(g*.002),m[1]+=b*(g*.002),!0)}},{key:"destroy",value:function(){this.disable(),clearTimeout(this.shiftResetTID)}}]),i}(L);function Y(e){var n=w();return function(){var s=C()(e),r;if(n){var g=C()(this).constructor;r=Reflect.construct(s,arguments,g)}else r=s.apply(this,arguments);return c()(this,r)}}function w(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}var Z=function(e){o()(i,e);var n=Y(i);function i(){var s;x()(this,i);for(var r=arguments.length,g=new Array(r),d=0;d<r;d++)g[d]=arguments[d];return s=n.call.apply(n,[this].concat(g)),h()(u()(s),"targetProgress",0),h()(u()(s),"isImmediate",!0),s}return D()(i,[{key:"setIsIntersecting",value:function(r){r&&this.setImmediate()}},{key:"setImmediate",value:function(){this.isImmediate=!0}},{key:"setScrollProgress",value:function(r){this.isImmediate&&(this.shiftUniform[1]=r,this.isImmediate=!1),this.targetProgress=r}},{key:"update",value:function(){var r=this.props,g=r.shiftSpeed,d=r.scrollProgress,P=this.shiftUniform[1],m=this.targetProgress;if(d>=0&&(m=d*.01),P===m)return!1;var E=m-P;return E<.01?this.shiftUniform[1]=m:this.shiftUniform[1]=P+E*(g*.01),this.shiftUniform[0]=0,!0}}]),i}(L),v,R=(v={},h()(v,I.Z.none,L),h()(v,I.Z.scroll,Z),h()(v,I.Z.mouse,X),v),p=function(n){return n===I.Z.mouse&&T?R[I.Z.scroll]:R[n]},l=p},148154:function(f,M){"use strict";M.Z={none:"none",mouse:"mouse",scroll:"scroll"}},536040:function(f,M,t){"use strict";t.d(M,{Z:()=>j});var z=t(392338),h=t.n(z),O=t(276937),T=t.n(O),I=t(460898),F=t.n(I),x=t(429039),y=t.n(x),D=t(749189);function L(u,a){var o=Object.keys(u);if(Object.getOwnPropertySymbols){var S=Object.getOwnPropertySymbols(u);a&&(S=S.filter(function(c){return Object.getOwnPropertyDescriptor(u,c).enumerable})),o.push.apply(o,S)}return o}function B(u){for(var a=1;a<arguments.length;a++){var o=arguments[a]!=null?arguments[a]:{};a%2?L(Object(o),!0).forEach(function(S){y()(u,S,o[S])}):Object.getOwnPropertyDescriptors?Object.defineProperties(u,Object.getOwnPropertyDescriptors(o)):L(Object(o)).forEach(function(S){Object.defineProperty(u,S,Object.getOwnPropertyDescriptor(o,S))})}return u}var j=function(){function u(a,o,S){var c=this,A=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};T()(this,u),y()(this,"isPaused",!1),y()(this,"isIntersecting",!1),y()(this,"onIntersection",function(C){c.isIntersecting=C,c.updatePlayState(),c.instance.onIntersection&&c.instance.onIntersection(C),c.isIntersecting&&c.isPaused&&c.instance.renderFrame()}),y()(this,"setPaused",function(C){c.isPaused=C,c.updatePlayState()}),y()(this,"togglePaused",function(){c.setPaused(!c.isPaused)}),y()(this,"onResize",function(){c.instance.refresh()}),this.instance=new a(o,S),this.node=o,this.options=B(B({},u.defaultOptions),A),this.options.reduceMotion===!0&&(this.isPaused=!0),this.bindListeners()}return F()(u,[{key:"bindListeners",value:function(){this.intersectionScroll=new D.Z(this.node,{onIntersection:this.onIntersection,onProgress:this.instance.onScrollProgress,normalize:this.options.normalizeScroll,windowRef:this.options.scrollWindowRef}),this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.node)}},{key:"unbindListeners",value:function(){this.intersectionScroll.destroy(),this.resizeObserver.disconnect()}},{key:"detach",value:function(){this.unbindListeners(),this.instance.detach(),this.node=null}},{key:"attach",value:function(o){this.node=o,this.bindListeners(),this.instance.attach(o)}},{key:"updatePlayState",value:function(){if(this.isIntersecting&&!this.isPaused){this.instance.start();return}this.instance.stop()}},{key:"setProps",value:function(o){this.instance.setProps(o)}},{key:"refresh",value:function(){this.instance.refresh()}},{key:"destroy",value:function(){this.unbindListeners(),this.instance.destroy()}},{key:"props",get:function(){return this.instance.props}},{key:"autoUpdate",get:function(){return this.instance.autoUpdate}},{key:"isSupported",get:function(){return this.instance.isSupported}}]),u}();y()(j,"defaultOptions",{scrollWindowRef:window,normalizeScroll:!0,reduceMotion:!1})},248031:function(f,M,t){var z=t(522294);function h(){return typeof Reflect!="undefined"&&Reflect.get?(f.exports=h=Reflect.get.bind(),f.exports.__esModule=!0,f.exports.default=f.exports):(f.exports=h=function(T,I,F){var x=z(T,I);if(x){var y=Object.getOwnPropertyDescriptor(x,I);return y.get?y.get.call(arguments.length<3?T:F):y.value}},f.exports.__esModule=!0,f.exports.default=f.exports),h.apply(this,arguments)}f.exports=h,f.exports.__esModule=!0,f.exports.default=f.exports},522294:function(f,M,t){var z=t(536123);function h(O,T){for(;!Object.prototype.hasOwnProperty.call(O,T)&&(O=z(O),O!==null););return O}f.exports=h,f.exports.__esModule=!0,f.exports.default=f.exports}}]);

//# sourceMappingURL=https://sourcemaps.squarespace.net/universal/scripts-compressed/sourcemaps/aae57fad896e81e5/95031-c6cb927bcd94b902-min.nl-NL.js.map