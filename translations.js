/**
 * LANI KOMPANI - Multi-Language System (Shqip & English)
 * Dynamic client-side translation with localStorage persistence.
 */

const translations = {
  sq: {
    // Topbar
    topbar_loc: "Orizare, Komuna e Likovës",
    topbar_hours: "E Hënë - E Shtunë: 08:00 - 18:00",

    // Header & Nav
    nav_home: "Kreu",
    nav_products: "Produktet",
    nav_schuco: "Schüco LivIng 82 MD",
    nav_kommerling: "Kömmerling 76 MD",
    nav_sliding: "Sisteme Rrëshqitëse (Sliding)",
    nav_facades: "Fasada Strukturale Xhami",
    nav_shutters: "Roleta Alumini & Alubond",
    nav_about: "Për Ne",
    nav_contact: "Kontakti",
    btn_quote: "Kërko Ofertë",
    btn_change_logo: "Ndrysho Logon",

    // Hero Slider
    hero_eyebrow: "CHOOSE BEST",
    hero_heading: "WINDOWS & DOORS",
    hero_lead: "Për shtëpinë dhe ambientet tuaja afariste.",
    hero_provenance: "Dizajn modern, profile cilësore gjermane & evropiane",
    btn_view_products: "Shiko Produktet",
    btn_change_hero_bg: "Ndrysho Sfondin e Ballinës",

    // Brands Strip
    brand_tag_de: "Gjermani",
    brand_tag_alu: "Profile Alumini",

    // Catalog Banner
    banner_eyebrow: "TEKNOLOGJI GJERMANE & EVROPIANE",
    banner_title: "Katalogu Teknik i Sistemeve PVC, Alumini & Fasadave",
    banner_sub: "Profile me efiçiencë të lartë energjetike, termoizolim superior dhe certifikime të standardeve evropiane për shtëpi pasive dhe arkitekturë moderne.",

    // Section 1: Schüco LivIng 82 MD
    schuco_badge: "SCHÜCO GJERMANI • 82mm",
    schuco_desc: "Sistem gjerman elitar me 7 dhoma ajri dhe termoizolim të standardit të shtëpive pasive (Uw deri 0.72 W/m²K).",
    spec_depth: "Thellësi Ndërtimi",
    spec_chambers: "Dhoma Izoluese",
    spec_thermo_uf: "Termoizolimi Uf",
    spec_sound: "Izolim Akustik",
    spec_gaskets_epdm: "Gomina EPDM",
    spec_glazing_max: "Xham deri në",
    schuco_f1_cat: "TEKNOLOGJI GJERMANE TWIN",
    schuco_f1_title: "Strukturë me 7 Dhoma Termike",
    schuco_f1_desc: "Gjeometria e avancuar me 7 dhoma termoizoluese në kornizë dhe krah garanton mbrojtje maksimale ndaj të ftohtit ekstrem, duke eliminuar plotësisht urat termike.",
    schuco_f2_cat: "EFIÇIENCË ENERGJETIKE",
    schuco_f2_title: "Termoizolim për Shtëpi Pasive",
    schuco_f2_desc: "Koeficienti i jashtëzakonshëm Uf = 0.96 W/(m²K) redukton humbjet e energjisë deri në 35%, duke ulur ndjeshëm kostot tuaja mujore të ngrohjes dhe ftohjes.",
    schuco_caption: "Schüco LivIng 82 MD • Gjermani",
    schuco_f3_cat: "HERMETIZIM MAKSIMAL",
    schuco_f3_title: "Tre Nivele Hermetizimi EPDM",
    schuco_f3_desc: "Guarnicionet e saldueshme me material cilësor EPDM ruajnë fleksibilitetin për dekada me radhë, duke parandaluar plotësisht depërtimin e pluhurit, erës dhe zhurmës.",
    schuco_f4_cat: "SIGURI & STATIKË",
    schuco_f4_title: "Përforcim Çeliku & Qëndrueshmëri",
    schuco_f4_desc: "Përforcimet e trasha të çelikut brenda dhomave të profilit garantojnë stabilitet gjeometrik dhe mundësojnë elemente me përmasa të mëdha me mbrojtje kundër thyerjeve.",
    schuco_cta: "Pyet për Schüco 82mm",

    // Section 2: Kömmerling 76 MD
    kom_badge: "KÖMMERLING GJERMANI • 76mm",
    kom_desc: "Sistem gjerman lider me gomina qendrore MD, eko-formulë greenline® pa plumb dhe kursim deri në 30% të energjisë.",
    spec_chambers_kom: "Dhoma Izolimi",
    spec_center_seal: "Gominë Qendrore",
    kom_f1_cat: "SISTEM GJERMAN ME 6 DHOMA",
    kom_f1_title: "Statikë dhe Qëndrueshmëri e Lartë",
    kom_f1_desc: "Me thellësi 76mm dhe përforcime masive çeliku të galvanizuar, profili Kömmerling mundëson elemente me përmasa të mëdha me stabilitet maksimal statik.",
    kom_f2_cat: "SISTEM ME GOMINË QENDRORE",
    kom_f2_title: "Izolim Qendror MD (Middle Seal)",
    kom_f2_desc: "Tre nivele guarnicionesh me izolim të veçantë qendror sigurojnë mbrojtje superiore ndaj shiut të rrëmbyeshëm (Klasi 9A) dhe depërtimit të ajrit (Klasi 4).",
    kom_caption: "Kömmerling 76 MD • greenline® Eco",
    kom_f3_cat: "EKO-TEKNOLOGJI",
    kom_f3_title: "Formula Ekologjike greenline®",
    kom_f3_desc: "Përbërje 100% pa plumb me stabilizues ekologjikë kalcium-zink (Ca-Zn), me rezistencë absolute ndaj rrezeve UV dhe jetëgjatësi shumëdekadëshe pa ndryshim ngjyre.",
    kom_f4_cat: "IZOLIM MAKSIMAL",
    kom_f4_title: "Xham me 3 Shtresa (Uw deri 0.73)",
    kom_f4_desc: "Mundësi montimi të xhamit tresh termo-akustik deri në 50mm me mbushje gazi argon, duke arritur vlerën totale Uw prej 0.73 W/(m²K) për rehati në të 4 stinët.",
    kom_cta: "Pyet për Kömmerling 76mm",

    // Section 3: Sliding Systems
    slide_badge: "HEBESCHIEBE & ASISTAL",
    slide_title: "Sliding Systems Panoramike",
    slide_desc: "Zgjidhje luksoze me hapje panoramike, mekanizma ngritës-rrëshqitës gjermanë dhe prag të rrafshët me dyshemenë pa pengesa.",
    spec_sash_cap: "Kapacitet për Krah",
    spec_flush_thresh: "Prag i Rrafshët",
    spec_thermal_break: "Termo-Thyerje Poliamidi",
    spec_pano_opening: "Hapje Panoramike",
    slide_f1_cat: "MEKANIZËM INOVATIV",
    slide_f1_title: "Teknologji Ngritëse-Rrëshqitëse",
    slide_f1_desc: "Krahët e rëndë të dyerve ngrihen me lehtësi përmes dorezës ergonomike dhe rrëshqasin butësisht mbi shina çeliku inoks me kushineta të specializuara.",
    slide_f2_cat: "AKSES PA PENGESA",
    slide_f2_title: "Prag i Rrafshët (Zero-Barrier)",
    slide_f2_desc: "Dizajn modern me prag të integruar në nivel me dyshemenë, duke ofruar kalim të lirë dhe të sigurt midis sallonit dhe tarracës ose oborrit.",
    slide_caption: "Asistal & Schüco Hebeschiebe",
    slide_f3_cat: "EFIÇIENCË ENERGJETIKE",
    slide_f3_title: "Termo-Urë Alumini me Poliamid",
    slide_f3_desc: "Profile alumini me thyerje termike të gjerë dhe guarnicione shumëfishe EPDM sigurojnë izolim termik të lartë dhe eliminim të plotë të kondensimit.",
    slide_f4_cat: "SIGURI & STATIKË",
    slide_f4_title: "Xham Panoramik i Sigurt (ESG/VSG)",
    slide_f4_desc: "Paketë xhami me 3 shtresa i kalitur dhe i laminuar për siguri maksimale ndaj thyerjeve, me mbrojtje nga rrezatimi diellor dhe izolim akustik deri 45 dB.",
    slide_cta: "Pyet për Sistemet Rrëshqitëse",

    // Section 4: Structural Facades
    facade_badge: "ASISTAL & ALUMINI",
    facade_title: "Fasada Strukturale Xhami & Alumini",
    facade_desc: "Zgjidhje inxhinierike të nivelit më të lartë për objekte afariste, qendra tregtare, spitale dhe vila moderne me profile të padukshme.",
    spec_std_eu: "Standard Evropian",
    spec_glass_solar: "Xham Solar-Kontroll",
    spec_prof_alu: "Profile Alumini",
    spec_seal_struct: "Hermetizim Strukturor",
    spec_wind_res: "Rezistencë ndaj Erës",
    facade_f1_cat: "ESTETIKË ARKITEKTURORE",
    facade_f1_title: "Sipërfaqe e Vazhdueshme Xhami",
    facade_f1_desc: "Profile të fshehura nga ana e jashtme që krijojnë një pamje monolite kristalore xhami pa ndërprerje vizuale, duke i dhënë ndërtesës pamje madhështore.",
    facade_f2_cat: "EFIÇIENCË SOLARE",
    facade_f2_title: "Xhama Solar-Kontroll 4-Stinët",
    facade_f2_desc: "Xhamat inteligjentë Stopsol dhe Low-E reflektojnë nxehtësinë e padëshiruar diellore në verë dhe ruajnë ngrohtësinë në dimër, duke ulur ndjeshëm kostot e klimatizimit.",
    facade_caption: "Fasadë Strukturale • LANI KOMPANI",
    facade_f3_cat: "HERMETIZIM INXHINIERIK",
    facade_f3_title: "Silikon Strukturor i Certifikuar",
    facade_f3_desc: "Lidhje strukturale me ngjitës silikoni të specializuar rezistent ndaj rrezeve UV, lëkundjeve sizmike dhe erërave me shpejtësi të lartë sipas standardeve EN 13830.",
    facade_f4_cat: "VENTILIM I PADUKSHËM",
    facade_f4_title: "Krahë Hapës të Integruar",
    facade_f4_desc: "Dritare ventiluese me hapje paralele ose të varur nga jashtë, të integruara në mënyrë të padukshme në rasterin e fasadës për ajrosje natyrale.",
    facade_cta: "Pyet për Fasada Strukturale",

    // Section 5: Roller Shutters
    shutter_badge: "SMART PROTECTION & ALUBOND",
    shutter_title: "Roleta Alumini & Veshje Alubond",
    shutter_desc: "Roleta të jashtme dhe të brendshme alumini me shkumë poliuretani, mekanizma automatikë me motor elektrik dhe veshje fasadash Alubond.",
    spec_foam_core: "Shkumë Izoluese",
    spec_smart_motor: "Motor me Telekomandë",
    spec_thermal_save: "Mbrojtje Termike",
    spec_fire_res: "Rezistent ndaj Zjarrit",
    spec_colors_wood: "Paletë Ngjyrash & Dru",
    shutter_f1_cat: "TERMOIZOLIM & QETËSI",
    shutter_f1_title: "Lamele Alumini me Shkumë",
    shutter_f1_desc: "Lamelet e aluminit të mbushura me shkumë poliuretani me densitet të lartë parandalojnë humbjen e ngrohtësisë në dimër dhe mbrojnë nga rrezet përvëluese në verë.",
    shutter_f2_cat: "AUTOMATIZIM INTELIGJENT",
    shutter_f2_title: "Motorë Elektrikë me Telekomandë",
    shutter_f2_desc: "Kontroll i lehtë përmes telekomandës, butonit në mur ose integrim me sistemet Smart Home, me mundësi programimi të orareve të ngritjes dhe uljes.",
    shutter_caption: "Roleta & Alubond • LANI KOMPANI",
    shutter_f3_cat: "SIGURI & PRIVATËSI",
    shutter_f3_title: "Mbrojtje e Shtuar & Errësim Total",
    shutter_f3_desc: "Roletat krijojnë një pengesë solide fizike kundër ndërhyrjeve të padëshiruara, duke ofruar gjithashtu errësim të plotë të dhomës së gjumit në çdo orë të ditës.",
    shutter_f4_cat: "ARKITEKTURË FASADE",
    shutter_f4_title: "Veshje Moderne me Alubond",
    shutter_f4_desc: "Panele kompozite alumini 4mm të nivelit premium për veshjen e jashtme të fasadave të objekteve, me qëndrueshmëri maksimale ndaj zjarrit dhe motit.",
    shutter_cta: "Pyet për Roleta & Alubond",

    // Promo Cards
    promo1_title: "Materiale të Certifikuara",
    promo1_btn: "Shiko Detajet",
    promo2_title: "Njihuni me LANI KOMPANI",
    promo2_btn: "Rreth Kompanisë",
    promo3_title: "Bota e Produkteve Tona",
    promo3_btn: "Shiko Produktet",

    // Quote Form
    form_heading: "Kërkoni Ofertë të Shpejtë",
    form_sub: "Plotësoni të dhënat dhe dërgojeni kërkesën direkt në WhatsApp ose me Email.",
    form_name_lbl: "Emri dhe Mbiemri *",
    form_name_ph: "p.sh. Agron Berisha",
    form_phone_lbl: "Numri i Telefonit *",
    form_phone_ph: "p.sh. +389 7X XXX XXX",
    form_city_lbl: "Qyteti / Vendbanimi",
    form_city_ph: "p.sh. Likovë, Kumanovë, Shkup...",
    form_service_lbl: "Zgjidhni Produktin *",
    form_opt_default: "Zgjidhni produktin...",
    form_opt_pvc: "Dyer & Dritare PVC",
    form_opt_schuco: "Dritare & Dyer Schüco LivIng 82 MD",
    form_opt_kom: "Dritare & Dyer Kömmerling 76 MD",
    form_opt_slide: "Sisteme Rrëshqitëse (Sliding)",
    form_opt_alu: "Dyer & Dritare Alumini (ALU)",
    form_opt_facade: "Fasada Strukturale Xhami",
    form_opt_alubond: "Fasada Alumini / Alubond",
    form_opt_shutter: "Roleta Alumini & Grila",
    form_opt_all: "Tjetër / Projekt i plotë",
    form_height_lbl: "Lartësia (cm)",
    form_height_ph: "p.sh. 140",
    form_width_lbl: "Gjerësia (cm)",
    form_width_ph: "p.sh. 120",
    form_notes_lbl: "Shënime shtesë / Numri i njësive",
    form_notes_ph: "p.sh. 2 copë | Dyer i dyfishtë | Të preferohet hapje e hapur",
    btn_send_whatsapp: "Dërgo Menjëherë në WhatsApp",
    btn_send_email: "Dërgo me Email",

    // Contact & Map
    contact_title: "Na Vizitoni në Punëtorinë Tonë",
    contact_desc: "Ju mirëpresim në hapësirat tona në Orizare, Komuna e Likovës për t'u njohur me profilet dhe zgjidhjet tona arkitekturore.",
    contact_addr_lbl: "Adresa:",
    contact_addr_val: "Orizare, Komuna e Likovës, Maqedoni e Veriut",
    contact_line1_lbl: "Linja 1:",
    contact_line2_lbl: "Linja 2:",
    contact_email_lbl: "Email:",
    contact_hours_lbl: "Orari:",
    contact_hours_val: "E Hënë - E Shtunë: 08:00 - 18:00 (E Diel: Pushim)",
    btn_maps: "Navigo me Google Maps",

    // Footer
    footer_desc: "LANI KOMPANI ofron një gamë bashkëkohore dhe me performancë të lartë të dyerve, dritareve PVC & ALU, fasadave strukturale dhe roletave në Orizare, Likovë dhe në gjithë rajonin.",
    footer_col_prod: "Produktet",
    footer_col_nav: "Navigimi",
    footer_col_contact: "Kontakt Zyrtar",
    footer_copy_left: "© 2026 LANI KOMPANI. Të gjitha të drejtat e rezervuara.",
    footer_copy_right: "Standarde Evropiane • Sisteme me Performancë të Lartë • Orizare, Likovë"
  },
  en: {
    // Topbar
    topbar_loc: "Orizare, Municipality of Lipkovo",
    topbar_hours: "Mon - Sat: 08:00 - 18:00",

    // Header & Nav
    nav_home: "Home",
    nav_products: "Products",
    nav_schuco: "Schüco LivIng 82 MD",
    nav_kommerling: "Kömmerling 76 MD",
    nav_sliding: "Sliding Systems",
    nav_facades: "Structural Glass Facades",
    nav_shutters: "Aluminium Shutters & Alubond",
    nav_about: "About Us",
    nav_contact: "Contact",
    btn_quote: "Request Quote",
    btn_change_logo: "Change Logo",

    // Hero Slider
    hero_eyebrow: "CHOOSE BEST",
    hero_heading: "WINDOWS & DOORS",
    hero_lead: "For your home and premium commercial spaces.",
    hero_provenance: "Modern design, high-grade German & European profiles",
    btn_view_products: "View Products",
    btn_change_hero_bg: "Change Hero Background",

    // Brands Strip
    brand_tag_de: "Germany",
    brand_tag_alu: "Aluminium Profiles",

    // Catalog Banner
    banner_eyebrow: "GERMAN & EUROPEAN ENGINEERING",
    banner_title: "Technical Catalog of PVC, Aluminium & Facade Systems",
    banner_sub: "High energy-efficiency profiles, superior thermal insulation and European certified standards for passive houses and modern architecture.",

    // Section 1: Schüco LivIng 82 MD
    schuco_badge: "SCHÜCO GERMANY • 82mm",
    schuco_desc: "Elite German system with 7 insulation chambers and passive-house thermal performance (Uw down to 0.72 W/m²K).",
    spec_depth: "Profile Depth",
    spec_chambers: "Chambers",
    spec_thermo_uf: "Thermal Insulation Uf",
    spec_sound: "Sound Insulation",
    spec_gaskets_epdm: "EPDM Gaskets",
    spec_glazing_max: "Glazing up to",
    schuco_f1_cat: "GERMAN TWIN TECHNOLOGY",
    schuco_f1_title: "7-Chamber Thermal Architecture",
    schuco_f1_desc: "Advanced 7-chamber internal geometry in frame and sash guarantees maximum protection against extreme cold, completely eliminating thermal bridging.",
    schuco_f2_cat: "ENERGY EFFICIENCY",
    schuco_f2_title: "Passive House Thermal Insulation",
    schuco_f2_desc: "Outstanding Uf value of 0.96 W/(m²K) reduces building heat loss by up to 35%, significantly lowering monthly heating and cooling costs.",
    schuco_caption: "Schüco LivIng 82 MD • Germany",
    schuco_f3_cat: "MAXIMUM WEATHERPROOFING",
    schuco_f3_title: "Triple EPDM Sealing Levels",
    schuco_f3_desc: "High-grade weldable EPDM gaskets preserve elasticity across decades, entirely sealing out wind-driven rain, draft, dust, and exterior noise.",
    schuco_f4_cat: "SECURITY & STATICS",
    schuco_f4_title: "Steel Reinforcement & Durability",
    schuco_f4_desc: "Heavy-gauge galvanized steel chambers ensure rock-solid geometry, supporting oversized floor-to-ceiling glass units with certified burglar resistance.",
    schuco_cta: "Inquire for Schüco 82mm",

    // Section 2: Kömmerling 76 MD
    kom_badge: "KÖMMERLING GERMANY • 76mm",
    kom_desc: "Leading German profile system with MD center seal, eco-friendly greenline® lead-free formulation and up to 30% energy savings.",
    spec_chambers_kom: "Insulation Chambers",
    spec_center_seal: "Center Seal (MD)",
    kom_f1_cat: "6-CHAMBER GERMAN SYSTEM",
    kom_f1_title: "Superior Statics & Longevity",
    kom_f1_desc: "With 76mm installation depth and heavy steel reinforcing, Kömmerling enables wide architectural window elements with supreme static stability.",
    kom_f2_cat: "MD CENTER SEAL SYSTEM",
    kom_f2_title: "Central Gasket Weather Barrier",
    kom_f2_desc: "Three sealing levels featuring a dedicated central barrier provide premier resistance to torrential rain (Class 9A) and air permeability (Class 4).",
    kom_caption: "Kömmerling 76 MD • greenline® Eco",
    kom_f3_cat: "ECO-ENGINEERING",
    kom_f3_title: "greenline® Sustainable Formula",
    kom_f3_desc: "100% lead-free formulation using environmentally friendly calcium-zinc (Ca-Zn) stabilizers, with total UV resistance that never yellows.",
    kom_f4_cat: "MAXIMUM INSULATION",
    kom_f4_title: "Triple Glazing (Uw down to 0.73)",
    kom_f4_desc: "Accommodates triple thermo-acoustic glazing units up to 50mm filled with argon gas, achieving an overall Uw rating of 0.73 W/(m²K).",
    kom_cta: "Inquire for Kömmerling 76mm",

    // Section 3: Sliding Systems
    slide_badge: "HEBESCHIEBE & ASISTAL",
    slide_title: "Panoramic Sliding Systems",
    slide_desc: "Luxury large-span panoramic solutions with German lift-and-slide hardware and barrier-free zero threshold.",
    spec_sash_cap: "Sash Capacity",
    spec_flush_thresh: "Flush Threshold",
    spec_thermal_break: "Polyamide Thermal Break",
    spec_pano_opening: "Panoramic Span",
    slide_f1_cat: "INNOVATIVE HARDWARE",
    slide_f1_title: "Lift & Slide Technology",
    slide_f1_desc: "Substantial glass sashes lift effortlessly via ergonomic lever handles and glide smoothly along stainless steel tracks with precision ball bearings.",
    slide_f2_cat: "BARRIER-FREE ACCESS",
    slide_f2_title: "Zero-Barrier Flush Threshold",
    slide_f2_desc: "Seamless integration level with finished interior floor, creating completely unhindered transitions between living spaces, patios and terraces.",
    slide_caption: "Asistal & Schüco Hebeschiebe",
    slide_f3_cat: "ENERGY EFFICIENCY",
    slide_f3_title: "Polyamide Thermal Break",
    slide_f3_desc: "Wide multi-chamber polyamide thermal struts and multi-layer EPDM seals ensure high thermal insulation and prevent condensation.",
    slide_f4_cat: "SECURITY & STATICS",
    slide_f4_title: "Safety Panoramic Glass (ESG/VSG)",
    slide_f4_desc: "Triple toughened and laminated safety glass units designed to withstand high wind loads, providing solar control and acoustic isolation up to 45 dB.",
    slide_cta: "Inquire for Sliding Systems",

    // Section 4: Structural Facades
    facade_badge: "ASISTAL & ALUMINIUM",
    facade_title: "Structural Glass & Aluminium Facades",
    facade_desc: "Highest-tier engineering solutions for corporate headquarters, retail complexes, hospitals, and modern villas with concealed profiles.",
    spec_std_eu: "European Standard",
    spec_glass_solar: "Solar-Control Glass",
    spec_prof_alu: "Aluminium Profiles",
    spec_seal_struct: "Structural Sealant",
    spec_wind_res: "Wind Load Resistance",
    facade_f1_cat: "ARCHITECTURAL AESTHETICS",
    facade_f1_title: "Seamless Glass Wall Effect",
    facade_f1_desc: "Concealed structural clamping profiles create a seamless glass envelope with no visible exterior frame breaks, lending monumental architectural stature.",
    facade_f2_cat: "SOLAR PERFORMANCE",
    facade_f2_title: "4-Season Solar Control Glass",
    facade_f2_desc: "High-selectivity Stopsol and Low-E glass units reflect intense summer radiant heat while retaining interior warmth throughout winter.",
    facade_caption: "Structural Facades • LANI KOMPANI",
    facade_f3_cat: "ENGINEERED SEALING",
    facade_f3_title: "Certified Structural Silicone",
    facade_f3_desc: "Precision structural silicone bonding resistant to severe UV radiation, high seismic vibration, and typhoon-strength winds compliant with EN 13830.",
    facade_f4_cat: "CONCEALED VENTILATION",
    facade_f4_title: "Integrated Opening Sashes",
    facade_f4_desc: "Parallel or top-hung concealed opening vents integrated invisibly into the facade grid for natural air ventilation without disrupting aesthetics.",
    facade_cta: "Inquire for Structural Facades",

    // Section 5: Roller Shutters
    shutter_badge: "SMART PROTECTION & ALUBOND",
    shutter_title: "Aluminium Roller Shutters & Alubond Cladding",
    shutter_desc: "Exterior and interior insulated aluminium roller shutters with high-density polyurethane core, motorized smart controls and Alubond cladding.",
    spec_foam_core: "PU Foam Core",
    spec_smart_motor: "Remote Smart Motor",
    spec_thermal_save: "Thermal Protection",
    spec_fire_res: "Fire Resistant",
    spec_colors_wood: "RAL Colors & Woodgrain",
    shutter_f1_cat: "THERMAL SHIELD & ACOUSTICS",
    shutter_f1_title: "Foam-Insulated Aluminium Slats",
    shutter_f1_desc: "High-density polyurethane-injected aluminium slats prevent heat loss in winter and block harsh solar overheating in summer.",
    shutter_f2_cat: "INTELLIGENT AUTOMATION",
    shutter_f2_title: "Motorized Control & Smart Home",
    shutter_f2_desc: "Effortless operation via handheld remotes, wall switches, or full Smart Home smartphone integration with scheduled automation routines.",
    shutter_caption: "Shutters & Alubond • LANI KOMPANI",
    shutter_f3_cat: "SECURITY & PRIVACY",
    shutter_f3_title: "Enhanced Security & Total Blackout",
    shutter_f3_desc: "Robust physical barrier against intruders and extreme weather, providing 100% total light blackout for bedrooms whenever needed.",
    shutter_f4_cat: "FACADE CLADDING",
    shutter_f4_title: "Modern Alubond Panel Cladding",
    shutter_f4_desc: "Premium 4mm composite aluminium cladding panels for modern building envelopes, engineered for maximum weather durability and fire resistance.",
    shutter_cta: "Inquire for Shutters & Alubond",

    // Promo Cards
    promo1_title: "Certified Materials",
    promo1_btn: "View Details",
    promo2_title: "Meet LANI KOMPANI",
    promo2_btn: "About Company",
    promo3_title: "Our Product Universe",
    promo3_btn: "View Products",

    // Quote Form
    form_heading: "Request a Fast Quotation",
    form_sub: "Fill in your specifications and send your inquiry directly via WhatsApp or Email.",
    form_name_lbl: "Full Name *",
    form_name_ph: "e.g. John Smith",
    form_phone_lbl: "Phone Number *",
    form_phone_ph: "e.g. +389 7X XXX XXX",
    form_city_lbl: "City / Location",
    form_city_ph: "e.g. Lipkovo, Kumanovo, Skopje...",
    form_service_lbl: "Select Product *",
    form_opt_default: "Choose a product...",
    form_opt_pvc: "PVC Windows & Doors",
    form_opt_schuco: "Schüco LivIng 82 MD Windows & Doors",
    form_opt_kom: "Kömmerling 76 MD Windows & Doors",
    form_opt_slide: "Sliding Systems",
    form_opt_alu: "Aluminium (ALU) Windows & Doors",
    form_opt_facade: "Structural Glass Facades",
    form_opt_alubond: "Aluminium / Alubond Facades",
    form_opt_shutter: "Aluminium Shutters & Grilles",
    form_opt_all: "Other / Complete Project",
    form_height_lbl: "Height (cm)",
    form_height_ph: "e.g. 140",
    form_width_lbl: "Width (cm)",
    form_width_ph: "e.g. 120",
    form_notes_lbl: "Additional notes / Quantity",
    form_notes_ph: "e.g. 2 units | Double door | preferred opening type",
    btn_send_whatsapp: "Send Instantly via WhatsApp",
    btn_send_email: "Send via Email",

    // Contact & Map
    contact_title: "Visit Our Production Workshop",
    contact_desc: "We welcome you to our facilities in Orizare, Municipality of Lipkovo to explore our profiles and architectural systems in person.",
    contact_addr_lbl: "Address:",
    contact_addr_val: "Orizare, Municipality of Lipkovo, North Macedonia",
    contact_line1_lbl: "Line 1:",
    contact_line2_lbl: "Line 2:",
    contact_email_lbl: "Email:",
    contact_hours_lbl: "Hours:",
    contact_hours_val: "Mon - Sat: 08:00 - 18:00 (Sunday: Closed)",
    btn_maps: "Navigate with Google Maps",

    // Footer
    footer_desc: "LANI KOMPANI provides an advanced, high-performance portfolio of PVC & ALU windows, doors, structural facades, and shutters in Orizare, Lipkovo and across the region.",
    footer_col_prod: "Products",
    footer_col_nav: "Navigation",
    footer_col_contact: "Official Contact",
    footer_copy_left: "© 2026 LANI KOMPANI. All rights reserved.",
    footer_copy_right: "European Standards • High-Performance Systems • Orizare, Lipkovo"
  }
};

