import json,shapely
from shapely.geometry import Polygon,box,Point
from shapely.ops import unary_union
from pathlib import Path
root=Path(__file__).resolve().parents[1]
ps=json.loads((root/'profile-contours.js').read_text().split(' = ',1)[1].rstrip(';\n'))
objects=[];validation=[];solids=[];cavities=[]
def poly_parts(g):
 return [g] if g.geom_type=='Polygon' else [p for p in g.geoms if p.geom_type=='Polygon']
def extrude(name,poly,depth=145,front=72.5,materials=None):
 materials=materials or ['PVC_Cut','Anthracite_Exterior','PVC_Interior']
 for n,p in enumerate(poly_parts(poly)):
  if p.area<.1:continue
  p=shapely.orient_polygons(p)
  tris=list(shapely.constrained_delaunay_triangles(p).geoms)
  assert abs(sum(t.area for t in tris)-p.area)<1e-6,(name,'cap triangulation')
  verts=[];faces=[];mats=[];lookup={}
  def vert(x,y,z):
   key=(round(x,7),round(y,7),round(z,7))
   if key not in lookup:lookup[key]=len(verts);verts.append(key)
   return lookup[key]
  for t in tris:
   points=list(t.exterior.coords)[:3]
   faces.append([vert(x,y,front) for x,y in points]);mats.append(0)
   faces.append([vert(x,y,front-depth) for x,y in reversed(points)]);mats.append(0)
  for i,ring in enumerate([p.exterior]+list(p.interiors)):
   pts=list(ring.coords)
   for a,b in zip(pts,pts[1:]):
    faces.append([vert(*a,front-depth),vert(*b,front-depth),vert(*b,front),vert(*a,front)]);mats.append(1 if i==0 else 2)
  edges={}
  for f in faces:
   for a,b in zip(f,f[1:]+f[:1]):
    e=tuple(sorted([a,b]));edges[e]=edges.get(e,0)+1
  assert all(v==2 for v in edges.values()),(name,'nonmanifold edges')
  objects.append(dict(name=name if n==0 else name+'_'+str(n),vertices=verts,faces=faces,material_indices=mats,materials=materials))
  validation.append(dict(name=name,area_mm2=p.area,closed=True,cap_area_error=abs(sum(t.area for t in tris)-p.area),holes=len(p.interiors)))
# Normalise the source contour studies to the dimensioned drawing supplied by the user.
# Frame: 82 x 70 mm. Sash: 82 mm, offset 20 mm; combined visible height 120 mm.
from shapely import affinity
sources=[]
for p in ps:
 outer=Polygon(p['outline']).buffer(0).simplify(.12,preserve_topology=True)
 holes=[]
 for h in p['holes']:
  hp=Polygon(h).buffer(0).buffer(-.55,join_style='round').intersection(outer.buffer(-1.8)).simplify(.12,preserve_topology=True)
  holes.extend(cell for cell in poly_parts(hp) if cell.area>4)
 is_frame=outer.bounds[3]<90
 primary=min(holes,key=lambda h:h.distance(Point(2,30) if is_frame else Point(15,76)))
 primary_box=box(*primary.bounds)
 outer=outer.union(primary_box.buffer(2,join_style='mitre')).buffer(0)
 cells=[primary_box]
 for hole in holes:
  if hole is primary:continue
  cells.extend(cell for cell in poly_parts(hole.difference(primary_box.buffer(1.3))) if cell.area>4)
 solid=outer.difference(unary_union(cells)).buffer(0)
 x0,y0,x1,y1=outer.bounds
 width,height=82,(70 if is_frame else 83)
 sx=width/(x1-x0);sy=height/(y1-y0)
 def calibrate(g):
  return affinity.affine_transform(g,[sx,0,0,sy,(0 if is_frame else 20)-sx*x0,(0 if is_frame else 37)-sy*y0])
 sources.append({'name':'Frame' if is_frame else 'Sash','solid':calibrate(solid),'cavity':calibrate(primary_box)})
