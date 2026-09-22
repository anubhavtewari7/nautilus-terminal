'use client'

import { useEffect, useRef, useState } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

:root {
  --bg:      #05080F;
  --bg2:     #080C14;
  --rim:     rgba(255,255,255,0.07);
  --rim2:    rgba(255,255,255,0.04);
  --accent:  #38BDF8;
  --accent2: #0EA5E9;
  --green:   #34D399;
  --red:     #F87171;
  --amber:   #FBBF24;
  --text:    #EDF4FF;
  --text2:   rgba(237,244,255,0.50);
  --text3:   rgba(237,244,255,0.22);
  --mono:    'JetBrains Mono', monospace;
  --sans:    'Inter', system-ui, sans-serif;
  --ease:    cubic-bezier(0.22,1,0.36,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}

.scene {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0;
  animation: glowIn 2.5s var(--ease) forwards;
}
@keyframes glowIn { to { opacity: 1; } }
.g1 { width: 800px; height: 800px; top: -320px; left: -200px;
      background: radial-gradient(circle, rgba(14,80,180,0.45) 0%, transparent 65%);
      animation: glowIn 2.5s var(--ease) forwards, drift1 22s 2.5s ease-in-out infinite; }
.g2 { width: 600px; height: 600px; top: 30%; right: -180px;
      background: radial-gradient(circle, rgba(6,60,110,0.40) 0%, transparent 65%);
      animation: glowIn 2.5s 0.3s var(--ease) forwards, drift2 28s 2.5s ease-in-out infinite; }
.g3 { width: 400px; height: 400px; bottom: 15%; left: 10%;
      background: radial-gradient(circle, rgba(20,80,100,0.30) 0%, transparent 65%);
      animation: glowIn 2.5s 0.6s var(--ease) forwards, drift3 20s 2.5s ease-in-out infinite; }
@keyframes drift1 { 0%,100%{transform:translate(0,0);} 40%{transform:translate(70px,-50px);} 70%{transform:translate(-30px,60px);} }
@keyframes drift2 { 0%,100%{transform:translate(0,0);} 35%{transform:translate(-60px,40px);} 75%{transform:translate(50px,-35px);} }
@keyframes drift3 { 0%,100%{transform:translate(0,0);} 50%{transform:translate(50px,50px);} }

nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.4s, background 0.4s;
}
nav.scrolled {
  background: rgba(5,8,15,0.85);
  border-bottom-color: var(--rim2);
}
.nav-logo {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--text);
}
.nav-logo span { color: var(--accent); }
.nav-tag {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text3);
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-tag::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--green);
  animation: pulse 2.5s infinite;
}
@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.25;} }

.hero {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 32px 80px;
}
.hero-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 36px;
  opacity: 0;
  animation: slideUp 0.8s 0.3s var(--ease) forwards;
}
.hero-title {
  font-size: clamp(4rem, 10vw, 8.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 32px;
  padding: 0 0.08em;
  background: linear-gradient(160deg, #ffffff 0%, #bfdbfe 55%, #7dd3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  animation: slideUp 0.9s 0.45s var(--ease) forwards;
}
.hero-sub {
  font-size: clamp(16px, 2.2vw, 20px);
  font-weight: 300;
  color: var(--text2);
  max-width: 560px;
  line-height: 1.75;
  margin-bottom: 52px;
  opacity: 0;
  animation: slideUp 0.9s 0.60s var(--ease) forwards;
}
.hero-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 80px;
  opacity: 0;
  animation: slideUp 0.9s 0.72s var(--ease) forwards;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 36px;
  border-radius: 100px;
  background: linear-gradient(135deg, var(--accent2), #1D4ED8);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-family: var(--sans);
  box-shadow: 0 0 40px rgba(14,165,233,0.30), 0 1px 0 rgba(255,255,255,0.15) inset;
  transition: transform 0.2s var(--ease), box-shadow 0.2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(14,165,233,0.45), 0 1px 0 rgba(255,255,255,0.15) inset; }
.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 15px 36px;
  border-radius: 100px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--rim);
  color: var(--text2);
  font-size: 14px;
  font-weight: 400;
  cursor: default;
}
.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  font-family: var(--sans);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.btn-download:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.28); transform: translateY(-1px); }
.btn-download svg { flex-shrink: 0; }

.hero-stats {
  display: flex;
  gap: 1px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--rim2);
  border: 1px solid var(--rim2);
  opacity: 0;
  animation: slideUp 0.9s 0.85s var(--ease) forwards;
}
.hstat {
  flex: 1 1 120px;
  padding: 18px 22px;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  text-align: center;
  transition: background 0.2s;
}
.hstat:hover { background: rgba(255,255,255,0.06); }
.hstat-n {
  display: block;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, #fff, #93c5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hstat-l {
  display: block;
  font-size: 10px;
  color: var(--text3);
  margin-top: 3px;
  font-weight: 400;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}

