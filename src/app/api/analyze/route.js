// ============================================================
// NAUTILUS TERMINAL -- /api/analyze/route.js
// Place at: src/app/api/analyze/route.js
// ============================================================

import { NextResponse } from 'next/server';
import { ATLAS_DB, categorizeQuery, CATEGORY_RISKS, pickBestHub } from '@/lib/database';
import { enrichWithRealTradeData } from '@/lib/comtrade';
import { rateLimit } from '@/lib/rate-limit';

// Module-level constant -- built once per cold start, not on every request
const CATEGORY_SIGNALS = {
  industrial:      ['motor','pump','valve','bearing','gearbox','shaft','seal','coupling','flange','fastener','bolt','nut','hydraulic','pneumatic','actuator','compressor','filter','conveyor','crane','hoist','magnet','neodymium','ndfeb','ferrite','rare earth','solenoid','gear','precision'],
  automotive:      ['automotive','vehicle','electric','truck','tire','tyre','brake','suspension','chassis','transmission','usmca','stamping','die-cast'],
  electronics:     ['semiconductor','chip','pcb','circuit','display','sensor','microcontroller','processor','memory','transistor','wafer','foundry','substrate'],
  metals:          ['steel','aluminum','copper','lithium','cobalt','nickel','zinc','iron','alloy','casting','forging','ingot','coil','plate','bar','wire','tube'],
  agriculture:     ['grain','wheat','corn','soybean','rice','cotton','sugar','coffee','cocoa','palm','fertilizer','pesticide','seed','crop','livestock','poultry','seafood'],
  textiles:        ['textile','apparel','cotton','polyester','nylon','garment','fabric','yarn','fiber','denim','knit','woven'],
  plastics:        ['plastic','polymer','elastomer','rubber','resin','injection','molding','abs','polypropylene','polyethylene','pvc','composite','epoxy','carbon'],
  chemicals:       ['chemical','adhesive','coating','lubricant','solvent','surfactant','reagent','acid','base','catalyst','additive','pigment'],
  packaging:       ['packaging','corrugated','carton','bottle','container','flexible','shrink','paperboard','label','blister'],
  medical:         ['pharmaceutical','medical','drug','device','surgical','clinical','gmp','sterile','generic','biosimilar','implant','diagnostic'],
  machinery:       ['machine','equipment','cnc','lathe','mill','press','robot','automation','conveyor','capital','industrial','tooling'],
  ev_battery:      ['battery','cathode','anode','electrolyte','lithium','nmc','lfp','prismatic','cylindrical','gigafactory','bms'],
  semiconductor:   ['fab','foundry','wafer','lithography','etch','deposition','tsmc','asml','mask','dram','nand','logic','analog'],
  renewable_energy:['solar','wind','panel','turbine','inverter','pv','polysilicon','blade','storage','grid'],
  food:           ['food','beverage','drink','sauce','spice','grain','dairy','meat','fish','frozen','snack','confection','nutrition'],
  wood_paper:     ['wood','timber','lumber','plywood','mdf','paper','pulp','cardboard','kraft','cellulose','veneer'],
  construction:   ['glass','cement','concrete','brick','tile','ceramic','gypsum','insulation','roofing','aggregate'],
  consumer_goods: ['consumer','personal','care','cosmetic','beauty','household','cleaning','hygiene','health','wellness'],
  aerospace:      ['aerospace','aircraft','avionics','turbine','fuselage','composite','airframe','nacelle','landing'],
  energy_oil_gas: ['oil','gas','petroleum','pipeline','refinery','drilling','wellhead','offshore','lng','lpg'],
  mining:         ['mining','ore','mineral','extraction','quarry','bauxite','manganese','chromite','phosphate'],
  luxury_goods:   ['luxury','leather','handbag','watch','jewel','diamond','gold','fashion','couture','bespoke'],
  cosmetics:      ['cosmetic','skincare','lipstick','fragrance','perfume','lotion','serum','makeup','formulation'],
  cold_chain:     ['cold','refrigerated','frozen','chilled','temperature','pharma','vaccine','perishable','reefer'],
  telecom:        ['telecom','antenna','router','switch','fiber','optic','cable','5g','tower','basestation'],
  furniture:      ['furniture','chair','table','desk','sofa','cabinet','shelf','upholstery','foam','mattress'],
  sports_outdoor: ['sports','outdoor','athletic','fitness','camping','cycling','hiking','yoga','gym','equipment'],
  toys_games:     ['toy','game','puzzle','doll','board','plush','educational','child','infant','juvenile'],
  pet_animal:     ['pet','animal','feed','veterinary','aquaculture','livestock','poultry','kibble','collar'],
  printing_media: ['print','media','ink','paper','publishing','packaging','label','flexo','offset','digital'],
  hvac:           ['hvac','heating','cooling','ventilation','air','conditioning','compressor','refrigerant','duct'],
  water_treatment:['water','treatment','filtration','membrane','purification','desalination','pump','valve'],
  defense_military:['defense','military','armament','weapon','ballistic','radar','sonar','tactical','secure'],
  maritime:       ['maritime','ship','vessel','hull','propeller','marine','naval','offshore','dock','port'],
  railway:        ['railway','rail','locomotive','rolling','stock','bogie','track','signaling','metro','tram'],
  robotics_automation:['robot','automation','cobot','gripper','servo','actuator','plc','scada','vision','lidar'],
  instruments_scientific:['instrument','scientific','lab','analytical','sensor','calibration','measurement','spectrometer'],
  glass_ceramics: ['glass','ceramic','technical','refractor','porcelain','borosilicate','fiberglass','fused'],
  paint_coatings: ['paint','coating','primer','epoxy','lacquer','varnish','pigment','binder','additive','resin'],
  nutraceuticals: ['nutraceutical','supplement','vitamin','probiotic','omega','herbal','botanical','extract','capsule'],
}