sources.sort(key=lambda p:p['name'])
# Restore the drawn glazing rebates rather than projecting their sloping faces from a photo.
sash=sources[1]
left_lip=Polygon([(20,113.8),(22,117.2),(38.8,120),(38.8,117.6),(36.2,115.2),(35.6,111),(33.4,109),(31.2,111.8)])
right_bead=Polygon([(75,120),(78,117.5),(100.2,113.2),(102,110.8),(102,90),(89,90),(89,95),(77.5,99),(75,102)])
right_cells=[Polygon([(79.8,114.8),(89.3,112.3),(88.2,104.6),(80.2,104.6)]),Polygon([(91.2,111.8),(99.5,109.7),(100,97.8),(91.1,98.5),(90.1,102)])]
sash['solid']=sash['solid'].union(left_lip).union(right_bead).difference(unary_union(right_cells)).buffer(0)
# The small centre-seal contact land visible at the lower sash edge in the section.
contact_land=Polygon([(40.3,59.1),(43.5,59.1),(44.6,60.1),(44.6,62.2),(42.7,62),(40.3,60.4)])
sash['solid']=sash['solid'].union(contact_land).buffer(0)
# Preserve a small real assembly gap between the two rigid PVC profiles.
sources[1]['solid']=sources[1]['solid'].difference(sources[0]['solid'].buffer(.25)).buffer(0)
scale=399/82
point=lambda x,y:((x-195)/scale,(744-y)/scale)
def drawing_poly(points):return Polygon([point(x,y) for x,y in points]).buffer(0)
# These visible seals follow the locations and curved centre-seal path in the drawing.
seals=[
 ('EPDM_MD_Central',drawing_poly([(355,526),(355,521),(360,517),(368,516),(375,510),(380,499),(383,484),(384,466),(386,457),(389,455),(391,456),(390,466),(389,484),(385,502),(379,516),(374,524),(374,531),(370,535),(362,535),(359,531)])),
 ('EPDM_Frame_Outer',drawing_poly([(253,428),(254,421),(260,416),(267,417),(272,423),(270,430),(265,433),(260,431),(258,427),(261,422),(265,422),(266,426),(263,428)])),
 ('EPDM_Frame_Inner',drawing_poly([(606,543),(608,535),(613,530),(620,530),(626,536),(627,544),(622,549),(615,548),(612,544),(614,537),(618,536),(621,540),(620,544),(616,544)])),
 ('EPDM_Glass_Outer',drawing_poly([(366,179),(367,173),(373,169),(379,170),(383,177),(382,185),(378,190),(373,188),(371,184),(374,179),(377,178),(378,182),(375,185)])),
 ('EPDM_Glass_Inner',drawing_poly([(559,169),(562,166),(565,170),(566,176),(570,180),(573,180),(573,184),(568,186),(563,182),(560,176)])),
]
# Seat each seal in its own rebate; do not hide it by clipping the rubber away.
for source in sources:
 for name,seal in seals:source['solid']=source['solid'].difference(seal.buffer(.04)).buffer(0)
 assert source['solid'].is_valid and source['solid'].geom_type=='Polygon'
shift=lambda g:affinity.translate(g,xoff=-51)
for source in sources:
 name=source['name'];solid=source['solid'];extrude(name+'_Chambers',shift(solid));solids.append(solid)
 cavity=source['cavity'].intersection(solid.envelope)
 left,bottom,right,top=cavity.bounds
 # Galvanised reinforcement with a visibly thinner wall than the PVC substrate.
 steel_outer=box(left+.7,bottom+.7,right-.7,top-.7)
 steel_ring=steel_outer.difference(steel_outer.buffer(-1.25,join_style='mitre'))
 assert solid.intersection(steel_ring).area<1e-6,(name,'steel/PVC overlap')
 extrude(name+'_Steel_Reinforcement',shift(steel_ring),143,71.5,['Galvanised_Steel']*3)
for name,seal in seals:
 extrude(name,shift(seal),145.4,72.7,['EPDM_Black']*3)
# Triple IGU in the drawing: 4 / 12 / 4 / 12 / 4 = 36 mm.
glass_left=(384-195)/scale
centres=[glass_left+2+16*i for i in range(3)]
for i in range(2):
 left=centres[i]+2;right=centres[i+1]-2
 outer=Polygon([(left,109.6),(right,109.6),(right,105.4),(right-1,103.8),(left+1,103.8),(left,105.4)])
 inner=Polygon([(left+.8,108.8),(right-.8,108.8),(right-.8,105.7),(right-1.4,104.6),(left+1.4,104.6),(left+.8,105.7)])
 extrude('Warm_Edge_Spacer_'+str(i+1),shift(outer.difference(inner)),143,71.5,['Spacer_Cut','Spacer_Black','Spacer_Cut'])
 extrude('IGU_Secondary_Seal_'+str(i+1),shift(box(left,100,right,103.6)),143,71.5,['EPDM_Black']*3)
# Clean glass seat from the drawing, without hidden intersections at the base.
for source in sources:
 for x in centres:
  area=source['solid'].intersection(box(x-2,100,x+2,154)).area
  if area>.01:print('GLASS_SEAT_CLEARANCE',source['name'],x,round(area,3))
assert solids[0].intersection(solids[1]).area<1e-6
panes=[{'center_x':x-51,'bottom':100,'height':54,'thickness':4,'depth':145} for x in centres]
data={'version':2,'unit':'mm','source':'Interpretation of user-supplied dimensioned section; not a factory CAD export','dimensions':{'frame_depth':82,'frame_height':70,'sash_depth':82,'sash_offset':20,'combined_height':120,'combined_depth':102,'glazing':36},'objects':objects,'panes':panes,'desiccant_centres':[centres[0]+8-51,centres[1]+8-51],'desiccant_height':[105,108],'validation':validation}
(root/'models/profile-geometry.json').write_text(json.dumps(data,separators=(',',':')))
print('Closed components:',len(objects),'vertices:',sum(len(o['vertices']) for o in objects))
print('MD centre-seal bounds:',seals[0][1].bounds)
