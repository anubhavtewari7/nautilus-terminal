"use client"
import React, { useState } from 'react'
import { X, Shield, AlertTriangle, CheckCircle, Search, Loader2, ExternalLink, Info } from 'lucide-react'
import { motion } from 'framer-motion'

// ── Sanctioned & high-risk country database ────────────────────────────────
const COUNTRY_RISK = {
  // US OFAC Comprehensive Sanctions Programs
  'iran': { ofac: 'BLOCKED', eu: 'BLOCKED', un: 'PARTIAL', level: 'PROHIBITED', program: 'Iran Sanctions (ITSR)', note: 'Comprehensive US sanctions. Almost all transactions prohibited. EU and UN also impose significant restrictions.' },
  'north korea': { ofac: 'BLOCKED', eu: 'BLOCKED', un: 'BLOCKED', level: 'PROHIBITED', program: 'DPRK Sanctions', note: 'Total embargo. UN SC Resolution 2371+ prohibits virtually all trade. No exceptions for commercial transactions.' },
  'cuba': { ofac: 'BLOCKED', eu: 'CLEAR', un: 'CLEAR', level: 'PROHIBITED', program: 'Cuba Embargo (CACR)', note: 'US OFAC comprehensive embargo. EU/UN have no restrictions. Some licensed exceptions for food/medicine.' },
  'syria': { ofac: 'BLOCKED', eu: 'BLOCKED', un: 'PARTIAL', level: 'PROHIBITED', program: 'Syria Sanctions (SySR)', note: 'Comprehensive US and EU sanctions. SDF/Kurdish regions have some exemptions. Verify intended recipient.' },
  // Sectoral / Significant Sanctions
  'russia': { ofac: 'SECTORAL', eu: 'SECTORAL', un: 'CLEAR', level: 'HIGH RISK', program: 'Russia CAPTA / DETER sanctions', note: 'Broad sectoral sanctions post Feb 2022. Defence, energy, finance, luxury goods, technology sectors blocked. Verify each product/entity.' },
  'belarus': { ofac: 'SECTORAL', eu: 'BLOCKED', un: 'CLEAR', level: 'HIGH RISK', program: 'Belarus Sanctions', note: 'Significant US and EU sectoral sanctions following 2020 election crisis. Key industries restricted.' },
  'venezuela': { ofac: 'SECTORAL', eu: 'SECTORAL', un: 'CLEAR', level: 'HIGH RISK', program: 'Venezuela Sanctions (VZLA)', note: 'Government and state entities sanctioned. Oil sector heavily restricted. Private transactions may be possible with due diligence.' },
  'myanmar': { ofac: 'SECTORAL', eu: 'SECTORAL', un: 'CLEAR', level: 'HIGH RISK', program: 'Burma/Myanmar Sanctions', note: 'Military-linked entities sanctioned post-2021 coup. Jade, gems, and military-linked businesses blocked.' },
  'zimbabwe': { ofac: 'TARGETED', eu: 'TARGETED', un: 'CLEAR', level: 'ELEVATED', program: 'Zimbabwe Sanctions', note: 'Targeted sanctions on specific individuals/entities. General commerce possible with proper due diligence.' },
  // Elevated Due Diligence
  'china': { ofac: 'TARGETED', eu: 'TARGETED', un: 'CLEAR', level: 'ELEVATED', program: 'Entity List / OFAC SDN targeted designations', note: 'Specific entity restrictions (SMIC, Huawei, DJI on Entity List). Xinjiang cotton/product ban (UFLPA). Military-linked companies on OFAC SDN. Screen each supplier.' },
  'afghanistan': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'Taliban sanctions', note: 'Taliban government sanctioned. General humanitarian trade possible. Non-Taliban commercial entities need vetting.' },
  'somalia': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'Somalia Al-Shabaab related', note: 'Targeted sanctions. Al-Shabaab-linked entities blocked. General commercial activity possible with due diligence.' },
  'sudan': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'Sudan Sanctions (SSR)', note: 'Some OFAC restrictions lifted but targeted designations remain. Darfur arms embargo active. Screen counterparties.' },
  'iraq': { ofac: 'TARGETED', eu: 'CLEAR', un: 'TARGETED', level: 'ELEVATED', program: 'Iraq Legacy Sanctions', note: 'Most sanctions lifted. ISIS/former regime officials on SDN. Conduct screening; general trade permitted.' },
  'ethiopia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor)', note: 'No active sanctions programs. Monitor for conflict-related developments in Tigray region.' },
  'india': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Strong US trade partner. USMCA excludes India — standard MFN tariffs apply.' },
  'germany': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No restrictions. EU member state. Standard trade applies.' },
  'vietnam': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Active CPTPP member. Growing FDI hub for supply chain diversification.' },
  'mexico': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. USMCA zero-duty access to US. Strong nearshoring destination.' },
  'taiwan': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Key semiconductor hub. US CHIPS Act supports Taiwan-US semiconductor supply chain.' },
  'south korea': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. KORUS FTA — zero duty on most goods.' },
  'japan': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. US-Japan trade relations strong. CPTPP member.' },
  'brazil': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Key agricultural and industrial supply chain hub.' },
  'united states': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'Domestic. No restrictions.' },
  'usa': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'Domestic. No restrictions.' },
  'uk': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. US-UK bilateral trade strong post-Brexit.' },
  'united kingdom': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. US-UK bilateral trade strong post-Brexit.' },
  // Additional sanctioned / high-risk countries
  'mali': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'Mali Sanctions', note: 'UN arms embargo. Targeted sanctions on individuals linked to political violence. Monitor closely for military-linked entities.' },
  'eritrea': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'Eritrea Sanctions', note: 'Arms embargo. Targeted sanctions remain in place. General trade possible with due diligence.' },
  'libya': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'Libya Sanctions', note: 'Arms embargo active. Targeted sanctions on individuals/entities. Oil sector requires careful counterparty vetting.' },
  'haiti': { ofac: 'TARGETED', eu: 'CLEAR', un: 'TARGETED', level: 'ELEVATED', program: 'Haiti Gang Sanctions', note: 'UN and OFAC targeted sanctions on gang leaders post-2022. Commercial transactions generally possible with vetting.' },
  'central african republic': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'CAR Sanctions', note: 'UN arms embargo. Targeted designations. Wagner/Russia-linked entities present — screen carefully.' },
  'south sudan': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'South Sudan Sanctions', note: 'Arms embargo and targeted individual sanctions. Oil sector active but requires full counterparty due diligence.' },
  'congo': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'DRC Sanctions', note: 'Arms embargo. Conflict minerals (coltan, cassiterite, gold, wolframite) require OECD Due Diligence documentation. Screen mining entities.' },
  'democratic republic of congo': { ofac: 'TARGETED', eu: 'TARGETED', un: 'TARGETED', level: 'ELEVATED', program: 'DRC Sanctions', note: 'Arms embargo. Conflict minerals require OECD Due Diligence documentation. Screen mining entities thoroughly.' },
  'turkey': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor re: Russia exposure)', note: 'No sanctions. NATO member and EU customs union. Monitor for potential secondary sanctions exposure due to Turkey-Russia trade flows. Screen individual entities for Russia links.' },
  'pakistan': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (FATF grey-listed 2018-2022)', note: 'No active sanctions. Removed from FATF grey list in 2022. Textiles, chemicals, sports goods major exports. Standard due diligence applies.' },
  'nigeria': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None', note: 'No sanctions. Largest African economy. Oil, agriculture, tech. Standard AML/KYC due diligence advised.' },
  'indonesia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Key supply chain hub for palm oil, nickel, coal, textiles, electronics. Strong FDI environment.' },
  'thailand': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Major electronics, automotive, and agriculture exporter. RCEP member.' },
  'bangladesh': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Global apparel and textiles hub. Monitor labour compliance standards (RMG sector).' },
  'cambodia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor for UFLPA exposure)', note: 'No sanctions. Growing apparel manufacturing base. Monitor supply chain for potential Xinjiang cotton inputs subject to UFLPA.' },
  'ukraine': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (active conflict zone)', note: 'No sanctions on Ukraine. Avoid east/south conflict zones. Agricultural and steel supply chains disrupted. Screen for Russia-linked entities within supply chain.' },
  'georgia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor Russia re-export risk)', note: 'No sanctions. Monitor for potential use as Russia sanctions-evasion transshipment point.' },
  'armenia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor Russia re-export risk)', note: 'No sanctions. Monitor for Russia sanctions evasion risk given geographic proximity and trade ties.' },
  'kazakhstan': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor Russia re-export risk)', note: 'No sanctions. Key for rare earths, uranium, and oil. Monitor for Russia-linked entity exposure and potential re-export sanctions risk.' },
  'serbia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None', note: 'No sanctions. EU candidate country. Growing nearshoring destination. Monitor for individual entity screening.' },
  'uae': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor re: sanctions evasion)', note: 'No sanctions. Major trade hub. Monitor for Russia/Iran sanctions evasion transshipment risk. Enhanced due diligence on ultimate beneficial ownership.' },
  'hong kong': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None (monitor China entity exposure)', note: 'No independent sanctions. China Entity List and OFAC designations apply. National Security Law (2020) has affected certain business operations. Screen individual entities.' },
  'israel': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'LOW', program: 'None', note: 'No sanctions. US FTA (zero duty on most goods). Active conflict in Gaza — monitor logistics disruption and security implications for supply chain.' },
  'saudi arabia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Key oil producer. Vision 2030 driving manufacturing investment. Standard due diligence.' },
  'malaysia': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Key electronics, palm oil, and chemicals exporter. CPTPP member.' },
  'philippines': { ofac: 'CLEAR', eu: 'CLEAR', un: 'CLEAR', level: 'CLEAR', program: 'None', note: 'No sanctions. Electronics, semiconductors, services. Growing manufacturing base.' },
}