.r {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
}
.r.in { opacity: 1; transform: none; }

.wrap {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
}
.rule {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--rim) 30%, var(--rim) 70%, transparent 100%);
}
.sec { padding: 100px 0; }

.sh-tag {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sh-tag::before { content: '//'; color: var(--text3); font-family: var(--mono); }
.sh-h {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  text-wrap: balance;
}
.sh-h em {
  font-style: normal;
  background: linear-gradient(120deg, #bfdbfe 0%, #7dd3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.sh-p {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 300;
  color: var(--text2);
  line-height: 1.75;
  max-width: 520px;
}

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  padding: 96px 0;
}
.split.flip { direction: rtl; }
.split.flip > * { direction: ltr; }

.split-bullets { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
.sb {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-size: 14px;
  color: var(--text2);
  font-weight: 300;
  line-height: 1.65;
}
.sb-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.mock {
  border-radius: 20px;
  border: 1px solid var(--rim);
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
}
.mock-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--rim2);
  background: rgba(255,255,255,0.02);
}
.dot { width: 10px; height: 10px; border-radius: 50%; }
.mock-body { padding: 20px; }

.scan-hub {
  background: rgba(56,189,248,0.06);
  border: 1px solid rgba(56,189,248,0.15);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 10px;
}
.scan-hub:last-child { margin-bottom: 0; }
.hub-name {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.hub-meta { font-size: 11px; color: var(--text2); font-weight: 300; }
.hub-tags { margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap; }
.ht { font-family: var(--mono); font-size: 9px; padding: 3px 9px; border-radius: 6px; font-weight: 500; }

.threat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 8px;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--rim2);
}
.threat-sev { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.threat-text { flex: 1; font-size: 11px; font-weight: 400; color: var(--text); font-family: var(--mono); }
.threat-src { font-size: 9px; color: var(--text3); font-family: var(--mono); letter-spacing: 0.08em; text-transform: uppercase; }

.badge { font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 9px; border-radius: 100px; white-space: nowrap; }

.comp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid var(--rim2);
  background: rgba(255,255,255,0.02);
}
.comp-check { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
.comp-label { flex: 1; font-size: 11px; color: var(--text); font-family: var(--mono); }
.comp-val { font-size: 10px; font-weight: 600; font-family: var(--mono); letter-spacing: 0.06em; }

.marquee-wrap {
  overflow: hidden;
  padding: 32px 0;
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--rim2);
  border-bottom: 1px solid var(--rim2);
  background: rgba(255,255,255,0.015);
}
.marquee-wrap::before, .marquee-wrap::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 140px;
  z-index: 2;
  pointer-events: none;
}
.marquee-wrap::before { left: 0; background: linear-gradient(90deg, var(--bg), transparent); }
.marquee-wrap::after  { right: 0; background: linear-gradient(-90deg, var(--bg), transparent); }
.marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 40px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text3);
  white-space: nowrap;
  border-right: 1px solid var(--rim2);
}
.marquee-item::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

.stats-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: var(--rim2);
  border: 1px solid var(--rim2);
  border-radius: 20px;
  overflow: hidden;
}
.ss { padding: 40px 20px; text-align: center; background: rgba(255,255,255,0.025); backdrop-filter: blur(16px); transition: background 0.2s; }
.ss:hover { background: rgba(255,255,255,0.05); }
.ss-n { display: block; font-size: 44px; font-weight: 900; letter-spacing: -0.05em; line-height: 1; font-variant-numeric: tabular-nums; }
.ss-l { display: block; font-size: 11px; color: var(--text2); margin-top: 10px; font-weight: 300; }

.outputs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 56px; }
.out {
  border-radius: 20px;
  padding: 36px;
  border: 1px solid var(--rim2);
  background: rgba(255,255,255,0.03);
  transition: border-color 0.3s, transform 0.3s var(--ease);
}
.out:hover { border-color: var(--rim); transform: translateY(-3px); }
.out-line { width: 28px; height: 2px; border-radius: 2px; margin-bottom: 22px; }
.out-title { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 10px; }
.out-desc { font-size: 13.5px; color: var(--text2); font-weight: 300; line-height: 1.7; }