/**
 * Apply translations to DOM elements
 * @param {string} lang - 'sq' or 'en'
 */
function applyLanguage(lang) {
  const chosenLang = (lang === 'en') ? 'en' : 'sq';
  const t = translations[chosenLang];
  document.documentElement.lang = chosenLang;

  // 1. Text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] === undefined) return;

    if (el.dataset.i18nHtml === 'true') {
      el.innerHTML = t[key];
      return;
    }

    const spanChild = el.querySelector(':scope > span:not(.flag-icon):not(.lang-code):not(.brand-tag)');
    if (spanChild) {
      spanChild.textContent = t[key];
      return;
    }

    const hasIcon = el.querySelector(':scope > i, :scope > svg');
    if (hasIcon) {
      const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
      if (textNodes.length) {
        textNodes[0].textContent = ' ' + t[key] + ' ';
        textNodes.slice(1).forEach(n => { n.textContent = ''; });
      } else {
        hasIcon.insertAdjacentText('afterend', ' ' + t[key]);
      }
      return;
    }

    el.textContent = t[key];
  });

  // 2. Input Placeholders with data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // 3. Dropdown Options with data-i18n-opt
  document.querySelectorAll('option[data-i18n-opt]').forEach(el => {
    const key = el.getAttribute('data-i18n-opt');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // 4. Titles with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key] !== undefined) {
      el.title = t[key];
    }
  });

  // 5. Update Language Switcher active status
  document.querySelectorAll('.lang-btn, .topbar-lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === chosenLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 6. Save preference
  try {
    localStorage.setItem('lani_preferred_lang', chosenLang);
  } catch (err) {
    console.warn('Could not save language preference:', err);
  }
}

/**
 * Initialize Language Switcher Listeners
 */
function initLanguageSwitcher() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    const targetLang = btn.getAttribute('data-lang');
    if (targetLang !== 'sq' && targetLang !== 'en') return;
    e.preventDefault();
    e.stopPropagation();
    applyLanguage(targetLang);
  });

  // Retrieve saved preference or default to Albanian ('sq')
  let defaultLang = 'sq';
  try {
    const saved = localStorage.getItem('lani_preferred_lang');
    if (saved === 'en' || saved === 'sq') {
      defaultLang = saved;
    }
  } catch (err) {}

  applyLanguage(defaultLang);
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}
