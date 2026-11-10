# Profile catalogue: sources and limits

Updated 2026-11-10. Each profile has its own selectable panel. On phones, a grouped select replaces the model grid; the cutaway thumbnail and characteristics are compact, and the technical table starts closed. Desktop tables remain open. No variant is represented as guaranteed in stock.

## Source hierarchy

1. **User-supplied Schüco references:** screenshots of the Schüco LivIng AS/MD brochure and LivIng 82 MD technical table. No live document URL, issue date or downloadable image handle was supplied. These are explicit transcriptions, not newly retrieved manufacturer documents.
2. **Independent profile catalogue:** [OpenAEC, pinned revision](https://github.com/OpenAEC-Foundation/open-frame-studio/blob/fb67ef26beb342755e4639f914fb01c15b72ff0e/profiles/pvc/kommerling.json). The data distinguishes standard models from proEnergyTec and flags unverified fields. Only supported standard-model fields were used.
3. **Independent supplier catalogue:** [Fenster-WeissenBurger product page, pinned revision](https://github.com/DanielGanea45/-Fenster-WeissenBurger/blob/cef16362816145dec234fac0bd4e711cca5f5734/produkte/kunststofffenster-koemmerling/index.html). Its dealer table supplies the 70 AD reference and corroborates chamber counts and reference Uf for 76 AD, 76 MD and 88.
4. **Image archive with original URLs:** [Renisual archive index, pinned revision](https://github.com/cryptoprins-ship-it/renisual/blob/1e38e298411a1abc308f02d1d950135811394d80/public/samples/kozijnen/schuco/index.json). It records archived Schüco manufacturer-family pictures and their original `schueco.com` resource URLs.

Direct access to manufacturer sites remains blocked by the environment proxy. The independent catalogues and archived image files themselves were retrieved from the already allowed GitHub destination. The page does not claim newly verified manufacturer certification. Kömmerling panels link to the actual independent technical source.

## Values used

| Model               | Depth | Chambers  | Sealing concept / levels      | Reference frame Uf                                    |
| ------------------- | ----- | --------- | ----------------------------- | ----------------------------------------------------- |
| Schüco LivIng 82 AS | 82 mm | 7         | AS / 2                        | 1.00 W/(m²·K)                                         |
| Schüco LivIng 82 MD | 82 mm | 7         | MD / 3                        | ≥ 0.96 W/(m²·K), operator preserved from the MD table |
| Schüco CT 70 AS     | 70 mm | not added | AS, no new performance claims | not added                                             |
| Kömmerling 70 AD    | 70 mm | 5         | AD / 2                        | 1.20 W/(m²·K)                                         |
| Kömmerling 76 AD    | 76 mm | 5         | AD / 2                        | 1.10 W/(m²·K)                                         |
| Kömmerling 76 MD    | 76 mm | 6         | MD / 3                        | 1.00 W/(m²·K)                                         |
| Kömmerling 88 MD    | 88 mm | 7         | MD / 3                        | 0.95 W/(m²·K)                                         |

AS and AD abbreviate Anschlagdichtung (rebate sealing); MD abbreviates Mitteldichtung (centre sealing). Uf describes frame thermal transmittance, Ug glazing transmittance and Uw the whole window. Uf is not copied into Uw. Reference family values are not a promise for every supplied window.

### Supplied LivIng details

The supplied brochure lists a 24–52 mm glazing range, maximum sound reduction 47 dB, RC2 burglary resistance, Class 4 air permeability and Class 9A watertightness for LivIng AS/MD. It also describes weldable EPDM gasket technology.

The MD-only table additionally gives: minimum face width 120 mm; maximum vent width 1500 mm and height 2600 mm; maximum Rwp 47 dB(A); wind resistance Class C5/B5; CE marking yes. The MD presentation preserves the table's ≥ operator and dB(A) notation. Additional dimensions and classes are under “Additional parameters”. CE is described as a marking, not a blanket certificate for every finished window.

The brochure makes results dependent on profile and glazing. Maximum dimensions, classes and thermal/acoustic results are not represented as simultaneous guarantees. Broad “world first”, passive-house, energy-saving and service-life comparison claims were not copied.

### Differences and omitted values

- The independent OpenAEC source discusses a different 16–54 mm LivIng glazing range; the site retains the user's supplied 24–52 mm brochure range rather than silently combining editions.
- Sources differ on 76-series glazing limits for finished windows versus profile systems (48/50/56 mm). Those numeric limits were not added for 76 AD/MD.
- The 88 MD maximum glazing reference of 58 mm is corroborated by the OpenAEC model record and [CORTEC's independently published catalogue](https://github.com/isimansur/cortec/blob/431df2c54dd5024b33c90c2325834a81c23a3fda/src/pages/kommerling.js). It is a profile-family limit, not a guarantee that every supplier configuration accepts it; some finished-window catalogues specify a narrower limit.
- Unverified sightlines, reinforcement wall thicknesses, acoustic/security classifications and proEnergyTec values were not copied to the standard Kömmerling models.
- CT 70 retains baseline depth/material/sealing data. More detailed performance values were not invented for it.

## Images

Pinned links, model scope, original manufacturer URLs where available and SHA-256 checksums are in `docs/profile-assets.json`. All images are served locally without runtime dependence on blocked hosts. They were inspected and copied without changing gasket geometry or generating substitute product cutaways.

| Model            | Image scope                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| LivIng 82 MD     | Existing repository cutaway previously identified as this model                   |
| LivIng 82 AS     | Archived LivIng 82 **family reference**, not an authenticated AS-specific cutaway |
| CT 70 AS         | Archived Corona **family reference**, not an authenticated CT 70 AS drawing       |
| Kömmerling 70 AD | Separate supplier catalogue reference image                                       |
| Kömmerling 76 AD | Separate supplier catalogue reference image                                       |
| Kömmerling 76 MD | Separate 800 px supplier catalogue reference image                                |
| Kömmerling 88 MD | Separate supplier catalogue reference image                                       |

The two Schüco family pictures visibly say “Family reference” on the image button, including on mobile. Alt text and captions preserve that distinction. The supplier metadata calls the Kömmerling pictures **Abbildung beispielhaft** (illustrative reference); they are not represented as authenticated factory drawings. The LivIng MD picture remains `images/foto_1788827279996.jpg`; the earlier 447 px Kömmerling 76 MD photo is replaced with the sourced 800 px catalogue reference.

The user's uploaded screenshots are visible in the conversation but have no downloadable file handle in the execution workspace. The site does not claim to embed the exact uploaded crop. Exact factory-verified variant imagery for LivIng AS and CT 70 AS remains outstanding.

## Further primary-source verification

Manufacturer links identify the official sites: https://www.schueco.com/ and https://www.koemmerling.com/. They are not links to newly retrieved technical sheets. The environment draft read also failed with INVALID_ARGUMENT; no unknown network allowlist was replaced.

To finish primary-source checks, preserve existing network policy and add `schueco.com`, `www.schueco.com`, `koemmerling.com`, and `www.koemmerling.com` to allowed domains. Follow documented redirects and add required document hosts separately. Record the actual technical document URL, issue date and page when retrieved. Exact model, regional variant, availability, glazing and declared performance remain subject to the business's technical quotation.

## Presentation update

The homepage shows Schüco LivIng 82 MD and Kömmerling 88 MD together, stacked vertically with no model selector. The “Other profiles” button opens `profilet/profilet-e-tjera.html`, where all five remaining models are shown in order on one page. Individual pages remain available for existing bookmarks; they are not required for the collection workflow. Public source sections and links remain removed. Internal provenance records, configuration limits, the distinction between Uf and Uw, and family-photo labels are retained.
