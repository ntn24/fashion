// Run: node test.cjs. Tests real app functions with minimal canvas mocks.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/app.js','utf8');
function extract(start,end){return src.slice(src.indexOf(start),src.indexOf(end,src.indexOf(start)))}
(async()=>{
 const sandbox={Uint8Array,Int32Array,Math,W:900,H:1200,images:new Map()};vm.createContext(sandbox);
 vm.runInContext(extract('function defaults','async function wear')+extract('function hit','function anchor'),sandbox);
 assert.equal(sandbox.defaults('bottom').y,.72);assert.equal(sandbox.defaults('set').width,.56);
 sandbox.images.set('x',{width:200,height:400});const l={item:'x',x:.5,y:.5,width:.4,stretch:1,angle:0};
 assert.equal(sandbox.hit({x:450,y:600},l),true);assert.equal(sandbox.hit({x:850,y:600},l),false);
 l.angle=Math.PI/2;assert.equal(sandbox.hit({x:750,y:600},l),true);assert.equal(sandbox.hit({x:450,y:950},l),false);
 // White perimeter removed; isolated white center protected by dark ring.
 const w=5,h=5,pixels=new Uint8ClampedArray(w*h*4);for(let i=0;i<25;i++){const x=i%5,y=Math.floor(i/5);const v=(x===0||x===4||y===0||y===4||i===12)?255:30;pixels.set([v,v,v,255],i*4)}
 sandbox.loadImage=async()=>({width:w,height:h});let result;
 sandbox.document={createElement:()=>({getContext:()=>({drawImage(){},getImageData(){return{data:pixels}},putImageData(p){result=p.data}}),toDataURL:()=> 'output'})};
 vm.runInContext(extract('async function removeWhite','$(\'removeWhite\').onchange'),sandbox);
 assert.equal(await sandbox.removeWhite('input'),'output');assert.equal(result[3],0);assert.equal(result[12*4+3],255);assert.equal(result[6*4+3],255);
 const html=fs.readFileSync(__dirname+'/index.html','utf8');const ids=[...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,'duplicate IDs');
 for(const m of src.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.includes(m[1]),'missing UI id: '+m[1]);
 for(const file of ['style.css','app.js','sw.js','icon.svg','icon-192.png','icon-512.png','manifest.webmanifest'])assert.ok(fs.existsSync(__dirname+'/'+file));
 const manifest=JSON.parse(fs.readFileSync(__dirname+'/manifest.webmanifest'));assert.equal(manifest.start_url,'./');
 console.log('PASS: placement defaults, rotated hit detection, connected white-background removal, UI references, assets, relative PWA paths.');
})().catch(e=>{console.error(e);process.exit(1)});