.cta-wrap { position: relative; z-index: 1; padding: 120px 40px; text-align: center; }
.cta-inner { max-width: 700px; margin: 0 auto; }
.cta-h { font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.12; margin-bottom: 20px; text-wrap: balance; }
.cta-p { font-size: 16px; color: var(--text2); font-weight: 300; margin-bottom: 44px; line-height: 1.75; }
.email-form { display: flex; gap: 10px; max-width: 460px; margin: 0 auto; }
.email-input {
  flex: 1;
  padding: 15px 22px;
  border-radius: 100px;
  border: 1px solid var(--rim);
  background: rgba(255,255,255,0.04);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  backdrop-filter: blur(10px);
}
.email-input:focus { border-color: rgba(56,189,248,0.5); background: rgba(255,255,255,0.07); }
.email-input::placeholder { color: var(--text3); }
.email-input:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

footer {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}
.f-top {
  border-top: 1px solid var(--rim2);
  padding: 44px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.f-brand { font-size: 24px; font-weight: 900; letter-spacing: -0.05em; background: linear-gradient(120deg, #fff, #93c5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.f-note { font-size: 11px; color: var(--text3); margin-top: 4px; font-weight: 300; }
.f-right { font-family: var(--mono); font-size: 10px; color: var(--text3); letter-spacing: 0.14em; text-transform: uppercase; }
.f-legal {
  border-top: 1px solid var(--rim2);
  padding: 20px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.f-legal-link {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text3);
  text-decoration: none;
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.f-legal-link:hover { color: rgba(237,244,255,0.55); border-bottom-color: rgba(237,244,255,0.18); }
.f-legal-sep {
  font-family: var(--mono);
  font-size: 9px;
  color: rgba(237,244,255,0.10);
  user-select: none;
}
.press-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 48px;
  margin-bottom: 0;
}
.press-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--text3);
}
.press-pub {
  font-size: 13px;
  font-weight: 600;
  color: rgba(237,244,255,0.55);
  text-decoration: none;
  border-bottom: 1px solid rgba(237,244,255,0.15);
  padding-bottom: 1px;
  transition: color 0.2s, border-color 0.2s;
  letter-spacing: -0.01em;
}
.press-pub:hover { color: var(--text); border-color: rgba(237,244,255,0.4); }

.press-quote-wrap {
  text-align: center;
  max-width: 680px;
  margin: 20px auto 56px;
  padding: 0 32px;
}
.press-quote {
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: var(--text2);
  line-height: 1.75;
  margin: 0 0 12px;
}
.press-cite {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text3);
  font-style: normal;
}
.press-cite em { font-style: normal; color: var(--accent); }

.cases {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 56px;
}
.case-card {
  border-radius: 20px;
  padding: 32px;
  border: 1px solid var(--rim2);
  background: rgba(255,255,255,0.03);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: border-color 0.3s, transform 0.3s var(--ease);
}
.case-card:hover { border-color: rgba(56,189,248,0.22); transform: translateY(-3px); }
.case-num {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--text3);
}
.case-head { display: flex; flex-direction: column; gap: 6px; }
.case-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
}
.case-scenario {
  font-size: 13px;
  color: var(--text2);
  font-weight: 300;
  line-height: 1.7;
  border-left: 2px solid rgba(56,189,248,0.25);
  padding-left: 12px;
}
.case-findings-label {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 2px;
}
.case-findings {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1;
}
.case-finding {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 12.5px;
  color: var(--text2);
  font-weight: 300;
  line-height: 1.65;
}
.case-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 7px;
}
.case-time-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 100px;
  background: rgba(56,189,248,0.07);
  border: 1px solid rgba(56,189,248,0.18);
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.10em;
  align-self: flex-start;
  white-space: nowrap;
}
.case-time-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  animation: pulse 2.5s infinite;
  flex-shrink: 0;
}

