import * as T from './vendor/three/three.module.min.js';
import {GLTFLoader} from './vendor/three/GLTFLoader.js';
import {createDemonstrations,demonstrationState} from './profile-demonstrations.js';

// Existing Blender asset with three restrained, model-space demonstrations.
export async function createProfileStudio(viewport,{onFrame=()=>{}}={}){
  const host=viewport.querySelector('.studio-object');
  const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.max(1,devicePixelRatio));
  const gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');
  const software=debug&&/swiftshader|llvmpipe|software/i.test(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL));
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  renderer.localClippingEnabled=true;renderer.shadowMap.enabled=true;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  const canvas=renderer.domElement;canvas.className='studio-webgl';canvas.setAttribute('aria-hidden','true');
  const scene=new T.Scene();scene.background=new T.Color('#e6e9e9');scene.fog=new T.Fog('#e6e9e9',650,1200);
  const target=new T.Vector3(0,80,0),camera=new T.PerspectiveCamera(30,1,1,2000);
  let yaw=-.65,pitch=.24,distance=500,disposed=false;
  const studio=new T.Scene();studio.background=new T.Color('#c5cbcc');
  function panel(w,h,x,y,z,color,strength){const mat=new T.MeshBasicMaterial({color,side:T.DoubleSide});mat.color.multiplyScalar(strength);const mesh=new T.Mesh(new T.PlaneGeometry(w,h),mat);mesh.position.set(x,y,z);mesh.lookAt(0,90,0);studio.add(mesh);}
  panel(200,400,-230,200,180,'#ffffff',3);
  panel(160,350,220,180,-130,'#ffffff',2);
  panel(350,110,0,340,70,'#ffffff',3);
  panel(90,360,100,150,250,'#4e5659',.8);
  const generator=new T.PMREMGenerator(renderer),environment=generator.fromScene(studio,.04);scene.environment=environment.texture;scene.environmentIntensity=.45;generator.dispose();studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
  scene.add(new T.HemisphereLight('#f2f4f2','#aeb5b5',.65));
  const key=new T.DirectionalLight('#ffffff',2.1);key.position.set(-180,320,210);key.target.position.set(0,70,0);scene.add(key,key.target);key.castShadow=true;
  key.shadow.mapSize.set(software?512:2048,software?512:2048);key.shadow.camera.left=key.shadow.camera.bottom=-220;key.shadow.camera.right=key.shadow.camera.top=220;key.shadow.camera.near=1;key.shadow.camera.far=800;key.shadow.normalBias=.1;key.shadow.bias=-.00008;key.shadow.radius=4;
  const fill=new T.DirectionalLight('#f2f6f7',.75);fill.position.set(160,180,-180);scene.add(fill);
  const model=await new GLTFLoader().loadAsync('./models/schuco-profile-review.glb');
  model.scene.scale.setScalar(1000);
  model.scene.traverse(obj=>{
    if(!obj.isMesh)return;
    const materials=Array.isArray(obj.material)?obj.material:[obj.material];
    const isGlass=materials.some(m=>m.name==='Glass_Clear');
    obj.castShadow=!isGlass;obj.receiveShadow=!isGlass;
    materials.forEach(m=>{
      if(m.name==='Glass_Clear'){
        m.transmission=software?0:1;m.opacity=software?.15:.32;m.transparent=true;m.depthWrite=false;m.ior=1.52;m.roughness=.035;m.metalness=0;m.thickness=4;m.attenuationDistance=Infinity;m.attenuationColor=new T.Color('#ffffff');m.envMapIntensity=1.1;m.needsUpdate=true;
      }
    });
  });
    const revealPlanes=[new T.Plane(new T.Vector3(1,0,0),-30),new T.Plane(new T.Vector3(-1,0,0),8),new T.Plane(new T.Vector3(0,1,0),-66),new T.Plane(new T.Vector3(0,-1,0),42),new T.Plane(new T.Vector3(0,0,1),-74),new T.Plane(new T.Vector3(0,0,-1),38)];
  const revealMaterials=new Set();model.scene.traverse(o=>{if(!o.isMesh)return;const list=Array.isArray(o.material)?o.material:[o.material];list.forEach(m=>{if(['PVC_Cut','PVC_Interior','Anthracite_Exterior'].includes(m.name)){m.clipIntersection=true;revealMaterials.add(m);}});});
  scene.add(model.scene);
  const floor=new T.Mesh(new T.PlaneGeometry(1600,1600),new T.MeshStandardMaterial({color:'#e1e5e5',roughness:.85}));floor.rotation.x=-Math.PI/2;floor.position.y=-.1;floor.receiveShadow=true;scene.add(floor);
  const demonstrations=createDemonstrations(scene,model.scene);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const reviewPhase=new URLSearchParams(location.search).get('demo');
  const initialSeconds=({winter:4,summer:12,security:21.8,clean:26})[reviewPhase]??0;
  let elapsed=initialSeconds,lastTick=0,lastPaint=0,frame=0,visible=false,manualUntil=0,lastShadow=0,lastState=demonstrationState(initialSeconds);
  function takeControl(){manualUntil=performance.now()+8000;viewport.classList.add('studio-controlled');}
  function projectedLabels(){
    const {width,height}=host.getBoundingClientRect();
    const a=new T.Vector3(-51,67,72.5).project(camera),b=new T.Vector3(51,67,72.5).project(camera);
    const points=[a,b].map(v=>({x:(v.x+1)*width/2,y:(1-v.y)*height/2}));
    const order=points[0].x<points[1].x?-1:1;
    const labels=points.map((p,i)=>({anchor:p,x:Math.max(37,Math.min(width-37,p.x+(i===0?order:-order)*50)),y:Math.max(27,Math.min(height-27,p.y-33))}));
    if(Math.abs(labels[0].x-labels[1].x)<85){labels[0].y=Math.max(25,labels[0].y-22);labels[1].y=Math.min(height-25,labels[1].y+22);}
    return{width,height,labels};
  }
  function automaticCamera(state,delta){
    let pose={x:0,y:80,z:0,yaw:-.65,pitch:.24,distance:500};
    if(state.phase==='winter')pose={x:0,y:74,z:12,yaw:-.5,pitch:.23,distance:410};
    if(state.phase==='summer')pose={x:0,y:83,z:0,yaw:-.7,pitch:.25,distance:465};
    if(state.phase==='security'){
      const blend=Math.min(1,Math.max(0,(state.local-.7)/1.9));
      const forceView=Math.max(0,Math.min(1,(state.local-3.2)/1.1));
      pose={x:(19-15*forceView)*blend,y:65-(13-5*forceView)*blend,z:35+(23+4*forceView)*blend,yaw:-.1+(.55-.12*forceView)*blend,pitch:.18-.23*blend,distance:325-(205-40*forceView)*blend};
    }
    const speed=1-Math.exp(-delta*1.6);
    target.lerp(new T.Vector3(pose.x,pose.y,pose.z),speed);
    const angle=Math.atan2(Math.sin(pose.yaw-yaw),Math.cos(pose.yaw-yaw));yaw+=angle*speed;pitch+=(pose.pitch-pitch)*speed;distance+=(pose.distance-distance)*speed;
  }
  function render(){if(disposed)return;
    const state=reduced.matches?demonstrationState(initialSeconds||4):demonstrationState(elapsed);lastState=state;
    demonstrations.update(state,reduced.matches?(initialSeconds||4):elapsed);
    const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
    const reveal=state.phase==='security'?smooth((state.local-1.2)/.9)*(1-smooth((state.local-7.1)/.7)):0;
    const radii=[11*reveal,12*reveal,18*reveal],centre=[19,54,56];
    for(let i=0;i<3;i++){revealPlanes[i*2].constant=-(centre[i]+radii[i]);revealPlanes[i*2+1].constant=centre[i]-radii[i];}
    revealMaterials.forEach(m=>{m.clippingPlanes=revealPlanes;});
    camera.position.set(target.x+distance*Math.sin(yaw)*Math.cos(pitch),target.y+distance*Math.sin(pitch),target.z+distance*Math.cos(yaw)*Math.cos(pitch));camera.lookAt(target);camera.updateMatrixWorld();renderer.render(scene,camera);onFrame({...state,...projectedLabels()});}
  function tick(time){
    frame=0;if(disposed||!visible||document.hidden||reduced.matches)return;
    const delta=lastTick?Math.max(0,(time-lastTick)/1000):0;lastTick=time;elapsed+=delta;
    if(elapsed-lastShadow>.7&&lastState.phase==='security'){renderer.shadowMap.needsUpdate=true;lastShadow=elapsed;}
    const state=demonstrationState(elapsed);
    if(!pointers.size&&time>manualUntil&&!viewport.matches(':focus-visible'))automaticCamera(state,delta);
    if(time-lastPaint>=32){render();lastPaint=time;}
    frame=requestAnimationFrame(tick);
  }
  function sync(){cancelAnimationFrame(frame);frame=0;lastTick=0;if(!disposed&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);else render();}
  function resize(){const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();render();}
  const pointers=new Map();let previousPinch=0,dragged=false;
  function begin(event){if(event.pointerType==='mouse'&&event.button!==0)return;takeControl();pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});canvas.setPointerCapture(event.pointerId);dragged=false;viewport.classList.add('studio-controlled');if(pointers.size===2){const p=[...pointers.values()];previousPinch=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}}
  function move(event){const old=pointers.get(event.pointerId);if(!old)return;const dx=event.clientX-old.x,dy=event.clientY-old.y;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});if(pointers.size===1){yaw-=dx*.009;pitch=Math.max(-1.48,Math.min(1.48,pitch+dy*.007));}else{const p=[...pointers.values()],gap=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);if(previousPinch&&gap)distance=Math.max(210,Math.min(850,distance*previousPinch/gap));previousPinch=gap;}dragged=true;render();}
  function end(event){manualUntil=performance.now()+8000;pointers.delete(event.pointerId);if(pointers.size<2)previousPinch=0;}
  function wheel(event){takeControl();event.preventDefault();viewport.classList.add('studio-controlled');distance=Math.max(210,Math.min(850,distance*Math.exp(event.deltaY*.001)));render();}
  function reset(){takeControl();target.set(0,80,0);yaw=-.65;pitch=.24;distance=500;render();}
  function keydown(event){if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0','Home'].includes(event.key))return;takeControl();event.preventDefault();viewport.classList.add('studio-controlled');if(event.key==='ArrowLeft')yaw-=.12;if(event.key==='ArrowRight')yaw+=.12;if(event.key==='ArrowUp')pitch=Math.min(1.48,pitch+.08);if(event.key==='ArrowDown')pitch=Math.max(-1.48,pitch-.08);if(['+','='].includes(event.key))distance=Math.max(210,distance-20);if(event.key==='-')distance=Math.min(850,distance+20);if(['0','Home'].includes(event.key))reset();else render();}
  canvas.addEventListener('pointerdown',begin);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);canvas.addEventListener('wheel',wheel,{passive:false});canvas.addEventListener('dblclick',()=>{if(!dragged)reset();});viewport.addEventListener('keydown',keydown);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();disposed=true;cancelAnimationFrame(frame);viewport.classList.remove('studio-3d-ready');canvas.remove();viewport.dispatchEvent(new CustomEvent('studio3dfailed'));});
  host.append(canvas);viewport.classList.add('studio-3d-ready');new ResizeObserver(resize).observe(host);if(reduced.matches&&reviewPhase)automaticCamera(demonstrationState(initialSeconds),20);resize();
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(viewport);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  return{render,getView:()=>({yaw,pitch,distance,manual:performance.now()<manualUntil}),getState:()=>lastState};
}
