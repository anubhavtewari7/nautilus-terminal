import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Free API, no key required
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=CNY,EUR,BRL,MXN,JPY,KRW,INR,SGD,GBP,CAD,AUD,THB,VND', {
      next: { revalidate: 3600 } // cache for 1 hour
    });
    if (!res.ok) throw new Error(`Frankfurter API returned ${res.status}`);
    const data = await res.json();

    // Enrich with trade context
    // Use ?? null on every rate access so a missing currency from Frankfurter
    // yields null rather than undefined, preventing ternary comparisons against
    // undefined from silently producing the wrong impact label.
    const cny = data.rates.CNY ?? null;
    const eur = data.rates.EUR ?? null;
    const mxn = data.rates.MXN ?? null;
    const brl = data.rates.BRL ?? null;
    const jpy = data.rates.JPY ?? null;
    const krw = data.rates.KRW ?? null;
    const inr = data.rates.INR ?? null;
    const sgd = data.rates.SGD ?? null;
    const gbp = data.rates.GBP ?? null;
    const cad = data.rates.CAD ?? null;
    const aud = data.rates.AUD ?? null;
    const thb = data.rates.THB ?? null;
    const vnd = data.rates.VND ?? null;
    const enriched = {
      base: 'USD',
      date: data.date,
      rates: {
        CNY: { rate: cny, country: 'China', flag: '🇨🇳', impact: cny != null ? (cny > 7.2 ? 'Favorable for US imports' : 'Unfavorable for US imports') : 'Rate data unavailable' },
        EUR: { rate: eur, country: 'Eurozone', flag: '🇪🇺', impact: eur != null ? (eur > 0.93 ? 'EUR soft — EU components cheaper for US buyers' : eur < 0.87 ? 'EUR firm — monitor EU sourcing costs' : 'EUR near parity — stable for EU trade') : 'Rate data unavailable' },
        MXN: { rate: mxn, country: 'Mexico', flag: '🇲🇽', impact: mxn != null ? (mxn > 18 ? 'Favorable for nearshoring' : 'MXN strengthening') : 'Rate data unavailable' },
        BRL: { rate: brl, country: 'Brazil', flag: '🇧🇷', impact: 'Monitor for commodity pricing' },
        JPY: { rate: jpy, country: 'Japan', flag: '🇯🇵', impact: jpy != null ? (jpy > 145 ? 'JPY weak — Japanese imports cheaper' : 'JPY stable') : 'Rate data unavailable' },
        KRW: { rate: krw, country: 'South Korea', flag: '🇰🇷', impact: 'Key for semiconductor supply chain' },
        INR: { rate: inr, country: 'India', flag: '🇮🇳', impact: 'India+1 strategy cost indicator' },
        SGD: { rate: sgd, country: 'Singapore', flag: '🇸🇬', impact: 'APAC logistics hub benchmark' },
        GBP: { rate: gbp, country: 'United Kingdom', flag: '🇬🇧', impact: gbp != null ? (gbp < 0.79 ? 'GBP soft — UK sourcing costs lower for US buyers' : 'GBP firm — monitor UK procurement costs') : 'Rate data unavailable' },
        CAD: { rate: cad, country: 'Canada', flag: '🇨🇦', impact: cad != null ? (cad > 1.38 ? 'CAD weak — Canadian inputs cheaper' : 'CAD near parity — stable for USMCA trade') : 'Rate data unavailable' },
        AUD: { rate: aud, country: 'Australia', flag: '🇦🇺', impact: aud != null ? (aud > 1.55 ? 'AUD soft — Australian commodities cheaper' : 'AUD firm — monitor mining input costs') : 'Rate data unavailable' },
        THB: { rate: thb, country: 'Thailand', flag: '🇹🇭', impact: 'THB — monitor for automotive/electronics sourcing' },
        VND: { rate: vnd, country: 'Vietnam', flag: '🇻🇳', impact: vnd != null ? (vnd > 25000 ? 'VND weak — Vietnamese manufacturing costs favorable' : 'VND stable — monitor for nearshoring opportunities') : 'Rate data unavailable' },
      }
    };
    return NextResponse.json(enriched);
  } catch (err) {
    console.error("FX error:", err);
    // Fallback static data if API is down
    return NextResponse.json({
      base: 'USD', date: 'Rates may be outdated', stale: true, stale_as_of: '2026-09',
      rates: {
        CNY: { rate: 7.25,    country: 'China',        flag: '🇨🇳', impact: 'Favorable for US imports' },
        EUR: { rate: 0.91,    country: 'Eurozone',     flag: '🇪🇺', impact: 'EUR soft — EU components cheaper for US buyers' },
        MXN: { rate: 17.8,    country: 'Mexico',       flag: '🇲🇽', impact: 'Favorable for nearshoring' },
        BRL: { rate: 5.15,    country: 'Brazil',       flag: '🇧🇷', impact: 'Monitor for commodity pricing' },
        JPY: { rate: 149.5,   country: 'Japan',        flag: '🇯🇵', impact: 'JPY weak — Japanese imports cheaper' },
        KRW: { rate: 1340.0,  country: 'South Korea',  flag: '🇰🇷', impact: 'Key for semiconductor supply chain' },
        INR: { rate: 83.8,    country: 'India',        flag: '🇮🇳', impact: 'India+1 strategy cost indicator' },
        SGD: { rate: 1.34,    country: 'Singapore',    flag: '🇸🇬', impact: 'APAC logistics hub benchmark' },
        GBP: { rate: 0.79,    country: 'United Kingdom', flag: '🇬🇧', impact: 'Monitor for UK sourcing costs' },
        CAD: { rate: 1.36,    country: 'Canada',       flag: '🇨🇦', impact: 'North American supply chain benchmark' },
        AUD: { rate: 1.52,    country: 'Australia',    flag: '🇦🇺', impact: 'Monitor for raw materials pricing' },
        THB: { rate: 35.5,    country: 'Thailand',     flag: '🇹🇭', impact: 'Southeast Asia manufacturing indicator' },
        VND: { rate: 25200,   country: 'Vietnam',      flag: '🇻🇳', impact: 'Vietnam+1 strategy cost indicator' },
      }
    });
  }
}
