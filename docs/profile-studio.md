# Base profile review

The hero uses a real, closed 3D GLB exported from Blender. The latest request adds three automatic demonstrations and one comfort mushroom locking point, based on the user-supplied hardware photograph. See [profile-demonstrations.md](profile-demonstrations.md) for timing, mechanical constraints, caveats and interaction. No window handle or control buttons are shown.

`models/schuco-profile-review.glb` is the runtime model; `models/schuco-profile-review.blend` is its editable source. `models/profile-geometry.json` contains closed, triangulated component data; `scripts/build-profile-model.py` builds and checks the Blender meshes before export. Preparation uses Shapely through `scripts/prepare-profile-section.py`.

The user-supplied dimensioned cross-section sets the assembly envelope: frame 82 mm deep and 70 mm high, sash 82 mm deep with 20 mm offset, 120 mm combined profile height and 102 mm combined depth. Glazing is represented by three 4 mm panes and two 12 mm cavities, totalling 36 mm. Only a short, 145 mm product sample is shown. The fine wall and groove contours are interpreted from visual references; this is a reconstruction, not an authenticated manufacturer CAD export or a manufacturing drawing.

The black `EPDM_MD_Central` component follows the visible curved centre seal in the supplied drawing. It rises from the frame rebate to the sash in the assembly gap, with a real extruded cross-section and a front cut face slightly proud of the PVC so it remains visible. Glass, frame-outer and frame-inner seals are separate parts. Galvanised reinforcement is distinct from grey cut PVC. Both the outer foil and all internal channel walls are matte anthracite, as requested in the latest correction.

Every structural component is checked for closed manifold topology after applying a small Blender bevel. Cap triangulation is constrained to the actual polygons, avoiding triangles across the hollow chambers. Rigid PVC parts do not overlap; the steel fits the central cavities. Mesh validation is recorded in `models/profile-mesh-validation.json`.

The viewer uses locally vendored Three.js 0.169.0 and GLTFLoader (MIT licence in `vendor/three/LICENSE`), a neutral light studio, broad reflected softboxes, contact shadows, antialiasing, and the actual device pixel ratio. No flat photograph is displayed as a substitute for an interactive model. Unsupported WebGL devices receive a text status.

The linked ChatGPT conversation could not be opened because this session does not expose `read_thread`. The attached technical drawing was used directly. The three demonstrations were enabled only after the user requested them following the base geometry review. Do not publish or push without a new user request.
