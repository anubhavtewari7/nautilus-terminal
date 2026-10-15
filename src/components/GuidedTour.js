"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, X, Map } from 'lucide-react'

const STEPS = [
  {
    id: 'welcome',
    target: null,
    position: 'center',
    emoji: '🌍',
    title: 'Welcome to Nautilus Terminal',
    content: 'Your rule-based supply chain intelligence platform. Type any material or component and Nautilus maps the best global sourcing hubs — with duty rates, freight costs, ESG scores, risk flags, and live market data. Classification uses structured keyword matching; AI is used only for narrative summaries.',
  },
  {
    id: 'mission',
    target: 'mission',
    position: 'right',
    emoji: '🎯',
    title: 'Active Mission',
    content: 'Click here to define your sourcing mission. Be specific — include the material, application, and any constraints. e.g. "IATF-certified brake pads for passenger vehicles" or "neodymium magnets for EV motor assembly". The more context, the sharper the intelligence.',
  },
  {
    id: 'globe',
    target: 'globe',
    position: 'right',
    emoji: '🌐',
    title: 'Live 3D Supply Chain Globe',
    content: 'Red markers = active supply chain risks tied to physical locations. Green markers = verified sourcing opportunities. Click any marker to load full hub intelligence into the Advisory HUD below. Drag to rotate, scroll to zoom, or use the pause button to freeze rotation.',
  },
  {
    id: 'stability',
    target: 'stability',
    position: 'right',
    emoji: '🛡️',
    title: 'Hub Stability Navigator',
    content: 'Drill into any region of the world to assess port and manufacturing hub risk before committing to a sourcing route. Navigate continent → country → coast → individual hub. Each port shows a composite risk score (0–100) built from World Bank Political Stability data plus port-specific factors: labor disputes, congestion, hurricane/seismic exposure, customs reliability, and active geopolitical alerts.',
  },
  {
    id: 'tabs',
    target: 'tabs',
    position: 'right',
    emoji: '🗂️',
    title: '8-Tab Command Panel',
    content: 'The left sidebar organises intelligence across eight mission-specific tabs: COMMAND (AI directive), SOURCING (hub rankings), RISK (threat radar), COMPLIANCE (regulatory flags), COST (total landed cost breakdown), INTEL (live market intelligence), REPORTS (structured analysis), and SURVEILLANCE (real-time wildfire and seismic sensor feeds overlaid on the globe). Switch tabs to focus on what matters for your mission phase.',
  },
  {
    id: 'surveillance',
    target: 'surv-tab',
    position: 'right',
    emoji: '🛰️',
    title: 'Surveillance: Live Physical Risk Feed',
    content: 'The SURV tab streams real-time sensor data — wildfire perimeters and seismic events — directly onto the 3D globe. Toggle fire and seismic overlays to see which sourcing hubs sit inside active risk zones right now. Critical for assessing force-majeure exposure and disruption probability before committing to a region.',
  },
  {
    id: 'risks',
    target: 'risks',
    position: 'right',
    emoji: '⚠️',
    title: 'Global Threat Radar',
    content: 'Risk factors surfaced specifically for your active mission — Section 301 tariffs, geopolitical disruptions, compliance gaps, forced labour exposure, commodity price volatility. HIGH = act now, MEDIUM = monitor closely. Click any risk to load full exposure detail and mitigation strategies into the HUD.',
  },
  {
    id: 'hubs',
    target: 'hubs',
    position: 'right',
    emoji: '🏭',
    title: 'Sourcing Hubs',
    content: 'Ranked list of the best global sourcing hubs for your material. Click any hub to load full intelligence: duty rates by HTS code, freight cost estimates, ESG scores and sustainability notes, target suppliers filtered by annual turnover ($10M → >$1B), and compliance flags. Use example queries to see this come alive.',
  },
  {
    id: 'market',
    target: 'market',
    position: 'left',
    emoji: '📈',
    title: 'Metals & Materials',
    content: 'Reference prices for key industrial commodities — Brent Crude, Copper, Aluminum, Nickel, Rare Earth, and HRC Steel — with directional sparklines showing recent trend shape. Use this to gauge raw material cost pressure on your supply chain and spot which inputs are running hot before locking in supplier contracts.',
  },
  {
    id: 'fx',
    target: 'fx',
    position: 'left',
    emoji: '💱',
    title: 'Live FX Rates',
    content: 'Live currency exchange rates with sourcing impact notes — refreshed every 5 minutes. CNY weakness = Chinese suppliers cost less in USD. EUR strength = European partners cost more. Always know your FX exposure before signing a supply agreement. Click ⟳ to refresh now.',
  },
  {
    id: 'directive',
    target: 'directive',
    position: 'top',
    emoji: '⚡',
    title: 'Strategic Advisory HUD',
    content: 'The intelligence centre. Click any globe marker or sidebar item to populate this panel with: AI-generated sourcing recommendation, target hub and primary partner, tariff and compliance alerts, ESG scorecard, freight lead times, and target suppliers filterable by annual turnover. Click "Generate RFQ" to draft a procurement email instantly.',
  },
  {
    id: 'transparency',
    target: null,
    position: 'center',
    emoji: 'ⓘ',
    title: 'Source Transparency',
    content: 'Every live data panel carries a small ⓘ — hover it to see exactly which source powers that number. Commodity prices from Yahoo Finance (CME/LME), FX rates from Open Exchange Rates, risk intel from NewsAPI and World Bank, port data from MarineTraffic. The Methodology page (footer link) lists every source with update frequency and accuracy benchmarks.',
  },
  {
    id: 'tools',
    target: 'tools',
    position: 'top',
    emoji: '🔧',
    title: '15-Tool Procurement Suite',
    content: 'Everything a procurement team needs, built in: HS Code Lookup, Mission Archive, Supplier Comparison, Total Landed Cost Calculator, Incoterms Guide, Trade Risk Score, Global Port Monitor (26 ports), Compliance Checklist, BOM Analyzer, Sanctions Checker, Ocean Freight Spot Rates, FTA Eligibility, Tariff Calculator, FX Impact Analyser, and Dual-Use Export Control screen — all integrated, no tab-switching required.',
  },
  {
    id: 'new-tools',
    target: 'new-tools',
    position: 'top',
    emoji: '🆕',
    title: 'Latest Tools: Tariff, FX & Dual-Use',
    content: 'Three newest additions: Tariff Calculator — enter an HS code and origin to compute precise landed-cost tariff impact under current schedules. FX Impact Analyser — model how currency moves shift your supplier cost in real time before signing a contract. Dual-Use Export Control — screen components against EAR and ECCN classifications to flag export licence requirements before you ship.',
  },
  {
    id: 'pdf',
    target: 'pdf',
    position: 'top',
    emoji: '📄',
    title: 'Export & Share',
    content: 'Export PDF generates a complete Executive Mission Brief — hubs, risks, FX snapshot, duty rates, ESG scores, and supplier list — ready to drop into a procurement meeting or board deck. Or just copy the URL: every scan is fully shareable. Send the link and your colleague sees exactly what you see.',
  },
  {
    id: 'done',
    target: null,
    position: 'center',
    emoji: '🚀',
    title: 'You\'re Ready to Source',
    content: 'Run your first scan. Type any material and Nautilus maps the global supply chain for you in 10 seconds. Start with one of the examples in the Sourcing Hubs panel, or define your own mission.',
    cta: true,
  },
]