// ── High-risk entity keywords (SDN heuristic) ──────────────────────────────
const SDN_KEYWORDS = [
  { keyword: 'revolutionary guard', list: 'OFAC SDN — IRGC', severity: 'BLOCKED', note: 'Islamic Revolutionary Guard Corps and affiliates are fully blocked by US OFAC.' },
  { keyword: 'irgc', list: 'OFAC SDN — IRGC', severity: 'BLOCKED', note: 'IRGC-designated entity. All transactions prohibited under US law.' },
  { keyword: 'hezbollah', list: 'OFAC SDN / EU / UN', severity: 'BLOCKED', note: 'Designated terrorist organization. Fully blocked by US, EU, and UN.' },
  { keyword: 'hamas', list: 'OFAC SDN / EU', severity: 'BLOCKED', note: 'Designated terrorist organization. Fully blocked.' },
  { keyword: 'smic', list: 'US Entity List', severity: 'RESTRICTED', note: 'Semiconductor Manufacturing International Corporation on US Entity List. Advanced semiconductor equipment requires license.' },
  { keyword: 'huawei', list: 'US Entity List', severity: 'RESTRICTED', note: 'Huawei Technologies on US Entity List. US-origin technology/software requires export license.' },
  { keyword: 'zte', list: 'US Entity List (historic)', severity: 'ELEVATED', note: 'ZTE on Entity List historically. Verify current status with BIS.' },
  { keyword: 'hikvision', list: 'US Entity List / NDAA Section 889', severity: 'RESTRICTED', note: 'Prohibited from US government use under NDAA. On Entity List. Screen carefully.' },
  { keyword: 'dahua', list: 'US Entity List / NDAA Section 889', severity: 'RESTRICTED', note: 'Prohibited from US government use. On Entity List. Screen carefully.' },
  { keyword: 'dji', list: 'US DOD §1260H list', severity: 'ELEVATED', note: 'DJI on DOD China Military Company list. Potential restrictions for US government-related projects.' },
  { keyword: 'rosoboronexport', list: 'OFAC SDN', severity: 'BLOCKED', note: 'Russian state defense exporter. Fully blocked under CAPTA.' },
  { keyword: 'gazprom', list: 'OFAC/EU Sectoral', severity: 'RESTRICTED', note: 'Gazprom group entities under sectoral sanctions. Energy sector restrictions apply.' },
  { keyword: 'sberbank', list: 'OFAC SDN', severity: 'BLOCKED', note: 'Sberbank PJSC on OFAC SDN. All US-person dealings prohibited.' },
  { keyword: 'vtb', list: 'OFAC SDN', severity: 'BLOCKED', note: 'VTB Bank on OFAC SDN. Fully blocked.' },
  { keyword: 'wagner', list: 'OFAC SDN / EU', severity: 'BLOCKED', note: 'Wagner Group (PMC) designated as terrorist organization by US and EU.' },
  { keyword: 'xinjiang', list: 'UFLPA / OFAC Targeted', severity: 'RESTRICTED', note: 'Xinjiang-origin goods subject to UFLPA rebuttable presumption (assumed forced labor). Cotton, polysilicon, tomatoes, and others specifically banned.' },
  { keyword: 'polysilicon', list: 'UFLPA', severity: 'ELEVATED', note: 'Chinese polysilicon (solar) subject to UFLPA forced labor scrutiny. Require full supply chain documentation.' },
  { keyword: 'al-shabaab', list: 'OFAC SDN / UN', severity: 'BLOCKED', note: 'Al-Shabaab designated as terrorist organization. Somalia-linked. All dealings prohibited.' },
  { keyword: 'isis', list: 'OFAC SDN / UN / EU', severity: 'BLOCKED', note: 'ISIS/ISIL/Da\'esh — designated terrorist organization globally. All transactions prohibited.' },
  { keyword: 'isil', list: 'OFAC SDN / UN / EU', severity: 'BLOCKED', note: 'ISIL/ISIS — designated terrorist organization. All transactions prohibited.' },
  { keyword: 'al-qaeda', list: 'OFAC SDN / UN / EU', severity: 'BLOCKED', note: 'Al-Qaeda and affiliates fully blocked globally. All transactions prohibited.' },
  { keyword: 'novatek', list: 'OFAC/EU Sectoral', severity: 'RESTRICTED', note: 'NOVATEK (Russian LNG company) under sectoral sanctions. EU has targeted restrictions on LNG projects.' },
  { keyword: 'rosneft', list: 'EU Sectoral / US SDN adjacent', severity: 'RESTRICTED', note: 'Rosneft under EU sectoral sanctions. US has separate restrictions. Verify before any energy sector engagement.' },
  { keyword: 'lukoil', list: 'EU Sectoral', severity: 'ELEVATED', note: 'Lukoil under EU sectoral sanctions post-2022. Verify current status before transactions.' },
  { keyword: 'bank rossiya', list: 'OFAC SDN', severity: 'BLOCKED', note: 'Bank Rossiya on OFAC SDN list. All transactions with US persons prohibited.' },
  { keyword: 'promsvyazbank', list: 'OFAC SDN', severity: 'BLOCKED', note: 'Promsvyazbank (PSB) on OFAC SDN — Russia\'s primary defense financing bank. Fully blocked.' },
  { keyword: 'uralvagonzavod', list: 'OFAC SDN', severity: 'BLOCKED', note: 'Uralvagonzavod — Russian defense manufacturer, tank producer. On OFAC SDN. Fully blocked.' },
]

