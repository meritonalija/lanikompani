"""Run with: blender --background --factory-startup --python scripts/build-profile-model.py
Build the clean review asset from checked-in mesh data. No factory CAD is implied.
"""
import bpy,bmesh,json,math,random
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
bpy.context.preferences.filepaths.save_version=0
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
collection=bpy.data.collections.new('Profile_Sample');bpy.context.scene.collection.children.link(collection)
def lin(c):return c/12.92 if c<=.04045 else ((c+.055)/1.055)**2.4
def color(value):return tuple(lin(int(value[i:i+2],16)/255) for i in (0,2,4))+(1,)
def material(name,hexcolor,roughness=.5,metallic=0,transmission=0):
 m=bpy.data.materials.new(name);m.diffuse_color=color(hexcolor);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=color(hexcolor);p.inputs['Roughness'].default_value=roughness;p.inputs['Metallic'].default_value=metallic;p.inputs['Transmission Weight'].default_value=transmission
 if transmission:p.inputs['IOR'].default_value=1.52
 return m
mats={
 'PVC_Cut':material('PVC_Cut','b9bdbb',.63),
 'PVC_Interior':material('PVC_Interior','303439',.64),
 'Anthracite_Exterior':material('Anthracite_Exterior','303439',.56),
 'Galvanised_Steel':material('Galvanised_Steel','a4a9ab',.29,1),
 'EPDM_Black':material('EPDM_Black','111516',.8),
 'Spacer_Black':material('Spacer_Black','252a2c',.62,.15),
 'Spacer_Cut':material('Spacer_Cut','9b9f9e',.38,.7),
 'Desiccant':material('Desiccant','bdbab1',.85),
 'Glass_Clear':material('Glass_Clear','ffffff',.035,0,1),
}
def move_to_collection(obj):
 for old in list(obj.users_collection):old.objects.unlink(obj)
 collection.objects.link(obj)
def finish(obj,bevel=.00009):
 mod=obj.modifiers.new('Subtle edge radius','BEVEL');mod.width=bevel;mod.segments=3;mod.limit_method='ANGLE';mod.angle_limit=math.radians(24);mod.harden_normals=True
 normal=obj.modifiers.new('Planar weighted normals','WEIGHTED_NORMAL');normal.keep_sharp=True;normal.weight=50
 for p in obj.data.polygons:p.use_smooth=True
 obj.select_set(True);bpy.context.view_layer.objects.active=obj
 bpy.ops.object.modifier_apply(modifier=mod.name);bpy.ops.object.modifier_apply(modifier=normal.name)
 obj.select_set(False)
data=json.loads((ROOT/'models/profile-geometry.json').read_text())
checks=[]
for source in data['objects']:
 # Source coordinates are (X cross-section depth, Y height, Z extrusion), in mm.
 verts=[(x*.001,-z*.001,y*.001) for x,y,z in source['vertices']]
 mesh=bpy.data.meshes.new(source['name']);mesh.from_pydata(verts,[],source['faces']);mesh.update()
 obj=bpy.data.objects.new(source['name'],mesh);collection.objects.link(obj)
 for name in source['materials']:mesh.materials.append(mats[name])
 for poly,index in zip(mesh.polygons,source['material_indices']):poly.material_index=index
 bm=bmesh.new();bm.from_mesh(mesh);bmesh.ops.recalc_face_normals(bm,faces=bm.faces);bm.to_mesh(mesh);bm.free()
 finish(obj,.00008 if 'Steel' in source['name'] else .0001)
 bm=bmesh.new();bm.from_mesh(obj.data);bad=sum(not e.is_manifold for e in bm.edges);bm.free()
 checks.append({'name':obj.name,'nonmanifold_edges':bad,'vertices':len(obj.data.vertices),'faces':len(obj.data.polygons)})
 assert bad==0,(obj.name,bad)
