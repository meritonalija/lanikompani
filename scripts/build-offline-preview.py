"""Build a self-contained homepage preview; no web hosting or deployment is involved."""
from pathlib import Path
import base64,mimetypes,re,json,sys
root=Path(__file__).resolve().parents[1]
def uri(data,mime):return 'data:'+mime+';base64,'+base64.b64encode(data).decode()
assets={}
for folder in ['images','fonts']:
 for p in (root/folder).rglob('*'):
  if p.is_file() and p.suffix.lower() in ['.jpg','.jpeg','.png','.webp','.svg','.ttf']:
   if p.name=='schuco-anthracite-studio.png':continue
   assets[str(p.relative_to(root))]=uri(p.read_bytes(),mimetypes.guess_type(p.name)[0] or 'application/octet-stream')
s=(root/'index.html').read_text()
s=re.sub(r'\s*<script[^>]*src="[^"]+"[^>]*></script>','',s)
def css(m):
 data=(root/m[1]).read_text()
 data=re.sub(r'url\([\"\x27]?([^\)\"\x27]+)[\"\x27]?\)',lambda match:'url("'+assets.get(match[1],match[1])+'")',data)
 return '<style>'+data+'</style>'
s=re.sub(r'<link rel="stylesheet" href="([^"]+)" />',css,s)
for path,data in assets.items():
 s=s.replace('src="'+path+'"','src="'+data+'"').replace('href="'+path+'"','href="'+data+'"').replace('data-gallery="'+path+'"','data-gallery="'+data+'"')
def module(source):return uri(source.encode(),'text/javascript')
three=(root/'vendor/three/three.module.min.js').read_text()
utils=(root/'vendor/three/BufferGeometryUtils.js').read_text().replace("'./three.module.min.js'","'three'")
loader=(root/'vendor/three/GLTFLoader.js').read_text().replace("'./three.module.min.js'","'three'").replace("'./BufferGeometryUtils.js'","'three-utils'")
demo=(root/'profile-demonstrations.js').read_text().replace("'./vendor/three/three.module.min.js'","'three'")
imports={'three':module(three),'three-utils':module(utils),'three-loader':module(loader),'profile-demonstrations':module(demo)}
viewer=(root/'profile-3d.js').read_text().replace("'./vendor/three/three.module.min.js'","'three'").replace("'./vendor/three/GLTFLoader.js'","'three-loader'").replace("'./models/schuco-profile-review.glb'",'globalThis.__laniProfileAsset').replace("'./profile-demonstrations.js'","'profile-demonstrations'")
model=uri((root/'models/schuco-profile-review.glb').read_bytes(),'model/gltf-binary')
blocks=['<script type="importmap">'+json.dumps({'imports':imports},separators=(',',':'))+'</script>',
 '<script>window.__previewAssets='+json.dumps(assets,separators=(',',':'))+';window.__laniProfileAsset='+json.dumps(model)+';</script>']
for name in ['translations.js','profiles-data.js','profile-view.js','catalog.js','script.js','profile-studio.js']:
 js=(root/name).read_text()
 if name=='profile-view.js':js=js.replace('${assetPrefix}images/${escape(p.image)}','${window.__previewAssets["images/"+p.image]}')
 if name=='profile-studio.js':js=js.replace("'./profile-3d.js'",json.dumps(module(viewer)))
 blocks.append('<script'+(' type="module"' if name=='profile-studio.js' else '')+'>'+js.replace('</script','<\\/script')+'</script>')
s=s.replace('</body>','\n'.join(blocks)+'\n</body>')
output=Path(sys.argv[1] if len(sys.argv)>1 else '/tmp/lani-profile-base-preview.html');output.write_text(s)
print(str(output),len(s),'bytes')
