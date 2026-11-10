# PVC catalogue: scope and source verification

Prepared 2026-11-10. The catalogue distinguishes product families rather than claiming that all variants are stocked.

| Family              | Nominal frame depth | Sealing concept    |
| ------------------- | ------------------- | ------------------ |
| Schüco LivIng 82 AS | 82 mm               | AS, rebate sealing |
| Schüco LivIng 82 MD | 82 mm               | MD, centre sealing |
| Schüco CT 70 AS     | 70 mm               | AS, rebate sealing |
| Kömmerling 70 AD    | 70 mm               | AD, rebate sealing |
| Kömmerling 76 AD    | 76 mm               | AD, rebate sealing |
| Kömmerling 76 MD    | 76 mm               | MD, centre sealing |
| Kömmerling 88 MD    | 88 mm               | MD, centre sealing |

## Manufacturer references

- Schüco: https://www.schueco.com/
- Kömmerling: https://www.koemmerling.com/

These links point to the manufacturers. They are **not retrieved technical sheets**. Outbound HTTPS requests to both manufacturer sites failed with proxy CONNECT HTTP 403 on 2026-11-10. Reading the environment configuration draft also failed twice with INVALID_ARGUMENT; no network policy was replaced.

The baseline family names, nominal depths and AS/AD/MD meanings above have not been independently checked against current manufacturer documentation in this session. They are not newly verified performance claims. Live documentation verification remains outstanding. The comparison intentionally omits chamber counts, glazing limits, Uf/Ug/Uw figures, acoustic ratings, certification, security class, guarantees, lead times and prices. Do not add these from memory or transfer one variant's values to another.

AS and AD abbreviate Anschlagdichtung (rebate sealing); MD abbreviates Mitteldichtung (centre sealing). Uf is frame thermal transmittance, Ug glazing transmittance and Uw whole-window transmittance. A lower transmittance indicates less heat transfer. A nominal frame depth does not determine glazing thickness or whole-window performance.

To finish manufacturer verification, allow the required domains in environment network settings while preserving existing policy: schueco.com, www.schueco.com, koemmerling.com, www.koemmerling.com. Follow only documented redirects and add any required document-host domains separately. Obtain the regional technical sheet for each exact variant, record its URL, issue date and page, then update this record and catalog.js. Confirm availability with the business before treating a family as an in-stock offering.

All small card diagrams and the hero opening demo are simplified illustrations, not factory cross-sections or engineering simulations. They do not substitute for manufacturer product images or drawings. No other customer repositories were present in /workspace for comparison.
