const{chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const root=process.env.LANI_BASE_URL||'http://127.0.0.1:3000';
(async()=>{
 const T=await import('../vendor/three/three.module.min.js');
 const{createDemonstrations,demonstrationState}=await import('../profile-demonstrations.js');
 const profile=new T.Group(),sash=new T.Group();sash.name='Sash_Chambers';profile.add(sash);
 const d=createDemonstrations(new T.Scene(),profile);
 assert.equal(demonstrationState(0).phase,'winter');assert.equal(demonstrationState(8).phase,'summer');assert.equal(demonstrationState(16).phase,'security');assert.equal(demonstrationState(24).phase,'clean');assert.equal(demonstrationState(28).phase,'winter');
 const physics=d.update(demonstrationState(22.2),22.2);
 assert.equal(physics.headClearance,0);assert.ok(physics.neckDiameter<physics.slotWidth);assert.ok(physics.headDiameter>physics.slotWidth);
 assert.equal(d.slider.position.y,2);assert.ok(sash.position.y>0&&sash.position.y<.0002);assert.deepEqual(sash.scale.toArray(),[1,1,1]);
 let heads=0;d.hardware.traverse(o=>{if(o.name==='Comfort_Mushroom_Cam')heads++});assert.equal(heads,1);
 const validation=JSON.parse(fs.readFileSync('models/profile-mesh-validation.json','utf8'));assert.equal(validation.all_closed,true);
 const browser=await chromium.launch({executablePath:process.env.LANI_BROWSER_PATH||'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[],bad=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)bad.push(r.url())});
  await page.goto(root+'/?demo=winter');await page.waitForSelector('.studio-3d-ready');
  assert.equal(await page.locator('.profile-studio button,.profile-studio img,#studioEffects').count(),0);
  assert.equal(await page.locator('#studioOutsideTemp').innerText(),'−10°C');assert.equal(await page.locator('#studioInsideTemp').innerText(),'+21°C');
  assert.match(await page.locator('#studioSceneNote').innerText(),/ngrohje ose ftohje aktive/);
  const c=page.locator('.studio-webgl'),box=await c.boundingBox();const sizes=await c.evaluate(c=>[c.width,c.height,c.clientWidth,c.clientHeight]);assert.equal(sizes[0],sizes[2]*2);assert.equal(sizes[1],sizes[3]*2);
  const initial=await c.screenshot();await page.waitForTimeout(300);assert.deepEqual(initial,await c.screenshot(),'Reduced motion remains still');
  const labelBefore=await page.locator('#studioOutsideLabel').getAttribute('style');
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+185,box.y+box.height/2,{steps:1});await page.mouse.up();
  assert.notDeepEqual(initial,await c.screenshot());assert.notEqual(labelBefore,await page.locator('#studioOutsideLabel').getAttribute('style'),'Side labels follow the rotated model');
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);const beforeZoom=await c.screenshot();await page.mouse.wheel(0,-130);await page.waitForTimeout(100);assert.notDeepEqual(beforeZoom,await c.screenshot());
  await page.locator('#profileViewport').focus();await page.keyboard.press('Home');
  const session=await context.newCDPSession(page),x=box.x+box.width/2,y=box.y+box.height/2;
  const beforePinch=await c.screenshot();await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-25,y},{x:x+25,y}]});await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-60,y},{x:x+60,y}]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.notDeepEqual(beforePinch,await c.screenshot());assert.equal(await page.evaluate(()=>visualViewport.scale),1);
  await page.goto(root+'/?demo=summer');await page.waitForSelector('.studio-3d-ready');assert.equal(await page.locator('#studioOutsideTemp').innerText(),'+35°C');assert.equal(await page.locator('#studioInsideTemp').innerText(),'+24°C');assert.match(await page.locator('#studioMessage').innerText(),/kontroll diellor/);
  await page.goto(root+'/?demo=security');await page.waitForSelector('.studio-3d-ready');assert.equal(await page.locator('#studioOutsideTemp').isVisible(),false);assert.match(await page.locator('#studioSceneNote').innerText(),/mekanizmi, përforcimi, xhami dhe montimi/);assert.doesNotMatch(await page.locator('.profile-studio').innerText(),/RC\s*\d|pathyeshme/);
  await page.locator('[data-lang="en"]').click();assert.match(await page.locator('#studioMessage').innerText(),/Multipoint locking/);
  for(const width of[320,390,768,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)}
  assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);await context.close();
  console.log('PASS: single Comfort cam, physical capture and rigid movement, 8-second scenes, exact temperatures/qualifiers, no buttons/RC claim, anchored labels, reduced motion, drag/pinch/wheel/keyboard, native DPR and responsive layout.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
