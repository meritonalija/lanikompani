import * as T from './vendor/three/three.module.min.js';
const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
export function demonstrationState(seconds){
 const time=((seconds%28)+28)%28,index=Math.min(3,Math.floor(time/8)),local=index===3?time-24:time-index*8;
 const fade= index===3?0:ease(local/1.15)*(1-ease((local-7)/1));
 const phases=['winter','summer','security','clean'];
 return{phase:phases[index],index,local,weight:fade,time};
}
// All dimensions are illustrative millimetres. The comfort cam follows the user's supplied photo.
export function createDemonstrations(scene,profile){
 const root=new T.Group();root.name='Product_Demonstrations';scene.add(root);
 const winter=new T.Group(),summer=new T.Group(),hardware=new T.Group();root.add(winter,summer,hardware);
 const coldLight=new T.PointLight('#a3cee4',0,420,2);coldLight.position.set(-145,125,30);scene.add(coldLight);
 const warmLight=new T.PointLight('#f0c695',0,420,2);warmLight.position.set(145,105,30);scene.add(warmLight);
 function line(points,color,opacity){const g=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p)));const m=new T.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false});const mesh=new T.Line(g,m);mesh.userData.baseOpacity=opacity;return mesh;}
 function box(w,h,d,x,y,z,mat,parent){const obj=new T.Mesh(new T.BoxGeometry(w,h,d),mat);obj.position.set(x,y,z);parent.add(obj);return obj;}
 const thermalPaths=[],dots=[];
 const paths=[[[35,128,-38],[18,128,-38],[-2,128,-38],[-20,128,-38]],[[35,139,3],[18,139,3],[-2,139,3],[-20,139,3]],[[35,116,35],[18,116,35],[-2,116,35],[-20,116,35]],[[29,26,73],[17,26,73],[17,41,73],[-17,43,73],[-30,31,73],[-45,31,73]]];
 paths.forEach(points=>{const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const trace=line(curve.getPoints(44).map(v=>v.toArray()),'#d6ae81',.1);winter.add(trace);thermalPaths.push(curve);const dot=new T.Mesh(new T.SphereGeometry(.65,8,6),new T.MeshBasicMaterial({color:'#d9b381',transparent:true,opacity:.4,depthWrite:false}));winter.add(dot);dots.push(dot);});
 const seals=[];[[-11,59,73],[-15,44,73],[-35,66,73],[35,42,73]].forEach(p=>{const obj=new T.Mesh(new T.RingGeometry(1.1,1.65,24),new T.MeshBasicMaterial({color:'#dfa56c',transparent:true,opacity:.35,side:T.DoubleSide,depthWrite:false}));obj.position.set(...p);winter.add(obj);seals.push(obj);});
 const air=[];for(let i=0;i<6;i++){const obj=line([[-12,0,0],[-6,1,0],[0,0,0]],'#8cbed4',.2);winter.add(obj);air.push(obj);}
 const incoming=[],reflected=[],transmitted=[];
 for(let i=0;i<7;i++){const ray=line([[-14,2,0],[0,0,0]],'#d1af79',.27);summer.add(ray);incoming.push(ray);}
 for(let i=0;i<4;i++){const ray=line([[0,0,0],[-12,3,0]],'#d1af79',.2);summer.add(ray);reflected.push(ray);}
 for(let i=0;i<3;i++){const ray=line([[-6,1,0],[0,0,0]],'#d1af79',.1);summer.add(ray);transmitted.push(ray);}
 const chrome=new T.MeshStandardMaterial({color:'#b8c1c7',metalness:1,roughness:.2});
 const keeperMetal=new T.MeshStandardMaterial({color:'#a1aab1',metalness:.9,roughness:.33});
 const darkMetal=new T.MeshStandardMaterial({color:'#515d65',metalness:.8,roughness:.4});
 hardware.name='Comfort_Mushroom_Assembly';
 const fixed=new T.Group(),moving=new T.Group(),slider=new T.Group();hardware.add(fixed,moving);moving.add(slider);
 // Local X is the pin axis. Local Y is the travel along the fitting strip.
 // Map the assembly onto the actual frame/sash rebate near the front cut.
 hardware.matrixAutoUpdate=false;hardware.matrix.set(0,0,1,19,-16/23,0,0,52.73913,0,-1,0,53,0,0,0,1);
 function cylinder(radius,length,x,y,z,mat,parent,segments=32){const obj=new T.Mesh(new T.CylinderGeometry(radius,radius,length,segments),mat);obj.rotation.z=-Math.PI/2;obj.position.set(x,y,z);parent.add(obj);return obj;}
 function yzPlate(points,x,thickness,mat,parent){const shape=new T.Shape();points.forEach(([y,z],i)=>i?shape.lineTo(y,z):shape.moveTo(y,z));shape.closePath();const geo=new T.ExtrudeGeometry(shape,{depth:thickness-.24,bevelEnabled:true,bevelSize:.12,bevelThickness:.12,bevelSegments:3});const obj=new T.Mesh(geo,mat);obj.rotation.y=Math.PI/2;obj.rotation.x=Math.PI/2;
  // Build a direct coordinate transform: shape XY -> local YZ, extrusion -> local X.
  const p=geo.attributes.position;for(let i=0;i<p.count;i++){const sy=p.getX(i),sz=p.getY(i),sx=p.getZ(i);p.setXYZ(i,x+.12+sx,sy,sz);}obj.rotation.set(0,0,0);geo.computeVertexNormals();parent.add(obj);return obj;}
 box(2,39,22,13,0,0,keeperMetal,fixed);
 // Keeper webs and undercut flanges: 8 mm opening holds an 11.2 mm mushroom head.
 box(9,22,2,7.5,4,-10,keeperMetal,fixed);box(9,22,2,7.5,4,10,keeperMetal,fixed);
 yzPlate([[-7,-11],[-7,-7],[-3,-4],[15,-4],[15,-11]],1,2,keeperMetal,fixed);
 yzPlate([[-7,11],[-7,7],[-3,4],[15,4],[15,11]],1,2,keeperMetal,fixed);
 for(const y of [-15,15]){cylinder(2.2,1,11.7,y,-6.5,chrome,fixed);cylinder(.9,10,17,y,-6.5,darkMetal,fixed);const slot=line([[11.1,y-1,-6.5],[11.1,y+1,-6.5]],'#5b666c',.7);fixed.add(slot);}
 // Guide rails remain mounted to the sash; the short drive strip moves longitudinally.
 box(1.8,38,3,-10.4,0,-6.5,keeperMetal,moving);box(1.8,38,3,-10.4,0,6.5,keeperMetal,moving);
 for(const y of [-17,17]){box(1.8,4,14,-10.4,y,0,keeperMetal,moving);cylinder(1.7,1,-11.7,y,0,chrome,moving);cylinder(.8,6,-14,y,0,darkMetal,moving);}
 box(1.2,27,11,-12,0,0,chrome,slider);
 cylinder(2.1,5,-10.4,0,0,chrome,slider);
 cylinder(4.1,1.8,-7.2,0,0,chrome,slider,6);
 cylinder(1.8,10,-2,0,0,chrome,slider);
 // Visible height-adjustment spring and three supporting cage columns from the photo.
 const coil=[];for(let i=0;i<=96;i++){const t=i/96,a=t*Math.PI*7;coil.push(new T.Vector3(-6.2+t*4.3,Math.cos(a)*2.7,Math.sin(a)*2.7));}
 slider.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(coil),96,.27,6,false),chrome));
 for(let i=0;i<3;i++){const a=i*Math.PI*2/3;cylinder(.65,7.5,-.55,Math.cos(a)*2.9,Math.sin(a)*2.9,chrome,slider,12);}
 const capProfile=[[0,3.2],[3.1,3.2],[5,3.2],[5.6,3.9],[5.6,4.7],[5.2,5.5],[4.2,6.1],[1.5,6.35],[0,6.35]].map(p=>new T.Vector2(...p));
 const cap=new T.Mesh(new T.LatheGeometry(capProfile,48),chrome);cap.name='Comfort_Mushroom_Cam';cap.rotation.z=-Math.PI/2;slider.add(cap);
 for(const radius of[1.7,3.7]){const ring=new T.Mesh(new T.TorusGeometry(radius,.07,5,48),darkMetal);ring.rotation.y=Math.PI/2;ring.position.x=6.37;slider.add(ring);}
 // A rigid steel lever enters the exterior assembly gap; it never deforms the PVC.
 const lever=new T.Group();scene.add(lever);lever.position.set(-35,68,68);
 const handlePath=new T.CatmullRomCurve3([new T.Vector3(-66,20,0),new T.Vector3(-6,2,0),new T.Vector3(0,-1,0),new T.Vector3(7,0,0)]);
 lever.add(new T.Mesh(new T.TubeGeometry(handlePath,28,1.5,12,false),darkMetal));box(8,.7,4.5,7,0,0,chrome,lever);
 hardware.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=false;}});lever.traverse(o=>{if(o.isMesh)o.castShadow=true;});
 const sashNodes=[];profile.children.forEach(o=>{if(/^(Sash_|EPDM_Glass_|Glass_|Warm_Edge_|IGU_|Spacer_desiccant)/.test(o.name))sashNodes.push({object:o,y:o.position.y});});
 function opacity(group,weight){group.visible=weight>.002;group.traverse(o=>{if(!o.material)return;const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{if(m.userData.originalOpacity===undefined)m.userData.originalOpacity=m.opacity;const base=o.userData.baseOpacity??m.userData.originalOpacity;m.opacity=base*weight;m.transparent=true;});});}
 function update(state,seconds){
  const w=state.phase==='winter'?state.weight:0,s=state.phase==='summer'?state.weight:0,k=state.phase==='security'?state.weight:0,t=seconds;
  opacity(winter,w);opacity(summer,s);
  const cool=new T.Color('#a3cee4'),sun=new T.Color('#f2c993');coldLight.color.copy(cool).lerp(sun,s);coldLight.intensity=4500*w+3000*s;warmLight.intensity=4500*w+1300*s;
  dots.forEach((dot,i)=>{const p=(t*.15+i*.23)%1;dot.position.copy(thermalPaths[i].getPoint(p));dot.material.opacity=w*Math.sin(Math.PI*p)*(.35*(1-p)+.08);});
  seals.forEach((o,i)=>{o.material.opacity=w*(.22+.08*Math.sin(t*2+i));});
  air.forEach((o,i)=>{const p=(t*.19+i*.16)%1;o.position.set(-80+p*43,54+(i%3)*8,73);});
  incoming.forEach((o,i)=>{const p=(t*.22+i/7)%1;o.position.set(-115+p*100,120+(i%4)*8,-48+i*15);});
  reflected.forEach((o,i)=>{const p=(t*.2+i*.25)%1;o.position.set(-13-p*55,125+i*7+p*10,-35+i*23);});
  transmitted.forEach((o,i)=>{const p=(t*.17+i*.33)%1;o.position.set(-8+p*55,124+i*9-p*9,-26+i*25);});
  // One point stays on the existing specimen, in its engaged resting position.
  const lock=state.phase==='security'?(state.local<1?1-ease(state.local):ease((state.local-1.2)/1.8)):1;
  slider.position.y=-10+12*lock;
  const pressure=state.phase==='security'?ease((state.local-4.3)/1.6)*(1-ease((state.local-7.1)/.6)):0;
  moving.position.x=-.2*pressure;
  sashNodes.forEach(n=>n.object.position.y=n.y+pressure*(16/23)*.2/1000);
  hardware.visible=true;
  const entry=state.phase==='security'?ease((state.local-3.1)/1.1):0;
  lever.visible=state.phase==='security'&&entry>.01;
  lever.position.set(-35-12*(1-entry),68+4*(1-entry),68);lever.rotation.z=pressure*.045;
  return{headClearance:.2*(1-pressure),neckDiameter:7.1,headDiameter:11.2,slotWidth:8};
 }
 return{update,hardware,slider};
}