@media (max-width: 860px) {
  .split, .split.flip { grid-template-columns: 1fr; direction: ltr; gap: 48px; }
  .stats-strip { grid-template-columns: repeat(3, 1fr); }
  .outputs { grid-template-columns: 1fr; }
  .cases { grid-template-columns: 1fr; }
  nav { padding: 18px 24px; }
  .wrap { padding: 0 24px; }
  .split { padding: 72px 0; }
  .f-top { padding: 36px 24px; }
  .f-legal { padding: 16px 24px; gap: 8px; }
  .cta-wrap { padding: 80px 24px; }
}
@media (max-width: 540px) {
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
  .hero-stats  { flex-direction: column; }
  .email-form  { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .glow, .g1, .g2, .g3, .marquee-track { animation: none; }
  .r { transition: none; }
}
`

const SOURCES = [
  'NASA FIRMS Wildfires','USGS Earthquake Program','UN Comtrade Statistics',
  'Frankfurter FX API','USITC Tariff Database','IMF PortWatch',
  'NewsAPI Trade Intelligence','gCaptain Maritime News','BBC Business RSS','GDELT Geopolitical Events',
]

export default function Home() {
  const navRef = useRef(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error

  // Nav scroll
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.r').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Parallax
  useEffect(() => {
    let ticking = false
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY * 0.03
          const g1 = document.querySelector('.g1')
          const g2 = document.querySelector('.g2')
          if (g1) g1.style.transform = `translateY(${y}px)`
          if (g2) g2.style.transform = `translateY(${-y * 0.7}px)`
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || status === 'loading' || status === 'done') return
    setStatus('loading')

    const TERMINAL_URL = 'https://nautilus-terminal.vercel.app/terminal'

    const messageHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">
      <tr><td style="padding-bottom:28px;">
        <span style="font-size:26px;font-weight:900;letter-spacing:-0.05em;color:#0EA5E9;">NAUTILUS</span>
        <span style="font-size:11px;font-family:'Courier New',monospace;letter-spacing:0.16em;text-transform:uppercase;color:#94A3B8;margin-left:12px;">Terminal</span>
      </td></tr>
      <tr><td style="background:#ffffff;border-radius:16px;border:1px solid #E2E8F0;padding:40px;">
        <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:#0EA5E9;">// Early Access Granted</p>
        <h1 style="margin:0 0 16px;font-size:30px;font-weight:800;letter-spacing:-0.03em;color:#0F172A;line-height:1.15;">You're in.</h1>
        <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.75;">Welcome to NAUTILUS Terminal -- a live intelligence platform built for procurement and supply chain professionals. Your access is active now.</p>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr><td bgcolor="#0EA5E9" style="background:#0EA5E9;border-radius:100px;">
            <a href="${TERMINAL_URL}" style="display:inline-block;padding:15px 36px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Open NAUTILUS Terminal &rarr;</a>
          </td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #E2E8F0;margin:0 0 28px;"/>
        <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#0F172A;text-transform:uppercase;letter-spacing:0.06em;">What you can do from day one</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding-bottom:12px;vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td><td style="padding-bottom:12px;font-size:13px;color:#475569;line-height:1.65;">Scan any product in plain language -- NAUTILUS maps global sourcing hubs, names real suppliers, and pulls live UN Comtrade export data.</td></tr>
          <tr><td style="padding-bottom:12px;vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td><td style="padding-bottom:12px;font-size:13px;color:#475569;line-height:1.65;">Monitor 92,000+ live fire hotspots, M4.5+ earthquakes, and 15 conflict zones -- overlaid on your sourcing geography automatically.</td></tr>
          <tr><td style="padding-bottom:12px;vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td><td style="padding-bottom:12px;font-size:13px;color:#475569;line-height:1.65;">Instant compliance: OFAC sanctions, ECCN classification, Section 301 tariffs, and FTA eligibility -- checked at the point of sourcing.</td></tr>
          <tr><td style="vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td><td style="font-size:13px;color:#475569;line-height:1.65;">Export a PDF mission brief, supplier RFQ, and total landed cost model in one click.</td></tr>
        </table>
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;">
          <tr><td style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px 18px;">
            <p style="margin:0 0 5px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#94A3B8;">Bookmark this</p>
            <a href="${TERMINAL_URL}" style="font-family:'Courier New',monospace;font-size:12px;color:#0EA5E9;text-decoration:none;">${TERMINAL_URL}</a>
          </td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#94A3B8;">If you don't see this email in your inbox, check your spam or promotions folder and mark it as Not Spam.</p>
      </td></tr>
      <tr><td style="padding:24px 0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#94A3B8;">&copy; 2026 NAUTILUS Terminal &nbsp;&middot;&nbsp; ${email}</p>
        <p style="margin:6px 0 0;font-size:10px;color:#CBD5E1;">You received this because you requested early access.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_xrughp6',
          template_id: 'template_bjw3dhz',
          user_id: 'NFvpRULP0SJgNBrJs',
          template_params: {
            to_email: email,
            subject: 'Your NAUTILUS Terminal access is ready',
            message: messageHtml,
          },
        }),
      })
      if (res.status !== 200) throw new Error('failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const scrollToCta = (e) => {
    e.preventDefault()
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Ambient glow */}
      <div className="scene" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="glow g3" />
      </div>

      {/* Nav */}
      <nav ref={navRef}>
        <div className="nav-logo">NAUTILU<span>S</span></div>
        <div className="nav-tag">Live Data Active</div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow">Supply Chain Intelligence Terminal</div>
        <h1 className="hero-title">NAUTILUS</h1>
        <p className="hero-sub">
          A professional-grade intelligence platform that translates live global data into supply chain decisions your team can act on immediately.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToCta}>Request Early Access &rarr;</button>
          <a
            className="btn-download"
            href="https://github.com/anubhavtewari7/nautilus-terminal/releases/latest/download/NAUTILUS-Setup-1.0.0.exe"
            title="Download for Windows"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z"/></svg>
            Windows
          </a>
          <a
            className="btn-download"
            href="https://github.com/anubhavtewari7/nautilus-terminal/releases/latest/download/NAUTILUS-1.0.0.dmg"
            title="Download for macOS"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
            macOS
          </a>
        </div>
        <div className="hero-stats">
          {[
            { n: '92K+', l: 'Fire hotspots / day' },
            { n: '26',   l: 'Ports monitored' },
            { n: '14',   l: 'Chokepoints tracked' },
            { n: '33',   l: 'Live FX currencies' },
            { n: '10',   l: 'Data feeds' },
          ].map(s => (
            <div key={s.n} className="hstat">
              <span className="hstat-n">{s.n}</span>
              <span className="hstat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Press */}
      <div className="press-strip r" style={{ transitionDelay: '0.95s' }}>
        <span className="press-label">As featured in</span>
        <a
          href="https://www.sdcexec.com/software-technology/wms-tms/news/22973252/atlas-terminal-atlas-terminal-launches-supply-chain-intelligence-platform-for-procurement-and-sourcing-professionals"
          target="_blank"
          rel="noopener noreferrer"
          className="press-pub"
        >
          Supply &amp; Demand Chain Executive
        </a>
      </div>

      <div className="press-quote-wrap r" style={{ transitionDelay: '1.0s' }}>
        <blockquote className="press-quote">
          &ldquo;Procurement teams are making multi-million-dollar sourcing decisions while juggling eight browser tabs. The intelligence exists; it just shouldn&apos;t be this hard to access.&rdquo;
        </blockquote>
        <cite className="press-cite">-- Anubhav Tewari, Founder &amp; Developer, NAUTILUS Terminal &nbsp;&middot;&nbsp; <em>Supply &amp; Demand Chain Executive, Sep 1 2026</em></cite>
      </div>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track" aria-hidden="true">
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <span key={i} className="marquee-item">{s}</span>
          ))}
        </div>
      </div>

      <div className="rule" />

      {/* Sourcing split */}
      <div className="wrap">
        <div className="split">
          <div className="split-text r">
            <div className="sh-tag">Sourcing Intelligence</div>
            <h2 className="sh-h">Any product.<br /><em>Global sourcing map</em><br />in seconds.</h2>
            <p className="sh-p">Describe what you need in plain language. NAUTILUS identifies the best global hubs, names real suppliers, and pulls live UN Comtrade export statistics.</p>
            <div className="split-bullets">
              {[
                'Verified supplier companies named per hub with live export data',
                'ESG flags: forced labor, conflict minerals, deforestation exposure',
                'Industry KPIs: lead times, MOQ norms, certification requirements',
                'Auto-complete across 15+ commodity categories',
              ].map(t => (
                <div key={t} className="sb">
                  <span className="sb-dot" style={{ background: 'var(--accent)' }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="r" style={{ transitionDelay: '0.12s' }}>
            <div className="mock">
              <div className="mock-bar">
                <div className="dot" style={{ background: '#ff5f57' }} /><div className="dot" style={{ background: '#febc2e' }} /><div className="dot" style={{ background: '#28c840' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', marginLeft: 8 }}>NAUTILUS -- Sourcing Scan</span>
              </div>
              <div className="mock-body">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>&#8627; neodymium magnets for EV motor assembly</div>
                <div className="scan-hub">
                  <div className="hub-name">BAOTOU, CHINA -- NdFeB Capital</div>
                  <div className="hub-meta">Zhongke Sanhuan &middot; JL MAG &middot; Yantai Zhenghai &nbsp;&middot;&nbsp; $4.2B exported (2023)</div>
                  <div className="hub-tags">
                    <span className="ht" style={{ background: 'rgba(56,189,248,0.12)', color: 'var(--accent)' }}>ECCN 1C006</span>
                    <span className="ht" style={{ background: 'rgba(251,191,36,0.12)', color: 'var(--amber)' }}>REE export quotas</span>
                    <span className="ht" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--green)' }}>CPTPP eligible</span>
                  </div>
                </div>
                <div className="scan-hub" style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.12)' }}>
                  <div className="hub-name">ARNSBERG, GERMANY -- Tier 1 Alt</div>
                  <div className="hub-meta">Vacuumschmelze &middot; Arnold Magnetic Technologies &nbsp;&middot;&nbsp; $890M exported (2023)</div>
                  <div className="hub-tags">
                    <span className="ht" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--green)' }}>Low ESG risk</span>
                    <span className="ht" style={{ background: 'rgba(56,189,248,0.12)', color: 'var(--accent)' }}>EU CBAM compliant</span>
                  </div>
                </div>
                <div className="scan-hub" style={{ opacity: 0.55 }}>
                  <div className="hub-name">NAGANO, JAPAN -- Precision Grade</div>
                  <div className="hub-meta">TDK &middot; Shin-Etsu Chemical &nbsp;&middot;&nbsp; $1.1B exported (2023)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rule" />

      {/* Threats split */}
      <div className="wrap">
        <div className="split flip">
          <div className="split-text r">
            <div className="sh-tag">Global Threat Layer</div>
            <h2 className="sh-h">Three live feeds.<br /><em>One unified</em><br />risk picture.</h2>
            <p className="sh-p">NASA satellite fire detections, USGS seismic events, and geopolitical conflict monitoring -- merged, ranked by severity, and overlaid on your sourcing geography automatically.</p>
            <div className="split-bullets">
              {[
                'NASA FIRMS: 92,000+ active fire hotspots updated every 24 hours',
                'USGS: M4.5+ seismic events near supply-critical infrastructure',
                '15 geopolitical conflict zones tracked across key sourcing regions',
              ].map(t => (
                <div key={t} className="sb">
                  <span className="sb-dot" style={{ background: 'var(--red)' }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="r" style={{ transitionDelay: '0.12s' }}>
            <div className="mock">
              <div className="mock-bar">
                <div className="dot" style={{ background: '#ff5f57' }} /><div className="dot" style={{ background: '#febc2e' }} /><div className="dot" style={{ background: '#28c840' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', marginLeft: 8 }}>Global Threats -- Live</span>
              </div>
              <div className="mock-body">
                {[
                  { color: 'var(--red)', glow: true, title: 'Active Wildfires -- Southeast Asia', sub: '4,218 hotspots · Palm oil, rubber, electronics', badge: 'HIGH', bc: 'rgba(248,113,113,0.15)', tc: 'var(--red)' },
                  { color: 'var(--red)', glow: true, title: 'Houthi Maritime Attacks -- Red Sea', sub: 'Global shipping lane · Cape diversion risk', badge: 'HIGH', bc: 'rgba(248,113,113,0.15)', tc: 'var(--red)' },
                  { color: 'var(--amber)', glow: false, title: 'M6.1 Earthquake -- Hokkaido, Japan', sub: '48km depth · Electronics, auto parts', badge: 'MED', bc: 'rgba(251,191,36,0.15)', tc: 'var(--amber)' },
                  { color: 'var(--amber)', glow: false, title: 'Labor Unrest -- Dhaka EPZs', sub: 'Garments, textiles, leather', badge: 'MED', bc: 'rgba(251,191,36,0.15)', tc: 'var(--amber)', op: 0.6 },
                ].map((t, i) => (
                  <div key={i} className="threat-item" style={t.op ? { opacity: t.op } : {}}>
                    <div className="threat-sev" style={{ background: t.color, ...(t.glow ? { boxShadow: `0 0 8px ${t.color}` } : {}) }} />
                    <div className="threat-text">{t.title}<br /><span style={{ color: 'var(--text3)', fontSize: 10 }}>{t.sub}</span></div>
                    <span className="badge" style={{ background: t.bc, color: t.tc }}>{t.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rule" />

      {/* Compliance split */}
      <div className="wrap">
        <div className="split">
          <div className="split-text r">
            <div className="sh-tag">Trade Compliance</div>
            <h2 className="sh-h">Compliance runs<br /><em>automatically</em><br />on every result.</h2>
            <p className="sh-p">Sanctions screening, export classification, and FTA eligibility checked at the point of sourcing -- before you commit to a supplier, not after your legal team flags it.</p>
            <div className="split-bullets">
              {[
                'OFAC SDN + 25-country sanctions database',
                'ECCN dual-use export classification (EAR99 through 9E999)',
                'Section 301, MFN, and FTA tariff rates from the USITC database',
                'FTA eligibility: USMCA, CPTPP, EU and more',
              ].map(t => (
                <div key={t} className="sb">
                  <span className="sb-dot" style={{ background: 'var(--amber)' }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="r" style={{ transitionDelay: '0.12s' }}>
            <div className="mock">
              <div className="mock-bar">
                <div className="dot" style={{ background: '#ff5f57' }} /><div className="dot" style={{ background: '#febc2e' }} /><div className="dot" style={{ background: '#28c840' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', marginLeft: 8 }}>Compliance -- BAOTOU, CHINA</span>
              </div>
              <div className="mock-body">
                {[
                  { icon: '\u2713', bg: 'rgba(16,185,129,0.15)', ic: 'var(--green)', label: 'Sanctions Screening', val: 'CLEAR', vc: 'var(--green)', bc: 'var(--rim2)' },
                  { icon: '!', bg: 'rgba(251,191,36,0.15)',  ic: 'var(--amber)', label: 'ECCN Classification', val: '1C006 -- EAR', vc: 'var(--amber)', bc: 'var(--rim2)' },
                  { icon: '\u2717', bg: 'rgba(248,113,113,0.15)', ic: 'var(--red)',   label: 'FTA Eligibility', val: 'NOT ELIGIBLE', vc: 'var(--red)', bc: 'var(--rim2)' },
                  { icon: '!', bg: 'rgba(248,113,113,0.15)', ic: 'var(--red)',   label: 'Section 301 Tariff', val: '+25% Rate', vc: 'var(--red)', bc: 'var(--rim2)' },
                  { icon: '\u2192', bg: 'rgba(56,189,248,0.12)',  ic: 'var(--accent)',label: 'MFN Base Rate', val: '0% (ITA)', vc: 'var(--accent)', bc: 'rgba(56,189,248,0.2)' },
                ].map((r, i) => (
                  <div key={i} className="comp-row" style={{ borderColor: r.bc }}>
                    <div className="comp-check" style={{ background: r.bg, color: r.ic }}>{r.icon}</div>
                    <div className="comp-label">{r.label}</div>
                    <div className="comp-val" style={{ color: r.vc }}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rule" />

      {/* Stats */}
      <div className="wrap sec r">
        <div className="stats-strip">
          <div className="ss"><span className="ss-n" style={{ background: 'linear-gradient(135deg,#fff,#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>92K+</span><span className="ss-l">Fire hotspots tracked today</span></div>
          <div className="ss"><span className="ss-n" style={{ color: 'var(--red)' }}>6+</span><span className="ss-l">Earthquakes / week</span></div>
          <div className="ss"><span className="ss-n" style={{ color: 'var(--accent)' }}>26</span><span className="ss-l">Ports monitored</span></div>
          <div className="ss"><span className="ss-n" style={{ color: 'var(--green)' }}>33</span><span className="ss-l">Live FX currencies</span></div>
          <div className="ss"><span className="ss-n" style={{ color: 'var(--amber)' }}>15</span><span className="ss-l">Conflict zones</span></div>
        </div>
      </div>

      <div className="rule" />

      {/* Outputs */}
      <div className="wrap sec">
        <div className="r">
          <div className="sh-tag">Deliverables</div>
          <h2 className="sh-h">What you walk away with.</h2>
          <p className="sh-p">Every scan produces actionable outputs -- not just a report you file away.</p>
        </div>
        <div className="outputs">
          {[
            { color: 'var(--accent)', title: 'PDF Mission Brief', desc: 'Executive one-pager covering sourcing hubs, risk landscape, and compliance status. Shareable with leadership instantly.', delay: '0.05s' },
            { color: 'var(--green)',  title: 'Supplier RFQ',      desc: 'Pre-filled request-for-quotation with commodity specs, compliance requirements, and preferred incoterms. Ready to send.', delay: '0.10s' },
            { color: 'var(--amber)', title: 'Total Landed Cost Model', desc: 'Full landed cost across tariffs, freight, insurance, and duties. Compare multiple sourcing scenarios side by side.', delay: '0.15s' },
            { color: 'var(--red)',   title: 'Compliance Report',  desc: 'Sanctions, dual-use, and FTA eligibility verdicts per hub, with specific flags and mitigation recommendations.', delay: '0.20s' },
          ].map(o => (
            <div key={o.title} className="out r" style={{ transitionDelay: o.delay }}>
              <div className="out-line" style={{ background: o.color }} />
              <div className="out-title">{o.title}</div>
              <p className="out-desc">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="rule" />
      <div className="wrap sec">
        <div className="r">
          <div className="sh-tag">Case Studies</div>
          <h2 className="sh-h">From query to <em>actionable intelligence</em>.</h2>
          <p className="sh-p">See how procurement teams use NAUTILUS to compress days of research into seconds.</p>
        </div>
        <div className="cases">
          {[
            {
              num: 'Case Study 01',
              title: 'EV Motor Sourcing',
              scenario: 'Procurement team sourcing neodymium-iron-boron magnets for EV traction motors across global hubs.',
              findings: [
                '6 qualified sourcing hubs identified across China, Japan, and Estonia',
                'Section 301 tariff of 25% flagged on all China-origin shipments',
                'Shenghe Resources flagged as restricted party — removed from shortlist',
                'Estonian supplier via EU FTA saves 18% on total landed cost',
              ],
              time: '~8 seconds',
              delay: '0.05s',
            },
            {
              num: 'Case Study 02',
              title: 'Semiconductor Supply Chain Risk',
              scenario: 'Electronics manufacturer assessing TSMC dependency for automotive-grade chips amid geopolitical tension.',
              findings: [
                'Taiwan Strait congestion risk flagged HIGH — active monitoring triggered',
                '3 alternative fabs identified in South Korea and Germany',
                'CHIPS Act incentive routes identified for domestic sourcing scenarios',
                'Dual-use export license flagged for EAR99 components in the stack',
              ],
              time: '~11 seconds',
              delay: '0.10s',
            },
            {
              num: 'Case Study 03',
              title: 'Pharmaceutical API Sourcing',
              scenario: 'Pharma company sourcing active pharmaceutical ingredients post-supply shock, seeking China alternatives.',
              findings: [
                'India (Hyderabad) and Ireland identified as qualified China alternatives',
                'FDA import alert cross-referenced — 2 flagged suppliers removed automatically',
                'Ocean freight Mumbai $2,340/TEU vs. Shanghai $3,100/TEU — 24% savings',
                'EU GMP and FDA 21 CFR compliance status verified per hub',
              ],
              time: '~9 seconds',
              delay: '0.15s',
            },
          ].map(c => (
            <div key={c.num} className="case-card r" style={{ transitionDelay: c.delay }}>
              <div className="case-num">{c.num}</div>
              <div className="case-head">
                <div className="case-title">{c.title}</div>
              </div>
              <p className="case-scenario">{c.scenario}</p>
              <div>
                <div className="case-findings-label">Key Findings</div>
                <ul className="case-findings">
                  {c.findings.map((f, i) => (
                    <li key={i} className="case-finding">
                      <span className="case-dot" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="case-time-badge">
                <span className="case-time-dot" />
                Time to insight: {c.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rule" />
      <div className="cta-wrap" id="cta">
        <div className="cta-inner r">
          <h2 className="cta-h">Built for the people who make sourcing decisions.</h2>
          <p className="cta-p">Not a dashboard. Not a report. A terminal -- designed for speed, depth, and immediate action. Enter your email and we&apos;ll send you access.</p>
          {status === 'done' ? (
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.12em' }}>
              &#10003; ACCESS LINK SENT -- CHECK YOUR INBOX (and spam, just in case)
            </p>
          ) : (
            <>
              <form className="email-form" onSubmit={handleSubmit}>
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  className="email-input"
                  type="email"
                  placeholder="your@company.com"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
                <button type="submit" className="btn-primary" disabled={status === 'loading'} aria-describedby="waitlist-disclaimer">
                  {status === 'loading' ? 'Sending...' : 'Request Access \u2192'}
                </button>
              </form>
              <p id="waitlist-disclaimer" className="sr-only">
                By submitting your email, you agree to receive a one-time access link and occasional product updates from NAUTILUS Intelligence. You can unsubscribe at any time. We do not sell your email address.
              </p>
            </>
          )}
          {status === 'error' && (
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--red)', marginTop: 12 }}>
              Something went wrong -- please try again in a moment
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="f-top">
          <div>
            <div className="f-brand">NAUTILUS</div>
            <div className="f-note">Supply Chain Intelligence Terminal &nbsp;&middot;&nbsp; Real data &nbsp;&middot;&nbsp; Built for procurement professionals</div>
          </div>
          <div className="f-right">&copy; 2026 NAUTILUS Terminal</div>
        </div>
        <div className="f-legal">
          <a href="/legal/terms" className="f-legal-link">Terms of Service</a>
          <span className="f-legal-sep">/</span>
          <a href="/legal/privacy-policy" className="f-legal-link">Privacy Policy</a>
          <span className="f-legal-sep">/</span>
          <a href="/legal/cookies" className="f-legal-link">Cookie Policy</a>
          <span className="f-legal-sep">/</span>
          <a href="/legal/refund" className="f-legal-link">Refund Policy</a>
          <span className="f-legal-sep">/</span>
          <a href="/legal/disclaimer" className="f-legal-link">Disclaimer</a>
          <span className="f-legal-sep">/</span>
          <a href="/legal/data-sources" className="f-legal-link">Data Sources</a>
          <span className="f-legal-sep">/</span>
          <a href="/legal/data-deletion" className="f-legal-link">Data Deletion</a>
          <span className="f-legal-sep">/</span>
          <a href="/methodology" className="f-legal-link">Methodology</a>
        </div>
      </footer>
    </>
  )
}
