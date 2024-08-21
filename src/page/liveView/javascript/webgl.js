'use strict';function Texture$$module$Input_0(a){this.gl=a;this.texture=a.createTexture();a.bindTexture(a.TEXTURE_2D,this.texture);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)}
Texture$$module$Input_0.prototype.bind=function(a,c,d){let b=this.gl;b.activeTexture([b.TEXTURE0,b.TEXTURE1,b.TEXTURE2][a]);b.bindTexture(b.TEXTURE_2D,this.texture);b.uniform1i(b.getUniformLocation(c,d),a)};Texture$$module$Input_0.prototype.fill=function(a,c,d){let b=this.gl;b.bindTexture(b.TEXTURE_2D,this.texture);b.texImage2D(b.TEXTURE_2D,0,b.LUMINANCE,a,c,0,b.LUMINANCE,b.UNSIGNED_BYTE,d)};Texture$$module$Input_0.prototype.destroy=function(){this.gl.deleteTexture(this.texture);this.texture=null};
function WebGLPlayer$$module$Input_0(a,c,d){this.canvas=a;this.gl=a.getContext("webgl",{preserveDrawingBuffer:!0})||a.getContext("experimental-webgl",{preserveDrawingBuffer:!0});this.initGL(c);this.maskAreas=[];this.nodeFullscreen=d}WebGLPlayer$$module$Input_0.prototype.generateRandomMaskAreas=function(a){for(let c=0;c<a;c++)this.addMaskArea(Math.random()*this.canvas.width,Math.random()*this.canvas.height,100*Math.random(),100*Math.random())};
WebGLPlayer$$module$Input_0.prototype.initGL=function(a){if(this.gl){a=this.gl;a.pixelStorei(a.UNPACK_ALIGNMENT,1);var c=a.createProgram(),d=a.createShader(a.VERTEX_SHADER);a.shaderSource(d,"attribute highp vec4 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n gl_Position = aVertexPosition;\n vTextureCoord = aTextureCoord;\n}");a.compileShader(d);var b=a.createShader(a.FRAGMENT_SHADER);a.shaderSource(b,"precision highp float;\nvarying lowp vec2 vTextureCoord;\nuniform sampler2D YTexture;\nuniform sampler2D UTexture;\nuniform sampler2D VTexture;\nconst mat4 YUV2RGB = mat4\n(\n 1.1643828125, 0, 1.59602734375, -.87078515625,\n 1.1643828125, -.39176171875, -.81296875, .52959375,\n 1.1643828125, 2.017234375, 0, -1.081390625,\n 0, 0, 0, 1\n);\nvoid main(void) {\n gl_FragColor = vec4( texture2D(YTexture, vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;\n}");
a.compileShader(b);a.attachShader(c,d);a.attachShader(c,b);a.linkProgram(c);a.useProgram(c);a.getProgramParameter(c,a.LINK_STATUS)||console.log("[ER] Shader link failed.");var f=a.getAttribLocation(c,"aVertexPosition");a.enableVertexAttribArray(f);d=a.getAttribLocation(c,"aTextureCoord");a.enableVertexAttribArray(d);b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,b);a.bufferData(a.ARRAY_BUFFER,new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0]),a.STATIC_DRAW);a.vertexAttribPointer(f,3,a.FLOAT,!1,0,0);
f=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,f);a.bufferData(a.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),a.STATIC_DRAW);a.vertexAttribPointer(d,2,a.FLOAT,!1,0,0);a.y=new Texture$$module$Input_0(a);a.u=new Texture$$module$Input_0(a);a.v=new Texture$$module$Input_0(a);a.y.bind(0,c,"YTexture");a.u.bind(1,c,"UTexture");a.v.bind(2,c,"VTexture");this.program=c;this.verticesBuffer=b;this.texCoordBuffer=f}else console.log("[ER] WebGL not supported.")};
WebGLPlayer$$module$Input_0.prototype.renderFrame=function(a,c,d,b,f){if(this.gl){var e=this.gl;e.viewport(0,0,e.canvas.width,e.canvas.height);e.clearColor(0,0,0,0);e.clear(e.COLOR_BUFFER_BIT);e.y.fill(c,d,a.subarray(0,b));e.u.fill(c>>1,d>>1,a.subarray(b,b+f));e.v.fill(c>>1,d>>1,a.subarray(b+f,a.length));e.drawArrays(e.TRIANGLE_STRIP,0,4);this.applyMask()}else console.log("[ER] Render frame failed due to WebGL not supported.")};
WebGLPlayer$$module$Input_0.prototype.addMaskArea=function(a,c,d,b){this.maskAreas.push({x:a,y:c,width:d,height:b})};WebGLPlayer$$module$Input_0.prototype.clearMaskAreas=function(){this.maskAreas=[]};WebGLPlayer$$module$Input_0.prototype.applyMask=function(){let a=this.gl;a.enable(a.SCISSOR_TEST);for(let c=0;c<this.maskAreas.length;c++){let d=this.maskAreas[c];a.scissor(d.x,d.y,d.width,d.height);a.clearColor(0,0,0,1);a.clear(a.COLOR_BUFFER_BIT)}a.disable(a.SCISSOR_TEST)};
WebGLPlayer$$module$Input_0.prototype.fullscreen=function(){let a=this.canvas;this.nodeFullscreen&&(a=this.nodeFullscreen);a.requestFullscreen?a.requestFullscreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.msRequestFullscreen?a.msRequestFullscreen():alert("Fullscreen doesn't work")};
WebGLPlayer$$module$Input_0.prototype.exitFullscreen=function(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen?document.msExitFullscreen():alert("Exit fullscreen doesn't work")};WebGLPlayer$$module$Input_0.prototype.clear=function(){let a=this.gl;a.clear(a.COLOR_BUFFER_BIT)};
WebGLPlayer$$module$Input_0.prototype.destroy=function(){let a=this.gl;a.y&&(a.y.destroy(),a.y=null);a.u&&(a.u.destroy(),a.u=null);a.v&&(a.v.destroy(),a.v=null);a.deleteBuffer(this.verticesBuffer);a.deleteBuffer(this.texCoordBuffer);a.deleteProgram(this.program);this.canvas=this.gl=null};
WebGLPlayer$$module$Input_0.prototype.parseAIdata=function(a){let c=this;this.clearMaskAreas();let d=this.canvas.width,b=this.canvas.height,f=this.reduceFraction(d,b).substring(1),e=null;console.log("canvas scale:",f);let g=a.w,h=a.h;g&&h&&(e=this.reduceFraction(g,h).substring(1),console.log("ai video scale:",e));a.d.forEach(l=>{let {xmin:m,ymin:n,xmax:k,ymax:p}=l.bbox;c.addMaskArea(d/g*m,b/h*n,d/g*(k-m),b/h*(p-n))})};
WebGLPlayer$$module$Input_0.prototype.reduceFraction=function(a,c){function d(f,e){return 0===e?f:d(e,f%e)}if(0===c)throw Error("Denominator cannot be zero.");a=Math.abs(a);c=Math.abs(c);const b=d(a,c);return a/b+":"+c/b};
WebGLPlayer$$module$Input_0.prototype.drawLine=function(a,c,d,b,f,e,g,h,l,m,n){if(!(c*d))return null;if(e==g){e=this.reduceFraction(h,l).substring(1);const [r,t]=e.split(":").map(Number);e=r;g=t}let {xmin:k,ymin:p,xmax:q,ymax:u}=a.bbox;a=h/(f*c/b*(e/g));d=l/d;k*=a;q*=a;m!=n&&(f=b-f/g*e,k-=f/b*k,q-=f/b*q);return[Math.floor(k),Math.floor(p*d),Math.floor(q-k),Math.floor((u-p)*d)]};var module$Input_0={};module$Input_0.Texture=Texture$$module$Input_0;module$Input_0.WebGLPlayer=WebGLPlayer$$module$Input_0;export { module$Input_0 as WebGLPlayerJS}