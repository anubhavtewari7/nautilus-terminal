"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLiveData } from '@/hooks/useLiveData'
import { useMissionHistory } from '@/hooks/useMissionHistory'
import Globe from '@/components/Globe'
import TariffLookup from '@/components/TariffLookup'
import MissionHistory from '@/components/MissionHistory'
import SupplierComparison from '@/components/SupplierComparison'
import IncotermsCalc from '@/components/IncotermsCalc'
import TradeRiskScore from '@/components/TradeRiskScore'
import PortStatus from '@/components/PortStatus'
import ComplianceChecklist from '@/components/ComplianceChecklist'
import TLCCalculator from '@/components/TLCCalculator'
import BomAnalyzer from '@/components/BomAnalyzer'
import SanctionsChecker from '@/components/SanctionsChecker'
import OceanFreightRates from '@/components/OceanFreightRates'
import FtaChecker from '@/components/FtaChecker'
import TariffCalculator from '@/components/TariffCalculator'
import CurrencyImpactCalc from '@/components/CurrencyImpactCalc'
import DualUseChecker from '@/components/DualUseChecker'
import SourcingRecommendation from '@/components/SourcingRecommendation'
import Link from 'next/link'
import NautilusLogo from '@/components/NautilusLogo'
import GuidedTour from '@/components/GuidedTour'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getLandedCostDefaults } from '@/lib/procurement-costs'
import {
  HUB_UTC_OFFSETS, hubDayStatus,
  CHOKEPOINTS, getRelevantChokepoints,
  PORT_RISK, HUB_CONTINENTS, HUB_COUNTRIES, HUB_REGIONS,
} from '@/lib/terminal-data'
import { DATA_REFRESH_MS, SCAN_TIMEOUT_MS, MAX_MISSION_HISTORY } from '@/lib/terminal-constants'
import { scoreClasses, severityStyle } from '@/lib/scoring'
import {
  Shield, ShieldAlert, Zap, ChevronRight, ChevronDown, ChevronUp,
  Pause, Play, Newspaper, X, Target, Factory, Map,
  ExternalLink, FileText, Ship, Leaf, BarChart3, Mail,
  Anchor, Clock, ArrowUpRight, ArrowDownRight, SearchCode,
  History, Scale, TrendingUp, Activity, DollarSign, Download,
  AlertTriangle, CheckCircle, Info, Calculator, ShieldOff, Sun, Moon, Layers, RotateCcw,
  Eye, Flame, Waves, Globe2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Live risk mergers ──
// Each function fetches a live data source and splices its risk objects into
// the running risk list. Called after every scan. Silent on error.

async function fetchAndMergeEarthquakeRisks(baseRisks) {
  try {
    const res = await fetch('/api/earthquakes')
    if (!res.ok) return baseRisks
    const data = await res.json()
    const eqRisks = data.risks || []
    if (eqRisks.length === 0) return baseRisks
    const filtered = baseRisks.filter(r => !r.id?.startsWith('eq_'))
    const highEq = eqRisks.filter(r => r.severity === 'HIGH')
    const medEq  = eqRisks.filter(r => r.severity !== 'HIGH')
    return [...highEq, ...filtered, ...medEq]
  } catch {
    return baseRisks
  }
}

// NASA FIRMS -- active wildfire hotspots near supply-chain sourcing regions
async function fetchAndMergeWildfireRisks(baseRisks) {
  try {
    const res = await fetch('/api/wildfires')
    if (!res.ok) return baseRisks
    const data = await res.json()
    const fireRisks = data.risks || []
    if (fireRisks.length === 0) return baseRisks
    // Remove stale fire entries, then prepend HIGH fires, append others
    const filtered = baseRisks.filter(r => !r.id?.startsWith('fire_'))
    const highFire = fireRisks.filter(r => r.severity === 'HIGH')
    const medFire  = fireRisks.filter(r => r.severity !== 'HIGH')
    return [...highFire, ...filtered, ...medFire]
  } catch {
    return baseRisks
  }
}

// ACLED -- armed conflict, organized crime, and geopolitical incident data
async function fetchAndMergeIncidentRisks(baseRisks) {
  try {
    const res = await fetch('/api/incidents')
    if (!res.ok) return baseRisks
    const data = await res.json()
    const incidentRisks = data.incidents || []
    if (incidentRisks.length === 0) return baseRisks
    // Remove stale acled entries, then prepend HIGH incidents, append others
    const filtered = baseRisks.filter(r => !r.id?.startsWith('acled_'))
    const highInc = incidentRisks.filter(r => r.severity === 'HIGH')
    const medInc  = incidentRisks.filter(r => r.severity !== 'HIGH')
    // Incidents go after earthquakes + fires (prepended above) but before base risks
    return [...filtered.filter(r => r.severity === 'HIGH'), ...highInc, ...filtered.filter(r => r.severity !== 'HIGH'), ...medInc]
  } catch {
    return baseRisks
  }
}

// ── Source attribution tooltip ──────────────────────────────────────────────
// Renders a small ⓘ icon that reveals a tooltip on hover explaining the data
// source and methodology for a given panel. Positioned above the icon so it
// never gets clipped by the viewport edge.
function SourceTooltip({ text }) {
  const [pos, setPos] = React.useState(null)
  const ref = React.useRef(null)

  const handleEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect()
      // position below the icon; clamp so it doesn't overflow the right edge
      const tooltipW = 240
      const left = Math.min(r.left, window.innerWidth - tooltipW - 8)
      setPos({ top: r.bottom + 4, left })
    }
  }

  return (
    <span
      ref={ref}
      className="inline-flex items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setPos(null)}
    >
      <span className="text-xs text-slate-400 hover:text-cyan-400 cursor-help select-none leading-none">ⓘ</span>
      {pos && typeof document !== 'undefined' && createPortal(
        <span
          style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999, width: 240 }}
          className="bg-[#111827] border border-white/15 text-slate-300 text-[10px] leading-relaxed p-2.5 rounded-lg shadow-2xl pointer-events-none whitespace-normal font-sans font-normal normal-case tracking-normal"
        >
          {text}
        </span>,
        document.body
      )}
    </span>
  )
}

