import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Free API, no key required
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=CNY,EUR,BRL,MXN,JPY,KRW,INR,SGD,GBP,CAD,AUD,THB,VND', {
      next: { revalidate: 3600 } // cache for 1 hour
    });
    if (!res.ok) throw new Error(`Frankfurter API returned ${res.status}`);
    const data = await res.json();

    // Enrich with trade context
    const enriched = {
      base: 'USD',
      date: data.date,
      rates: {
        CNY: { rate: data.rates.CNY, country: 'China', flag: '🇨🇳', impact: data.rates.CNY > 7.2 ? 'Favorable for US imports' : 'Unfavorable for US imports' },
        EUR: { rate: data.rates.EUR, country: 'Eurozone', flag: '🇪🇺', impact: data.rates.EUR > 0.93 ? 'EUR soft — EU components cheaper for US buyers' : data.rates.EUR < 0.87 ? 'EUR firm — monitor EU sourcing costs' : 'EUR near parity — stable for EU trade' },
        MXN: { rate: data.rates.MXN, country: 'Mexico', flag: '🇲🇽', impact: data.rates.MXN > 18 ? 'Favorable for nearshoring' : 'MXN strengthening' },
        BRL: { rate: data.rates.BRL, country: 'Brazil', flag: '🇧🇷', impact: 'Monitor for commodity pricing' },
        JPY: { rate: data.rates.JPY, country: 'Japan', flag: '🇯🇵', impact: data.rates.JPY > 145 ? 'JPY weak — Japanese imports cheaper' : 'JPY stable' },
        KRW: { rate: data.rates.KRW, country: 'South Korea', flag: '🇰🇷', impact: 'Key for semiconductor supply chain' },
        INR: { rate: data.rates.INR, country: 'India', flag: '🇮🇳', impact: 'India+1 strategy cost indicator' },
        SGD: { rate: data.rates.SGD, country: 'Singapore', flag: '🇸🇬', impact: 'APAC logistics hub benchmark' },
        GBP: { rate: data.rates.GBP, country: 'United Kingdom', flag: '🇬🇧', impact: data.rates.GBP < 0.79 ? 'GBP soft — UK sourcing costs lower for US buyers' : 'GBP firm — monitor UK procurement costs' },
        CAD: { rate: data.rates.CAD, country: 'Canada', flag: '🇨🇦', impact: data.rates.CAD > 1.38 ? 'CAD weak — Canadian inputs cheaper' : 'CAD near parity — stable for USMCA trade' },
        AUD: { rate: data.rates.AUD, country: 'Australia', flag: '🇦🇺', impact: data.rates.AUD > 1.55 ? 'AUD soft — Australian commodities cheaper' : 'AUD firm — monitor mining input costs' },
        THB: { rate: data.rates.THB, country: 'Thailand', flag: '🇹🇭', impact: 'THB — monitor for automotive/electronics sourcing' },
        VND: { rate: data.rates.VND, country: 'Vietnam', flag: '🇻🇳', impact: data.rates.VND > 25000 ? 'VND weak — Vietnamese manufacturing costs favorable' : 'VND stable — monitor for nearshoring opportunities' },
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