const LEVEL_CONFIG = {
  PROHIBITED: { bg: 'bg-rose-500/10', border: 'border-rose-500/40', text: 'text-rose-400', badge: 'bg-rose-500 text-white', icon: <AlertTriangle size={16} className="text-rose-400" /> },
  'HIGH RISK': { bg: 'bg-rose-500/8', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'bg-rose-800/80 text-rose-200', icon: <AlertTriangle size={16} className="text-rose-400" /> },
  ELEVATED: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-700/60 text-amber-200', icon: <Info size={16} className="text-amber-400" /> },
  RESTRICTED: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-700/60 text-amber-200', icon: <Info size={16} className="text-amber-400" /> },
  CLEAR: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-700/60 text-emerald-200', icon: <CheckCircle size={16} className="text-emerald-400" /> },
  LOW: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-700/60 text-emerald-200', icon: <CheckCircle size={16} className="text-emerald-400" /> },
  UNKNOWN: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-slate-400', badge: 'bg-slate-700 text-slate-300', icon: <Info size={16} className="text-slate-400" /> },
}

const STATUS_COLOR = {
  BLOCKED: 'text-rose-400',
  SECTORAL: 'text-amber-400',
  TARGETED: 'text-amber-300',
  PARTIAL: 'text-amber-300',
  CLEAR: 'text-emerald-400',
  RESTRICTED: 'text-amber-400',
  ELEVATED: 'text-amber-300',
}

