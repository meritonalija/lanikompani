const viewport=document.getElementById('profileViewport');
const status=document.getElementById('studioStatus');
const byId=id=>document.getElementById(id);
const thermalNote=['Temperatura ilustruese me ngrohje ose ftohje aktive. Performanca varet nga konfigurimi dhe montimi.','Illustrative temperatures with active heating or cooling. Performance depends on configuration and installation.'];
const scenes={
 winter:{title:['DIMRI · IZOLIMI TERMIK','WINTER · THERMAL INSULATION'],message:['Më pak humbje nxehtësie. Më shumë komfort.','Less heat loss. More comfort.'],outside:'−10°C',inside:'+21°C',note:thermalNote,number:'01 / 03'},
 summer:{title:['VERA · KONTROLLI I NXEHTËSISË','SUMMER · SOLAR CONTROL'],message:['Xham me kontroll diellor për më shumë komfort në verë.','Solar-control glazing for more summer comfort.'],outside:'+35°C',inside:'+24°C',note:thermalNote,number:'02 / 03'},
 security:{title:['NJË PIKË DEMONSTRUESE KYÇJEJE','ONE DEMONSTRATION LOCKING POINT'],message:['Kyçje në disa pika. Rezistencë ndaj hapjes me forcë.','Multipoint locking. Resistance to forced opening.'],note:['Siguria varet nga mekanizmi, përforcimi, xhami dhe montimi.','Security depends on the mechanism, reinforcement, glazing and installation.'],number:'03 / 03'},
 clean:{title:['MOSTRA E PROFILIT','PROFILE SAMPLE'],message:['','',''],note:['',''],number:''},
};
let viewer=null,failed=false,lastFrame=null,lastPhase='';
const language=()=>document.documentElement.lang==='en'?1:0;
function sceneLabels(phase){const en=language(),s=scenes[phase];
 viewport.dataset.demoPhase=phase;
 byId('studioSceneTitle').textContent=s.title[en];byId('studioSceneNumber').textContent=s.number;
 byId('studioMessage').textContent=s.message[en];byId('studioSceneNote').textContent=s.note[en];
 byId('studioOutsideName').textContent=en?'OUTSIDE':'JASHTË';byId('studioInsideName').textContent=en?'INSIDE':'BRENDA';
 byId('studioOutsideTemp').textContent=s.outside||'';byId('studioInsideTemp').textContent=s.inside||'';
 byId('studioOutsideTemp').hidden=!s.outside;byId('studioInsideTemp').hidden=!s.inside;
}
function frame(state){
 lastFrame=state;if(state.phase!==lastPhase){lastPhase=state.phase;sceneLabels(state.phase);}
 viewport.closest('.profile-studio').style.setProperty('--demo-opacity',state.phase==='clean'?0:state.weight);
 const svg=byId('studioLeaders');svg.setAttribute('viewBox',`0 0 ${state.width} ${state.height}`);
 ['Outside','Inside'].forEach((name,index)=>{const p=state.labels[index],label=byId('studio'+name+'Label'),line=byId('studio'+name+'Leader');label.style.left=p.x+'px';label.style.top=p.y+'px';line.setAttribute('x1',p.anchor.x);line.setAttribute('y1',p.anchor.y);line.setAttribute('x2',p.x);line.setAttribute('y2',p.y);});
}
function labels(){
 const en=language();viewport.setAttribute('aria-label',en?'Interactive 3D profile with winter, summer and locking demonstrations. Drag to rotate; pinch or scroll to zoom. Camera movement pauses while you interact.':'Profil 3D me demonstrime të dimrit, verës dhe kyçjes. Tërhiq për rrotullim; dy gishta ose rrota e mausit për afrim. Kamera ndalet gjatë ndërveprimit.');
 byId('studioHint').textContent=en?'Drag to rotate · pinch to zoom':'Tërhiq për rrotullim · dy gishta për afrim';
 if(!viewer)status.textContent=failed?(en?'The 3D view is unavailable in this browser.':'Pamja 3D nuk është e disponueshme në këtë shfletues.'):(en?'Loading the 3D sample…':'Duke ngarkuar mostrën 3D…');
 sceneLabels(lastFrame?.phase||'winter');
}
document.addEventListener('languagechange',labels);labels();
try{
 const{createProfileStudio}=await import('./profile-3d.js');viewer=await createProfileStudio(viewport,{onFrame:frame});status.hidden=true;
 viewport.addEventListener('studio3dfailed',()=>{failed=true;viewer=null;status.hidden=false;labels();});
}catch{failed=true;viewport.classList.remove('studio-3d-ready');status.hidden=false;labels();}