export async function POST(req) {
  const rl = await rateLimit(req, { limit: 10, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  try {
    const { material } = await req.json();

    if (typeof material !== 'string' || !material.trim() || material.length > 1000) {
      return NextResponse.json({ error: 'Material query is required' }, { status: 400 });
    }

    const query = material.trim();
    const category = categorizeQuery(query);

    if (!category) {
      return NextResponse.json({ code: 'UNCLASSIFIED_QUERY', error: 'No sourcing category matched. Add the material, product type, or application and try again.' }, { status: 422 });
    }

    // Detect low-confidence matches: query has meaningful tokens but none match known category keywords
    const queryTokens = query.toLowerCase().split(/\s+/).filter(w => w.length > 3)
    const allSignalKeywords = Object.values(CATEGORY_SIGNALS).flat()
    const anyTokenMatchesAnyCategory = queryTokens.some(t => allSignalKeywords.some(k => t.includes(k) || k.includes(t)))
    // Only flag low confidence when the query has multiple meaningful words but
    // NONE of them appear in any known category's signal keywords.
    // A non-null category from categorizeQuery is already a strong confidence signal.
    const isLowConfidence = queryTokens.length > 1 && !anyTokenMatchesAnyCategory

    const baseOpportunities = ATLAS_DB[category]
    if (!baseOpportunities?.length) {
      return NextResponse.json({ code: 'NO_HUBS', error: `No sourcing hubs found for category "${category}". The database may be missing entries for this category.` }, { status: 422 });
    }
    const selectedHubUnenriched = pickBestHub(baseOpportunities, query);
    // Surface the most relevant hub first in the browsable list too, so it
    // matches the "Primary recommendation" in the directive instead of
    // contradicting it.
    const orderedOpportunities = [selectedHubUnenriched, ...baseOpportunities.filter(h => h.id !== selectedHubUnenriched.id)];

    // Attach real UN Comtrade export figures where available. This is a
    // best-effort enrichment -- network issues or missing Comtrade coverage
    // for a given country/HS/year simply leave a hub without the badge,
    // never blocks or fails the mission scan itself.
    const enrichedOpportunities = await enrichWithRealTradeData(orderedOpportunities);

    // Compute stability_score from existing hub fields so SourcingRecommendation
    // always shows a meaningful score instead of "N/A". Scale 0-100:
    //   ESG ethical_rating -> 0-35 pts
    //   port_wait_days (lower = better) -> 0-30 pts
    //   duty_rate (0% tariff = best) -> 0-20 pts
    //   company count (more = more competition/supply) -> 0-15 pts
    const ESG_SCORE = { 'AA': 35, 'A+': 32, 'A': 28, 'A-': 25, 'B+': 20, 'B': 16, 'B-': 12, 'C': 6 }
    const opportunities = enrichedOpportunities.map(hub => {
      if (hub.stability_score != null) return hub // already set, skip
      const esg = ESG_SCORE[hub.esg?.ethical_rating] ?? 14
      const wait = hub.logistics?.port_wait_days ?? 3
      const waitPts = wait === 0 ? 30 : wait <= 1 ? 27 : wait <= 2 ? 22 : wait <= 3 ? 16 : wait <= 5 ? 10 : 4
      const dutyStr = (hub.customs?.duty_rate ?? '').toLowerCase()
      const dutyMatch = dutyStr.match(/(\d+(?:\.\d+)?)%/)
      const dutyNum = dutyMatch ? parseFloat(dutyMatch[1]) : null
      const dutyPts = (dutyStr.includes('free') || dutyNum === 0) ? 20 : dutyNum !== null && dutyNum <= 2.5 ? 17 : dutyNum !== null && dutyNum <= 5 ? 13 : dutyNum !== null && dutyNum <= 10 ? 9 : dutyNum !== null && dutyNum >= 25 ? 2 : 8
      const companyPts = Math.min(15, (hub.companies?.length ?? 0) * 2)
      return { ...hub, stability_score: Math.round(Math.min(100, esg + waitPts + dutyPts + companyPts)), stability_score_methodology: 'Composite of ESG compliance rating, port wait days, import duty rate, and active supplier count for this hub cluster. Internal heuristic — not sourced from a third-party index.' }
    })
    const selectedHub = opportunities[0];

    // Build a sharp, category-aware summary
    const categoryLabels = {
      industrial:     'industrial component',
      automotive:     'automotive part',
      electronics:    'electronic component',
      agriculture:    'agricultural commodity',
      food:           'food & beverage product',
      metals:         'metal / mineral',
      textiles:       'textile / apparel',
      plastics:       'plastic / polymer',
      chemicals:      'specialty chemical',
      packaging:      'packaging material',
      medical:        'medical / pharmaceutical',
      machinery:      'industrial machinery',
      wood_paper:     'wood / paper / pulp product',
      construction:   'glass & construction material',
      consumer_goods: 'consumer goods / personal care product',
      // Expansion categories (16-40)
      aerospace:              'aerospace / airframe component',
      energy_oil_gas:         'oil & gas equipment',
      ev_battery:             'EV battery / cell component',
      semiconductor:          'semiconductor / fab material',
      mining:                 'mined mineral / ore',
      luxury_goods:           'luxury / leather good',
      cosmetics:              'cosmetic / personal care formulation',
      cold_chain:             'cold chain / temperature-controlled item',
      renewable_energy:       'renewable energy equipment',
      telecom:                'telecom / network equipment',
      furniture:              'furniture / interior fitting',
      sports_outdoor:         'sports & outdoor product',
      toys_games:             'toy / game product',
      pet_animal:             'pet food / animal product',
      printing_media:         'printing / publishing service',
      hvac:                   'HVAC / building system',
      water_treatment:        'water treatment equipment',
      defense_military:       'defence / military system',
      maritime:               'maritime / shipbuilding item',
      railway:                'railway / rolling stock component',
      robotics_automation:    'robotics / automation equipment',
      instruments_scientific: 'scientific instrument',
      glass_ceramics:         'glass / technical ceramic',
      paint_coatings:         'paint / coating / pigment',
      nutraceuticals:         'nutraceutical / dietary supplement'
    };
    const categoryLabel = categoryLabels[category] || 'commodity';

    // Confidence based on: category match quality + Comtrade enrichment coverage + hub count
    const categoryMatched = 20
    const comtradeHits = opportunities.filter(o => o.comtrade_enriched || o.tradeValue).length
    const comtradeBonus = Math.min(30, comtradeHits * 10)
    const hubBonus = Math.min(30, opportunities.length * 6)
    const match_confidence = isLowConfidence
      ? 32
      : Math.min(92, 20 + categoryMatched + comtradeBonus + hubBonus)

    const data = {
      category,
      low_confidence: isLowConfidence,
      match_confidence,
      match_confidence_note: 'Score reflects: category match (20pts) + Comtrade live trade data coverage (up to 30pts) + sourcing hub breadth (up to 30pts). Not a statistical confidence interval.',
      directive: {
        best_region:  selectedHub.hub,
        best_partner: selectedHub.companies?.[0]?.name || 'Strategic Partner',
        route:        selectedHub.logistics?.port_wait_days === 0
                        ? 'Domestic Ground / Rail Transport'
                        : `Ocean / Air -- ${selectedHub.logistics?.port_wait_days} day avg lead time`,
        summary:
          (isLowConfidence
            ? `⚠️ No exact category match for "${query}" -- showing closest global sourcing hubs. Refine your search (e.g. add material type, application, or industry) for a precise match. `
            : `Strategic scan complete for "${query}" (${categoryLabel}). `) +
          `Identified ${opportunities.length} global sourcing hub${opportunities.length > 1 ? 's' : ''}. ` +
          `Primary recommendation: ${selectedHub.hub} -- ${selectedHub.desc.split('.')[0]}.`,
        tariff_alert:
          `HTS: ${selectedHub.customs.hts_code} | Duty: ${selectedHub.customs.duty_rate} -- ${selectedHub.customs.compliance_note}`
      },

      // Properly structured risks -- each has id, title, desc, severity, mitigation, type
      risks: CATEGORY_RISKS[category] || [],

      opportunities,

      market_data: {
        match_confidence,
        currency: { pair: 'USD/INDEX', rate: 104.2, impact: 'Stable', stale_as_of: '2026-09', note: 'Reference rate — verify with live DXY' },
        price_history: null,
        price_history_note: 'Historical price chart unavailable — real-time price indices require a paid data subscription (Bloomberg, Refinitiv, or OPIS). Use the Commodities panel for current spot prices.',
        price_history_source_links: [
          { label: 'World Bank Commodity Prices', url: 'https://www.worldbank.org/en/research/commodity-markets' },
          { label: 'IMF Primary Commodity Prices', url: 'https://www.imf.org/en/Research/commodity-prices' },
        ],
        rfq_template:
          `Dear Procurement Team,\n\nWe are ${selectedHub.companies[0]?.name ? `requesting a quote from ${selectedHub.companies[0].name} and your team` : 'initiating a sourcing inquiry'} for the following requirement:\n\nMaterial / Component: ${query}\nApplication: [Describe your end-use application]\nEstimated Annual Volume: [Units / MT / pieces]\nRequired Delivery: [Target date]\nIncoterm Preference: [DDP / FOB / CIF]\n\nPlease provide:\n1. Unit pricing (at 3 volume tiers)\n2. Lead time (standard and expedited)\n3. Freight and insurance terms\n4. ESG / sustainability certification status\n5. Country of origin and HTS classification\n\nWe look forward to your response within 5 business days.\n\nBest regards,\n[Your Name]\n[Company] Procurement Team`
      }
    };

    return NextResponse.json(data);

  } catch (error) {
    console.error('[NAUTILUS] Analyze API error:', error);
    return NextResponse.json(
      { error: 'Strategy scan failed. Please retry.' },
      { status: 500 }
    );
  }
}