// Clamp tooltip so it never goes off-screen
function clampedStyle(raw, tooltipW, tooltipH, windowW, windowH) {
  const pad = 12
  let style = { ...raw }
  const left  = style.left  !== undefined ? style.left  : (windowW - tooltipW - (style.right  || 0))
  const top   = style.top   !== undefined ? style.top   : (windowH - tooltipH - (style.bottom || 0))
  const clampedLeft = Math.min(Math.max(pad, left), windowW - tooltipW - pad)
  const clampedTop  = Math.min(Math.max(pad, top),  windowH - tooltipH - pad)
  if (style.transform) style = { ...style, transform: undefined }
  return { ...style, left: clampedLeft, top: clampedTop }
}

// Liquid glass card style
const GLASS = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(120,180,255,0.07) 45%, rgba(56,189,248,0.10) 100%)',
  backdropFilter: 'blur(48px) saturate(180%) brightness(1.15)',
  WebkitBackdropFilter: 'blur(48px) saturate(180%) brightness(1.15)',
  border: '1px solid rgba(255,255,255,0.24)',
  boxShadow: '0 28px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.18), inset 0 0 40px rgba(56,189,248,0.04), 0 0 0 0.5px rgba(255,255,255,0.10)',
}

function GlassHighlight() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: '6%', right: '6%', height: 1,
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.70) 50%, transparent 100%)',
      borderRadius: 999, pointerEvents: 'none',
    }} />
  )
}