export default function Dashboard() {
  // profile.material tracks the last searched commodity -- the only field actually used
  const [profile, setProfile] = useState({ material: 'Global Resources' })

  const { news, newsLoading, fxData, commodities, metalsTs, apiErrCount, refreshFx } = useLiveData()
  const { missionHistory, saveMission, clearHistory } = useMissionHistory()

  const [risks, setRisks] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [newsFilter, setNewsFilter] = useState('all')
  const [missionKeywords, setMissionKeywords] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [autoRotate, setAutoRotate]           = useState(true)
  const [showChokepoints, setShowChokepoints] = useState(true)
  const [showDayNight, setShowDayNight]       = useState(true)
  const [showThreats, setShowThreats]         = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [scanError, setScanError] = useState(null)
  const intelAbortRef = useRef(null)
  // (terminalLogs state removed -- logs were never rendered, causing unnecessary re-renders on every scan step)
  const [directive, setDirective] = useState(null)
  const [marketData, setMarketData] = useState(null)
  const [showRFQ, setShowRFQ] = useState(false)
  const [showTariff, setShowTariff] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [showIncoterms, setShowIncoterms] = useState(false)
  const [showRisk, setShowRisk] = useState(false)
  const [showPorts, setShowPorts] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)
  const [showTLC, setShowTLC] = useState(false)
  const [showBom, setShowBom] = useState(false)
  const [showSanctions, setShowSanctions] = useState(false)
  const [showOcean, setShowOcean] = useState(false)
  const [showFta, setShowFta] = useState(false)
  const [showTariffCalc, setShowTariffCalc] = useState(false)
  const [showCurrencyCalc, setShowCurrencyCalc] = useState(false)
  const [showDualUse, setShowDualUse] = useState(false)
  const [showRecommendation, setShowRecommendation] = useState(false)
  const [activeTab, setActiveTab] = useState('sourcing')
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [turnoverFilter, setTurnoverFilter] = useState(null)
  const [showTour, setShowTour] = useState(false)
  const [activeMobileTab, setActiveMobileTab] = useState('intel')
  const [threatsCollapsed, setThreatsCollapsed] = useState(false)
  const [hubsCollapsed, setHubsCollapsed] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [intelBrief, setIntelBrief] = useState(null)
  const [intelLoading, setIntelLoading] = useState(false)
  const [hubNav, setHubNav] = useState({ level: 'continent', continent: null, country: null, region: null })
  const [marketIntelMeta, setMarketIntelMeta] = useState(null) // { ageDays, latestTimestamp }

  // ── Surveillance tab state ──
  const [survFires,        setSurvFires]        = useState([])
  const [survSeismic,      setSurvSeismic]      = useState([])
  const [showSurvFires,    setShowSurvFires]    = useState(true)
  const [showSurvSeismic,  setShowSurvSeismic]  = useState(true)

  // Map hub name string → ISO2 for stability badge lookup
  function getHubISO2(hubName) {
    const n = (hubName || '').toLowerCase()
    const map = {
      china:'CN', japan:'JP', mexico:'MX', vietnam:'VN', india:'IN',
      germany:'DE', 'united states':'US', usa:'US', taiwan:'TW',
      'south korea':'KR', korea:'KR', malaysia:'MY', thailand:'TH',
      bangladesh:'BD', indonesia:'ID', brazil:'BR', turkey:'TR',
      poland:'PL', italy:'IT', france:'FR', 'united kingdom':'GB',
      uk:'GB', netherlands:'NL', belgium:'BE', spain:'ES', canada:'CA',
      singapore:'SG', philippines:'PH',
    }
    for (const [k, v] of Object.entries(map)) { if (n.includes(k)) return v }
    return null
  }

  // Fire-and-forget intel fetch after a scan completes.
  // AbortController cancels any previous in-flight request so stale results
  // from a prior scan can never overwrite results from the current one.
  function triggerIntelFetch(opps, query) {
    if (intelAbortRef.current) intelAbortRef.current.abort()
    const controller = new AbortController()
    intelAbortRef.current = controller

    setIntelBrief(null)
    setIntelLoading(true)
    fetch('/api/intel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunities: opps, query }),
      signal: controller.signal,
    }).then(r => r.json()).then(data => {
      if (!data.error) setIntelBrief(data)
    }).catch(err => {
      if (err.name !== 'AbortError') console.error('[intel]', err)
    }).finally(() => setIntelLoading(false))
  }



  useEffect(() => {
    try {
      if (!localStorage.getItem('atlas_tour_done')) {
        setTimeout(() => setShowTour(true), 800)
      }
    } catch {}
  }, [])

  // addLog removed -- no log panel in the UI, use console.log for debugging instead
  const addLog = (msg) => { if (process.env.NODE_ENV === 'development') console.debug('[NAUTILUS]', msg) }

  // Live data (news/fx/commodities) and mission history are managed by
  // useLiveData() and useMissionHistory() hooks above.

  // Auto-run scan from URL ?q= param (enables shareable scan links)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('q')
      if (q) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchQuery(q)
        setTimeout(() => handleSearch(null, q), 600)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch market-data staleness metadata on mount
  useEffect(() => {
    fetch('/api/market-data')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(d => {
        if (d.ageDays !== undefined) setMarketIntelMeta({ ageDays: d.ageDays, latestTimestamp: d.latestTimestamp })
      })
      .catch(() => {}) // non-critical; silently ignore
  }, [])

  // Fetch surveillance data when tab is active
  useEffect(() => {
    if (activeTab !== 'surveillance') return
    let cancelled = false

    async function fetchFiresAndSeismic() {
      try {
        const [fireRes, eqRes] = await Promise.all([
          fetch('/api/wildfires'),
          fetch('/api/earthquakes'),
        ])
        const [fireData, eqData] = await Promise.all([fireRes.json(), eqRes.json()])
        if (!cancelled) {
          setSurvFires((fireData.risks || []).filter(r => r.lat && r.lng))
          setSurvSeismic((eqData.risks || []).filter(r => r.lat && r.lng))
        }
      } catch {}
    }

    fetchFiresAndSeismic()
    const envInterval = setInterval(fetchFiresAndSeismic, 300000) // fires/seismic every 5 min
    return () => { cancelled = true; clearInterval(envInterval) }
  }, [activeTab])

  const buildMissionKeywords = (query, category) => {
    const categoryKeywords = {
      // Core categories
      industrial:          ['magnet','rare earth','neodymium','critical mineral','mining','sintered','ferrite','ndfeb','motor','pump','valve','bearing','seal','coupling','flange','fastener','hydraulic','pneumatic','actuator'],
      automotive:          ['automotive','vehicle','ev ','electric vehicle','car ','tariff','usmca','tier-1','auto','brake','suspension','chassis','transmission','stamping','die-cast','oem','tier1','tier2'],
      electronics:         ['semiconductor','chip','tsmc','taiwan','wafer','foundry','pcb','display','sensor','microcontroller','processor','memory','transistor','substrate','smt','pick-and-place'],
      metals:              ['steel','aluminum','copper','lithium','cobalt','nickel','zinc','iron','alloy','casting','forging','ingot','coil','plate','bar','wire','tube','commodity','mining','metal'],
      agriculture:         ['food','agricultural','soybean','beef','grain','crop','farming','commodity','wheat','corn','rice','cotton','sugar','coffee','cocoa','palm','fertilizer','pesticide','seed','livestock','poultry','seafood'],
      textiles:            ['textile','apparel','cotton','fashion','garment','fiber','yarn','polyester','nylon','denim','knit','woven','technical fabric','spandex','fleece'],
      plastics:            ['plastic','polymer','elastomer','rubber','resin','injection','molding','moulding','tpe','abs','polypropylene','polyethylene','pvc','nylon','composite','epoxy','carbon fiber','fiberglass'],
      chemicals:           ['chemical','adhesive','coating','lubricant','solvent','surfactant','specialty chemical','reach','paint','primer','grease','acid','base','catalyst','additive','pigment','reagent'],
      packaging:           ['packaging','corrugated','label','carton','bottle','container','flexible pouch','shrink','paperboard','glass bottle','blister','sachet','retort'],
      medical:             ['pharmaceutical','medical','drug','api','device','surgical','clinical','fda','gmp','sterile','generic','biosimilar','implant','diagnostic','cro','cdmo','510k'],
      machinery:           ['pump','valve','compressor','cnc','machine tool','automation','robot','conveyor','gearbox','heat exchanger','capital equipment','lathe','mill','press','tooling'],
      wood_paper:          ['wood','lumber','timber','pulp','paper','cardboard','mdf','plywood','OSB','furniture board','kraft','newsprint','tissue','cellulose'],
      construction:        ['glass','concrete','cement','rebar','structural steel','insulation','gypsum','tile','flooring','cladding','curtain wall','facade','tempered glass','laminated glass'],
      consumer_goods:      ['consumer goods','household','cleaning','personal care','hygiene','shampoo','detergent','cosmetic','beauty','home care','FMCG','mass market'],
      food:                ['food','beverage','drink','snack','dairy','bakery','confectionery','frozen','canned','organic','ready-to-eat','ingredient','flavoring','additive'],
      // Expansion categories
      aerospace:           ['aerospace','airframe','aerostructure','avionics','landing gear','nacelle','rotor','fuselage','composite aerostructure','as9100','nadcap','fastener aerospace','titanium aerospace'],
      energy_oil_gas:      ['oil','gas','LNG','LPG','pipeline','refinery','subsea','wellhead','offshore','drilling','oilfield','petrochemical','FPSO','midstream','downstream'],
      ev_battery:          ['battery','cathode','anode','electrolyte','lithium-ion','NMC','LFP','prismatic','cylindrical','pouch cell','gigafactory','BMS','battery pack','cell chemistry'],
      semiconductor:       ['fab','foundry','wafer','lithography','etch','deposition','TSMC','ASML','mask','DRAM','NAND','logic','analog','OSAT','OSP','advanced packaging','CoWoS','HBM'],
      mining:              ['ore','mine','mineral','extraction','tailings','heap leach','flotation','smelter','refinery','concentrate','cobalt mine','lithium mine','copper mine','iron ore','bauxite'],
      luxury_goods:        ['luxury','leather','handbag','haute couture','fine watch','jewelry','gems','diamond','sapphire','fine leather','LVMH','Hermes','Gucci','bespoke'],
      cosmetics:           ['cosmetic','beauty','fragrance','perfume','skincare','makeup','lipstick','foundation','serum','formulation','EU cosmetics regulation','ISO 22716','cruelty-free'],
      cold_chain:          ['cold chain','refrigerated','frozen logistics','temperature-controlled','reefer','blast freeze','pharmaceutical cold chain','vaccine logistics','dry ice','GDP pharma'],
      renewable_energy:    ['solar','wind','panel','turbine','inverter','PV','polysilicon','blade','storage','grid','offshore wind','onshore wind','solar farm','bifacial','tracker'],
      telecom:             ['telecom','5G','antenna','base station','fiber optic','cable','router','switch','data center','network equipment','RAN','spectrum','MIMO','beamforming'],
      furniture:           ['furniture','office furniture','chair','desk','table','wardrobe','cabinet','upholstery','foam','flat-pack','RTA','BIFMA','contract furniture'],
      sports_outdoor:      ['sports','outdoor','athletic','fitness','gym','bicycle','cycling','camping','hiking','climbing','water sports','team sports','protective gear','sports apparel'],
      toys_games:          ['toy','game','puzzle','doll','action figure','board game','electronic toy','ASTM F963','EN 71','CE toys','plush','ride-on','construction toy'],
      pet_animal:          ['pet food','animal feed','veterinary','livestock supplement','pet care','aquafeed','poultry feed','pet treat','AAFCO','FEDIAF'],
      printing_media:      ['printing','publishing','ink','toner','offset','digital print','label print','flexographic','gravure','packaging print','wide format'],
      hvac:                ['HVAC','heat pump','chiller','air handling','VRF','ductwork','refrigerant','cooling tower','boiler','fan coil','AHU','ASHRAE','F-gas'],
      water_treatment:     ['water treatment','membrane','RO','filtration','UV disinfection','wastewater','desalination','ion exchange','coagulation','sludge','potable water'],
      defense_military:    ['defense','military','armament','munition','armoured','ballistic','radar','sonar','UAV','drone','optronic','night vision','ITAR','EAR','DDTC'],
      maritime:            ['maritime','shipbuilding','vessel','hull','propeller','marine engine','deck equipment','offshore','VLCC','container ship','LNG carrier','IMO','classification society'],
      railway:             ['railway','rolling stock','locomotive','railcar','bogie','rail','track','signaling','ETCS','ERTMS','catenary','traction','metro','high-speed rail'],
      robotics_automation: ['robot','cobot','gripper','servo','PLC','SCADA','vision system','pick-and-place automation','AMR','AGV','end-effector','industrial robot','collaborative robot'],
      instruments_scientific: ['instrument','analytical','spectrometer','chromatograph','microscope','oscilloscope','sensor calibration','metrology','laboratory','medical diagnostic','scientific equipment'],
      glass_ceramics:      ['glass','ceramic','technical ceramic','advanced ceramic','alumina','zirconia','silicon carbide','borosilicate','quartz','optical glass','specialty glass'],
      paint_coatings:      ['paint','coating','varnish','lacquer','powder coat','electrocoat','marine coating','protective coating','industrial paint','architectural coating','VOC compliance'],
      nutraceuticals:      ['nutraceutical','supplement','vitamin','mineral supplement','protein powder','omega-3','probiotic','botanical extract','herbal','dietary supplement','DSHEA','GMP nutraceutical'],
    }
    const base = categoryKeywords[category] || []
    // also extract significant words from the raw query (4+ chars, not stopwords)
    const stopwords = new Set(['with','from','for','that','this','into','and','the','are','its','they','have','will','been','used','using'])
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !stopwords.has(w))
    setMissionKeywords([...new Set([...base, ...queryWords])])
  }

  const replayMission = (mission) => {
    setSearchQuery(mission.query)
    handleSearch(null, mission.query)
  }

  const filteredNews = (() => {
    if (newsFilter === 'mission' && missionKeywords.length) {
      // Sort: mission-relevant first, then all others — never hide content
      const relevant = []
      const rest = []
      for (const item of news) {
        const text = `${item.title} ${item.description}`.toLowerCase()
        if (missionKeywords.some(kw => text.includes(kw))) relevant.push({ ...item, _mission: true })
        else rest.push(item)
      }
      return [...relevant, ...rest]
    }
    return news.filter(item => {
      const text = `${item.title} ${item.description}`.toLowerCase()
      if (newsFilter === 'all') return true
      const filters = {
        china:  ['china','chinese','beijing','shanghai'],
        eu:     ['europe','european','eu ','german','french','rotterdam'],
        usa:    ['usa','united states','american','washington','port of'],
        latam:  ['brazil','mexico','latin','colombia','chile','argentina'],
        india:  ['india','indian','delhi','mumbai','chennai']
      }
      return (filters[newsFilter] || []).some(kw => text.includes(kw))
    })
  })()

  async function handleSearch(e, overrideQuery) {
    if (e) e.preventDefault()
    const activeQuery = overrideQuery ?? searchQuery
    if (!activeQuery.trim()) return

    setIsAnalyzing(true)
    setScanError(null)
    setSelectedNode(null)
    setSearchQuery(activeQuery)
    addLog(`[SCAN] Initiating: "${activeQuery}"`)
    addLog('[AI] Mapping global industrial hubs...')
    // Push query to URL so scan is shareable
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('q', activeQuery)
      window.history.replaceState({}, '', url.toString())
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), SCAN_TIMEOUT_MS)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material: activeQuery }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)

      const data = await res.json()
      if (res.status === 400 || res.status === 422) {
        setScanError(data.error || 'Please refine the product description.')
        setShowSearch(true)
        return
      }
      if (!res.ok) throw new Error(`API error ${res.status}`)

      if (data.opportunities?.length > 0) {
        const eqRisks   = await fetchAndMergeEarthquakeRisks(data.risks || [])
        const fireRisks = await fetchAndMergeWildfireRisks(eqRisks)
        const mergedRisks = await fetchAndMergeIncidentRisks(fireRisks)
        setRisks(mergedRisks)
        setOpportunities(data.opportunities)
        setActiveMobileTab('hubs')
        setActiveTab('sourcing')   // auto-switch desktop to Sourcing tab on scan complete
        setDirective(data.directive || null)
        setMarketData(data.market_data || null)
        addLog(`[SUCCESS] Scan complete. ${data.opportunities.length} hubs identified.`)
        if (data.category) addLog(`[INFO] Category: ${data.category.toUpperCase()}`)
        saveMission(activeQuery, data.opportunities, data.directive)
        setShowSearch(false)
        setProfile(prev => ({ ...prev, material: activeQuery }))
        buildMissionKeywords(activeQuery, data.category)
        setNewsFilter('mission')
        triggerIntelFetch(data.opportunities, activeQuery)
        return
      }
      throw new Error('No opportunities returned')

    } catch (err) {
      clearTimeout(timeoutId)
      addLog('[WARN] Server scan delayed. Activating local intelligence mode...')

      let catalog
      try {
        catalog = await import('@/lib/database')
      } catch {
        setScanError('The sourcing service and local catalog are unavailable. Please reconnect and retry.')
        setShowSearch(true)
        return
      }
      const cat = catalog.categorizeQuery(activeQuery)
      const baseHubs = catalog.ATLAS_DB[cat]
      if (!baseHubs?.length) {
        setScanError('No sourcing category matched. Add the material, product type, or application and try again.')
        setShowSearch(true)
        return
      }
      const fallbackRisks = catalog.CATEGORY_RISKS[cat] || []
      const selectedHub = catalog.pickBestHub(baseHubs, activeQuery)
      const hubs = [selectedHub, ...baseHubs.filter(h => h.id !== selectedHub.id)]

      const fbDir = {
        best_region:  selectedHub.hub,
        best_partner: selectedHub.companies[0]?.name || 'Strategic Partner',
        route:        selectedHub.logistics.port_wait_days === 0
                        ? 'Domestic Ground Transport'
                        : 'Global Logistics Corridor',
        summary:      `Local intelligence mode: ${hubs.length} strategic hubs identified for "${activeQuery}". Primary recommendation: ${selectedHub.hub}.`,
        tariff_alert: `HTS: ${selectedHub.customs.hts_code} | Duty: ${selectedHub.customs.duty_rate} — ${selectedHub.customs.compliance_note}`
      }

      setOpportunities(hubs)
      setActiveMobileTab('hubs')
      setActiveTab('sourcing')
      const eqFallbackRisks   = await fetchAndMergeEarthquakeRisks(fallbackRisks)
      const fireFallbackRisks = await fetchAndMergeWildfireRisks(eqFallbackRisks)
      const mergedFallbackRisks = await fetchAndMergeIncidentRisks(fireFallbackRisks)
      setRisks(mergedFallbackRisks)
      setDirective(fbDir)
      setMarketData({
        confidence_score: 60,
        currency: { pair: 'USD/INDEX', rate: 104.2, impact: 'Stable' },
        price_history: null,
        price_history_note: 'Price chart unavailable — server intelligence offline. Visit worldbank.org/en/research/commodity-markets for current price indices.',
        rfq_template: `Dear Procurement Team,\n\nWe are initiating a sourcing inquiry for: ${activeQuery}.\n\nPlease provide unit pricing, lead time, freight terms, and ESG certification status.\n\nEstimated Annual Volume: [Insert]\nIncoterm Preference: [DDP / FOB / CIF]\n\nBest regards,\n[Your Name] — Procurement`
      })
      saveMission(activeQuery, hubs, fbDir)
      setShowSearch(false)
      setProfile(prev => ({ ...prev, material: activeQuery }))
      buildMissionKeywords(activeQuery, cat)
      setNewsFilter('mission')
      triggerIntelFetch(hubs, activeQuery)
      addLog(`[LOCAL] ${hubs.length} hubs loaded via local intelligence.`)

    } finally {
      setIsAnalyzing(false)
    }
  }

  const exportToPDF = async () => {
    if (!opportunities.length) return
    setIsExportingPDF(true)
    addLog('[SYSTEM] Generating Executive Mission Brief (PDF)...')
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF('p', 'mm', 'a4')

      const BG = [10, 10, 10]
      let yPos = 20
      const newPage = () => {
        doc.addPage()
        doc.setFillColor(...BG)
        doc.rect(0, 0, 210, 297, 'F')
        yPos = 20
      }
      const ensureSpace = (needed) => { if (yPos + needed > 278) newPage() }
      const sectionHeader = (label, rgb) => {
        ensureSpace(16)
        yPos += 4
        doc.setFillColor(...rgb)
        doc.rect(20, yPos - 4, 3, 10, 'F')
        doc.setTextColor(...rgb)
        doc.setFontSize(11)
        doc.text(label, 26, yPos + 3)
        yPos += 12
      }
      const row = (label, value, labelColor = [150,150,150], valueColor = [220,220,220]) => {
        ensureSpace(7)
        doc.setFontSize(8.5)
        doc.setTextColor(...labelColor)
        doc.text(label, 26, yPos)
        doc.setTextColor(...valueColor)
        const wrapped = doc.splitTextToSize(String(value), 120)
        doc.text(wrapped, 90, yPos)
        yPos += wrapped.length * 5 + 1
      }

      // ── PAGE 1: COVER ──────────────────────────────────────────────────────
      doc.setFillColor(...BG)
      doc.rect(0, 0, 210, 297, 'F')
      // accent bar
      doc.setFillColor(56, 189, 248)
      doc.rect(0, 0, 6, 297, 'F')

      doc.setTextColor(56, 189, 248)
      doc.setFontSize(28)
      doc.text('NAUTILUS', 20, 40)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(13)
      doc.text('SUPPLY CHAIN INTELLIGENCE', 20, 50)

      doc.setFillColor(30, 30, 30)
      doc.rect(18, 58, 174, 0.5, 'F')

      doc.setTextColor(200, 200, 200)
      doc.setFontSize(18)
      doc.text('EXECUTIVE MISSION BRIEF', 20, 72)

      doc.setTextColor(150, 150, 150)
      doc.setFontSize(9)
      doc.text(`Mission Query:`, 20, 85)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      const missionWrapped = doc.splitTextToSize(searchQuery || profile.material, 170)
      doc.text(missionWrapped, 20, 93)

      doc.setTextColor(150, 150, 150)
      doc.setFontSize(8.5)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 105)
      doc.text(`Sourcing Hubs Identified: ${opportunities.length}`, 20, 112)
      doc.text(`Risk Factors Detected: ${risks.length}`, 20, 119)

      // Summary table on cover
      if (directive) {
        doc.setFillColor(20, 30, 20)
        doc.roundedRect(18, 130, 174, 50, 3, 3, 'F')
        doc.setTextColor(16, 185, 129)
        doc.setFontSize(9)
        doc.text('STRATEGIC RECOMMENDATION', 26, 142)
        doc.setFillColor(16, 185, 129)
        doc.rect(18, 145, 174, 0.4, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(10)
        doc.text(directive.best_region || '—', 26, 155)
        doc.setTextColor(150, 150, 150)
        doc.setFontSize(8.5)
        doc.text(`Primary Partner: ${directive.best_partner || '—'}`, 26, 163)
        const alertWrapped = doc.splitTextToSize(directive.tariff_alert || '—', 160)
        doc.text(alertWrapped, 26, 170)
      }

      doc.setTextColor(60, 60, 60)
      doc.setFontSize(7)
      doc.text('CONFIDENTIAL -- For internal procurement use only. NAUTILUS Terminal data is for strategic reference; verify with primary sources before contracting.', 20, 285, { maxWidth: 170 })

      // yPos is declared above (before closures) and reset per-page by newPage()
      yPos = 20

      // ── PAGE 2+: STRATEGIC DIRECTIVE ──────────────────────────────────────
      newPage()
      doc.setFillColor(56, 189, 248)
      doc.rect(0, 0, 6, 297, 'F')

      sectionHeader('STRATEGIC DIRECTIVE', [16, 185, 129])
      if (directive) {
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(9)
        const sumWrapped = doc.splitTextToSize(directive.summary || '', 170)
        ensureSpace(sumWrapped.length * 5 + 5)
        doc.text(sumWrapped, 26, yPos)
        yPos += sumWrapped.length * 5 + 8
        row('Recommended Hub', directive.best_region || '—', [150,150,150], [255,255,255])
        row('Primary Partner', directive.best_partner || '—', [150,150,150], [255,255,255])
        row('Tariff / Compliance', directive.tariff_alert || '—', [150,150,150], [239,200,100])
      }

      // ── SOURCING HUB DETAIL ────────────────────────────────────────────────
      sectionHeader(`SOURCING HUB ANALYSIS  (${opportunities.length} identified)`, [56, 189, 248])

      opportunities.forEach((opp, i) => {
        ensureSpace(60)
        // Hub title bar
        doc.setFillColor(20, 25, 35)
        doc.roundedRect(18, yPos - 2, 174, 10, 2, 2, 'F')
        doc.setTextColor(56, 189, 248)
        doc.setFontSize(9.5)
        doc.text(`${i + 1}.  ${opp.hub}`, 22, yPos + 5)
        yPos += 13

        // Companies
        const companyList = (opp.companies || []).map(c => c.name).join('  ·  ')
        row('Target Partners', companyList || '—', [150,150,150], [200,200,200])

        // KPI
        if (opp.industry_kpi) row(opp.industry_kpi.label, opp.industry_kpi.value, [150,150,150], [16,185,129])

        // Customs
        if (opp.customs) {
          row('HTS Code', opp.customs.hts_code || '—')
          row('Duty Rate', opp.customs.duty_rate || '—', [150,150,150], [239,200,100])
          const complianceWrapped = doc.splitTextToSize(opp.customs.compliance_note || '—', 120)
          ensureSpace(complianceWrapped.length * 5 + 3)
          doc.setFontSize(8.5)
          doc.setTextColor(150, 150, 150)
          doc.text('Compliance', 26, yPos)
          doc.setTextColor(200, 200, 200)
          doc.text(complianceWrapped, 90, yPos)
          yPos += complianceWrapped.length * 5 + 2
        }

        // Logistics
        if (opp.logistics) {
          row('Port Lead Time', `${opp.logistics.port_wait_days} day${opp.logistics.port_wait_days !== 1 ? 's' : ''} wait`)
          row('Est. Freight', opp.logistics.freight_cost_estimate || '—')
        }

        // ESG
        if (opp.esg) {
          row('ESG Rating', `${opp.esg.ethical_rating}  |  Carbon: ${opp.esg.carbon_footprint}`, [150,150,150], [100,220,150])
          const esgWrapped = doc.splitTextToSize(opp.esg.sustainability_note || '', 120)
          ensureSpace(esgWrapped.length * 5 + 3)
          doc.setFontSize(8.5)
          doc.setTextColor(150, 150, 150)
          doc.text('ESG Note', 26, yPos)
          doc.setTextColor(180, 180, 180)
          doc.text(esgWrapped, 90, yPos)
          yPos += esgWrapped.length * 5 + 2
        }

        yPos += 6
        doc.setFillColor(30, 30, 30)
        doc.rect(26, yPos, 166, 0.3, 'F')
        yPos += 6
      })

      // ── RISK ANALYSIS ──────────────────────────────────────────────────────
      if (risks.length > 0) {
        sectionHeader(`RISK ANALYSIS  (${risks.length} active)`, [239, 68, 68])
        risks.forEach((r, i) => {
          ensureSpace(28)
          const sevColor = r.severity === 'HIGH' ? [239,68,68] : r.severity === 'MEDIUM' ? [251,191,36] : [100,200,100]
          doc.setFillColor(...sevColor)
          doc.roundedRect(18, yPos - 1, 174, 8, 1, 1, 'F')
          doc.setTextColor(10, 10, 10)
          doc.setFontSize(8.5)
          doc.text(`${r.severity}  —  ${r.title}`, 22, yPos + 4)
          yPos += 11
          doc.setTextColor(200, 200, 200)
          doc.setFontSize(8.5)
          const mitWrapped = doc.splitTextToSize(`Mitigation: ${r.mitigation || '—'}`, 166)
          ensureSpace(mitWrapped.length * 5 + 4)
          doc.text(mitWrapped, 26, yPos)
          yPos += mitWrapped.length * 5 + 7
        })
      }

      // ── FX SNAPSHOT ────────────────────────────────────────────────────────
      if (fxData?.rates) {
        sectionHeader('LIVE FX RATES SNAPSHOT', [168, 85, 247])
        doc.setFontSize(8.5)
        const pairs = Object.entries(fxData.rates).slice(0, 8)
        pairs.forEach(([code, info]) => {
          ensureSpace(7)
          doc.setTextColor(168, 85, 247)
          doc.text(code, 26, yPos)
          doc.setTextColor(220, 220, 220)
          doc.text(String(info.rate ?? info), 60, yPos)
          if (info.label) {
            doc.setTextColor(130, 130, 130)
            doc.text(info.label, 90, yPos)
          }
          yPos += 6
        })
        doc.setTextColor(100, 100, 100)
        doc.setFontSize(7.5)
        doc.text(`As of: ${fxData.date || new Date().toLocaleDateString()}`, 26, yPos + 2)
        yPos += 8
      }

      // ── FOOTER on last page ────────────────────────────────────────────────
      ensureSpace(12)
      yPos = 282
      doc.setFillColor(30, 30, 30)
      doc.rect(18, yPos - 3, 174, 0.4, 'F')
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(7)
      doc.text('NAUTILUS SUPPLY CHAIN INTELLIGENCE  ·  nautilus-terminal.vercel.app  ·  For strategic reference only -- verify before contracting.', 20, yPos + 3, { maxWidth: 170 })

      doc.save(`NAUTILUS_Brief_${(searchQuery || 'Mission').replace(/\s+/g, '_')}.pdf`)
      addLog('[SUCCESS] Executive Brief generated and downloaded.')
    } catch (error) {
      console.error('PDF generation failed:', error)
      addLog('[ERROR] PDF generation failed.')
    } finally {
      setIsExportingPDF(false)
    }
  }

  // ── Node display helpers ──
  const isRisk = selectedNode?.type === 'Risk'
  const isOpportunity = selectedNode && !isRisk

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#000000] text-[#f8fafc] antialiased font-mono">

      {/* ── COMMODITY TICKER ── */}
      <div className="h-8 bg-[#050505] border-b border-white/5 flex items-center px-4 overflow-hidden shrink-0" data-tour="ticker">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mr-8 shrink-0">
          <Activity size={12} className="text-emerald-400 animate-pulse" />
          <span className="text-slate-300">Commodity Prices</span>
          <SourceTooltip text="Live prices via Yahoo Finance. 15-minute delay. For reference only — not financial advice." />
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border hidden sm:inline-block ${
            commodities?.quality === 'live' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
            commodities?.quality === 'delayed' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
            'text-slate-300 bg-white/5 border-white/10'
          }`}>
            {commodities?.quality === 'live' ? `LIVE • ${metalsTs || ''}` :
             commodities?.quality === 'delayed' ? `EOD • ${metalsTs || ''}` :
             'REF'}
          </span>
        </div>
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes ticker { 0%{transform:translate3d(0,0,0)} 100%{transform:translate3d(-50%,0,0)} }
          .animate-ticker { display:flex; animation:ticker 35s linear infinite; }
          .animate-ticker:hover { animation-play-state:paused; }
        `}} />
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker gap-10 whitespace-nowrap">
            {(() => {
              const BASE = [
                { name:'Brent Crude', unit:'/bbl',   price:'$89.24', change:'+1.2%', up:true  },
                { name:'Copper',      unit:'/lb',    price:'$4.12',  change:'+2.4%', up:true  },
                { name:'HRC Steel',   unit:'/st',    price:'$840',   change:'-0.8%', up:false },
                { name:'Aluminum',    unit:'/mt',    price:'$2,350', change:'+0.5%', up:true  },
                { name:'Lithium Carb',unit:'/mt',    price:'$14.2k', change:'-3.1%', up:false },
                { name:'NdFeB Magnet',unit:'/kg',    price:'$78',    change:'+4.2%', up:true  },
                { name:'Cotton',      unit:'/lb',    price:'$85.40', change:'+0.2%', up:true  },
                { name:'Soybeans',    unit:'/bu',    price:'$11.80', change:'-1.5%', up:false },
                { name:'Rare Earth',  unit:'/kg',    price:'$142',   change:'+6.8%', up:true  },
                { name:'Nickel',      unit:'/mt',    price:'$18.4k', change:'-0.9%', up:false },
              ];
              const items = commodities?.prices?.length ? commodities.prices : BASE;
              return [...items, ...items].map((item, i) => (
                <span key={`${item.name}-${i}`} className="inline-flex items-center gap-2 text-[11px] mr-10">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-white font-bold">{item.price}{item.unit}</span>
                  <span className={item.up ? 'text-emerald-400' : 'text-rose-400'}>{item.change}</span>
                  {commodities && !item.live && <span className="text-slate-600 text-[9px] font-mono">ref</span>}
                </span>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* ── MOBILE HEADER BAR (hidden on desktop) ── */}
      <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center rounded-md">
            <NautilusLogo size={16} />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-white">NAUTILUS</span>
        </div>
        <div className="flex-1 mx-3 text-[11px] text-sky-400 truncate text-center">
          {opportunities.length > 0 ? `${opportunities.length} hubs · ${profile.material}` : 'Supply Chain Intelligence'}
        </div>
        <button onClick={() => setShowSearch(true)}
          className="text-[11px] font-bold bg-emerald-500 text-black px-3 py-1.5 rounded-lg shrink-0 active:bg-emerald-400 transition-colors">
          SCAN
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 overflow-hidden p-2 lg:p-4 gap-2 lg:gap-4 flex-col lg:flex-row">

        {/* ── MODALS ── */}
        <ErrorBoundary label="Tools">
          <AnimatePresence>
            {showTariff    && <TariffLookup onClose={() => setShowTariff(false)} />}
            {showHistory   && <MissionHistory missions={missionHistory} onClose={() => setShowHistory(false)} onReplay={replayMission} onClear={clearHistory} />}
            {showComparison && opportunities.length > 0 && <SupplierComparison hubs={opportunities} onClose={() => setShowComparison(false)} />}
            {showIncoterms && <IncotermsCalc onClose={() => setShowIncoterms(false)} />}
            {showRisk      && <TradeRiskScore onClose={() => setShowRisk(false)} />}
            {showPorts     && <PortStatus onClose={() => setShowPorts(false)} />}
            {showCompliance && <ComplianceChecklist onClose={() => setShowCompliance(false)} />}
            {showTLC       && <TLCCalculator onClose={() => setShowTLC(false)} defaults={getLandedCostDefaults(isOpportunity ? selectedNode : opportunities[0])} />}
            {showBom       && <BomAnalyzer onClose={() => setShowBom(false)} onScan={(q) => handleSearch(null, q)} />}
            {showSanctions && <SanctionsChecker onClose={() => setShowSanctions(false)} />}
            {showOcean     && <OceanFreightRates onClose={() => setShowOcean(false)} />}
            {showFta       && <FtaChecker onClose={() => setShowFta(false)} />}
            {showTariffCalc  && <TariffCalculator onClose={() => setShowTariffCalc(false)} />}
            {showCurrencyCalc && <CurrencyImpactCalc onClose={() => setShowCurrencyCalc(false)} liveRates={fxData?.rates} rateDate={fxData?.date} ratesStale={Boolean(fxData?.stale)} />}
            {showDualUse   && <DualUseChecker onClose={() => setShowDualUse(false)} />}
            {showRecommendation && opportunities.length > 0 && (
              <SourcingRecommendation
                opportunities={opportunities}
                risks={risks}
                intelBrief={intelBrief}
                query={profile.material}
                onClose={() => setShowRecommendation(false)}
              />
            )}
                      {showResetConfirm && (
              <ResetConfirmModal
                onConfirm={() => { clearHistory(); window.location.href = '/terminal' }}
                onCancel={() => setShowResetConfirm(false)}
              />
            )}
          </AnimatePresence>
        </ErrorBoundary>

        {/* ── GUIDED TOUR ── */}
        <AnimatePresence>
          {showTour && (
            <GuidedTour
              onComplete={() => {
                setShowTour(false)
                try { localStorage.setItem('atlas_tour_done', '1') } catch {}
              }}
              onStartScan={() => setShowSearch(true)}
              onStepEnter={(id) => {
                if (id === 'risks')        setActiveTab('risk')
                if (id === 'hubs')         setActiveTab('sourcing')
                if (id === 'tabs' || id === 'surveillance') setActiveTab('sourcing')
              }}
            />
          )}
        </AnimatePresence>

        {/* ── RFQ MODAL ── */}
        <AnimatePresence>
          {showRFQ && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
              <motion.div initial={{y:20}} animate={{y:0}}
                className="bg-[#0a0a0a] border border-emerald-500/30 p-6 md:p-10 w-full max-w-3xl rounded-2xl shadow-[0_0_100px_rgba(16,185,129,0.15)] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[12px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-3">
                    <Mail size={18} /> Smart RFQ Generator
                  </h2>
                  <button onClick={() => setShowRFQ(false)} className="text-slate-300 hover:text-white active:text-white transition-colors"><X size={24} /></button>
                </div>
                <textarea readOnly rows={13} value={marketData?.rfq_template}
                  className="w-full bg-[#111] border border-white/10 p-6 text-[13px] font-mono focus:outline-none rounded-xl mb-8 leading-relaxed text-slate-300" />
                <div className="flex gap-4">
                  <button
                    onClick={() => { navigator.clipboard.writeText(marketData?.rfq_template || ''); addLog('[SYSTEM] RFQ copied to clipboard.') }}
                    className="flex-1 h-14 bg-emerald-500 text-black font-bold uppercase text-[12px] tracking-widest hover:bg-emerald-400 active:bg-emerald-400 transition-all rounded-lg">
                    Copy to Clipboard
                  </button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`RFQ: ${searchQuery || profile.material}`)}&body=${encodeURIComponent(marketData?.rfq_template || '')}`}
                    onClick={() => addLog('[SYSTEM] Opening email client with RFQ draft.')}
                    className="flex-1 h-14 border border-white/10 text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white/5 active:bg-white/5 transition-all rounded-lg flex items-center justify-center">
                    Email to Procurement
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SEARCH / MISSION MODAL ── */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div initial={{scale:0.95}} animate={{scale:1}}
                className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 w-full max-w-2xl shadow-[0_0_80px_rgba(56,189,248,0.15)] relative rounded-2xl max-h-[90vh] overflow-y-auto">
                <button onClick={() => setShowSearch(false)} className="absolute top-6 right-6 text-slate-300 hover:text-white active:text-white transition-colors">
                  <X size={24} />
                </button>
                <h2 className="text-[12px] font-bold text-sky-400 tracking-[0.3em] mb-3 flex items-center gap-3">
                  <Target size={18} /> DEFINE SOURCING MISSION
                </h2>
                <p className="text-[11px] text-slate-300 mb-8 font-sans leading-relaxed">
                  Describe what you need to procure — be specific. Include the material, application, and any constraints.
                  <br/>e.g. <span className="text-slate-300 italic">&ldquo;neodymium magnets for automotive sun visor actuators&rdquo;</span>,
                  &nbsp;<span className="text-slate-300 italic">&ldquo;food-grade soy for QSR chain supply&rdquo;</span>,
                  &nbsp;<span className="text-slate-300 italic">&ldquo;IATF-certified steel stamping for EV chassis frames&rdquo;</span>
                </p>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative">
                    <textarea
                      autoFocus rows={4} value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Describe your sourcing requirement..."
                      className="w-full bg-[#111] border border-white/10 p-6 text-[15px] font-mono focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-500 resize-none leading-relaxed rounded-xl"
                    />
                    {/* Auto-complete suggestions */}
                    {(() => {
                      const candidates = [
                        'IATF-certified brake pads for passenger vehicles',
                        'Neodymium magnets for EV motor assembly',
                        'Semiconductor wafers for automotive ECU',
                        'Food-grade soy for QSR supply chain',
                        'Titanium sponge for aerospace structural parts',
                        'Corrugated packaging boxes for e-commerce fulfillment',
                        'Thermoplastic polyurethane (TPU) pellets for injection molding',
                        'Copper cathodes for electrical wire manufacturing',
                        'Generic pharmaceutical APIs (Paracetamol & Amoxicillin)',
                        'Hydraulic pumps & valves for industrial machinery',
                        'Cotton yarn & denim fabric for garment manufacturing',
                        'Multilayer ceramic capacitors (MLCC) for circuit boards',
                        'Double-sided glass fiber woven roving for construction',
                        'Lithium hydroxide battery grade for cathode synthesis',
                        'Polyurethane coating for automotive exterior trim'
                      ]
                      const matches = searchQuery.trim()
                        ? candidates.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()) && c.toLowerCase() !== searchQuery.toLowerCase())
                        : []
                      if (matches.length === 0) return null
                      return (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c0c0c] border border-sky-500/30 rounded-xl shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto">
                          <div className="px-3 py-1.5 bg-sky-500/10 text-[9px] font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/20">
                            Auto-Complete Suggestions
                          </div>
                          {matches.map((item, idx) => (
                            <button key={idx} type="button"
                              onClick={() => setSearchQuery(item)}
                              className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-sky-500/15 hover:text-white border-b border-white/5 last:border-0 transition-colors font-mono flex items-center gap-2">
                              <span className="text-sky-400 opacity-60">🔍</span>
                              <span className="truncate">{item}</span>
                            </button>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                  {scanError && <p role="alert" className="text-sm text-amber-300">{scanError}</p>}
                  <button type="submit" disabled={isAnalyzing || !searchQuery.trim()}
                    className="w-full h-16 bg-emerald-500 text-black font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 active:bg-emerald-400 transition-all disabled:opacity-50 text-[14px] uppercase tracking-widest rounded-xl">
                    {isAnalyzing ? 'SCANNING GLOBAL DATABASE...' : 'EXECUTE INTELLIGENCE SCAN'}
                    <ChevronRight size={22} />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════
            LEFT SIDEBAR
        ════════════════════════════════════ */}
        <aside className="hidden lg:flex w-96 flex-col gap-4 shrink-0 z-10 overflow-y-auto custom-scrollbar pr-1">

          {/* Brand + Mission (compact header) */}
          <div className="bg-[#0a0a0a] border border-white/10 px-4 py-3 rounded-xl shadow-2xl shrink-0 flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 rounded-lg shrink-0">
              <NautilusLogo size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-slate-300 uppercase tracking-[0.2em] font-bold">Active Mission</div>
              <div onClick={() => setShowSearch(true)} data-tour="mission"
                className="text-[12px] font-bold text-sky-400 uppercase truncate cursor-pointer hover:text-sky-300 transition-colors"
                title="Click to start new scan">
                {profile.material}
              </div>
            </div>
            <button onClick={() => setShowSearch(true)}
              className="shrink-0 w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-lg flex items-center justify-center transition-all">
              <SearchCode size={12} />
            </button>
          </div>

          {/* ── Primary Tab Navigation — 4+4 wrap grid, all tabs visible ── */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shrink-0" data-tour="tabs">
            <div className="flex flex-wrap" data-tour="surv-tab">
              {[
                { id: 'command',      label: 'Command',  color: 'sky'     },
                { id: 'sourcing',     label: 'Sourcing', color: 'emerald' },
                { id: 'risk',         label: 'Risk',     color: 'rose'    },
                { id: 'compliance',   label: 'Comply',   color: 'amber'   },
                { id: 'cost',         label: 'Cost',     color: 'amber'   },
                { id: 'intelligence', label: 'Intel',    color: 'sky'     },
                { id: 'reports',      label: 'Reports',  color: 'purple'  },
                { id: 'surveillance', label: 'Surv',     color: 'cyan'    },
              ].map((t, idx) => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`basis-1/4 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-all border-b-2 ${
                    idx < 4 ? 'border-t-0' : 'border-t border-t-white/5'
                  } ${
                    activeTab === t.id
                      ? t.color === 'emerald' ? 'text-emerald-400 border-b-emerald-400 bg-emerald-500/5'
                      : t.color === 'rose'    ? 'text-rose-400 border-b-rose-400 bg-rose-500/5'
                      : t.color === 'amber'   ? 'text-amber-400 border-b-amber-400 bg-amber-500/5'
                      : t.color === 'purple'  ? 'text-purple-400 border-b-purple-400 bg-purple-500/5'
                      : t.color === 'cyan'    ? 'text-cyan-400 border-b-cyan-400 bg-cyan-500/5'
                      : 'text-sky-400 border-b-sky-400 bg-sky-500/5'
                      : 'border-b-transparent text-slate-300 hover:text-slate-300'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hub Stability Navigator — INTELLIGENCE tab */}
          {activeTab === 'intelligence' && (() => {
            const { level, continent, country, region } = hubNav
            const countryData = country ? HUB_REGIONS[country] : null
            const s = countryData?.score
            const sc = scoreClasses(s)
            const barColor = sc.bg
            const textColor = sc.text
            const stabilityLabel = s >= 60 ? 'Stable' : s >= 35 ? 'Moderate' : 'High Risk'
            return (
              <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl" data-tour="stability">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    <Shield size={14} /> Hub Stability
                  </h2>
                  {level !== 'continent' && (
                    <button
                      onClick={() => {
                        if (level === 'country') setHubNav({ level:'continent', continent:null, country:null, region:null })
                        else if (level === 'region') setHubNav(n => ({ ...n, level:'country', country:null, region:null }))
                        else if (level === 'hubs') setHubNav(n => ({ ...n, level:'region', region:null }))
                      }}
                      className="text-[11px] text-slate-300 hover:text-sky-400 font-mono transition-colors flex items-center gap-1">
                      ← back
                    </button>
                  )}
                </div>

                {/* Breadcrumb */}
                {level !== 'continent' && (
                  <div className="flex items-center gap-1 mb-3 flex-wrap">
                    <span className="text-[11px] text-slate-300">{continent}</span>
                    {country && <><span className="text-[11px] text-slate-300">›</span><span className="text-[11px] text-slate-300">{country}</span></>}
                    {region  && <><span className="text-[11px] text-slate-300">›</span><span className="text-[11px] text-sky-500/70">{region}</span></>}
                  </div>
                )}

                {/* Country stability bar (shown once country selected) */}
                {countryData && (
                  <div className="mb-3 p-2.5 bg-[#111] border border-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-300 uppercase">{country}</span>
                      <span className={`text-[11px] font-bold font-mono ${textColor}`}>◆ {s} / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width:`${s}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-slate-300">WB Political Stability</span>
                      <span className={`text-[11px] font-bold ${textColor}`}>{stabilityLabel}</span>
                    </div>
                  </div>
                )}

                {/* Level: Continents */}
                {level === 'continent' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {HUB_CONTINENTS.map(c => (
                      <button key={c}
                        onClick={() => setHubNav({ level:'country', continent:c, country:null, region:null })}
                        className="bg-[#111] border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 rounded-lg p-2.5 text-left transition-all group">
                        <div className="text-[11px] font-bold text-slate-300 group-hover:text-sky-400 uppercase leading-tight">{c}</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">{HUB_COUNTRIES[c]?.length} {HUB_COUNTRIES[c]?.length === 1 ? 'country' : 'countries'}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Level: Countries */}
                {level === 'country' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {(HUB_COUNTRIES[continent] || []).map(cn => {
                      const d = HUB_REGIONS[cn]
                      const cs = d?.score
                      const tc = scoreClasses(cs).text
                      return (
                        <button key={cn}
                          onClick={() => setHubNav(n => ({ ...n, level:'region', country:cn }))}
                          className="bg-[#111] border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 rounded-lg p-2.5 text-left transition-all group">
                          <div className="text-[11px] font-bold text-slate-300 group-hover:text-sky-400 uppercase leading-tight truncate">{cn}</div>
                          {cs !== undefined && <div className={`text-[11px] font-bold mt-0.5 ${tc}`}>◆ {cs}</div>}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Level: Regions/Coasts */}
                {level === 'region' && countryData && (
                  <div className="space-y-1.5">
                    {Object.keys(countryData.zones).map(zone => (
                      <button key={zone}
                        onClick={() => setHubNav(n => ({ ...n, level:'hubs', region:zone }))}
                        className="w-full bg-[#111] border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 rounded-lg p-2.5 text-left transition-all group flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-slate-300 group-hover:text-sky-400 uppercase">{zone}</div>
                          <div className="text-[11px] text-slate-300 mt-0.5">{countryData.zones[zone].length} hubs</div>
                        </div>
                        <ChevronRight size={12} className="text-slate-300 group-hover:text-sky-400" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Level: Hubs */}
                {level === 'hubs' && countryData && region && (
                  <div className="space-y-2">
                    {(countryData.zones[region] || []).map((hub, i) => {
                      const pr = PORT_RISK[hub]
                      const ps = pr?.score ?? countryData.score
                      const psc = scoreClasses(ps)
                      const pc = psc.bg
                      const pt = psc.text
                      const pl = ps >= 60 ? 'Stable' : ps >= 35 ? 'Moderate' : 'High Risk'
                      const alerts = pr?.alerts || []
                      const topAlert = alerts[0]
                      const alertBorder = topAlert?.lvl === 'high' ? 'border-rose-500/30' : topAlert?.lvl === 'warn' ? 'border-amber-500/20' : 'border-white/5'
                      return (
                        <div key={i} className={`bg-[#111] border rounded-lg p-2.5 ${alertBorder}`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Anchor size={9} className="text-sky-500/50 shrink-0" />
                              <span className="text-[11px] font-bold text-slate-200 uppercase truncate">{hub}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <span className={`text-[11px] font-bold font-mono ${pt}`}>◆ {ps}</span>
                              <span className={`text-[10px] font-bold px-1 py-0.5 rounded border ${psc.badge}`}>{pl}</span>
                            </div>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                            <div className={`h-full rounded-full ${pc}`} style={{ width:`${ps}%` }} />
                          </div>
                          {alerts.length > 0 && (
                            <div className="space-y-1">
                              {alerts.map((a, j) => (
                                <div key={j} className={`flex items-start gap-1.5 text-[8px] leading-snug ${a.lvl === 'high' ? 'text-rose-400' : a.lvl === 'warn' ? 'text-amber-400' : 'text-slate-500'}`}>
                                  <span className="shrink-0 mt-0.5">{a.lvl === 'high' ? '▲' : a.lvl === 'warn' ? '⚠' : '●'}</span>
                                  <span>{a.msg}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {alerts.length === 0 && <p className="text-[8px] text-slate-300">No active alerts</p>}
                        </div>
                      )
                    })}
                    <p className="text-[8px] text-slate-300 mt-1 text-center">Composite: WB stability + port-specific risk factors</p>
                  </div>
                )}
              </div>
            )
          })()}

          {/* Risk Panels */}
          <div className="flex flex-col gap-3">

            {/* Live Intelligence Brief — INTEL tab */}
            {activeTab === 'intelligence' && (intelLoading || intelBrief) && (
              <div className="bg-[#0a0a0a] border border-sky-500/20 p-4 rounded-xl">
                <h2 className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                  <Newspaper size={13} /> Live Trade Intelligence
                  {intelBrief && <span className="ml-auto text-[10px] text-slate-300">{intelBrief.articleCount} articles · {intelBrief.sourceCount} sources</span>}
                </h2>
                {intelLoading ? (
                  <div className="space-y-2">
                    <div className="h-2.5 bg-white/5 rounded animate-pulse w-full" />
                    <div className="h-2.5 bg-white/5 rounded animate-pulse w-4/5" />
                    <div className="h-2.5 bg-white/5 rounded animate-pulse w-3/5" />
                  </div>
                ) : intelBrief?.articles?.length > 0 ? (
                  <div className="space-y-2">
                    {intelBrief.articles.map((a, i) => (
                      <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                        className="block group">
                        <div className="flex items-start gap-2">
                          <span className={`text-[8px] font-bold shrink-0 mt-0.5 ${a.tone < -3 ? 'text-rose-400' : a.tone < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>●</span>
                          <div>
                            <p className="text-[11px] text-slate-300 leading-snug group-hover:text-white transition-colors">{a.title}</p>
                            <p className="text-[10px] text-slate-300 mt-0.5">{a.source}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-300 italic">No recent trade news found.</p>
                )}
                <p className="text-[10px] text-slate-300 mt-3">GDELT · World Bank Political Stability Index</p>
              </div>
            )}

            {/* Global Threats — RISK tab only (sourcing tab renders it below hubs) */}
            {activeTab === 'risk' && <div className="bg-[#0a0a0a] border border-white/10 p-4 flex flex-col rounded-xl" data-tour="risks">
              <h2 className="text-[11px] font-bold text-rose-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-2 shrink-0 cursor-pointer select-none" onClick={() => setThreatsCollapsed(!threatsCollapsed)}>
                <ShieldAlert size={14} /> Global Threats
                <SourceTooltip text="Risk signals aggregated from USGS (earthquakes), NASA FIRMS (wildfires), ACLED (incidents), and live port data." />
                {risks.length > 0
                  ? <span className="flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-rose-500/25 bg-rose-500/8 text-rose-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse inline-block" />
                      LIVE · {risks.length}
                    </span>
                  : <span className="text-[8px] text-slate-600 font-normal normal-case border border-white/8 px-1.5 py-0.5 rounded-full">post-scan</span>
                }
                <span className="ml-auto text-slate-300">{threatsCollapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}</span>
              </h2>
              {!threatsCollapsed && (
                <div className="space-y-2">
                  {risks.length === 0 ? (
                    <p className="text-[11px] text-slate-300 italic">Run a sourcing scan to surface relevant risk factors.</p>
                  ) : risks.map((r, i) => (
                    <div key={r.id || i}
                      onClick={() => setSelectedNode(selectedNode?.id === (r.id || i) ? null : r)}
                      className={`p-3 border transition-all cursor-pointer rounded-lg ${
                        selectedNode?.id === (r.id || i)
                          ? 'bg-rose-500/10 border-rose-500/40'
                          : 'bg-[#111] border-white/5 hover:border-rose-500/20'
                      }`}>
                      <div className="flex items-start gap-2">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${severityStyle(r.severity)}`}>
                          {r.severity || 'RISK'}
                        </span>
                        <div className="text-[12px] font-bold uppercase leading-snug">{r.title || r.risk}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>}

            {/* Sourcing Hubs — SOURCING tab */}
            {activeTab === 'sourcing' && <div className="bg-[#0a0a0a] border border-white/10 p-4 flex flex-col rounded-xl" data-tour="hubs">
              <h2 className="text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-3 flex items-center gap-2 shrink-0 cursor-pointer select-none" onClick={() => setHubsCollapsed(!hubsCollapsed)}>
                <Factory size={14} /> Sourcing Hubs
                <SourceTooltip text="Hub scoring based on geopolitical stability (ACLED), port access (MarineTraffic), sanctions exposure (OFAC/UN/EU), and trade agreement coverage." />
                {opportunities.length > 0 && <span className="text-[10px] text-slate-300">{opportunities.length} identified</span>}
                <span className="ml-auto text-slate-300">{hubsCollapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}</span>
              </h2>
              {!hubsCollapsed && (
                <div className="space-y-2">
                  {opportunities.length === 0 ? (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] text-slate-300 uppercase tracking-widest mb-2">Try an example:</p>
                      {[
                        'IATF-certified brake pads for passenger vehicles',
                        'Neodymium magnets for EV motor assembly',
                        'Food-grade soy for QSR supply chain',
                        'Semiconductor wafers for automotive ECU',
                      ].map((q) => (
                        <button key={q} onClick={() => handleSearch(null, q)}
                          className="w-full text-left text-[11px] text-slate-300 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 bg-[#111] hover:bg-emerald-500/5 p-2.5 rounded-lg transition-all">
                          → {q}
                        </button>
                      ))}
                    </div>
                  ) : opportunities.map((o, i) => (
                    <div key={o.id || i}
                      onClick={() => setSelectedNode(selectedNode?.id === o.id ? null : o)}
                      className={`p-3 border transition-all cursor-pointer rounded-lg ${
                        selectedNode?.id === o.id
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'bg-[#111] border-white/5 hover:border-emerald-500/20'
                      }`}>
                      <div className="text-[10px] text-slate-300 font-bold mb-1 uppercase tracking-widest flex items-center gap-2">
                        {o.hub}
                        {(() => {
                          const ds = hubDayStatus(o.hub, o.lng)
                          if (!ds) return null
                          return (
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${ds.open ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-300 border-white/10 bg-white/5'}`} title={`Local time: ${ds.localTime}`}>
                              {ds.icon} {ds.open ? 'OPEN' : 'CLOSED'}
                            </span>
                          )
                        })()}
                        {(() => {
                          const iso2 = getHubISO2(o.hub)
                          const score = iso2 && intelBrief?.countryScores?.[iso2]
                          if (!score) return null
                          const c = scoreClasses(score.stability).text
                          return <span className={`ml-auto font-mono text-[8px] ${c}`} title="World Bank Political Stability Score">◆ {score.stability}</span>
                        })()}
                      </div>
                      <div className="text-[12px] font-bold uppercase leading-tight">{o.title}</div>
                      {o.real_export_value_usd && (
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-sky-400 font-mono" title={`Official UN Comtrade export statistics, ${o.real_trade_data_year}`}>
                          <CheckCircle size={9} />
                          ${(o.real_export_value_usd / 1e6).toFixed(0)}M exported ({o.real_trade_data_year}, UN Comtrade)
                        </div>
                      )}
                    </div>
                  ))}
                  {opportunities.length > 0 && (
                    <p className="text-[10px] text-slate-300 mt-1">FX note: verify landed cost impact if sourcing from this region</p>
                  )}
                </div>
              )}
            </div>}

            {/* ── COMMAND TAB ── */}
            {activeTab === 'command' && (
              <div className="space-y-3">
                {/* Mission state */}
                <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-300 uppercase font-bold tracking-widest mb-3 flex items-center gap-2"><Target size={11} /> Mission Summary</div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-[#111] rounded-lg p-2.5">
                      <div className="text-[20px] font-bold text-emerald-400">{opportunities.length}</div>
                      <div className="text-[8px] text-slate-300 uppercase tracking-wider mt-0.5">Hubs Found</div>
                    </div>
                    <div className="bg-[#111] rounded-lg p-2.5">
                      <div className="text-[20px] font-bold text-rose-400">{risks.length}</div>
                      <div className="text-[8px] text-slate-300 uppercase tracking-wider mt-0.5">Threats</div>
                    </div>
                    <div className="bg-[#111] rounded-lg p-2.5">
                      <div className={`text-[20px] font-bold ${marketData?.confidence_score >= 75 ? 'text-emerald-400' : marketData?.confidence_score >= 50 ? 'text-amber-400' : 'text-slate-500'}`}>
                        {marketData?.confidence_score ?? '--'}
                      </div>
                      <div className="text-[8px] text-slate-300 uppercase tracking-wider mt-0.5">Confidence</div>
                    </div>
                  </div>
                  {opportunities.length === 0 && (
                    <button onClick={() => setShowSearch(true)}
                      className="w-full h-9 bg-emerald-500 text-black font-bold text-[11px] uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5">
                      <SearchCode size={12} /> Run Intelligence Scan
                    </button>
                  )}
                </div>

                {/* Top hub + directive preview */}
                {directive && (
                  <div className="bg-[#0a0a0a] border border-emerald-500/20 p-4 rounded-xl space-y-2">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5"><Zap size={11} /> Strategic Directive <SourceTooltip text="Generated by Claude claude-sonnet-4-6 based on scan results. Always verify with qualified procurement professionals." /></div>
                    <div className="text-[12px] font-bold text-white">{directive.best_region}</div>
                    <div className="text-[11px] text-emerald-400 font-bold">{directive.best_partner}</div>
                    <p className="text-[10px] text-slate-300 leading-snug italic">&ldquo;{directive.summary}&rdquo;</p>
                  </div>
                )}

                {/* Quick-fire actions */}
                <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-300 uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><Zap size={11} /> Quick Actions</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: 'Export PDF',   action: exportToPDF,                  disabled: opportunities.length === 0, color: 'white' },
                      { label: 'Send RFQ',     action: () => setShowRFQ(true),        disabled: opportunities.length === 0, color: 'sky' },
                      { label: 'Compare Hubs', action: () => setShowComparison(true), disabled: opportunities.length < 2,   color: 'sky' },
                      { label: 'AI Advisory',  action: () => setShowRecommendation(true), disabled: opportunities.length === 0, color: 'emerald' },
                    ].map((a, i) => (
                      <button key={i} onClick={a.disabled ? undefined : a.action} disabled={a.disabled}
                        className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all disabled:opacity-30 ${a.color === 'emerald' ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : a.color === 'sky' ? 'border-sky-500/30 text-sky-400 hover:bg-sky-500/10' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── RISK TAB -- extra content (threats already shown above) ── */}
            {activeTab === 'risk' && (
              <div className="space-y-3">
                {/* Chokepoint status list */}
                <div className="bg-[#0a0a0a] border border-amber-500/20 p-4 rounded-xl">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"><Anchor size={11} /> Maritime Chokepoints</div>
                  <div className="space-y-1.5">
                    {CHOKEPOINTS.slice(0, 6).map(cp => {
                      const dot = cp.status === 'CRITICAL' ? 'bg-rose-500' : cp.status === 'ELEVATED' ? 'bg-amber-500' : cp.status === 'MODERATE' ? 'bg-yellow-500' : 'bg-emerald-500'
                      const txt = cp.status === 'CRITICAL' ? 'text-rose-400' : cp.status === 'ELEVATED' ? 'text-amber-400' : cp.status === 'MODERATE' ? 'text-yellow-400' : 'text-emerald-400'
                      return (
                        <div key={cp.id} className="flex items-center gap-2 py-1 border-b border-white/4 last:border-0">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                          <span className="text-[11px] text-slate-300 flex-1 truncate">{cp.name}</span>
                          <span className={`text-[8px] font-bold uppercase ${txt}`}>{cp.status}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* Prompt to run a scan if no threats yet */}
                {risks.length === 0 && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl text-center">
                    <p className="text-[11px] text-slate-300 italic">Run a scan to surface geopolitical threats, earthquakes, and wildfires for your supply region.</p>
                    <button onClick={() => setShowSearch(true)} className="mt-2 text-[10px] font-bold text-sky-400 uppercase tracking-widest hover:text-sky-300 transition-colors">Run Scan &rsaquo;</button>
                  </div>
                )}
              </div>
            )}

            {/* ── COMPLIANCE TAB ── */}
            {activeTab === 'compliance' && (
              <div className="space-y-3">
                <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"><Shield size={11} /> Compliance Tools</div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {[
                      { label: 'Sanctions Screening',   desc: 'OFAC · EU · UN lists',       action: () => setShowSanctions(true),   color: 'rose' },
                      { label: 'FTA Eligibility Check', desc: 'USMCA · CPTPP · EVFTA',      action: () => setShowFta(true),         color: 'emerald' },
                      { label: 'Tariff Calculator',     desc: 'HTS · MFN · Section 232',    action: () => setShowTariffCalc(true),   color: 'sky' },
                      { label: 'HS Code Lookup',        desc: 'Schedule B classification',   action: () => setShowTariff(true),      color: 'sky' },
                      { label: 'Dual-Use Check',        desc: 'EAR / ITAR export control',  action: () => setShowDualUse(true),     color: 'rose' },
                      { label: 'Compliance Checklist',  desc: 'Pre-shipment verification',  action: () => setShowCompliance(true),  color: 'amber' },
                      { label: 'Incoterms Guide',       desc: 'FOB · CIF · DDP explained',  action: () => setShowIncoterms(true),   color: 'purple' },
                    ].map((t, i) => (
                      <button key={i} onClick={t.action}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all ${t.color === 'rose' ? 'border-rose-500/20 hover:bg-rose-500/8 hover:border-rose-500/30' : t.color === 'emerald' ? 'border-emerald-500/20 hover:bg-emerald-500/8 hover:border-emerald-500/30' : t.color === 'amber' ? 'border-amber-500/20 hover:bg-amber-500/8 hover:border-amber-500/30' : t.color === 'purple' ? 'border-purple-500/20 hover:bg-purple-500/8 hover:border-purple-500/30' : 'border-sky-500/20 hover:bg-sky-500/8 hover:border-sky-500/30'}`}>
                        <div>
                          <div className={`text-[11px] font-bold uppercase tracking-wider ${t.color === 'rose' ? 'text-rose-400' : t.color === 'emerald' ? 'text-emerald-400' : t.color === 'amber' ? 'text-amber-400' : t.color === 'purple' ? 'text-purple-400' : 'text-sky-400'}`}>{t.label}</div>
                          <div className="text-[9px] text-slate-300 mt-0.5">{t.desc}</div>
                        </div>
                        <ChevronRight size={12} className="text-slate-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── COST TAB ── */}
            {activeTab === 'cost' && (
              <div className="space-y-3">
                {/* FX snapshot */}
                {fxData && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <TrendingUp size={11} /> Live FX Rates
                      <SourceTooltip text="Exchange rates via Open Exchange Rates API. Updated hourly." />
                      <span className="ml-auto text-[8px] text-slate-300 font-normal normal-case">as of {fxData.date}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(fxData.rates || {}).slice(0, 6).map(([code, info]) => (
                        <div key={code} className="flex items-center justify-between p-2 bg-[#111] border border-white/5 rounded-lg">
                          <div className="text-[11px] font-bold text-white font-mono">{info.flag} {code}</div>
                          <span className="text-[13px] font-bold text-amber-300 font-mono">
                            {typeof info.rate === 'number' ? info.rate.toFixed(2) : info.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Commodity snapshot */}
                {commodities && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                    <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <BarChart3 size={11} /> Key Materials
                      <span className={`ml-auto text-[8px] font-normal normal-case ${
                        commodities.quality === 'live' ? 'text-emerald-400' :
                        commodities.quality === 'delayed' ? 'text-amber-400' :
                        'text-slate-300'
                      }`}>
                        {commodities.quality === 'live' ? 'Live' :
                         commodities.quality === 'delayed' ? 'EOD' :
                         'Ref'}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {(commodities.prices || []).slice(0, 5).map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-white/4 last:border-0">
                          <span className="text-[11px] text-slate-300">{c.name}</span>
                          <div className="text-right">
                            <span className="text-[11px] font-bold font-mono text-white">{c.price}</span>
                            <span className={`ml-1.5 text-[10px] font-bold ${c.change?.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{c.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Cost tools */}
                <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calculator size={11} /> Cost Tools</div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {[
                      { label: 'Total Landed Cost', desc: 'Duties + freight + FX',     action: () => setShowTLC(true),          color: 'emerald' },
                      { label: 'Ocean Freight',      desc: 'Lane benchmarks by route',  action: () => setShowOcean(true),        color: 'sky' },
                      { label: 'FX Impact Calc',     desc: 'Currency exposure model',   action: () => setShowCurrencyCalc(true), color: 'amber' },
                    ].map((t, i) => (
                      <button key={i} onClick={t.action}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all ${t.color === 'emerald' ? 'border-emerald-500/20 hover:bg-emerald-500/8' : t.color === 'amber' ? 'border-amber-500/20 hover:bg-amber-500/8' : 'border-sky-500/20 hover:bg-sky-500/8'}`}>
                        <div>
                          <div className={`text-[11px] font-bold uppercase tracking-wider ${t.color === 'emerald' ? 'text-emerald-400' : t.color === 'amber' ? 'text-amber-400' : 'text-sky-400'}`}>{t.label}</div>
                          <div className="text-[9px] text-slate-300 mt-0.5">{t.desc}</div>
                        </div>
                        <ChevronRight size={12} className="text-slate-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── REPORTS TAB ── */}
            {activeTab === 'reports' && (
              <div className="space-y-3">
                <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                  <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"><FileText size={11} /> Export &amp; Reports</div>
                  <div className="space-y-2">
                    <button onClick={exportToPDF} disabled={isExportingPDF || opportunities.length === 0}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all disabled:opacity-30 text-left">
                      <div>
                        <div className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><Download size={11} /> Executive Brief (PDF)</div>
                        <div className="text-[9px] text-slate-300 mt-0.5">Full sourcing analysis with hub scores, risk, compliance</div>
                      </div>
                    </button>
                    <button onClick={() => setShowRFQ(true)} disabled={opportunities.length === 0}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg border border-sky-500/20 hover:bg-sky-500/8 transition-all disabled:opacity-30 text-left">
                      <div>
                        <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5"><Mail size={11} /> Smart RFQ</div>
                        <div className="text-[9px] text-slate-300 mt-0.5">Auto-generated supplier inquiry ready to send</div>
                      </div>
                    </button>
                    <button onClick={() => setShowComparison(true)} disabled={opportunities.length < 2}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all disabled:opacity-30 text-left">
                      <div>
                        <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><BarChart3 size={11} /> Hub Comparison</div>
                        <div className="text-[9px] text-slate-300 mt-0.5">Side-by-side scoring for {opportunities.length} sourcing hubs</div>
                      </div>
                    </button>
                  </div>
                </div>
                {/* Mission history */}
                <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-1.5"><History size={11} /> Mission Archive</div>
                    <button onClick={() => setShowHistory(true)} className="text-[8px] text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors">View All &rsaquo;</button>
                  </div>
                  {missionHistory.length === 0 ? (
                    <p className="text-[11px] text-slate-300 italic">No missions saved yet. Run a scan to create an archive entry.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {missionHistory.slice(-4).reverse().map((m, i) => (
                        <button key={i} onClick={() => replayMission(m)}
                          className="w-full text-left p-2.5 bg-[#111] border border-white/5 rounded-lg hover:border-sky-500/20 transition-all group">
                          <div className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors truncate uppercase">{m.query}</div>
                          <div className="text-[9px] text-slate-300 mt-0.5">{new Date(m.timestamp).toLocaleDateString()} · {m.hubCount ?? 0} hubs</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── SURVEILLANCE TAB ── */}
            {activeTab === 'surveillance' && (
              <div className="space-y-3">

                {/* Header status bar */}
                <div className="bg-[#0a0a0a] border border-cyan-500/20 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={11} className="text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Surveillance Mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-slate-300 uppercase tracking-widest">Live</span>
                  </div>
                </div>

                {/* Layer toggles — 3 surveillance-specific layers only */}
                <div className="bg-[#0a0a0a] border border-white/10 p-3 rounded-xl">
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                    <Layers size={10} /> Globe Layers
                  </div>
                  <div className="space-y-1.5">
                    {[
                      {
                        label: 'Active Fires',
                        icon: <Flame size={10} />,
                        active: showSurvFires,
                        toggle: () => setShowSurvFires(v => !v),
                        color: 'orange',
                        count: survFires.length > 0 ? `${survFires.length} regions` : null,
                      },
                      {
                        label: 'Seismic Events',
                        icon: <Waves size={10} />,
                        active: showSurvSeismic,
                        toggle: () => setShowSurvSeismic(v => !v),
                        color: 'amber',
                        count: survSeismic.length > 0 ? `${survSeismic.length} events` : null,
                      },
                    ].map((layer, i) => (
                      <button key={i} onClick={layer.toggle}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg border transition-all text-left ${
                          layer.active
                            ? layer.color === 'cyan'   ? 'border-cyan-500/30 bg-cyan-500/8'
                            : layer.color === 'orange' ? 'border-orange-500/30 bg-orange-500/8'
                            : 'border-amber-500/30 bg-amber-500/8'
                            : 'border-white/5 bg-transparent hover:border-white/10'
                        }`}>
                        <div className="flex items-center gap-2">
                          <span className={layer.active
                            ? layer.color === 'cyan'   ? 'text-cyan-400'
                            : layer.color === 'orange' ? 'text-orange-400'
                            : 'text-amber-400'
                            : 'text-slate-600'}>
                            {layer.icon}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${layer.active ? 'text-white' : 'text-slate-300'}`}>
                            {layer.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {layer.count && (
                            <span className="text-[9px] text-slate-300">{layer.count}</span>
                          )}
                          <div className={`w-7 h-3.5 rounded-full transition-all relative ${layer.active ? (layer.color === 'cyan' ? 'bg-cyan-500' : layer.color === 'orange' ? 'bg-orange-500' : 'bg-amber-500') : 'bg-slate-700'}`}>
                            <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${layer.active ? 'left-4' : 'left-0.5'}`} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active fires feed */}
                {survFires.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-3 rounded-xl">
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Flame size={10} className="text-orange-400" /> Active Fire Regions</span>
                      <span className="text-orange-400">{survFires.length}</span>
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {survFires.slice(0, 6).map((f, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                          <span className="text-[10px] text-slate-300 truncate">{f.title?.replace('Active Wildfires -- ', '') || f.id}</span>
                          <span className={`text-[9px] font-bold ml-2 shrink-0 ${f.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`}>{f.severity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seismic feed */}
                {survSeismic.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-3 rounded-xl">
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Waves size={10} className="text-amber-400" /> Seismic Events</span>
                      <span className="text-amber-400">{survSeismic.length}</span>
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {survSeismic.slice(0, 6).map((e, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                          <span className="text-[10px] text-slate-300 truncate">{e.title?.replace('Earthquake -- ', '') || e.id}</span>
                          <span className={`text-[9px] font-bold ml-2 shrink-0 ${e.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`}>{e.severity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data sources note */}
                <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-xl">
                  <div className="text-[9px] text-slate-400 leading-relaxed">
                    <span className="text-slate-300 font-bold">Sources:</span> NASA FIRMS (active fires) · USGS (seismic events). Refreshes every 5 min.
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Terminal capabilities card — fills empty space, hidden once scan runs */}
          {opportunities.length === 0 && (
            <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl mt-auto shrink-0">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-3">What NAUTILUS Does</div>
              <div className="space-y-2.5">
                {[
                  { icon: <Factory size={10}/>,     text: 'Surfaces & ranks global sourcing hubs by stability, cost and ESG' },
                  { icon: <ShieldAlert size={10}/>,  text: 'Monitors live threats — seismic, wildfire, geopolitical incidents' },
                  { icon: <FileText size={10}/>,     text: 'Generates AI strategic directives and RFQ drafts instantly' },
                  { icon: <TrendingUp size={10}/>,   text: 'Tracks live commodity prices, FX rates and freight data' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-[10px] text-slate-600">
                    <span className="shrink-0 mt-0.5 opacity-50">{item.icon}</span>
                    <span className="leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* ════════════════════════════════════
            CENTER — GLOBE + HUD
        ════════════════════════════════════ */}
        <main className="flex flex-col gap-2 overflow-hidden min-w-0 shrink-0 lg:flex-1 lg:gap-4">

          {/* Globe */}
          <div className="h-[28vh] shrink-0 lg:h-auto lg:flex-1 bg-[#0a0a0a] border border-white/10 relative flex items-center justify-center overflow-hidden rounded-xl shadow-[inset_0_0_60px_rgba(0,0,0,1)] min-h-0" data-tour="globe">
            <div className="z-0 w-full h-full">
              <ErrorBoundary label="Globe">
                <Globe
                  risks={risks}
                  opportunities={opportunities}
                  chokepoints={CHOKEPOINTS}
                  autoRotate={autoRotate}
                  showChokepoints={showChokepoints}
                  showDayNight={showDayNight}
                  showThreats={showThreats}
                  onNodeClick={(node) => setSelectedNode(node)}
                  survFires={survFires}
                  showSurvFires={activeTab === 'surveillance' && showSurvFires}
                  survSeismic={survSeismic}
                  showSurvSeismic={activeTab === 'surveillance' && showSurvSeismic}
                />
              </ErrorBoundary>
            </div>

            {/* Globe controls — desktop only (overlaid on globe) */}
            <div className="hidden lg:flex absolute top-4 left-4 z-10 flex-col gap-1 bg-black/55 backdrop-blur-md border border-white/8 rounded-xl p-2">
              <button onClick={() => setShowDayNight(!showDayNight)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all text-[11px] font-bold uppercase tracking-widest ${showDayNight ? 'bg-sky-500/15 border-sky-500/30 text-sky-400' : 'bg-black/60 border-white/10 text-slate-300 hover:text-slate-300'}`}>
                {showDayNight ? <Moon size={12} /> : <Sun size={12} />}
                Day / Night
              </button>
              <button onClick={() => setShowChokepoints(!showChokepoints)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all text-[11px] font-bold uppercase tracking-widest ${showChokepoints ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' : 'bg-black/60 border-white/10 text-slate-300 hover:text-slate-300'}`}>
                <Anchor size={12} />
                Chokepoints
              </button>
              <button onClick={() => setShowThreats(!showThreats)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all text-[11px] font-bold uppercase tracking-widest ${showThreats ? 'bg-rose-500/15 border-rose-500/30 text-rose-400' : 'bg-black/60 border-white/10 text-slate-300 hover:text-slate-300'}`}>
                <ShieldAlert size={12} />
                {showThreats ? 'Hide Threats' : 'Threats'}
              </button>
              <button onClick={() => setAutoRotate(!autoRotate)}
                className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 hover:bg-sky-500/20 rounded-lg backdrop-blur-md transition-all text-white/70 text-[11px] font-bold uppercase tracking-widest">
                {autoRotate ? <Pause size={12} /> : <Play size={12} />}
                {autoRotate ? 'Pause' : 'Resume'}
              </button>
              <button onClick={() => setShowTour(true)}
                className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 hover:bg-sky-500/20 rounded-lg backdrop-blur-md transition-all text-white/50 hover:text-sky-400 text-[11px] font-bold uppercase tracking-widest">
                <Map size={12} />
                How it works
              </button>
            </div>

            {/* Empty-state reticle — visible before first scan, sits above globe canvas */}
            {opportunities.length === 0 && risks.length === 0 && (
              <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center pointer-events-none select-none hidden lg:flex">
                <div className="relative flex items-center justify-center mb-5">
                  <div className="absolute w-40 h-40 rounded-full border border-sky-500/6 animate-pulse" style={{animationDuration:'3s'}} />
                  <div className="absolute w-28 h-28 rounded-full border border-sky-500/10" />
                  <div className="absolute w-16 h-16 rounded-full border border-sky-500/18" />
                  <div className="absolute w-8 h-8 rounded-full border border-sky-500/30" />
                  <div className="w-3 h-3 rounded-full bg-sky-500/25 border border-sky-500/50" />
                  {/* crosshair lines */}
                  <div className="absolute w-20 h-px bg-sky-500/10" />
                  <div className="absolute h-20 w-px bg-sky-500/10" />
                </div>
                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.5em] mb-1">Awaiting Mission</div>
                <div className="text-[10px] text-slate-700 text-center max-w-[180px] leading-relaxed">Scan a material to surface global hubs &amp; threats</div>
              </div>
            )}

            {/* Globe controls — mobile compact overlay (bottom strip, doesn't cover globe) */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2 bg-black/70 backdrop-blur-sm gap-1.5 overflow-x-auto no-scrollbar">
              <button onClick={() => setShowDayNight(!showDayNight)}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase transition-all ${showDayNight ? 'border-sky-500/40 text-sky-400 bg-sky-500/10' : 'border-white/10 text-slate-300'}`}>
                {showDayNight ? <Moon size={10} /> : <Sun size={10} />}
                Night
              </button>
              <button onClick={() => setShowChokepoints(!showChokepoints)}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase transition-all ${showChokepoints ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' : 'border-white/10 text-slate-300'}`}>
                <Anchor size={10} />
                Routes
              </button>
              <button onClick={() => setAutoRotate(!autoRotate)}
                className="shrink-0 flex items-center gap-1 bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-white/70 active:bg-white/20 transition-all">
                {autoRotate ? <Pause size={10} /> : <Play size={10} />}
                <span className="text-[10px] font-bold uppercase">{autoRotate ? 'Pause' : 'Resume'}</span>
              </button>
              <button onClick={() => setShowTour(true)}
                className="shrink-0 flex items-center gap-1 bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-white/50 active:bg-white/20 transition-all">
                <Map size={10} />
                <span className="text-[10px] font-bold uppercase">Tour</span>
              </button>
            </div>

          </div>

          {/* ── STRATEGIC ADVISORY HUD ── */}
          <div className="hidden lg:block shrink-0">

              <div className="bg-black/95 border border-white/10 p-6 shadow-[0_0_80px_rgba(0,0,0,0.9)] rounded-2xl backdrop-blur-xl min-w-0" data-tour="directive">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[11px] font-bold text-sky-400 tracking-[0.3em] uppercase flex items-center gap-2">
                    <Zap size={14} /> Strategic Advisory HUD
                  </div>
                  <div className="flex items-center gap-2">
                    {isOpportunity && (
                      <button onClick={() => setShowRFQ(true)}
                        className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-emerald-400 text-[10px] font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all rounded-lg">
                        <Mail size={11} /> Generate RFQ
                      </button>
                    )}
                    {selectedNode && (
                      <button onClick={() => setSelectedNode(null)} className="p-1.5 text-slate-300 hover:text-white transition-all">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* ── RISK NODE DISPLAY ── */}
                {isRisk && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded border shrink-0 mt-0.5 ${severityStyle(selectedNode.severity)}`}>
                        {selectedNode.severity} RISK
                      </span>
                      <div className="text-[14px] font-bold uppercase text-white leading-snug">{selectedNode.title}</div>
                    </div>
                    <p className="text-[12px] text-slate-300 leading-relaxed font-sans">{selectedNode.desc}</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <div className="text-[10px] text-rose-400 uppercase font-bold mb-2 tracking-widest flex items-center gap-1.5">
                          <AlertTriangle size={10} /> Risk Exposure
                        </div>
                        <p className="text-[12px] text-slate-300 leading-relaxed">{selectedNode.desc}</p>
                      </div>
                      <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                        <div className="text-[10px] text-sky-400 uppercase font-bold mb-2 tracking-widest flex items-center gap-1.5">
                          <CheckCircle size={10} /> Mitigation Strategy
                        </div>
                        <p className="text-[12px] text-slate-200 leading-relaxed font-sans">{selectedNode.mitigation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── OPPORTUNITY NODE DISPLAY ── */}
                {isOpportunity && (
                  <div className="space-y-4">
                    {/* Day / Night status strip */}
                    {selectedNode.lng != null && (() => {
                      const ds = hubDayStatus(selectedNode.hub, selectedNode.lng)
                      if (!ds) return null
                      return (
                        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${ds.open ? 'bg-emerald-500/8 border-emerald-500/20' : 'bg-white/3 border-white/8'}`}>
                          <span className="text-[14px]">{ds.icon === '☀' ? '☀️' : '🌙'}</span>
                          <div>
                            <div className={`text-[10px] font-bold uppercase tracking-widest ${ds.open ? 'text-emerald-400' : 'text-slate-300'}`}>
                              {ds.open ? 'Business Hours -- Open for RFQ' : 'After Hours -- Closed'}
                            </div>
                            <div className="text-[9px] text-slate-400">Local time: {ds.localTime}</div>
                          </div>
                        </div>
                      )
                    })()}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[13px] font-bold uppercase mb-1 text-white tracking-wider">{selectedNode.title}</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans mb-3">{selectedNode.desc}</p>
                        {selectedNode.industry_kpi && (
                          <div className="bg-[#111] p-3 border-l-2 border-sky-500 rounded-r-lg">
                            <div className="text-[8px] text-slate-300 uppercase font-bold mb-0.5">{selectedNode.industry_kpi.label}</div>
                            <div className="text-[16px] font-bold text-white">{selectedNode.industry_kpi.value}</div>
                          </div>
                        )}
                        {selectedNode.real_export_value_usd && (
                          <div className="bg-sky-500/10 border border-sky-500/25 p-3 rounded-lg mt-2 flex items-center gap-2">
                            <CheckCircle size={14} className="text-sky-400 shrink-0" />
                            <div>
                              <div className="text-[8px] text-sky-400 uppercase font-bold tracking-widest">Real, official trade data</div>
                              <div className="text-[13px] font-bold text-white">
                                ${(selectedNode.real_export_value_usd / 1e6).toLocaleString(undefined, { maximumFractionDigits: 0 })}M exported in {selectedNode.real_trade_data_year}
                              </div>
                              <div className="text-[8px] text-slate-300">Source: UN Comtrade official statistics</div>
                            </div>
                          </div>
                        )}
                      </div>
                      {selectedNode.esg && (
                        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                          <div className="text-[10px] text-emerald-400 font-bold uppercase mb-2 flex items-center gap-1.5">
                            <Leaf size={11} /> ESG Scorecard
                            <span className="text-[8px] text-amber-400/70 font-normal normal-case ml-auto">Illustrative -- verify with EcoVadis/CDP</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-[28px] font-bold text-white">{selectedNode.esg.ethical_rating}</div>
                            <div className="text-right">
                              <div className="text-[8px] text-slate-300 uppercase">CO₂ Intensity</div>
                              <div className="text-[11px] text-slate-300 font-bold">{selectedNode.esg.carbon_footprint}</div>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-300 italic leading-snug">&ldquo;{selectedNode.esg.sustainability_note}&rdquo;</p>
                        </div>
                      )}
                    </div>

                    {selectedNode.customs && (
                      <div className="bg-sky-500/5 border border-sky-500/20 p-4 rounded-xl grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="text-[10px] font-bold text-sky-400 uppercase flex items-center gap-1.5 mb-0.5">
                            <FileText size={11} /> Regulatory / Trade
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-[8px] text-slate-300 uppercase mb-0.5">HTS Code</div>
                              <div className="text-[13px] font-mono text-white">{selectedNode.customs.hts_code}</div>
                            </div>
                            <div>
                              <div className="text-[8px] text-slate-300 uppercase mb-0.5">Duty Rate</div>
                              <div className="text-[13px] font-mono text-emerald-400 font-bold">{selectedNode.customs.duty_rate}</div>
                            </div>
                          </div>
                          <div className="text-[11px] text-slate-300 border-t border-white/5 pt-2 leading-tight">{selectedNode.customs.compliance_note}</div>
                        </div>
                        <div className="space-y-3 border-l border-white/5 pl-6">
                          <div className="text-[10px] font-bold text-sky-400 uppercase flex items-center gap-1.5 mb-0.5">
                            <Ship size={11} /> Logistics
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-[8px] text-slate-300 uppercase mb-0.5">Lead Time</div>
                              <div className="text-[13px] font-mono text-white">{selectedNode.logistics?.port_wait_days ?? 'N/A'} Days</div>
                            </div>
                            <div>
                              <div className="text-[8px] text-slate-300 uppercase mb-0.5">Est. Freight</div>
                              <div className="text-[13px] font-mono text-white">{selectedNode.logistics?.freight_cost_estimate || 'TBD'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedNode.companies && selectedNode.companies.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase mb-2 flex items-center gap-2">
                          <Factory size={11} /> Target Strategic Partners
                        </div>
                        {/* Turnover filter */}
                        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                          <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest shrink-0">Size:</span>
                          {[null, '>$1B', '$100M-$1B', '$10M-$100M', '<$10M'].map(f => (
                            <button key={f ?? 'all'} onClick={() => setTurnoverFilter(f)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                turnoverFilter === f
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:text-slate-400'
                              }`}>
                              {f ?? 'All'}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {(() => {
                            const filteredCompanies = (selectedNode.companies || []).filter(c =>
                              turnoverFilter === null || c.turnover === turnoverFilter
                            )
                            if (filteredCompanies.length === 0) {
                              return <p className="text-[11px] text-slate-300 italic col-span-3">No suppliers in this bracket for this hub.</p>
                            }
                            return filteredCompanies.map((c, i) => (
                              <a key={i} href={c.website || '#'} target="_blank" rel="noopener noreferrer"
                                className="text-[11px] text-slate-300 font-mono bg-white/5 p-3 border border-white/5 rounded-lg hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all flex items-center justify-between group">
                                <span className="truncate">{c.name}</span>
                                <div className="flex flex-col items-end gap-0.5 shrink-0 ml-1">
                                  {c.turnover && <span className="text-[8px] text-slate-300 font-mono">{c.turnover}</span>}
                                  <ExternalLink size={10} className="opacity-30 group-hover:opacity-100 text-emerald-400" />
                                </div>
                              </a>
                            ))
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── EMPTY STATE ── */}
                {!selectedNode && opportunities.length === 0 && (
                  <p className="text-[12px] text-slate-300 italic">Run a scan above to identify global sourcing hubs and active risk factors.</p>
                )}
                {!selectedNode && opportunities.length > 0 && (
                  <div className="space-y-3">
                    {directive?.summary && (
                      <p className="text-[12px] text-slate-300 leading-relaxed">{directive.summary}</p>
                    )}
                    <div className="border border-sky-500/20 bg-sky-500/5 rounded-xl p-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] text-sky-400 font-bold uppercase tracking-wider mb-0.5">Ready to act?</div>
                        <div className="text-[11px] text-slate-300 truncate font-medium">
                          {opportunities[0]?.companies[0]?.name || 'Top Supplier'} &middot; {opportunities[0]?.hub?.split(',')[0]}
                        </div>
                      </div>
                      <button onClick={() => setShowRFQ(true)}
                        className="shrink-0 bg-sky-500 hover:bg-sky-400 active:bg-sky-300 text-black text-[11px] font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                        <Mail size={11}/> Send RFQ
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300">Click a green hub or red threat on the globe for details.</p>
                  </div>
                )}
              </div>
            </div>

        </main>

        {/* ════════════════════════════════════
            TOOLS COMMAND PANEL — vertical sidebar
        ════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col w-40 shrink-0 gap-2" data-tour="tools">

          {/* Primary CTA — always visible at the top */}
          <button onClick={() => setShowSearch(true)}
            className="w-full h-10 bg-sky-500 text-black font-bold uppercase text-[11px] hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] rounded-xl tracking-widest flex items-center justify-center gap-1.5 transition-all shrink-0">
            <SearchCode size={12} /> Scan
          </button>

          {/* Tool buttons — grouped by category */}
          <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-0" data-tour="new-tools">
            <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar justify-between">

              {/* ── CALCULATORS ── */}
              <div className="px-3 pt-2.5 pb-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Calculators</span>
              </div>
              {[
                { icon:<DollarSign size={11}/>,  label:'TLC Calc',    action:()=>setShowTLC(true),              color:'emerald' },
                { icon:<Calculator size={11}/>,  label:'Tariff Calc', action:()=>setShowTariffCalc(true),       color:'sky' },
                { icon:<TrendingUp size={11}/>,  label:'FX Impact',   action:()=>setShowCurrencyCalc(true),     color:'emerald' },
                { icon:<Ship size={11}/>,        label:'Ocean Rates', action:()=>setShowOcean(true),            color:'sky' },
              ].map((t, i) => (
                <button key={i} onClick={t.action}
                  title={t.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all text-left border-l-2
                    ${t.color==='emerald' ? 'border-l-emerald-500/40 text-emerald-400 hover:bg-emerald-500/8 hover:border-l-emerald-400' :
                      'border-l-sky-500/30 text-slate-300 hover:bg-sky-500/8 hover:text-sky-400 hover:border-l-sky-400'}`}>
                  <span className="shrink-0 opacity-70">{t.icon}</span>
                  <span className="truncate leading-none">{t.label}</span>
                </button>
              ))}

              {/* ── COMPLIANCE ── */}
              <div className="px-3 pt-2.5 pb-1 border-t border-white/5 mt-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Compliance</span>
              </div>
              {[
                { icon:<FileText size={11}/>,    label:'HS Code',    action:()=>setShowTariff(true),     color:'sky' },
                { icon:<Zap size={11}/>,         label:'Compliance', action:()=>setShowCompliance(true), color:'amber' },
                { icon:<Shield size={11}/>,      label:'Sanctions',  action:()=>setShowSanctions(true),  color:'rose' },
                { icon:<ShieldOff size={11}/>,   label:'Dual-Use',   action:()=>setShowDualUse(true),    color:'rose' },
                { icon:<Leaf size={11}/>,        label:'FTA Check',  action:()=>setShowFta(true),        color:'emerald' },
              ].map((t, i) => (
                <button key={i} onClick={t.action}
                  title={t.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all text-left border-l-2
                    ${t.color==='emerald' ? 'border-l-emerald-500/40 text-emerald-400 hover:bg-emerald-500/8 hover:border-l-emerald-400' :
                      t.color==='rose'    ? 'border-l-rose-500/40 text-rose-400 hover:bg-rose-500/8 hover:border-l-rose-400' :
                      t.color==='amber'   ? 'border-l-amber-500/40 text-amber-400 hover:bg-amber-500/8 hover:border-l-amber-400' :
                      'border-l-sky-500/30 text-slate-300 hover:bg-sky-500/8 hover:text-sky-400 hover:border-l-sky-400'}`}>
                  <span className="shrink-0 opacity-70">{t.icon}</span>
                  <span className="truncate leading-none">{t.label}</span>
                </button>
              ))}

              {/* ── INTELLIGENCE ── */}
              <div className="px-3 pt-2.5 pb-1 border-t border-white/5 mt-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Intelligence</span>
              </div>
              {[
                { icon:<ShieldAlert size={11}/>, label:'Risk Score',   action:()=>setShowRisk(true),       color:'rose' },
                { icon:<Anchor size={11}/>,      label:'Ports',        action:()=>setShowPorts(true),      color:'sky' },
                { icon:<Factory size={11}/>,     label:'BOM Analyzer', action:()=>setShowBom(true),        color:'violet' },
                { icon:<Scale size={11}/>,       label:'Incoterms',    action:()=>setShowIncoterms(true),  color:'purple' },
              ].map((t, i) => (
                <button key={i} onClick={t.action}
                  title={t.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all text-left border-l-2
                    ${t.color==='rose'   ? 'border-l-rose-500/40 text-rose-400 hover:bg-rose-500/8 hover:border-l-rose-400' :
                      t.color==='violet' ? 'border-l-violet-500/40 text-violet-400 hover:bg-violet-500/8 hover:border-l-violet-400' :
                      t.color==='purple' ? 'border-l-purple-500/40 text-purple-400 hover:bg-purple-500/8 hover:border-l-purple-400' :
                      'border-l-sky-500/30 text-slate-300 hover:bg-sky-500/8 hover:text-sky-400 hover:border-l-sky-400'}`}>
                  <span className="shrink-0 opacity-70">{t.icon}</span>
                  <span className="truncate leading-none">{t.label}</span>
                </button>
              ))}

              {/* ── MISSIONS ── */}
              <div className="px-3 pt-2.5 pb-1 border-t border-white/5 mt-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Missions</span>
              </div>
              {[
                { icon:<History size={11}/>,   label:`Archive (${missionHistory.length})`, action:()=>setShowHistory(true),     color:'emerald' },
                { icon:<BarChart3 size={11}/>, label:'Compare',                             action:()=>setShowComparison(true), color:'sky',
                  disabled:opportunities.length < 2, disabledTooltip: opportunities.length === 0 ? 'Run a scan to enable comparison' : 'Requires 2+ sourcing hubs' },
              ].map((t, i) => (
                <button key={i} onClick={t.disabled ? undefined : t.action} disabled={t.disabled}
                  title={t.disabled ? (t.disabledTooltip || 'Requires a scan') : t.label}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all text-left border-l-2 disabled:opacity-25
                    ${t.color==='emerald' ? 'border-l-emerald-500/40 text-emerald-400 hover:bg-emerald-500/8 hover:border-l-emerald-400' :
                      'border-l-sky-500/30 text-slate-300 hover:bg-sky-500/8 hover:text-sky-400 hover:border-l-sky-400'}`}>
                  <span className="shrink-0 opacity-70">{t.icon}</span>
                  <span className="truncate leading-none">{t.label}</span>
                </button>
              ))}

              <div className="pb-1" />
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col gap-2 shrink-0" data-tour="pdf">
            <button onClick={exportToPDF} disabled={isExportingPDF || opportunities.length === 0}
              title={opportunities.length === 0 ? "Run a scan to enable PDF export" : isExportingPDF ? "Generating Executive Mission Brief (PDF)..." : "Export Executive Mission Brief (PDF)"}
              className="w-full h-9 border border-white/15 text-white hover:bg-white/8 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 disabled:opacity-25">
              <Download size={11} /> {isExportingPDF ? 'Generating' : 'Export PDF'}
            </button>
            <button onClick={() => setShowResetConfirm(true)}
              className="w-full h-8 border border-rose-500/20 text-rose-500/60 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/5 rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all">
              <RotateCcw size={10} /> Reset Terminal
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════
            MOBILE — TAB LAYOUT (lg:hidden)
        ════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col flex-1 min-h-0 border border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a]">

          {/* ── Tab Bar ── */}
          <div className="flex shrink-0 border-b border-white/10 bg-[#080808]">
            {[
              { id: 'intel',   label: 'Intel',   icon: <Zap size={13}/> },
              { id: 'hubs',    label: opportunities.length > 0 ? `Hubs (${opportunities.length})` : 'Hubs', icon: <Factory size={13}/> },
              { id: 'threats', label: risks.length > 0 ? `Threats (${risks.length})` : 'Threats', icon: <ShieldAlert size={13}/> },
              { id: 'tools',   label: 'Tools',   icon: <Target size={13}/> },
            ].map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveMobileTab(tab.id); setSelectedNode(null) }}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeMobileTab === tab.id
                    ? 'border-sky-500 text-sky-400 bg-sky-500/5'
                    : 'border-transparent text-slate-300 active:text-slate-300'
                }`}>
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── Tab Content ── */}
          <div className="flex-1 overflow-y-auto p-3 pb-20 space-y-3">

            {/* ── INTEL TAB ── */}
            {activeMobileTab === 'intel' && (
              <>
                {opportunities.length === 0 ? (
                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-3">Try an example scan:</p>
                    {[
                      'IATF-certified brake pads for passenger vehicles',
                      'Neodymium magnets for EV motor assembly',
                      'Food-grade soy for QSR supply chain',
                      'Semiconductor wafers for automotive ECU',
                    ].map((q) => (
                      <button key={q} onClick={() => handleSearch(null, q)}
                        className="w-full text-left text-[11px] text-slate-300 hover:text-emerald-400 active:text-emerald-400 border border-white/5 hover:border-emerald-500/30 active:border-emerald-500/30 bg-[#111] hover:bg-emerald-500/5 active:bg-emerald-500/5 p-3 rounded-lg transition-all leading-snug">
                        → {q}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    {directive && (
                      <div className="bg-[#111] border border-sky-500/20 p-4 rounded-xl space-y-3">
                        <div className="text-[10px] font-bold text-sky-400 tracking-[0.3em] uppercase flex items-center gap-2">
                          <Zap size={11}/> Strategic Advisory
                        </div>
                        <p className="text-[12px] text-slate-300 leading-relaxed">{directive.summary}</p>
                        {directive.tariff_alert && (
                          <p className="text-[11px] text-amber-400 font-mono border-t border-white/5 pt-3">{directive.tariff_alert}</p>
                        )}
                      </div>
                    )}
                    {/* ── QUICK ACTIONS -- visible immediately after scan ── */}
                    {opportunities.length > 0 && (
                      <div className="border border-sky-500/20 bg-sky-500/5 rounded-xl p-3 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] text-sky-400 font-bold uppercase tracking-wider mb-0.5">Ready to act?</div>
                          <div className="text-[11px] text-slate-300 truncate font-medium">
                            {opportunities[0]?.companies[0]?.name || 'Top Supplier'} &middot; {opportunities[0]?.hub?.split(',')[0]}
                          </div>
                        </div>
                        <button onClick={() => setShowRFQ(true)}
                          className="shrink-0 bg-sky-500 hover:bg-sky-400 active:bg-sky-300 text-black text-[11px] font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                          <Mail size={11}/> Send RFQ
                        </button>
                      </div>
                    )}
                    <div className="bg-[#111] border border-white/5 p-4 rounded-xl">
                      <div className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2 mb-3">
                        <BarChart3 size={11}/> Metals &amp; Materials
                        <SourceTooltip text="Spot prices via Yahoo Finance (CME, LME). Updated every 15 minutes." />
                        <div className="ml-auto flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[11px] text-slate-300 font-mono">{metalsTs}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(() => {
                          const SPARKS = [[68,72,70,74,71,76,74],[58,60,57,62,63,65,68],[72,70,73,71,74,72,74],[80,77,75,78,74,72,70],[42,48,52,55,60,65,72],[75,73,76,72,70,68,67]];
                          const BASE = [
                            { n:'Brent',   p:'$89.24', c:'+1.2%', up:true  },
                            { n:'Copper',  p:'$4.12',  c:'+2.4%', up:true  },
                            { n:'Alum.',   p:'$2,350', c:'+0.5%', up:true  },
                            { n:'Nickel',  p:'$18.4k', c:'-0.9%', up:false },
                            { n:'R.Earth', p:'$142',   c:'+6.8%', up:true  },
                            { n:'Steel',   p:'$840',   c:'-0.8%', up:false },
                          ];
                          const src = commodities?.prices || [];
                          const find = (names) => names.map(n => src.find(x => x.name.toLowerCase().includes(n))).find(Boolean);
                          const live = [
                            find(['brent']), find(['copper']), find(['alum']),
                            find(['nickel']), find(['rare','earth']), find(['steel','hrc']),
                          ];
                          const items = live.map((l, i) => l
                            ? { n: l.name.split(' ')[0], p: l.price, c: l.change, up: l.up, spark: SPARKS[i] }
                            : { ...BASE[i], spark: SPARKS[i] }
                          );
                          return items;
                        })().map((item, i) => {
                          const mn = Math.min(...item.spark), mx = Math.max(...item.spark)
                          const pts = item.spark.map((v, j) => {
                            const x = (j / (item.spark.length - 1)) * 44
                            const y = 10 - ((v - mn) / (mx - mn + 0.01)) * 8
                            return `${x},${y}`
                          }).join(' ')
                          return (
                            <div key={i} className={`bg-[#0a0a0a] border rounded-lg p-2 text-center ${item.up ? 'border-emerald-500/10' : 'border-rose-500/10'}`}>
                              <div className="text-[7px] text-slate-300 uppercase font-bold mb-0.5 truncate">{item.n}</div>
                              <svg width="44" height="12" viewBox="0 0 44 12" className="mx-auto mb-0.5 opacity-70">
                                <polyline points={pts} fill="none" stroke={item.up ? '#34d399' : '#f87171'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="text-[11px] font-bold text-white font-mono">{item.p}</div>
                              <div className={`text-[10px] font-bold ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>{item.c}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {fxData?.rates && (
                      <div className="bg-[#111] border border-white/5 p-4 rounded-xl space-y-2">
                        <div className="text-[10px] font-bold text-purple-400 tracking-[0.2em] uppercase mb-2">Live FX Rates</div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(fxData.rates).slice(0, 6).map(([code, info]) => (
                            <div key={code} className="bg-[#0a0a0a] border border-white/5 p-2.5 rounded-lg">
                              <div className="text-[8px] text-slate-300 uppercase font-bold mb-0.5">{code}</div>
                              <div className="text-[14px] font-bold text-white font-mono">{typeof info === 'object' ? info.rate : info}</div>
                              {info.label && <div className="text-[8px] text-slate-300 leading-tight">{info.label}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button onClick={() => setShowSearch(true)}
                      className="w-full py-3 bg-sky-500 text-black font-bold uppercase text-[11px] rounded-xl tracking-widest flex items-center justify-center gap-2 transition-all active:bg-sky-400">
                      New Mission <SearchCode size={13}/>
                    </button>
                  </>
                )}
              </>
            )}

            {/* ── HUBS TAB ── */}
            {activeMobileTab === 'hubs' && (
              <>
                {/* Hub detail view */}
                {selectedNode && isOpportunity ? (
                  <div className="space-y-3">
                    <button onClick={() => setSelectedNode(null)}
                      className="flex items-center gap-2 text-[11px] text-slate-300 active:text-sky-400 font-bold uppercase tracking-wider transition-all w-full bg-white/5 rounded-xl px-4 py-3">
                      <ChevronRight size={14} className="rotate-180 shrink-0"/> Back to Hubs
                    </button>
                    <div className="bg-[#111] border border-emerald-500/30 p-4 rounded-xl space-y-1">
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{selectedNode.hub}</div>
                      <div className="text-[14px] font-bold uppercase text-white leading-snug">{selectedNode.title}</div>
                      <p className="text-[11px] text-slate-300 leading-relaxed pt-1">{selectedNode.desc}</p>
                    </div>
                    {selectedNode.esg && (
                      <div className="bg-[#111] border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3">
                        <div className="text-[32px] font-bold text-white shrink-0">{selectedNode.esg.ethical_rating}</div>
                        <div className="min-w-0">
                          <div className="text-[10px] text-emerald-400 font-bold uppercase mb-0.5">ESG · {selectedNode.esg.carbon_footprint}</div>
                          <p className="text-[11px] text-slate-300 italic leading-snug">{selectedNode.esg.sustainability_note}</p>
                        </div>
                      </div>
                    )}
                    {selectedNode.customs && (
                      <div className="bg-[#111] border border-sky-500/20 p-4 rounded-xl">
                        <div className="text-[10px] text-sky-400 font-bold uppercase mb-3 flex items-center gap-1.5"><FileText size={10}/> Regulatory</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><div className="text-[8px] text-slate-300 uppercase mb-0.5">HTS Code</div><div className="text-[14px] font-mono text-white">{selectedNode.customs.hts_code}</div></div>
                          <div><div className="text-[8px] text-slate-300 uppercase mb-0.5">Duty Rate</div><div className="text-[14px] font-mono text-emerald-400 font-bold">{selectedNode.customs.duty_rate}</div></div>
                          <div><div className="text-[8px] text-slate-300 uppercase mb-0.5">Lead Time</div><div className="text-[13px] font-mono text-white">{selectedNode.logistics?.port_wait_days ?? 'N/A'} days</div></div>
                          <div><div className="text-[8px] text-slate-300 uppercase mb-0.5">Est. Freight</div><div className="text-[13px] font-mono text-white">{selectedNode.logistics?.freight_cost_estimate || 'TBD'}</div></div>
                        </div>
                        {selectedNode.customs.compliance_note && (
                          <p className="text-[11px] text-slate-300 border-t border-white/5 mt-3 pt-3 leading-relaxed">{selectedNode.customs.compliance_note}</p>
                        )}
                      </div>
                    )}
                    {selectedNode.real_export_value_usd && (
                      <div className="bg-sky-500/10 border border-sky-500/25 p-3 rounded-xl flex items-center gap-3">
                        <CheckCircle size={16} className="text-sky-400 shrink-0"/>
                        <div>
                          <div className="text-[8px] text-sky-400 uppercase font-bold tracking-widest">UN Comtrade Official Data</div>
                          <div className="text-[13px] font-bold text-white">${(selectedNode.real_export_value_usd / 1e6).toLocaleString(undefined, {maximumFractionDigits:0})}M exported in {selectedNode.real_trade_data_year}</div>
                        </div>
                      </div>
                    )}
                    {selectedNode.companies?.length > 0 && (
                      <div className="bg-[#111] border border-white/5 p-4 rounded-xl space-y-2">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1.5"><Factory size={10}/> Key Suppliers</div>
                        {selectedNode.companies.slice(0, 6).map((c, i) => (
                          <a key={i} href={c.website || '#'} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-all">
                            <span className="text-[11px] text-slate-300 font-mono truncate">{c.name}</span>
                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              {c.turnover && <span className="text-[8px] text-slate-300">{c.turnover}</span>}
                              <ExternalLink size={10} className="text-emerald-400 opacity-60"/>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button onClick={() => setShowTLC(true)} className="py-4 text-[11px] font-bold uppercase border border-emerald-500/30 text-emerald-400 rounded-xl active:bg-emerald-500/10 transition-all">TLC Calc</button>
                      <button onClick={() => setShowRFQ(true)} className="py-4 text-[11px] font-bold uppercase bg-sky-500 text-black rounded-xl active:bg-sky-400 transition-all">Generate RFQ</button>
                    </div>
                  </div>
                ) : (
                  /* Hubs list */
                  <div className="space-y-2">
                    {opportunities.length === 0 ? (
                      <div className="space-y-3 pt-1">
                        <p className="text-[11px] text-slate-300 italic">Run a mission scan to identify and rank sourcing hubs for your material.</p>
                        <button onClick={() => setShowSearch(true)}
                          className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase text-[11px] rounded-xl hover:bg-emerald-500/15 active:bg-emerald-500/20 transition-all flex items-center justify-center gap-2">
                          <Factory size={12}/> Find Sourcing Hubs
                        </button>
                      </div>
                    ) : opportunities.map((o, i) => (
                      <button key={o.id || i} onClick={() => setSelectedNode(o)}
                        className="w-full text-left p-4 bg-[#111] border border-white/5 active:border-emerald-500/30 active:bg-emerald-500/5 rounded-xl transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{o.hub}</div>
                          <div className="flex items-center gap-1.5">
                            {(() => {
                              const ds = hubDayStatus(o.hub, o.lng)
                              if (!ds) return null
                              return (
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${ds.open ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-300 border-white/10 bg-white/5'}`}>
                                  {ds.icon} {ds.open ? 'OPEN' : 'CLOSED'}
                                </span>
                              )
                            })()}
                            <ChevronRight size={14} className="text-slate-300"/>
                          </div>
                        </div>
                        <div className="text-[13px] font-bold uppercase leading-tight text-white">{o.title}</div>
                        <div className="flex items-center gap-3 mt-2">
                          {o.customs?.duty_rate && <span className="text-[11px] text-slate-300 font-mono">Duty: {o.customs.duty_rate}</span>}
                          {o.logistics?.port_wait_days !== undefined && <span className="text-[11px] text-slate-300 font-mono">Lead: {o.logistics.port_wait_days}d</span>}
                          {o.real_export_value_usd && <span className="text-[11px] text-sky-400 font-mono flex items-center gap-0.5"><CheckCircle size={9}/> ${(o.real_export_value_usd/1e6).toFixed(0)}M</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── THREATS TAB ── */}
            {activeMobileTab === 'threats' && (
              <>
                {/* Risk detail view */}
                {selectedNode && isRisk ? (
                  <div className="space-y-3">
                    <button onClick={() => setSelectedNode(null)}
                      className="flex items-center gap-2 text-[11px] text-slate-300 active:text-sky-400 font-bold uppercase tracking-wider transition-all w-full bg-white/5 rounded-xl px-4 py-3">
                      <ChevronRight size={14} className="rotate-180 shrink-0"/> Back to Threats
                    </button>
                    <div className={`p-4 rounded-xl border space-y-3 ${
                      selectedNode.severity === 'CRITICAL' ? 'bg-red-900/10 border-red-500/30' :
                      selectedNode.severity === 'HIGH' ? 'bg-rose-900/10 border-rose-500/30' :
                      'bg-amber-900/10 border-amber-500/30'
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className={`text-[8px] font-bold px-2 py-1 rounded border shrink-0 ${severityStyle(selectedNode.severity)}`}>
                          {selectedNode.severity || 'RISK'}
                        </span>
                        <div className="text-[14px] font-bold uppercase text-white leading-snug">{selectedNode.title || selectedNode.risk}</div>
                      </div>
                      <p className="text-[12px] text-slate-300 leading-relaxed">{selectedNode.desc}</p>
                    </div>
                    {selectedNode.mitigation && (
                      <div className="bg-[#111] border border-sky-500/20 p-4 rounded-xl space-y-2">
                        <div className="text-[10px] text-sky-400 uppercase font-bold tracking-widest flex items-center gap-1.5"><CheckCircle size={10}/> Mitigation Strategy</div>
                        <p className="text-[12px] text-slate-200 leading-relaxed">{selectedNode.mitigation}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button onClick={() => setShowCompliance(true)}
                        className="py-4 text-[11px] font-bold uppercase border border-amber-500/30 text-amber-400 rounded-xl active:bg-amber-500/10 transition-all">
                        Compliance Check
                      </button>
                      <button onClick={() => setShowRisk(true)}
                        className="py-4 text-[11px] font-bold uppercase bg-rose-500 text-white rounded-xl active:bg-rose-600 transition-all">
                        Risk Score
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Threats list */
                  <div className="space-y-2">
                    {/* Live Intel Brief — mobile */}
                    {(intelLoading || intelBrief) && (
                      <div className="bg-[#0a0a0a] border border-sky-500/20 p-4 rounded-xl">
                        <div className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                          <Newspaper size={12} /> Live Trade Intelligence
                          {intelBrief && <span className="ml-auto text-[10px] text-slate-300">{intelBrief.articleCount} articles</span>}
                        </div>
                        {intelLoading ? (
                          <div className="space-y-1.5">
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-full" />
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-4/5" />
                            <div className="h-2.5 bg-white/5 rounded animate-pulse w-3/5" />
                          </div>
                        ) : intelBrief?.articles?.length > 0 ? (
                          <div className="space-y-2">
                            {intelBrief.articles.slice(0, 4).map((a, i) => (
                              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="block group">
                                <div className="flex items-start gap-2">
                                  <span className={`text-[8px] font-bold shrink-0 mt-0.5 ${a.tone < -3 ? 'text-rose-400' : a.tone < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>●</span>
                                  <div>
                                    <p className="text-[11px] text-slate-300 leading-snug group-active:text-white transition-colors">{a.title}</p>
                                    <p className="text-[10px] text-slate-300 mt-0.5">{a.source}</p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : null}
                        <p className="text-[10px] text-slate-300 mt-2">GDELT · World Bank</p>
                      </div>
                    )}
                    {risks.length === 0 ? (
                      <div className="space-y-3 pt-1">
                        <p className="text-[11px] text-slate-300 italic">Run a mission scan to surface active threats and compliance risks for your sourcing context.</p>
                        <button onClick={() => setShowSearch(true)}
                          className="w-full py-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold uppercase text-[11px] rounded-xl hover:bg-rose-500/15 active:bg-rose-500/20 transition-all flex items-center justify-center gap-2">
                          <ShieldAlert size={12}/> Run Threat Scan
                        </button>
                      </div>
                    ) : risks.map((r, i) => (
                      <button key={r.id || i} onClick={() => setSelectedNode(r)}
                        className="w-full text-left p-4 bg-[#111] border border-white/5 active:border-rose-500/30 active:bg-rose-500/5 rounded-xl transition-all">
                        <div className="flex items-start gap-3">
                          <span className={`text-[8px] font-bold px-2 py-1 rounded border shrink-0 mt-0.5 ${severityStyle(r.severity)}`}>
                            {r.severity || 'RISK'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-bold uppercase leading-snug text-white">{r.title || r.risk}</div>
                            {r.desc && <p className="text-[11px] text-slate-300 mt-1 leading-snug line-clamp-2">{r.desc}</p>}
                          </div>
                          <ChevronRight size={14} className="text-slate-300 shrink-0 mt-1"/>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── TOOLS TAB ── */}
            {activeMobileTab === 'tools' && (
              <div className="space-y-3">
                {/* Always-visible primary actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setShowSearch(true)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-sky-500 text-black rounded-xl text-[11px] font-bold uppercase tracking-wider">
                    <SearchCode size={13}/> New Mission
                  </button>
                  <button onClick={exportToPDF} disabled={isExportingPDF || opportunities.length === 0}
                    className="flex items-center justify-center gap-2 py-3.5 bg-[#111] border border-white/10 text-slate-300 rounded-xl text-[11px] font-bold uppercase tracking-wider disabled:opacity-30">
                    <Download size={13}/> {isExportingPDF ? 'Generating...' : 'Export PDF'}
                  </button>
                </div>

                {/* Generate RFQ — primary CTA when scan has results */}
                {opportunities.length > 0 && (
                  <button onClick={() => setShowRFQ(true)}
                    className="w-full py-3.5 flex items-center justify-center gap-2 bg-emerald-500 text-black rounded-xl text-[11px] font-bold uppercase tracking-wider active:bg-emerald-400 transition-all">
                    <Mail size={13}/> Generate RFQ
                  </button>
                )}

                <div className="text-[8px] text-slate-300 uppercase font-bold tracking-widest pt-1">Intelligence Tools</div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'TLC Calculator',  icon: <DollarSign size={15}/>,  color: 'emerald', action: () => setShowTLC(true),         needsScan: false },
                    { label: 'Risk Score',       icon: <ShieldAlert size={15}/>, color: 'rose',    action: () => setShowRisk(true),        needsScan: false },
                    { label: 'HS Code Lookup',   icon: <FileText size={15}/>,    color: 'amber',   action: () => setShowTariff(true),      needsScan: false },
                    { label: 'Port Monitor',     icon: <Anchor size={15}/>,      color: 'sky',     action: () => setShowPorts(true),       needsScan: false },
                    { label: 'Incoterms 2020',   icon: <Ship size={15}/>,        color: 'purple',  action: () => setShowIncoterms(true),   needsScan: false },
                    { label: 'Compliance',       icon: <CheckCircle size={15}/>, color: 'emerald', action: () => setShowCompliance(true),  needsScan: false },
                    { label: 'Compare Regions',  icon: <Scale size={15}/>,       color: 'purple',  action: () => setShowComparison(true),  needsScan: true,  disabled: opportunities.length < 2 },
                    { label: 'Mission Archive',  icon: <History size={15}/>,     color: 'slate',   action: () => setShowHistory(true),     needsScan: false },
                    { label: 'BOM Analyzer',     icon: <Factory size={15}/>,     color: 'violet',  action: () => setShowBom(true),         needsScan: false },
                    { label: 'Sanctions Check',  icon: <Shield size={15}/>,      color: 'rose',    action: () => setShowSanctions(true),   needsScan: false },
                    { label: 'Ocean Rates',      icon: <Anchor size={15}/>,      color: 'sky',     action: () => setShowOcean(true),       needsScan: false },
                    { label: 'FTA Eligibility',  icon: <Leaf size={15}/>,        color: 'emerald', action: () => setShowFta(true),         needsScan: false },
                  ].map((t, i) => (
                    <button key={i} onClick={t.disabled ? undefined : t.action} disabled={t.disabled}
                      className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition-all relative ${
                        t.disabled
                          ? 'bg-white/5 border-white/5 text-slate-300 cursor-not-allowed'
                          : t.color === 'emerald' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 active:bg-emerald-500/20' :
                            t.color === 'rose'    ? 'bg-rose-500/5 border-rose-500/20 text-rose-400 active:bg-rose-500/20' :
                            t.color === 'sky'     ? 'bg-sky-500/5 border-sky-500/20 text-sky-400 active:bg-sky-500/20' :
                            t.color === 'amber'   ? 'bg-amber-500/5 border-amber-500/20 text-amber-400 active:bg-amber-500/20' :
                            t.color === 'purple'  ? 'bg-purple-500/5 border-purple-500/20 text-purple-400 active:bg-purple-500/20' :
                            t.color === 'violet'  ? 'bg-violet-500/5 border-violet-500/20 text-violet-400 active:bg-violet-500/20' :
                            'bg-white/5 border-white/10 text-slate-300 active:bg-white/10'
                      }`}>
                      {t.icon}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-center leading-tight">{t.label}</span>
                      {t.disabled && t.needsScan && (
                        <span className="absolute top-1.5 right-1.5 text-[8px] font-bold text-slate-300 uppercase">2+ hubs</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Reset Terminal -- mobile */}
                <button onClick={() => setShowResetConfirm(true)}
                  className="w-full mt-2 py-3 flex items-center justify-center gap-2 border border-rose-500/20 text-rose-500/60 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/5 rounded-xl text-[10px] font-bold uppercase tracking-widest active:bg-rose-500/10 transition-all">
                  <RotateCcw size={12} /> Reset Terminal
                </button>

              </div>
            )}

          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT SIDEBAR
        ════════════════════════════════════ */}
        <aside className="hidden lg:flex w-96 flex-col gap-4 shrink-0 z-10 overflow-y-auto custom-scrollbar pr-1">

          {/* Strategic Directive */}
          <div className="bg-[#0a0a0a] border border-emerald-500/30 p-5 flex flex-col gap-4 shadow-[0_0_25px_rgba(16,185,129,0.08)] rounded-xl relative shrink-0">
            <div className="absolute top-0 right-0 p-3 overflow-hidden rounded-tr-xl"><Zap size={20} className="text-emerald-500/10" /></div>
            <h2 className="text-[11px] font-bold text-emerald-400 tracking-[0.3em] uppercase flex items-center gap-2">
              <Target size={14} /> Strategic Directive
              <SourceTooltip text="Generated by Claude claude-sonnet-4-6 based on scan results. Always verify with qualified procurement professionals." />
              <span className={`ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${directive ? 'border-emerald-500/25 text-emerald-400 bg-emerald-500/8' : 'border-white/8 text-slate-600'}`}>
                {directive ? 'AI-GENERATED' : 'PENDING SCAN'}
              </span>
            </h2>
            {directive ? (
              <div className="space-y-4">
                <div>
                  <div className="text-[8px] text-slate-300 uppercase font-bold tracking-widest mb-0.5">Target Sourcing Hub</div>
                  <div className="text-[14px] font-bold text-white uppercase tracking-wider">{directive.best_region}</div>
                </div>
                <div>
                  <div className="text-[8px] text-slate-300 uppercase font-bold tracking-widest mb-0.5">Primary Partner</div>
                  <div className="text-[14px] font-bold text-emerald-400 uppercase">{directive.best_partner}</div>
                </div>
                <div className="p-3 bg-rose-500/8 border border-rose-500/25 rounded-lg space-y-1">
                  <div className="text-[8px] text-rose-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <ShieldAlert size={10} /> Trade & Compliance Alert
                  </div>
                  <div className="text-[11px] text-rose-200 leading-snug">{directive.tariff_alert}</div>
                </div>
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-slate-300 leading-relaxed italic rounded-lg border-l-2 border-l-emerald-500/40">
                  &ldquo;{directive.summary}&rdquo;
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-300 italic flex items-center gap-2 animate-pulse">
                <Clock size={13} /> Run a mission scan to generate directive...
              </div>
            )}
            {opportunities.length > 0 && (
              <button onClick={() => setShowRecommendation(true)}
                className="w-full mt-3 h-9 bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all rounded-lg flex items-center justify-center gap-2">
                <CheckCircle size={12} /> Get Recommendation
              </button>
            )}
          </div>

          {/* Freight Route Risk -- Chokepoints */}
          {opportunities.length > 0 && (() => {
            const primaryHub = opportunities[0]
            const relevant   = getRelevantChokepoints(primaryHub)
            if (relevant.length === 0) return null
            const critCount = relevant.filter(c => c.status === 'CRITICAL' || c.status === 'ELEVATED').length
            return (
              <div className="bg-[#0a0a0a] border border-amber-500/25 p-4 flex flex-col gap-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.06)] shrink-0">
                <h2 className="text-[11px] font-bold text-amber-400 tracking-[0.25em] uppercase flex items-center gap-2 shrink-0">
                  <Ship size={13} /> Freight Route Risk
                  {critCount > 0 && (
                    <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-400">
                      {critCount} ACTIVE ALERT{critCount > 1 ? 'S' : ''}
                    </span>
                  )}
                </h2>
                <p className="text-[10px] text-slate-300 -mt-1">
                  Chokepoints on primary route from {primaryHub.hub}
                </p>
                <div className="space-y-2">
                  {relevant.map(cp => {
                    const isCrit   = cp.status === 'CRITICAL'
                    const isElev   = cp.status === 'ELEVATED'
                    const isMod    = cp.status === 'MODERATE'
                    const isNormal = cp.status === 'NORMAL' || cp.status === 'OPEN'
                    const border   = isCrit ? 'border-rose-500/30 bg-rose-500/5' : isElev ? 'border-amber-500/25 bg-amber-500/5' : isMod ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-white/8 bg-white/2'
                    const textCol  = isCrit ? 'text-rose-400' : isElev ? 'text-amber-400' : isMod ? 'text-yellow-400' : 'text-emerald-400'
                    const dot      = isCrit ? '🔴' : isElev ? '🟠' : isMod ? '🟡' : '🟢'
                    return (
                      <div key={cp.id} className={`p-3 rounded-lg border ${border}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[11px]">{dot}</span>
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{cp.name}</span>
                          <span className={`ml-auto text-[8px] font-bold uppercase tracking-widest ${textCol}`}>{cp.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-snug">{cp.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          {/* Market Intelligence / News */}
          <div className="bg-[#0a0a0a] border border-white/10 flex-1 min-h-[320px] p-4 flex flex-col gap-3 rounded-xl shadow-xl">
            <div className="flex items-center justify-between shrink-0">
              <h2 className="text-[11px] font-bold text-slate-300 tracking-[0.2em] uppercase flex items-center gap-2">
                <Newspaper size={14} className="text-sky-400" /> Market Intelligence
                <SourceTooltip text="News sourced via NewsAPI from Reuters, Bloomberg, AP, Financial Times. Filtered by geopolitical and trade relevance." />
              </h2>
              <div className="flex items-center gap-2">
                {/* Staleness badge for market-intelligence.json data */}
                {marketIntelMeta?.ageDays !== null && marketIntelMeta?.ageDays > 3 && (
                  <div
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider"
                    style={marketIntelMeta.ageDays > 7
                      ? { borderColor: 'rgba(239,68,68,0.35)', color: '#f87171', backgroundColor: 'rgba(239,68,68,0.08)' }
                      : { borderColor: 'rgba(251,191,36,0.35)', color: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)' }}
                    title={`Market brief last updated ${marketIntelMeta.ageDays} day${marketIntelMeta.ageDays === 1 ? '' : 's'} ago`}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: marketIntelMeta.ageDays > 7 ? '#f87171' : '#fbbf24' }}
                    />
                    {`Brief · ${marketIntelMeta.ageDays}d old`}
                  </div>
                )}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider"
                  style={newsLoading
                    ? { borderColor: 'rgba(100,116,139,0.3)', color: '#64748b' }
                    : news.length > 0
                    ? { borderColor: 'rgba(16,185,129,0.3)', color: '#34d399', backgroundColor: 'rgba(16,185,129,0.05)' }
                    : { borderColor: 'rgba(100,116,139,0.2)', color: '#475569' }}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${newsLoading ? 'bg-slate-500' : news.length > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  {newsLoading ? 'Loading' : news.length > 0 ? `Live · ${news.length} articles` : 'Unavailable'}
                </div>
              </div>
            </div>
            {/* Region filter */}
            <div className="flex items-center gap-1 flex-wrap shrink-0">
              {missionKeywords.length > 0 && (
                <button onClick={() => setNewsFilter('mission')}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all flex items-center gap-1 ${
                    newsFilter === 'mission'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-emerald-400 border border-white/5'
                  }`}>
                  ⚡ Mission
                </button>
              )}
              {[['all','All'],['china','🇨🇳'],['eu','🇪🇺'],['usa','🇺🇸'],['latam','🌎'],['india','🇮🇳']].map(([key, label]) => (
                <button key={key} onClick={() => setNewsFilter(key)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all ${
                    newsFilter === key
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-300 hover:text-slate-400'
                  }`}>
                  {label}
                </button>
              ))}
              <span className="ml-auto text-[11px] text-slate-300 font-mono">{filteredNews.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar min-h-0">
              {filteredNews.length === 0 ? (
                <p className="text-[11px] text-slate-300 italic py-2">
                  {newsFilter === 'mission' ? 'Run a mission scan to surface relevant intelligence.' : newsLoading ? 'Loading trade intelligence...' : 'No articles match this filter.'}
                </p>
              ) : filteredNews.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className="block border-b border-white/5 pb-3 last:border-0 group">
                  <div className="text-[11px] text-slate-300 font-bold mb-1 uppercase tracking-widest flex items-center justify-between">
                    <span className="flex items-center gap-1">{item._mission && <span className="text-emerald-400">⚡</span>}{item.pubDate}</span>
                    <ExternalLink size={9} className="opacity-0 group-hover:opacity-100 text-sky-400 transition-all" />
                  </div>
                  <h3 className="text-xs font-bold leading-snug mb-0.5 group-hover:text-sky-400 transition-all uppercase tracking-tight text-slate-200">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed font-sans">{item.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Metals & Materials */}
          <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-xl shrink-0" data-tour="market">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                <BarChart3 size={14} /> Metals &amp; Materials
              </h2>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${
                commodities?.quality === 'live' ? 'bg-emerald-500/10 border-emerald-500/20' :
                commodities?.quality === 'delayed' ? 'bg-amber-500/10 border-amber-500/20' :
                'bg-white/5 border-white/10'
              }`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                  commodities?.quality === 'live' ? 'bg-emerald-400 animate-pulse' :
                  commodities?.quality === 'delayed' ? 'bg-amber-400' :
                  'bg-slate-500'
                }`} />
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{color:
                  commodities?.quality === 'live' ? '#34d399' :
                  commodities?.quality === 'delayed' ? '#fbbf24' :
                  '#64748b'
                }}>
                  {commodities?.quality === 'live' ? `Live • ${metalsTs}` :
                   commodities?.quality === 'delayed' ? `EOD • ${metalsTs}` :
                   `Ref • Jan 2024`}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(() => {
                const SPARKS = [[68,72,70,74,71,76,74],[58,60,57,62,63,65,68],[72,70,73,71,74,72,74],[80,77,75,78,74,72,70],[42,48,52,55,60,65,72],[75,73,76,72,70,68,67]];
                const BASE = [
                  { n:'Brent Crude', u:'/bbl', p:'$89.24', c:'+1.2%', up:true  },
                  { n:'Copper',      u:'/lb',  p:'$4.12',  c:'+2.4%', up:true  },
                  { n:'Aluminum',    u:'/mt',  p:'$2,350', c:'+0.5%', up:true  },
                  { n:'Nickel',      u:'/mt',  p:'$18.4k', c:'-0.9%', up:false },
                  { n:'Rare Earth',  u:'/kg',  p:'$142',   c:'+6.8%', up:true  },
                  { n:'HRC Steel',   u:'/st',  p:'$840',   c:'-0.8%', up:false },
                ];
                const src = commodities?.prices || [];
                const find = (names) => names.map(n => src.find(x => x.name.toLowerCase().includes(n))).find(Boolean);
                const live = [
                  find(['brent']), find(['copper']), find(['alum']),
                  find(['nickel']), find(['rare','earth']), find(['steel','hrc']),
                ];
                return live.map((l, i) => l
                  ? { n: l.name, u: l.unit, p: l.price, c: l.change, up: l.up, live: true, spark: SPARKS[i] }
                  : { ...BASE[i], spark: SPARKS[i] }
                );
              })().map((item, i) => {
                const min = Math.min(...item.spark), max = Math.max(...item.spark)
                const pts = item.spark.map((v, j) => {
                  const x = (j / (item.spark.length - 1)) * 56
                  const y = 16 - ((v - min) / (max - min + 0.01)) * 14
                  return `${x},${y}`
                }).join(' ')
                return (
                  <div key={i} className={`bg-[#111] border rounded-lg p-2.5 transition-all ${item.up ? 'border-emerald-500/10 hover:border-emerald-500/25' : 'border-rose-500/10 hover:border-rose-500/25'}`}>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="text-[11px] text-slate-300 uppercase font-bold truncate leading-tight">{item.n}</div>
                      <svg width="58" height="18" viewBox="0 0 58 18" className="shrink-0 opacity-60">
                        <polyline points={pts} fill="none" stroke={item.up ? '#34d399' : '#f87171'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-[13px] font-bold text-white font-mono leading-none">{item.p}<span className="text-[11px] text-slate-300">{item.u}</span></div>
                    <div className={`text-[11px] font-bold mt-0.5 flex items-center gap-1 ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}{item.c}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-[10px] text-slate-300 mt-2">
              {commodities?.anyLive
                ? <>Live futures via CME / Yahoo Finance. <span className="text-slate-400">Ref</span> = non-exchange reference price.</>
                : 'Reference prices. Live CME futures load on page refresh.'}
            </p>
          </div>

          {/* Live FX Rates */}
          {fxData && (
            <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-xl shrink-0" data-tour="fx">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[11px] font-bold text-amber-400 tracking-[0.2em] uppercase flex items-center gap-2">
                  <TrendingUp size={14} /> Live FX Rates
                </h2>
                <button
                  onClick={refreshFx}
                  className="flex items-center gap-1 text-[8px] text-slate-300 hover:text-amber-400 font-mono transition-colors"
                  title="Rates refresh automatically every 5 minutes. Click to refresh now.">
                  <span>as of {fxData.date}</span>
                  <span className="text-[11px]">⟳</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(fxData.rates || {}).slice(0, 6).map(([code, info]) => (
                  <div key={code} className="flex items-center justify-between p-2.5 bg-[#111] border border-white/5 rounded-lg" title={info.impact}>
                    <div>
                      <div className="text-[11px] font-bold text-white font-mono">{info.flag} {code}</div>
                      <div className="text-[11px] text-slate-300 mt-0.5 leading-tight">
                        {info.impact?.split(' ').slice(0, 3).join(' ')}
                      </div>
                    </div>
                    <span className="text-[14px] font-bold text-amber-300 font-mono">
                      {typeof info.rate === 'number' ? info.rate.toFixed(2) : info.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>

      {/* System health pill — desktop only */}
      {(() => {
        const health = Math.max(0, 100 - apiErrCount * 34)
        const dotColor = health === 100 ? 'bg-emerald-500' : health >= 66 ? 'bg-amber-400' : 'bg-rose-500'
        return (
          <div className="hidden lg:flex fixed bottom-5 left-5 z-[120] items-center gap-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-2xl">
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">SYS · {health}%</span>
          </div>
        )
      })()}

      {/* Legal footer */}
      <footer className="fixed bottom-5 right-5 z-[120] hidden lg:flex items-center gap-3">
        <Link href="/legal/terms" className="text-[8px] text-slate-500 hover:text-slate-200 transition-colors uppercase tracking-widest">Terms</Link>
        <span className="text-slate-600 text-[8px]">&bull;</span>
        <Link href="/legal/disclaimer" className="text-[8px] text-slate-500 hover:text-slate-200 transition-colors uppercase tracking-widest">Disclaimer</Link>
        <span className="text-slate-600 text-[8px]">&bull;</span>
        <Link href="/legal/data-sources" className="text-[8px] text-slate-500 hover:text-slate-200 transition-colors uppercase tracking-widest">Data Sources</Link>
        <span className="text-slate-600 text-[8px]">&bull;</span>
        <Link href="/methodology" className="text-[8px] text-slate-500 hover:text-slate-200 transition-colors uppercase tracking-widest">Methodology</Link>
      </footer>

    </div>
  )
}

// -- Reset Terminal Confirmation Modal -----------------------------------------
function ResetConfirmModal({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-rose-500/30 w-full max-w-sm rounded-2xl shadow-[0_0_60px_rgba(244,63,94,0.12)] p-6 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center">
            <RotateCcw size={22} className="text-rose-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-white tracking-wide">Reset Terminal?</h2>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              This will permanently delete your entire Mission Archive and reload the terminal in a clean state. This cannot be undone.
            </p>
          </div>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-4 space-y-2">
          {[
            'All saved mission history will be erased',
            'Current scan results will be cleared',
            'Terminal will reload to its default state',
          ].map((line, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500/60 mt-1.5 shrink-0" />
              <span className="text-[11px] text-slate-300">{line}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={onConfirm}
            className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 text-rose-400 font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
            <RotateCcw size={13} /> Yes. Reset Terminal
          </button>
          <button onClick={onCancel}
            className="w-full py-2.5 text-slate-300 hover:text-slate-300 font-bold text-[11px] uppercase tracking-widest rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all">
            Cancel Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