export default function SanctionsChecker({ onClose }) {
  const [entity, setEntity] = useState('')
  const [country, setCountry] = useState('')
  const [result, setResult] = useState(null)
  const [entityMatches, setEntityMatches] = useState([])
  const [checked, setChecked] = useState(false)
  const [ofacLiveMatches, setOfacLiveMatches] = useState(null) // null = not yet run
  const [ofacLoading, setOfacLoading] = useState(false)
  const [ofacFallback, setOfacFallback] = useState(false)

  /** Call the server-side OFAC SDN route for live matching */
  const checkOfacLive = async (entityName) => {
    setOfacLoading(true)
    setOfacLiveMatches(null)
    setOfacFallback(false)
    try {
      const res = await fetch(`/api/sanctions?q=${encodeURIComponent(entityName)}`)
      if (!res.ok) throw new Error(`API responded ${res.status}`)
      const data = await res.json()
      if (data.fallbackMode) {
        setOfacFallback(true)
        setOfacLiveMatches([])
      } else {
        setOfacLiveMatches(data.matches || [])
        setOfacFallback(false)
      }
    } catch {
      setOfacFallback(true)
      setOfacLiveMatches([])
    } finally {
      setOfacLoading(false)
    }
  }

  const runCheck = async () => {
    const entityLower = entity.toLowerCase()
    const countryLower = country.toLowerCase()

    // Check country (only if a country was provided)
    // Use exact match first, then a word-boundary check for multi-word country names.
    // Avoiding substring matching (e.g. "ira" matching "iran", "uk" matching "turkey").
    let countryResult = null
    if (countryLower) {
      // Pass 1: exact match
      for (const [key, data] of Object.entries(COUNTRY_RISK)) {
        if (countryLower === key) {
          countryResult = { country: key, ...data }
          break
        }
      }
      // Pass 2: the input is multi-word and starts with a known key (e.g. "south korea")
      if (!countryResult) {
        for (const [key, data] of Object.entries(COUNTRY_RISK)) {
          if (key.includes(' ') && countryLower.startsWith(key)) {
            countryResult = { country: key, ...data }
            break
          }
        }
      }
      // Pass 3: known key is a prefix of the input (handles e.g. "germany, europe")
      if (!countryResult) {
        for (const [key, data] of Object.entries(COUNTRY_RISK)) {
          if (countryLower.startsWith(key + ' ') || countryLower.startsWith(key + ',')) {
            countryResult = { country: key, ...data }
            break
          }
        }
      }
    }
    if (!countryResult && countryLower) {
      countryResult = { country: country, ofac: 'UNKNOWN', eu: 'UNKNOWN', un: 'UNKNOWN', level: 'UNKNOWN', program: 'No match in database', note: 'Manually verify against OFAC SDN list, EU Consolidated List, and UN Sanctions List. Country not found in Nautilus database.' }
    }

    // Check entity name against SDN keywords (fast, local)
    const matches = entityLower
      ? SDN_KEYWORDS.filter(k => entityLower.includes(k.keyword))
      : []

    setResult(countryResult)
    setEntityMatches(matches)
    setChecked(true)

    // Kick off live OFAC API check if an entity name was provided
    if (entity.trim()) {
      checkOfacLive(entity.trim())
    } else {
      setOfacLiveMatches(null)
      setOfacFallback(false)
    }
  }

  const cfg = result ? (LEVEL_CONFIG[result.level] || LEVEL_CONFIG.UNKNOWN) : null
  const topMatch = entityMatches[0]
  const entityCfg = topMatch
    ? LEVEL_CONFIG[topMatch.severity] || LEVEL_CONFIG.ELEVATED
    : entityMatches.length === 0 && checked && entity ? LEVEL_CONFIG.CLEAR : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#080808] border border-white/10 w-full max-w-3xl rounded-2xl shadow-[0_0_80px_rgba(239,68,68,0.08)] max-h-[90vh] overflow-y-auto pb-24 md:pb-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center justify-center">
              <Shield size={18} className="text-rose-400" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-rose-400 tracking-[0.2em] uppercase">Sanctions & Restricted Party Checker</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">OFAC SDN · EU Consolidated List · UN Security Council · UFLPA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* ── Compliance disclaimer ─────────────────────────────── */}
          <div style={{
            background: 'rgba(251,191,36,0.08)',
            border: '1px solid rgba(251,191,36,0.35)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}>
            <AlertTriangle size={13} style={{ color: '#FBBF24', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 11, color: 'rgba(237,244,255,0.65)', lineHeight: 1.55, margin: 0 }}>
              <strong style={{ color: '#FBBF24' }}>Reference only — not a compliance tool.</strong>{' '}
              This screen checks a curated reference list and is <em>not</em> connected to the live OFAC SDN list
              (13,000+ entries), EU Consolidated List, or UN Security Council list. Do not rely on this for
              export compliance decisions. Always screen against official government databases and consult a
              licensed trade compliance officer.{' '}
              <a href="https://sanctionssearch.ofac.treas.gov/" target="_blank" rel="noopener noreferrer"
                 style={{ color: '#38BDF8', textDecoration: 'underline' }}>
                Search OFAC directly →
              </a>
            </p>
          </div>
          {/* Legal disclaimer banner -- shown prominently before any search */}
          <div className="flex items-start gap-3 p-3.5 bg-amber-500/8 border border-amber-500/25 rounded-xl">
            <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-300/80 leading-relaxed">
              <strong className="text-amber-300">For screening assistance only -- not legal advice.</strong>{' '}
              NAUTILUS uses a curated static database updated periodically. Always verify against the{' '}
              <a href="https://sanctionssearch.ofac.treas.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-200">OFAC SDN list</a>,{' '}
              <a href="https://www.sanctionsmap.eu/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-200">EU Consolidated List</a>, and{' '}
              <a href="https://www.bis.doc.gov/index.php/policy-guidance/lists-of-parties-of-concern/entity-list" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-200">BIS Entity List</a>{' '}
              before transacting. Consult qualified export control counsel for compliance decisions.
            </p>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5 block">Entity / Supplier Name</label>
              <input
                autoFocus
                value={entity}
                onChange={e => setEntity(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runCheck()}
                placeholder="e.g. Huawei, Gazprom, SQM S.A."
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[12px] font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-all rounded-xl"
              />
              <p className="text-[10px] text-slate-500 mt-1">One name per search -- run separately for each entity.</p>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5 block">Country of Origin / Operation</label>
              <input
                value={country}
                onChange={e => setCountry(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runCheck()}
                placeholder="e.g. China, Russia, Germany"
                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-[12px] font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-all rounded-xl"
              />
            </div>
          </div>

          <button
            onClick={() => runCheck()}
            disabled={!entity.trim() && !country.trim()}
            className="w-full h-11 bg-rose-500 text-white font-bold text-[12px] uppercase tracking-widest hover:bg-rose-400 transition-all disabled:opacity-30 rounded-xl flex items-center justify-center gap-2"
          >
            <Shield size={14} /> Run Sanctions Check
          </button>

          {/* Country result */}
          {checked && result && (
            <div className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  {cfg.icon}
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-widest">Country Risk — {result.country.toUpperCase()}</div>
                    <div className={`text-[15px] font-bold uppercase mt-0.5 ${cfg.text}`}>{result.level}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest ${cfg.badge}`}>{result.program}</span>
              </div>

              {/* List statuses */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: '🇺🇸 OFAC/US', status: result.ofac },
                  { label: '🇪🇺 EU List', status: result.eu },
                  { label: '🌐 UN SC', status: result.un },
                ].map((item, i) => (
                  <div key={i} className="bg-black/20 rounded-lg p-2.5 text-center">
                    <div className="text-[10px] text-slate-500 uppercase mb-1">{item.label}</div>
                    <div className={`text-[12px] font-bold font-mono ${STATUS_COLOR[item.status] || 'text-slate-400'}`}>{item.status}</div>
                  </div>
                ))}
              </div>

              <p className="text-[12px] text-slate-400 leading-relaxed">{result.note}</p>
            </div>
          )}

          {/* Entity result */}
          {checked && entity && (
            <div className={`rounded-xl border p-4 ${entityMatches.length > 0 ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
              <div className="flex items-center gap-2.5 mb-3">
                {entityMatches.length > 0 ? <AlertTriangle size={16} className="text-rose-400" /> : <CheckCircle size={16} className="text-emerald-400" />}
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-widest">Entity Screening — {entity}</div>
                  <div className={`text-[14px] font-bold mt-0.5 ${entityMatches.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {entityMatches.length > 0 ? `${entityMatches.length} MATCH${entityMatches.length > 1 ? 'ES' : ''} FOUND` : 'NO MATCHES IN DATABASE'}
                  </div>
                </div>
              </div>
              {entityMatches.length > 0 ? (
                <div className="space-y-2">
                  {entityMatches.map((m, i) => (
                    <div key={i} className="bg-black/20 rounded-lg p-3">
                      <div className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1">{m.list} — {m.severity}</div>
                      <p className="text-[12px] text-slate-400 leading-snug">{m.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  No keyword matches against Nautilus&apos; curated SDN/Entity List database. <strong className="text-amber-400">Always verify</strong> against the official OFAC SDN, EU Consolidated, and UN SC lists before transacting.
                </p>
              )}
            </div>
          )}

          {/* OFAC SDN Live Results */}
          {checked && entity && (ofacLoading || ofacLiveMatches !== null || ofacFallback) && (
            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
              <div className="flex items-center gap-2.5 mb-3">
                {ofacLoading
                  ? <Loader2 size={16} className="text-sky-400 animate-spin" />
                  : ofacFallback
                    ? <Info size={16} className="text-amber-400" />
                    : ofacLiveMatches && ofacLiveMatches.length > 0
                      ? <AlertTriangle size={16} className="text-rose-400" />
                      : <CheckCircle size={16} className="text-emerald-400" />
                }
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-widest">OFAC SDN Matches (Live)</div>
                  <div className={`text-[13px] font-bold mt-0.5 ${
                    ofacLoading ? 'text-sky-400'
                    : ofacFallback ? 'text-amber-400'
                    : ofacLiveMatches && ofacLiveMatches.length > 0 ? 'text-rose-400'
                    : 'text-emerald-400'
                  }`}>
                    {ofacLoading
                      ? 'Querying live OFAC SDN list…'
                      : ofacFallback
                        ? 'Live check unavailable'
                        : ofacLiveMatches && ofacLiveMatches.length > 0
                          ? `${ofacLiveMatches.length} SDN name match${ofacLiveMatches.length > 1 ? 'es' : ''} found`
                          : 'No SDN name matches found'
                    }
                  </div>
                </div>
              </div>

              {ofacFallback && (
                <p className="text-[11px] text-amber-300/70 leading-relaxed">
                  Live OFAC check unavailable — using reference list only. Verify manually at{' '}
                  <a href="https://sanctionssearch.ofac.treas.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-200">sanctionssearch.ofac.treas.gov</a>.
                </p>
              )}

              {!ofacLoading && !ofacFallback && ofacLiveMatches && ofacLiveMatches.length > 0 && (
                <div className="space-y-2">
                  {ofacLiveMatches.map((m, i) => (
                    <div key={i} className="bg-black/20 rounded-lg p-3 flex items-center justify-between gap-3">
                      <span className="text-[12px] font-mono text-white">{m.name}</span>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded shrink-0">
                        Score {m.score}
                      </span>
                    </div>
                  ))}
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    These names appear on the OFAC SDN list and closely match your search. Verify directly at{' '}
                    <a href="https://sanctionssearch.ofac.treas.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-300 text-sky-400">OFAC SDN Search</a>.
                  </p>
                </div>
              )}

              {!ofacLoading && !ofacFallback && ofacLiveMatches && ofacLiveMatches.length === 0 && (
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  No close name matches found in the live OFAC SDN list (13,000+ entries). <strong className="text-amber-400">Always verify</strong> against the official search tool for full-text matching.
                </p>
              )}
            </div>
          )}

          {/* Official verification links */}
          <div className="p-4 bg-[#0a0a0a] border border-white/8 rounded-xl">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2.5">Verify Officially -- Always check primary sources before transacting</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'OFAC SDN Search', url: 'https://sanctionssearch.ofac.treas.gov/', note: 'US Treasury' },
                { label: 'EU Sanctions Map', url: 'https://www.sanctionsmap.eu/', note: 'EU Consolidated List' },
                { label: 'UN SC Sanctions', url: 'https://www.un.org/securitycouncil/sanctions/information', note: 'UN Security Council' },
                { label: 'BIS Entity List', url: 'https://www.bis.doc.gov/index.php/policy-guidance/lists-of-parties-of-concern/entity-list', note: 'Export Controls' },
                { label: 'UFLPA Entity List', url: 'https://www.cbp.gov/trade/forced-labor/UFLPA', note: 'Forced Labor / Xinjiang' },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#111] border border-white/10 rounded-lg text-[11px] text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all group">
                  <span>{link.label}</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-sky-500/50">({link.note})</span>
                  <ExternalLink size={9} className="shrink-0" />
                </a>
              ))}
            </div>
            <p className="text-[10px] text-slate-600 mt-3 leading-relaxed">
              NAUTILUS is not a licensed legal or compliance service. Results are indicative only and do not constitute export control advice. Engage qualified export control counsel for EAR, ITAR, or sanctions compliance decisions.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