export default function GuidedTour({ onComplete, onStartScan, onStepEnter }) {
  const [step, setStep]   = useState(0)
  const [measurement, setMeasurement] = useState(null)
  const [win,  setWin]    = useState({ w: 1440, h: 900 })

  const current = STEPS[step]
  const rect = measurement?.step === step && current.target ? measurement.rect : null
  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1
  const isMobile = win.w < 1024

  // Notify parent when step changes so it can switch tabs, etc.
  useEffect(() => {
    onStepEnter?.(STEPS[step].id)
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  // Track window size
  useEffect(() => {
    const update = () => setWin({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Find and measure target element
  useEffect(() => {
    if (!current.target) return
    let timer
    const setRect = (rect) => setMeasurement({ step, rect })

    const measure = () => {
      const el = document.querySelector(`[data-tour="${current.target}"]`)
      if (el) {
        const r = el.getBoundingClientRect()
        // If the element has zero dimensions it's hidden (e.g. desktop sidebar on mobile)
        // — treat as no target and fall through to center modal
        if (r.width === 0 && r.height === 0) {
          setRect(null)
          return
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        timer = setTimeout(() => {
          setRect(el.getBoundingClientRect())
        }, 350)
      } else {
        setRect(null)
      }
    }
    const frame = requestAnimationFrame(measure)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [step, current.target])

  const goNext = useCallback(() => {
    if (isLast) { onComplete(); return }
    let nextStep = step + 1
    while (nextStep < STEPS.length - 1 && STEPS[nextStep].target) {
      const el = document.querySelector(`[data-tour="${STEPS[nextStep].target}"]`)
      if (el) break
      nextStep++
    }
    setStep(nextStep)
  }, [step, isLast, onComplete])

  const goPrev = useCallback(() => setStep(s => Math.max(0, s - 1)), [])

  // Desktop tooltip positioning
  const TOOLTIP_W = 320
  const TOOLTIP_H = 240
  const PAD = 16

  const rawStyle = () => {
    if (!rect) return {}
    switch (current.position) {
      case 'right':  return { left: rect.right  + PAD, top: rect.top + rect.height / 2 - TOOLTIP_H / 2 }
      case 'left':   return { left: rect.left   - TOOLTIP_W - PAD, top: rect.top + rect.height / 2 - TOOLTIP_H / 2 }
      case 'bottom': return { left: rect.left   + rect.width / 2 - TOOLTIP_W / 2, top: rect.bottom + PAD }
      case 'top':    return { left: rect.left   + rect.width / 2 - TOOLTIP_W / 2, top: rect.top - TOOLTIP_H - PAD }
      default:       return {}
    }
  }

  const tooltipStyle = rect && !isMobile
    ? clampedStyle(rawStyle(), TOOLTIP_W, TOOLTIP_H, win.w, win.h)
    : {}

  const spotlightPad = 8
  // Modal width: responsive on mobile
  const modalWidth = Math.min(440, win.w - 32)

  // On mobile with a visible rect, we show the spotlight + a bottom sheet tooltip
  // On mobile without a rect (hidden desktop element), we show a center modal
  // On desktop: original behavior
  const showCenterModal = current.position === 'center' || (isMobile && !rect && current.target !== null) || (!rect && current.target !== null && current.position !== 'center')
  const showSpotlight   = !!rect && current.position !== 'center'
  const showDesktopTip  = !!rect && !isMobile && current.position !== 'center'
  const showMobileSheet = !!rect && isMobile && current.position !== 'center'

  return (
    <div className="fixed inset-0 z-[500]">

      {/* ── FULL DARK OVERLAY ── */}
      <div className={`absolute inset-0 transition-all duration-300 ${(current.position === 'center' || showCenterModal) ? 'bg-black/50' : 'bg-black/75'}`} />

      {/* ── SPOTLIGHT ── */}
      <AnimatePresence mode="wait">
        {showSpotlight && (
          <motion.div
            key={`spot-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              left:   rect.left   - spotlightPad,
              top:    rect.top    - spotlightPad,
              width:  rect.width  + spotlightPad * 2,
              height: rect.height + spotlightPad * 2,
              borderRadius: 14,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
              border: '2px solid rgba(56,189,248,0.55)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── CENTER MODAL (welcome / done / hidden-target steps on mobile) ── */}
      <AnimatePresence mode="wait">
        {(current.position === 'center' || showCenterModal) && (
          <motion.div
            key={`center-${step}`}
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            <div
              className="relative rounded-2xl p-6 md:p-8"
              style={{ width: modalWidth, ...GLASS }}
            >
              <GlassHighlight />
              <div className="text-4xl md:text-5xl mb-4 md:mb-5">{current.emoji}</div>
              <h2 className="text-[12px] md:text-[13px] font-bold text-sky-300 tracking-[0.2em] uppercase mb-2 md:mb-3">{current.title}</h2>
              <p className="text-[12px] md:text-[13px] text-white/80 leading-relaxed font-sans mb-6 md:mb-8">{current.content}</p>

              {/* Progress dots */}
              <div className="flex gap-1.5 mb-5 md:mb-6 flex-wrap">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-5 bg-sky-300' : 'w-1.5 bg-white/20'}`} />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={onComplete} className="text-[10px] text-white/30 hover:text-white/60 active:text-white/60 transition-colors uppercase tracking-widest font-bold">
                  Skip tour
                </button>
                <div className="flex gap-2">
                  {!isFirst && (
                    <button onClick={goPrev}
                      className="flex items-center gap-1 px-4 h-9 border border-white/15 text-white/60 hover:text-white active:text-white text-[10px] font-bold uppercase rounded-lg transition-all backdrop-blur-sm">
                      <ChevronLeft size={13} /> Back
                    </button>
                  )}
                  {current.cta ? (
                    <button onClick={() => { onComplete(); onStartScan?.() }}
                      className="flex items-center gap-1.5 px-5 h-9 bg-emerald-500 text-black font-bold text-[10px] uppercase rounded-lg hover:bg-emerald-400 active:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Start Scanning <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button onClick={goNext}
                      className="flex items-center gap-1.5 px-5 h-9 bg-sky-500 text-black font-bold text-[10px] uppercase rounded-lg hover:bg-sky-400 active:bg-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                      {isFirst ? 'Take the Tour' : 'Next'} <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DESKTOP POSITIONED TOOLTIP ── */}
      <AnimatePresence mode="wait">
        {showDesktopTip && (
          <motion.div
            key={`tip-${step}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute rounded-xl"
            style={{ ...tooltipStyle, width: TOOLTIP_W, zIndex: 2, ...GLASS }}
          >
            <div className="relative p-5">
              <GlassHighlight />
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl leading-none">{current.emoji}</span>
                  <h3 className="text-[10px] font-bold text-sky-300 tracking-[0.18em] uppercase leading-snug">{current.title}</h3>
                </div>
                <button onClick={onComplete} className="text-white/25 hover:text-white/70 transition-colors ml-2 mt-0.5 shrink-0">
                  <X size={13} />
                </button>
              </div>
              <p className="text-[12px] text-white/80 leading-relaxed font-sans mb-4">{current.content}</p>
              <div className="flex gap-1 mb-4">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-0.5 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-sky-300' : 'w-1 bg-white/15'}`} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/25 font-mono">{step + 1} / {STEPS.length}</span>
                <div className="flex gap-1.5">
                  <button onClick={goPrev}
                    className="flex items-center gap-0.5 px-3 h-7 border border-white/15 text-white/60 hover:text-white text-[9px] font-bold uppercase rounded-lg transition-all backdrop-blur-sm">
                    <ChevronLeft size={11} /> Back
                  </button>
                  <button onClick={goNext}
                    className="flex items-center gap-0.5 px-3 h-7 bg-sky-400/90 text-black font-bold text-[9px] uppercase rounded-lg hover:bg-sky-300 transition-all backdrop-blur-sm">
                    {isLast ? 'Done' : 'Next'} <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM SHEET (visible element on mobile, e.g. globe) ── */}
      <AnimatePresence mode="wait">
        {showMobileSheet && (
          <motion.div
            key={`sheet-${step}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl"
            style={{ zIndex: 2, ...GLASS }}
          >
            <div className="relative p-5 overflow-y-auto" style={{ maxHeight: '55vh', paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}>
              <GlassHighlight />
              {/* Drag handle */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl leading-none">{current.emoji}</span>
                  <h3 className="text-[11px] font-bold text-sky-300 tracking-[0.18em] uppercase leading-snug">{current.title}</h3>
                </div>
                <button onClick={onComplete} className="text-white/25 active:text-white/70 transition-colors ml-2 mt-0.5 shrink-0">
                  <X size={14} />
                </button>
              </div>
              <p className="text-[12px] text-white/80 leading-relaxed font-sans mb-4">{current.content}</p>
              <div className="flex gap-1 mb-4 flex-wrap">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-0.5 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-sky-300' : 'w-1 bg-white/15'}`} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/25 font-mono">{step + 1} / {STEPS.length}</span>
                <div className="flex gap-2">
                  <button onClick={goPrev}
                    className="flex items-center gap-0.5 px-4 h-9 border border-white/15 text-white/60 active:text-white text-[10px] font-bold uppercase rounded-xl transition-all">
                    <ChevronLeft size={12} /> Back
                  </button>
                  <button onClick={goNext}
                    className="flex items-center gap-0.5 px-4 h-9 bg-sky-500 text-black font-bold text-[10px] uppercase rounded-xl active:bg-sky-400 transition-all">
                    {isLast ? 'Done' : 'Next'} <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