for i,pane in enumerate(data['panes']):
 bpy.ops.mesh.primitive_cube_add(size=1,location=(pane['center_x']*.001,0,(pane['bottom']+pane['height']/2)*.001))
 obj=bpy.context.object;obj.name=['Glass_Outer_4mm','Glass_Centre_4mm','Glass_Inner_4mm'][i];obj.dimensions=(pane['thickness']*.001,pane['depth']*.001,pane['height']*.001);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);move_to_collection(obj);obj.data.materials.append(mats['Glass_Clear']);finish(obj,.00005)
# Granular desiccant is contained in the two exposed hollow spacer ends.
random.seed(82)
for x in data.get('desiccant_centres',[3,19]):
 for z in [-71.6,71.6]:
  for i in range(15):
   bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=.00028,location=((x+random.uniform(-4.8,4.8))*.001,-z*.001,random.uniform(*data.get('desiccant_height',[117,120]))*.001))
   obj=bpy.context.object;obj.name='Spacer_desiccant';move_to_collection(obj);obj.data.materials.append(mats['Desiccant'])
# One draw call for the granular filler, preserving every original grain.
bpy.ops.object.select_all(action='DESELECT')
grains=[o for o in collection.objects if o.name.startswith('Spacer_desiccant')]
for obj in grains:obj.select_set(True)
if grains:
 bpy.context.view_layer.objects.active=grains[0];bpy.ops.object.join();bpy.context.object.name='Spacer_desiccant'
# Lower the complete sample onto its physical feet; keep all authored relationships.
minimum=min((obj.matrix_world@Vector(v.co)).z for obj in collection.objects if obj.type=='MESH' for v in obj.data.vertices)
for obj in collection.objects:obj.location.z-=minimum
bpy.ops.object.select_all(action='DESELECT')
for obj in collection.objects:obj.select_set(True)
bpy.context.view_layer.objects.active=next(iter(collection.objects))
bpy.ops.export_scene.gltf(filepath=str(ROOT/'models/schuco-profile-review.glb'),export_format='GLB',use_selection=True,export_yup=True,export_apply=True,export_materials='EXPORT',export_extras=True)
(ROOT/'models/profile-mesh-validation.json').write_text(json.dumps({'source':'Visual reconstruction, not factory CAD','components':checks,'all_closed':all(c['nonmanifold_edges']==0 for c in checks)},indent=2))
# A reproducible studio setup for the static reference review.
bpy.ops.object.select_all(action='DESELECT')
floor=material('Studio floor','e3e7e7',.82)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.0002));bpy.context.object.name='Studio_Ground';bpy.context.object.data.materials.append(floor)
world=bpy.context.scene.world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.78,.81,.81,1);world.node_tree.nodes['Background'].inputs[1].default_value=.45
def area(name,location,power,size,target=(0,0,.08)):
 light=bpy.data.lights.new(name,'AREA');light.energy=power;light.shape='DISK';light.size=size;obj=bpy.data.objects.new(name,light);bpy.context.scene.collection.objects.link(obj);obj.location=location;obj.rotation_euler=(Vector(target)-obj.location).to_track_quat('-Z','Y').to_euler()
area('Large softbox left',(-.35,-.4,.55),55,.4)
area('Large softbox right',(.35,.12,.4),35,.35)
area('Top softbox',(-.05,.1,.65),40,.3)
cam=bpy.data.cameras.new('Reference camera');camera=bpy.data.objects.new('Reference camera',cam);bpy.context.scene.collection.objects.link(camera);camera.location=(-.26,-.38,.22);camera.rotation_euler=(Vector((0,0,.085))-camera.location).to_track_quat('-Z','Y').to_euler();cam.type='ORTHO';cam.ortho_scale=.285;bpy.context.scene.camera=camera
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=False;scene.render.resolution_x=1000;scene.render.resolution_y=1000;scene.render.resolution_percentage=100;scene.view_settings.view_transform='AgX'
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'models/schuco-profile-review.blend'))
print('PROFILE_ASSET_OK',len(checks),'closed structural components')
