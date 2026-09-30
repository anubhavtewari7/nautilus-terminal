// ============================================================
// NAUTILUS TERMINAL -- Core Intelligence Database
// Place at: src/lib/database.js
// ============================================================

export const ATLAS_DB = {

  // 1. AUTOMOTIVE (Cars, EV, Parts, Visors, Seats, Frames)
  automotive: [
    {
      id: 'h_auto_1', lat: 25.6, lng: -100.3,
      hub: 'MONTERREY, MEXICO', title: 'NAFTA Tier-1 Auto Cluster',
      companies: [
        { name: 'Grupo Antolin', website: 'https://www.grupoantolin.com/', turnover: '>$1B' },
        { name: 'Nemak', website: 'https://www.nemak.com/', turnover: '>$1B' },
        { name: 'Metalsa', website: 'https://www.metalsa.com/', turnover: '>$1B' },
        { name: 'Draxton Mexico', website: 'https://www.draxton.com/', turnover: '$100M-$1B' },
        { name: 'Cimco Group', website: 'https://www.cimco.com.mx/', turnover: '$10M-$100M' },
        { name: 'Arneses de México', website: 'https://www.sumitomo-sei.co.jp/', turnover: '$10M-$100M' }
      ],
      desc: 'Primary nearshoring hub for North American automotive OEMs. Specializes in interiors, chassis, headliners, and sun visor assemblies.',
      customs: { hts_code: '8708.29', duty_rate: '0% (USMCA)', compliance_note: 'USMCA Rules of Origin apply. Regional Value Content (RVC) ≥ 75% required.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Water scarcity is a growing operational risk in Monterrey metro.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/Truck' },
      industry_kpi: { label: 'Tooling Lead', value: '12 Weeks' }
    },
    {
      id: 'h_auto_2', lat: 31.2, lng: 121.4,
      hub: 'SHANGHAI, CHINA', title: 'East China Auto Zone',
      companies: [
        { name: 'Yanfeng Automotive', website: 'https://www.yfai.com/', turnover: '>$1B' },
        { name: 'Huayu Auto', website: 'https://www.hasco-group.com/', turnover: '>$1B' },
        { name: 'Fuyao Glass', website: 'https://www.fuyaogroup.com/', turnover: '>$1B' }
      ],
      desc: 'Massive scale production for automotive plastics, electronics, glass, and interior systems. Competitive cost base.',
      customs: { hts_code: '8708.29', duty_rate: '25% (Sec 301)', compliance_note: 'Subject to Section 301 tariffs. Check entity list restrictions.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Transitioning to renewable grid power by 2030. Labor audits recommended.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.5k/FEU' },
      industry_kpi: { label: 'Scale Capacity', value: 'Unlimited' }
    },
    {
      id: 'h_auto_3', lat: 48.1, lng: 11.5,
      hub: 'BAVARIA, GERMANY', title: 'EU Premium Parts Hub',
      companies: [
        { name: 'Continental AG', website: 'https://www.continental.com/', turnover: '>$1B' },
        { name: 'Bosch', website: 'https://www.bosch.com/', turnover: '>$1B' },
        { name: 'Brose Group', website: 'https://www.brose.com/', turnover: '>$1B' },
        { name: 'Grammer AG', website: 'https://www.grammer.com/', turnover: '$100M-$1B' },
        { name: 'Kiekert AG', website: 'https://www.kiekert.com/', turnover: '$100M-$1B' },
        { name: 'Polytec Group', website: 'https://www.polytec-group.com/', turnover: '$100M-$1B' }
      ],
      desc: 'High-precision engineering and premium trim components for luxury OEMs (BMW, Mercedes, Audi). CE-certified.',
      customs: { hts_code: '8708.29', duty_rate: '2.5% (Non-EU)', compliance_note: 'CE Marking required. REACH compliance mandatory.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Industry-leading circular economy practices. CO2 reporting mandatory.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.8k/Sea' },
      industry_kpi: { label: 'Defect Rate', value: '< 5 PPM' }
    },
    {
      id: 'h_auto_4', lat: 35.1, lng: 136.9,
      hub: 'AICHI, JAPAN', title: 'J-OEM Sourcing Cluster',
      companies: [
        { name: 'Toyota Boshoku', website: 'https://www.toyota-boshoku.com/', turnover: '>$1B' },
        { name: 'Denso', website: 'https://www.denso.com/', turnover: '>$1B' },
        { name: 'Aisin', website: 'https://www.aisin.com/', turnover: '>$1B' }
      ],
      desc: 'Just-in-time manufacturing excellence for Japanese OEMs. World benchmark for quality systems and lean processes.',
      customs: { hts_code: '8708.29', duty_rate: '0% (CPTPP)', compliance_note: 'Strict J-Quality standards apply. CPTPP origin rules.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'High energy efficiency standards. Kaizen-driven waste reduction.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/Sea' },
      industry_kpi: { label: 'JIT Score', value: '99.9%' }
    },
    {
      id: 'h_auto_5', lat: 42.3, lng: -83.0,
      hub: 'DETROIT, USA', title: 'Great Lakes Auto Cluster',
      companies: [
        { name: 'Lear Corp', website: 'https://www.lear.com/', turnover: '>$1B' },
        { name: 'Magna International', website: 'https://www.magna.com/', turnover: '>$1B' },
        { name: 'IAC Group', website: 'https://www.iacgroup.com/', turnover: '$100M-$1B' },
        { name: 'Shape Corp', website: 'https://www.shapecorp.com/', turnover: '$100M-$1B' },
        { name: 'Lacks Enterprises', website: 'https://www.lacks.net/', turnover: '$100M-$1B' },
        { name: 'Gentex Corp', website: 'https://www.gentex.com/', turnover: '$100M-$1B' },
        { name: 'Tower International', website: 'https://www.towerint.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Legacy US automotive engineering and final assembly hub. Domestic sourcing for Ford, GM, Stellantis supply chains.',
      customs: { hts_code: '8708.29', duty_rate: '0% (Domestic)', compliance_note: 'Domestic supply. Buy America Act eligible.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'UAW unionized labor. EV transition investment underway.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Ground' },
      industry_kpi: { label: 'Proximity', value: 'Same-Day JIT' }
    },
    {
      id: 'h_auto_6', lat: 47.6, lng: 19.0,
      hub: 'BUDAPEST, HUNGARY', title: 'Eastern EU Assembly Hub',
      companies: [
        { name: 'Audi Hungaria', website: 'https://audi.hu/', turnover: '$100M-$1B' },
        { name: 'Knorr-Bremse', website: 'https://www.knorr-bremse.com/', turnover: '$100M-$1B' },
        { name: 'Flex-N-Gate', website: 'https://www.flex-n-gate.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Cost-effective alternative to Western Europe for precision auto parts. Strong EU free trade access.',
      customs: { hts_code: '8708.29', duty_rate: '0% (Intra-EU)', compliance_note: 'EU origin certified. No additional duties within EU.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Increasing EV component focus. Green energy transition.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.2k/Truck' },
      industry_kpi: { label: 'Labor Cost', value: '35% vs W.Europe' }
    }
  ],

  // 2. INDUSTRIAL COMPONENTS (Magnets, Bearings, Fasteners, Motors, Seals)
  // Covers: neodymium magnets, ferrite magnets, rare earth magnets, bearings, precision industrial parts
  industrial: [
    {
      id: 'h_ind_1', lat: 41.7, lng: 110.7,
      hub: 'BAOTOU, CHINA', title: 'Global Rare Earth & NdFeB Magnet Core',
      companies: [
        { name: 'Zhong Ke San Huan (HSMAG)', website: 'https://www.hsmag.com/' , turnover: '$100M-$1B' },
        { name: 'JLMAG Rare-Earth Co.', website: 'https://www.jlmag.com/' , turnover: '$100M-$1B' },
        { name: 'Earth-Panda Rare Earth', website: 'http://www.earth-panda.com/' , turnover: '$10M-$100M' }
      ],
      desc: 'World\'s dominant hub for NdFeB (neodymium-iron-boron) permanent magnets. Controls ~90% of global rare earth magnet supply. Key source for automotive sensors, EV motors, dashboard actuators, and visor mechanisms.',
      customs: { hts_code: '8505.11', duty_rate: '25% (Sec 301)', compliance_note: 'Subject to Section 301 tariffs. China rare earth export quota regulations apply. CFIUS review for strategic acquisitions.' },
      esg: { carbon_footprint: 'Very High', ethical_rating: 'C', sustainability_note: 'Severe environmental impact from rare earth mining and separation. No closed-loop recycling at scale yet.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Global Market Share', value: '~90% NdFeB' }
    },
    {
      id: 'h_ind_2', lat: 35.6, lng: 139.6,
      hub: 'TOKYO / CHIBA, JAPAN', title: 'Premium Precision Magnetics Hub',
      companies: [
        { name: 'TDK Corporation', website: 'https://www.tdk.com/' , turnover: '>$1B' },
        { name: 'Shin-Etsu Chemical', website: 'https://www.shinetsu.co.jp/' , turnover: '>$1B' },
        { name: 'Hitachi Metals (Proterial)', website: 'https://www.proterial.com/' , turnover: '>$1B' }
      ],
      desc: 'World-class precision magnet manufacturing for automotive-grade applications. Key supplier for EV motors, precision sensors, ADAS, sun visor actuator motors, and instrument panel components.',
      customs: { hts_code: '8505.11', duty_rate: '0% (CPTPP)', compliance_note: 'CPTPP origin rules apply. IATF 16949 certified. High-grade automotive specs standard.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'Industry-leading magnet recycling and closed-loop recovery programs. OECD Due Diligence compliant.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/Sea' },
      industry_kpi: { label: 'Precision Grade', value: 'N52 / N50H' }
    },
    {
      id: 'h_ind_3', lat: 50.1, lng: 8.6,
      hub: 'HANAU, GERMANY', title: 'European Advanced Magnetics Hub',
      companies: [
        { name: 'Vacuumschmelze (VAC)', website: 'https://www.vacuumschmelze.com/' , turnover: '$100M-$1B' },
        { name: 'Thyssenkrupp Magnetics', website: 'https://www.thyssenkrupp.com/' , turnover: '>$1B' },
        { name: 'Arnold Europe GmbH', website: 'https://www.arnoldmagnetics.com/' , turnover: '$10M-$100M' }
      ],
      desc: 'Premium rare earth magnets and soft magnetic components for automotive, aerospace, and industrial OEMs. VAC is the global reference for high-coercivity magnets used in harsh automotive environments.',
      customs: { hts_code: '8505.11', duty_rate: '0% (Intra-EU) / 3.7% (MFN)', compliance_note: 'REACH compliance required. CE marking mandatory. EU Conflict Minerals Regulation applies.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Conflict mineral audits conducted annually. RE100 green energy target. Magnet recycling infrastructure in place.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.8k/Truck' },
      industry_kpi: { label: 'Automotive Spec', value: 'IATF 16949 + AEC-Q' }
    },
    {
      id: 'h_ind_4', lat: 41.6, lng: -72.7,
      hub: 'CONNECTICUT, USA', title: 'US Domestic Magnetics & Defense',
      companies: [
        { name: 'Arnold Magnetic Technologies', website: 'https://www.arnoldmagnetics.com/' , turnover: '$100M-$1B' },
        { name: 'Electron Energy Corp', website: 'https://www.electronenergy.com/' , turnover: '<$10M' },
        { name: 'Bunting Magnetics', website: 'https://www.buntingmagnetics.com/' , turnover: '$10M-$100M' }
      ],
      desc: 'Domestic US magnet manufacturing for defense, aerospace, and automotive supply chains. 100% non-China origin. Buy American compliant. Critical for ITAR-controlled programs.',
      customs: { hts_code: '8505.11', duty_rate: '0% (Domestic)', compliance_note: 'ITAR / DFARS compliant. Buy America Act eligible. DoD conflict mineral reporting certified.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'Transparent supply chain. US-origin rare earth sourcing from Mountain Pass, CA (MP Materials).' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.2k/Ground' },
      industry_kpi: { label: 'Compliance', value: 'ITAR / DFARS' }
    },
    {
      id: 'h_ind_5', lat: 37.6, lng: 126.9,
      hub: 'GYEONGGI, S. KOREA', title: 'Korea Precision Components Hub',
      companies: [
        { name: 'Samsung Electro-Mechanics', website: 'https://www.samsungsem.com/' , turnover: '>$1B' },
        { name: 'LS Magnetics', website: 'https://www.lselectric.co.kr/' , turnover: '$10M-$100M' },
        { name: 'Korea Magnet Institute (KMI)', website: 'https://www.kmi.re.kr/' , turnover: '$10M-$100M' }
      ],
      desc: 'Growing hub for precision magnets and electromagnetic components. Serves global automotive and consumer electronics OEMs under KORUS FTA preferences.',
      customs: { hts_code: '8505.11', duty_rate: '0% (KORUS)', compliance_note: 'KORUS FTA rates apply for US imports. Korean origin certification required.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Carbon neutral targets by 2040. Government ESG disclosure framework.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.8k/Sea' },
      industry_kpi: { label: 'ISO Cert', value: 'IATF 16949' }
    },
    {
      id: 'h_ind_6', lat: 19.0, lng: 73.0,
      hub: 'PUNE, INDIA', title: 'India Industrial Components Hub',
      companies: [
        { name: 'Harsha Engineers', website: 'https://www.harshaengineers.com/' , turnover: '$100M-$1B' },
        { name: 'Lakshmi Ring Travellers', website: 'https://www.lrtindia.com/' , turnover: '$10M-$100M' },
        { name: 'Precision Camshafts', website: 'https://www.pcl.in/' , turnover: '$10M-$100M' }
      ],
      desc: 'Fast-growing alternative source for precision industrial components, bearings, and engineered parts. Strong growth in automotive-grade manufacturing capabilities.',
      customs: { hts_code: '8505.11', duty_rate: '0% (GSTP)', compliance_note: 'GSP/GSTP preferences available for eligible products. QC audits recommended.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'India+1 strategy hub. Improving standards under IATF adoption.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.5k/Sea' },
      industry_kpi: { label: 'Cost vs Japan', value: '40-50% Savings' }
    }
  ],

  // 3. TECH & ELECTRONICS (Microchips, PCBs, Glass Panels, Displays, Sensors)
  electronics: [
    {
      id: 'h_tech_1', lat: 24.8, lng: 120.9,
      hub: 'HSINCHU, TAIWAN', title: 'Global Semiconductor Nexus',
      companies: [
        { name: 'TSMC', website: 'https://www.tsmc.com/' , turnover: '>$1B' },
        { name: 'Foxconn', website: 'https://www.foxconn.com/' , turnover: '>$1B' },
        { name: 'MediaTek', website: 'https://www.mediatek.com/' , turnover: '>$1B' }
      ],
      desc: 'The absolute center of global advanced semiconductor manufacturing. TSMC produces 90%+ of the world\'s most advanced logic chips.',
      customs: { hts_code: '8542.31', duty_rate: '0% (ITA)', compliance_note: 'Export controls on advanced nodes (< 14nm) apply. US BIS license may be required.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'Massive water consumption is a systemic risk. RE100 commitment active.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$8.5k/Air' },
      industry_kpi: { label: 'Node Size', value: '3nm / 2nm' }
    },
    {
      id: 'h_tech_2', lat: 37.3, lng: 127.0,
      hub: 'GYEONGGI, S. KOREA', title: 'Memory & Display Cluster',
      companies: [
        { name: 'Samsung Electronics', website: 'https://www.samsung.com/' , turnover: '>$1B' },
        { name: 'SK Hynix', website: 'https://www.skhynix.com/' , turnover: '>$1B' },
        { name: 'LG Display', website: 'https://www.lgdisplay.com/' , turnover: '>$1B' }
      ],
      desc: 'World leader in memory chips (DRAM/NAND) and OLED display panels. Primary source for smartphone and automotive display supply chains.',
      customs: { hts_code: '8542.32', duty_rate: '0% (KORUS)', compliance_note: 'KORUS FTA applies for US imports. ECCN classification for advanced memory.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Aggressive carbon neutral targets by 2050. Water recycling systems deployed.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.1k/Sea' },
      industry_kpi: { label: 'Yield Rate', value: '> 95%' }
    },
    {
      id: 'h_tech_3', lat: 22.5, lng: 113.9,
      hub: 'SHENZHEN, CHINA', title: 'Hardware Innovation Bay',
      companies: [
        { name: 'BYD Electronics', website: 'https://www.byd.com/' , turnover: '>$1B' },
        { name: 'Huawei Technologies', website: 'https://www.huawei.com/' , turnover: '>$1B' },
        { name: 'Luxshare Precision', website: 'https://www.luxshare-ict.com/' , turnover: '>$1B' }
      ],
      desc: 'Unmatched speed and scale for consumer electronics assembly and PCBs. 48-hour prototype capability.',
      customs: { hts_code: '8517.70', duty_rate: '25% (Sec 301)', compliance_note: 'Check BIS Entity List. Section 301 tariffs apply. CFIUS restrictions on tech transfers.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Labor audit required. Forced labor risk assessment mandatory.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'Prototyping', value: '48 Hours' }
    },
    {
      id: 'h_tech_4', lat: 33.3, lng: -111.9,
      hub: 'ARIZONA, USA', title: 'Silicon Desert (CHIPS Act)',
      companies: [
        { name: 'TSMC Arizona', website: 'https://www.tsmc.com/' , turnover: '>$1B' },
        { name: 'Intel Foundry', website: 'https://www.intel.com/' , turnover: '>$1B' },
        { name: 'NXP Semiconductors', website: 'https://www.nxp.com/' , turnover: '>$1B' }
      ],
      desc: 'Rapidly growing domestic US semiconductor manufacturing hub fueled by $52B CHIPS and Science Act investment.',
      customs: { hts_code: '8542.31', duty_rate: '0% (Domestic)', compliance_note: 'Domestic Origin. CHIPS Act incentives may apply. ITAR compliant.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A+', sustainability_note: 'Water reclamation technology deployed at scale. Green fab standards.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.2k/Ground' },
      industry_kpi: { label: 'Security', value: 'ITAR Compliant' }
    },
    {
      id: 'h_tech_5', lat: 10.8, lng: 106.6,
      hub: 'HO CHI MINH, VIETNAM', title: 'China+1 Assembly Hub',
      companies: [
        { name: 'Pegatron', website: 'https://www.pegatroncorp.com/' , turnover: '>$1B' },
        { name: 'Compal Electronics', website: 'https://www.compal.com/' , turnover: '>$1B' },
        { name: 'Jabil Vietnam', website: 'https://www.jabil.com/' , turnover: '>$1B' }
      ],
      desc: 'Primary China+1 destination for electronics assembly moving out of China. Apple, Samsung, and Google all expanding here.',
      customs: { hts_code: '8517.70', duty_rate: '0% (MFN)', compliance_note: 'Origin verification critical. Substantial transformation rules apply.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Rapidly improving labor standards. Good factory conditions in export zones.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$4.0k/FEU' },
      industry_kpi: { label: 'Cost vs China', value: '15% Savings' }
    },
    {
      id: 'h_tech_6', lat: 5.4, lng: 100.3,
      hub: 'PENANG, MALAYSIA', title: 'Backend Semiconductor Hub',
      companies: [
        { name: 'ASE Group', website: 'https://www.aseglobal.com/' , turnover: '>$1B' },
        { name: 'Infineon Malaysia', website: 'https://www.infineon.com/' , turnover: '>$1B' },
        { name: 'Intel Penang', website: 'https://www.intel.com/' , turnover: '>$1B' }
      ],
      desc: 'Global hub for semiconductor OSAT (Outsourced Semiconductor Assembly and Test). 13% of global OSAT volume.',
      customs: { hts_code: '8542.90', duty_rate: '0% (ITA)', compliance_note: 'Standard ITA tech compliance. No additional tariff barriers.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Stable green grid. Strong government labor enforcement.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$3.9k/Sea' },
      industry_kpi: { label: 'OSAT Volume', value: '13% Global' }
    }
  ],

  // 4. FOOD & AGRICULTURE (Beef, Wheat, Soy, Produce, Ingredients)
  agriculture: [
    {
      id: 'h_ag_1', lat: 41.8, lng: -88.1,
      hub: 'ILLINOIS, USA', title: 'Midwest Protein Processing Hub',
      companies: [
        { name: 'OSI Group', website: 'https://www.osigroup.com/' , turnover: '>$1B' },
        { name: 'Cargill Meat Solutions', website: 'https://www.cargill.com/' , turnover: '>$1B' },
        { name: 'Tyson Foods', website: 'https://www.tysonfoods.com/' , turnover: '>$1B' }
      ],
      desc: 'Primary supplier cluster for North American QSR chains (McDonald\'s global partner since 1955). USDA-inspected, FSMA-compliant.',
      customs: { hts_code: '0202.30', duty_rate: '0% (Domestic)', compliance_note: 'USDA FSIS inspected. FSMA compliant. No import duties for domestic supply.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Regenerative grazing initiatives active. Scope 3 emissions reporting underway.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Reefer' },
      industry_kpi: { label: 'Capacity', value: '10k Tons/Day' }
    },
    {
      id: 'h_ag_2', lat: -15.6, lng: -56.1,
      hub: 'MATO GROSSO, BRAZIL', title: 'Global Protein & Soy Nexus',
      companies: [
        { name: 'JBS S.A.', website: 'https://jbs.com.br/' , turnover: '>$1B' },
        { name: 'Marfrig Global Foods', website: 'https://www.marfrig.com.br/' , turnover: '>$1B' },
        { name: 'BRF S.A.', website: 'https://ri.brf-global.com/' , turnover: '>$1B' }
      ],
      desc: 'World\'s largest exporter of beef and soy products. Very high volume capacity but significant ESG and traceability risks.',
      customs: { hts_code: '0202.30', duty_rate: '26.4% (Quota)', compliance_note: 'Check TRQ (Tariff Rate Quota) availability. Sanitary certificate mandatory.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Amazon deforestation monitoring required. EUDR compliance risk from 2025.' },
      logistics: { port_wait_days: 8, freight_cost_estimate: '$5.5k/Reefer' },
      industry_kpi: { label: 'Traceability', value: 'Tier-2 Only' }
    },
    {
      id: 'h_ag_3', lat: -34.6, lng: -58.3,
      hub: 'PAMPAS, ARGENTINA', title: 'Premium Grass-Fed Protein',
      companies: [
        { name: 'Swift Argentina', website: 'https://www.swift.com.ar/' , turnover: '$100M-$1B' },
        { name: 'ArreBeef', website: 'https://www.arrebeef.com/' , turnover: '$10M-$100M' },
        { name: 'Minerva Foods', website: 'https://www.minervafoods.com/' , turnover: '>$1B' }
      ],
      desc: 'Renowned for high-quality, grass-fed beef at competitive prices. Lower carbon intensity than Brazil.',
      customs: { hts_code: '0202.30', duty_rate: '26.4% (Quota)', compliance_note: 'Subject to export tax policies. TRQ quota limits apply.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Natural pampas grazing, lower emissions profile. Deforestation risk minimal.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$5.0k/Reefer' },
      industry_kpi: { label: 'Quality Grade', value: 'Prime / AA' }
    },
    {
      id: 'h_ag_4', lat: 51.5, lng: 5.0,
      hub: 'BRABANT, NETHERLANDS', title: 'EU Agri-Tech Processing Hub',
      companies: [
        { name: 'Vion Food Group', website: 'https://www.vionfoodgroup.com/' , turnover: '>$1B' },
        { name: 'FrieslandCampina', website: 'https://www.frieslandcampina.com/' , turnover: '>$1B' },
        { name: 'Agrifirm', website: 'https://www.agrifirm.nl/' , turnover: '$100M-$1B' }
      ],
      desc: 'Highly automated, high-yield European agricultural and processing hub. World leader in sustainable farming technology.',
      customs: { hts_code: '0202.30', duty_rate: '12.8% + €303/100kg', compliance_note: 'Strict EU sanitary/phytosanitary (SPS) rules. EUDR compliance mandatory.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Global leader in sustainable farming tech. Carbon accounting at farm level.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.8k/Reefer' },
      industry_kpi: { label: 'Automation', value: '90%+' }
    },
    {
      id: 'h_ag_5', lat: -37.8, lng: 144.9,
      hub: 'VICTORIA, AUSTRALIA', title: 'APAC Premium Protein Export',
      companies: [
        { name: 'Teys Australia', website: 'https://teysgroup.com/' , turnover: '$100M-$1B' },
        { name: 'AACo (Australian Agricultural Co)', website: 'https://aaco.com.au/' , turnover: '$100M-$1B' },
        { name: 'JBS Australia', website: 'https://www.jbssa.com.au/' , turnover: '>$1B' }
      ],
      desc: 'Major supplier of premium beef to Asian markets (Japan, Korea, China). Strong AUSFTA tariff advantages.',
      customs: { hts_code: '0202.30', duty_rate: '0% (AUSFTA)', compliance_note: 'AUSFTA origin rules apply. MSA grading preferred for premium markets.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Drought resilience programs active. Traceability to individual animal (NLIS).' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$4.2k/Reefer' },
      industry_kpi: { label: 'Traceability', value: 'NLIS Farm-Level' }
    }
  ],

  // 5. FOOD & BEVERAGE / CPG (Confectionery, Snacks, Beverages, Packaged Food)
  food: [
    {
      id: 'h_food_1', lat: 41.8, lng: -87.9,
      hub: 'CHICAGO, USA', title: 'Global CPG & Confectionery Hub',
      companies: [
        { name: 'Mondelez International', website: 'https://www.mondelezinternational.com/', turnover: '>$1B' },
        { name: 'Mars Inc.', website: 'https://www.mars.com/', turnover: '>$1B' },
        { name: 'Kraft Heinz', website: 'https://www.kraftheinzcompany.com/', turnover: '>$1B' },
        { name: 'Ingredion', website: 'https://www.ingredion.com/', turnover: '>$1B' },
        { name: 'Tootsie Roll Industries', website: 'https://www.tootsie.com/', turnover: '$100M-$1B' },
        { name: 'Ferrara Candy', website: 'https://www.ferrarausa.com/', turnover: '$100M-$1B' }
      ],
      desc: 'World capital of packaged food, confectionery, and CPG manufacturing. Home to candy, cookie, snack, condiment, and marshmallow production at scale. FSMA compliant, FDA-registered facilities.',
      customs: { hts_code: '1704.90', duty_rate: '0% (Domestic)', compliance_note: 'FDA registration mandatory. FSMA Preventive Controls rule applies. No import duties for domestic supply.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Major brands publish Scope 1/2/3 reduction roadmaps. Packaging recyclability targets active.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.8k/Ground' },
      industry_kpi: { label: 'Min Order', value: '500 kg MOQ' }
    },
    {
      id: 'h_food_2', lat: 23.1, lng: 113.3,
      hub: 'GUANGDONG, CHINA', title: 'Asia Pacific Food Manufacturing',
      companies: [
        { name: 'Want Want Group', website: 'https://www.wantWant.com/', turnover: '>$1B' },
        { name: 'Nongfu Spring', website: 'https://www.nongfuspring.com/', turnover: '>$1B' },
        { name: 'Haday Foods', website: 'https://www.haday.com/', turnover: '$100M-$1B' },
        { name: 'Yida Group', website: 'https://www.yida.cc/', turnover: '$100M-$1B' }
      ],
      desc: 'High-volume, low-cost production for candies, snacks, instant noodles, sauces, and condiments. Dominant supplier for private-label food brands in North America and Europe. Subject to enhanced import inspection.',
      customs: { hts_code: '1704.90', duty_rate: '25% (Sec 301)', compliance_note: 'FDA Prior Notice required. Enhanced allergen/contaminant screening at US ports. Section 301 tariffs apply.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Water usage and wastewater treatment audits recommended. Supplier labor audits required.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.2k/FEU' },
      industry_kpi: { label: 'Scale', value: 'Unlimited Volume' }
    },
    {
      id: 'h_food_3', lat: 52.1, lng: 5.3,
      hub: 'ROTTERDAM, NETHERLANDS', title: 'European Food Innovation Hub',
      companies: [
        { name: 'Unilever', website: 'https://www.unilever.com/', turnover: '>$1B' },
        { name: 'DSM-Firmenich', website: 'https://www.dsm-firmenich.com/', turnover: '>$1B' },
        { name: 'FrieslandCampina', website: 'https://www.frieslandcampina.com/', turnover: '>$1B' },
        { name: 'Royal Cosun', website: 'https://www.cosun.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Leading European hub for food ingredients, flavors, natural sweeteners, and branded CPG. Haribo, Lärabar, and premium confectionery supply cluster. Strict EU food law compliance.',
      customs: { hts_code: '1704.90', duty_rate: '6.5% (MFN)', compliance_note: 'EU Regulation 178/2002 (General Food Law) applies. EFSA novel food approvals required for new ingredients. Full traceability mandatory.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'EU Farm to Fork strategy compliance. Palm oil traceability and RSPO certification required.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$3.2k/Sea' },
      industry_kpi: { label: 'Certifications', value: 'BRC / IFS / SQF' }
    },
    {
      id: 'h_food_4', lat: 20.7, lng: -103.4,
      hub: 'GUADALAJARA, MEXICO', title: 'Latin America Food & Beverage Hub',
      companies: [
        { name: 'Grupo Bimbo', website: 'https://www.grupobimbo.com/', turnover: '>$1B' },
        { name: 'FEMSA', website: 'https://www.femsa.com/', turnover: '>$1B' },
        { name: 'Sigma Alimentos', website: 'https://www.sigma-alimentos.com/', turnover: '>$1B' },
        { name: 'Lala Group', website: 'https://www.grupolala.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Largest bakery, dairy, and beverage production cluster in Latin America. Strong USMCA advantages for US imports. Competitive cost vs. US domestic for baked goods, dairy, and packaged snacks.',
      customs: { hts_code: '1704.90', duty_rate: '0% (USMCA)', compliance_note: 'USMCA Rules of Origin apply. FDA Prior Notice required. Cold chain compliance mandatory for perishable goods.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Grupo Bimbo 100% renewable energy committed. Water stewardship programs active in water-stressed regions.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.2k/Ground' },
      industry_kpi: { label: 'Lead Time', value: '3-7 Days to US' }
    },
    {
      id: 'h_food_5', lat: 13.8, lng: 100.6,
      hub: 'BANGKOK, THAILAND', title: 'Southeast Asia Food Export Hub',
      companies: [
        { name: 'Charoen Pokphand Foods', website: 'https://www.cpfworldwide.com/', turnover: '>$1B' },
        { name: 'Thai Union Group', website: 'https://www.thaiunion.com/', turnover: '>$1B' },
        { name: 'Osotspa', website: 'https://www.osotspa.com/', turnover: '$100M-$1B' },
        { name: 'Malee Group', website: 'https://www.maleegroup.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Major APAC export hub for canned goods, ready meals, sauces, tropical fruit, seafood, and beverages. Competitive labor costs and strong ASEAN FTA network. World\'s largest tuna processing cluster.',
      customs: { hts_code: '1604.20', duty_rate: '11.5% (MFN)', compliance_note: 'FDA Prior Notice required. Import Alert monitoring for Thai seafood. HACCP certification mandatory.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'IUU fishing monitoring required for seafood supply chains. MarinTrust and MSC certification preferred.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Export Reach', value: '150+ Countries' }
    },
    {
      id: 'h_food_6', lat: 41.6, lng: -93.6,
      hub: 'IOWA / MIDWEST, USA', title: 'North America Processed Meats & Protein Hub',
      companies: [
        { name: 'Smithfield Foods', website: 'https://www.smithfieldfoods.com/', turnover: '>$1B' },
        { name: 'Tyson Foods', website: 'https://www.tysonfoods.com/', turnover: '>$1B' },
        { name: 'Hormel Foods', website: 'https://www.hormelfoods.com/', turnover: '>$1B' },
        { name: 'Oscar Mayer (Kraft Heinz)', website: 'https://www.kraftheinzcompany.com/', turnover: '>$1B' }
      ],
      desc: 'The US Midwest is the global epicenter of processed meat manufacturing — bacon, sausage, hot dogs, ham, deli meat, and lunch meat. Iowa, Illinois, and Minnesota host the largest pork and poultry processing complexes. Smithfield is the world\'s largest pork processor; Tyson and Hormel produce pepperoni, sausage, and bacon at scale.',
      customs: { hts_code: '1601.00.20', duty_rate: '0% (domestic)', compliance_note: 'USDA FSIS inspection mandatory for all processed meats. HACCP plans required. Country of Origin Labeling (COOL) rules apply. Export requires USDA export certificate.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'B', sustainability_note: 'Smithfield sustainability commitments include 25% GHG reduction. Tyson aims for net-zero by 2050. Animal welfare audits (PVP/PAACO) required by major retail customers.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.4k/FEU (domestic trucking)' },
      industry_kpi: { label: 'US Pork Processing', value: 'Smithfield: ~27% US market share' }
    },
    {
      id: 'h_food_7', lat: 44.6, lng: 11.3,
      hub: 'EMILIA-ROMAGNA, ITALY', title: 'European Charcuterie & Cured Meats Hub',
      companies: [
        { name: 'Fratelli Beretta', website: 'https://www.fratellibaratta.it/', turnover: '$100M-$1B' },
        { name: 'Inalca (Cremonini Group)', website: 'https://www.inalca.it/', turnover: '>$1B' },
        { name: 'Negroni Salumi', website: 'https://www.negroni.com/', turnover: '$100M-$1B' },
        { name: 'Salumificio Riva', website: 'https://www.rivagroup.it/', turnover: '$100M-$1B' }
      ],
      desc: 'Emilia-Romagna is the birthplace and PDO (Protected Designation of Origin) heartland for Italian cured meats: prosciutto di Parma, mortadella Bologna, salami Milano, coppa, bresaola, and pancetta. Pepperoni (a US-Italian hybrid) and salami are produced here for global food service supply chains including pizza toppings.',
      customs: { hts_code: '1602.49.40', duty_rate: '6.4% MFN (prepared pig meat, EU origin to US)', compliance_note: 'EU-US SPS agreement covers most cured meats. USDA FSIS import inspection required. PDO products require EU geographical indication documentation. Cold chain 0–4°C mandatory.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Consorzio del Prosciutto di Parma sustainability program. Italian salumi sector under EU Farm-to-Fork strategy. Animal welfare standards higher than US equivalents.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.1k/FEU (refrigerated)' },
      industry_kpi: { label: 'Prosciutto di Parma', value: '11M+ hams/yr certified PDO' }
    },
    {
      id: 'h_food_8', lat: 60.4, lng: 5.3,
      hub: 'BERGEN / ÅLESUND, NORWAY', title: 'Atlantic Seafood & Aquaculture Hub',
      companies: [
        { name: 'Mowi (Marine Harvest)', website: 'https://mowi.com/', turnover: '>$1B' },
        { name: 'SalMar', website: 'https://www.salmar.no/', turnover: '>$1B' },
        { name: 'Lerøy Seafood Group', website: 'https://www.leroyseafood.com/', turnover: '>$1B' },
        { name: 'Cermaq', website: 'https://www.cermaq.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Norway is the world\'s largest producer of farmed Atlantic salmon and a top-5 seafood exporter. Bergen and Ålesund are the operational hubs for salmon farming, cod, herring, mackerel, and shrimp processing. Norwegian salmon (smoked salmon, fresh fillets, frozen portions) commands the highest global quality premiums.',
      customs: { hts_code: '0302.11.00', duty_rate: '0% MFN (fresh Atlantic salmon to US)', compliance_note: 'FDA Prior Notice mandatory. MSC/ASC certification standard for retail accounts. EU IUU fishing regulation compliance required for EU re-exports. Cold chain –18°C for frozen, 0–2°C for fresh.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A', sustainability_note: 'Mowi and SalMar MSC/ASC certified. Norwegian aquaculture under strict environmental standards (traffic light system). Sea lice and escapes reporting mandatory.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/FEU (reefer premium)' },
      industry_kpi: { label: 'Norway Salmon Export', value: '~1.5M tonnes/yr, $12B export value' }
    },
    {
      id: 'h_food_9', lat: 43.1, lng: -89.4,
      hub: 'WISCONSIN / NEW ZEALAND', title: 'Global Dairy & Cheese Sourcing Hub',
      companies: [
        { name: 'Leprino Foods', website: 'https://www.leprinofoods.com/', turnover: '>$1B' },
        { name: 'Dairy Farmers of America (DFA)', website: 'https://www.dfamilk.com/', turnover: '>$1B' },
        { name: 'Fonterra Co-operative', website: 'https://www.fonterra.com/', turnover: '>$1B' },
        { name: 'Saputo Inc.', website: 'https://www.saputo.com/', turnover: '>$1B' }
      ],
      desc: 'Wisconsin (the "Dairy State") and New Zealand (Fonterra) are the world\'s premium sources for mozzarella, cheddar, cream cheese, whey protein, milk powder, butter, and yogurt cultures. Leprino is the world\'s largest mozzarella producer supplying Pizza Hut, Domino\'s, and Papa John\'s. Fonterra supplies 1-in-3 dairy products globally by volume.',
      customs: { hts_code: '0406.10.28', duty_rate: '10% (fresh cheese, MFN to US)', compliance_note: 'FDA PMO (Pasteurized Milk Ordinance) compliance mandatory. USDA Dairy Import License required for over-quota imports. EU dairy exports to US require USDA-EU equivalence agreement compliance. New Zealand under US-NZ FTA negotiation.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Fonterra committed to carbon neutrality by 2050. DFA sustainability program. Leprino zero-waste manufacturing programs. New Zealand GHG emissions pricing under ETS.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/FEU (Wisconsin domestic); $4.8k/FEU (NZ)' },
      industry_kpi: { label: 'Global Mozzarella', value: 'Leprino: >40% US pizza cheese market' }
    },
    {
      id: 'h_food_10', lat: 33.7, lng: -84.4,
      hub: 'ATLANTA, USA / LEUVEN, BELGIUM', title: 'Global Beverages Manufacturing Hub',
      companies: [
        { name: 'The Coca-Cola Company', website: 'https://www.coca-colacompany.com/', turnover: '>$1B' },
        { name: 'PepsiCo', website: 'https://www.pepsico.com/', turnover: '>$1B' },
        { name: 'AB InBev', website: 'https://www.ab-inbev.com/', turnover: '>$1B' },
        { name: 'Monster Beverage Corp.', website: 'https://www.monsterbevcorp.com/', turnover: '>$1B' }
      ],
      desc: 'Atlanta is the HQ of Coca-Cola, the world\'s most distributed beverage. Leuven (Belgium) hosts AB InBev\'s global HQ. Together these hubs represent the soft drink, energy drink, sports drink, beer, and sparkling water supply chain. Concentrate manufacturing, syrup supply, and beverage ingredient sourcing all flow through these centers.',
      customs: { hts_code: '2202.10.00', duty_rate: '0% (domestic)', compliance_note: 'FDA GRAS status required for all beverage ingredients. TTB approval for alcoholic beverages. Nutrition Facts labeling mandatory per 21 CFR. Sugar tax compliance in applicable jurisdictions (UK, Mexico).' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Coca-Cola World Without Waste program (100% recyclable packaging by 2025). PepsiCo pep+ sustainability agenda. AB InBev 100% renewable electricity target.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.1k/FEU (domestic concentrate shipment)' },
      industry_kpi: { label: 'Coca-Cola Distribution', value: '200+ countries, 2B servings/day' }
    }
  ],

  // 6. METALS & MINING (Lithium, Copper, Steel, Aluminum, Rare Earths)
  metals: [
    {
      id: 'h_met_1', lat: -23.5, lng: -68.4,
      hub: 'ATACAMA, CHILE', title: 'Global Lithium & Copper Core',
      companies: [
        { name: 'SQM', website: 'https://www.sqm.com/' , turnover: '>$1B' },
        { name: 'Codelco', website: 'https://www.codelco.com/' , turnover: '>$1B' },
        { name: 'Albemarle Corporation', website: 'https://www.albemarle.com/' , turnover: '>$1B' }
      ],
      desc: 'The "Saudi Arabia of Lithium." Primary source of EV battery-grade lithium carbonate and the world\'s largest copper reserves.',
      customs: { hts_code: '2836.91', duty_rate: '0% (US-Chile FTA)', compliance_note: 'Strategic mineral export regulations. Environmental permit tracking required.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B', sustainability_note: 'Severe water rights conflicts with indigenous communities in Atacama. Monitor closely.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'Purity', value: '99.5% Li2CO3' }
    },
    {
      id: 'h_met_2', lat: -21.1, lng: 116.0,
      hub: 'PILBARA, AUSTRALIA', title: 'Iron Ore & Hard Rock Lithium',
      companies: [
        { name: 'BHP Group', website: 'https://www.bhp.com/' , turnover: '>$1B' },
        { name: 'Rio Tinto', website: 'https://www.riotinto.com/' , turnover: '>$1B' },
        { name: 'Pilbara Minerals', website: 'https://pilbaraminerals.com.au/' , turnover: '$100M-$1B' }
      ],
      desc: 'Massive scale iron ore and spodumene (hard rock lithium) extraction. World\'s most reliable mining jurisdiction.',
      customs: { hts_code: '2601.11', duty_rate: '0% (AUSFTA)', compliance_note: 'Clean origin. AUSFTA duty-free access to US market.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Transitioning mining fleets to electric/hydrogen. Traditional Owner agreements in place.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.9k/Bulk' },
      industry_kpi: { label: 'Volume', value: '800M Tons/Yr' }
    },
    {
      id: 'h_met_3', lat: 39.9, lng: 116.4,
      hub: 'HEBEI, CHINA', title: 'Steel & Rare Earth Processing Mega-Hub',
      companies: [
        { name: 'HBIS Group', website: 'http://www.hbisco.com/' , turnover: '>$1B' },
        { name: 'Baowu Steel Group', website: 'http://www.baowugroup.com/' , turnover: '>$1B' },
        { name: 'China Northern Rare Earth', website: 'https://www.northernrareearth.com/' , turnover: '>$1B' }
      ],
      desc: 'The largest concentration of steel processing and rare earth separation capacity in the world. Cost-dominant but heavily tariffed.',
      customs: { hts_code: '7208.10', duty_rate: '25% (Sec 232 + 301)', compliance_note: 'Subject to both Section 232 (national security) and Section 301 (trade) tariffs.' },
      esg: { carbon_footprint: 'Very High', ethical_rating: 'C', sustainability_note: 'Severe air pollution. Heavy reliance on coal power. Decarbonization plan underway.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$4.0k/Bulk' },
      industry_kpi: { label: 'Capacity', value: 'Global Dominant' }
    },
    {
      id: 'h_met_4', lat: 40.4, lng: -79.9,
      hub: 'PITTSBURGH, USA', title: 'US Domestic Steel & Aluminum',
      companies: [
        { name: 'US Steel Corporation', website: 'https://www.ussteel.com/' , turnover: '>$1B' },
        { name: 'Alcoa Corporation', website: 'https://www.alcoa.com/' , turnover: '>$1B' },
        { name: 'Nucor Steel', website: 'https://www.nucor.com/' , turnover: '>$1B' }
      ],
      desc: 'Domestic US supplier for high-grade steel and aluminum for automotive, infrastructure, and defense. 100% tariff-free.',
      customs: { hts_code: '7208', duty_rate: '0% (Domestic)', compliance_note: 'Buy America Act compliant. Section 232 exempt (domestic origin).' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Electric arc furnace (EAF) adoption growing rapidly. Green steel targets set.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.0k/Rail' },
      industry_kpi: { label: 'Melt Origin', value: '100% US Domestic' }
    },
    {
      id: 'h_met_5', lat: -11.2, lng: 27.5,
      hub: 'ZAMBIA / DRC', title: 'African Copper & Cobalt Belt',
      companies: [
        { name: 'Glencore', website: 'https://www.glencore.com/' , turnover: '>$1B' },
        { name: 'Ivanhoe Mines', website: 'https://www.ivanhoemines.com/' , turnover: '$100M-$1B' },
        { name: 'First Quantum Minerals', website: 'https://www.first-quantum.com/' , turnover: '>$1B' }
      ],
      desc: 'Copper and cobalt extraction at massive scale. Critical for EV batteries (cobalt) and power infrastructure (copper). Artisanal mining risk in DRC.',
      customs: { hts_code: '7403.11', duty_rate: '1% (MFN)', compliance_note: 'OECD Due Diligence required. Cobalt from DRC requires conflict minerals audit (RMI).' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B-', sustainability_note: 'Artisanal/small-scale mining (ASM) risk in DRC. Child labor monitoring essential.' },
      logistics: { port_wait_days: 10, freight_cost_estimate: '$5.5k/FEU' },
      industry_kpi: { label: 'Cobalt Grade', value: '>30% Co' }
    }
  ],

  // 6. TEXTILES & APPAREL (Clothing, Shoes, Cotton, Leather, Fabrics)
  textiles: [
    {
      id: 'h_tex_1', lat: 23.8, lng: 90.4,
      hub: 'DHAKA, BANGLADESH', title: 'RMG (Ready-Made Garments) Hub',
      companies: [
        { name: 'Ha-Meem Group', website: 'https://www.hameemgroup.net/' , turnover: '$100M-$1B' },
        { name: 'Beximco', website: 'https://www.beximco.com/' , turnover: '$100M-$1B' },
        { name: 'DBL Group', website: 'https://dblgroup.com/' , turnover: '$100M-$1B' }
      ],
      desc: 'World\'s 2nd largest apparel exporter. Extremely competitive cost base for high-volume, fast fashion manufacturing.',
      customs: { hts_code: '6109.10', duty_rate: '16.5% (MFN)', compliance_note: 'Strict labor audits required (ACCORD/RSC). GSP benefits phased out for US market.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Significant improvements post-Rana Plaza but structural risks remain. Annual unannounced audits required.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'Cost/Unit', value: 'Extremely Low' }
    },
    {
      id: 'h_tex_2', lat: 10.8, lng: 106.6,
      hub: 'HO CHI MINH, VIETNAM', title: 'Performance Apparel & Footwear',
      companies: [
        { name: 'Pou Chen Group', website: 'https://www.pouchen.com/' , turnover: '>$1B' },
        { name: 'Vinatex', website: 'https://vinatex.com.vn/' , turnover: '$100M-$1B' },
        { name: 'Eclat Textile', website: 'https://www.eclat.com.tw/' , turnover: '$100M-$1B' }
      ],
      desc: 'Premium athletic wear and footwear manufacturing. Nike, Adidas, and Under Armour\'s primary production hub.',
      customs: { hts_code: '6404.11', duty_rate: '20% (MFN)', compliance_note: 'Verify forced labor chain of custody. Vietnamese origin certification critical.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Good factory conditions in export processing zones. High renewable energy adoption.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Quality Rating', value: 'A (Performance)' }
    },
    {
      id: 'h_tex_3', lat: 41.0, lng: 28.9,
      hub: 'ISTANBUL, TURKEY', title: 'Euro-Nearshore Fashion Hub',
      companies: [
        { name: 'LC Waikiki', website: 'https://corporate.lcwaikiki.com/' , turnover: '>$1B' },
        { name: 'Mavi Jeans', website: 'https://www.mavi.com/' , turnover: '$100M-$1B' },
        { name: 'Kiğılı', website: 'https://www.kigili.com/' , turnover: '$100M-$1B' }
      ],
      desc: 'Fast turnaround, high-quality cotton and denim production for the European market. 2-3 week lead time vs 12+ weeks from Asia.',
      customs: { hts_code: '6203.42', duty_rate: '0% (EU Customs Union)', compliance_note: 'Rapid border clearance to EU. Turkish origin certificate required for preferential access.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A-', sustainability_note: 'Organic cotton sourcing available. Good labor law enforcement.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$1.5k/Truck' },
      industry_kpi: { label: 'Lead Time', value: '2-3 Weeks' }
    },
    {
      id: 'h_tex_4', lat: 21.0, lng: 72.8,
      hub: 'GUJARAT, INDIA', title: 'Global Cotton & Textile Mill',
      companies: [
        { name: 'Arvind Ltd', website: 'https://www.arvind.com/' , turnover: '$100M-$1B' },
        { name: 'Welspun India', website: 'https://www.welspunindia.com/' , turnover: '$100M-$1B' },
        { name: 'Raymond Group', website: 'https://www.raymond.in/' , turnover: '$100M-$1B' }
      ],
      desc: 'Massive scale vertical integration from raw cotton spinning to finished home textiles. OECD-compliant supply chains.',
      customs: { hts_code: '5208.11', duty_rate: '10% (MFN)', compliance_note: 'Ensure no Xinjiang cotton blending. Indian origin certification required. UFLPA risk low.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Heavy water usage in dyeing processes. Effluent treatment mandatory.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'Integration', value: 'Full Vertical' }
    }
  ],

// 7. PLASTICS, POLYMERS & ELASTOMERS
// Covers: TPE, ABS, PP, PVC, nylon, PEEK, polycarbonate, polyurethane,
//         silicone rubber, composites, injection/blow/roto molding,
//         epoxy resins, carbon fiber, fiberglass, packaging film
  plastics: [
    {
      id: 'h_pla_1', lat: 22.5, lng: 114.1,
      hub: 'GUANGDONG, CHINA', title: 'Global Injection Molding & Polymer Hub',
      companies: [
        { name: 'Kingfa Sci & Tech', website: 'https://www.kingfa.com/' , turnover: '$100M-$1B' },
        { name: 'Sinopec (polymer resins)', website: 'https://www.sinopec.com/' , turnover: '>$1B' },
        { name: 'Hi-Tech Mold & Engineering', website: 'https://www.hitechmold.com/' , turnover: '$10M-$100M' }
      ],
      desc: 'World\'s largest plastic parts manufacturing cluster. Unmatched capacity for high-volume injection molding, blow molding, and overmolding across automotive, consumer, and industrial applications. Key hub for TPE, ABS, and PP compound production.',
      customs: { hts_code: '3926.90.99', duty_rate: '5.3% + 25% (Sec 301)', compliance_note: 'Section 301 List 3 tariffs apply to most finished plastic articles. Verify REACH and RoHS compliance for EU re-export.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C+', sustainability_note: 'High energy intensity from molding presses. Plastics recycling mandates increasing under China\'s EPR regulations.' },
      logistics: { port_wait_days: 14, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'Capacity', value: 'World\'s Largest' }
    },
    {
      id: 'h_pla_2', lat: 49.4, lng: 8.7,
      hub: 'RHINE VALLEY, GERMANY', title: 'European Specialty Polymer Hub',
      companies: [
        { name: 'BASF SE', website: 'https://www.basf.com/' , turnover: '>$1B' },
        { name: 'Covestro', website: 'https://www.covestro.com/' , turnover: '>$1B' },
        { name: 'Lanxess', website: 'https://www.lanxess.com/' , turnover: '>$1B' }
      ],
      desc: 'Global center for engineering thermoplastics, specialty resins, and polyurethane systems. BASF and Covestro supply automotive OEMs worldwide with IATF-grade nylon, PBT, and polycarbonate. Preferred source for high-performance, REACH-compliant polymers.',
      customs: { hts_code: '3908.10.00', duty_rate: '0% (EU–US MFN for polyamides)', compliance_note: 'REACH registration mandatory for EU-origin imports into EU. No Section 301. Preferred source for sustainability-focused supply chains.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'BASF committed to carbon-neutral operations by 2050. Circular economy portfolio (ChemCycling). High ESG transparency.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Grade', value: 'Specialty / Engineering' }
    },
    {
      id: 'h_pla_3', lat: 29.7, lng: -95.0,
      hub: 'HOUSTON / BAYTOWN, USA', title: 'North American Polyolefin Hub',
      companies: [
        { name: 'ExxonMobil Chemical', website: 'https://www.exxonmobilchemical.com/' , turnover: '>$1B' },
        { name: 'LyondellBasell', website: 'https://www.lyondellbasell.com/' , turnover: '>$1B' },
        { name: 'Braskem America', website: 'https://www.braskem.com.br/' , turnover: '>$1B' }
      ],
      desc: 'World\'s largest concentration of polyolefin (PP, PE, LLDPE) production. Domestic US supply with zero tariff exposure, short lead times, and full traceability. Preferred for USMCA-origin compliance and reshoring supply chains.',
      customs: { hts_code: '3902.10.00', duty_rate: '0% (domestic)', compliance_note: 'No import duties for domestic supply. USMCA-compliant for Canada/Mexico export. FDA food-contact grades available.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Significant bio-based PP investments underway. Domestic production reduces shipping emissions substantially.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$0.8k/Truck' },
      industry_kpi: { label: 'Origin', value: '100% US Domestic' }
    },
    {
      id: 'h_pla_4', lat: 22.3, lng: 73.1,
      hub: 'VADODARA / SURAT, INDIA', title: 'Asia Polymer & Compounding Hub',
      companies: [
        { name: 'Reliance Industries (polymers)', website: 'https://www.ril.com/' , turnover: '>$1B' },
        { name: 'Supreme Industries', website: 'https://www.supreme.co.in/' , turnover: '$100M-$1B' },
        { name: 'Atul Ltd', website: 'https://www.atulltd.com/' , turnover: '$100M-$1B' }
      ],
      desc: 'Reliance Industries operates the world\'s largest single-site refinery-petrochemical complex. Growing hub for polymer compounding, masterbatch, and specialty plastic components. Competitive cost base with improving quality standards.',
      customs: { hts_code: '3901.20.00', duty_rate: '0% (GSP suspended; MFN 6.5%)', compliance_note: 'India GSP benefits suspended for US importers. MFN rate applies. Strong cost advantage for commodity grades.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Reliance investing in green H2 and circular economy. Compounders increasingly using recycled feedstock.' },
      logistics: { port_wait_days: 8, freight_cost_estimate: '$3.0k/FEU' },
      industry_kpi: { label: 'Scale', value: 'Largest Asia Refinery' }
    },
    {
      id: 'h_pla_5', lat: 35.5, lng: 129.4,
      hub: 'ULSAN, SOUTH KOREA', title: 'Specialty Elastomer & Engineering Polymer Hub',
      companies: [
        { name: 'LG Chem', website: 'https://www.lgchem.com/' , turnover: '>$1B' },
        { name: 'Lotte Chemical', website: 'https://www.lottechem.com/' , turnover: '>$1B' },
        { name: 'SK Geo Centric', website: 'https://www.skgeocentric.com/' , turnover: '>$1B' }
      ],
      desc: 'Global leader in specialty elastomers, ABS, and engineering plastics. LG Chem supplies automotive-grade ABS and SAN to Hyundai, GM, and Ford. KORUS FTA eliminates import duties for US buyers. Strong quality and traceability standards.',
      customs: { hts_code: '4002.59.00', duty_rate: '0% (KORUS FTA)', compliance_note: 'KORUS FTA duty elimination on synthetic rubber and most polymer grades. Korean origin documentation required.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'LG Chem target: 100% renewable energy by 2050. Bio-circular ABS available for automotive OEMs.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.6k/FEU' },
      industry_kpi: { label: 'Tariff', value: '0% KORUS FTA' }
    },
    {
      id: 'h_pla_6', lat: 1.3, lng: 103.7,
      hub: 'JURONG ISLAND, SINGAPORE', title: 'SE Asia Chemical & Polymer Gateway',
      companies: [
        { name: 'Shell Chemicals Asia', website: 'https://www.shell.com/' , turnover: '>$1B' },
        { name: 'ExxonMobil Chemical Asia', website: 'https://www.exxonmobilchemical.com/' , turnover: '>$1B' },
        { name: 'Mitsui Chemicals Asia', website: 'https://www.mitsuichemicals.com/' , turnover: '>$1B' }
      ],
      desc: 'Jurong Island hosts 100+ chemical and petrochemical companies on a single industrial island. Key trading and production hub for polyolefins, PVC, and specialty chemicals for the ASEAN region. Excellent logistics, zero political supply risk.',
      customs: { hts_code: '3904.10.00', duty_rate: '6.5% (MFN PVC)', compliance_note: 'Singapore Free Trade Agreements with US (USSFTA) provide 0% duty on most goods. Favorable duty treatment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Singapore EDB sustainability mandates. Carbon tax on industrial emitters. High environmental compliance standards.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.4k/FEU' },
      industry_kpi: { label: 'FTA Duty', value: '0% (USSFTA)' }
    }
  ],
  chemicals: [
    {
      id: 'h_che_1', lat: 51.5, lng: 6.8,
      hub: 'RHINE-RUHR, GERMANY', title: 'European Specialty Chemicals & Coatings Hub',
      companies: [
        { name: 'BASF', website: 'https://www.basf.com/' , turnover: '>$1B' },
        { name: 'Evonik Industries', website: 'https://www.evonik.com/' , turnover: '>$1B' },
        { name: 'Covestro', website: 'https://www.covestro.com/' , turnover: '>$1B' },
        { name: 'Lanxess', website: 'https://www.lanxess.com/' , turnover: '>$1B' }
      ],
      desc: 'BASF Ludwigshafen — largest integrated chemical complex in the world. Evonik and Lanxess adjacent. Covers adhesives, coatings, lubricants, surfactants, specialty polymers, and industrial gases. EU REACH compliance built-in.',
      customs: { hts_code: '3814.00.10', duty_rate: '3.7% (MFN solvents)', compliance_note: 'EU REACH registration required for >1 tonne/year. Dangerous Goods shipping (IMDG/ADR). SDS mandatory for all chemical imports.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'BASF Verbund system optimizes energy reuse. Scope 3 emissions reporting in place. Carbon neutrality target 2050.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'Complex Scale', value: 'Largest globally' }
    },
    {
      id: 'h_che_2', lat: 29.7, lng: -95.3,
      hub: 'HOUSTON, USA', title: 'US Gulf Coast Petrochemicals & Lubricants Hub',
      companies: [
        { name: 'Dow Chemical', website: 'https://www.dow.com/' , turnover: '>$1B' },
        { name: 'Huntsman Corporation', website: 'https://www.huntsman.com/' , turnover: '>$1B' },
        { name: 'LyondellBasell', website: 'https://www.lyondellbasell.com/' , turnover: '>$1B' },
        { name: 'Celanese', website: 'https://www.celanese.com/' , turnover: '>$1B' }
      ],
      desc: 'Texas Gulf Coast hosts 40% of US chemical production. Ethylene crackers, polyurethane systems, adhesives, epoxies, specialty lubricants, and industrial solvents. Proximity to Permian Basin feedstocks drives cost advantage.',
      customs: { hts_code: '2710.19.11', duty_rate: '0.1¢/barrel (lubricants)', compliance_note: 'EPA TSCA compliance required. Hazmat shipping regulations (49 CFR). California Prop 65 labeling for CA sales.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B+', sustainability_note: 'Industry-leading carbon capture investment. ACC Responsible Care program. Circular economy initiatives in solvents.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$1.8k/FEU domestic' },
      industry_kpi: { label: 'US Output', value: '40% of national' }
    },
    {
      id: 'h_che_3', lat: 1.3, lng: 103.7,
      hub: 'JURONG ISLAND, SINGAPORE', title: 'Asia Pacific Adhesives & Coating Chemicals Hub',
      companies: [
        { name: 'Henkel Asia-Pacific', website: 'https://www.henkel-adhesives.com/' , turnover: '>$1B' },
        { name: 'H.B. Fuller', website: 'https://www.hbfuller.com/' , turnover: '>$1B' },
        { name: 'Momentive Performance Materials', website: 'https://www.momentive.com/' , turnover: '$100M-$1B' }
      ],
      desc: 'Jurong Island Singapore: premier APAC hub for adhesives, sealants, and specialty coatings serving electronics, automotive, and construction. Excellent bonded-warehouse infrastructure and ASEAN trade hub status.',
      customs: { hts_code: '3506.10.00', duty_rate: '0% (Singapore FTA)', compliance_note: 'REACH-equivalent Singapore Chemical Control Order. Hazmat IMDG compliance for export. APAC regulatory mapping service available.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Singapore EHS standards. Low-VOC formulations mandated. ISO 14001 site certification.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/FEU' },
      industry_kpi: { label: 'ASEAN Access', value: '650M consumers' }
    }
  ],
  packaging: [
    {
      id: 'h_pkg_1', lat: 39.9, lng: 116.4,
      hub: 'BEIJING/TIANJIN, CHINA', title: 'Global Corrugated & Rigid Packaging Hub',
      companies: [
        { name: 'Nine Dragons Paper', website: 'https://www.ndpaper.com/' , turnover: '>$1B' },
        { name: 'Lee & Man Paper', website: 'https://www.leemanpaper.com/' , turnover: '$100M-$1B' },
        { name: 'Greatview Aseptic', website: 'https://www.greatviewpack.com/' , turnover: '$100M-$1B' }
      ],
      desc: 'China produces 55% of global corrugated packaging and leads in rigid plastic containers, aseptic cartons, and flexible pouches. Nine Dragons alone runs 40+ paper mills. Major sourcing hub for boxes, clamshells, blister packs, and shrink film.',
      customs: { hts_code: '4819.10.00', duty_rate: '25% (Section 301 + 14.6% MFN)', compliance_note: 'FSC certification recommended for paper products. FDCA compliance for food-contact packaging. California AB 2287 recycled content rules.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'B', sustainability_note: 'Nine Dragons runs recycled fiber operations. Improving energy intensity. Audit required for labor practices at tier 2 mills.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.9k/FEU' },
      industry_kpi: { label: 'Global Share', value: '55% corrugated' }
    },
    {
      id: 'h_pkg_2', lat: 48.8, lng: 2.3,
      hub: 'FRANCE / BENELUX', title: 'European Glass & Premium Packaging Hub',
      companies: [
        { name: 'Verallia', website: 'https://www.verallia.com/' , turnover: '>$1B' },
        { name: 'Ardagh Group', website: 'https://www.ardaghgroup.com/' , turnover: '>$1B' },
        { name: 'Smurfit Kappa', website: 'https://www.smurfitkappa.com/' , turnover: '>$1B' },
        { name: 'DS Smith', website: 'https://www.dssmith.com/' , turnover: '>$1B' }
      ],
      desc: 'France and Benelux are the center of European glass bottle, luxury packaging, and sustainable paperboard production. Verallia and Ardagh lead glass container output. Smurfit Kappa and DS Smith supply corrugated and circular packaging across EU.',
      customs: { hts_code: '7010.90.10', duty_rate: '5% (MFN glass containers)', compliance_note: 'EU Packaging and Packaging Waste Directive (PPWD) compliance. Extended Producer Responsibility (EPR) registration required in EU markets.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Glass is infinitely recyclable. EU EPR mandates minimum recycled content. Smurfit Kappa 100% chain of custody certified.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Recyclability', value: 'Glass: infinite' }
    },
    {
      id: 'h_pkg_3', lat: 33.7, lng: -84.4,
      hub: 'ATLANTA, USA', title: 'North American Labels & Flexible Packaging Hub',
      companies: [
        { name: 'Avery Dennison', website: 'https://www.averydennison.com/' , turnover: '>$1B' },
        { name: 'CCL Industries', website: 'https://www.cclind.com/' , turnover: '$100M-$1B' },
        { name: 'Sealed Air', website: 'https://www.sealedair.com/' , turnover: '>$1B' },
        { name: 'Berry Global', website: 'https://www.berryglobal.com/' , turnover: '>$1B' }
      ],
      desc: 'US Southeast hub for pressure-sensitive labels, shrink sleeves, flexible pouches, and protective packaging. Avery Dennison and CCL dominate labels. Sealed Air and Berry Global lead flexible and protective packaging.',
      customs: { hts_code: '4821.10.20', duty_rate: '0% (most labels, domestic)', compliance_note: 'FDA 21 CFR for food-contact. FTC Green Guides for recyclability claims. California SB 54 plastic packaging recycled content law.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Industry transition to mono-material recyclable films. Avery Dennison CleanFlake technology. Recycled content mandates increasing in all major states.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.5k/FEU domestic' },
      industry_kpi: { label: 'Label Market', value: '$45B+ annually' }
    }
  ],
  medical: [
    {
      id: 'h_med_1', lat: 22.3, lng: 114.2,
      hub: 'HONG KONG / SHENZHEN', title: 'Asia Pacific Medical Device Manufacturing Hub',
      companies: [
        { name: 'Mindray Medical', website: 'https://www.mindray.com/' , turnover: '>$1B' },
        { name: 'Medtronic China', website: 'https://www.medtronic.com/' , turnover: '>$1B' },
        { name: 'Lepu Medical', website: 'https://www.lepumedical.com/' , turnover: '$100M-$1B' },
        { name: 'Microport Scientific', website: 'https://www.microport.com/' , turnover: '$100M-$1B' }
      ],
      desc: 'Shenzhen–Hong Kong corridor is the leading APAC hub for medical device manufacturing: diagnostics equipment, imaging, surgical tools, patient monitoring, and consumables. Lower-tier devices increasingly exported globally. Class II/III manufacturing under NMPA oversight.',
      customs: { hts_code: '9018.90.60', duty_rate: '0% (MFN surgical instruments)', compliance_note: 'FDA 510(k) or PMA required for US market entry. CE marking for EU. NMPA registration in China. Quality System Regulation (QSR) 21 CFR Part 820.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'B+', sustainability_note: 'ISO 13485 quality systems standard. Growing GreenHealth sustainability programs. Medical waste disposal regulations strictly enforced.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Device Output', value: 'Largest APAC hub' }
    },
    {
      id: 'h_med_2', lat: 47.6, lng: 9.5,
      hub: 'LAKE CONSTANCE, GERMANY/SWITZERLAND', title: 'European Pharma API & MedTech Cluster',
      companies: [
        { name: 'Novartis', website: 'https://www.novartis.com/' , turnover: '>$1B' },
        { name: 'Roche', website: 'https://www.roche.com/' , turnover: '>$1B' },
        { name: 'B. Braun', website: 'https://www.bbraun.com/' , turnover: '>$1B' },
        { name: 'Siemens Healthineers', website: 'https://www.siemens-healthineers.com/' , turnover: '>$1B' }
      ],
      desc: 'Basel–Lake Constance triangle hosts the world\'s highest concentration of pharmaceutical API producers and high-end MedTech. Roche and Novartis dominate APIs. B. Braun leads infusion and surgical systems. Siemens Healthineers anchors imaging and diagnostics.',
      customs: { hts_code: '2941.10.00', duty_rate: '0% (MFN antibiotics/APIs)', compliance_note: 'EMA GMP certification required. US FDA import alert risk on non-compliant API manufacturers. ICH Q7 Good Manufacturing Practice for APIs. Swiss-EU bilateral regulatory alignment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Roche net-zero operations commitment. Novartis environmental health and safety excellence program. High ethical audit standards.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'API Concentration', value: 'Highest globally' }
    },
    {
      id: 'h_med_3', lat: 17.4, lng: 78.5,
      hub: 'HYDERABAD, INDIA', title: 'Global Generic Pharma API & Formulations Hub',
      companies: [
        { name: 'Dr. Reddy\'s Laboratories', website: 'https://www.drreddys.com/' , turnover: '$10M-$100M' },
        { name: 'Aurobindo Pharma', website: 'https://www.aurobindo.com/' , turnover: '>$1B' },
        { name: 'Hetero Drugs', website: 'https://www.heterodrugs.com/' , turnover: '$100M-$1B' },
        { name: 'Divi\'s Laboratories', website: 'https://www.divislaboratories.com/' , turnover: '$10M-$100M' }
      ],
      desc: 'Hyderabad is the pharmacy capital of India — and arguably the world for generics. India supplies 40% of generic drugs consumed in the US and 25% globally. API manufacturing cost advantage of 30–50% vs. Western producers.',
      customs: { hts_code: '2941.90.00', duty_rate: '0% (generics MFN)', compliance_note: 'FDA import alerts active on select manufacturers (check FDA database). WHO GMP and US FDA 21 CFR cGMP compliance required. Drug Master File (DMF) registration for US market.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Improving post-CPCB effluent discharge enforcement. Zero liquid discharge mandates at major facilities. EHS audits recommended.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.1k/FEU' },
      industry_kpi: { label: 'US Generic Supply', value: '40% market share' }
    }
  ],
  machinery: [
    {
      id: 'h_mac_1', lat: 48.1, lng: 11.6,
      hub: 'BAVARIA, GERMANY', title: 'Precision Machinery & Industrial Equipment Hub',
      companies: [
        { name: 'Siemens AG', website: 'https://www.siemens.com/' , turnover: '>$1B' },
        { name: 'MAN Energy Solutions', website: 'https://www.man-es.com/' , turnover: '>$1B' },
        { name: 'KSB Group', website: 'https://www.ksb.com/' , turnover: '>$1B' },
        { name: 'Trumpf', website: 'https://www.trumpf.com/' , turnover: '>$1B' }
      ],
      desc: 'Bavaria and Baden-Württemberg are the global center for Mittelstand precision machinery: CNC machining centers, industrial pumps, compressors, valves, hydraulics, and laser cutting systems. "Made in Germany" machinery commands 20–40% premium and 10–15 year asset life.',
      customs: { hts_code: '8413.70.20', duty_rate: '0% (industrial pumps, EU origin)', compliance_note: 'CE machinery directive 2006/42/EC. ATEX certification for explosive atmospheres. Pressure Equipment Directive (PED) for pressure vessels. Export control EAR/ITAR for dual-use equipment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Germany\'s Energiewende drives energy-efficient machinery design. ISO 50001 energy management certifications common. Circular design for 20+ year service life.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.5k/FEU (heavy lift surcharge may apply)' },
      industry_kpi: { label: 'Asset Life', value: '10–15 years' }
    },
    {
      id: 'h_mac_2', lat: 31.2, lng: 121.5,
      hub: 'YANGTZE DELTA, CHINA', title: 'High-Volume Industrial Machinery & CNC Hub',
      companies: [
        { name: 'Haas Automation China', website: 'https://www.haascnc.com/' , turnover: '>$1B' },
        { name: 'SANY Group', website: 'https://www.sanygroup.com/' , turnover: '>$1B' },
        { name: 'Zoomlion', website: 'https://www.zoomlion.com/' , turnover: '>$1B' },
        { name: 'DMG Mori China', website: 'https://www.dmgmori.com/' , turnover: '>$1B' }
      ],
      desc: 'Shanghai–Suzhou–Hangzhou triangle leads global output of CNC machine tools, injection molding machines, industrial robots, compressors, pumps, and heavy construction equipment. 70% of world\'s machine tool production. Quality range from OEM-grade to budget.',
      customs: { hts_code: '8457.10.00', duty_rate: '25% (Section 301 CNC machining centers)', compliance_note: 'Section 301 tariffs apply to most Chinese machinery. CE/UL certification may be absent — verify for US/EU market entry. Import scrutiny on strategic manufacturing equipment.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Energy efficiency improving under Made in China 2025. Variable quality in ESG compliance. Factory audit and pre-shipment inspection strongly recommended.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$3.8k/FEU (OOG cargo extra)' },
      industry_kpi: { label: 'Machine Tool Output', value: '70% of world production' }
    },
    {
      id: 'h_mac_3', lat: 34.7, lng: 135.5,
      hub: 'OSAKA / NAGOYA, JAPAN', title: 'Japan Precision Pumps, Valves & Automation Hub',
      companies: [
        { name: 'Ebara Corporation', website: 'https://www.ebara.co.jp/' , turnover: '>$1B' },
        { name: 'Nidec', website: 'https://www.nidec.com/' , turnover: '>$1B' },
        { name: 'Fanuc', website: 'https://www.fanuc.co.jp/' , turnover: '>$1B' },
        { name: 'Keyence', website: 'https://www.keyence.com/' , turnover: '>$1B' }
      ],
      desc: 'Osaka–Nagoya corridor specializes in ultra-precision industrial automation: servo motors, CNC controllers (Fanuc dominates globally), centrifugal and vacuum pumps (Ebara), and precision measurement (Keyence). Highest reliability and lowest defect rates in the industry.',
      customs: { hts_code: '8413.60.00', duty_rate: '0% (centrifugal pumps, MFN)', compliance_note: 'Japan-US Trade Agreement duty relief on most machinery. JIS certification for domestic use. Export controls on high-precision CNC (Wassenaar Arrangement). Lead times 16–24 weeks for precision units.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A+', sustainability_note: 'Fanuc zero-waste factory operations. Ebara ISO 14001 certified. Japan\'s monozukuri culture emphasizes longevity and repairability.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.6k/FEU' },
      industry_kpi: { label: 'CNC Market', value: 'Fanuc: ~65% global share' }
    }
  ],

  // ── WOOD, PAPER & PULP ───────────────────────────────────────
  wood_paper: [
    {
      id: 'h_wp_1', lat: 61.5, lng: 25.7,
      hub: 'HELSINKI/TAMPERE, FINLAND', title: 'Nordic Pulp & Paper Excellence Hub',
      companies: [
        { name: 'UPM-Kymmene', role: 'Global pulp, paper, and plywood producer', tier: 'Tier-1', website: 'https://www.upm.com/', turnover: '>$1B' },
        { name: 'Stora Enso', role: 'Sustainable packaging, paperboard, and wood products', tier: 'Tier-1', website: 'https://www.storaenso.com/', turnover: '>$1B' },
        { name: 'Metsä Group', role: 'Pulp, tissue, and fresh forest fiber products', tier: 'Tier-1', website: 'https://www.metsagroup.com/', turnover: '>$1B' },
        { name: 'Sappi Finland', role: 'Coated fine paper and dissolving pulp', tier: 'Tier-2', website: 'https://www.sappi.com/', turnover: '$500M-$1B' }
      ],
      desc: 'Finland and Sweden dominate global sustainable pulp and paper supply. PEFC/FSC certified supply chains, world-leading environmental standards, and advanced biomass utilization. Key grades: bleached kraft pulp (NBSK, BHKP), coated/uncoated paper, containerboard.',
      customs: { hts_code: '4702.00.00', duty_rate: '0% (MFN — kraft pulp, chemical)', compliance_note: 'EU EUDR timber traceability requirements from 2025. PEFC/FSC chain of custody mandatory for major retailers. No export licenses required for standard grades.' },
      esg: { carbon_footprint: 'Very Low', ethical_rating: 'A+', sustainability_note: 'Nordic mills operate on renewable energy (biomass, hydro). UPM and Stora Enso committed to science-based targets. FSC 100% certified fiber sourcing.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'NBSK Pulp Price', value: '~$1,200–$1,400/mt (2024)' }
    },
    {
      id: 'h_wp_2', lat: 45.4, lng: -75.7,
      hub: 'ONTARIO/QUEBEC, CANADA', title: 'North America Softwood Lumber Hub',
      companies: [
        { name: 'West Fraser Timber', role: 'Largest North American softwood lumber producer', tier: 'Tier-1', website: 'https://www.westfraser.com/', turnover: '>$1B' },
        { name: 'Resolute Forest Products', role: 'Newsprint, pulp, and specialty papers', tier: 'Tier-1', website: 'https://www.resolutefp.com/', turnover: '$500M-$1B' },
        { name: 'Canfor', role: 'SPF lumber and NBSK pulp', tier: 'Tier-1', website: 'https://www.canfor.com/', turnover: '>$1B' },
        { name: 'Domtar', role: 'Uncoated freesheet paper and pulp', tier: 'Tier-2', website: 'https://www.domtar.com/', turnover: '$500M-$1B' }
      ],
      desc: 'Canada is the world\'s largest softwood lumber exporter. SPF (spruce-pine-fir) and Douglas fir grades serve US construction and industrial markets. Province of BC and Ontario are key production centers. Subject to ongoing US softwood lumber duty disputes.',
      customs: { hts_code: '4407.11.00', duty_rate: '8.05–17.9% CVD/AD (softwood lumber, US imports)', compliance_note: 'US Section 201 lumber duties and countervailing duties apply to most Canadian softwood. Hardwood grades (maple, oak) import at 0% MFN. USMCA applies for non-softwood grades. Lacey Act compliance for all wood imports.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'SFI-certified supply chains. Canadian boreal forest management under provincial regulations. FPIC (Free Prior Informed Consent) protocols with Indigenous communities.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.2k/FEU (truck to US border)' },
      industry_kpi: { label: 'SPF Lumber', value: '~$450–$700/mbf (random length)' }
    },
    {
      id: 'h_wp_3', lat: -15.8, lng: -47.9,
      hub: 'SÃO PAULO/MINAS GERAIS, BRAZIL', title: 'Latin America Eucalyptus Pulp Hub',
      companies: [
        { name: 'Suzano', role: 'World\'s largest eucalyptus pulp producer', tier: 'Tier-1', website: 'https://www.suzano.com.br/en/', turnover: '>$1B' },
        { name: 'Eldorado Brasil', role: 'BEKP and tissue production', tier: 'Tier-1', website: 'https://www.eldoradobrasil.com.br/', turnover: '$500M-$1B' },
        { name: 'Klabin', role: 'Packaging paper and pulp', tier: 'Tier-2', website: 'https://www.klabin.com.br/en/', turnover: '>$1B' }
      ],
      desc: 'Brazil\'s eucalyptus plantations yield the lowest-cost hardwood pulp (BEKP) globally with 7-year harvest cycles vs 25-40 years in Nordic countries. Suzano controls ~25% of global market pulp capacity. Key advantage: year-round harvesting and proximity to Atlantic shipping lanes.',
      customs: { hts_code: '4703.21.00', duty_rate: '0% (MFN — bleached hardwood kraft pulp)', compliance_note: 'EUDR deforestation compliance required for EU-bound shipments from 2025 (GPS coordinates to plantation level). CERFLOR/FSC certification standard. Brazil\'s IBAMA export permits for native species.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Suzano certified to FSC, CERFLOR. Water stewardship programs in Cerrado region. Deforestation-free pledges for plantation pulp, but native forest adjacency risk exists.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.1k/FEU to US East Coast' },
      industry_kpi: { label: 'BEKP Pulp Price', value: '~$900–$1,100/mt (2024)' }
    }
  ],

  // ── GLASS & CONSTRUCTION MATERIALS ───────────────────────────
  construction: [
    {
      id: 'h_con_1', lat: 30.9, lng: 112.2,
      hub: 'WUHAN/HUBEI, CHINA', title: 'Asia Pacific Flat Glass & Building Materials Hub',
      companies: [
        { name: 'CSG Holdings', role: 'Flat glass, coated glass, photovoltaic glass', tier: 'Tier-1', website: 'https://www.csg.cn/en/', turnover: '>$1B' },
        { name: 'Fuyao Glass', role: 'Architectural and automotive flat glass', tier: 'Tier-1', website: 'https://www.fuyaogroup.com/', turnover: '>$1B' },
        { name: 'CNBM (China National Building Material)', role: 'Cement, glass fiber, gypsum board', tier: 'Tier-1', website: 'https://www.cnbm.com.cn/en/', turnover: '>$1B' },
        { name: 'China Jushi', role: 'World\'s largest fiberglass manufacturer', tier: 'Tier-1', website: 'https://www.jushi.com/', turnover: '>$1B' }
      ],
      desc: 'China produces ~60% of global flat glass and dominates glass fiber manufacturing. Hubei and Guangdong are the core flat glass production centers. Critical note: US/EU tariffs apply on most Chinese glass imports. Chinese glass fiber faces 25% Section 301 tariffs in the US.',
      customs: { hts_code: '7005.10.00', duty_rate: '25% Section 301 (flat glass, US imports from China)', compliance_note: 'Section 301 List 3 tariffs apply to most flat glass and glass fiber. REACH compliance required for EU. UK Global Tariff at 5.4% for flat glass. Consider Vietnam or India re-sourcing for tariff mitigation.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Float glass production is energy-intensive. Chinese plants increasingly transitioning to natural gas from coal. CNBM has sustainability commitments but disclosure is limited.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$4.2k/FEU (hazardous/oversize handling premium)' },
      industry_kpi: { label: 'Global Flat Glass', value: 'China: ~60% of world production' }
    },
    {
      id: 'h_con_2', lat: 51.5, lng: 10.4,
      hub: 'GERMANY / BENELUX', title: 'European Glass & Advanced Building Materials Hub',
      companies: [
        { name: 'Saint-Gobain', role: 'Flat glass, insulation, high-performance materials', tier: 'Tier-1', website: 'https://www.saint-gobain.com/', turnover: '>$1B' },
        { name: 'Guardian Industries', role: 'Float glass and coated glass', tier: 'Tier-1', website: 'https://www.guardianglass.com/', turnover: '>$1B' },
        { name: 'AGC Glass Europe', role: 'Flat glass and specialty glass coatings', tier: 'Tier-1', website: 'https://www.agc-glass.eu/', turnover: '>$1B' },
        { name: 'Knauf', role: 'Gypsum board, insulation, and construction systems', tier: 'Tier-2', website: 'https://www.knauf.com/', turnover: '>$1B' }
      ],
      desc: 'Western Europe leads in high-performance architectural glass (low-e coatings, triple glazing, fire-resistant glass), gypsum board systems, and mineral wool insulation. Germany and Belgium are key production hubs for Saint-Gobain, AGC, and Guardian flat glass lines.',
      customs: { hts_code: '7005.10.00', duty_rate: '3.7% MFN (flat glass to US)', compliance_note: 'EU CE marking required for construction products. EN 572 standard for flat glass. REACH compliance for chemical coatings. US imports from EU at MFN rates (3.7% for most flat glass). No anti-dumping duties.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Saint-Gobain committed to carbon neutrality by 2050. AGC and Guardian operating carbon reduction programs. European glass recycling rates >70% in most countries.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.8k/FEU (specialist glass freight)' },
      industry_kpi: { label: 'Low-E Glass Premium', value: '+35–60% vs clear float glass' }
    },
    {
      id: 'h_con_3', lat: 22.5, lng: 88.4,
      hub: 'KOLKATA / INDIA', title: 'South Asia Cement & Construction Materials Hub',
      companies: [
        { name: 'UltraTech Cement', role: 'Largest cement producer in Asia ex-China', tier: 'Tier-1', website: 'https://www.ultratechcement.com/', turnover: '>$1B' },
        { name: 'Ambuja Cements (Adani)', role: 'Blended cement and ready-mix concrete', tier: 'Tier-1', website: 'https://www.ambujacement.com/', turnover: '>$1B' },
        { name: 'ACC Limited', role: 'Ordinary Portland cement and specialty grades', tier: 'Tier-2', website: 'https://www.acclimited.com/', turnover: '$500M-$1B' },
        { name: 'Kajaria Ceramics', role: 'Leading ceramic and vitrified tile manufacturer', tier: 'Tier-2', website: 'https://www.kajariaceramics.com/', turnover: '$100M-$500M' }
      ],
      desc: 'India is the world\'s second-largest cement producer and a major ceramic tile exporter. Indian cement (OPC, PPC, PSC) and ceramic/porcelain tiles are competitively priced alternatives to Chinese sources with improving quality and logistics infrastructure.',
      customs: { hts_code: '2523.21.00', duty_rate: '0% MFN (Portland cement)', compliance_note: 'US import duty on cement: free under most circumstances. BIS (Bureau of Indian Standards) certification required for most construction products. ISI marks on cement. Ceramic tiles from India: 0-3.4% US MFN duty vs China tiles with AD/CVD.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'UltraTech committed to reducing CO2 per ton of cement. Increasing use of fly ash and slag as clinker substitutes. India cement sector under National Cement Mission for emissions reduction.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.9k/FEU to US West Coast' },
      industry_kpi: { label: 'India Cement Capacity', value: '~600 MT/yr (2nd globally)' }
    }
  ],

  // ── CONSUMER GOODS & PERSONAL CARE ────────────────────────────
  consumer_goods: [
    {
      id: 'h_cg_1', lat: 22.3, lng: 114.2,
      hub: 'GUANGDONG, CHINA', title: 'Asia Pacific Consumer & Personal Care Hub',
      companies: [
        { name: 'Henkel (China Operations)', role: 'Laundry, hair care, and adhesive brands', tier: 'Tier-1', website: 'https://www.henkel.com/', turnover: '>$1B' },
        { name: 'Reckitt (China plants)', role: 'Hygiene, health, and home products', tier: 'Tier-1', website: 'https://www.reckitt.com/', turnover: '>$1B' },
        { name: 'Nice Group', role: 'Detergent and personal care OEM/private label', tier: 'Tier-2', website: 'https://www.nice-group.com/', turnover: '$100M-$500M' },
        { name: 'Guangdong Marubi', role: 'Cosmetics and skin care contract manufacturing', tier: 'Tier-2', website: 'https://www.marubi.com.cn/', turnover: '$100M-$500M' }
      ],
      desc: 'Guangdong is the world\'s largest hub for consumer goods and personal care contract manufacturing. Thousands of OEM/ODM factories produce detergents, shampoos, cosmetics, and household cleaners for global brands. Key advantage: scale, cost, and speed-to-market for private label.',
      customs: { hts_code: '3305.10.00', duty_rate: '25% Section 301 (most personal care from China)', compliance_note: 'Section 301 tariffs on most personal care and household products. FDA OTC drug requirements for sunscreen, anti-dandruff products. CPSC labeling rules. EU Cosmetics Regulation (EC 1223/2009) for EU-bound goods. Consider Vietnam or India OEM to avoid tariffs.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'C+', sustainability_note: 'Major brands imposing supplier sustainability codes. RSPO certification for palm-derivative ingredients. Factory audit programs (SMETA, SEDEX) standard for tier-1 suppliers.' },
      logistics: { port_wait_days: 7, freight_cost_estimate: '$3.9k/FEU' },
      industry_kpi: { label: 'Personal Care OEM Market', value: '~$28B globally (2024)' }
    },
    {
      id: 'h_cg_2', lat: 48.9, lng: 2.3,
      hub: 'PARIS/ILE-DE-FRANCE, FRANCE', title: 'European Luxury Beauty & Fragrance Hub',
      companies: [
        { name: 'L\'Oréal', role: 'World\'s largest beauty company, HQ and R&D', tier: 'Tier-1', website: 'https://www.loreal.com/', turnover: '>$1B' },
        { name: 'LVMH Parfums', role: 'Prestige fragrance and luxury cosmetics', tier: 'Tier-1', website: 'https://www.lvmh.com/', turnover: '>$1B' },
        { name: 'Givaudan', role: 'Global flavor and fragrance ingredient leader', tier: 'Tier-1', website: 'https://www.givaudan.com/', turnover: '>$1B' },
        { name: 'Firmenich (now DSM-Firmenich)', role: 'Fragrance ingredients and finished compounds', tier: 'Tier-2', website: 'https://www.dsm-firmenich.com/', turnover: '>$1B' }
      ],
      desc: 'France is the global capital of luxury beauty, fragrance, and high-performance cosmetics. Paris and the Grasse region (Côte d\'Azur) produce premium fragrance ingredients and finished perfumes. L\'Oréal\'s R&D campus develops breakthrough formulations for mass and prestige segments.',
      customs: { hts_code: '3303.00.20', duty_rate: '0% MFN (perfume/toilet water to US)', compliance_note: 'EU Cosmetics Regulation 1223/2009 compliance mandatory for EU production. US FDA cosmetics registration under MoCRA (2023). IFRA compliance for fragrance allergens. Country of Origin "Made in France" designation requires substantial transformation in France.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A', sustainability_note: 'L\'Oréal L\'Oréal for the Future program targeting carbon neutrality by 2025. LVMH LIFE 360 sustainability program. Givaudan committing to 100% sustainably sourced naturals by 2030.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.2k/FEU' },
      industry_kpi: { label: 'French Cosmetics Exports', value: '€19B/yr (2nd global exporter)' }
    },
    {
      id: 'h_cg_3', lat: 28.6, lng: 77.2,
      hub: 'DELHI/UTTAR PRADESH, INDIA', title: 'South Asia Personal Care & Detergent Hub',
      companies: [
        { name: 'Hindustan Unilever', role: 'Personal care, home care OEM and brands', tier: 'Tier-1', website: 'https://www.hul.co.in/', turnover: '>$1B' },
        { name: 'Procter & Gamble India', role: 'Detergent, hair care, and oral care manufacturing', tier: 'Tier-1', website: 'https://www.pg.com/', turnover: '>$1B' },
        { name: 'Godrej Consumer Products', role: 'Hair color, soaps, and insecticides', tier: 'Tier-2', website: 'https://www.godrejcp.com/', turnover: '$500M-$1B' },
        { name: 'Jyothy Labs', role: 'Fabric care and personal hygiene products', tier: 'Tier-2', website: 'https://www.jyothylabs.com/', turnover: '$100M-$500M' }
      ],
      desc: 'India\'s consumer goods sector is the world\'s fastest-growing, driven by a 1.4B population and rising middle class. HUL, P&G, and homegrown brands operate large-scale manufacturing in Uttar Pradesh and Himachal Pradesh. India is an emerging export hub for halal-certified and Ayurvedic personal care products.',
      customs: { hts_code: '3401.11.50', duty_rate: '0% MFN (soap and detergent bars to US)', compliance_note: 'US FDA cosmetics MoCRA registration for new importers. FSSAI (Food Safety) for ingested personal care items. BIS certification for some household products. EU REACH and Cosmetics Regulation for EU market access.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'HUL Compass sustainability goals. P&G India renewable energy commitments. Growing Ayurvedic/natural ingredients supply chain with ECOCERT certification.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.7k/FEU to US East Coast' },
      industry_kpi: { label: 'India FMCG Market', value: '~$110B (2024), 10% YoY growth' }
    }
  ],

  // ══════════════════════════════════════════════════════════════════════
  // EXPANSION SET — categories 16-40
  // ══════════════════════════════════════════════════════════════════════
  // 16. AEROSPACE & DEFENCE STRUCTURES
  aerospace: [
    {
      id: 'h_aero_1', lat: 47.9, lng: -122.2,
      hub: 'EVERETT / SEATTLE, USA', title: 'Boeing Commercial Airframe Cluster',
      companies: [
        { name: 'Boeing Commercial Airplanes', website: 'https://www.boeing.com/', turnover: '>$1B' },
        { name: 'Spirit AeroSystems', website: 'https://www.spiritaero.com/', turnover: '>$1B' },
        { name: 'Toray Composite Materials America', website: 'https://www.toraycma.com/', turnover: '$100M-$1B' },
        { name: 'Electroimpact', website: 'https://www.electroimpact.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Primary North American widebody airframe and composite structures cluster. Fuselage sections, wing boxes, and CFRP prepreg conversion. The AS9100 / NADCAP special-process ecosystem here is the deepest in the world.',
      customs: { hts_code: '8803.30', duty_rate: '0% (WTO Civil Aircraft Agreement)', compliance_note: 'Civil aircraft parts are largely duty-free under the WTO Agreement on Trade in Civil Aircraft. ITAR (22 CFR 120-130) applies to any defence derivative; deemed-export rules cover foreign nationals on site.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Autoclave cure is highly energy intensive. CFRP scrap has no scaled recycling route; expect landfill-diversion questions in customer ESG audits.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$2.6k/Ground (oversize permit)' },
      industry_kpi: { label: 'Qualification Lead', value: '18-24 Months (AS9100 + FAI)' }
    },
    {
      id: 'h_aero_2', lat: 43.6, lng: 1.44,
      hub: 'TOULOUSE, FRANCE', title: 'Airbus European Final Assembly Hub',
      companies: [
        { name: 'Airbus SE', website: 'https://www.airbus.com/', turnover: '>$1B' },
        { name: 'Safran', website: 'https://www.safran-group.com/', turnover: '>$1B' },
        { name: 'Liebherr-Aerospace Toulouse', website: 'https://www.liebherr.com/', turnover: '$100M-$1B' },
        { name: 'Latecoere', website: 'https://www.latecoere.aero/', turnover: '$100M-$1B' }
      ],
      desc: 'European final assembly line for the A320 and A350 families, plus a dense Occitanie supplier base in actuation, landing gear, avionics racks, and interiors. EASA Part 21 design and production approvals are concentrated here.',
      customs: { hts_code: '8803.30', duty_rate: '0% (Civil Aircraft) / MFN on non-civil', compliance_note: 'EASA Part 21G production approval and EASA Form 1 release required. EU dual-use Regulation 2021/821 applies to defence-adjacent items. Post-Brexit UK content needs separate CAA airworthiness paperwork.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'ReFuelEU SAF mandates are pushing supplier-level CO2 reporting. REACH authorisation pressure on hexavalent chromate aerospace primers is a live reformulation risk.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.1k/Sea + Beluga for major sections' },
      industry_kpi: { label: 'Rate Ramp', value: 'A320 family ~75/month target' }
    },
    {
      id: 'h_aero_3', lat: 45.5, lng: -73.6,
      hub: 'MONTREAL, CANADA', title: 'Quebec Aerostructures & Engines Cluster',
      companies: [
        { name: 'Bombardier', website: 'https://www.bombardier.com/', turnover: '>$1B' },
        { name: 'Pratt & Whitney Canada', website: 'https://www.prattwhitney.com/', turnover: '>$1B' },
        { name: 'Heroux-Devtek', website: 'https://www.herouxdevtek.com/', turnover: '$100M-$1B' },
        { name: 'CAE Inc.', website: 'https://www.cae.com/', turnover: '>$1B' }
      ],
      desc: 'Third-largest aerospace cluster globally by employment. Landing gear, turboprop and small turbofan engines, business jets, and flight simulation. A USMCA-qualified alternative to US-only sourcing at lower labour cost.',
      customs: { hts_code: '8411.12', duty_rate: '0% (USMCA / Civil Aircraft)', compliance_note: 'USMCA origin plus the Transport Canada / FAA bilateral aviation safety agreement (BASA) simplifies certificate transfer. Canadian Controlled Goods Program registration needed for defence work.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'The Quebec hydro grid gives one of the lowest embodied-carbon machining footprints in aerospace. Stable unionised labour agreements.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.9k/Truck to US Midwest' },
      industry_kpi: { label: 'Grid Carbon', value: '~30 gCO2/kWh (hydro)' }
    },
    {
      id: 'h_aero_4', lat: 27.9, lng: -110.9,
      hub: 'GUAYMAS / EMPALME, MEXICO', title: 'Sonora Aerospace Machining Corridor',
      companies: [
        { name: 'Daher Mexico', website: 'https://www.daher.com/', turnover: '$100M-$1B' },
        { name: 'Incora Mexico', website: 'https://www.incora.com/', turnover: '$100M-$1B' },
        { name: 'The Offshore Group (aerospace park operator)', website: 'https://www.offshoregroup.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Low-cost AS9100 machining and sheet-metal detail-part corridor serving US primes. Best fit for build-to-print brackets, ribs, clips, and harness assembly rather than design-responsible work.',
      customs: { hts_code: '8803.30', duty_rate: '0% (USMCA)', compliance_note: 'IMMEX maquila programme defers duty on imported raw stock. ITAR technical-data transfer to Mexican nationals requires a DDTC licence or exemption - the single most common compliance failure in this corridor.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Water stress in Sonora is a live constraint for anodising and chemical-processing lines. Verify wastewater permits before qualifying any special-process source.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.3k/Truck to Arizona' },
      industry_kpi: { label: 'Labour Delta', value: '~25% of US machinist cost' }
    }
  ],

  // 17. ENERGY, OIL & GAS
  energy_oil_gas: [
    {
      id: 'h_oil_1', lat: 29.76, lng: -95.36,
      hub: 'HOUSTON, USA', title: 'Global Upstream Equipment & OFS Capital',
      companies: [
        { name: 'SLB (Schlumberger)', website: 'https://www.slb.com/', turnover: '>$1B' },
        { name: 'Halliburton', website: 'https://www.halliburton.com/', turnover: '>$1B' },
        { name: 'Baker Hughes', website: 'https://www.bakerhughes.com/', turnover: '>$1B' },
        { name: 'NOV Inc.', website: 'https://www.nov.com/', turnover: '>$1B' },
        { name: 'Weir Oil & Gas', website: 'https://www.global.weir/', turnover: '$100M-$1B' }
      ],
      desc: 'Global centre of gravity for oilfield services, drilling equipment, subsea trees, wellheads, and API 6A/6D pressure control. Deepest engineering bench for high-pressure/high-temperature (HPHT) qualification.',
      customs: { hts_code: '8431.43', duty_rate: '0% (Domestic) / 2.5% MFN', compliance_note: 'API monogram licensing (API 6A, 16A, 20E) is the real gate, not tariff. OFAC sanctions screening is mandatory for any Russia, Iran, or Venezuela nexus in the end-use chain.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Scope 3 methane accounting under OGMP 2.0 now flows down to equipment suppliers. The EPA Waste Emissions Charge raises the lifetime cost of leak-prone components.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.4k/FEU ex-Houston' },
      industry_kpi: { label: 'API Qual Lead', value: '6-9 Months' }
    },
    {
      id: 'h_oil_2', lat: 25.36, lng: 51.18,
      hub: 'DOHA / RAS LAFFAN, QATAR', title: 'LNG Megaproject Supply Base',
      companies: [
        { name: 'QatarEnergy LNG', website: 'https://www.qatarenergy.qa/', turnover: '>$1B' },
        { name: 'Chiyoda Corporation', website: 'https://www.chiyodacorp.com/', turnover: '>$1B' },
        { name: 'McDermott International', website: 'https://www.mcdermott.com/', turnover: '>$1B' }
      ],
      desc: 'Anchor for LNG train EPC, cryogenic piping, and large rotating equipment demand through the North Field expansion. Effectively sets global lead times for cryogenic valves, compressors, and 9% nickel steel.',
      customs: { hts_code: '8419.60', duty_rate: '5% (GCC Common Tariff)', compliance_note: 'GCC common external tariff of 5%. In-country value (Tawteen / ICV) scoring materially affects award decisions - local content is a commercial gate, not just an ESG line item.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C+', sustainability_note: 'Migrant labour practices remain the dominant social-audit finding. Require ILO-aligned, recruitment-fee-free hiring clauses in every subcontract.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.9k/FEU' },
      industry_kpi: { label: 'Cryo Valve Lead', value: '52-78 Weeks' }
    },
    {
      id: 'h_oil_3', lat: 58.97, lng: 5.73,
      hub: 'STAVANGER, NORWAY', title: 'North Sea Subsea & Offshore Cluster',
      companies: [
        { name: 'Aker Solutions', website: 'https://www.akersolutions.com/', turnover: '>$1B' },
        { name: 'Subsea7', website: 'https://www.subsea7.com/', turnover: '>$1B' },
        { name: 'TechnipFMC Norway', website: 'https://www.technipfmc.com/', turnover: '>$1B' }
      ],
      desc: 'Premium subsea production systems, flexible risers, and offshore installation engineering. The strictest HSE regime in the industry; NORSOK is the de-facto quality benchmark for harsh-environment hardware.',
      customs: { hts_code: '8430.49', duty_rate: '0% (EEA/EFTA)', compliance_note: 'NORSOK M-630/M-650 material qualification required for offshore Norway. EEA membership gives tariff-free EU access, but Norway sits outside the EU customs union so origin proofs are still required.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Platform electrification from shore is mandated on new Norwegian Continental Shelf developments; suppliers face hard power-consumption targets in bid evaluation.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.1k/Sea' },
      industry_kpi: { label: 'HSE Standard', value: 'NORSOK / PSA Norway' }
    },
    {
      id: 'h_oil_4', lat: 1.29, lng: 103.85,
      hub: 'SINGAPORE / JURONG', title: 'Asian Refining, Bunkering & Fabrication Hub',
      companies: [
        { name: 'Seatrium', website: 'https://www.seatrium.com/', turnover: '>$1B' },
        { name: 'Rotary Engineering', website: 'https://www.rotaryeng.com.sg/', turnover: '$100M-$1B' },
        { name: 'Shell Energy and Chemicals Park', website: 'https://www.shell.com.sg/', turnover: '>$1B' }
      ],
      desc: 'Largest bunkering port worldwide plus heavy module fabrication yards. Strong for skid-mounted process packages, storage tanks, and refinery turnaround materials with fast ASEAN distribution.',
      customs: { hts_code: '7311.00', duty_rate: '0% (US-Singapore FTA)', compliance_note: 'USSFTA gives 0% into the US on most fabricated equipment. The Singapore Strategic Goods Control Act governs dual-use process technology exports.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'IMO 2020 sulphur cap and the 2050 net-zero trajectory are shifting bunker demand toward LNG, methanol, and ammonia - retrofit hardware is the growth vector.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.2k/FEU' },
      industry_kpi: { label: 'Bunker Volume', value: '~55M tonnes/year' }
    }
  ],

  // 18. EV BATTERY & CELL SUPPLY CHAIN
  ev_battery: [
    {
      id: 'h_evb_1', lat: 26.66, lng: 119.55,
      hub: 'NINGDE / FUJIAN, CHINA', title: 'World Cell Manufacturing Anchor (CATL)',
      companies: [
        { name: 'CATL', website: 'https://www.catl.com/', turnover: '>$1B' },
        { name: 'BYD FinDreams Battery', website: 'https://www.byd.com/', turnover: '>$1B' },
        { name: 'EVE Energy', website: 'https://www.evebattery.com/', turnover: '>$1B' },
        { name: 'Gotion High-Tech', website: 'https://www.gotion.com.cn/', turnover: '>$1B' }
      ],
      desc: 'Single largest concentration of LFP and NMC cell capacity globally. Sets world pricing for prismatic and cell-to-pack formats. Cost leader by a wide margin, but the highest policy-risk origin for US-bound programmes.',
      customs: { hts_code: '8507.60', duty_rate: '3.4% MFN + 25% (Sec 301)', compliance_note: 'IRA Foreign Entity of Concern (FEOC) rules disqualify China-linked cells from the 30D consumer credit. UN38.3 transport testing and IATA DGR Class 9 packing are mandatory for every cell chemistry change.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Grid intensity drives a roughly 60-80 kgCO2e/kWh cell footprint versus 35-45 in renewables-powered Europe. EU Battery Regulation carbon-footprint declarations will expose that gap from 2026.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$5.8k/FEU (DG surcharge)' },
      industry_kpi: { label: 'Cell Cost', value: '~$55-70/kWh LFP' }
    },
    {
      id: 'h_evb_2', lat: 36.35, lng: 127.38,
      hub: 'CHUNGCHEONG, SOUTH KOREA', title: 'Korean High-Nickel Cell & Cathode Belt',
      companies: [
        { name: 'LG Energy Solution', website: 'https://www.lgensol.com/', turnover: '>$1B' },
        { name: 'Samsung SDI', website: 'https://www.samsungsdi.com/', turnover: '>$1B' },
        { name: 'SK On', website: 'https://www.sk-on.com/', turnover: '>$1B' },
        { name: 'EcoPro BM', website: 'https://www.ecopro.co.kr/', turnover: '>$1B' },
        { name: 'POSCO Future M', website: 'https://www.poscofuturem.com/', turnover: '>$1B' }
      ],
      desc: 'Technology leader in high-nickel NCM/NCA cathode active material and pouch cells. The default IRA-compliant route for US OEMs, with large joint-venture plants already running in Georgia, Ohio, and Tennessee.',
      customs: { hts_code: '8507.60', duty_rate: '0% (KORUS FTA)', compliance_note: 'KORUS gives duty-free entry. Korean-processed CAM counts toward IRA critical-mineral value thresholds via the FTA-partner rule - keep supplier value-add declarations on file for IRS substantiation.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Cobalt traceability back to DRC artisanal sources remains the key audit item. Require RMI/CMRT plus Cobalt Refiner Due Diligence Standard conformance.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.9k/FEU (DG surcharge)' },
      industry_kpi: { label: 'Energy Density', value: '270-300 Wh/kg (NCM9)' }
    },
    {
      id: 'h_evb_3', lat: 34.75, lng: -84.95,
      hub: 'US BATTERY BELT (TN / GA / KY)', title: 'IRA-Qualified North American Cell Corridor',
      companies: [
        { name: 'Ultium Cells (GM/LG JV)', website: 'https://www.ultiumcells.com/', turnover: '>$1B' },
        { name: 'SK Battery America', website: 'https://www.skbatteryamerica.com/', turnover: '>$1B' },
        { name: 'Piedmont Lithium', website: 'https://piedmontlithium.com/', turnover: '$100M-$1B' },
        { name: 'Novonix', website: 'https://novonixgroup.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Fast-growing IRA-anchored corridor for cell assembly, module and pack lines, and anode graphite. The primary route to 45X production credits and 30D consumer-credit eligibility for North American vehicle programmes.',
      customs: { hts_code: '8507.60', duty_rate: '0% (Domestic)', compliance_note: 'IRC 45X yields $35/kWh cell plus $10/kWh module credits. FEOC screening on every upstream tier is mandatory - one China-controlled precursor supplier can void 30D eligibility for an entire vehicle line.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Domestic production cuts logistics emissions and dangerous-goods exposure. Anode-grade synthetic graphite is the weakest domestic link - most is still China-processed.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.7k/Truck' },
      industry_kpi: { label: '45X Credit', value: '$45/kWh (cell + module)' }
    },
    {
      id: 'h_evb_4', lat: 51.11, lng: 17.04,
      hub: 'CENTRAL EUROPE (PL / HU / DE)', title: 'European Gigafactory Corridor',
      companies: [
        { name: 'LG Energy Solution Wroclaw', website: 'https://www.lgensol.com/', turnover: '>$1B' },
        { name: 'Samsung SDI Goed', website: 'https://www.samsungsdi.com/', turnover: '>$1B' },
        { name: 'PowerCo (Volkswagen)', website: 'https://www.powerco.de/', turnover: '>$1B' },
        { name: 'Verkor', website: 'https://verkor.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Cell and pack capacity co-located with European OEM assembly. Poland and Hungary carry most installed capacity today; Germany and France are scaling next-generation unified-cell lines.',
      customs: { hts_code: '8507.60', duty_rate: '0% (Intra-EU) / 2.7% MFN', compliance_note: 'EU Battery Regulation 2023/1542 phases in carbon-footprint declaration, then recycled-content minimums and the digital battery passport from February 2027. Non-declaring cells lose EU market access.' },
      esg: { carbon_footprint: 'Low-Medium', ethical_rating: 'A', sustainability_note: 'Renewable PPAs are standard, giving the lowest cell carbon footprint of any major region. Recycled Li/Ni/Co targets begin in 2031 and require closed-loop offtake agreements to be signed now.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$1.6k/Truck intra-EU' },
      industry_kpi: { label: 'Battery Passport', value: 'Mandatory Feb 2027' }
    }
  ],

  // 19. SEMICONDUCTOR MANUFACTURING & MATERIALS
  semiconductor: [
    {
      id: 'h_semi_1', lat: 24.78, lng: 120.99,
      hub: 'HSINCHU, TAIWAN', title: 'Advanced Logic Foundry Core',
      companies: [
        { name: 'TSMC', website: 'https://www.tsmc.com/', turnover: '>$1B' },
        { name: 'UMC', website: 'https://www.umc.com/', turnover: '>$1B' },
        { name: 'MediaTek', website: 'https://www.mediatek.com/', turnover: '>$1B' },
        { name: 'ASE Technology (OSAT)', website: 'https://www.aseglobal.com/', turnover: '>$1B' }
      ],
      desc: 'Produces the overwhelming majority of sub-7nm logic worldwide plus leading-edge advanced packaging (CoWoS). No substitutable capacity exists for the leading node inside a 24-month horizon.',
      customs: { hts_code: '8542.31', duty_rate: '0% (ITA)', compliance_note: 'ITA duty-free. US BIS rules including the Foreign Direct Product Rule restrict transfer of advanced-node output to listed Chinese entities regardless of fab location - screen every end user and consignee.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'Leading-edge fabs consume over 150,000 tonnes of ultrapure water per day; Taiwan drought cycles are a genuine production risk. PFAS use in photoresist and etch chemistry is under regulatory review.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$9.2k/Air (high-value)' },
      industry_kpi: { label: 'Leading Node', value: '3nm ramp / 2nm 2025-26' }
    },
    {
      id: 'h_semi_2', lat: 35.18, lng: 136.91,
      hub: 'JAPAN (NAGOYA / TOHOKU)', title: 'Semiconductor Materials & Equipment Base',
      companies: [
        { name: 'Shin-Etsu Chemical', website: 'https://www.shinetsu.co.jp/', turnover: '>$1B' },
        { name: 'SUMCO', website: 'https://www.sumcosi.com/', turnover: '>$1B' },
        { name: 'JSR Corporation', website: 'https://www.jsr.co.jp/', turnover: '>$1B' },
        { name: 'Tokyo Electron', website: 'https://www.tel.com/', turnover: '>$1B' },
        { name: 'Shinko Electric Industries', website: 'https://www.shinko.co.jp/', turnover: '$100M-$1B' }
      ],
      desc: 'Controls the upstream materials layer: silicon wafers, photoresist, CMP slurry, high-purity gases, and ABF substrate. A far tighter chokepoint than fabs themselves - a handful of suppliers cover most global photoresist demand.',
      customs: { hts_code: '3707.90', duty_rate: '0% (CPTPP) / ~3% MFN', compliance_note: 'Japan METI export-licence regime covers advanced resist and deposition equipment bound for China. Chemical shipments need TSCA/REACH equivalents plus high-purity handling and shelf-life documentation.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A+', sustainability_note: 'Proposed EU REACH PFAS restrictions threaten several fluorinated resist and etch chemistries with no drop-in replacement identified. Track the ECHA restriction dossier quarterly.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$6.4k/Air temp-controlled' },
      industry_kpi: { label: 'Wafer Share', value: '~55% of global 300mm' }
    },
    {
      id: 'h_semi_3', lat: 33.45, lng: -112.07,
      hub: 'PHOENIX, USA', title: 'CHIPS Act Domestic Fab Cluster',
      companies: [
        { name: 'TSMC Arizona', website: 'https://www.tsmc.com/', turnover: '>$1B' },
        { name: 'Intel Foundry (Ocotillo)', website: 'https://www.intel.com/', turnover: '>$1B' },
        { name: 'Amkor Technology', website: 'https://www.amkor.com/', turnover: '>$1B' },
        { name: 'Applied Materials', website: 'https://www.appliedmaterials.com/', turnover: '>$1B' }
      ],
      desc: 'CHIPS-and-Science-funded domestic capacity for leading and mature logic plus a new advanced-packaging footprint. The de-risking route for defence, automotive, and critical-infrastructure programmes.',
      customs: { hts_code: '8542.31', duty_rate: '0% (Domestic)', compliance_note: 'CHIPS 25% advanced manufacturing investment credit applies to qualifying capex. Recipients accept guardrails barring material capacity expansion in China for ten years - check flow-down clauses in supply agreements.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Arizona water strategy depends on reclaim rates above 90%; verify each fab water balance before assuming supply continuity. Grid decarbonisation lags Taiwan and Japan.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.9k/Ground' },
      industry_kpi: { label: 'CHIPS Credit', value: '25% of qualifying capex' }
    },
    {
      id: 'h_semi_4', lat: 51.44, lng: 5.48,
      hub: 'EINDHOVEN, NETHERLANDS', title: 'Lithography Equipment Chokepoint',
      companies: [
        { name: 'ASML', website: 'https://www.asml.com/', turnover: '>$1B' },
        { name: 'ASM International', website: 'https://www.asm.com/', turnover: '>$1B' },
        { name: 'NXP Semiconductors', website: 'https://www.nxp.com/', turnover: '>$1B' },
        { name: 'VDL Groep', website: 'https://www.vdlgroep.com/', turnover: '>$1B' }
      ],
      desc: 'Sole global source of EUV lithography and a dominant DUV supplier. The Brainport supplier network provides precision optomechanics and vacuum subsystems that have no qualified second source.',
      customs: { hts_code: '8486.20', duty_rate: '0% (ITA)', compliance_note: 'Dutch national export-control licences now cover advanced DUV immersion tools bound for China, aligned with US BIS. Service visits and spare-parts shipments are separately licensable - budget lead time for licence issue.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'AA', sustainability_note: 'ASML runs on 100% renewable electricity and targets net-zero scope 3 by 2040, cascading energy-reporting requirements down its supplier tiers.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$45k+/Charter (EUV module)' },
      industry_kpi: { label: 'EUV Lead Time', value: '12-18 Months' }
    }
  ],

  // 20. MINING & EXTRACTIVES
  mining: [
    {
      id: 'h_min_1', lat: -22.2, lng: 118.6,
      hub: 'PILBARA, AUSTRALIA', title: 'Global Iron Ore & Spodumene Core',
      companies: [
        { name: 'BHP', website: 'https://www.bhp.com/', turnover: '>$1B' },
        { name: 'Rio Tinto', website: 'https://www.riotinto.com/', turnover: '>$1B' },
        { name: 'Fortescue', website: 'https://www.fmgl.com.au/', turnover: '>$1B' },
        { name: 'Pilbara Minerals', website: 'https://www.pilbaraminerals.com.au/', turnover: '>$1B' }
      ],
      desc: 'World benchmark for seaborne iron ore plus the largest hard-rock spodumene concentrate output. A politically stable FTA-partner origin that satisfies IRA critical-mineral sourcing tests.',
      customs: { hts_code: '2601.11', duty_rate: '0% (AUSFTA)', compliance_note: 'AUSFTA duty-free into the US and a qualifying IRA free-trade-partner origin for critical minerals. Australian foreign-investment screening applies to some downstream processing agreements.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B+', sustainability_note: 'Post-Juukan Gorge, Aboriginal heritage due diligence is a board-level requirement and native-title agreements must be evidenced. Cyclone season (Nov-Apr) disrupts rail and ship loading.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '~$18/tonne Capesize to Asia' },
      industry_kpi: { label: 'Fe Grade', value: '58-62% typical' }
    },
    {
      id: 'h_min_2', lat: -23.65, lng: -70.4,
      hub: 'ANTOFAGASTA, CHILE', title: 'Copper & Lithium Brine Belt',
      companies: [
        { name: 'Codelco', website: 'https://www.codelco.com/', turnover: '>$1B' },
        { name: 'Antofagasta Minerals', website: 'https://www.antofagasta.co.uk/', turnover: '>$1B' },
        { name: 'SQM', website: 'https://www.sqm.com/', turnover: '>$1B' },
        { name: 'Albemarle Chile', website: 'https://www.albemarle.com/', turnover: '>$1B' }
      ],
      desc: 'Largest copper-producing region on earth plus Atacama brine lithium. Structural grade decline at legacy mines is pushing unit costs up and making desalination capex a condition of new permits.',
      customs: { hts_code: '7403.11', duty_rate: '0% (US-Chile FTA)', compliance_note: 'US-Chile FTA duty-free and IRA FTA-partner qualifying. Chile national lithium strategy requires state participation (Codelco/ENAMI) in new lithium projects - factor this into long-term offtake structuring.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B', sustainability_note: 'Water rights conflicts with indigenous Atacameno communities are the primary social-licence risk. New copper projects are increasingly required to run on desalinated seawater.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.6k/FEU ex-Mejillones' },
      industry_kpi: { label: 'Global Cu Share', value: '~24% of world mine supply' }
    },
    {
      id: 'h_min_3', lat: -10.7, lng: 25.5,
      hub: 'KATANGA COPPERBELT, DR CONGO', title: 'Cobalt Supply Chokepoint',
      companies: [
        { name: 'Glencore (KCC / Mutanda)', website: 'https://www.glencore.com/', turnover: '>$1B' },
        { name: 'CMOC (Tenke Fungurume)', website: 'https://www.cmoc.com/', turnover: '>$1B' },
        { name: 'ERG Africa', website: 'https://www.eurasianresources.lu/', turnover: '>$1B' }
      ],
      desc: 'Supplies roughly 70% of world cobalt. Unavoidable for high-nickel cathode chemistries, and the single highest human-rights-risk node in the entire battery and electronics supply chain.',
      customs: { hts_code: '8105.20', duty_rate: '1.5% MFN', compliance_note: 'Dodd-Frank 1502 conflict-minerals reporting plus EU Conflict Minerals Regulation 2017/821. UFLPA exposure arises where DRC material is refined in Xinjiang - trace the refiner, not just the mine.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'D+', sustainability_note: 'Artisanal mining involves documented child labour. Source only through RMI-conformant refiners with mine-level chain of custody; on-the-ground third-party verification is essential, desk audits are not sufficient.' },
      logistics: { port_wait_days: 14, freight_cost_estimate: '$7.5k/FEU via Durban or Dar es Salaam' },
      industry_kpi: { label: 'World Co Share', value: '~70%' }
    },
    {
      id: 'h_min_4', lat: 52.13, lng: -106.67,
      hub: 'SASKATCHEWAN, CANADA', title: 'Potash, Uranium & Critical Minerals Base',
      companies: [
        { name: 'Nutrien', website: 'https://www.nutrien.com/', turnover: '>$1B' },
        { name: 'Cameco', website: 'https://www.cameco.com/', turnover: '>$1B' },
        { name: 'Teck Resources', website: 'https://www.teck.com/', turnover: '>$1B' }
      ],
      desc: 'Largest potash reserves worldwide and the highest-grade uranium deposits (Athabasca Basin). The preferred non-Russian, non-Belarusian source for fertiliser and nuclear fuel feedstock.',
      customs: { hts_code: '3104.20', duty_rate: '0% (USMCA)', compliance_note: 'USMCA duty-free. Uranium exports require Canadian Nuclear Safety Commission licensing plus bilateral nuclear cooperation agreement coverage for the destination country.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Strong indigenous partnership frameworks in Saskatchewan. Tailings management is under heightened scrutiny post-Mount Polley; require GISTM conformance.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$2.4k/Rail to US Midwest' },
      industry_kpi: { label: 'Potash Share', value: '~30% of world supply' }
    }
  ],

  // 21. LUXURY GOODS & LEATHER ACCESSORIES
  luxury_goods: [
    {
      id: 'h_lux_1', lat: 43.77, lng: 11.25,
      hub: 'FLORENCE / TUSCANY, ITALY', title: 'Global Leather Goods Atelier Belt',
      companies: [
        { name: 'Gucci (Kering) ArtLab', website: 'https://www.gucci.com/', turnover: '>$1B' },
        { name: 'Manifattura Ferrarese', website: 'https://www.manifatturaferrarese.it/', turnover: '$10M-$100M' },
        { name: 'Conceria Superior', website: 'https://www.conceriasuperior.it/', turnover: '$10M-$100M' },
        { name: 'Prada Group Tuscan facilities', website: 'https://www.pradagroup.com/', turnover: '>$1B' }
      ],
      desc: 'Scandicci and Santa Croce sull Arno form the world reference cluster for handbag and small-leather-goods manufacture plus vegetable-tanned calfskin. Almost every European maison sources or owns capacity here.',
      customs: { hts_code: '4202.21', duty_rate: '9% MFN (US) / 0% Intra-EU', compliance_note: 'Made in Italy origin claims require substantial transformation in Italy - Italian customs actively audit this. CITES permits required for exotic skins (crocodile, python, alligator) on every single unit crossing a border.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Chrome-tanning effluent is the key environmental exposure; prefer Leather Working Group Gold-rated tanneries. Subcontracted small workshops are a recurring labour-audit weak point.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$6.5k/Air (high-value, insured)' },
      industry_kpi: { label: 'Artisan Lead', value: '12-20 Weeks per style' }
    },
    {
      id: 'h_lux_2', lat: 47.0, lng: 6.83,
      hub: 'JURA ARC, SWITZERLAND', title: 'Swiss Watchmaking Valley',
      companies: [
        { name: 'Swatch Group / ETA', website: 'https://www.swatchgroup.com/', turnover: '>$1B' },
        { name: 'Richemont Manufactures', website: 'https://www.richemont.com/', turnover: '>$1B' },
        { name: 'Sellita Watch Co.', website: 'https://www.sellita.ch/', turnover: '$100M-$1B' },
        { name: 'Nivarox-FAR', website: 'https://www.swatchgroup.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Biel/Bienne to Geneva corridor holds effectively all mechanical movement, hairspring, and escapement capability. Nivarox is a near-monopoly on hairsprings, making it one of the tightest chokepoints in luxury manufacturing.',
      customs: { hts_code: '9102.21', duty_rate: '0-4.6% (varies by movement type)', compliance_note: 'Swiss Made ordinance requires at least 60% of manufacturing cost and technical development in Switzerland. Precious-metal cases need hallmarking and Kimberley Process documentation for any diamond content.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Responsible Jewellery Council certification is now table stakes for gold and diamond content. Swiss environmental regulation on galvanic plating baths is among the strictest anywhere.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$8.9k/Air secure courier' },
      industry_kpi: { label: 'Movement Lead', value: '26-52 Weeks (ETA/Sellita)' }
    },
    {
      id: 'h_lux_3', lat: 22.28, lng: 114.16,
      hub: 'HONG KONG / SHENZHEN', title: 'Asian Fine Jewellery & Hard Luxury Hub',
      companies: [
        { name: 'Chow Tai Fook', website: 'https://www.ctfjewellerygroup.com/', turnover: '>$1B' },
        { name: 'Luk Fook Holdings', website: 'https://www.lukfook.com/', turnover: '>$1B' },
        { name: 'Man Shing Jewellery', website: 'https://www.manshing.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Largest fine-jewellery manufacturing and trading base in Asia, with deep diamond setting, casting, and gold-chain capability. Serves both Western brands and the domestic Chinese luxury market.',
      customs: { hts_code: '7113.19', duty_rate: '5.5% MFN (US) / 0% HK entrepot', compliance_note: 'Kimberley Process certification mandatory for rough diamonds. US bans Russian-origin diamonds (including substantially transformed stones) - require G7 traceability declarations from the polisher, not just the setter.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B', sustainability_note: 'Artisanal gold sourcing is the main due-diligence gap. Require LBMA Good Delivery refiners or Fairmined-certified gold for any brand with an ESG commitment.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$7.2k/Air secure courier' },
      industry_kpi: { label: 'Gold Loss Rate', value: '<1.5% target in casting' }
    }
  ],

  // 22. COSMETICS & PERSONAL CARE FORMULATION
  cosmetics: [
    {
      id: 'h_cos_1', lat: 37.26, lng: 127.03,
      hub: 'GYEONGGI, SOUTH KOREA', title: 'K-Beauty ODM Powerhouse',
      companies: [
        { name: 'Cosmax', website: 'https://www.cosmax.com/', turnover: '>$1B' },
        { name: 'Kolmar Korea', website: 'https://www.kolmar.co.kr/', turnover: '>$1B' },
        { name: 'Cosmecca Korea', website: 'https://www.cosmecca.com/', turnover: '$100M-$1B' },
        { name: 'Yonwoo (packaging)', website: 'https://www.yonwoo.co.kr/', turnover: '$100M-$1B' }
      ],
      desc: 'The world fastest formulation-to-shelf ecosystem. Cosmax and Kolmar between them manufacture for a large share of global indie and prestige skincare brands, with 8-12 week concept-to-launch cycles.',
      customs: { hts_code: '3304.99', duty_rate: '0% (KORUS FTA)', compliance_note: 'KORUS duty-free into the US. FDA MoCRA facility registration and product listing now required for any facility shipping cosmetics to the US, including foreign ODMs. EU imports need a Responsible Person and a CPNP notification.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A-', sustainability_note: 'Korea bans animal testing for cosmetics, aligning with the EU. Microbead bans and rising demand for refillable primary packaging are reshaping component specs.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$3.4k/FEU' },
      industry_kpi: { label: 'Concept to Shelf', value: '8-12 Weeks' }
    },
    {
      id: 'h_cos_2', lat: 43.7, lng: 7.26,
      hub: 'COSMETIC VALLEY / GRASSE, FRANCE', title: 'European Prestige & Fragrance Cluster',
      companies: [
        { name: 'Givaudan', website: 'https://www.givaudan.com/', turnover: '>$1B' },
        { name: 'Firmenich (dsm-firmenich)', website: 'https://www.dsm-firmenich.com/', turnover: '>$1B' },
        { name: 'Robertet', website: 'https://www.robertet.com/', turnover: '$100M-$1B' },
        { name: 'Laboratoires Expanscience', website: 'https://www.expanscience.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Grasse and the Chartres Cosmetic Valley hold the global centre of fragrance creation plus prestige skincare formulation. Essential for anything where a Made in France claim carries pricing power.',
      customs: { hts_code: '3303.00', duty_rate: '0% MFN (US, perfumes) / 0% Intra-EU', compliance_note: 'EU Cosmetics Regulation 1223/2009: CPNP notification, an EU-based Responsible Person, and a Product Information File are mandatory. IFRA standards restrict many fragrance allergens by concentration.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'Natural extract sourcing carries Nagoya Protocol access-and-benefit-sharing obligations. Sandalwood, vetiver, and patchouli face wild-harvest sustainability constraints.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.2k/Air (flammables restricted)' },
      industry_kpi: { label: 'Fragrance Dev', value: '6-18 Months per brief' }
    },
    {
      id: 'h_cos_3', lat: 40.72, lng: -74.17,
      hub: 'NEW JERSEY, USA', title: 'North American Contract Manufacturing Base',
      companies: [
        { name: 'Kolmar Laboratories', website: 'https://www.kolmar.com/', turnover: '$100M-$1B' },
        { name: 'Mana Products', website: 'https://www.manaproducts.com/', turnover: '$100M-$1B' },
        { name: 'Ashland Specialty Ingredients', website: 'https://www.ashland.com/', turnover: '>$1B' },
        { name: 'Croda Inc.', website: 'https://www.croda.com/', turnover: '>$1B' }
      ],
      desc: 'Dense cluster of colour cosmetics and skincare contract manufacturers plus specialty-ingredient houses, all inside the US regulatory perimeter. The lowest-friction route to MoCRA compliance.',
      customs: { hts_code: '3304.99', duty_rate: '0% (Domestic)', compliance_note: 'FDA MoCRA: facility registration, product listing, safety substantiation, and adverse-event reporting. State-level bans (California AB 2771 PFAS, AB 496) increasingly drive national reformulation.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'PFAS elimination is the dominant reformulation driver for colour cosmetics. RSPO-certified palm derivatives expected by most retail buyers.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.4k/Truck' },
      industry_kpi: { label: 'MOQ Flexibility', value: '5k-25k units typical' }
    }
  ],

  // 23. COLD CHAIN & TEMPERATURE-CONTROLLED LOGISTICS
  cold_chain: [
    {
      id: 'h_cc_1', lat: 51.92, lng: 4.48,
      hub: 'ROTTERDAM / VENLO, NETHERLANDS', title: 'European Reefer & Perishables Gateway',
      companies: [
        { name: 'Kloosterboer (Lineage)', website: 'https://www.lineagelogistics.com/', turnover: '>$1B' },
        { name: 'Kuehne+Nagel Perishables', website: 'https://www.kuehne-nagel.com/', turnover: '>$1B' },
        { name: 'Thermo King Europe', website: 'https://www.thermoking.com/', turnover: '>$1B' },
        { name: 'NewCold', website: 'https://www.newcold.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Largest European entry point for reefer containers plus automated deep-freeze warehousing. Venlo and the Rotterdam Cool Port together handle most EU-bound fresh produce, seafood, and frozen protein.',
      customs: { hts_code: '8418.69', duty_rate: '0% (Intra-EU) / 2.2% MFN', compliance_note: 'EU HACCP and EC 852/2004 hygiene rules apply to every storage node. Border Control Post veterinary clearance (CHED-P) required for animal products. F-gas Regulation is phasing down high-GWP refrigerants.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'F-gas phase-down forces migration from R-404A to CO2 transcritical or ammonia systems; retrofit capex is significant but avoids future refrigerant-supply cliffs.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$5.4k/Reefer FEU' },
      industry_kpi: { label: 'Temp Excursion', value: '<0.5% of shipments' }
    },
    {
      id: 'h_cc_2', lat: 33.75, lng: -84.39,
      hub: 'ATLANTA / SOUTHEAST, USA', title: 'US Cold Storage & Pharma Distribution Core',
      companies: [
        { name: 'Americold', website: 'https://www.americold.com/', turnover: '>$1B' },
        { name: 'Lineage Logistics', website: 'https://www.lineagelogistics.com/', turnover: '>$1B' },
        { name: 'UPS Healthcare', website: 'https://www.ups.com/healthcare', turnover: '>$1B' },
        { name: 'Carrier Transicold', website: 'https://www.carrier.com/', turnover: '>$1B' }
      ],
      desc: 'Highest concentration of US refrigerated warehousing and validated GDP pharma distribution, anchored by the world busiest air hub. Best-fit for national frozen, chilled, and 2-8C pharmaceutical distribution.',
      customs: { hts_code: '8418.69', duty_rate: '0% (Domestic)', compliance_note: 'FSMA Sanitary Transportation Rule (21 CFR 1.900) governs temperature control in transit. DSCSA serialization applies to pharma nodes. USDA/FSIS registration needed for meat and poultry storage.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Cold storage is 3-5x more energy intensive per square foot than ambient. Ammonia refrigeration requires PSM compliance under OSHA 1910.119 - a common audit finding.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$2.3k/Reefer truckload' },
      industry_kpi: { label: 'GDP Validation', value: '2-8C lanes mapped annually' }
    },
    {
      id: 'h_cc_3', lat: 1.36, lng: 103.99,
      hub: 'SINGAPORE CHANGI', title: 'Asian Pharma & Perishables Air Cold Chain',
      companies: [
        { name: 'SATS Coolport', website: 'https://www.sats.com.sg/', turnover: '$100M-$1B' },
        { name: 'DHL Supply Chain Life Sciences', website: 'https://www.dhl.com/', turnover: '>$1B' },
        { name: 'Envirotainer (regional network)', website: 'https://www.envirotainer.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Premier Asian airside cold chain for clinical trial material, biologics, vaccines, and high-value perishables. IATA CEIV Pharma certified end to end, which materially reduces excursion risk on Asia-Europe lanes.',
      customs: { hts_code: '3002.20', duty_rate: '0% (Singapore FTA)', compliance_note: 'IATA CEIV Pharma certification is the practical prerequisite for biologics lanes. HSA import licences required for therapeutic products; dry ice shipments fall under IATA DGR as UN1845.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A', sustainability_note: 'Air freight dominates emissions for this lane type. Reusable active containers (Envirotainer, CSafe) beat single-use passive boxes on both cost and footprint above roughly 200 kg.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$12k+/Active container Asia-EU' },
      industry_kpi: { label: 'CEIV Pharma', value: 'Certified airport-wide' }
    }
  ],

  // 24. RENEWABLE ENERGY EQUIPMENT
  renewable_energy: [
    {
      id: 'h_ren_1', lat: 37.9, lng: 102.6,
      hub: 'JIANGSU / XINJIANG, CHINA', title: 'Global Solar PV Manufacturing Monopoly',
      companies: [
        { name: 'LONGi Green Energy', website: 'https://www.longi.com/', turnover: '>$1B' },
        { name: 'JinkoSolar', website: 'https://www.jinkosolar.com/', turnover: '>$1B' },
        { name: 'Trina Solar', website: 'https://www.trinasolar.com/', turnover: '>$1B' },
        { name: 'JA Solar', website: 'https://www.jasolar.com/', turnover: '>$1B' }
      ],
      desc: 'China holds roughly 80-95% of every step in the PV chain - polysilicon, ingot, wafer, cell, module. Cost leadership is structural and no other region can match module pricing today.',
      customs: { hts_code: '8541.43', duty_rate: 'AD/CVD + Sec 201 + UFLPA hold risk', compliance_note: 'UFLPA rebuttable presumption applies to Xinjiang polysilicon and has caused thousands of detained module shipments. AD/CVD circumvention findings cover Cambodia, Malaysia, Thailand, and Vietnam assembly. Full polysilicon-to-module traceability documentation is mandatory before shipping.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'C', sustainability_note: 'Xinjiang polysilicon carries the highest forced-labour risk in the energy transition. Coal-heavy grid gives modules a much higher embodied carbon than EU or US production.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: '$4.1k/FEU + detention risk' },
      industry_kpi: { label: 'Module Price', value: '~$0.11-0.15/W' }
    },
    {
      id: 'h_ren_2', lat: 56.16, lng: 8.62,
      hub: 'JUTLAND, DENMARK', title: 'Wind Turbine Technology Core',
      companies: [
        { name: 'Vestas Wind Systems', website: 'https://www.vestas.com/', turnover: '>$1B' },
        { name: 'Siemens Gamesa', website: 'https://www.siemensgamesa.com/', turnover: '>$1B' },
        { name: 'LM Wind Power (GE Vernova)', website: 'https://www.lmwindpower.com/', turnover: '>$1B' },
        { name: 'Bladt Industries', website: 'https://www.bladt.dk/', turnover: '$100M-$1B' }
      ],
      desc: 'Design authority and nacelle assembly for the majority of Western offshore and onshore wind capacity. Blade moulds, monopile fabrication, and installation vessel engineering cluster here.',
      customs: { hts_code: '8502.31', duty_rate: '0% (Intra-EU) / 2.5% MFN', compliance_note: 'IEC 61400 design certification through DNV or TUV is the market gate. US projects need Jones Act-compliant installation vessels for offshore, which is a genuine capacity constraint through 2027.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Blade end-of-life is the unsolved problem - thermoset epoxy composites are largely unrecyclable. Vestas and Siemens Gamesa are commercialising recyclable resin systems.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$85k+/blade set (project cargo)' },
      industry_kpi: { label: 'Blade Length', value: 'Up to 115m offshore' }
    },
    {
      id: 'h_ren_3', lat: 32.78, lng: -96.8,
      hub: 'TEXAS / SOUTHEAST USA', title: 'IRA-Backed Domestic Clean Energy Build-Out',
      companies: [
        { name: 'First Solar', website: 'https://www.firstsolar.com/', turnover: '>$1B' },
        { name: 'Qcells (Hanwha) Georgia', website: 'https://www.qcells.com/', turnover: '>$1B' },
        { name: 'GE Vernova', website: 'https://www.gevernova.com/', turnover: '>$1B' },
        { name: 'Fluence Energy', website: 'https://www.fluenceenergy.com/', turnover: '>$1B' }
      ],
      desc: 'The fastest-growing non-China PV and storage manufacturing base, driven by 45X credits. First Solar CdTe thin film is the only at-scale US module technology with no Chinese polysilicon exposure.',
      customs: { hts_code: '8541.43', duty_rate: '0% (Domestic)', compliance_note: 'IRC 45X credits: 7 cents/W module, 4 cents/W cell. The 10% domestic content ITC adder requires 40%+ US manufactured product cost, rising over time - track the Treasury safe-harbour cost tables.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'First Solar operates a genuine module take-back and recycling programme. Domestic manufacture removes UFLPA detention exposure entirely, which is worth real money in project schedule certainty.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.8k/Truck' },
      industry_kpi: { label: '45X Module Credit', value: '$0.07/W' }
    },
    {
      id: 'h_ren_4', lat: 23.02, lng: 72.57,
      hub: 'GUJARAT, INDIA', title: 'PLI-Backed Solar & Electrolyser Hub',
      companies: [
        { name: 'Adani Solar', website: 'https://www.adanisolar.com/', turnover: '>$1B' },
        { name: 'Waaree Energies', website: 'https://www.waaree.com/', turnover: '>$1B' },
        { name: 'Vikram Solar', website: 'https://www.vikramsolar.com/', turnover: '$100M-$1B' },
        { name: 'Reliance New Energy', website: 'https://www.ril.com/', turnover: '>$1B' }
      ],
      desc: 'The leading China-alternative for module and increasingly cell manufacture, backed by production-linked incentives and the ALMM approved-list regime. Also the emerging centre for green hydrogen electrolyser capacity.',
      customs: { hts_code: '8541.43', duty_rate: '0% MFN (US) - no AD/CVD order', compliance_note: 'No US AD/CVD order currently covers Indian modules, which is the key commercial advantage. India applies 40% basic customs duty on imported modules to protect domestic production. Verify wafer origin - Indian assembly of Chinese wafers still carries UFLPA questions.' },
      esg: { carbon_footprint: 'Medium-High', ethical_rating: 'B', sustainability_note: 'Coal-heavy grid keeps embodied carbon high, though below Xinjiang levels. Labour standards are materially better documented than the Chinese upstream.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.3k/FEU ex-Mundra' },
      industry_kpi: { label: 'Cell Capacity', value: 'Scaling past 25 GW' }
    }
  ],

  // 25. TELECOM & NETWORK INFRASTRUCTURE
  telecom: [
    {
      id: 'h_tel_1', lat: 60.17, lng: 24.94,
      hub: 'HELSINKI / STOCKHOLM, NORDICS', title: 'Trusted-Vendor RAN Equipment Core',
      companies: [
        { name: 'Nokia', website: 'https://www.nokia.com/', turnover: '>$1B' },
        { name: 'Ericsson', website: 'https://www.ericsson.com/', turnover: '>$1B' },
        { name: 'Telia Carrier / Arelion', website: 'https://arelion.com/', turnover: '$100M-$1B' }
      ],
      desc: 'The two Western RAN vendors that satisfy US, UK, and EU trusted-supplier rules. Essential for any operator subject to rip-and-replace mandates or national security screening on 5G infrastructure.',
      customs: { hts_code: '8517.62', duty_rate: '0% (ITA)', compliance_note: 'ITA duty-free. US Secure and Trusted Communications Networks Act bars Huawei and ZTE from FCC-funded networks. EU 5G Toolbox drives high-risk-vendor exclusion in most member states.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Nordic renewable grids plus mature product take-back schemes. Both vendors publish full scope 3 accounting, which simplifies operator ESG reporting.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.6k/Air' },
      industry_kpi: { label: 'Trusted Vendor', value: 'US/UK/EU approved' }
    },
    {
      id: 'h_tel_2', lat: 24.15, lng: 120.67,
      hub: 'TAIWAN (TAICHUNG / TAIPEI)', title: 'Networking Hardware & ODM Base',
      companies: [
        { name: 'Accton Technology', website: 'https://www.accton.com/', turnover: '>$1B' },
        { name: 'Quanta Cloud Technology', website: 'https://www.qct.io/', turnover: '>$1B' },
        { name: 'Delta Electronics', website: 'https://www.deltaww.com/', turnover: '>$1B' },
        { name: 'Wistron NeWeb', website: 'https://www.wnc.com.tw/', turnover: '$100M-$1B' }
      ],
      desc: 'Builds most of the world white-box switches, routers, and hyperscale networking gear. The default ODM route for open-networking and disaggregated RAN hardware programmes.',
      customs: { hts_code: '8517.62', duty_rate: '0% (ITA)', compliance_note: 'ITA duty-free. Final assembly is frequently moved to Vietnam or Mexico for Section 301 mitigation - confirm substantial transformation actually occurs, as CBP has challenged screwdriver assembly claims.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'RBA (Responsible Business Alliance) audits are standard across this tier. Taiwan grid decarbonisation is slow, keeping scope 2 higher than Nordic equivalents.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.5k/Air' },
      industry_kpi: { label: 'White-box Share', value: 'Majority of hyperscale switching' }
    },
    {
      id: 'h_tel_3', lat: 35.06, lng: 136.0,
      hub: 'JAPAN / KOREA OPTICAL BELT', title: 'Optical Fibre & Photonics Supply',
      companies: [
        { name: 'Sumitomo Electric', website: 'https://sumitomoelectric.com/', turnover: '>$1B' },
        { name: 'Fujikura', website: 'https://www.fujikura.co.jp/', turnover: '>$1B' },
        { name: 'Furukawa Electric / OFS', website: 'https://www.furukawa.co.jp/', turnover: '>$1B' },
        { name: 'Corning Optical (regional)', website: 'https://www.corning.com/', turnover: '>$1B' }
      ],
      desc: 'Core supply of single-mode fibre, submarine cable, fusion splicers, and optical transceivers. Preform capacity is the hard constraint - it cannot be expanded quickly when data-centre demand spikes.',
      customs: { hts_code: '8544.70', duty_rate: '0% (CPTPP) / 6.7% MFN', compliance_note: 'US AD/CVD orders exist on some Chinese optical fibre - Japanese and Korean origin avoids that exposure. Submarine cable projects require landing permits and increasingly face national security review.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Preform drawing is energy intensive. Helium supply for fibre draw is a recurring constraint tied to global helium shortages.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$3.8k/FEU' },
      industry_kpi: { label: 'Fibre Lead Time', value: '20-40 Weeks in tight cycles' }
    }
  ],

  // 26. FURNITURE & INTERIOR FITTINGS
  furniture: [
    {
      id: 'h_fur_1', lat: 22.82, lng: 108.32,
      hub: 'GUANGDONG / GUANGXI, CHINA', title: 'Global Volume Furniture Manufacturing',
      companies: [
        { name: 'Man Wah Holdings', website: 'https://www.manwahholdings.com/', turnover: '>$1B' },
        { name: 'Kuka Home', website: 'https://www.kukahome.com/', turnover: '>$1B' },
        { name: 'Markor International', website: 'https://www.markor.com/', turnover: '$100M-$1B' },
        { name: 'Oppein Home Group', website: 'https://www.oppein.com/', turnover: '>$1B' }
      ],
      desc: 'Foshan and Shunde remain the largest furniture manufacturing concentration worldwide, covering upholstery, case goods, and kitchen cabinetry at any volume. Heavily exposed to US trade remedies.',
      customs: { hts_code: '9403.60', duty_rate: '0% MFN + 25% Sec 301 + AD/CVD', compliance_note: 'Active US AD/CVD orders on wooden bedroom furniture, wooden cabinets and vanities, and upholstered seating from China, with rates that can exceed 250%. Lacey Act declarations required on all wood species. CARB/TSCA Title VI formaldehyde certification mandatory for composite wood.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B', sustainability_note: 'Illegal timber risk in tropical hardwood inputs. Require FSC or PEFC chain of custody plus species-and-origin declarations for Lacey Act compliance.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.6k/FEU (low density, cubes out)' },
      industry_kpi: { label: 'Container Fill', value: 'Cubes out before weight' }
    },
    {
      id: 'h_fur_2', lat: 21.03, lng: 105.85,
      hub: 'VIETNAM (BINH DUONG / HANOI)', title: 'Primary China+1 Furniture Alternative',
      companies: [
        { name: 'Truong Thanh Furniture', website: 'https://truongthanh.com/', turnover: '$100M-$1B' },
        { name: 'AA Corporation', website: 'https://www.aacorporation.com/', turnover: '$100M-$1B' },
        { name: 'Phu Tai Group', website: 'https://phutai.com.vn/', turnover: '$100M-$1B' }
      ],
      desc: 'Now the largest furniture exporter to the US. Strong in solid wood, outdoor furniture, and hospitality fit-out. The default relocation destination for buyers exiting Chinese AD/CVD exposure.',
      customs: { hts_code: '9403.60', duty_rate: '0% MFN (US)', compliance_note: 'No blanket AD/CVD on Vietnamese furniture, but Commerce has run circumvention inquiries where Chinese components are merely assembled in Vietnam - keep bills of materials showing genuine Vietnamese transformation. Lacey Act and EUDR both apply to timber origin.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'EUDR compliance from 2025 requires plot-level geolocation for timber entering the EU. Vietnamese acacia and rubberwood plantations are generally well documented; imported Laotian and Cambodian logs are not.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$4.2k/FEU ex-Cat Lai' },
      industry_kpi: { label: 'US Import Rank', value: '#1 furniture exporter to US' }
    },
    {
      id: 'h_fur_3', lat: 45.64, lng: 12.25,
      hub: 'NORTHEAST ITALY / POLAND', title: 'European Design & Contract Furniture',
      companies: [
        { name: 'Molteni&C', website: 'https://www.molteni.it/', turnover: '$100M-$1B' },
        { name: 'Poltrona Frau Group', website: 'https://www.poltronafrau.com/', turnover: '$100M-$1B' },
        { name: 'Nowy Styl', website: 'https://nowystyl.com/', turnover: '$100M-$1B' },
        { name: 'Fameg', website: 'https://www.fameg.pl/', turnover: '$10M-$100M' }
      ],
      desc: 'Italy leads design-led residential and contract furniture; Poland is Europe volume workhorse for office and flat-pack. Together they cover speed-to-market for EU projects that cannot wait on Asian sea freight.',
      customs: { hts_code: '9401.61', duty_rate: '0% (Intra-EU) / 0% MFN to US', compliance_note: 'EN 1335 (office chairs) and BS 5852 / CAL TB 117-2013 flammability standards govern contract seating. EUTR/EUDR timber due diligence applies to all wood inputs.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'Strong FSC penetration and low-VOC finish requirements. EU Ecodesign for furniture is under development and will add repairability and recycled-content criteria.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$1.9k/Truck intra-EU' },
      industry_kpi: { label: 'Lead Time', value: '4-8 Weeks vs 12+ from Asia' }
    }
  ],

  // 27. SPORTS & OUTDOOR EQUIPMENT
  sports_outdoor: [
    {
      id: 'h_spo_1', lat: 10.82, lng: 106.63,
      hub: 'VIETNAM (BINH DUONG / DONG NAI)', title: 'Global Athletic Footwear & Apparel Base',
      companies: [
        { name: 'Pou Chen Group', website: 'https://www.pouchen.com/', turnover: '>$1B' },
        { name: 'Feng Tay Enterprises', website: 'https://www.fengtay.com/', turnover: '>$1B' },
        { name: 'Changshin Vietnam', website: 'https://www.changshin.co.kr/', turnover: '$100M-$1B' },
        { name: 'Eclat Textile Vietnam', website: 'https://www.eclat.com.tw/', turnover: '$100M-$1B' }
      ],
      desc: 'Manufactures a large share of world athletic footwear for Nike, adidas, and Under Armour. Deep capability in injection-phylon midsoles, knit uppers, and performance apparel.',
      customs: { hts_code: '6404.11', duty_rate: '20% MFN (US athletic footwear)', compliance_note: 'Footwear carries some of the highest surviving US MFN duties - correct HTS classification by upper material and sole construction is worth several points of margin. First-sale valuation is commonly used here to reduce dutiable value.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Solvent-based cementing is being displaced by water-based adhesives on brand mandate. Factory audits under FLA and the brands own codes are routine; wage-and-hours findings are the most common issue.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.9k/FEU' },
      industry_kpi: { label: 'Dev Cycle', value: '12-18 Months concept to retail' }
    },
    {
      id: 'h_spo_2', lat: 24.15, lng: 120.68,
      hub: 'TAICHUNG, TAIWAN', title: 'High-End Bicycle & Composite Sports Hub',
      companies: [
        { name: 'Giant Manufacturing', website: 'https://www.giant-bicycles.com/', turnover: '>$1B' },
        { name: 'Merida Industry', website: 'https://www.merida.com/', turnover: '>$1B' },
        { name: 'Shimano Taiwan', website: 'https://www.shimano.com/', turnover: '>$1B' },
        { name: 'Topkey Corporation', website: 'https://www.topkey.com.tw/', turnover: '$100M-$1B' }
      ],
      desc: 'The world reference for carbon-fibre bicycle frames, wheels, and premium sporting composites. Drivetrain supply is dominated by Shimano, creating a genuine single-source dependency across the whole industry.',
      customs: { hts_code: '8712.00', duty_rate: '5.5-11% MFN (US bicycles)', compliance_note: 'E-bikes classify under 8711.60 with different duty treatment and require UN38.3 plus UL 2849 for the battery system. CPSC 16 CFR 1512 applies to bicycles sold in the US.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Carbon-fibre layup is labour-intensive with significant prepreg scrap and no viable recycling path. Frame repair and reuse programmes are the current best mitigation.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.4k/FEU' },
      industry_kpi: { label: 'Drivetrain Lead', value: 'Shimano 40-100 weeks in peak' }
    },
    {
      id: 'h_spo_3', lat: 47.26, lng: 11.4,
      hub: 'ALPINE EUROPE (AT / IT / DE)', title: 'Snow, Climbing & Technical Outdoor Cluster',
      companies: [
        { name: 'Atomic Austria (Amer Sports)', website: 'https://www.atomic.com/', turnover: '$100M-$1B' },
        { name: 'Fischer Sports', website: 'https://www.fischersports.com/', turnover: '$100M-$1B' },
        { name: 'Salewa / Oberalp Group', website: 'https://www.oberalp.com/', turnover: '$100M-$1B' },
        { name: 'Edelrid', website: 'https://www.edelrid.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Centre for skis, bindings, mountaineering hardware, and PPE-certified climbing equipment. Life-safety certification is the barrier to entry, not cost.',
      customs: { hts_code: '9506.11', duty_rate: '0% (Intra-EU) / 2.6% MFN to US', compliance_note: 'Climbing and fall-arrest equipment is PPE Category III under EU Regulation 2016/425 - it requires notified-body type examination plus ongoing production surveillance. Ski bindings need ISO 11088 / DIN certification.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'PFAS-free DWR treatments are now effectively mandatory for the EU outdoor market. Bluesign and OEKO-TEX certification are standard buyer requirements.' },
      logistics: { port_wait_days: 1, freight_cost_estimate: '$2.1k/Truck intra-EU' },
      industry_kpi: { label: 'PPE Cert', value: 'EU 2016/425 Cat III' }
    }
  ],

  // 28. TOYS & GAMES
  toys_games: [
    {
      id: 'h_toy_1', lat: 23.02, lng: 113.75,
      hub: 'DONGGUAN / SHANTOU, CHINA', title: 'World Toy Manufacturing Centre',
      companies: [
        { name: 'Dongguan Yongtai (Mattel supplier)', website: 'https://www.mattel.com/', turnover: '$100M-$1B' },
        { name: 'Wah Shing Toys', website: 'https://www.wahshingtoys.com/', turnover: '$10M-$100M' },
        { name: 'Alpha Group', website: 'https://www.auldeytoys.com/', turnover: '$100M-$1B' },
        { name: 'Early Light International', website: 'https://www.earlylight.com/', turnover: '>$1B' }
      ],
      desc: 'Produces the large majority of world toys. Chenghai district in Shantou alone covers a huge share of plastic toy output. Tooling, decoration, and electronics integration all available in one cluster.',
      customs: { hts_code: '9503.00', duty_rate: '0% MFN + Sec 301 exposure', compliance_note: 'Toys are largely MFN duty-free but exposed to Section 301. CPSIA testing by a CPSC-accepted lab is mandatory: lead content, phthalates, ASTM F963 mechanical and flammability. EU requires EN 71 parts 1-3 plus CE marking and a Declaration of Conformity.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B', sustainability_note: 'ICTI Ethical Toy Program certification is the industry audit standard and is expected by every major brand. Seasonal overtime peaks before Q4 are the most common audit failure.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.3k/FEU (cubes out)' },
      industry_kpi: { label: 'Tooling Lead', value: '10-16 Weeks + 4 weeks testing' }
    },
    {
      id: 'h_toy_2', lat: 55.68, lng: 9.12,
      hub: 'BILLUND, DENMARK / HUNGARY', title: 'European Premium Toy Production',
      companies: [
        { name: 'LEGO Group', website: 'https://www.lego.com/', turnover: '>$1B' },
        { name: 'Playmobil (Brandstaetter)', website: 'https://www.playmobil.com/', turnover: '$100M-$1B' },
        { name: 'Ravensburger', website: 'https://www.ravensburger.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Vertically integrated, highly automated European moulding for premium brands. Nyiregyhaza in Hungary and Kladno in Czechia provide lower-cost EU capacity within the customs union.',
      customs: { hts_code: '9503.00', duty_rate: '0% (Intra-EU) / 0% MFN to US', compliance_note: 'EN 71 and the EU Toy Safety Directive 2009/48/EC apply, with the directive being revised into a regulation that adds a digital product passport. REACH restricts specific plasticisers and heavy metals in toy materials.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'LEGO is pursuing bio-based and recycled polymer feedstock with published targets. EU packaging rules push toward plastic-free retail packs.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.2k/Truck intra-EU' },
      industry_kpi: { label: 'Mould Tolerance', value: '±0.005 mm (LEGO standard)' }
    },
    {
      id: 'h_toy_3', lat: 22.4, lng: 114.1,
      hub: 'HONG KONG (DESIGN & TRADING)', title: 'Toy Sourcing, Licensing & QA Hub',
      companies: [
        { name: 'VTech Holdings', website: 'https://www.vtech.com/', turnover: '>$1B' },
        { name: 'Herotoys / trading houses', website: 'https://www.hktdc.com/', turnover: '$10M-$100M' },
        { name: 'Intertek Hong Kong (testing)', website: 'https://www.intertek.com/', turnover: '>$1B' }
      ],
      desc: 'Commercial and QA layer above the Guangdong factories: licensing management, product safety testing, and pre-shipment inspection. VTech is the dominant electronic learning-toy manufacturer.',
      customs: { hts_code: '9503.00', duty_rate: '0% MFN (HK origin)', compliance_note: 'Hong Kong origin does not shield goods physically manufactured in mainland China from Section 301 - CBP looks at the country of manufacture, not the invoicing entity. Get a binding ruling if origin is genuinely mixed.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A-', sustainability_note: 'HK-based QA houses provide the practical mechanism for enforcing ICTI and chemical-compliance requirements on mainland subcontractors.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.0k/FEU' },
      industry_kpi: { label: 'AQL Standard', value: 'ANSI/ASQ Z1.4 Level II' }
    }
  ],

  // 29. PET & ANIMAL PRODUCTS
  pet_animal: [
    {
      id: 'h_pet_1', lat: 38.63, lng: -90.2,
      hub: 'US MIDWEST (MO / KS / IA)', title: 'North American Pet Food Manufacturing Core',
      companies: [
        { name: 'Nestle Purina PetCare', website: 'https://www.purina.com/', turnover: '>$1B' },
        { name: 'Hill\'s Pet Nutrition', website: 'https://www.hillspet.com/', turnover: '>$1B' },
        { name: 'Simmons Pet Food', website: 'https://www.simmonspetfood.com/', turnover: '>$1B' },
        { name: 'C.J. Foods', website: 'https://www.cjfoodsinc.com/', turnover: '$100M-$1B' }
      ],
      desc: 'The global centre of extruded dry pet food and wet-canning capacity, co-located with grain, rendering, and protein supply. Contract manufacturing capacity here is the constraint, not raw material.',
      customs: { hts_code: '2309.10', duty_rate: '0% (Domestic) / 0% MFN', compliance_note: 'FDA FSMA Preventive Controls for Animal Food (21 CFR 507) applies to all facilities. AAFCO nutrient profiles and state feed registrations govern label claims; every state requires separate registration.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Rendered animal by-products carry traceability and species-verification requirements. Insect-protein and alternative-protein formulations are moving from novelty to shelf.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.6k/Truckload' },
      industry_kpi: { label: 'Co-man Capacity', value: 'Persistently tight since 2021' }
    },
    {
      id: 'h_pet_2', lat: 13.75, lng: 100.5,
      hub: 'THAILAND (BANGKOK / SAMUT SAKHON)', title: 'Global Wet Pet Food & Pouch Hub',
      companies: [
        { name: 'Thai Union Group', website: 'https://www.thaiunion.com/', turnover: '>$1B' },
        { name: 'Charoen Pokphand Foods', website: 'https://www.cpfworldwide.com/', turnover: '>$1B' },
        { name: 'Asian Alliance International', website: 'https://www.aai.co.th/', turnover: '$100M-$1B' }
      ],
      desc: 'Dominant source of wet cat and dog food in pouches and cans, built on the tuna-processing base. Cost and quality leader for premium wet formats sold in the US and EU.',
      customs: { hts_code: '2309.10', duty_rate: '0% MFN (US)', compliance_note: 'FDA prior notice and facility registration required for US import. EU requires an approved third-country establishment listing under Regulation 1069/2009 for animal by-products plus a veterinary health certificate per consignment.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B', sustainability_note: 'Forced labour in the Thai fishing fleet has been the subject of CBP withhold-release orders. Require MSC or equivalent chain of custody and vessel-level labour verification, not just processor audits.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: '$3.7k/FEU ex-Laem Chabang' },
      industry_kpi: { label: 'Pouch Capacity', value: 'Largest globally' }
    },
    {
      id: 'h_pet_3', lat: 52.09, lng: 5.12,
      hub: 'NETHERLANDS / DENMARK', title: 'European Animal Health & Feed Additives',
      companies: [
        { name: 'Trouw Nutrition (Nutreco)', website: 'https://www.trouwnutrition.com/', turnover: '>$1B' },
        { name: 'dsm-firmenich Animal Nutrition', website: 'https://www.dsm-firmenich.com/', turnover: '>$1B' },
        { name: 'Chr. Hansen Animal Health', website: 'https://www.chr-hansen.com/', turnover: '>$1B' },
        { name: 'MSD Animal Health Boxmeer', website: 'https://www.msd-animal-health.com/', turnover: '>$1B' }
      ],
      desc: 'Concentration of veterinary vaccines, feed additives, probiotics, and enzyme technology. The regulatory reference point for antibiotic-free animal production.',
      customs: { hts_code: '2309.90', duty_rate: '0% (Intra-EU) / 1.4% MFN', compliance_note: 'EU Regulation 2019/6 bans routine prophylactic antibiotic use in feed and restricts imports of animal products raised with growth-promoting antimicrobials. Feed additive authorisation under Regulation 1831/2003 takes years - do not assume substitutability.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'Methane-reducing feed additives (3-NOP) are a genuine scope 3 lever for dairy supply chains. Soy-free formulation demand is rising with EUDR.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.6k/FEU' },
      industry_kpi: { label: 'Additive Approval', value: '3-5 Years EU authorisation' }
    }
  ],

  // 30. PRINTING, PUBLISHING & MEDIA PRODUCTION
  printing_media: [
    {
      id: 'h_pri_1', lat: 22.54, lng: 114.06,
      hub: 'SHENZHEN / DONGGUAN, CHINA', title: 'Global Book & Premium Print Hub',
      companies: [
        { name: 'C&C Offset Printing', website: 'https://www.candcoffset.com/', turnover: '$100M-$1B' },
        { name: 'Toppan Leefung', website: 'https://www.toppanleefung.com/', turnover: '$100M-$1B' },
        { name: 'Shenzhen Artron Art Group', website: 'https://www.artron.com.cn/', turnover: '$100M-$1B' }
      ],
      desc: 'The world source for illustrated books, board books, cased-in hardcovers, and complex paper engineering. Nothing in North America or Europe matches the cost or craft on four-colour children and art books.',
      customs: { hts_code: '4901.99', duty_rate: '0% MFN (books duty-free)', compliance_note: 'Printed books are duty-free under HTS 4901 and were largely excluded from Section 301 - but children books with toy components can reclassify into Chapter 95 and pull in CPSIA testing. Check the classification of any book-plus-object format.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'FSC-certified paper is standard for Western publishers. Soy and vegetable-based inks are widely available and often specified by default.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$4.8k/FEU (heavy, weights out)' },
      industry_kpi: { label: 'Print Lead', value: '10-14 Weeks incl. sea freight' }
    },
    {
      id: 'h_pri_2', lat: 51.34, lng: 12.37,
      hub: 'GERMANY (HEIDELBERG / LEIPZIG)', title: 'Press Technology & European Print',
      companies: [
        { name: 'Heidelberger Druckmaschinen', website: 'https://www.heidelberg.com/', turnover: '>$1B' },
        { name: 'Koenig & Bauer', website: 'https://www.koenig-bauer.com/', turnover: '>$1B' },
        { name: 'Bertelsmann Printing Group', website: 'https://www.bertelsmann-printing-group.com/', turnover: '>$1B' },
        { name: 'Flint Group (inks)', website: 'https://www.flintgrp.com/', turnover: '>$1B' }
      ],
      desc: 'Supplies the press equipment the entire industry runs on, plus high-quality European print capacity for short lead times. Koenig & Bauer is also the dominant banknote-press supplier worldwide.',
      customs: { hts_code: '8443.13', duty_rate: '0% (Intra-EU) / 0-2.2% MFN', compliance_note: 'CE machinery directive applies to presses. Security-printing equipment is subject to national export controls and end-user verification - expect long approval cycles for banknote and passport lines.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'EU pushes low-migration inks for food packaging and mineral-oil-free formulations. Energy cost is the dominant operating variable for European printers post-2022.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.4k/Truck intra-EU' },
      industry_kpi: { label: 'Press Lead Time', value: '9-15 Months new equipment' }
    },
    {
      id: 'h_pri_3', lat: 41.88, lng: -87.63,
      hub: 'US MIDWEST (CHICAGO / OHIO)', title: 'North American Commercial & Label Print',
      companies: [
        { name: 'RR Donnelley', website: 'https://www.rrd.com/', turnover: '>$1B' },
        { name: 'Quad/Graphics', website: 'https://www.quad.com/', turnover: '>$1B' },
        { name: 'Lakeside Book Company', website: 'https://www.lakesidebook.com/', turnover: '$100M-$1B' },
        { name: 'Multi-Color Corporation', website: 'https://www.mcclabel.com/', turnover: '>$1B' }
      ],
      desc: 'Domestic capacity for direct mail, catalogues, mono book printing, and pressure-sensitive labels. The right choice when speed to market or reprint responsiveness outweighs unit cost.',
      customs: { hts_code: '4911.10', duty_rate: '0% (Domestic)', compliance_note: 'No tariff exposure. FTC Green Guides constrain recyclability and recycled-content claims on printed packaging. FDA 21 CFR 175 applies to inks in food-contact applications.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Structural print-volume decline has left consolidated but efficient capacity. SFI and FSC certified stock widely available domestically.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.3k/Truckload' },
      industry_kpi: { label: 'Reprint Speed', value: '2-4 Weeks domestic' }
    }
  ],

  // 31. HVAC & BUILDING SYSTEMS
  hvac: [
    {
      id: 'h_hvac_1', lat: 34.69, lng: 135.5,
      hub: 'OSAKA, JAPAN', title: 'Global HVAC Technology Leader',
      companies: [
        { name: 'Daikin Industries', website: 'https://www.daikin.com/', turnover: '>$1B' },
        { name: 'Mitsubishi Electric', website: 'https://www.mitsubishielectric.com/', turnover: '>$1B' },
        { name: 'Panasonic Air Conditioning', website: 'https://www.panasonic.com/', turnover: '>$1B' },
        { name: 'Fujitsu General', website: 'https://www.fujitsu-general.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Daikin is the largest air-conditioning company worldwide and holds the key inverter and refrigerant patents. Japan leads on VRF systems, heat pumps, and low-GWP refrigerant transition.',
      customs: { hts_code: '8415.10', duty_rate: '0% (CPTPP) / 1-2.2% MFN', compliance_note: 'US EPA SNAP and the AIM Act phase down HFCs on a fixed schedule; R-410A equipment is being displaced by R-32 and R-454B. New refrigerants classified A2L (mildly flammable) require updated UL 60335-2-40 certification and installer training.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Refrigerant GWP is the dominant lifecycle issue - R-32 cuts GWP roughly 68% versus R-410A. Daikin has opened key R-32 patents to accelerate industry transition.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.1k/FEU' },
      industry_kpi: { label: 'Refrigerant Shift', value: 'R-410A to R-32 / R-454B' }
    },
    {
      id: 'h_hvac_2', lat: 32.78, lng: -96.8,
      hub: 'TEXAS / SOUTHEAST USA', title: 'North American HVAC Manufacturing Base',
      companies: [
        { name: 'Trane Technologies', website: 'https://www.tranetechnologies.com/', turnover: '>$1B' },
        { name: 'Carrier Global', website: 'https://www.carrier.com/', turnover: '>$1B' },
        { name: 'Lennox International', website: 'https://www.lennox.com/', turnover: '>$1B' },
        { name: 'Goodman (Daikin Texas Technology Park)', website: 'https://www.goodmanmfg.com/', turnover: '>$1B' }
      ],
      desc: 'Domestic residential and light-commercial unitary equipment manufacture. Buy American and IRA 25C/25D incentives make US-built heat pumps commercially advantaged for retrofit programmes.',
      customs: { hts_code: '8415.10', duty_rate: '0% (Domestic)', compliance_note: 'DOE minimum efficiency standards changed in 2023 to SEER2/HSPF2 with regional variation across North, Southeast, and Southwest. IRA 25C gives up to $2,000 for qualifying heat pumps - equipment must appear on the CEE qualifying list.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Heat-pump electrification is the primary building decarbonisation lever. Cold-climate heat pump performance at -15C is now the key product differentiator.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.7k/Truck' },
      industry_kpi: { label: 'Efficiency Std', value: 'SEER2 / HSPF2 (2023+)' }
    },
    {
      id: 'h_hvac_3', lat: 31.23, lng: 121.47,
      hub: 'YANGTZE DELTA, CHINA', title: 'Volume HVAC Components & Compressors',
      companies: [
        { name: 'Gree Electric Appliances', website: 'https://www.gree.com/', turnover: '>$1B' },
        { name: 'Midea Group', website: 'https://www.midea.com/', turnover: '>$1B' },
        { name: 'GMCC (Meizhi Compressor)', website: 'https://www.gmcc.com/', turnover: '>$1B' },
        { name: 'Sanhua Intelligent Controls', website: 'https://www.sanhuagroup.com/', turnover: '>$1B' }
      ],
      desc: 'Supplies most of the world rotary and scroll compressors, heat exchanger coils, and expansion valves - including to Western brands. The upstream dependency persists even when final assembly is Western.',
      customs: { hts_code: '8414.30', duty_rate: '0-2.5% MFN + 25% Sec 301', compliance_note: 'Section 301 applies to compressors and most HVAC subassemblies. AHRI certification and UL/ETL listing are required for US market entry regardless of origin - verify the listing covers the exact model, not a similar SKU.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B', sustainability_note: 'Copper and aluminium intensity is high; coil material substitution to all-aluminium is common and affects field serviceability. Verify refrigerant charge and leak-test records.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.9k/FEU' },
      industry_kpi: { label: 'Compressor Share', value: 'Majority of world output' }
    }
  ],

  // 32. WATER TREATMENT & FLUID PURIFICATION
  water_treatment: [
    {
      id: 'h_wat_1', lat: 33.13, lng: -117.16,
      hub: 'CALIFORNIA / US SOUTHWEST', title: 'Membrane & Desalination Technology Base',
      companies: [
        { name: 'DuPont Water Solutions (FilmTec)', website: 'https://www.dupont.com/water.html', turnover: '>$1B' },
        { name: 'Hydranautics (Nitto)', website: 'https://membranes.com/', turnover: '$100M-$1B' },
        { name: 'Energy Recovery Inc.', website: 'https://www.energyrecovery.com/', turnover: '$100M-$1B' },
        { name: 'Xylem Inc.', website: 'https://www.xylem.com/', turnover: '>$1B' }
      ],
      desc: 'Core supply of reverse-osmosis membrane elements and energy-recovery devices for seawater desalination. Long-term water scarcity in the Southwest is driving both demand and local capability.',
      customs: { hts_code: '8421.21', duty_rate: '0% (Domestic) / 0% MFN', compliance_note: 'NSF/ANSI 61 and 372 certification required for drinking-water contact materials. EPA lead-free requirements apply to all wetted components. AWWA standards govern municipal specifications.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Brine discharge management is the main permitting obstacle for desalination projects. Energy-recovery devices cut SWRO specific energy by roughly 60% and are effectively standard now.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.9k/Truck' },
      industry_kpi: { label: 'SWRO Energy', value: '~3.0-4.0 kWh/m3' }
    },
    {
      id: 'h_wat_2', lat: 32.08, lng: 34.78,
      hub: 'ISRAEL (TEL AVIV / ASHKELON)', title: 'Desalination & Smart Water Engineering',
      companies: [
        { name: 'IDE Technologies', website: 'https://www.ide-tech.com/', turnover: '$100M-$1B' },
        { name: 'Netafim', website: 'https://www.netafim.com/', turnover: '>$1B' },
        { name: 'Amiad Water Systems', website: 'https://amiad.com/', turnover: '$100M-$1B' },
        { name: 'TaKaDu', website: 'https://takadu.com/', turnover: '$10M-$100M' }
      ],
      desc: 'World reference for large-scale SWRO plant delivery, precision irrigation, and non-revenue-water analytics. Israel recycles a very high share of its wastewater, which is the operating proof point.',
      customs: { hts_code: '8421.21', duty_rate: '0% (US-Israel FTA)', compliance_note: 'US-Israel FTA duty-free. Water infrastructure projects in many markets require local partner structures and face national-security review for SCADA and control-system content.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A-', sustainability_note: 'Treated-effluent reuse for agriculture is the highest-leverage water strategy globally. Regional political risk affects delivery timelines on export projects.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$3.2k/FEU ex-Haifa' },
      industry_kpi: { label: 'Wastewater Reuse', value: '~85-90% nationally' }
    },
    {
      id: 'h_wat_3', lat: 51.52, lng: 7.47,
      hub: 'GERMANY / NORDICS', title: 'European Municipal Water & Process Filtration',
      companies: [
        { name: 'Veolia Water Technologies', website: 'https://www.veoliawatertechnologies.com/', turnover: '>$1B' },
        { name: 'Grundfos', website: 'https://www.grundfos.com/', turnover: '>$1B' },
        { name: 'Wilo SE', website: 'https://wilo.com/', turnover: '>$1B' },
        { name: 'Alfa Laval', website: 'https://www.alfalaval.com/', turnover: '>$1B' }
      ],
      desc: 'Municipal treatment plant technology, high-efficiency pumps, and process filtration for pharma and food. EU regulation is the strictest globally and drives the technology roadmap.',
      customs: { hts_code: '8413.70', duty_rate: '0% (Intra-EU) / 0-2.5% MFN', compliance_note: 'EU Drinking Water Directive 2020/2184 sets material and PFAS limits. The recast Urban Wastewater Treatment Directive adds quaternary treatment for micropollutants and extended producer responsibility for pharma and cosmetics - a major new capex driver.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Ecodesign minimum efficiency (MEI) requirements on water pumps are the strictest anywhere. PFAS removal is the fastest-growing treatment segment in Europe.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.5k/FEU' },
      industry_kpi: { label: 'UWWTD Upgrade', value: 'Quaternary treatment by 2045' }
    }
  ],

  // 33. DEFENCE & MILITARY SYSTEMS
  defense_military: [
    {
      id: 'h_def_1', lat: 38.88, lng: -77.1,
      hub: 'WASHINGTON DC / VIRGINIA CORRIDOR', title: 'US Prime Contractor Base',
      companies: [
        { name: 'Lockheed Martin', website: 'https://www.lockheedmartin.com/', turnover: '>$1B' },
        { name: 'RTX (Raytheon)', website: 'https://www.rtx.com/', turnover: '>$1B' },
        { name: 'Northrop Grumman', website: 'https://www.northropgrumman.com/', turnover: '>$1B' },
        { name: 'General Dynamics', website: 'https://www.gd.com/', turnover: '>$1B' },
        { name: 'BAE Systems Inc.', website: 'https://www.baesystems.com/', turnover: '>$1B' }
      ],
      desc: 'Programme management and systems integration centre for US defence procurement. Any supplier entering this chain inherits ITAR, DFARS, and CMMC obligations that dwarf normal commercial compliance.',
      customs: { hts_code: '9301.90', duty_rate: 'N/A - licence-controlled', compliance_note: 'ITAR (22 CFR 120-130) registration with DDTC required for anyone manufacturing USML items, even without exporting. DFARS 252.225-7014 specialty metals clause restricts steel, titanium, and tungsten origin. CMMC Level 2 certification is now a contract-award gate for CUI handling.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'ESG-screened investors increasingly exclude the sector, affecting supplier financing costs. PFAS in AFFF firefighting foam is a large legacy remediation liability.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$2.8k/Ground (secure transport)' },
      industry_kpi: { label: 'Compliance Gate', value: 'ITAR + DFARS + CMMC L2' }
    },
    {
      id: 'h_def_2', lat: 51.45, lng: -2.59,
      hub: 'UK (BRISTOL / BARROW)', title: 'European Defence Engineering Cluster',
      companies: [
        { name: 'BAE Systems', website: 'https://www.baesystems.com/', turnover: '>$1B' },
        { name: 'Babcock International', website: 'https://www.babcockinternational.com/', turnover: '>$1B' },
        { name: 'Leonardo UK', website: 'https://uk.leonardo.com/', turnover: '>$1B' },
        { name: 'Thales UK', website: 'https://www.thalesgroup.com/', turnover: '>$1B' }
      ],
      desc: 'Submarine construction, combat aircraft, and naval systems engineering. Central to AUKUS Pillar 1 and GCAP, which are reshaping allied defence industrial flows.',
      customs: { hts_code: '8906.10', duty_rate: 'N/A - licence-controlled', compliance_note: 'UK Export Control Act licensing via ECJU. AUKUS licence-free environment (from 2024) removes most ITAR barriers between US, UK, and Australia for eligible entities - but only for listed, enrolled companies. Verify enrolment before assuming exemption.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Skilled-labour shortage in nuclear-qualified welding and systems engineering is the binding constraint on UK naval throughput, not materials.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.4k/Sea (controlled cargo)' },
      industry_kpi: { label: 'AUKUS Status', value: 'Licence-free for enrolled entities' }
    },
    {
      id: 'h_def_3', lat: 37.57, lng: 126.98,
      hub: 'SOUTH KOREA (CHANGWON / SEOUL)', title: 'Fast-Delivery Land Systems & Munitions',
      companies: [
        { name: 'Hanwha Aerospace', website: 'https://www.hanwhaaerospace.com/', turnover: '>$1B' },
        { name: 'Hyundai Rotem', website: 'https://www.hyundai-rotem.co.kr/', turnover: '>$1B' },
        { name: 'LIG Nex1', website: 'https://www.lignex1.com/', turnover: '>$1B' },
        { name: 'Poongsan Corporation', website: 'https://www.poongsan.co.kr/', turnover: '$100M-$1B' }
      ],
      desc: 'Emerged as the fastest-delivering allied source for artillery, armour, and ammunition. Poland major orders demonstrated delivery timelines that Western European primes could not match.',
      customs: { hts_code: '9306.30', duty_rate: 'N/A - licence-controlled', compliance_note: 'Korean DTCC export approval required. US-origin content in Korean systems still triggers ITAR re-export licensing - map the US content percentage early, as it is the usual cause of late-stage deal collapse.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B+', sustainability_note: 'Energetic materials manufacture carries significant site safety and environmental burden. Korean producers hold large standing capacity, which is unusual post-Cold-War.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$5.2k/Sea (Class 1 explosives)' },
      industry_kpi: { label: 'Delivery Speed', value: 'Months vs years for peers' }
    }
  ],

  // 34. MARITIME & SHIPBUILDING
  maritime: [
    {
      id: 'h_mar_1', lat: 35.54, lng: 129.31,
      hub: 'ULSAN / GEOJE, SOUTH KOREA', title: 'High-Value Shipbuilding Core',
      companies: [
        { name: 'HD Hyundai Heavy Industries', website: 'https://www.hd.com/', turnover: '>$1B' },
        { name: 'Hanwha Ocean', website: 'https://www.hanwhaocean.com/', turnover: '>$1B' },
        { name: 'Samsung Heavy Industries', website: 'https://www.samsungshi.com/', turnover: '>$1B' },
        { name: 'HSD Engine', website: 'https://www.hsdengine.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Dominant builder of LNG carriers, large containerships, and dual-fuel tonnage. Effectively the only yards with proven membrane-tank LNG capability at scale, and berths are booked years out.',
      customs: { hts_code: '8901.20', duty_rate: '0% (vessels) / Jones Act bars US trade', compliance_note: 'Newbuild vessels are not tariffed conventionally, but the Jones Act bars foreign-built ships from US domestic trades. IMO Tier III NOx and EEXI/CII compliance shape specification. USTR Section 301 action on Chinese-built vessels raises the value of Korean berths.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B+', sustainability_note: 'IMO 2050 net-zero trajectory is driving methanol and ammonia dual-fuel newbuilds. Yard subcontractor labour conditions, including migrant workers, are the main social-audit area.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: 'Vessel delivery ex-yard' },
      industry_kpi: { label: 'Berth Availability', value: 'Booked into 2028-29' }
    },
    {
      id: 'h_mar_2', lat: 31.35, lng: 121.63,
      hub: 'SHANGHAI / JIANGSU, CHINA', title: 'Volume Shipbuilding & Container Equipment',
      companies: [
        { name: 'China State Shipbuilding (CSSC)', website: 'https://www.cssc.net.cn/', turnover: '>$1B' },
        { name: 'Yangzijiang Shipbuilding', website: 'https://www.yzjship.com/', turnover: '>$1B' },
        { name: 'CIMC (containers)', website: 'https://www.cimc.com/', turnover: '>$1B' },
        { name: 'ZPMC (port cranes)', website: 'https://www.zpmc.com/', turnover: '>$1B' }
      ],
      desc: 'Holds over half of global newbuild orderbook plus near-total dominance of shipping container and ship-to-shore crane manufacture. The concentration in port cranes has become a national-security issue in the US.',
      customs: { hts_code: '8609.00', duty_rate: '0% MFN + 25% Sec 301 (containers)', compliance_note: 'USTR Section 301 action targets Chinese-built vessels, cranes, and containers with port-entry fees and tariffs. ZPMC crane cybersecurity concerns have prompted US port operators to require inspection and network isolation.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Steel-intensive with a coal-heavy grid. Ship recycling at end of life remains largely in South Asian beaching yards - require Hong Kong Convention compliant recycling clauses in vessel contracts.' },
      logistics: { port_wait_days: 4, freight_cost_estimate: 'Project cargo / vessel delivery' },
      industry_kpi: { label: 'Orderbook Share', value: '>50% of global newbuilds' }
    },
    {
      id: 'h_mar_3', lat: 55.68, lng: 12.57,
      hub: 'DENMARK / NORTHERN EUROPE', title: 'Marine Propulsion & Ship Systems',
      companies: [
        { name: 'MAN Energy Solutions', website: 'https://www.man-es.com/', turnover: '>$1B' },
        { name: 'Wartsila', website: 'https://www.wartsila.com/', turnover: '>$1B' },
        { name: 'Alfa Laval Marine', website: 'https://www.alfalaval.com/', turnover: '>$1B' },
        { name: 'Kongsberg Maritime', website: 'https://www.kongsberg.com/', turnover: '>$1B' }
      ],
      desc: 'Design authority for large two-stroke marine engines and the systems layer of modern ships - scrubbers, ballast water treatment, dynamic positioning. Licences designs to Asian yards for local build.',
      customs: { hts_code: '8408.10', duty_rate: '0% (Intra-EU) / 0-2.5% MFN', compliance_note: 'IMO ballast water management convention and Tier III NOx compliance drive equipment selection. EU ETS now covers maritime emissions, making fuel-efficiency documentation commercially material for charterers.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Methanol and ammonia dual-fuel engine development is concentrated here. Retrofit demand for EU ETS compliance is a growing revenue stream.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$28k+/engine module (project cargo)' },
      industry_kpi: { label: 'Two-stroke Design', value: 'MAN B&W ~80% of licensed builds' }
    }
  ],

  // 35. RAILWAY & RAIL TRANSIT
  railway: [
    {
      id: 'h_rail_1', lat: 43.85, lng: 125.32,
      hub: 'CHANGCHUN / QINGDAO, CHINA', title: 'World Largest Rolling Stock Manufacturer',
      companies: [
        { name: 'CRRC Corporation', website: 'https://www.crrcgc.cc/', turnover: '>$1B' },
        { name: 'CRRC Sifang', website: 'https://www.crrcgc.cc/sf', turnover: '>$1B' },
        { name: 'CRRC Zhuzhou (traction)', website: 'https://www.crrcgc.cc/zzcy', turnover: '>$1B' }
      ],
      desc: 'CRRC builds more rolling stock than the rest of the world combined, spanning high-speed trainsets, metro cars, and locomotives. Effectively excluded from the US market by statute.',
      customs: { hts_code: '8603.10', duty_rate: 'Excluded from US federal-funded transit', compliance_note: 'Section 7613 of the FY2020 NDAA bars federal transit funding for rolling stock from Chinese state-owned or state-controlled manufacturers. FRA and Buy America (70% domestic content plus US final assembly) apply to all FTA-funded procurement.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'B', sustainability_note: 'Rail itself is the lowest-carbon land mode. Manufacturing carbon is dominated by steel and aluminium inputs on a coal-heavy grid.' },
      logistics: { port_wait_days: 6, freight_cost_estimate: 'Project cargo / breakbulk' },
      industry_kpi: { label: 'Global Share', value: 'Larger than all peers combined' }
    },
    {
      id: 'h_rail_2', lat: 48.14, lng: 11.58,
      hub: 'GERMANY / FRANCE / SWITZERLAND', title: 'European Rail Systems & Signalling',
      companies: [
        { name: 'Siemens Mobility', website: 'https://www.mobility.siemens.com/', turnover: '>$1B' },
        { name: 'Alstom', website: 'https://www.alstom.com/', turnover: '>$1B' },
        { name: 'Stadler Rail', website: 'https://www.stadlerrail.com/', turnover: '>$1B' },
        { name: 'Knorr-Bremse Rail', website: 'https://www.knorr-bremse.com/', turnover: '>$1B' }
      ],
      desc: 'Technology leadership in high-speed trainsets, ETCS signalling, and braking systems. Knorr-Bremse and Wabtec between them hold most of world rail braking - a genuine duopoly chokepoint.',
      customs: { hts_code: '8607.21', duty_rate: '0% (Intra-EU) / 2.5-3.7% MFN', compliance_note: 'EU TSI (Technical Specifications for Interoperability) conformity plus ERA authorisation are required for network access. ETCS Level 2 deployment is mandatory on TEN-T corridors, creating a long retrofit pipeline.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Hydrogen and battery-electric regional trainsets are displacing diesel on non-electrified lines. Strong circular-economy commitments on vehicle end of life.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$4.8k/Rail-borne module' },
      industry_kpi: { label: 'Vehicle Life', value: '30-40 Years design life' }
    },
    {
      id: 'h_rail_3', lat: 40.44, lng: -79.99,
      hub: 'PITTSBURGH / US MIDWEST', title: 'North American Freight Rail Base',
      companies: [
        { name: 'Wabtec Corporation', website: 'https://www.wabteccorp.com/', turnover: '>$1B' },
        { name: 'Progress Rail (Caterpillar)', website: 'https://www.progressrail.com/', turnover: '>$1B' },
        { name: 'Greenbrier Companies', website: 'https://www.gbrx.com/', turnover: '>$1B' },
        { name: 'Trinity Industries', website: 'https://www.trin.net/', turnover: '>$1B' }
      ],
      desc: 'Heavy-haul freight locomotives, freight cars, and Positive Train Control systems. Buy America compliant and the only practical route for FTA- or FRA-funded procurement.',
      customs: { hts_code: '8602.10', duty_rate: '0% (Domestic)', compliance_note: 'Buy America requires 70% domestic content and US final assembly for FTA-funded rolling stock. AAR interchange rules govern freight car design and certification; FRA regulations cover safety appliances and brake systems.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'Battery-electric and hydrogen line-haul locomotives are in pilot deployment. Rail moves freight at roughly a quarter of the emissions per tonne-mile of trucking.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$3.1k/Rail move' },
      industry_kpi: { label: 'Buy America', value: '70% domestic content' }
    }
  ],

  // 36. ROBOTICS & INDUSTRIAL AUTOMATION
  robotics_automation: [
    {
      id: 'h_rob_1', lat: 35.55, lng: 138.8,
      hub: 'JAPAN (YAMANASHI / AICHI)', title: 'Global Industrial Robot Core',
      companies: [
        { name: 'FANUC Corporation', website: 'https://www.fanuc.co.jp/', turnover: '>$1B' },
        { name: 'Yaskawa Electric', website: 'https://www.yaskawa.co.jp/', turnover: '>$1B' },
        { name: 'Kawasaki Robotics', website: 'https://kawasakirobotics.com/', turnover: '>$1B' },
        { name: 'Harmonic Drive Systems', website: 'https://www.hds.co.jp/', turnover: '$100M-$1B' },
        { name: 'Nabtesco', website: 'https://www.nabtesco.com/', turnover: '>$1B' }
      ],
      desc: 'Japan supplies roughly half of world industrial robots and, more critically, almost all precision cycloidal and strain-wave gearboxes. Nabtesco and Harmonic Drive are the real chokepoint - not the robot brands.',
      customs: { hts_code: '8479.50', duty_rate: '0% (CPTPP) / 0-2.5% MFN', compliance_note: 'ISO 10218 and ISO/TS 15066 (collaborative robots) govern safety certification. Japanese METI export controls cover high-precision multi-axis machines that fall under Wassenaar dual-use thresholds.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'Long service life and rebuild programmes make robots one of the more circular categories of capital equipment. Energy consumption is modest relative to displaced processes.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.3k/FEU' },
      industry_kpi: { label: 'Reducer Lead', value: '30-52 Weeks in tight cycles' }
    },
    {
      id: 'h_rob_2', lat: 48.79, lng: 9.18,
      hub: 'GERMANY (STUTTGART / AUGSBURG)', title: 'European Automation & Systems Integration',
      companies: [
        { name: 'KUKA AG', website: 'https://www.kuka.com/', turnover: '>$1B' },
        { name: 'Siemens Digital Industries', website: 'https://www.siemens.com/', turnover: '>$1B' },
        { name: 'Festo', website: 'https://www.festo.com/', turnover: '>$1B' },
        { name: 'SICK AG', website: 'https://www.sick.com/', turnover: '>$1B' },
        { name: 'Beckhoff Automation', website: 'https://www.beckhoff.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Deepest bench for line integration, safety PLCs, industrial sensing, and pneumatics. The default choice where functional safety certification and OEM line qualification matter more than unit price.',
      customs: { hts_code: '8537.10', duty_rate: '0% (Intra-EU) / 2.7% MFN', compliance_note: 'EU Machinery Regulation 2023/1230 replaces the Machinery Directive from 2027 and adds explicit cybersecurity and AI-related requirements. CE marking with a notified body is required for safety components.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Energy-efficiency optimisation is a core selling point. Note that KUKA is Midea-owned, which triggers foreign-ownership review in some defence and critical-infrastructure procurements.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.7k/Truck intra-EU' },
      industry_kpi: { label: 'Safety Standard', value: 'ISO 13849 PLd / SIL2' }
    },
    {
      id: 'h_rob_3', lat: 37.39, lng: -121.98,
      hub: 'SILICON VALLEY / BOSTON, USA', title: 'Autonomous Mobile Robots & AI Robotics',
      companies: [
        { name: 'Boston Dynamics', website: 'https://www.bostondynamics.com/', turnover: '$100M-$1B' },
        { name: 'Symbotic', website: 'https://www.symbotic.com/', turnover: '>$1B' },
        { name: 'Zebra Technologies / Fetch', website: 'https://www.zebra.com/', turnover: '>$1B' },
        { name: 'Locus Robotics', website: 'https://locusrobotics.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Leadership in warehouse AMRs, perception software, and general-purpose robotics. Hardware is typically Asia-manufactured; the value and the IP sit in the US software and systems layer.',
      customs: { hts_code: '8428.90', duty_rate: '0% (Domestic) / component tariffs apply', compliance_note: 'ANSI/RIA R15.08 governs industrial mobile robot safety. Note that most AMR subassemblies - motors, LiDAR, batteries - remain China-origin and carry Section 301 exposure even when final assembly is domestic.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'Labour-displacement scrutiny is the main social consideration; workforce transition commitments increasingly appear in large deployment contracts.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$2.2k/Ground' },
      industry_kpi: { label: 'AMR Safety', value: 'ANSI/RIA R15.08' }
    }
  ],

  // 37. SCIENTIFIC INSTRUMENTS & METROLOGY
  instruments_scientific: [
    {
      id: 'h_ins_1', lat: 42.36, lng: -71.06,
      hub: 'BOSTON / NEW ENGLAND, USA', title: 'Life Science Instrumentation Cluster',
      companies: [
        { name: 'Thermo Fisher Scientific', website: 'https://www.thermofisher.com/', turnover: '>$1B' },
        { name: 'Waters Corporation', website: 'https://www.waters.com/', turnover: '>$1B' },
        { name: 'Bruker Corporation', website: 'https://www.bruker.com/', turnover: '>$1B' },
        { name: '908 Devices', website: 'https://908devices.com/', turnover: '$10M-$100M' }
      ],
      desc: 'World centre for mass spectrometry, chromatography, and life-science analytics, sitting next to the largest concentration of biotech end users. Consumables and columns are the recurring-revenue lock-in.',
      customs: { hts_code: '9027.80', duty_rate: '0% (Domestic) / 0-1.7% MFN', compliance_note: 'Instruments used in GxP environments require IQ/OQ/PQ qualification documentation. Some high-resolution mass spectrometers and analytical equipment fall under EAR dual-use controls for chemical and biological detection capability.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A', sustainability_note: 'Helium dependence for GC carrier gas and NMR cryogens is a genuine supply risk - qualify hydrogen carrier alternatives where the method allows.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$3.4k/Air (sensitive instrument)' },
      industry_kpi: { label: 'Instrument Lead', value: '16-30 Weeks' }
    },
    {
      id: 'h_ins_2', lat: 48.14, lng: 11.58,
      hub: 'GERMANY (JENA / OBERKOCHEN)', title: 'Optics & Precision Metrology Base',
      companies: [
        { name: 'Carl Zeiss', website: 'https://www.zeiss.com/', turnover: '>$1B' },
        { name: 'Bruker Nano (Berlin)', website: 'https://www.bruker.com/', turnover: '>$1B' },
        { name: 'Jenoptik', website: 'https://www.jenoptik.com/', turnover: '$100M-$1B' },
        { name: 'SCHOTT AG', website: 'https://www.schott.com/', turnover: '>$1B' }
      ],
      desc: 'The world reference for precision optics, coordinate measuring machines, and electron microscopy. Zeiss SMT optics for EUV lithography are the single most irreplaceable component in semiconductor manufacturing.',
      customs: { hts_code: '9031.49', duty_rate: '0% (Intra-EU) / 1.7-3.5% MFN', compliance_note: 'High-precision CMMs above defined accuracy thresholds are Wassenaar dual-use controlled (ECCN 2B006). EU dual-use Regulation 2021/821 licensing applies; expect scrutiny on China-bound metrology equipment.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Rare-earth-doped optical glass has upstream China exposure. Zeiss and SCHOTT both operate long-life service and refurbishment programmes.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$5.6k/Air (vibration-controlled)' },
      industry_kpi: { label: 'CMM Accuracy', value: 'Sub-micron, controlled export' }
    },
    {
      id: 'h_ins_3', lat: 35.63, lng: 139.73,
      hub: 'JAPAN (TOKYO / KYOTO)', title: 'Analytical & Electron Optics Instruments',
      companies: [
        { name: 'Shimadzu Corporation', website: 'https://www.shimadzu.com/', turnover: '>$1B' },
        { name: 'JEOL Ltd.', website: 'https://www.jeol.com/', turnover: '$100M-$1B' },
        { name: 'Horiba', website: 'https://www.horiba.com/', turnover: '>$1B' },
        { name: 'Hitachi High-Tech', website: 'https://www.hitachi-hightech.com/', turnover: '>$1B' }
      ],
      desc: 'Strong across analytical instruments, electron microscopy, and semiconductor metrology. Horiba holds a dominant position in mass flow controllers, a component with no easy substitution in fab tools.',
      customs: { hts_code: '9027.30', duty_rate: '0% (CPTPP) / 0-1.7% MFN', compliance_note: 'METI export licensing applies to electron microscopes and semiconductor metrology above specified resolution thresholds. End-use statements required for China-bound analytical equipment.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'A+', sustainability_note: 'Long product lifecycles with strong refurbishment markets. Instrument service networks in emerging markets are the practical constraint on total cost of ownership.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$5.1k/Air' },
      industry_kpi: { label: 'MFC Share', value: 'Horiba ~50%+ of fab MFCs' }
    }
  ],

  // 38. GLASS & TECHNICAL CERAMICS
  glass_ceramics: [
    {
      id: 'h_gc_1', lat: 42.14, lng: -77.05,
      hub: 'CORNING, NEW YORK, USA', title: 'Specialty Glass Technology Core',
      companies: [
        { name: 'Corning Incorporated', website: 'https://www.corning.com/', turnover: '>$1B' },
        { name: 'CoorsTek', website: 'https://www.coorstek.com/', turnover: '>$1B' },
        { name: 'Ferro / Vibrantz', website: 'https://www.vibrantz.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Corning holds the core IP in cover glass (Gorilla), optical fibre preform, pharmaceutical glass, and ceramic substrates for catalytic converters. Few of these have any qualified alternate source.',
      customs: { hts_code: '7007.19', duty_rate: '0% (Domestic) / 4.9-5.0% MFN', compliance_note: 'Pharmaceutical primary packaging glass must meet USP <660> Type I borosilicate requirements and undergo extractables/leachables studies - supplier changes here trigger regulatory filings, not just PPAP.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A-', sustainability_note: 'Glass melting is among the most energy-intensive industrial processes. Electric and hydrogen-fired furnace pilots are underway but capex per furnace is very large.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$2.1k/Truck (fragile packing)' },
      industry_kpi: { label: 'Furnace Campaign', value: '10-15 Years between rebuilds' }
    },
    {
      id: 'h_gc_2', lat: 48.86, lng: 2.35,
      hub: 'FRANCE / GERMANY GLASS BELT', title: 'European Flat & Container Glass',
      companies: [
        { name: 'Saint-Gobain', website: 'https://www.saint-gobain.com/', turnover: '>$1B' },
        { name: 'SCHOTT AG', website: 'https://www.schott.com/', turnover: '>$1B' },
        { name: 'Verallia', website: 'https://www.verallia.com/', turnover: '>$1B' },
        { name: 'Gerresheimer', website: 'https://www.gerresheimer.com/', turnover: '>$1B' }
      ],
      desc: 'Float glass, pharmaceutical vials and syringes, and premium container glass. Gerresheimer and SCHOTT together supply most of world injectable-drug primary packaging.',
      customs: { hts_code: '7010.90', duty_rate: '0% (Intra-EU) / 5% MFN', compliance_note: 'CBAM will price embedded carbon on glass imports into the EU from 2026, materially changing the landed cost of non-EU glass. EU pharmacopoeia standards apply to all parenteral packaging.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'A', sustainability_note: 'Cullet (recycled glass) input can cut furnace energy by roughly 25% - verify the actual cullet ratio, as it varies widely by plant and colour.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$3.0k/FEU (weight-limited)' },
      industry_kpi: { label: 'Cullet Ratio', value: '40-90% depending on colour' }
    },
    {
      id: 'h_gc_3', lat: 34.97, lng: 136.62,
      hub: 'JAPAN (NAGOYA / SETO)', title: 'Advanced Technical Ceramics Base',
      companies: [
        { name: 'Kyocera Corporation', website: 'https://global.kyocera.com/', turnover: '>$1B' },
        { name: 'NGK Insulators', website: 'https://www.ngk-insulators.com/', turnover: '>$1B' },
        { name: 'Murata Manufacturing', website: 'https://www.murata.com/', turnover: '>$1B' },
        { name: 'AGC Inc.', website: 'https://www.agc.com/', turnover: '>$1B' }
      ],
      desc: 'World leadership in technical ceramics: MLCC dielectrics, semiconductor process components, ceramic substrates, and automotive sensors. Murata alone supplies a large share of global MLCC demand.',
      customs: { hts_code: '6909.19', duty_rate: '0% (CPTPP) / 0-4% MFN', compliance_note: 'MLCCs and ceramic packages for semiconductor use can fall under export controls when destined for advanced-node fabs. Automotive-grade parts require AEC-Q200 qualification.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A+', sustainability_note: 'MLCC production depends on palladium and nickel; palladium has Russian supply exposure that has not been fully resolved. High-purity alumina supply is another concentrated input.' },
      logistics: { port_wait_days: 3, freight_cost_estimate: '$4.0k/Air (ESD-protected)' },
      industry_kpi: { label: 'MLCC Lead Time', value: '12-40 Weeks by cycle' }
    }
  ],

  // 39. PAINTS, COATINGS & SURFACE TREATMENT
  paint_coatings: [
    {
      id: 'h_pc_1', lat: 41.5, lng: -81.7,
      hub: 'CLEVELAND / PITTSBURGH, USA', title: 'North American Coatings Majors',
      companies: [
        { name: 'Sherwin-Williams', website: 'https://www.sherwin-williams.com/', turnover: '>$1B' },
        { name: 'PPG Industries', website: 'https://www.ppg.com/', turnover: '>$1B' },
        { name: 'Axalta Coating Systems', website: 'https://www.axalta.com/', turnover: '>$1B' },
        { name: 'RPM International', website: 'https://www.rpminc.com/', turnover: '>$1B' }
      ],
      desc: 'Global headquarters cluster for architectural, automotive OEM, and industrial coatings. Closest technical support for OEM colour matching and e-coat line qualification in North America.',
      customs: { hts_code: '3208.90', duty_rate: '0% (Domestic) / 3.7% MFN', compliance_note: 'EPA Method 24 VOC limits vary by coating category and by state (California SCAQMD is strictest). TSCA reporting applies to new chemical substances. Lead-based paint remains banned for consumer use under 16 CFR 1303.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A-', sustainability_note: 'PFAS-free formulation is the dominant reformulation programme across the industry. Waterborne and powder systems continue to displace solvent-borne on regulatory pressure.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Truck (Class 3 flammable)' },
      industry_kpi: { label: 'Colour Match', value: 'Delta E < 1.0 OEM standard' }
    },
    {
      id: 'h_pc_2', lat: 52.37, lng: 4.9,
      hub: 'NETHERLANDS / GERMANY', title: 'European Coatings & Resin Technology',
      companies: [
        { name: 'AkzoNobel', website: 'https://www.akzonobel.com/', turnover: '>$1B' },
        { name: 'BASF Coatings', website: 'https://www.basf-coatings.com/', turnover: '>$1B' },
        { name: 'Covestro', website: 'https://www.covestro.com/', turnover: '>$1B' },
        { name: 'Beckers Group', website: 'https://www.beckers-group.com/', turnover: '$100M-$1B' }
      ],
      desc: 'Leadership in high-performance industrial, marine, and coil coatings plus the polyurethane and polyester resin chemistry beneath them. Sets the technical direction for low-VOC systems worldwide.',
      customs: { hts_code: '3209.10', duty_rate: '0% (Intra-EU) / 3.7% MFN', compliance_note: 'EU Directive 2004/42/EC caps VOC content by product category. REACH authorisation is closing off chromate corrosion inhibitors, and the proposed universal PFAS restriction would affect fluoropolymer topcoats - track both dossiers.' },
      esg: { carbon_footprint: 'Medium', ethical_rating: 'A', sustainability_note: 'Biocidal Products Regulation constrains antifouling marine paints. Bio-based resin content is a growing differentiator in EU tenders.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.9k/FEU (DG Class 3)' },
      industry_kpi: { label: 'VOC Limit', value: '<140 g/L most EU categories' }
    },
    {
      id: 'h_pc_3', lat: 31.23, lng: 121.47,
      hub: 'YANGTZE DELTA, CHINA', title: 'Volume Coatings & Pigment Supply',
      companies: [
        { name: 'Nippon Paint China', website: 'https://www.nipponpaint.com.cn/', turnover: '>$1B' },
        { name: 'Carpoly Chemical', website: 'https://www.carpoly.com/', turnover: '$100M-$1B' },
        { name: 'Lomon Billions (TiO2)', website: 'https://www.lomonbillions.com/', turnover: '>$1B' },
        { name: 'Sanhuan Pigment', website: 'https://www.sanhuanpigment.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Largest volume base for architectural coatings and, critically, titanium dioxide pigment - the single largest cost input in most white and light-coloured paint formulations.',
      customs: { hts_code: '3206.11', duty_rate: '6% MFN + 25% Sec 301 (TiO2)', compliance_note: 'EU and US both have active anti-dumping investigations on Chinese TiO2; the EU imposed provisional duties in 2024. Section 301 applies to coatings and pigments - model landed cost with both AD and 301 before committing volume.' },
      esg: { carbon_footprint: 'High', ethical_rating: 'B-', sustainability_note: 'Sulphate-route TiO2 production generates large volumes of acidic waste. The EU has classified inhalable TiO2 powder as a suspected carcinogen, affecting handling and labelling obligations.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$3.5k/FEU' },
      industry_kpi: { label: 'TiO2 Content', value: '~20-25% of paint cost' }
    }
  ],

  // 40. NUTRACEUTICALS & DIETARY SUPPLEMENTS
  nutraceuticals: [
    {
      id: 'h_nut_1', lat: 33.68, lng: -117.83,
      hub: 'SOUTHERN CALIFORNIA / UTAH, USA', title: 'North American Supplement Manufacturing',
      companies: [
        { name: 'Nutraceutical International', website: 'https://www.nutraceutical.com/', turnover: '$100M-$1B' },
        { name: 'NOW Foods', website: 'https://www.nowfoods.com/', turnover: '$100M-$1B' },
        { name: 'Thorne HealthTech', website: 'https://www.thorne.com/', turnover: '$100M-$1B' },
        { name: 'Nutrascience Labs', website: 'https://www.nutrasciencelabs.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Dense cluster of cGMP contract manufacturers for capsules, tablets, powders, and gummies. Utah in particular hosts a disproportionate share of US supplement contract manufacturing capacity.',
      customs: { hts_code: '2106.90', duty_rate: '0-6.4% MFN (varies by composition)', compliance_note: 'FDA 21 CFR Part 111 cGMP for dietary supplements applies to every facility. New Dietary Ingredient (NDI) notification required for ingredients not marketed before 1994. Structure/function claims need substantiation and an FDA disclaimer; disease claims are prohibited.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B+', sustainability_note: 'Adulteration and identity fraud in botanical raw materials is the dominant quality risk. Require HPTLC or DNA identity testing on incoming botanicals, not just a supplier certificate of analysis.' },
      logistics: { port_wait_days: 0, freight_cost_estimate: '$1.5k/Truck' },
      industry_kpi: { label: 'Co-man Lead', value: '10-16 Weeks incl. stability' }
    },
    {
      id: 'h_nut_2', lat: 51.44, lng: 5.48,
      hub: 'NETHERLANDS / SWITZERLAND', title: 'Premium Ingredient & Vitamin Supply',
      companies: [
        { name: 'dsm-firmenich', website: 'https://www.dsm-firmenich.com/', turnover: '>$1B' },
        { name: 'Lonza Capsules & Health Ingredients', website: 'https://www.lonza.com/', turnover: '>$1B' },
        { name: 'Glanbia Nutritionals', website: 'https://www.glanbianutritionals.com/', turnover: '>$1B' },
        { name: 'BASF Nutrition & Health', website: 'https://www.basf.com/', turnover: '>$1B' }
      ],
      desc: 'Source of branded, clinically substantiated ingredients and pharmaceutical-grade vitamins. Lonza Capsugel is the dominant supplier of two-piece capsules worldwide.',
      customs: { hts_code: '2936.29', duty_rate: '0% (Intra-EU) / 0-6.4% MFN', compliance_note: 'EU Novel Food Regulation 2015/2283 requires pre-market authorisation for ingredients without significant EU consumption history before 1997 - this is a multi-year process. EFSA health claim authorisation is separate and equally slow.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'AA', sustainability_note: 'Algal-derived omega-3 is displacing fish oil on both sustainability and purity grounds. Fermentation-derived vitamins reduce petrochemical route dependence.' },
      logistics: { port_wait_days: 2, freight_cost_estimate: '$2.8k/FEU' },
      industry_kpi: { label: 'Novel Food Auth', value: '18-36 Months EU' }
    },
    {
      id: 'h_nut_3', lat: 19.08, lng: 72.88,
      hub: 'INDIA (MUMBAI / HYDERABAD)', title: 'Botanical Extracts & Bulk Nutraceutical Base',
      companies: [
        { name: 'Sami-Sabinsa Group', website: 'https://www.sabinsa.com/', turnover: '$100M-$1B' },
        { name: 'OmniActive Health Technologies', website: 'https://www.omniactives.com/', turnover: '$100M-$1B' },
        { name: 'Arjuna Natural', website: 'https://www.arjunanatural.com/', turnover: '$10M-$100M' },
        { name: 'Vidya Herbs', website: 'https://www.vidyaherbs.com/', turnover: '$10M-$100M' }
      ],
      desc: 'Primary global source of standardised botanical extracts - curcumin, ashwagandha, boswellia, lutein - and bulk amino acids. Cost advantage is large but identity and heavy-metal testing is non-negotiable.',
      customs: { hts_code: '1302.19', duty_rate: '0-3.2% MFN', compliance_note: 'FDA has issued import alerts against specific Indian botanical suppliers for adulteration and cGMP failures - check the import alert database before qualifying. Heavy metals (lead, arsenic, cadmium, mercury) and pesticide residue testing per USP <2232> is essential on every lot.' },
      esg: { carbon_footprint: 'Low', ethical_rating: 'B', sustainability_note: 'Wild-harvest pressure on several Ayurvedic botanicals raises CITES and sustainability questions. Prefer cultivated, traceable supply chains with farm-level documentation.' },
      logistics: { port_wait_days: 5, freight_cost_estimate: '$2.9k/FEU ex-Nhava Sheva' },
      industry_kpi: { label: 'Lot Testing', value: 'Identity + heavy metals per lot' }
    }
  ]

}

// ============================================================
// QUERY CATEGORIZER — Maps user queries to database categories
// Uses keyword priority: specific materials > applications > platforms
// ============================================================
// Picks the hub within a category most relevant to the specific query,
// instead of always defaulting to whichever hub happens to be listed
// first. Categories like "metals" bundle several distinct commodities
// (lithium, copper, steel, cobalt) under one roof, so a query like "steel
// rebar" needs to surface the steel hub, not a lithium mine, as the
// headline recommendation. Uses each hub's own title/desc as the source
// of keywords so it works across every category without hand-maintaining
// a separate keyword map per hub.
const STOPWORDS = new Set(['and','the','for','with','core','hub','mega','global','belt','processing','world','largest','primary','source']);
export function pickBestHub(hubs, query) {
  if (!hubs || hubs.length === 0) return null;
  const q = (query || '').toLowerCase();
  let best = hubs[0], bestScore = 0;
  for (const h of hubs) {
    const words = `${h.title || ''} ${h.desc || ''}`.toLowerCase().split(/[^a-z0-9]+/)
      .filter(w => w.length > 3 && !STOPWORDS.has(w));
    const score = words.reduce((s, w) => s + (q.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = h; }
  }
  return best;
}

export function categorizeQuery(query) {
  if (typeof query !== 'string' || !query.trim()) return null
  const q = query.toLowerCase().replace(/[‐‑–—]/g, '-').replace(/\s+/g, ' ').trim()
  const match = (keywords) => keywords.some(kw => q.includes(kw))

  // Product phrases take priority over raw-material words and end-use context.
  // Keep whole-word boundaries here so 'ev' cannot match an unrelated word.
  if (/\b(?:semiconductor|silicon(?: carbide)?|gallium nitride) wafers?\b/.test(q)) return 'semiconductor'
  if (/\b(?:battery|batteries|cells?)\b/.test(q) &&
      /\b(?:lithium[- ]ion|li[- ]ion|ev|electric vehicles?|traction)\b/.test(q)) return 'ev_battery'


  // ─────────────────────────────────────────────────────────────────────────
  // PRE-CHECKS: High-specificity compound terms that would be misrouted by
  // later broad-keyword checks. These fire before any category P1–P18.
  // ─────────────────────────────────────────────────────────────────────────

  // Pre-A: Automotive compound parts (before plastics P1 catches injection mold
  //        or metals P7 catches iron/alloy/casting/forging)
  if (match([
    'brake caliper', 'brake disc', 'brake rotor', 'brake drum',
    'exhaust manifold', 'exhaust pipe', 'exhaust system',
    'wheel rim', 'wheel hub', 'alloy wheel', 'mag wheel',
    'transmission shaft', 'propshaft', 'driveshaft', 'crankshaft', 'camshaft',
    'steering knuckle', 'control arm', 'suspension arm', 'sway bar',
    'bumper fascia', 'bumper cover', 'fender liner',
    'catalytic converter', 'turbocharger', 'intercooler auto',
    'abs sensor', 'auto sensor', 'oxygen sensor auto', 'map sensor auto',
    'cv joint', 'cv axle', 'tie rod', 'ball joint', 'strut assembly',
    'piston automotive', 'connecting rod auto', 'valve cover auto'
  ])) return 'automotive'

  // Pre-B: Chemical applications of PU/coatings (before plastics P1 catches polyurethane)
  if (match([
    'polyurethane coating', 'polyurethane sealant', 'polyurethane varnish',
    'polyurethane adhesive', 'polyurethane paint', 'polyurethane finish',
    'pu coating', 'pu sealant', 'pu varnish', 'pu adhesive', 'pu paint',
    '2k pu', '1k pu', '2-component pu', 'solvent-borne coating',
    'water-based varnish', 'wood finish varnish', 'floor varnish',
    'alkyd varnish', 'acrylic varnish', 'lacquer finish',
    'lithium grease', 'lithium complex grease', 'lithium complex', 'lithium soap grease',
    'nlgi grade', 'nlgi 2', 'nlgi 3', 'nlgi 00',
    'petroleum jelly', 'petrolatum', 'white mineral oil', 'white oil', 'paraffin wax',
    'mineral oil', 'technical vaseline', 'vaseline industrial'
  ])) return 'chemicals'

  // Pre-C: Construction glass & fiber terms (before textiles 'woven' / metals 'iron')
  if (match([
    'flat glass', 'float glass', 'architectural glass', 'low-e glass',
    'low iron glass', 'low-iron glass', 'extra clear glass',
    'glass fiber roving', 'glass fiber woven', 'glass fiber mat',
    'e-glass fiber', 'e-glass woven', 's-glass', 'ecr glass',
    'glass wool insulation', 'glass fiber fabric', 'woven roving glass',
    'ready mix concrete', 'ready-mix concrete', 'rmc concrete',
    'concrete pump', 'cement mix', 'concrete block masonry',
    'iron aggregate', 'gravel aggregate',
    // Basalt must be here — P13 construction fires AFTER food P5a which catches 'salt' inside 'basalt'
    'basalt', 'basalt fiber', 'basalt rock', 'basalt stone', 'basalt wool',
    // Ceramic/tile compounds — must be here because 'ceramic' contains 'ram' (→ P4 electronics RAM)
    // and 'tile' alone is caught by P13 construction which fires too late
    'ceramic tile', 'porcelain tile', 'floor tile', 'wall tile', 'mosaic tile',
    'roof tile', 'paving tile', 'terracotta tile', 'vitrified tile', 'quarry tile'
  ])) return 'construction'

  // Pre-D: Medical compound terms (before metals 'metal' or packaging 'packaging' intercept)
  if (match([
    'coronary stent', 'vascular stent', 'drug eluting stent', 'bare metal stent',
    'stent delivery', 'stent coronary', 'stent vascular', 'stent implant',
    'tyvek pouch', 'medical tyvek', 'sterile pouch',
    'sterile wrap', 'sterile barrier', 'medical device packaging',
    'nitrile examination', 'nitrile exam glove', 'exam glove', 'medical glove',
    'orthopedic implant', 'spinal implant', 'hip implant', 'dental implant',
    'nitrile medical', 'hospital grade', 'surgical grade',
    'gmp grade', 'usp grade', 'ep grade', 'bp grade pharmaceutical'
  ])) return 'medical'

  // Pre-E: Consumer goods compound terms (before packaging 'label', textiles 'fabric',
  //         metals 'aluminum', food 'cream' intercept)
  if (match([
    'fabric softener', 'fabric conditioner', 'laundry softener',
    'private label cosmetic', 'private label personal care', 'oem cosmetic',
    'oem shampoo', 'oem skincare', 'contract cosmetic',
    'aluminum-free deodorant', 'aluminum free deodorant', 'aluminum-free',
    'ammonia-free', 'paraben-free', 'sulfate-free',
    'hair dye kit', 'hair dye pack', 'hair dye brand',
    // cotton swab/pad — must be here before textiles P8 catches 'cotton'
    'cotton swab', 'cotton ball', 'cotton pad', 'cotton round',
    'hair dye cream', 'hair color cream', 'face cream', 'body cream',
    'moisturizer cream', 'day cream', 'night cream', 'hand cream',
    'shampoo label', 'conditioner label', 'cosmetic label',
    'private label beauty', 'white label cosmetic',
    'sheet mask', 'clay mask', 'face mask pack', 'peel mask', 'sleep mask',
    'mud mask', 'charcoal mask', 'gel mask', 'eye mask beauty', 'face mask beauty',
    'hair dye', 'hair color', 'ammonia-free hair'
  ])) return 'consumer_goods'

  // Pre-F: Agriculture terms that would be caught by food's broad keywords
  //   'fish feed' contains 'fish', 'sunflower seed crop' contains 'sunflower seed'
  //   'irrigation pipe' contains 'pipe' → caught by P2 industrial before agriculture fires
  if (match([
    'fish feed', 'fish meal', 'fish oil crude', 'fish oil agri',
    'sunflower seed crop', 'sunflower crop', 'seed corn', 'seed wheat',
    'seed potato', 'seed soybean', 'cover crop seed',
    'irrigation pipe', 'irrigation tube', 'irrigation tubing', 'drip line',
    'drip tape', 'drip emitter', 'irrigation fitting', 'sprinkler head agri',
    'center pivot', 'pivot irrigation', 'irrigation pump agri'
  ])) return 'agriculture'

  // Pre-F2: Processed food terms that collide with agriculture raw keywords
  if (match([
    'wheat flour', 'bread flour', 'all purpose flour', 'whole wheat flour',
    'steak cut', 'ribeye steak', 'strip steak', 'sirloin steak', 'beef steak',
    'burger bun', 'hamburger bun', 'brioche bun', 'slider bun',
    'beef patty', 'frozen patty', 'beef burger', 'plant burger',
    'chicken nugget', 'chicken strip', 'chicken tender', 'breaded chicken',
    'pork belly sliced', 'pulled pork', 'corned beef', 'roast beef',
    'canned black bean', 'canned kidney bean', 'canned chickpea', 'canned lentil',
    'canned corn', 'canned tomato', 'diced tomato canned',
    'grain bar', 'whole grain cereal', 'multigrain bread',
    'rice cake', 'rice noodle', 'rice cracker', 'puffed rice',
    'corn tortilla', 'corn chip', 'corn flour', 'cornmeal', 'polenta',
    'soy protein', 'soy flour', 'textured soy'
  ])) return 'food'

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN PRIORITY CHECKS
  // ─────────────────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────────────────
  // EXPANSION CATEGORIES (16–40)
  // These fire BEFORE the legacy Priority 1–18 blocks because the legacy
  // blocks use broad single words ('battery', 'glass', 'pump', 'engine',
  // 'paper') that would otherwise swallow every one of these queries.
  // Every keyword below is a compound term — bare substrings are avoided so
  // that existing routing for the original 15 categories is preserved.
  // ─────────────────────────────────────────────────────────────────────────

  // X1: Semiconductor manufacturing & materials
  //     (before electronics catches 'wafer' / 'chip')
  if (match([
    'silicon wafer', 'epitaxial wafer', '300mm wafer', '200mm wafer', 'wafer fab',
    'photoresist', 'euv', 'euv lithography', 'duv lithography', 'immersion lithography',
    'photomask', 'reticle', 'cmp slurry', 'chemical mechanical planarization',
    'sputtering target', 'ion implant', 'atomic layer deposition', 'plasma etch',
    'abf substrate', 'ic substrate', 'leadframe', 'die attach', 'wire bond',
    'wafer probe', 'osat', 'advanced packaging', 'cowos', 'chiplet',
    'foundry', 'semiconductor foundry', 'semiconductor equipment', 'fab equipment',
    'semiconductor grade', 'high purity gas', 'ultrapure water fab',
    'polysilicon', 'gallium nitride wafer', 'silicon carbide wafer',
    'node 3nm', '3nm', '2nm', '5nm', '7nm'
  ])) return 'semiconductor'

  // X2: EV battery & cell supply chain
  //     (before electronics catches 'battery' / 'battery cell')
  if (match([
    'ev battery', 'traction battery', 'battery gigafactory', 'gigafactory',
    'lithium cell', 'battery cell', 'cell pouch', 'cell module',
    'cathode active material', 'anode material', 'anode graphite', 'synthetic graphite',
    'pcam', 'precursor cathode', 'nmc cathode', 'ncm cathode', 'nca cathode',
    'lfp cell', 'lfp cathode', 'prismatic cell', 'pouch cell', 'cylindrical cell',
    '4680 cell', '21700 cell', '18650 cell', 'cell to pack', 'cell-to-pack',
    'battery electrolyte', 'electrolyte salt', 'lipf6', 'battery separator',
    'solid state battery', 'battery module ev', 'battery pack ev',
    'battery passport', 'battery recycling', 'black mass',
    'bms', 'battery management system'
  ])) return 'ev_battery'

  // X3: Renewable energy equipment
  //     (before electronics 'panel'/'inverter' and machinery 'wind turbine')
  if (match([
    'solar panel', 'solar module', 'pv module', 'photovoltaic', 'solar cell',
    'solar farm', 'solar inverter', 'string inverter', 'microinverter',
    'solar tracker', 'solar mounting', 'bifacial module', 'cdte module',
    'perc cell', 'topcon cell', 'heterojunction cell',
    'wind turbine', 'turbine blade', 'wind blade', 'nacelle', 'monopile',
    'offshore wind', 'onshore wind', 'wind farm',
    'electrolyser', 'electrolyzer', 'green hydrogen', 'fuel cell stack',
    'battery energy storage', 'grid scale storage', 'grid storage', 'utility scale storage',
    'renewable energy', 'geothermal plant', 'hydropower turbine'
  ])) return 'renewable_energy'

  // X4: Aerospace & defence structures
  if (match([
    'aerospace', 'aircraft part', 'airframe', 'aerostructure', 'fuselage',
    'wing box', 'wing spar', 'landing gear', 'aircraft engine', 'jet engine',
    'turbofan', 'turboprop', 'apu aircraft', 'avionics', 'flight control system',
    'as9100', 'nadcap', 'aircraft fastener', 'aerospace fastener',
    'aerospace composite', 'aircraft composite', 'cfrp prepreg', 'aerospace prepreg', 'honeycomb core',
    'satellite component', 'spacecraft', 'launch vehicle', 'rocket engine',
    'aircraft interior', 'cabin seat aircraft', 'aircraft galley',
    'titanium forging aerospace', 'aircraft bracket', 'aircraft skin panel',
    'turbine blade aerospace', 'compressor blade', 'engine blade', 'nozzle guide vane'
  ])) return 'aerospace'

  // X5: Defence & military systems
  if (match([
    'defense contractor', 'defence contractor', 'military vehicle', 'armored vehicle',
    'armoured vehicle', 'military grade', 'munition', 'ammunition', 'artillery',
    'missile', 'missile component', 'warhead', 'solid rocket motor',
    'itar', 'dfars', 'cmmc', 'usml', 'ddtc',
    'body armor', 'body armour', 'ballistic armor', 'ballistic plate', 'ballistic helmet', 'ballistic protection',
    'night vision', 'military radar', 'defense radar', 'electronic warfare', 'radar system',
    'naval combat system', 'submarine component', 'military drone', 'uav military'
  ])) return 'defense_military'

  // X6: Energy, oil & gas
  //     (before machinery 'pump'/'valve'/'compressor'/'drill')
  if (match([
    'oilfield', 'oil field', 'oil and gas', 'oil & gas', 'upstream equipment',
    'wellhead', 'christmas tree valve', 'subsea tree', 'subsea equipment',
    'blowout preventer', 'bop stack', 'drill pipe', 'drill bit', 'drilling rig', 'drilling equipment',
    'drill collar', 'casing pipe', 'tubing oilfield', 'octg',
    'frac pump', 'fracturing', 'mud pump', 'downhole tool',
    'api 6a', 'api 6d', 'api 5l', 'lng train', 'lng terminal', 'lng carrier cargo', 'lng storage', 'lng tank', 'lng plant',
    'cryogenic valve', 'cryogenic tank', 'refinery equipment', 'pipeline valve',
    'gas turbine package', 'flare system', 'separator vessel', 'crude oil',
    'natural gas processing', 'petroleum equipment', 'oil refinery', 'oil pipeline'
  ])) return 'energy_oil_gas'

  // X7: Mining & extractives
  //     (before metals catches 'ore' / 'copper')
  if (match([
    'iron ore', 'copper ore', 'copper concentrate', 'bauxite', 'spodumene',
    'lithium brine', 'lithium mining', 'coal mining', 'coal mine', 'mineral concentrate', 'mine site', 'mining operation',
    'open pit mine', 'underground mine', 'tailings', 'tailings dam',
    'mining equipment', 'haul truck', 'mineral processing', 'ore beneficiation',
    'flotation cell', 'crushing plant', 'grinding mill ore', 'sag mill',
    'potash', 'uranium ore', 'yellowcake', 'coal mine', 'metallurgical coal',
    'artisanal mining', 'critical mineral', 'rare earth mining', 'nickel laterite',
    'cobalt concentrate', 'mine offtake', 'kimberley process'
  ])) return 'mining'

  // X8: Maritime & shipbuilding
  if (match([
    'shipbuilding', 'shipyard', 'newbuild vessel', 'container ship', 'containership',
    'bulk carrier', 'tanker vessel', 'lng carrier', 'ro-ro vessel',
    'marine engine', 'ship engine', 'two-stroke engine', 'marine propulsion',
    'propeller shaft marine', 'ship propeller', 'anchor chain', 'mooring chain', 'vessel hull', 'ship hull',
    'rudder', 'ballast water treatment',
    'scrubber marine', 'ship crane', 'ship-to-shore crane', 'port crane',
    'shipping container', 'reefer container', 'jones act', 'imo 2020',
    'offshore vessel', 'dry dock', 'hull block', 'marine classification society'
  ])) return 'maritime'

  // X9: Railway & rail transit
  if (match([
    'rolling stock', 'railcar', 'rail car', 'freight car', 'locomotive', 'railway locomotive',
    'metro car', 'trainset', 'high speed train', 'passenger coach rail',
    'railway track', 'rail track', 'track rail', 'rail steel', 'railway signalling', 'railway signaling',
    'etcs', 'positive train control', 'railway bogie', 'bogie frame',
    'rail wheelset', 'rail axle', 'railway brake', 'pantograph',
    'catenary', 'overhead line equipment', 'rail fastening', 'railway sleeper',
    'railway tie', 'railroad tie', 'railroad track', 'buy america rail', 'railway component', 'rail transit'
  ])) return 'railway'

  // X10: Robotics & industrial automation
  //      (before machinery catches 'industrial robot' / 'robotic arm')
  if (match([
    'industrial robot', 'robotic arm', 'robot arm', 'six axis robot', '6-axis robot',
    'scara robot', 'delta robot', 'cobot', 'collaborative robot',
    'autonomous mobile robot', 'amr robot', 'agv', 'automated guided vehicle',
    'robot controller', 'end effector', 'robot gripper', 'end-of-arm tooling',
    'harmonic drive', 'strain wave gear', 'cycloidal reducer', 'precision reducer',
    'servo motor robot', 'servo drive', 'servo amplifier', 'motion controller', 'machine vision', 'vision system',
    'safety plc', 'industrial automation', 'factory automation', 'plc controller',
    'warehouse automation', 'palletizing robot', 'pick and place robot'
  ])) return 'robotics_automation'

  // X11: Scientific instruments & metrology
  if (match([
    'mass spectrometer', 'mass spectrometry', 'chromatography', 'hplc', 'uplc',
    'gas chromatograph', 'gc-ms', 'lc-ms', 'nmr spectrometer', 'spectrophotometer',
    'electron microscope', 'sem microscope', 'tem microscope', 'atomic force microscope',
    'coordinate measuring machine', 'cmm machine', 'metrology equipment',
    'optical metrology', 'laser interferometer', 'profilometer',
    'analytical instrument', 'analytical balance', 'precision balance', 'laboratory instrument', 'lab equipment',
    'scientific instrument', 'thermal analyzer', 'particle analyzer',
    'laboratory centrifuge', 'centrifuge lab', 'clinical centrifuge',
    'xrf analyzer', 'xrd diffractometer', 'flow cytometer', 'pcr instrument',
    'calibration standard', 'mass flow controller'
  ])) return 'instruments_scientific'

  // X12: Telecom & network infrastructure
  //      (before electronics catches 'antenna' / 'cable')
  if (match([
    'telecom', 'telecommunication', '5g network', '5g equipment', 'ran equipment',
    'open ran', 'base station', 'small cell', 'macro cell', 'cell tower',
    'network switch', 'core router', 'optical transceiver', 'optical transport',
    'optical fiber cable', 'optical fibre cable', 'fiber optic cable', 'single mode fiber',
    'fiber preform', 'fusion splicer', 'odn', 'fttx', 'gpon', 'xgs-pon',
    'submarine cable', 'subsea cable', 'data center switch', 'top of rack switch',
    'white box switch', 'dwdm', 'sdh', 'microwave backhaul', 'satcom terminal'
  ])) return 'telecom'

  // X13: HVAC & building systems
  //      (before machinery catches 'chiller' / 'hvac unit' / 'boiler')
  if (match([
    'hvac', 'air conditioner', 'air conditioning', 'heat pump', 'mini split',
    'split unit', 'chiller', 'fan coil',
    'vrf system', 'rooftop unit', 'air handling unit', 'fan coil unit',
    'commercial chiller', 'industrial chiller', 'chiller plant', 'water chiller',
    'ventilation fan', 'axial fan hvac', 'centrifugal fan hvac',
    'refrigerant', 'r-410a', 'r410a', 'r-32 refrigerant', 'r-454b', 'hfc refrigerant',
    'scroll compressor', 'rotary compressor', 'condensing unit', 'evaporator coil',
    'condenser coil', 'thermostat', 'building automation', 'bms building',
    'ductwork', 'air duct', 'ventilation system', 'exhaust fan building',
    'seer2', 'hspf', 'ahri certified', 'chilled water system', 'boiler heating'
  ])) return 'hvac'

  // X14: Water treatment & fluid purification
  if (match([
    'water treatment', 'wastewater', 'waste water', 'desalination', 'desalinat',
    'reverse osmosis', 'ro membrane', 'nanofiltration', 'ultrafiltration', 'uf membrane', 'ultrafiltration membrane',
    'membrane element', 'membrane module water', 'ion exchange resin', 'activated carbon filter',
    'granular activated carbon', 'water filtration', 'water purification',
    'clarifier', 'sludge treatment', 'chlorination system', 'uv disinfection',
    'water softener', 'demineralization', 'boiler feedwater', 'cooling tower water',
    'nsf 61', 'drinking water treatment', 'effluent treatment', 'pfas removal',
    'irrigation system water'
  ])) return 'water_treatment'

  // X15: Cold chain & temperature-controlled logistics
  if (match([
    'cold chain', 'cold storage', 'reefer container', 'refrigerated container',
    'refrigerated truck', 'refrigerated warehouse', 'freezer warehouse',
    'blast freezer', 'temperature controlled logistics', 'temperature-controlled',
    'temperature excursion', 'data logger temperature', 'temperature monitoring shipment',
    'gdp logistics', 'gdp pharma', 'good distribution practice', 'ceiv pharma', 'validated cold chain', 'cryogenic shipper',
    'dry ice shipping', 'insulated shipper', 'active container pharma',
    'vaccine cold chain', 'frozen logistics', 'frozen food logistics', 'chilled logistics', '2-8c'
  ])) return 'cold_chain'

  // X16: Cosmetics & personal care formulation
  //      (before consumer_goods and chemicals intercept)
  if (match([
    'cosmetic', 'cosmetics', 'skincare', 'skin care', 'skin care formulation', 'serum formulation',
    'k-beauty', 'beauty odm', 'cosmetic odm', 'cosmetic contract manufactur',
    'makeup', 'lipstick', 'foundation makeup', 'mascara', 'eyeshadow',
    'sunscreen', 'spf formulation', 'moisturizer', 'skin cream', 'skin lotion', 'body lotion',
    'fragrance', 'perfume', 'eau de parfum', 'essential oil fragrance',
    'inci', 'mocra', 'cpnp', 'cosmetic ingredient', 'emulsifier cosmetic',
    'hyaluronic acid', 'niacinamide', 'retinol', 'peptide skincare',
    'personal care formulation', 'cosmetic packaging component'
  ])) return 'cosmetics'

  // X17: Nutraceuticals & dietary supplements
  if (match([
    'nutraceutical', 'dietary supplement', 'food supplement', 'vitamin supplement',
    'vitamin c', 'vitamin d', 'vitamin b12', 'vitamin e', 'vitamin k',
    'omega-3 fish oil', 'omega 3 fish oil', 'fish oil supplement', 'fish oil capsule', 'krill oil',
    'multivitamin', 'softgel', 'gummy supplement', 'capsule supplement',
    'two-piece capsule', 'botanical extract', 'herbal extract', 'plant extract standardiz',
    'curcumin', 'ashwagandha', 'boswellia', 'lutein', 'omega-3 supplement',
    'fish oil supplement', 'algal oil', 'collagen peptide', 'whey protein powder',
    'probiotic', 'prebiotic', 'creatine', 'amino acid supplement',
    'novel food', 'ndi notification', 'aafco', 'sports nutrition'
  ])) return 'nutraceuticals'

  // X18: Pet & animal products
  if (match([
    'pet food', 'dog food', 'cat food', 'pet treat', 'pet supplement',
    'animal feed', 'feed additive', 'animal nutrition', 'livestock feed',
    'poultry feed', 'aquafeed', 'aqua feed', 'veterinary', 'vet product',
    'animal health', 'animal vaccine', 'pet accessory', 'pet toy',
    'cat litter', 'pet grooming', 'kibble', 'wet pet food', 'rendered protein'
  ])) return 'pet_animal'

  // X19: Luxury goods & leather accessories
  if (match([
    'luxury goods', 'luxury handbag', 'designer handbag', 'leather handbag',
    'small leather goods', 'luxury watch', 'mechanical watch', 'watch movement',
    'swiss made watch', 'watch case', 'hairspring', 'escapement',
    'fine jewelry', 'fine jewellery', 'jewelry manufactur', 'jewellery manufactur',
    'diamond jewelry', 'diamond ring', 'diamond necklace', 'diamond setting',
    'gold bullion', 'gold bar', 'gold coin', 'gold chain jewelry', 'gold jewelry',
    'luxury leather', 'exotic leather', 'crocodile leather',
    'python leather', 'alligator leather', 'cites permit', 'vegetable tanned leather',
    'made in italy leather', 'luxury packaging', 'haute couture'
  ])) return 'luxury_goods'

  // X20: Furniture & interior fittings
  //      (before wood_paper catches 'wooden furniture')
  if (match([
    'furniture', 'sofa', 'couch', 'armchair', 'dining table', 'coffee table',
    'office chair', 'task chair', 'ergonomic chair', 'desk furniture',
    'bedroom furniture', 'wardrobe', 'kitchen cabinet', 'bathroom vanity',
    'upholstered seating', 'upholstery furniture', 'mattress', 'bed frame',
    'flat pack furniture', 'flat-pack furniture', 'rta furniture', 'shelving unit', 'metal shelving', 'steel shelving', 'wire shelving',
    'contract furniture', 'hospitality furniture', 'outdoor furniture', 'patio furniture',
    'furniture hardware', 'drawer slide', 'cabinet hinge', 'furniture fitting'
  ])) return 'furniture'

  // X21: Sports & outdoor equipment
  if (match([
    'athletic footwear', 'running shoe', 'sports shoe', 'sneaker', 'trainer shoe',
    'sportswear', 'activewear', 'performance apparel', 'sports equipment',
    'bicycle', 'bike frame', 'carbon frame bike', 'e-bike', 'ebike', 'drivetrain bicycle',
    'groupset', 'bicycle component', 'helmet cycling', 'ski equipment', 'snowboard',
    'ski binding', 'climbing harness', 'climbing rope', 'carabiner', 'via ferrata',
    'camping gear', 'camping tent', 'tent outdoor', 'camp tent', 'sleeping bag', 'backpack outdoor', 'hiking boot',
    'golf club', 'tennis racket', 'fitness equipment', 'treadmill', 'dwr finish'
  ])) return 'sports_outdoor'

  // X22: Toys & games
  if (match([
    'plush toy', 'soft toy', 'action figure', 'fashion doll', 'doll toy', 'board game',
    'puzzle game', 'jigsaw puzzle', 'building block toy', 'construction toy',
    'ride-on toy', 'toy vehicle', 'educational toy', 'learning toy',
    'plastic toy', 'wooden toy', 'electronic toy', 'baby toy', 'infant toy',
    'toy factory', 'toy product', 'toy industry', 'kids toy', 'children toy',
    'astm f963', 'en 71', 'cpsia', 'icti', 'toy safety', 'toy manufactur',
    'playset', 'collectible figure', 'trading card game', 'video game console accessory'
  ])) return 'toys_games'

  // X23: Printing, publishing & media production
  //      (before wood_paper catches 'paper' and packaging catches 'label')
  if (match([
    'book printing', 'offset printing', 'commercial printing', 'digital printing',
    'flexographic printing', 'flexo press', 'gravure printing', 'screen printing',
    'printing press', 'printing plate', 'ctp plate', 'printing ink', 'offset ink',
    'uv ink', 'low migration ink', 'toner cartridge', 'inkjet head',
    'bookbinding', 'case bound', 'perfect binding', 'saddle stitch',
    'catalog printing', 'magazine printing', 'direct mail printing',
    'print on demand', 'pressure sensitive label printing', 'security printing'
  ])) return 'printing_media'

  // X24: Glass & technical ceramics
  //      (before construction Pre-C and electronics 'ceramic capacitor')
  if (match([
    'technical ceramic', 'advanced ceramic', 'alumina ceramic', 'zirconia ceramic',
    'silicon nitride ceramic', 'ceramic substrate', 'ceramic package',
    'mlcc', 'multilayer ceramic capacitor', 'ceramic component semiconductor',
    'borosilicate glass', 'pharmaceutical glass', 'type i glass vial', 'glass vial',
    'glass ampoule', 'prefilled syringe glass', 'cover glass', 'gorilla glass',
    'glass container', 'glass bottle manufactur', 'float glass furnace', 'cullet',
    'optical glass', 'glass ceramic', 'refractory ceramic', 'porcelain insulator'
  ])) return 'glass_ceramics'

  // X25: Paints, coatings & surface treatment
  //      (before chemicals Pre-B and plastics)
  if (match([
    'paint', 'coating', 'coatings', 'powder coating', 'powder coat', 'industrial powder', 'e-coat', 'electrocoat',
    'primer paint', 'topcoat', 'basecoat', 'clearcoat', 'automotive paint',
    'industrial coating', 'marine coating', 'antifouling', 'coil coating',
    'architectural paint', 'decorative paint', 'wood coating', 'can coating',
    'titanium dioxide', 'tio2', 'pigment', 'dispersion pigment',
    'anti-corrosion coating', 'zinc rich primer', 'chromate conversion',
    'anodizing', 'anodising', 'electroplating', 'galvanizing', 'phosphating',
    'thermal spray coating', 'pvd coating', 'cvd coating', 'voc coating'
  ])) return 'paint_coatings'

  // Priority 1: Plastics, polymers, elastomers, rubber, composites
  // Must be first — "injection mold" would otherwise fall to electronics default
  if (match([
    'tpe', 'thermoplastic elastomer', 'thermoplastic', 'thermoset',
    'polymer', 'polymers', 'resin compound', 'plastic resin',
    'abs plastic', 'abs compound', 'polypropylene', 'polyethylene',
    'hdpe', 'ldpe', 'lldpe', 'pvc pipe', 'pvc compound',
    'nylon compound', 'nylon part', 'nylon 6 ', 'nylon 66', 'nylon 12',
    'pa66', 'pa6 ', 'pa12', 'pa11',
    'peek', 'pom resin', 'delrin', 'acetal',
    'polycarbonate', 'polyurethane resin', 'polyurethane elastomer',
    'polyurethane part', 'polyurethane compound', 'pu foam', 'foam molding',
    'injection mold', 'injection mould', 'injection molded', 'injection moulded',
    'blow mold', 'blow mould', 'roto mold', 'roto mould',
    'plastic part', 'plastic component', 'plastic housing', 'plastic enclosure',
    'molded part', 'moulded part', 'overmold', 'overmould', 'insert mold',
    'elastomer', 'epdm', 'nbr rubber', 'silicone rubber', 'silicone part',
    'rubber compound', 'synthetic rubber', 'natural rubber',
    'carbon fiber', 'carbon fibre', 'fiberglass', 'fibreglass',
    'composite part', 'epoxy resin', 'epoxy compound',
    'plastic film', 'packaging film', 'stretch film',
    'plastic extrusion', 'extrusion profile', 'plastic tube',
    'masterbatch', 'color concentrate', 'flame retardant compound',
    'engineering plastic', 'specialty polymer', 'bio-based plastic',
    'rubber', 'foam', 'latex', 'vinyl', 'resin',
    'natural rubber sheet', 'latex foam', 'latex sheet', 'latex material',
    'vinyl sheet', 'vinyl film', 'vinyl material', 'pvc vinyl',
    'pet resin', 'petg', 'petg sheet', 'pet bottle resin',
    'neoprene', 'neoprene rubber', 'neoprene sheet', 'neoprene foam',
    'butyl rubber', 'butyl', 'iir rubber', 'chlorobutyl',
    'polystyrene', 'eps', 'expandable polystyrene', 'hips plastic',
    'acrylic sheet', 'acrylic resin', 'acrylic glass', 'pmma sheet',
    'polycarbonate sheet', 'polycarbonate resin', 'pc sheet',
    'pu rubber', 'foam sheet', 'foam block', 'foam roll', 'foam slab'
  ])) return 'plastics'

  // Priority 2: Specific industrial components (magnets, bearings, seals, etc.)
  // Must be before automotive to catch "magnets for cars/visors" → industrial category
  if (match([
    'magnet', 'neodymium', 'ndfeb', 'ferrite magnet', 'permanent magnet',
    'bearing', 'roller bearing', 'ball bearing', 'needle bearing',
    'fastener', 'paper clip', 'paperclip', 'paper clips', 'paperclips', 'binder clip', 'binder clips', 'staple', 'stapler', 'office clip',
    'o-ring', 'gasket', 'seal ring', 'lip seal',
    'actuator', 'solenoid', 'precision gear', 'worm gear', 'helical gear',
    'industrial motor', 'servo motor', 'stepper motor',
    'spring component', 'disc spring', 'compression spring',
    'coil spring', 'torsion spring', 'leaf spring', 'helical spring',
    'extension spring', 'spring steel wire', 'spring washer',
    'hydraulic fitting', 'pneumatic valve', 'precision machined',
    'sintered', 'powder metallurgy',
    'screw', 'machine screw', 'wood screw', 'self-tapping screw', 'hex screw',
    'bolt', 'hex bolt', 'carriage bolt', 'anchor bolt', 'stud bolt', 'eye bolt',
    'hex nut', 'lock nut', 'wing nut', 'coupling nut', 'flange nut',
    'washer', 'flat washer', 'lock washer', 'spring washer', 'tab washer',
    'rivet', 'blind rivet', 'pop rivet', 'solid rivet', 'tubular rivet',
    'hinge', 'door hinge', 'piano hinge', 'butt hinge', 'concealed hinge',
    'bracket', 'angle bracket', 'corner bracket', 'mounting bracket', 'shelf bracket',
    'flange', 'pipe flange', 'weld neck flange', 'slip-on flange', 'blind flange',
    'coupling', 'shaft coupling', 'flexible coupling', 'rigid coupling', 'hose coupling',
    'bushing', 'sleeve bushing', 'flanged bushing', 'bronze bushing',
    'needle', 'industrial needle', 'knitting needle', 'sewing machine needle',
    'pipe', 'steel pipe', 'seamless pipe', 'welded pipe', 'pipe fitting',
    'elbow fitting', 'tee fitting', 'reducer fitting', 'pipe nipple',
    'dowel pin', 'cotter pin', 'clevis pin', 'split pin', 'roll pin',
    'key stock', 'keyway', 'woodruff key',
    'chain', 'roller chain', 'conveyor chain', 'drive chain', 'link chain'
  ])) return 'industrial'

  // Priority 3: Specific metals and minerals (raw material level)
  if (match([
    'lithium', 'cobalt', 'neodymium oxide', 'rare earth mineral',
    'titanium sponge', 'tungsten', 'molybdenum', 'platinum',
    'palladium', 'nickel ore', 'iron ore', 'copper ore',
    'steel coil', 'steel sheet', 'aluminum ingot', 'aluminum billet',
    'copper cathode', 'zinc ingot', 'tin ingot'
  ])) return 'metals'

  // Priority 3: Automotive applications/platforms
  if (match([
    'automotive', 'vehicle', 'sun visor', 'visor', 'headliner',
    'instrument panel', 'dashboard', 'bumper', 'chassis',
    'suspension', 'brake pad', 'powertrain', 'motor vehicle',
    'tier-1', 'tier 1', 'tier-2', 'oem automotive',
    'nafta', 'usmca', 'ford', 'gm ', 'toyota', 'honda',
    'bmw', 'mercedes', 'stellantis', 'rivian', 'seat assembly',
    'window regulator', 'door panel', 'fuel system',
    // Compound material+automotive terms — must be checked before the
    // standalone material-only lists below (e.g. "leather car seats"
    // would otherwise match "leather" under textiles and never reach
    // the generic "car" keyword, which is checked much later).
    'car seat', 'car seats', 'auto seat', 'vehicle seat', 'seat cover',
    'seat trim', 'auto upholstery', 'vehicle upholstery', 'car interior',
    'car door', 'car body', 'auto body panel', 'car wiring', 'wire harness',
    'trim', 'interior trim', 'plated trim', 'door trim', 'plastic trim',
    'cargo shade', 'cargo cover', 'shade cover', 'window shade', 'sunshade',
    'cargo liner', 'boot liner', 'parcel shelf', 'tonneau', 'boot cover',
    'interior accessory', 'interior component',
    'lumbar support automotive', 'lumbar support seat', 'lumbar cushion car',
    'lumbar support', 'lumbar pillow', 'lumbar pad', 'lumbar cushion'
  ])) return 'automotive'

  // Priority 4: Electronics and semiconductors
  if (match([
    'semiconductor', 'wafer', 'pcb', 'printed circuit',
    'display panel', 'lcd', 'oled', 'processor', 'memory chip',
    'microchip', 'microcontroller', 'fpga',
    'asic chip', 'asic design', 'custom asic',
    'ic chip', 'logic chip', 'chip component', 'chip package', 'bare chip',
    'glass panel', 'cover glass', 'camera module',
    'iphone', 'samsung phone', 'tsmc', 'apple supply',
    'circuit board', 'nand', 'dram', 'hbm',
    'monitor', 'computer monitor', 'display monitor', 'curved monitor',
    'gaming monitor', 'monitor screen', '4k monitor', '1080p monitor',
    'screen', 'flat screen', 'touch screen', 'touchscreen', 'led screen',
    'television', 'smart tv', 'led tv', 'oled tv', 'qled tv', '4k tv', 'tv screen',
    'tv panel', 'flat panel tv', 'streaming device',
    'projector', 'laser projector', 'dlp projector', 'home projector',
    'printer', 'inkjet printer', 'laser printer', '3d printer',
    'keyboard', 'mechanical keyboard', 'wireless keyboard', 'computer keyboard',
    'mouse', 'computer mouse', 'wireless mouse', 'gaming mouse',
    'headphone', 'earphone', 'earbuds', 'wireless headphone', 'noise cancelling',
    'speaker', 'bluetooth speaker', 'portable speaker', 'smart speaker',
    'webcam', 'usb camera', 'security camera', 'ip camera', 'cctv camera',
    'router', 'wifi router', 'network switch', 'modem', 'access point',
    'hard drive', 'ssd', 'solid state drive', 'hdd', 'nvme',
    'ddr ram', 'computer ram', 'ram module', 'sdram', 'sram chip',
    'memory module', 'ddr4', 'ddr5', 'dimm'
  ])) return 'electronics'

  // Pre-G0: Packaging containers that contain food substrings
  //   'drum' contains 'rum', so must be caught before food P5a fires
  if (match([
    'drum', 'steel drum', 'plastic drum', 'fiber drum', 'ibc drum',
    'chemical drum', 'drum packaging', 'open head drum', 'closed head drum',
    'wooden barrel', 'oak barrel', 'wine barrel', 'barrel drum'
  ])) return 'packaging'

  // Pre-G: Wood species & industrial fibers that contain food substrings
  //   'teak' contains 'tea', 'twine' contains 'wine' → protect before food P5a
  if (match([
    'teak', 'teak wood', 'teak plank', 'teak timber', 'teak furniture', 'teak deck',
    'mahogany', 'rosewood', 'ebony wood', 'balsa wood', 'balsawood',
    'twine', 'baling twine', 'sisal twine', 'jute twine', 'hemp twine', 'garden twine'
  ])) return 'wood_paper'

  // Priority 5a: Processed food, confectionery, CPG, beverages — BEFORE raw agriculture
  if (match([
    // Confectionery & candy
    'marshmallow', 'candy', 'confectionery', 'confection', 'gummy', 'gummies',
    'chocolate', 'cocoa powder', 'praline', 'truffle', 'fudge', 'caramel',
    'hard candy', 'soft candy', 'lollipop', 'nougat', 'marzipan', 'fondant',
    'sugar confection', 'sugar coated', 'jelly bean', 'licorice',
    // Snacks & baked goods
    'cookie', 'biscuit', 'cracker', 'pretzel', 'potato chip',
    'tortilla chip', 'popcorn', 'granola bar', 'protein bar', 'energy bar',
    'bread', 'bakery', 'pastry', 'croissant', 'muffin', 'donut', 'doughnut',
    'cake mix', 'baking mix', 'flour based', 'cereal', 'breakfast cereal',
    'wafer', 'waffle', 'pancake mix',
    'sourdough', 'tortilla', 'flatbread', 'pita bread', 'pita wrap', 'pita pocket', 'granola', 'oatmeal', 'porridge',
    'gluten free', 'trail mix', 'dried fruit', 'fruit snack', 'nut snack',
    'mixed nuts', 'roasted nuts', 'nuts and', 'seeds mix', 'sunflower seed', 'pumpkin seed',
    // Pasta, noodles, grains (processed)
    'pasta', 'noodle', 'instant noodle', 'ramen', 'spaghetti', 'macaroni',
    // Processed meats (all types)
    'sausage', 'pepperoni', 'salami', 'chorizo', 'mortadella', 'bologna',
    'pastrami', 'prosciutto', 'deli meat', 'lunch meat', 'luncheon meat',
    'hot dog', 'frankfurter', 'wiener',
    'bratwurst', 'brat ', 'kielbasa', 'andouille', 'merguez', 'liverwurst',
    'summer sausage', 'breakfast sausage', 'italian sausage', 'pork sausage',
    'bacon', 'ham slice', 'cured ham', 'smoked ham', 'smoked meat', 'cured meat',
    'jerky', 'meat snack', 'charcuterie',
    // Seafood (processed/packaged)
    'smoked salmon', 'salmon fillet', 'salmon steak', 'salmon portion',
    'canned tuna', 'tuna can', 'tuna steak', 'sardine', 'anchovy',
    'cod fillet', 'cod fish', 'tilapia', 'halibut', 'haddock', 'pollock',
    'mahi mahi', 'sea bass', 'trout fillet', 'catfish fillet',
    'shrimp frozen', 'frozen shrimp', 'lobster tail', 'lobster meat', 'fish fillet',
    'crab meat', 'crab leg', 'canned fish', 'seafood product', 'seafood pack',
    // Sauces, condiments & flavoring
    'ketchup', 'hot sauce', 'soy sauce', 'oyster sauce', 'fish sauce',
    'mayonnaise', 'mustard', 'salad dressing', 'vinegar', 'seasoning mix',
    'spice blend', 'flavor extract', 'food flavoring', 'food coloring',
    'gelatin', 'pectin', 'agar agar', 'food additive', 'preservative',
    'food ingredient', 'flavor compound',
    'tomato paste', 'pizza sauce', 'bbq sauce', 'sriracha', 'teriyaki',
    'hummus', 'salsa', 'peanut butter', 'almond butter',
    'jam', 'jelly', 'jelly preserve', 'maple syrup', 'honey jar', 'honey pack',
    'royal jelly', 'fruit jelly', 'jello',
    // Oils & fats (edible)
    'olive oil', 'vegetable oil', 'cooking oil', 'sunflower oil',
    'coconut oil', 'sesame oil', 'canola oil', 'edible oil',
    // Spices, seasonings & dry ingredients
    'flour baking', 'baking flour',
    'granulated sugar', 'table salt', 'sea salt', 'kosher salt', 'rock salt',
    'pink salt', 'himalayan salt', 'iodized salt', 'curing salt', 'pickling salt',
    'salt flakes', 'sea salt flakes', 'fleur de sel', 'salt',
    'brown sugar', 'cane sugar', 'powdered sugar', 'icing sugar', 'raw sugar',
    'demerara sugar', 'sugar crystals', 'sugar',
    'sodium chloride', 'food grade salt',
    'spices', 'cinnamon', 'turmeric', 'dried herbs', 'garlic powder',
    'onion powder', 'paprika', 'cumin', 'oregano', 'black pepper',
    // Beverages
    'juice', 'fruit juice', 'soft drink', 'cola drink', 'lemonade',
    'kombucha', 'carbonated water', 'sparkling water', 'iced tea',
    'energy drink', 'sports drink', 'bottled water', 'mineral water',
    'tea blend', 'instant coffee', 'coffee pod',
    // Dairy, eggs & alternatives
    'milk powder', 'baby formula', 'infant formula', 'powdered milk',
    'cheese', 'mozzarella', 'cheddar', 'cream cheese', 'cottage cheese',
    'yogurt', 'greek yogurt', 'kefir', 'butter',
    'heavy cream', 'whipping cream', 'sour cream', 'cooking cream', 'double cream',
    'ice cream', 'gelato', 'frozen dessert',
    'egg product', 'liquid egg', 'dried egg',
    // Plant-based & specialty
    'tofu', 'tempeh', 'plant based meat', 'vegan burger', 'vegan protein',
    'oat milk', 'almond milk', 'soy milk',
    // Canned & frozen convenience foods
    'canned soup', 'canned beans', 'canned vegetable', 'canned fruit',
    'frozen pizza', 'frozen vegetable', 'frozen fries', 'french fries', 'frozen meal',
    'microwave meal', 'ready meal', 'meal kit', 'instant meal',
    // Nutrition & supplements (food-grade)
    'whey protein', 'protein shake', 'meal replacement', 'baby food',
    'infant cereal', 'sports supplement', 'nutrition bar',
    // Sweeteners & functional ingredients
    'sweetener', 'corn syrup', 'high fructose', 'sugar substitute', 'stevia',
    'sorbitol food', 'maltitol food', 'xylitol food', 'erythritol',
    // CPG / packaged food general
    'packaged food', 'food manufacturing', 'food product', 'food brand',
    'consumer food', 'snack food', 'private label food', 'co-manufacturing food',
    'frozen food', 'sauce',
    // ── Staple grains & starches ──
    'rice', 'white rice', 'brown rice', 'jasmine rice', 'basmati rice', 'arborio rice',
    'wild rice', 'instant rice', 'parboiled rice', 'rice flour',
    'wheat', 'durum wheat', 'hard wheat', 'soft wheat', 'wheat berry', 'wheat kernel',
    'corn', 'corn starch', 'corn syrup grain', 'corn kernel', 'corn meal',
    'barley', 'pearl barley', 'barley malt', 'barley flour', 'malted barley',
    'rye', 'rye flour', 'rye bread', 'rye grain',
    'millet', 'sorghum grain', 'teff', 'amaranth grain', 'quinoa',
    'buckwheat', 'spelt', 'emmer wheat',
    'flour', 'plain flour', 'self-raising flour', 'corn flour',
    // ── Meat, poultry & seafood (raw/fresh/bulk) ──
    'beef', 'beef cut', 'ground beef', 'minced beef', 'beef loin', 'beef chuck',
    'beef rib', 'beef round', 'beef brisket', 'beef sirloin', 'beef tenderloin',
    'veal', 'wagyu', 'angus beef', 'grass-fed beef',
    'pork', 'pork chop', 'pork loin', 'pork ribs', 'pork shoulder', 'pork tenderloin',
    'pork rind', 'suckling pig', 'piglet',
    'chicken', 'chicken breast', 'chicken thigh', 'chicken leg', 'chicken wing',
    'chicken drumstick', 'whole chicken', 'broiler chicken', 'free-range chicken',
    'lamb', 'lamb chop', 'lamb leg', 'lamb rack', 'lamb shoulder', 'mutton',
    'turkey', 'turkey breast', 'turkey leg', 'whole turkey',
    'duck', 'duck breast', 'duck leg', 'goose',
    'fish', 'fresh fish', 'whole fish', 'fish portion', 'frozen fish',
    'shrimp', 'raw shrimp', 'fresh shrimp', 'prawn', 'king prawn', 'tiger prawn',
    'salmon', 'fresh salmon', 'atlantic salmon', 'pacific salmon', 'salmon roe',
    'tuna', 'fresh tuna', 'bluefin tuna', 'yellowfin tuna', 'skipjack tuna',
    'squid', 'octopus', 'clam', 'mussel', 'oyster', 'scallop', 'abalone',
    // ── Dairy & eggs ──
    'milk', 'fresh milk', 'whole milk', 'skim milk', 'low-fat milk',
    'uhp milk', 'uht milk', 'organic milk',
    'egg', 'eggs', 'fresh egg', 'free-range egg', 'egg white', 'egg yolk',
    // ── Produce (fresh) ──
    'tomato', 'cherry tomato', 'roma tomato', 'beef tomato', 'tomato fresh',
    'potato', 'sweet potato', 'russet potato', 'red potato', 'gold potato',
    'onion', 'red onion', 'yellow onion', 'white onion', 'spring onion',
    'garlic', 'garlic fresh', 'garlic bulb', 'garlic clove', 'garlic head',
    'ginger', 'fresh ginger', 'ginger root', 'baby ginger',
    'pepper', 'bell pepper', 'red pepper', 'green pepper', 'yellow pepper',
    'chili pepper', 'chilli pepper', 'jalapeño', 'habanero', 'cayenne pepper',
    'carrot', 'baby carrot', 'carrot fresh', 'carrot juice',
    'spinach', 'baby spinach', 'spinach fresh', 'spinach leaf',
    'avocado', 'fresh avocado', 'avocado oil', 'hass avocado',
    'mango', 'fresh mango', 'mango fresh', 'mango slice',
    'banana', 'fresh banana', 'cavendish banana', 'plantain',
    'apple', 'fresh apple', 'granny smith', 'fuji apple', 'gala apple',
    'orange', 'fresh orange', 'navel orange', 'blood orange',
    'lemon', 'fresh lemon', 'lime', 'key lime', 'lemon fresh',
    'strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry',
    'grape', 'kiwi', 'pineapple', 'watermelon', 'cantaloupe', 'honeydew',
    'peach', 'plum', 'cherry', 'fig', 'date fruit', 'pomegranate',
    'pear', 'papaya', 'guava', 'passion fruit', 'dragon fruit', 'lychee',
    'asparagus', 'broccoli', 'cauliflower', 'cabbage', 'kale', 'lettuce',
    'celery', 'leek', 'fennel', 'artichoke', 'brussels sprout',
    'mushroom', 'shiitake', 'oyster mushroom', 'porcini', 'truffle mushroom',
    'corn fresh', 'sweet corn', 'corn on the cob', 'corn cobette',
    'wheat fresh', 'wheat product',
    // ── Beverages (bare) ──
    'tea', 'green tea', 'black tea', 'white tea', 'oolong tea', 'herbal tea',
    'chamomile tea', 'peppermint tea', 'matcha', 'chai', 'loose leaf tea', 'tea bag',
    'coffee', 'ground coffee', 'whole bean coffee', 'arabica', 'robusta', 'espresso',
    'filter coffee', 'decaf coffee', 'cold brew coffee',
    'wine', 'red wine', 'white wine', 'rose wine', 'sparkling wine',
    'champagne', 'prosecco', 'cava wine',
    'beer', 'craft beer', 'lager', 'ale', 'stout', 'pilsner', 'ipa beer',
    'spirits', 'distilled spirits', 'whiskey', 'whisky', 'bourbon',
    'scotch whisky', 'irish whiskey', 'single malt',
    'vodka', 'rum', 'dark rum', 'white rum', 'spiced rum',
    'tequila', 'mezcal', 'brandy', 'cognac', 'liqueur',
    'cider', 'hard cider', 'mead', 'sake', 'baijiu',
    'drink', 'beverage', 'refreshment drink',
    'spring water', 'still water', 'alkaline water', 'flavored water',
    // ── Pantry & basics ──
    'broth', 'stock', 'chicken broth', 'beef broth', 'vegetable broth',
    'soup', 'instant soup', 'noodle soup', 'cream soup',
    'snack', 'bar snack', 'savory snack', 'healthy snack',
    'oats', 'rolled oats', 'steel cut oats', 'oat bran', 'oat flour', 'oatmeal', 'porridge oats',
    'lentil', 'red lentil', 'green lentil', 'lentil soup',
    'chickpea', 'garbanzo', 'split pea', 'black bean', 'kidney bean', 'navy bean',
    'nut', 'almond', 'walnut', 'cashew', 'pistachio', 'hazelnut', 'pecan',
    'macadamia', 'pine nut', 'brazil nut',
    'seed', 'chia seed', 'flax seed', 'sesame seed', 'hemp seed', 'poppy seed',
    'dried mango', 'dried cranberry', 'dried apricot', 'dried blueberry'
  ])) return 'food'

  // Priority 5b: Raw agriculture and commodities
  if (match([
    'raw beef', 'beef cattle', 'beef carcass', 'raw meat', 'meat packing',
    'raw chicken', 'raw pork', 'pork belly raw', 'pork loin raw',
    'raw wheat', 'wheat grain', 'wheat harvest', 'raw soybean', 'soybean crop',
    'soy crop', 'agri', 'raw corn', 'corn crop', 'grain crop', 'grain harvest',
    'grain storage', 'feed grain', 'animal feed', 'feed ingredient',
    'dairy farm', 'raw milk', 'coffee bean', 'cocoa bean', 'raw cocoa',
    'sugar cane', 'raw rice', 'paddy rice',
    'fast food supply', 'food processing plant',
    'protein powder', 'palm oil crude', 'crude palm', 'crop',
    'livestock', 'poultry farm', 'aquaculture', 'fishery', 'seafood raw',
    'fertilizer', 'fertiliser', 'npk fertilizer', 'nitrogen fertilizer',
    'potassium fertilizer', 'phosphate fertilizer', 'organic fertilizer',
    'urea fertilizer', 'ammonium nitrate fertilizer', 'dap fertilizer',
    'hay', 'baled hay', 'alfalfa hay', 'timothy hay', 'straw bale',
    'silage', 'corn silage', 'grass silage', 'haylage',
    'seed corn', 'seed wheat', 'seed potato', 'soybean seed', 'rapeseed', 'canola seed',
    'sunflower seed crop', 'cotton seed', 'flax seed crop',
    'irrigation', 'drip irrigation', 'sprinkler irrigation', 'pivot irrigation',
    'compost', 'organic compost', 'vermicompost', 'compost tea agri',
    'aquafeed', 'fish feed', 'shrimp feed', 'salmon feed', 'tilapia feed',
    'poultry feed', 'layer feed', 'broiler feed', 'swine feed', 'cattle feed',
    'pesticide agri', 'herbicide agri', 'fungicide agri', 'insecticide agri',
    'pesticide', 'herbicide', 'fungicide',
    'crop protection', 'plant protection', 'agrochemical'
  ])) return 'agriculture'

  // Priority 6: Chemicals — adhesives, coatings, lubricants, solvents, surfactants
  // Before metals so "epoxy coating for metal" → chemicals, not metals
  if (match([
    'adhesive', 'glue', 'sealant', 'bonding agent', 'epoxy adhesive',
    'masking tape', 'duct tape', 'double sided tape', 'foam tape', 'adhesive tape',
    'coating', 'paint', 'primer', 'varnish', 'lacquer', 'powder coat',
    'lubricant', 'grease', 'cutting fluid', 'hydraulic fluid', 'coolant fluid',
    'solvent', 'thinner', 'acetone', 'mek', 'ipa ', 'isopropanol',
    'surfactant', 'detergent intermediate', 'emulsifier',
    'resin system', 'hardener', 'curing agent', 'catalyst',
    'ink formulation', 'printing ink', 'offset ink', 'uv ink', 'flexo ink',
    'gravure ink', 'inkjet ink', 'screen printing ink', 'digital ink', 'ink pigment',
    'pigment dispersion', 'pigment concentrate', 'pigment', 'colorant chemical',
    'textile dye', 'reactive dye', 'disperse dye', 'acid dye', 'vat dye',
    'direct dye', 'fiber reactive dye', 'dye powder', 'dye chemical',
    'chemical compound', 'specialty chemical', 'fine chemical',
    'industrial chemical', 'process chemical', 'chemical raw material',
    'acid', 'sulfuric acid', 'hydrochloric acid', 'nitric acid', 'phosphoric acid',
    'citric acid', 'acetic acid', 'lactic acid', 'formic acid', 'tartaric acid',
    'bleach', 'sodium hypochlorite', 'chlorine', 'chlorine gas', 'chlor-alkali',
    'ammonia', 'ammonium hydroxide', 'ammonia solution',
    'wax', 'carnauba wax', 'beeswax', 'synthetic wax', 'wax emulsion',
    'ethanol', 'ethyl alcohol', 'industrial ethanol', 'denatured ethanol',
    'methanol', 'methyl alcohol', 'isopropanol ipa',
    'pesticide', 'herbicide', 'insecticide', 'fungicide', 'biocide', 'rodenticide',
    'chemical intermediate', 'monomer', 'polymer chemical'
  ])) return 'chemicals'

  // Priority 7: Metals (broader terms)
  if (match([
    'steel', 'aluminum', 'aluminium', 'copper', 'iron',
    'zinc', 'tin ore', 'tinplate', 'tin metal', 'tin alloy',
    'gold', 'silver', 'mineral', 'mining',
    'metal', 'alloy', 'casting', 'forging', 'smelting',
    'rare earth', 'critical mineral',
    'nickel', 'nickel alloy', 'nickel plate', 'nickel sheet',
    'titanium', 'titanium alloy', 'titanium sheet', 'titanium bar',
    'brass', 'brass rod', 'brass sheet', 'brass tube', 'brass fitting',
    'bronze', 'bronze alloy', 'phosphor bronze', 'bronze bushing',
    'chromium', 'chromium oxide', 'chrome plate', 'chromium plating',
    'rebar', 'deformed bar', 'reinforcement bar', 'steel rebar',
    'wire rod', 'steel wire rod', 'copper wire rod',
    'magnesium', 'magnesium alloy', 'magnesium ingot',
    'manganese', 'manganese steel', 'manganese ore',
    'lead', 'lead ingot', 'lead alloy', 'lead plate', 'lead sheet',
    'pewter', 'bismuth', 'antimony', 'vanadium',
    'silicon metal', 'silicon ingot', 'metallurgical silicon',
    'stainless steel', 'carbon steel', 'tool steel', 'spring steel',
    'galvanized steel', 'cold rolled steel', 'hot rolled steel',
    'aluminum sheet', 'aluminum coil', 'aluminum profile', 'aluminum extrusion',
    'copper tube', 'copper wire', 'copper sheet', 'copper rod'
  ])) return 'metals'

  // Priority 8: Textiles and apparel
  if (match([
    'shirt', 'shoe', 'sneaker', 'cotton', 'leather',
    'apparel', 'textile', 'clothing', 'garment',
    'denim', 'wool', 'silk', 'polyester', 'fabric',
    'yarn', 'knit', 'woven', 'fashion', 'footwear',
    'linen', 'linen fabric', 'linen yarn', 'belgian linen',
    'cashmere', 'cashmere yarn', 'cashmere wool',
    'viscose', 'viscose fabric', 'viscose yarn', 'viscose rayon',
    'rayon', 'modal fabric', 'lyocell', 'tencel', 'cupro',
    'spandex', 'elastane', 'lycra', 'spandex fiber',
    'fleece', 'polar fleece', 'micro fleece', 'fleece fabric',
    'velvet', 'velvet fabric', 'crushed velvet', 'velour',
    'canvas', 'canvas fabric', 'canvas material', 'duck canvas',
    'tweed', 'tweed fabric', 'harris tweed',
    'flannel', 'flannel fabric', 'flannel shirt material',
    'chiffon', 'organza', 'tulle', 'voile fabric',
    'thread', 'sewing thread', 'embroidery thread', 'stitching thread',
    'embroidery', 'embroidery fabric', 'embroidered fabric',
    'zipper', 'zip fastener', 'coil zipper', 'metal zipper', 'plastic zipper',
    'button', 'snap button', 'press stud', 'toggle button', 'shank button',
    'ribbon', 'satin ribbon', 'grosgrain ribbon', 'velvet ribbon',
    'lace', 'lace fabric', 'needle lace', 'guipure lace',
    'interfacing', 'interlining', 'fusible', 'lining fabric',
    'batting', 'wadding', 'quilt batting', 'upholstery fabric',
    'jacquard', 'brocade', 'damask', 'twill fabric', 'poplin'
  ])) return 'textiles'

  // Priority 11: Medical / pharma — APIs, devices, consumables
  // PROMOTED above packaging to prevent 'sterile packaging'/'stent'/'metal' misfires
  if (match([
    'lumbar implant', 'lumbar support brace', 'lumbar support medical', 'lumbar spine', 'lumbar',
    'api ', 'active pharmaceutical', 'drug substance', 'excipient',
    'generic drug', 'pharmaceutical', 'pharma ingredient', 'synthesis api',
    'medical device', 'surgical instrument', 'disposable medical',
    'iv bag', 'syringe', 'catheter', 'stent', 'implant',
    'diagnostic kit', 'reagent', 'assay kit', 'lateral flow',
    'ppe kit', 'ppe equipment', 'ppe supply', 'ppe protective', 'personal protective equipment',
    'ppe', 'safety gloves', 'hard hat', 'safety vest', 'safety boots', 'work gloves', 'safety helmet',
    'nitrile glove', 'latex glove', 'nitrile', 'surgical glove', 'surgical mask', 'n95',
    'glove', 'bandage', 'gauze', 'wound dressing', 'medical tape', 'plaster bandage',
    'drug', 'vitamin', 'antibiotic', 'vaccine', 'capsule', 'tablet capsule',
    'vial', 'ampoule', 'blister tablet',
    'hospital supply', 'clinical supply', 'sterile packaging',
    'fda approved', 'gmp certified', 'iso 13485', 'ce marked device',
    'hpmc', 'excipient grade', 'usp standard', 'ep standard',
    'microfluidic', 'point of care test', 'rapid test kit', 'elisa kit',
    'mask', 'surgical mask', 'dust mask', 'face mask medical', 'mask n95', 'mask surgical',
    'mask ffp2', 'mask ffp3', 'respirator mask', 'medical mask',
    'protective mask', 'disposable mask'
  ])) return 'medical'

  // Priority 12: Consumer goods & personal care
  // PROMOTED above textiles and packaging to prevent 'fabric'/'label'/'cream'/'aluminum' misfires
  if (match([
    'shampoo', 'conditioner', 'body wash', 'shower gel', 'bar soap', 'hand soap',
    'liquid soap', 'hand sanitizer', 'toothpaste', 'mouthwash', 'toothbrush',
    'deodorant', 'antiperspirant', 'sunscreen', 'spf lotion', 'sunblock',
    'cosmetics', 'foundation', 'lipstick', 'mascara', 'eyeshadow',
    'lip gloss', 'concealer', 'blush', 'makeup', 'eye liner', 'bb cream',
    'perfume', 'fragrance', 'cologne', 'body spray', 'eau de parfum',
    'facial cleanser', 'moisturizer', 'face serum', 'toner skincare',
    'hair dye', 'hair color', 'hair spray', 'hair gel', 'hair wax', 'hair mask',
    'liquid detergent', 'laundry detergent', 'fabric softener', 'fabric conditioner',
    'dishwashing liquid', 'dish soap', 'household cleaner', 'bathroom cleaner',
    'personal care', 'beauty product', 'hygiene product', 'consumer goods',
    'skin care', 'skincare product', 'oem beauty', 'private label cosmetic',
    'vaseline', 'lip balm', 'chapstick', 'hand lotion', 'body lotion',
    'baby lotion', 'baby oil', 'baby powder', 'baby shampoo', 'baby wash',
    'wet wipe', 'baby wipe', 'facial wipe', 'cleansing wipe',
    'diaper', 'nappy', 'adult diaper', 'training pants', 'incontinence pad',
    'razor', 'razor blade', 'shaving razor', 'disposable razor', 'electric razor',
    'shaving cream', 'shaving gel', 'shaving foam', 'aftershave',
    'nail polish', 'nail varnish', 'nail gel', 'nail lacquer', 'nail care',
    'nail file', 'nail clipper', 'nail buffer',
    'lotion', 'hand lotion', 'body cream lotion',
    'floss', 'dental floss', 'floss pick', 'interdental brush',
    'hair comb', 'wide tooth comb', 'detangling comb', 'fine tooth comb',
    'hair brush', 'hair clip', 'bobby pin', 'hair tie', 'scrunchie',
    'cotton swab', 'cotton ball', 'cotton pad', 'q-tip',
    'feminine hygiene', 'sanitary pad', 'tampon', 'menstrual cup', 'panty liner',
    'condom', 'contraceptive',
    'dental care', 'electric toothbrush', 'water flosser', 'tongue scraper',
    'whitening strip', 'teeth whitening',
    'hair removal', 'wax strip', 'depilatory cream', 'epilator',
    'face wash', 'micellar water', 'cleansing balm', 'toner pad',
    'eye cream', 'under eye patch', 'collagen mask',
    'foot cream', 'foot scrub', 'heel balm', 'hand sanitizer gel'
  ])) return 'consumer_goods'

  // Priority 13: Construction materials
  // PROMOTED above packaging and machinery to prevent 'pump'/'packaging' misfires
  if (match([
    'flat glass pane', 'tempered glass', 'borosilicate', 'glass fiber', 'glass wool',
    'float glass', 'architectural glass', 'safety glass', 'laminated glass',
    'cement', 'concrete block', 'clay brick', 'masonry',
    'ceramic tile', 'porcelain tile', 'floor tile', 'wall tile',
    'roofing material', 'roof shingle', 'insulation board', 'foam insulation',
    'drywall', 'gypsum board', 'plasterboard', 'wallboard',
    'aggregate', 'gravel', 'sand quarry', 'stone tile', 'marble slab',
    'granite countertop', 'basalt fiber', 'basalt rock', 'basalt stone', 'basalt',
    'construction material', 'building material',
    'concrete', 'concrete mix', 'concrete slab', 'precast concrete', 'reinforced concrete',
    'brick', 'clay brick', 'fire brick', 'face brick', 'engineering brick', 'brick paver',
    'tile', 'floor tile', 'wall tile', 'porcelain tile', 'ceramic tile', 'mosaic tile',
    'roof tile', 'paving tile', 'terracotta tile',
    'window', 'window frame', 'double glazed window', 'aluminium window', 'upvc window',
    'glass', 'glazing', 'double glazing', 'triple glazing', 'glass pane',
    'insulation', 'thermal insulation', 'mineral wool', 'rock wool', 'glass wool',
    'acoustic insulation', 'pipe insulation', 'rigid insulation',
    'mortar', 'mortar mix', 'refractory mortar', 'tile mortar', 'grout',
    'asphalt', 'bituminous', 'asphalt concrete', 'hot mix asphalt',
    'bitumen', 'modified bitumen', 'bitumen membrane', 'bitumen felt',
    'conduit', 'electrical conduit', 'rigid conduit', 'flexible conduit', 'pvc conduit',
    'scaffolding', 'formwork', 'shuttering', 'shoring',
    'steel structure', 'structural steel', 'steel beam', 'steel column',
    'roofing', 'metal roofing', 'membrane roofing', 'green roof system',
    'waterproofing', 'waterproof membrane', 'tanking system'
  ])) return 'construction'

  // Priority 14: Packaging — corrugated, glass containers, labels, flexible, protective
  if (match([
    'paper cup', 'paper cups', 'paper plate', 'paper plates', 'paper bowl', 'paper bowls',
    'paper bag', 'paper bags', 'paper packaging', 'paper tray', 'paper trays',
    'disposable cup', 'plastic cup', 'foam cup', 'coffee cup', 'drinking cup', 'cups',
    'disposable plate', 'plastic plate', 'foam plate',
    'corrugated box', 'corrugated carton', 'cardboard box', 'shipping box',
    'glass bottle', 'glass jar', 'glass container', 'glass vial',
    'product label', 'shipping label', 'adhesive label', 'barcode label',
    'peel label', 'pressure sensitive label', 'shrink sleeve', 'rfid label',
    'blister pack', 'clamshell pack', 'thermoformed tray',
    'flexible pouch', 'stand-up pouch', 'retort pouch', 'sachet',
    'stretch hood', 'hood film', 'stretch film', 'shrink film',
    'packaging material', 'packaging film', 'barrier film',
    'bubble wrap', 'foam packaging', 'void fill',
    'pallet wrap', 'stretch wrap', 'strapping',
    'folding carton', 'paperboard carton', 'aseptic carton',
    'packaging', 'container packaging', 'retail packaging',
    'bottle', 'plastic bottle', 'pet bottle', 'glass bottle', 'bottle cap', 'bottle closure',
    'box', 'cardboard box', 'product box', 'gift box', 'flat box', 'subscription box',
    'pallet', 'wooden pallet', 'plastic pallet', 'export pallet', 'euro pallet',
    'foil', 'aluminum foil', 'aluminium foil', 'foil pouch', 'foil wrap', 'foil liner',
    'tape', 'sealing tape', 'packing tape', 'adhesive tape', 'masking tape', 'duct tape',
    'lid', 'metal lid', 'plastic lid', 'snap lid', 'screw cap', 'tamper evident lid',
    'tin can', 'steel can', 'aluminum can', 'beverage can', 'food can', 'aerosol can',
    'drum', 'steel drum', 'plastic drum', 'fiber drum', 'ibc drum', 'chemical drum',
    'wrap', 'stretch wrap pallet', 'cling wrap', 'plastic wrap',
    'tray', 'blister tray', 'plastic tray', 'pulp tray', 'foam tray',
    'tube', 'squeeze tube', 'laminate tube', 'aluminium tube',
    'bag', 'zip bag', 'stand up bag', 'kraft bag', 'polybag', 'poly bag', 'mailer bag',
    'jar', 'glass jar', 'plastic jar', 'wide mouth jar',
    'case', 'display case', 'master case', 'shipping case',
    'insert', 'cardboard insert', 'foam insert', 'paper insert'
  ])) return 'packaging'

  // Priority 15: Machinery — pumps, valves, compressors, CNC, industrial equipment
  if (match([
    'pump', 'centrifugal pump', 'vacuum pump', 'gear pump', 'peristaltic pump',
    'valve', 'ball valve', 'gate valve', 'check valve', 'control valve',
    'compressor', 'air compressor', 'screw compressor', 'piston compressor',
    'cnc machine', 'cnc machining center', 'cnc lathe', 'cnc mill',
    'machine tool', 'grinding machine', 'turning center', 'machining center',
    'industrial robot', 'robotic arm', 'automation equipment',
    'conveyor', 'conveyor belt', 'material handling equipment',
    'heat exchanger', 'pressure vessel', 'reactor vessel',
    'industrial fan', 'blower', 'dust collector',
    'welding equipment', 'plasma cutter', 'laser cutter',
    'crane', 'forklift', 'lifting equipment',
    'gearbox', 'reducer', 'servo drive', 'vfd', 'variable frequency drive',
    'machinery', 'industrial equipment', 'capital equipment', 'plant equipment',
    'generator', 'diesel generator', 'gas generator', 'standby generator',
    'tractor', 'farm tractor', 'utility tractor', 'compact tractor',
    'turbine', 'steam turbine', 'gas turbine', 'wind turbine', 'hydro turbine',
    'motor', 'electric motor', 'induction motor', 'ac motor', 'dc motor',
    'engine', 'diesel engine', 'gasoline engine', 'combustion engine',
    'drill', 'drilling machine', 'drill press', 'rock drill', 'core drill',
    'lathe', 'turning lathe', 'cnc lathe', 'metal lathe',
    'press', 'hydraulic press', 'punch press', 'stamping press', 'press brake',
    'forging press', 'power press', 'forming press',
    'extruder', 'plastic extruder', 'screw extruder', 'twin screw extruder',
    'mixer', 'industrial mixer', 'ribbon mixer', 'planetary mixer',
    'agitator', 'tank agitator', 'mixing agitator',
    'centrifuge', 'industrial centrifuge', 'decanter centrifuge',
    'filter press', 'membrane filter', 'belt filter',
    'dryer', 'spray dryer', 'fluid bed dryer', 'rotary dryer',
    'oven', 'industrial oven', 'curing oven', 'conveyor oven',
    'boiler', 'steam boiler', 'hot water boiler', 'fire tube boiler',
    'chiller', 'industrial chiller', 'process chiller', 'water chiller',
    'cooling tower', 'air handler', 'hvac unit', 'air conditioning unit',
    'combine harvester', 'grain harvester', 'forage harvester', 'sugarcane harvester',
    'excavator', 'bulldozer', 'loader', 'backhoe', 'skid steer', 'grader',
    'paving machine', 'road roller', 'asphalt paver'
  ])) return 'machinery'

  // Priority 16: Broader electronics/tech (lower confidence terms)
  if (match([
    'phone', 'computer', 'laptop', 'tablet', 'electronics',
    'sensor', 'battery cell', 'ev battery', 'battery pack',
    'cable', 'connector', 'power supply', 'charger',
    'battery', 'lithium battery', 'alkaline battery', 'rechargeable battery',
    'led light', 'led strip', 'led module', 'led lamp', 'led bulb', 'led driver',
    'led display', 'led panel', 'led chip', 'smd led', 'high power led',
    'resistor', 'smd resistor', 'through-hole resistor', 'resistor array',
    'capacitor', 'electrolytic capacitor', 'ceramic capacitor', 'film capacitor',
    'diode', 'zener diode', 'schottky diode', 'rectifier diode',
    'transistor', 'mosfet', 'bjt transistor', 'igbt transistor',
    'inductor', 'coil inductor', 'power inductor', 'ferrite core',
    'wire', 'copper wire', 'aluminum wire', 'electrical wire', 'magnet wire',
    'power cable', 'armored cable', 'switchgear', 'junction box', 'flexible conduit',
    'switch', 'toggle switch', 'push switch', 'rocker switch', 'dip switch',
    'relay', 'electromagnetic relay', 'solid state relay', 'relay module',
    'antenna', 'pcb antenna', 'wifi antenna', 'lte antenna', 'gps antenna',
    'transformer', 'power transformer', 'toroidal transformer', 'auto transformer',
    'fuse', 'blade fuse', 'glass fuse', 'smd fuse', 'fuse holder',
    'heat sink', 'aluminum heat sink', 'cpu heat sink', 'thermal pad',
    'pcba', 'pcb assembly', 'smt assembly', 'smd assembly',
    'oscillator', 'crystal oscillator', 'quartz crystal',
    'rfid', 'rfid tag', 'nfc chip', 'bluetooth module', 'wifi module',
    'display', 'lcd display', 'display panel', 'tft display', 'e-ink display',
    'controller', 'microcontroller', 'development board', 'arduino', 'raspberry pi',
    'charger', 'usb charger', 'wireless charger', 'power bank', 'adapter',
    'cable assembly', 'coaxial cable', 'ribbon cable', 'flat cable',
    'smartwatch', 'wearable', 'fitness tracker', 'smart band',
    'drone', 'drone component', 'esc', 'flight controller'
  ])) return 'electronics'

  // Priority 17: Broader automotive (lower confidence terms)
  if (match([
    'car ', 'cars', 'engine part', 'brake', 'tire', 'tyre',
    'transmission', 'exhaust', 'wheel', 'airbag',
    'windshield', 'auto part'
  ])) return 'automotive'

  // Priority 16: Wood, paper & pulp
  if (match([
    // Lumber & structural wood
    'lumber', 'plywood', 'mdf', 'hardboard', 'particleboard', 'osb board',
    'wood panel', 'wood plank', 'wood beam', 'wooden', 'timber',
    'construction lumber', 'softwood', 'hardwood', 'veneer',
    'engineered wood', 'cross laminated timber', 'glulam', 'chipboard',
    // Bare 'wood' and 'lumber' natural language
    'wood', 'raw wood', 'wood product', 'wood supply', 'wood material',
    'wooden pallet', 'wood frame', 'wood flooring', 'hardwood floor',
    'oak plank', 'pine board', 'cedar plank', 'birch', 'maple wood',
    // Furniture & wood-based products
    'wooden furniture', 'wood furniture', 'flat-pack', 'particle board',
    // Paper, pulp & cellulose
    'paper pulp', 'wood pulp', 'kraft paper', 'tissue paper', 'newsprint', 'paperboard',
    'cardstock', 'copy paper', 'office paper', 'printing paper', 'copier paper',
    'writing paper', 'coated paper', 'uncoated paper', 'fine paper',
    'toilet paper', 'paper towel', 'facial tissue', 'paper roll',
    'cardboard', 'corrugated paper', 'cardboard sheet', 'boxboard',
    // Publishing & educational
    'notebook', 'notepad', 'textbook', 'book printing', 'magazine paper',
    'newspaper print', 'stationery', 'paper products',
    // Pulp
    'pulp', 'wood pulp', 'paper pulp', 'cellulose',
    // Bare words (last resort — wide but important for UX)
    'paper'
  ])) return 'wood_paper'

  // No catalog match: callers must ask for clarification, not invent a category.
  return null
}

// ============================================================
// TARIFF DATABASE — HTS codes, duty rates, compliance notes
// ============================================================
export const TARIFF_DATABASE = {
  // Industrial / Magnets
  'magnet':          { code: '8505.11.00', base: '0% (ITA) / 25% (China Sec 301)', notes: 'Permanent magnets. China-origin NdFeB magnets subject to 25% Section 301 tariff. Japan/EU/Korea origin duty-free under FTAs.' },
  'neodymium':       { code: '8505.11.00', base: '0%–25%', notes: 'NdFeB permanent magnets. 25% if China-origin. ITAR/DFARS restrictions for defense applications.' },
  'bearing':         { code: '8482.10.50', base: '2.4%', notes: 'Ball bearings. Specific rates apply by type. Anti-dumping duties on some China/Thailand origins.' },
  'fastener':        { code: '7318.15.20', base: '5.7–8.5%', notes: 'Steel screws, bolts, nuts. AD/CVD orders on China-origin fasteners active.' },
  'seal':            { code: '4016.93.00', base: '2.6%', notes: 'Rubber gaskets and seals for mechanical applications.' },
  'actuator':        { code: '8412.39.00', base: '3.5%', notes: 'Linear actuators and motion control. Higher rates for pneumatic types.' },
  // Automotive
  'visor':           { code: '8708.29.50', base: '2.5%', notes: 'Sun visors as auto body parts (HTS 8708.29). 25% Sec 301 surcharge if China-origin.' },
  'seat':            { code: '9401.20.00', base: '0%', notes: 'Seats for motor vehicles.' },
  'windshield':      { code: '7007.21.10', base: '2.5%', notes: 'Laminated safety glass for vehicles.' },
  'engine':          { code: '8407.34.05', base: '2.5%', notes: 'Reciprocating piston engines for vehicles.' },
  'brake':           { code: '8708.30.50', base: '2.5%', notes: 'Brake systems and parts for motor vehicles.' },
  // Electronics
  'microchip':       { code: '8542.31.00', base: '0% (ITA)', notes: 'Processors and controllers. Free under Info Tech Agreement. Export controls on advanced nodes.' },
  'pcb':             { code: '8534.00.00', base: '0% (ITA)', notes: 'Printed circuits. ITA duty-free.' },
  'display':         { code: '8524.11.00', base: '0%', notes: 'Liquid crystal display panels.' },
  'glass panel':     { code: '7007.19.00', base: '5%', notes: 'Toughened safety glass for electronics.' },
  'battery':         { code: '8507.60.00', base: '3.4%', notes: 'Lithium-ion cells and battery packs. IRA sourcing requirements for EV incentives.' },
  // Agriculture
  'beef':            { code: '0202.30.50', base: '26.4%', notes: 'Frozen boneless beef. Subject to TRQ (Tariff Rate Quota). In-quota rate may be lower.' },
  'wheat':           { code: '1001.99.00', base: '$0.35/kg', notes: 'Other wheat and meslin.' },
  'soybean':         { code: '1201.90.00', base: '0%', notes: 'Soya beans, whether or not broken. Duty-free.' },
  'chicken':         { code: '0207.14.00', base: '17.6%', notes: 'Frozen poultry cuts.' },
  // Metals
  'lithium':         { code: '2836.91.00', base: '3.7%', notes: 'Lithium carbonates. Duty-free from Chile/Australia (FTA). IRA critical mineral designation.' },
  'steel':           { code: '7208.10.15', base: '0% + 25% (Sec 232)', notes: 'Subject to 25% Section 232 National Security Tariff. Quota agreements with some allies.' },
  'copper':          { code: '7403.11.00', base: '1.0%', notes: 'Refined copper cathodes. Low tariff, but monitor anti-dumping orders.' },
  'aluminum':        { code: '7601.20.90', base: '3.0% + 10% (Sec 232)', notes: 'Aluminum alloy ingots. Section 232 tariff applies. Some country exemptions in place.' },
  'cobalt':          { code: '8105.20.00', base: '1.5%', notes: 'Cobalt mattes and other intermediates. DRC origin requires RMI conflict minerals audit.' },
  // Textiles
  'shirt':           { code: '6109.10.00', base: '16.5%', notes: 'T-shirts, knitted or crocheted, of cotton.' },
  'shoes':           { code: '6404.11.00', base: '20.0%', notes: 'Sports footwear with rubber soles.' },
  'cotton':          { code: '5201.00.00', base: '$0.31/kg', notes: 'Cotton, not carded or combed. WRO restrictions on Xinjiang origin (UFLPA).' },
  'leather':         { code: '4107.11.00', base: '2.4%–5.3%', notes: 'Full-grain bovine leather, not further prepared. Rate varies by tanning/finish stage — confirm exact HTS subheading with a customs broker.' },
  'denim':           { code: '5209.42.00', base: '8.4%', notes: 'Denim fabric, cotton, woven.' }
}

export function lookupTariff(query) {
  const category = categorizeQuery(query)
  if (!category) return { hts: null, duty: null, notes: 'No catalog match. Refine the product description.', matched: false, confidence: 'unknown', category: null }
  const q = query.toLowerCase()
  // Do not classify a battery or wafer as its raw material (e.g. lithium carbonate).
  const isSpecializedProduct = category === 'ev_battery' || category === 'semiconductor'
  if (!isSpecializedProduct) {
    for (const [key, data] of Object.entries(TARIFF_DATABASE)) {
      const keyword = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      if (new RegExp(`\\b${keyword}(?:s|es)?\\b`, 'i').test(q)) {
        return { hts: data.code, duty: data.base, notes: data.notes, matched: true, confidence: 'indicative', category }
      }
    }
  }
  const customs = ATLAS_DB[category]?.[0]?.customs
  return {
    hts: customs?.hts_code || null, duty: customs?.duty_rate || null,
    notes: 'Category reference only; this code and rate have not been matched to the specific product or country of origin.',
    matched: false, confidence: 'category_reference', category,
  }
}

// ============================================================
// RISK CALCULATOR — Trade lane risk scoring
// ============================================================
export function calculateRisk(origin, destination, product = '') {
  const o = origin.toLowerCase()
  const d = destination.toLowerCase()
  const p = product.toLowerCase()

  // Base component scores (0-100, lower = better)
  let geopolitical = 15
  let weather = 10
  let labor = 10
  let infrastructure = 10

  // ── Origin risk adjustments ──
  if (o.includes('china') || o.includes('shanghai') || o.includes('shenzhen') || o.includes('guangzhou')) {
    geopolitical = 55  // Trade war, Section 301, Taiwan tensions, tech decoupling
    infrastructure = 10
    labor = 15
  } else if (o.includes('taiwan') || o.includes('hsinchu') || o.includes('taipei')) {
    geopolitical = 50  // Geopolitical blockade risk
    weather = 30       // Typhoon season risk
  } else if (o.includes('russia') || o.includes('moscow')) {
    geopolitical = 90  // Sanctions, SWIFT exclusion
    infrastructure = 60
  } else if (o.includes('mexico') || o.includes('monterrey') || o.includes('juarez')) {
    geopolitical = 12
    infrastructure = 30  // Cartel violence affecting ground logistics
    labor = 20
  } else if (o.includes('brazil') || o.includes('sao paulo') || o.includes('santos')) {
    infrastructure = 35  // Port congestion, poor road infrastructure
    labor = 25           // Strike risk at Santos port
    geopolitical = 15
  } else if (o.includes('germany') || o.includes('europe') || o.includes('munich') || o.includes('hamburg')) {
    geopolitical = 20    // Russia/Ukraine war proximity, energy cost volatility
    labor = 30           // High strike probability (IG Metall, dockworkers)
  } else if (o.includes('india') || o.includes('mumbai') || o.includes('pune')) {
    infrastructure = 25  // Port capacity constraints
    labor = 15
    geopolitical = 10
  } else if (o.includes('japan') || o.includes('tokyo') || o.includes('aichi')) {
    weather = 35         // Earthquake / tsunami / typhoon risk
    geopolitical = 10
    labor = 10
    infrastructure = 5
  } else if (o.includes('australia') || o.includes('pilbara')) {
    weather = 20         // Cyclone risk
    labor = 25           // Resource-sector strike risk
    geopolitical = 5
  } else if (o.includes('korea') || o.includes('busan')) {
    geopolitical = 20    // North Korea risk
    weather = 10
    labor = 15
  } else if (o.includes('vietnam') || o.includes('ho chi minh')) {
    infrastructure = 20
    labor = 10
    geopolitical = 15
  }

  // ── Destination risk adjustments ──
  if (d.includes('usa') || d.includes('los angeles') || d.includes('long beach') || d.includes('california')) {
    infrastructure += 20  // LA/LB port congestion
    labor += 25           // ILWU union strike risk
  } else if (d.includes('europe') || d.includes('rotterdam') || d.includes('hamburg')) {
    labor += 15           // Dockworker strike risk
    geopolitical += 10    // Proximity to Ukraine conflict
  } else if (d.includes('uk') || d.includes('united kingdom') || d.includes('felixstowe')) {
    infrastructure += 10  // Post-Brexit customs complexity
    labor += 10
  }

  // ── Product-specific adjustments ──
  if (p.match(/magnet|rare.earth|semiconductor|chip/)) geopolitical += 15  // Critical mineral / tech controls
  if (p.match(/food|meat|perishable|fresh/)) weather += 20                  // Cold chain vulnerability
  if (p.match(/hazmat|chemical|battery|lithium/)) infrastructure += 15      // Dangerous goods complexity

  // ── Overall score (weighted composite, capped at 95) ──
  const overall = Math.min(95, Math.round(
    (geopolitical * 1.4 + weather * 0.8 + labor * 1.1 + infrastructure * 0.9) / 4.2
  ))

  const rating = overall >= 65 ? 'HIGH' : overall >= 35 ? 'MEDIUM' : 'LOW'

  // Transit days estimation
  const isAsia = o.includes('china') || o.includes('taiwan') || o.includes('japan') || o.includes('korea') || o.includes('vietnam')
  const isLatam = o.includes('brazil') || o.includes('chile') || o.includes('mexico') || o.includes('argentina')
  const isEurope = o.includes('germany') || o.includes('europe') || o.includes('france') || o.includes('italy')
  const destUS = d.includes('usa') || d.includes('united states') || d.includes('los angeles') || d.includes('new york')

  let transit = 14
  if (isAsia && destUS) transit = 18
  else if (o.includes('mexico') && destUS) transit = 3
  else if (isLatam && destUS) transit = 12
  else if (isEurope && destUS) transit = 10
  else if (o.includes('australia') && destUS) transit = 16
  else if (o.includes('india') && destUS) transit = 20

  const buffer = overall >= 65 ? '+3 Weeks' : overall >= 35 ? '+2 Weeks' : '+1 Week'

  // Insurance estimate
  const premiumPct = overall >= 65 ? '0.8–1.2%' : overall >= 35 ? '0.4–0.7%' : '0.2–0.4%'

  return {
    overall,
    rating,
    transit_days: transit,
    recommended_buffer: buffer,
    breakdown: { geopolitical, weather, labor, infrastructure },
    narrative: `Risk profile dominated by ${
      Math.max(geopolitical, weather, labor, infrastructure) === geopolitical ? 'geopolitical tensions' :
      Math.max(geopolitical, weather, labor, infrastructure) === labor ? 'labor union / strike risk' :
      Math.max(geopolitical, weather, labor, infrastructure) === infrastructure ? 'infrastructure chokepoints' :
      'weather / natural disaster exposure'
    }. Recommend ${buffer} safety stock buffer.`,
    insurance_premium: premiumPct
  }
}

// ============================================================
// CATEGORY-SPECIFIC RISK INTELLIGENCE
// Used by /api/analyze to generate contextualized risk cards
// ============================================================
export const CATEGORY_RISKS = {
  industrial: [
    {
      id: 'r_ind_1', title: 'China Rare Earth Export Controls', type: 'Risk', severity: 'HIGH',
      desc: 'China controls ~90% of global rare earth magnet (NdFeB) production and processing. Beijing has historically used export quotas and restrictions as geopolitical leverage. A sudden export ban could halt automotive and electronics production globally within weeks.',
      mitigation: 'Dual-source from Japan (TDK, Shin-Etsu) and US domestic (Arnold Magnetics, MP Materials) suppliers. Qualify magnet recycling/reclamation programs. Lobby for DoD Strategic Materials program participation.'
    },
    {
      id: 'r_ind_2', title: 'Critical Mineral National Security Designation', type: 'Risk', severity: 'HIGH',
      desc: 'Neodymium, dysprosium, and praseodymium are classified as Critical Minerals by USGS, DoD, and the EU. Any supply disruption triggers cascading impacts across EV motors, defense systems, and industrial automation.',
      mitigation: 'Engage DoD/DoE Critical Minerals sourcing programs. Explore long-term supply agreements with USMCA and FTA partners (Chile, Australia). Consider strategic stockpiling for 90-day coverage.'
    },
    {
      id: 'r_ind_3', title: 'Rare Earth Price Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'NdFeB magnet prices (driven by Nd/Pr oxide prices) have historically swung 200-400% within a single year based on Chinese export policy, EV demand surges, and speculative activity.',
      mitigation: 'Negotiate index-linked pricing in supply agreements with price caps/floors. Hedge exposure via commodity financial instruments. Build 3-month buffer inventory during price dips.'
    }
  ],
  automotive: [
    {
      id: 'r_auto_1', title: 'Section 301 Tariff Exposure', type: 'Risk', severity: 'HIGH',
      desc: 'US Section 301 tariffs (25%) remain in force on Chinese-origin automotive components. USMCA re-negotiation is scheduled for 2026, creating uncertainty for Mexico-based sourcing and regional value content rules.',
      mitigation: 'Prioritize USMCA-compliant Mexico and US domestic sourcing. Conduct Tier-2 supplier audit for hidden China-origin content. Seek CBP binding ruling on origin classification.'
    },
    {
      id: 'r_auto_2', title: 'Semiconductor Supply Allocation Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Automotive-grade semiconductors (MCUs, power ICs, SiC MOSFETs) remain under tight allocation by Texas Instruments, NXP, Infineon, and Renesas through 2026. Production shutdowns possible with < 2 weeks notice.',
      mitigation: 'Secure long-term supply agreements with dual-source qualification. Increase buffer stock to 12+ weeks for critical chips. Work with Tier-1s to share allocation visibility.'
    },
    {
      id: 'r_auto_3', title: 'Mexico Ground Logistics Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Organized crime activity in Tamaulipas, Nuevo León, and Sonora corridors creates cargo theft and delay risks on key Monterrey-US border crossings. Border wait times at Laredo can exceed 2-3 days during peak.',
      mitigation: 'Use bonded carrier networks with GPS tracking. Diversify border crossing points. Build 2-week buffer for Monterrey-origin supply. Engage customs broker for FAST lane pre-clearance.'
    }
  ],
  electronics: [
    {
      id: 'r_tech_1', title: 'Taiwan Strait Geopolitical Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Taiwan produces 90%+ of advanced logic chips (< 7nm). Any military escalation or PRC blockade would immediately halt global smartphone, automotive, and AI chip supply for 12-24 months with no alternative.',
      mitigation: 'Qualify alternate foundries (Samsung Foundry, Intel Foundry, GlobalFoundries) for non-critical nodes. Increase finished goods buffer. Engage TSMC\'s Arizona and Japan fabs for geographic diversification.'
    },
    {
      id: 'r_tech_2', title: 'US BIS Export Control Proliferation', type: 'Risk', severity: 'HIGH',
      desc: 'US Bureau of Industry and Security (BIS) rapidly expanding export controls on advanced semiconductors, EDA tools, and packaging technology. China-bound or China-routed shipments face increasing license requirements.',
      mitigation: 'Conduct quarterly export control audits. Engage trade counsel for ECCN classification review. Establish end-user monitoring programs. Check Entity List and Military End-User List monthly.'
    },
    {
      id: 'r_tech_3', title: 'Component Lead Time Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Semiconductor lead times fluctuate from 8 to 52+ weeks depending on demand cycle. Memory (NAND/DRAM) subject to boom-bust pricing cycles that can move 60-80% in a single quarter.',
      mitigation: 'Place long-horizon purchase orders (52+ weeks for critical components). Qualify second sources for all critical ICs. Use spot market sparingly and only for non-critical, non-constrained parts.'
    }
  ],
  agriculture: [
    {
      id: 'r_ag_1', title: 'Climate & Crop Yield Volatility', type: 'Risk', severity: 'HIGH',
      desc: 'El Niño cycles and accelerating climate change creating severe crop yield volatility in key agricultural regions (Brazil, Australia, US Midwest). 2023-24 drought reduced global soy production 8%.',
      mitigation: 'Diversify sourcing across at least 3 geographic regions. Engage crop insurance and commodity forward contracts. Build 3-month safety stock. Implement demand sensing to adjust orders quickly.'
    },
    {
      id: 'r_ag_2', title: 'SPS & Food Safety Compliance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Agricultural imports face complex and rapidly evolving Sanitary and Phytosanitary (SPS) requirements at US, EU, and Japanese borders. A single rejected shipment can cost $200k+ and damage supplier relationships.',
      mitigation: 'Pre-certify all suppliers to FSMA (US) or EU SPS standards. Use only USDA/FSIS-registered facilities. Conduct pre-shipment microbiological testing. Engage a customs broker specializing in food imports.'
    },
    {
      id: 'r_ag_3', title: 'EUDR Deforestation Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'EU Deforestation Regulation (EUDR) requires full due diligence and geolocation data for beef, soy, palm oil, cocoa, coffee, wood, and rubber entering the EU from 2025. Brazil and SE Asia exposure is high.',
      mitigation: 'Map supply chain to farm-level GPS coordinates. Engage only deforestation-free certified suppliers. Use Trase.earth or Supply Chain Intelligence tools for deforestation monitoring.'
    }
  ],
  food: [
    {
      id: 'r_food_1', title: 'Food Safety Recall & Liability Risk', type: 'Risk', severity: 'HIGH',
      desc: 'A single FDA or EFSA recall event can cost $10M–$500M+ in recall costs, litigation, and brand damage. Allergen mislabeling, pathogen contamination (Salmonella, Listeria), and foreign material incidents are the top triggers. Confectionery and snack products face specific scrutiny.',
      mitigation: 'Implement FSMA Preventive Controls rule. Conduct HACCP/HARPC analysis for all production lines. Require SQF Level 2 or BRC Grade A certification from all co-manufacturers. Maintain product traceability to lot-level within 4 hours.'
    },
    {
      id: 'r_food_2', title: 'Cold Chain Disruption & Perishability Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Temperature excursions during transit can render perishable food products unsellable and create safety risks. Ocean freight for chilled/frozen products adds $1,500–$3,000/container premium and requires continuous monitoring. Port congestion can break cold chains.',
      mitigation: 'Use reefer containers with IoT temperature loggers. Mandate 2°C–8°C (chilled) or −18°C (frozen) corridor contracts. Pre-qualify backup cold storage at destination ports. Cargo insurance with spoilage coverage.'
    },
    {
      id: 'r_food_3', title: 'Commodity Input Price Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Key confectionery and food inputs — sugar, cocoa, gelatin, corn syrup, vegetable oils, wheat — trade as agricultural commodities with 20–60% annual price swings. 2024 cocoa prices rose 300%+ due to West Africa crop failures.',
      mitigation: 'Hedge commodity inputs via CBOT/ICE futures contracts (12–24 month forward coverage). Use fixed-price annual contracts with key ingredient suppliers. Develop alternative formulations to allow ingredient substitution without consumer impact.'
    }
  ],
  metals: [
    {
      id: 'r_met_1', title: 'Section 232 Steel & Aluminum Tariffs', type: 'Risk', severity: 'HIGH',
      desc: 'US 25% steel (Section 232) and 10% aluminum tariffs remain in force on most non-FTA origins. Additional anti-dumping and countervailing duty orders on specific products from multiple countries add further complexity.',
      mitigation: 'Maximize domestic (US/Canada) sourcing. Apply for Section 232 exclusions where applicable. Negotiate with EU and UK suppliers under quota agreements. Lock in landed cost with duties included in vendor pricing.'
    },
    {
      id: 'r_met_2', title: 'China Resource Nationalism & Rare Earth Export Controls', type: 'Risk', severity: 'HIGH',
      desc: 'China controls 85%+ of rare earth processing globally and has historically weaponized this dominance via export restrictions (2010 Japan embargo, 2023 gallium/germanium controls).',
      mitigation: 'Aggressively diversify to Australia (Lynas), US (MP Materials), and Canada (Vital Metals). Engage Critical Minerals Institute and US government stockpiling programs.'
    },
    {
      id: 'r_met_3', title: 'Commodity Price Cycle Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Base metal prices (copper, nickel, lithium) can move 30-60% in a 12-month period driven by China demand, EV adoption rates, and speculative positioning. Lithium dropped 80% from peak to trough in 2023-24.',
      mitigation: 'Implement commodity price hedging through financial derivatives. Use index-linked pricing in long-term supply agreements with caps and floors. Build inventory counter-cyclically (buy at cycle lows).'
    }
  ],
  textiles: [
    {
      id: 'r_tex_1', title: 'UFLPA Forced Labor Compliance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'The Uyghur Forced Labor Prevention Act (UFLPA) creates a rebuttable presumption that all goods from Xinjiang involve forced labor and are inadmissible to the US. Cotton, polyester, and yarn supply chains are highly exposed.',
      mitigation: 'Map entire fiber supply chain to raw material origin. Audit all Tier-2/3 suppliers for Xinjiang exposure. Use SLCP, amfori BSCI, or equivalent audit standards. Engage a supply chain traceability platform (Sourcemap, TextileGenesis).'
    },
    {
      id: 'r_tex_2', title: 'Bangladesh Factory Safety & Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Despite post-Rana Plaza improvements under the Bangladesh Accord (now RSC), structural and fire safety risks persist in lower-tier factories. Compliance lapses can trigger brand reputational damage and sourcing shutdowns.',
      mitigation: 'Source only from RSC/Accord-compliant factories. Conduct at minimum annual unannounced structural and fire safety audits. Maintain a qualified factory backup list for contingency sourcing.'
    },
    {
      id: 'r_tex_3', title: 'Lead Time vs. Fashion Cycle Mismatch', type: 'Risk', severity: 'MEDIUM',
      desc: 'Standard Asia ocean freight adds 25-40 days to lead time. Fast fashion and responsive retail cycles require 4-8 week total lead time, creating inventory overstock risk when sales miss forecasts.',
      mitigation: 'Near-shore to Turkey, Morocco, or Mexico for speed-to-market collections. Reserve Bangladesh/Vietnam for core basics with predictable demand. Implement demand-sensing analytics to improve forecast accuracy.'
    }
  ],

  chemicals: [
    {
      id: 'r_che_1', title: 'REACH & Dangerous Goods Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'EU REACH requires registration of all chemical substances >1 tonne/year. Importers must also comply with CLP labeling, ADR/IMDG dangerous goods transport rules, and maintain up-to-date Safety Data Sheets (SDS). Non-compliance leads to customs holds and market bans.',
      mitigation: 'Require REACH pre-registration confirmation from all EU-bound suppliers. Maintain current SDS for all products. Use a licensed dangerous goods freight forwarder. Conduct annual compliance audits against ECHA SVHC candidate list updates.'
    },
    {
      id: 'r_che_2', title: 'Feedstock & Crude Oil Price Volatility', type: 'Risk', severity: 'HIGH',
      desc: 'Specialty chemical input costs (petrochemical feedstocks, natural gas, rare mineral salts) can swing 20–40% annually. Adhesive and coating raw material costs closely track crude oil and benzene/toluene benchmarks.',
      mitigation: 'Include feedstock price-adjustment clauses (oil index linkage) in supply agreements. Dual-source critical inputs. Maintain 60-90 day safety stock on high-turnover chemicals. Hedge with commodity financial instruments where volumes justify.'
    },
    {
      id: 'r_che_3', title: 'Section 301 Tariffs on Chinese Chemicals', type: 'Risk', severity: 'MEDIUM',
      desc: 'Many specialty chemicals, adhesives, and coatings sourced from China face 7.5–25% Section 301 tariffs under List 1-4A. Fine chemicals used in formulations may also be affected, raising BoM costs significantly.',
      mitigation: 'Audit import classification against active Section 301 lists. Source from European (BASF, Evonik) or US Gulf Coast alternatives. File for exclusions on specialized inputs with no US/non-China alternatives. Explore duty drawback programs.'
    }
  ],
  packaging: [
    {
      id: 'r_pkg_1', title: 'Section 301 & Anti-Dumping on Chinese Packaging', type: 'Risk', severity: 'HIGH',
      desc: 'Corrugated boxes, paperboard, and plastic packaging from China face 25% Section 301 tariffs plus additional anti-dumping duties on specific items (e.g., coated paper, PET containers). Total landed cost impact can be 30–40%.',
      mitigation: 'Qualify regional packaging suppliers (US, Mexico, ASEAN). Explore domestic corrugated partners (International Paper, WestRock). Compare total landed cost including duties before committing to China-origin packaging.'
    },
    {
      id: 'r_pkg_2', title: 'EU EPR & Recycled Content Regulations', type: 'Risk', severity: 'HIGH',
      desc: 'EU Packaging and Packaging Waste Directive (PPWD) mandates minimum recycled content, recyclability requirements, and Extended Producer Responsibility (EPR) registration in each EU member state by 2025–2030. Non-compliance blocks market entry.',
      mitigation: 'Audit all EU-bound packaging for PPWD compliance. Register with national EPR schemes (e.g., Der Grüne Punkt in Germany). Switch to mono-material, recyclable formats. Engage packaging compliance consultants for multi-country EU registration.'
    },
    {
      id: 'r_pkg_3', title: 'Pulp & Paper Price Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Containerboard and pulp prices are highly cyclical, moving 25–50% between cycle peaks and troughs. Post-COVID inventory corrections caused sharp price declines in 2023, but capacity tightness can reverse this quickly.',
      mitigation: 'Use index-linked pricing in paper packaging LTAs with price caps. Build 45–60 day corrugated inventory during low-price periods. Optimize box dimensions to reduce material usage (right-sizing programs). Explore fiber-substitution where applicable.'
    }
  ],
  medical: [
    {
      id: 'r_med_1', title: 'FDA Import Alert & cGMP Compliance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'FDA maintains Import Alerts on dozens of Indian and Chinese API and device manufacturers for cGMP failures. A single import alert can halt all shipments from a facility, creating critical supply disruptions for pharmaceutical customers.',
      mitigation: 'Check FDA Import Alert database before qualifying any API or device supplier. Require recent FDA inspection outcomes and 483 observation history. Conduct independent GMP audits. Maintain 6-month API safety stock for critical materials.'
    },
    {
      id: 'r_med_2', title: 'Regulatory Approval Lead Time Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Switching pharmaceutical API suppliers requires FDA Drug Master File (DMF) update and can take 18–36 months for approval. Medical device supplier changes trigger design change notifications and re-validation. Regulatory lock-in creates single-source dependency.',
      mitigation: 'Qualify secondary API suppliers in parallel with primary. Include regulatory change notification clauses in supply agreements. Maintain 12+ month supply agreements with lead-time guarantees. Engage regulatory affairs consultants for change management.'
    },
    {
      id: 'r_med_3', title: 'Cold Chain & Serialization Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Biopharmaceuticals and temperature-sensitive APIs require validated cold chain logistics (2–8°C or -20°C). Drug serialization requirements (DSCSA in US, FMD in EU) mandate end-to-end track-and-trace, with non-compliance resulting in product destruction.',
      mitigation: 'Use GDP-certified cold chain logistics providers only. Validate all cold chain lanes with temperature mapping studies. Implement serialization at point of manufacture. Deploy electronic batch records with full chain of custody documentation.'
    }
  ],
  plastics: [
    {
      id: 'r_pla_1', title: 'China Section 301 Tariff on Plastic Articles', type: 'Risk', severity: 'HIGH',
      desc: 'Most finished plastic parts sourced from China face 25% Section 301 tariffs on top of MFN rates, adding 25–30% to landed cost. Applies to injection-molded parts, extrusions, and assembled plastic components under HTS Chapter 39.',
      mitigation: 'Qualify alternative tooling in South Korea (0% KORUS), Germany (MFN ~0-5%), or domestic US compounders. Nearshore injection molding capacity to Mexico under USMCA. Request First Sale valuation ruling from CBP to reduce dutiable value.'
    },
    {
      id: 'r_pla_2', title: 'Crude Oil Price Correlation', type: 'Risk', severity: 'HIGH',
      desc: 'Polymer feedstock prices (naphtha, ethylene, propylene) are directly tied to crude oil. A 20% crude spike typically raises polymer costs 12-18% within 60-90 days, compressing margins and triggering supplier price escalation clauses.',
      mitigation: 'Include feedstock index price adjustment clauses (CPI/PPI linked) in LTAs. Source from US Gulf Coast suppliers with domestic natural gas-based feedstock, which is structurally cheaper and less oil-correlated. Hedge with financial instruments if volume justifies.'
    },
    {
      id: 'r_pla_3', title: 'REACH / RoHS Restricted Substance Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'EU REACH regulations cover 240+ substances of very high concern (SVHCs) commonly used in polymer additives, plasticizers, and flame retardants (e.g., PFAS, phthalates, BPA, halogenated FRs). Non-compliant products face customs seizure and market bans.',
      mitigation: 'Require full material declaration (FMD) and RoHS/REACH compliance certificate from all polymer suppliers. Use IEC 62474 declarable substance database as the reference. Conduct annual chemical compliance audits. Specify SVHC-free grade variants in purchase specs.'
    },
    {
      id: 'r_pla_4', title: 'Tooling & Mold Lead Time Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Injection mold fabrication for complex parts takes 8-20 weeks and costs $15,000–$250,000+ per tool. A single mold failure, tool damage, or supplier exit can halt production with no quick recovery path.',
      mitigation: 'Own your tooling — ensure purchase orders specify tooling ownership with your company. Maintain mold drawings and CAD files. Qualify a secondary molder with duplicate or back-up tooling for critical production parts. Inspect tools annually.'
    }
  ],
  wood_paper: [
    {
      id: 'r_wp_1', title: 'US Softwood Lumber Countervailing & Anti-Dumping Duties', type: 'Risk', severity: 'HIGH',
      desc: 'Canadian softwood lumber faces combined CVD/AD duties averaging 8–18% in the US under a long-running trade dispute. Rates are reset periodically through Commerce Department administrative reviews, creating pricing uncertainty for US buyers sourcing Canadian lumber.',
      mitigation: 'Source from US domestic producers (Weyerhaeuser, PotlatchDeltic) where possible. Use Canadian hardwood grades exempt from CVD/AD. Monitor USITC/Commerce Department annual review outcomes. Lock in 12-month pricing with Canadian mills before duty reset periods.'
    },
    {
      id: 'r_wp_2', title: 'EU Deforestation Regulation (EUDR) Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'EU Deforestation Regulation (EUDR) requires operators to verify that wood, paper, and pulp products are not sourced from deforested land. Applies to all imports from Brazil, Indonesia, and other high-risk origins from 2025. Non-compliance blocks EU market entry.',
      mitigation: 'Require GPS-level geo-location data from all suppliers for forest-of-origin mapping. Engage only PEFC or FSC chain-of-custody certified suppliers. Use Trase.earth and Global Forest Watch for deforestation risk monitoring. Conduct pre-shipment EUDR due diligence audits.'
    },
    {
      id: 'r_wp_3', title: 'Pulp & Paper Price Cycle Volatility', type: 'Risk', severity: 'MEDIUM',
      desc: 'Global pulp prices (NBSK, BHKP, BEKP) move 30–50% between cycle peaks and troughs. 2022 saw record highs above $1,500/mt for NBSK; 2023-24 corrections brought prices back to $1,100–$1,200/mt. Newsprint and tissue demand declining structurally due to digital substitution.',
      mitigation: 'Use index-linked pricing with price caps/floors in long-term supply agreements. Build 60-day pulp inventory during price troughs. Optimize paper grade mix toward growing grades (containerboard, kraft). Explore secondary fiber (recycled) alternatives where quality specs permit.'
    }
  ],
  construction: [
    {
      id: 'r_con_1', title: 'Anti-Dumping & Countervailing Duties on Chinese Construction Products', type: 'Risk', severity: 'HIGH',
      desc: 'US and EU maintain anti-dumping and countervailing duties on a wide range of Chinese construction materials: ceramic tiles (AD 73–265%), glass fiber (25% Section 301), flat glass (25% Section 301), and steel products (15–118%). Total landed cost from China can be double the ex-works price.',
      mitigation: 'Source flat glass from EU (Saint-Gobain, AGC, Guardian) at MFN rates of ~3.7%. Source ceramic tiles from India or Mexico which face lower or no AD/CVD. Use US domestic cement and gypsum producers. Audit all construction products against current ITC AD/CVD order list before importing.'
    },
    {
      id: 'r_con_2', title: 'Construction Market Cyclicality & Demand Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Glass, cement, and ceramic tile demand are highly correlated with construction activity, which follows sharp boom-bust cycles tied to interest rates. 2022–24 rate hike cycle caused residential construction to drop 20–30%, severely pressuring flat glass and tile producers.',
      mitigation: 'Diversify customer base across residential, commercial, and infrastructure segments. Maintain lean inventory and flexible take-or-pay contracts during demand downturns. Monitor housing starts, commercial construction permits, and infrastructure spending data monthly.'
    },
    {
      id: 'r_con_3', title: 'Carbon Intensity & EU Green Deal Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Cement and glass manufacturing are among the most carbon-intensive industries globally (~8% of global CO2). EU Carbon Border Adjustment Mechanism (CBAM) from 2026 will impose carbon costs on cement, glass, and steel imports into the EU, potentially adding €30–80/tonne CO2 equivalent.',
      mitigation: 'Source from suppliers with documented carbon reduction roadmaps and verified emissions data. Qualify low-carbon cement alternatives (blended cements, geopolymers). Engage CBAM consultants early to prepare for 2026 reporting and payment obligations. Track clinker substitution rates (SCM) in cement supply.'
    }
  ],
  consumer_goods: [
    {
      id: 'r_cg_1', title: 'Section 301 Tariffs & FDA MoCRA Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'Most personal care and household products sourced from China face 25% Section 301 tariffs. Additionally, the FDA Modernization of Cosmetics Regulation Act (MoCRA, 2023) now requires cosmetic facility registration, product listing, and adverse event reporting — creating new compliance costs for importers.',
      mitigation: 'Qualify alternative manufacturing in Vietnam, India, or Mexico to reduce tariff exposure. Complete FDA cosmetic facility registration for all manufacturing sites. Implement adverse event tracking system. Engage regulatory counsel to assess full MoCRA compliance requirements before next import.'
    },
    {
      id: 'r_cg_2', title: 'Restricted Ingredient & Banned Substance Risk', type: 'Risk', severity: 'HIGH',
      desc: 'EU Cosmetics Regulation bans or restricts 1,600+ substances; US regulations lag but state bans (California AB 496, PFAS bans) create multi-jurisdiction compliance complexity. Reformulation costs average $200k–$2M per SKU. Ingredient bans can create overnight market access blocks.',
      mitigation: 'Conduct regular ingredient review against EU Annex II (banned) and Annex III (restricted) lists. Monitor California and other state cosmetics ban legislation. Use INCI-compliant formulations. Maintain reformulation contingency plans with contract manufacturers for top 20 SKUs by revenue.'
    },
    {
      id: 'r_cg_3', title: 'Palm Oil Supply Chain & Deforestation Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Palm oil and palm derivatives (sodium lauryl sulfate, palm kernel oil) are core ingredients in most personal care and home care products. Unsustainable palm sourcing from Indonesia and Malaysia creates reputational, regulatory (EUDR), and customer pressure risks.',
      mitigation: 'Source 100% RSPO (Roundtable on Sustainable Palm Oil) Mass Balance or Segregated certified palm derivatives. Map all palm-derivative suppliers to plantation level. Disclose palm sourcing in sustainability reports. Explore alternative surfactants (methyl ester sulfonates, alkyl polyglucosides) for palm-free formulations.'
    }
  ],
  machinery: [
    {
      id: 'r_mac_1', title: 'Section 301 Tariffs on Chinese Machinery', type: 'Risk', severity: 'HIGH',
      desc: 'Most industrial machinery, CNC machine tools, and capital equipment sourced from China face 25% Section 301 tariffs (List 3/4A). On high-value capital equipment ($500k+), this creates enormous landed cost increases and disrupts capex budgets.',
      mitigation: 'Source precision machinery from Germany, Japan, or South Korea where duty rates are 0–5% under FTAs. For budget machinery, quantify total tariff cost in capex planning. File for Section 301 exclusions on specialized equipment with no viable non-China source.'
    },
    {
      id: 'r_mac_2', title: 'Long Lead Times & Single-Source Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Precision pumps, valves, and CNC equipment from Germany and Japan carry 16–52 week lead times. Single-sourcing critical production equipment means any supply disruption directly halts manufacturing. Spare parts availability in remote locations is often limited.',
      mitigation: 'Place capital equipment orders 12+ months in advance. Maintain on-site critical spare parts inventory (bearings, seals, control boards). Qualify local service providers for maintenance. Negotiate spare parts stocking agreements with OEM at time of purchase.'
    },
    {
      id: 'r_mac_3', title: 'Export Control & Dual-Use Restrictions', type: 'Risk', severity: 'MEDIUM',
      desc: 'High-precision CNC machine tools (>4-axis, tight tolerances), certain pumps, and compressors are subject to Wassenaar Arrangement dual-use export controls. Resale or transfer to embargoed countries or restricted end-users can trigger severe US/EU penalties.',
      mitigation: 'Conduct end-user screening against BIS Entity List, OFAC SDN list, and Wassenaar control lists before purchase and at time of any resale or transfer. Obtain Export Control Classification Numbers (ECCNs) for all capital equipment. Maintain records for 5+ years.'
    }
  ],

  // ── EXPANSION SET RISKS (categories 16-40) ─────────────────────────────
  aerospace: [
    {
      id: 'r_aero_1', title: 'ITAR / EAR Export Control Exposure', type: 'Risk', severity: 'HIGH',
      desc: 'Defence-derivative parts, technical data, and even CAD files fall under ITAR (22 CFR 120-130). The deemed-export rule means simply giving a foreign-national employee or an offshore machine shop access to controlled drawings is an export requiring a licence. Penalties run to $1M+ per violation and debarment from US government work.',
      mitigation: 'Register with DDTC before any USML manufacturing. Implement technical data access controls segregated by nationality, with logged access. Screen every supplier against the Debarred Parties list. For Mexico or India machining, use a DDTC-approved Technical Assistance Agreement rather than assuming an exemption applies.'
    },
    {
      id: 'r_aero_2', title: 'Single-Source Qualification Lock-In', type: 'Risk', severity: 'HIGH',
      desc: 'Requalifying an aerospace part takes 18-24 months through AS9100 audit, NADCAP special-process approval, First Article Inspection, and customer PPAP. Titanium forgings, large structural castings, and NADCAP-approved heat treat and chem-processing lines are each held by a small number of qualified sources with no fast substitution path.',
      mitigation: 'Start second-source qualification 24 months before you need it, not when the primary fails. Fund a dormant qualified alternate on a retainer for critical special processes. Negotiate tooling ownership and process documentation rights into every build-to-print contract so a transfer is technically possible.'
    },
    {
      id: 'r_aero_3', title: 'Rate Ramp & Structural Supplier Fragility', type: 'Risk', severity: 'HIGH',
      desc: 'OEM build-rate ramps repeatedly outrun the balance sheets of tier-2 and tier-3 suppliers, who must fund inventory and headcount long before revenue arrives. Castings, forgings, and fasteners have been the recurring constraint on every recent ramp, and the sub-tier consolidated heavily after 2020.',
      mitigation: 'Run financial health monitoring (Altman Z-score, days-payable trends) on all critical sub-tiers quarterly. Offer supply-chain finance or advance payments to cash-constrained but technically sound suppliers. Hold 6-12 months of buffer on long-lead fasteners and forgings during ramp periods.'
    },
    {
      id: 'r_aero_4', title: 'REACH Chromate Restriction on Aerospace Primers', type: 'Risk', severity: 'MEDIUM',
      desc: 'Hexavalent chromium corrosion-inhibiting primers and chromate conversion coatings remain the qualified standard on most airframes, but EU REACH authorisations are time-limited and being progressively withdrawn. Qualified chrome-free alternatives do not yet match performance on all substrates and require full requalification.',
      mitigation: 'Track ECHA sunset dates for each chromate substance in your process specs. Begin qualification of trivalent chrome and chrome-free alternatives now on non-critical applications to build data. Confirm your EU-based processors hold valid authorisations covering the relevant use, not just a generic registration.'
    }
  ],
  energy_oil_gas: [
    {
      id: 'r_oil_1', title: 'Sanctions & Restricted End-User Exposure', type: 'Risk', severity: 'HIGH',
      desc: 'Oilfield equipment is heavily targeted by sanctions regimes. Russia-related restrictions cover a broad list of upstream technology, and OFAC pursues secondary-sanctions liability against non-US parties. Equipment resold through intermediaries into sanctioned projects creates liability that survives the original sale.',
      mitigation: 'Screen every counterparty and end user against OFAC SDN, BIS Entity List, and EU consolidated lists at order entry and again at shipment. Include end-use and no-re-export clauses with audit rights in all sales contracts. Retain a trade counsel opinion for any transaction touching Central Asia, Turkey, or UAE intermediaries.'
    },
    {
      id: 'r_oil_2', title: 'Extreme Capital Equipment Lead Times', type: 'Risk', severity: 'HIGH',
      desc: 'Cryogenic valves, large compressors, and specialty alloy piping for LNG and refinery projects carry 52-78 week lead times, driven by the simultaneous global LNG buildout. A single missed forging slot can push a multi-billion-dollar project milestone by a quarter.',
      mitigation: 'Place long-lead reservations for forging and casting slots before FID where the project risk profile allows. Qualify a second mill for each critical alloy grade. Build float into the project schedule explicitly for the top ten long-lead items rather than assuming vendor-quoted dates hold.'
    },
    {
      id: 'r_oil_3', title: 'Commodity Price Cycle & Demand Whiplash', type: 'Risk', severity: 'HIGH',
      desc: 'Upstream capex tracks oil price with a 6-12 month lag and swings 30-50% peak to trough. Suppliers who scale for a boom get stranded with capacity in the downturn, and the resulting exits permanently remove qualified capacity from the market - which is why lead times explode so violently on the next upswing.',
      mitigation: 'Structure contracts with volume flexibility bands rather than fixed take-or-pay where possible. Maintain relationships with more suppliers than you currently need. Counter-cyclical qualification of new sources during downturns costs far less than emergency qualification during a ramp.'
    },
    {
      id: 'r_oil_4', title: 'Methane & Scope 3 Regulatory Pressure', type: 'Risk', severity: 'MEDIUM',
      desc: 'The EPA Waste Emissions Charge and the EU methane regulation impose direct costs on emissions from oil and gas operations, and operators are pushing measurement and reduction obligations down to equipment suppliers. Leak-prone valve and seal designs are becoming commercially disadvantaged.',
      mitigation: 'Specify low-emission valve packing and connectors (API 622/624 certified) on new equipment. Require suppliers to provide fugitive emission test data. Participate in OGMP 2.0 Level 4/5 reporting to stay ahead of customer requirements rather than reacting to them.'
    }
  ],
  ev_battery: [
    {
      id: 'r_evb_1', title: 'IRA Foreign Entity of Concern Disqualification', type: 'Risk', severity: 'HIGH',
      desc: 'From 2024 for battery components and 2025 for critical minerals, any FEOC content - broadly, Chinese-owned or Chinese-controlled entities anywhere in the chain - disqualifies a vehicle from the $7,500 30D credit entirely. This is binary, not proportional: one non-compliant graphite or electrolyte-salt supplier can strand an entire model year.',
      mitigation: 'Map ownership structures, not just locations, for every tier down to mineral extraction. Require contractual FEOC representations with audit rights and immediate-notification clauses on ownership change. Qualify non-China anode graphite (Syrah, Novonix, Posco) now - it is the single most common FEOC failure point.'
    },
    {
      id: 'r_evb_2', title: 'Cathode & Anode Precursor Concentration', type: 'Risk', severity: 'HIGH',
      desc: 'China refines the overwhelming majority of world battery-grade lithium, cobalt, and graphite regardless of where the ore is mined, and processes most precursor cathode active material (pCAM). Beijing has already demonstrated willingness to impose graphite export licensing. Ex-China refining capacity cannot be built in under three years.',
      mitigation: 'Sign multi-year offtake with non-Chinese refiners even at a cost premium - treat it as insurance, not procurement. Qualify LFP alongside high-nickel chemistries to widen the sourcing option set. Hold strategic inventory of graphite and electrolyte salts at 6+ months for any programme with credit dependency.'
    },
    {
      id: 'r_evb_3', title: 'Dangerous Goods Transport & Thermal Event Liability', type: 'Risk', severity: 'HIGH',
      desc: 'Lithium cells ship as UN3480/UN3481 Class 9 dangerous goods. Every chemistry or format change requires fresh UN38.3 testing. Air freight of cells above 30% state of charge is restricted, and a single thermal runaway event in transit creates carrier liability, regulatory investigation, and potential lane closure.',
      mitigation: 'Maintain current UN38.3 test summaries for every SKU and revision - carriers increasingly demand them at booking. Use IATA CEIV Lithium Battery certified forwarders. Ship at reduced state of charge and specify thermal-propagation-resistant packaging. Confirm cargo insurance explicitly covers lithium thermal events, as many policies exclude them.'
    },
    {
      id: 'r_evb_4', title: 'EU Battery Regulation Carbon Footprint & Passport', type: 'Risk', severity: 'MEDIUM',
      desc: 'Regulation 2023/1542 requires a declared carbon footprint for EV batteries, then performance classes, then maximum thresholds - with a digital battery passport mandatory from February 2027. Cells manufactured on coal-heavy grids will face declaration disadvantage first and outright market exclusion later.',
      mitigation: 'Collect primary cell-level carbon data from suppliers now; secondary averages will not satisfy the delegated act. Favour suppliers with renewable PPAs covering cell production. Begin building the data architecture for the digital passport - it requires component-level traceability that most supply chains cannot currently produce.'
    }
  ],
  semiconductor: [
    {
      id: 'r_semi_1', title: 'Taiwan Strait Concentration Risk', type: 'Risk', severity: 'HIGH',
      desc: 'A single island produces the majority of world advanced logic and a large share of mature-node output. Any blockade, quarantine, or conflict removes capacity that cannot be replicated elsewhere in under three to five years. Even a non-kinetic scenario - insurance withdrawal, shipping reroutes - would disrupt supply within weeks.',
      mitigation: 'Qualify mature-node parts at non-Taiwan foundries (GlobalFoundries, Tower, UMC Singapore, Samsung). Build 6-12 months of buffer on single-sourced Taiwan-fabbed components. Redesign where a part is Taiwan-exclusive and functionally substitutable. Track TSMC Arizona, Japan, and Germany fab qualification timelines and move volume as they come online.'
    },
    {
      id: 'r_semi_2', title: 'Export Control Escalation & Extraterritorial Reach', type: 'Risk', severity: 'HIGH',
      desc: 'US BIS rules, including the Foreign Direct Product Rule, reach non-US-made items produced with US technology. Controls have expanded repeatedly with limited notice, and Dutch and Japanese alignment has extended them to equipment and materials. A compliant shipment plan can become illegal between order and delivery.',
      mitigation: 'Classify every part by ECCN and keep classifications current - not a one-time exercise. Screen end users and end uses monthly against Entity List and Military End User list updates. Build contractual rights to cancel or re-route on regulatory change. Retain export counsel for any China-nexus advanced-node transaction.'
    },
    {
      id: 'r_semi_3', title: 'Upstream Materials Chokepoints', type: 'Risk', severity: 'HIGH',
      desc: 'Photoresist, ABF substrate, high-purity gases, and CMP slurry are each supplied by a handful of firms, mostly Japanese. The 2011 Tohoku earthquake and the 2020 substrate shortage both showed that a materials disruption stops fabs faster than an equipment shortage. China gallium and germanium export controls demonstrated the same lever from the other direction.',
      mitigation: 'Map materials dependency two tiers beyond your direct supplier - most buyers cannot name their photoresist source. Hold consignment inventory of critical chemistries where shelf life permits. Support dual-qualification of resist and substrate at the fab level, which requires fab cooperation and long lead time but is the only real mitigation.'
    },
    {
      id: 'r_semi_4', title: 'Demand Cycle Volatility & Allocation Whiplash', type: 'Risk', severity: 'MEDIUM',
      desc: 'Semiconductor lead times swing from 8 to 52+ weeks across a cycle. Memory pricing moves 60-80% in a quarter. Buyers who over-order in a shortage create the inventory glut that causes the next crash, and suppliers respond by cutting capex, which sets up the following shortage.',
      mitigation: 'Place non-cancellable orders only against firm demand; use options and capacity reservations for upside. Maintain 52-week rolling forecasts shared with suppliers to earn allocation priority. Avoid brokers and the grey market except for genuine line-down events - counterfeit rates in that channel are material.'
    }
  ],
  mining: [
    {
      id: 'r_min_1', title: 'Resource Nationalism & Contract Renegotiation', type: 'Risk', severity: 'HIGH',
      desc: 'Chile, Indonesia, Mexico, and several African jurisdictions have moved to increase state participation, raise royalties, restrict raw ore export, or nationalise lithium. Offtake agreements signed under one regime are routinely reopened by the next government, and the trend is accelerating with critical-mineral strategic value.',
      mitigation: 'Weight sourcing toward FTA partners with stable mining codes (Australia, Canada, Chile with state-partnership structures priced in). Include stabilisation clauses and international arbitration seats in offtake contracts. Diversify across at least three jurisdictions for any mineral where a single country exceeds 40% of your supply.'
    },
    {
      id: 'r_min_2', title: 'Human Rights & Artisanal Mining in Cobalt Supply', type: 'Risk', severity: 'HIGH',
      desc: 'DRC supplies roughly 70% of world cobalt, and artisanal production - which involves documented child labour - flows into industrial concentrate streams. Litigation against downstream brands, EU Corporate Sustainability Due Diligence obligations, and UFLPA exposure where DRC material is refined in Xinjiang all create direct liability.',
      mitigation: 'Source only through RMI-conformant refiners and require mine-level chain of custody, not just refiner attestation. Commission on-the-ground third-party verification - desk audits do not detect artisanal blending. Evaluate LFP chemistry for applications where energy density permits, which removes cobalt exposure entirely.'
    },
    {
      id: 'r_min_3', title: 'Tailings Dam Failure & Catastrophic Liability', type: 'Risk', severity: 'HIGH',
      desc: 'Brumadinho and Mariana demonstrated that a single tailings failure produces mass casualties, multi-billion-dollar liability, and immediate loss of production. Upstream-construction dams remain in use at many operations, and the Global Industry Standard on Tailings Management is not universally adopted.',
      mitigation: 'Require GISTM conformance disclosure from every supplier in your critical mineral chain. Screen for upstream-construction dams specifically. Include force-majeure and alternate-supply provisions in offtake contracts. Factor tailings risk into supplier scoring alongside price and quality.'
    },
    {
      id: 'r_min_4', title: 'Grade Decline & Structural Cost Inflation', type: 'Risk', severity: 'MEDIUM',
      desc: 'Average copper head grades have fallen steadily for two decades, meaning more ore, more energy, and more water per tonne of metal. Combined with permitting timelines of 10-15 years for new mines in the Americas, this makes supply response to demand growth structurally slow and prices structurally higher.',
      mitigation: 'Model long-term contracts against a rising real-cost baseline rather than historical averages. Invest in material efficiency and design-for-recycling to reduce primary demand. Secure long-dated offtake early for minerals with a visible supply deficit (copper, lithium beyond 2028).'
    }
  ],
  luxury_goods: [
    {
      id: 'r_lux_1', title: 'CITES & Exotic Material Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'Crocodile, alligator, python, and certain woods and shells are CITES-listed. Every cross-border movement requires species-specific permits, and a paperwork defect results in seizure and forfeiture of goods that may be worth six figures per unit. Enforcement has tightened significantly, including on intra-company transfers.',
      mitigation: 'Maintain a CITES permit register keyed to individual unit serial numbers. Use only tanneries enrolled in verified farming programmes with traceability to the source farm. Pre-clear high-value shipments with customs brokers specialised in CITES. Consider whether the exotic material is worth the operational risk for lower-tier product lines.'
    },
    {
      id: 'r_lux_2', title: 'Made In Origin Claim Substantiation', type: 'Risk', severity: 'HIGH',
      desc: 'Made in Italy, Swiss Made, and similar claims carry legal definitions and are actively audited. Italian authorities have prosecuted brands whose Italian ateliers performed only finishing on foreign-assembled goods. Swiss Made requires 60% of manufacturing cost in Switzerland. A failed claim triggers both regulatory penalty and brand damage.',
      mitigation: 'Document the value and operation breakdown by country for every SKU, updated when the bill of materials changes. Audit subcontractors for undisclosed offshoring - the failure usually happens at tier 2, not tier 1. Obtain a customs binding origin ruling for borderline cases rather than relying on internal interpretation.'
    },
    {
      id: 'r_lux_3', title: 'Artisan Workshop Labour Audit Exposure', type: 'Risk', severity: 'MEDIUM',
      desc: 'The Italian leather-goods supply chain runs on small subcontracted workshops. Italian prosecutors have placed several major maisons under judicial administration over labour conditions at unauthorised sub-subcontractors. The reputational cost of a finding is far larger than the cost saving that produced it.',
      mitigation: 'Require full disclosure and pre-approval of all subcontracting, with contractual termination rights for undisclosed use. Conduct unannounced audits at tier 2 and tier 3, not just tier 1. Cap the number of subcontracting layers permitted. Price contracts so that compliant labour cost is actually affordable for the workshop.'
    },
    {
      id: 'r_lux_4', title: 'Precious Metal & Diamond Sanctions Traceability', type: 'Risk', severity: 'MEDIUM',
      desc: 'G7 restrictions on Russian-origin diamonds extend to stones substantially transformed in third countries, requiring traceability back to the mine. Similar pressure applies to Russian gold. Mixed parcels and traditional trading practices in Antwerp, Dubai, and Surat make provenance genuinely difficult to establish.',
      mitigation: 'Require G7 traceability declarations from the polisher and the rough source, not only the setter. Prefer suppliers on blockchain provenance platforms (Tracr, Everledger) or with single-mine sourcing. Use LBMA Good Delivery refiners for all gold. Build in extra clearance time for high-value jewellery imports into the EU and US.'
    }
  ],
  cosmetics: [
    {
      id: 'r_cos_1', title: 'FDA MoCRA Registration & Safety Substantiation', type: 'Risk', severity: 'HIGH',
      desc: 'MoCRA now requires facility registration, product listing, adequate safety substantiation, and serious adverse event reporting for cosmetics sold in the US - including for foreign contract manufacturers. FDA gained mandatory recall authority for the first time. Many overseas ODMs are not yet compliant, and the importer carries the exposure.',
      mitigation: 'Verify that every manufacturing facility in your chain holds a current FDA registration number, and confirm annually. Build a safety substantiation dossier per product, not per ingredient. Establish an adverse-event intake and 15-day reporting process before launch, not after the first complaint.'
    },
    {
      id: 'r_cos_2', title: 'Multi-Jurisdiction Ingredient Ban Divergence', type: 'Risk', severity: 'HIGH',
      desc: 'The EU restricts or bans over 1,600 substances; California, Washington, and other states are adding their own PFAS, formaldehyde-releaser, and phthalate bans on different timelines. A single global formulation is increasingly impossible, and reformulation costs $200k-$2M per SKU with 12-18 month timelines.',
      mitigation: 'Maintain an ingredient watchlist screened monthly against EU Annexes II/III, state legislation, and retailer restricted-substance lists (which are often stricter than law). Design new formulations to the strictest applicable jurisdiction from the start. Keep a pre-qualified alternate for every at-risk ingredient in your top-20 SKUs.'
    },
    {
      id: 'r_cos_3', title: 'EU Responsible Person & CPNP Dependency', type: 'Risk', severity: 'MEDIUM',
      desc: 'EU market access requires a designated Responsible Person established in the EU who holds the Product Information File and bears legal liability. Many brands outsource this to a service provider; if that relationship terminates or the PIF is incomplete, products become non-compliant immediately and must be withdrawn.',
      mitigation: 'Hold your own copy of the complete Product Information File including the Cosmetic Product Safety Report - do not rely solely on the RP holding it. Contract the RP relationship with notice periods and file-handover obligations. Audit PIF completeness annually against the Regulation 1223/2009 checklist.'
    },
    {
      id: 'r_cos_4', title: 'Palm Derivative & Natural Extract Sourcing Risk', type: 'Risk', severity: 'MEDIUM',
      desc: 'Surfactants, emollients, and emulsifiers are overwhelmingly palm-derived, several steps removed from the plantation. EUDR requires deforestation-free due diligence with geolocation from 2025. Separately, natural extracts sourced from biodiverse regions trigger Nagoya Protocol access and benefit-sharing obligations.',
      mitigation: 'Move to RSPO Segregated or Mass Balance certified palm derivatives and obtain plantation-level geolocation data from your chemical suppliers. Document Nagoya compliance for every botanical with a non-EU genetic origin. Evaluate palm-free alternatives (alkyl polyglucosides, methyl ester sulfonates) for hero products.'
    }
  ],
  cold_chain: [
    {
      id: 'r_cc_1', title: 'Temperature Excursion & Product Loss', type: 'Risk', severity: 'HIGH',
      desc: 'A single unlogged excursion outside the validated 2-8C or -18C corridor renders pharmaceutical or food cargo unsellable, and for GxP product it must be quarantined and often destroyed regardless of actual efficacy impact. Port congestion, reefer plug availability, and customs holds are the most common causes.',
      mitigation: 'Fit continuous real-time telemetry, not just min/max loggers, on every high-value lane. Pre-agree excursion decision trees with QA so product is not held indefinitely pending review. Pre-qualify backup cold storage and reefer plug capacity at destination ports. Insure explicitly for spoilage - standard cargo cover often excludes it.'
    },
    {
      id: 'r_cc_2', title: 'F-Gas Refrigerant Phase-Down', type: 'Risk', severity: 'HIGH',
      desc: 'The EU F-gas Regulation and the US AIM Act are cutting high-GWP HFC supply on a fixed quota schedule. R-404A is already scarce and expensive in Europe. Facilities and reefer fleets running legacy refrigerant face rising service costs and eventual inability to recharge.',
      mitigation: 'Inventory refrigerant type by asset and model the service-life cliff for each. Prioritise conversion to CO2 transcritical, ammonia, or low-GWP HFO systems at the next major maintenance interval rather than at failure. Secure multi-year refrigerant supply contracts for assets that cannot be converted yet.'
    },
    {
      id: 'r_cc_3', title: 'Cold Storage Capacity Scarcity & Energy Cost', type: 'Risk', severity: 'MEDIUM',
      desc: 'Refrigerated warehousing is 3-5x more energy intensive per square foot than ambient, so energy price shocks flow straight into storage rates. Capacity near major consumption centres is structurally tight, and new automated facilities take 24-36 months to build.',
      mitigation: 'Contract cold storage capacity on multi-year terms rather than spot, accepting a higher base rate for security. Negotiate energy pass-through caps. Consider network redesign to reduce total cold-chain days rather than only chasing lower per-pallet rates.'
    },
    {
      id: 'r_cc_4', title: 'GDP & FSMA Sanitary Transport Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'The FSMA Sanitary Transportation Rule and EU GDP guidelines make the shipper responsible for carrier temperature control, cleaning, and driver training - and for documenting it. Regulators increasingly inspect the shipper records, not just the carrier.',
      mitigation: 'Qualify carriers formally with documented GDP or FSMA assessments and re-qualify annually. Conduct temperature mapping studies on each lane and season, not once at onboarding. Retain records for the full statutory period and make them retrievable within 24 hours of a request.'
    }
  ],

  renewable_energy: [
    {
      id: 'r_ren_1', title: 'UFLPA Detention of Solar Modules', type: 'Risk', severity: 'HIGH',
      desc: 'CBP applies a rebuttable presumption against any goods with Xinjiang inputs, and a large share of world polysilicon originates there. Thousands of module shipments have been detained, some for months, and rebuttal requires full polysilicon-to-module traceability documentation that many suppliers cannot produce. Project schedules and PPA deadlines slip as a result.',
      mitigation: 'Require complete quartz-to-module traceability packages before shipment, not after detention. Prefer non-Chinese polysilicon (Wacker, OCI Malaysia, Hemlock) with documented segregation. Contractually place detention risk and demurrage cost on the supplier. Build 90-day schedule float on any China-linked module procurement.'
    },
    {
      id: 'r_ren_2', title: 'AD/CVD & Circumvention Findings on Solar', type: 'Risk', severity: 'HIGH',
      desc: 'US anti-dumping and countervailing duty orders cover Chinese cells and modules, and Commerce circumvention findings have extended them to Cambodia, Malaysia, Thailand, and Vietnam where Chinese wafers are merely assembled. Rates can be retroactive, turning a delivered project into a large unbudgeted duty liability.',
      mitigation: 'Verify wafer origin, not just module assembly location. Track Commerce circumvention proceedings and preliminary determinations, which move faster than most procurement cycles. Structure contracts DDP with the supplier bearing all duty risk including retroactive assessment. Consider First Solar CdTe or Indian modules, which sit outside the current orders.'
    },
    {
      id: 'r_ren_3', title: 'Wind Blade End-of-Life & Warranty Exposure', type: 'Risk', severity: 'MEDIUM',
      desc: 'Thermoset epoxy blades are effectively unrecyclable at scale and increasingly face landfill bans in EU member states. Separately, blade quality issues have produced large warranty provisions across the major OEMs, and a supplier with a stressed balance sheet may not be able to honour a 20-year warranty.',
      mitigation: 'Include decommissioning and recycling obligations in turbine supply agreements. Assess OEM warranty provisions and credit quality before selecting - the warranty is only as good as the balance sheet behind it. Track recyclable resin system commercialisation (Vestas CETEC, Siemens Gamesa RecyclableBlade) for future procurements.'
    },
    {
      id: 'r_ren_4', title: 'IRA Domestic Content Threshold Escalation', type: 'Risk', severity: 'MEDIUM',
      desc: 'The 10% ITC domestic content adder requires an escalating percentage of US manufactured product cost. Projects planned against current thresholds may miss the bonus if procurement slips past a step-up date, materially changing project returns after financing is committed.',
      mitigation: 'Model domestic content percentage using Treasury safe-harbour cost tables at bid stage and rerun on every procurement change. Lock domestic supply agreements before financial close. Build the threshold escalation schedule into the project timeline as a hard milestone, not a soft target.'
    }
  ],
  telecom: [
    {
      id: 'r_tel_1', title: 'Trusted Vendor Mandates & Rip-and-Replace', type: 'Risk', severity: 'HIGH',
      desc: 'US law bars Huawei and ZTE equipment from FCC-funded networks and funds removal of installed base; the EU 5G Toolbox drives similar exclusion across member states. Operators with legacy high-risk-vendor equipment face forced replacement capex, and the reimbursement programme has been chronically underfunded.',
      mitigation: 'Audit installed base for restricted-vendor equipment including embedded modules and subsystems, which are frequently missed. Plan replacement on a technology-refresh cycle rather than waiting for a mandate deadline. Confirm funding eligibility before assuming reimbursement, and budget for the shortfall.'
    },
    {
      id: 'r_tel_2', title: 'Optical Fibre & Preform Capacity Constraint', type: 'Risk', severity: 'HIGH',
      desc: 'Fibre preform capacity cannot be expanded quickly, and AI data-centre buildout plus national broadband programmes have repeatedly pushed lead times to 20-40 weeks. Helium supply for fibre draw is an additional independent constraint tied to a small number of global sources.',
      mitigation: 'Place multi-year fibre supply agreements with volume commitments to secure allocation. Qualify at least two preform sources across different regions. Track helium market conditions as a leading indicator of fibre availability. Hold strategic inventory of the specific fibre types your network standard requires.'
    },
    {
      id: 'r_tel_3', title: 'Origin Washing & Section 301 Reclassification', type: 'Risk', severity: 'MEDIUM',
      desc: 'Networking hardware final assembly has moved to Vietnam and Mexico to avoid Section 301, but CBP has challenged whether simple assembly constitutes substantial transformation. A reclassification results in retroactive duty assessment plus penalties on the importer of record, not the supplier.',
      mitigation: 'Obtain a CBP binding ruling for any product whose origin claim depends on relocated final assembly. Retain bills of materials and manufacturing process documentation evidencing genuine transformation. Include duty indemnity clauses in supply contracts covering retroactive assessment.'
    },
    {
      id: 'r_tel_4', title: 'Submarine Cable & Critical Infrastructure Security Review', type: 'Risk', severity: 'MEDIUM',
      desc: 'Submarine cable projects and network equipment purchases increasingly face national security review, landing-permit delays, and restrictions on vendor nationality. Physical cable damage incidents in the Red Sea and Baltic have also demonstrated concentrated route risk.',
      mitigation: 'Engage regulators early on landing permits - approval timelines have lengthened substantially. Design route diversity across distinct geographic corridors, not just distinct cables. Verify vendor eligibility under the relevant security frameworks before contract award.'
    }
  ],
  furniture: [
    {
      id: 'r_fur_1', title: 'AD/CVD Orders on Chinese Furniture', type: 'Risk', severity: 'HIGH',
      desc: 'US anti-dumping and countervailing duty orders cover wooden bedroom furniture, wooden cabinets and vanities, and upholstered seating from China, with company-specific rates that can exceed 250%. Rates are reset in annual administrative reviews, and importers are liable for the final rate retroactively - a cash-deposit rate at entry is not the final liability.',
      mitigation: 'Verify the specific producer-exporter combination rate, not the country-wide rate, before ordering. Post adequate bonds and reserve for retroactive liability in annual reviews. Shift affected categories to Vietnam, Malaysia, or Mexico. Track circumvention inquiries, which have already reached several third countries.'
    },
    {
      id: 'r_fur_2', title: 'Lacey Act & EUDR Timber Due Diligence', type: 'Risk', severity: 'HIGH',
      desc: 'The Lacey Act makes it a US offence to import wood harvested in violation of any foreign law, with strict liability and criminal exposure. EUDR additionally requires plot-level geolocation and deforestation-free proof for wood entering the EU. Tropical hardwood in Asian furniture supply chains frequently lacks credible documentation.',
      mitigation: 'Require species and harvest-country declarations at the SKU level, backed by FSC or PEFC chain of custody. Commission independent species testing (DNA or wood anatomy) on high-risk items - substitution of restricted species is common. Build the EUDR geolocation data collection into supplier onboarding now.'
    },
    {
      id: 'r_fur_3', title: 'Formaldehyde & Flammability Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'TSCA Title VI and CARB Phase 2 cap formaldehyde emissions from composite wood, requiring third-party certification and lot-level records. Upholstered seating must meet CAL TB 117-2013 or equivalent flammability standards. Non-compliant goods are refused entry or recalled after sale.',
      mitigation: 'Require TSCA Title VI compliant panel certificates traceable to the specific lot, not a generic mill statement. Test finished goods periodically rather than relying only on component certificates. Confirm flammability certification covers the exact foam and fabric combination shipped.'
    },
    {
      id: 'r_fur_4', title: 'Container Economics & Cube Utilisation', type: 'Risk', severity: 'MEDIUM',
      desc: 'Furniture cubes out long before it weighs out, so freight cost per unit is unusually sensitive to packaging design and to spot rate volatility. Ocean rate spikes hit this category harder than dense goods, and a 3x rate movement can erase category margin entirely.',
      mitigation: 'Design for knock-down and flat-pack shipping wherever the product allows - it is the single largest lever on landed cost. Contract annual ocean rates with volume commitments rather than riding spot. Model landed cost including freight in supplier selection, not FOB price alone.'
    }
  ],
  sports_outdoor: [
    {
      id: 'r_spo_1', title: 'High MFN Footwear Tariffs & Classification Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Athletic footwear carries some of the highest surviving US MFN duties, up to 20% and in some categories higher, with rates driven by upper material composition and sole construction. Misclassification is common and produces retroactive duty assessment plus penalties across years of entries.',
      mitigation: 'Obtain CBP binding rulings for each core construction platform. Audit classification annually against actual material composition, which drifts as suppliers substitute materials. Evaluate first-sale valuation, which is well established in this industry and can reduce dutiable value materially.'
    },
    {
      id: 'r_spo_2', title: 'Shimano Drivetrain Single-Source Dependency', type: 'Risk', severity: 'HIGH',
      desc: 'The bicycle industry depends on one supplier for the majority of drivetrain components. During the 2020-22 demand surge, lead times reached 100 weeks and complete bikes could not be built despite frame availability. There is no capacity to switch the whole industry to alternatives quickly.',
      mitigation: 'Qualify SRAM, microSHIFT, or Sensah alternatives on at least part of the range so specification can flex. Place drivetrain orders on longer horizons than the rest of the bill of materials. Design frames with compatibility across drivetrain standards where possible rather than locking to one.'
    },
    {
      id: 'r_spo_3', title: 'PPE Category III Certification Burden', type: 'Risk', severity: 'MEDIUM',
      desc: 'Climbing, mountaineering, and fall-arrest equipment is PPE Category III under EU Regulation 2016/425, requiring notified-body type examination plus ongoing production surveillance. A lapsed surveillance audit invalidates CE marking and halts sales immediately, regardless of product quality.',
      mitigation: 'Track notified-body certificate validity and surveillance audit dates as hard operational milestones. Maintain the technical file continuously rather than reconstructing it at audit. Confirm that any manufacturing site change is notified and approved before production moves.'
    },
    {
      id: 'r_spo_4', title: 'PFAS Restriction on Water-Repellent Finishes', type: 'Risk', severity: 'MEDIUM',
      desc: 'PFAS-based durable water repellent treatments are being restricted across the EU and several US states. Non-fluorinated alternatives have shorter durability and different care requirements, and reformulation requires re-testing of the whole garment system.',
      mitigation: 'Transition to PFAS-free DWR across the range on a planned schedule rather than reacting to individual bans. Manage consumer expectations on performance and care through explicit product communication. Require supplier declarations covering intentionally added PFAS and testing for unintentional presence.'
    }
  ],
  toys_games: [
    {
      id: 'r_toy_1', title: 'CPSIA & EN 71 Safety Testing Liability', type: 'Risk', severity: 'HIGH',
      desc: 'Children products require third-party testing by a CPSC-accepted lab for lead, phthalates, small parts, sharp edges, and flammability, with a Children Product Certificate per production lot. A failure results in mandatory recall, CPSC civil penalties that have reached tens of millions, and retailer chargebacks.',
      mitigation: 'Test per production lot and per material change, not once at launch - suppliers substitute resins and pigments silently. Use CPSC-accepted labs only. Maintain traceability from finished good back to component lot so a recall can be scoped narrowly rather than across all inventory.'
    },
    {
      id: 'r_toy_2', title: 'Extreme Seasonal Demand Concentration', type: 'Risk', severity: 'HIGH',
      desc: 'A large share of annual toy sales occurs in the fourth quarter, so production, freight booking, and inventory decisions are made six to nine months ahead against forecasts that are frequently wrong. Missing the Q4 window means a full year of carrying cost; overbuilding means heavy markdown.',
      mitigation: 'Book ocean capacity and factory slots by June for Q4 delivery. Split shipments across sailings to reduce single-vessel exposure. Hold a late-cycle air-freight option for hero SKUs. Use retailer point-of-sale data for in-season reorder decisions rather than relying only on pre-season forecast.'
    },
    {
      id: 'r_toy_3', title: 'ICTI Ethical Toy Program Audit Findings', type: 'Risk', severity: 'MEDIUM',
      desc: 'Excessive overtime during the pre-Q4 peak is the most common ICTI audit failure in Chinese toy factories, and major retailers will delist suppliers on a serious finding. The commercial pressure that causes the overtime originates with the buyer order pattern.',
      mitigation: 'Place orders earlier and level-load factory demand across more months to remove the structural cause. Require ICTI or equivalent certification with current validity. Audit unannounced during peak season, when findings actually surface, rather than in the quiet period.'
    },
    {
      id: 'r_toy_4', title: 'Classification Drift into Chapter 95 Testing Scope', type: 'Risk', severity: 'MEDIUM',
      desc: 'Book-plus-object formats, promotional premiums, and licensed collectibles can reclassify between duty-free printed matter and toys, which changes both the duty treatment and whether full children product safety testing applies. Buyers routinely discover this after the goods ship.',
      mitigation: 'Determine classification at design stage, not at import. Obtain binding rulings for ambiguous formats. Assume toy testing requirements apply whenever a product is marketed to children under 12, regardless of tariff classification, since CPSC scope is broader than HTS.'
    }
  ],
  pet_animal: [
    {
      id: 'r_pet_1', title: 'Pet Food Recall & Contamination Liability', type: 'Risk', severity: 'HIGH',
      desc: 'Aflatoxin, salmonella, and vitamin D over-fortification incidents have each caused large pet food recalls with animal fatalities, litigation, and permanent brand damage. Contract manufacturing means the brand carries the liability while a third party controls the process.',
      mitigation: 'Require FSMA 21 CFR 507 preventive controls plans and audit them on site. Test incoming grains for mycotoxins on every lot. Verify vitamin premix dosing controls specifically - over-fortification incidents trace to premix handling errors. Maintain lot-level traceability enabling a four-hour recall scope determination.'
    },
    {
      id: 'r_pet_2', title: 'Forced Labour in Marine Protein Supply', type: 'Risk', severity: 'HIGH',
      desc: 'CBP has issued withhold release orders against Thai and Chinese fishing operations for forced labour. Wet pet food built on tuna and fish by-products carries direct exposure, and processor-level audits do not detect conditions on the vessels that supply them.',
      mitigation: 'Require vessel-level traceability and labour verification, not just processor certification. Use MSC chain of custody or equivalent with vessel identification. Commission independent at-sea or port-based verification for high-volume lanes. Have an alternate protein source qualified in case of a WRO.'
    },
    {
      id: 'r_pet_3', title: 'Contract Manufacturing Capacity Scarcity', type: 'Risk', severity: 'MEDIUM',
      desc: 'North American extrusion and wet-canning capacity has been persistently tight since 2021. New brands cannot secure runs, and existing brands face allocation cuts when a co-manufacturer prioritises a larger customer. Building a new line takes 18-30 months.',
      mitigation: 'Contract minimum guaranteed capacity with take-or-pay rather than purchase-order-by-purchase-order. Qualify a second co-manufacturer even at higher unit cost. Consider format flexibility (dry versus wet versus toppers) so demand can be shifted to available capacity.'
    },
    {
      id: 'r_pet_4', title: 'State Feed Registration & Label Claim Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Pet food requires registration in each US state with AAFCO-aligned label review, and states enforce differently. Unsubstantiated health claims or incorrect guaranteed analysis trigger stop-sale orders that are state-specific and can strand inventory in distribution.',
      mitigation: 'Centralise label control with a regulatory review gate before artwork release. Maintain a state registration calendar with renewal tracking. Substantiate every claim with feeding trials or formulation compliance per AAFCO protocols before it goes on pack.'
    }
  ],

  printing_media: [
    {
      id: 'r_pri_1', title: 'Structural Print Demand Decline & Supplier Exit', type: 'Risk', severity: 'HIGH',
      desc: 'Commercial print volumes continue a structural decline as media moves digital. Printers exit or consolidate with little notice, stranding work in progress and plates. Capacity for specific formats - large-format web offset, certain finishing operations - can disappear from a region entirely.',
      mitigation: 'Monitor printer financial health, not just quality metrics. Hold your own digital files and, where feasible, own the plates or dies. Maintain a qualified backup printer for every recurring title. Avoid concentrating high-volume recurring work with a single financially stressed supplier.'
    },
    {
      id: 'r_pri_2', title: 'Paper Price Volatility & Grade Availability', type: 'Risk', severity: 'HIGH',
      desc: 'Coated and uncoated paper prices swing 25-50% across the cycle, and mills have permanently converted graphic-paper capacity to containerboard. Specific grades and basis weights disappear rather than merely getting expensive, forcing mid-print specification changes.',
      mitigation: 'Contract paper separately from print where volume justifies, so you control grade and pricing. Design to widely available grades rather than niche specifications. Hold buffer stock of critical grades for recurring titles. Include paper-price escalation clauses with caps rather than absorbing volatility unpriced.'
    },
    {
      id: 'r_pri_3', title: 'Long Sea-Freight Lead Times on Offshore Print', type: 'Risk', severity: 'MEDIUM',
      desc: 'Asian book printing offers major cost advantage but adds 6-8 weeks of ocean transit on top of production, giving 10-14 week total lead times. A publication date slip or a demand surprise cannot be corrected within the season, and air freight on books is prohibitively expensive because they weigh out.',
      mitigation: 'Split print runs between offshore for the base quantity and domestic for reprints and upside. Build print-on-demand capability for the long tail. Confirm sailing schedules and buffer for port congestion in Q3 and Q4 when capacity tightens.'
    },
    {
      id: 'r_pri_4', title: 'Ink Migration & Food-Contact Compliance', type: 'Risk', severity: 'MEDIUM',
      desc: 'Printing inks on food packaging must not migrate through the substrate. Mineral oil hydrocarbon (MOSH/MOAH) contamination from recycled fibre and conventional inks has triggered EU recalls and is the subject of tightening national limits, particularly in Germany.',
      mitigation: 'Specify low-migration inks for all food-contact and food-adjacent packaging. Require migration testing on the finished pack structure, not just the ink. Use functional barriers where recycled fibre is present. Track German and EU MOSH/MOAH limit developments as the leading indicator for the wider market.'
    }
  ],
  hvac: [
    {
      id: 'r_hvac_1', title: 'Refrigerant Phase-Down & Product Obsolescence', type: 'Risk', severity: 'HIGH',
      desc: 'The AIM Act and EU F-gas Regulation are cutting HFC supply on a fixed quota schedule. R-410A equipment is being displaced by A2L refrigerants (R-32, R-454B), which are mildly flammable and require different certification, installation practice, and technician training. Existing inventory can become unsellable at a regulatory cut-off date.',
      mitigation: 'Align inventory purchasing to the transition date schedule and avoid building stock of soon-to-be-restricted equipment. Confirm UL 60335-2-40 certification for all A2L products. Fund installer training ahead of the transition - the labour constraint is the practical bottleneck, not the equipment.'
    },
    {
      id: 'r_hvac_2', title: 'Chinese Compressor & Component Dependency', type: 'Risk', severity: 'HIGH',
      desc: 'Rotary and scroll compressors, heat exchanger coils, and electronic expansion valves are overwhelmingly China-sourced even inside Western-branded equipment. Section 301 raises cost, and any escalation or export restriction would halt production at nominally domestic assembly plants.',
      mitigation: 'Map compressor and coil origin two tiers deep for all critical SKUs. Qualify alternate compressor sources in Thailand, Mexico, or India - several majors have been building this capacity. Hold strategic inventory on the specific compressor models with no alternate. Model landed cost with 301 included in supplier comparisons.'
    },
    {
      id: 'r_hvac_3', title: 'DOE Efficiency Standard Transitions', type: 'Risk', severity: 'MEDIUM',
      desc: 'The 2023 shift to SEER2/HSPF2 with regional variation across North, Southeast, and Southwest zones made non-compliant inventory unsellable in specific states. Future standard increases will repeat this, and distributors carry the stranded inventory risk.',
      mitigation: 'Track DOE rulemaking and compliance dates by region as procurement milestones. Manage channel inventory down ahead of each transition. Confirm that model numbers held in distribution are compliant for the specific state where they will be installed, not just nationally.'
    },
    {
      id: 'r_hvac_4', title: 'Copper and Aluminium Input Cost Exposure', type: 'Risk', severity: 'MEDIUM',
      desc: 'HVAC equipment is copper and aluminium intensive, so unit cost tracks LME pricing closely. Copper has a structural supply deficit forecast from the late 2020s, and coil material substitution to all-aluminium affects field repairability and warranty cost.',
      mitigation: 'Hedge copper exposure or negotiate index-linked pricing with caps. Evaluate all-aluminium coil designs against total lifecycle cost including field service, not just unit cost. Lock annual pricing early in periods of metal price weakness.'
    }
  ],
  water_treatment: [
    {
      id: 'r_wat_1', title: 'PFAS Regulation & Treatment Capacity Demand', type: 'Risk', severity: 'HIGH',
      desc: 'US EPA has set enforceable drinking-water limits for several PFAS compounds at single-digit parts per trillion, and the EU is following. Thousands of utilities must install granular activated carbon or ion exchange treatment simultaneously, and media supply and engineering capacity cannot meet that demand on the compliance timeline.',
      mitigation: 'Reserve GAC and ion-exchange media supply under multi-year contracts now - spot availability will not exist near the deadline. Qualify multiple media suppliers and regeneration providers. Engage engineering firms early; the constraint is design and construction capacity as much as media.'
    },
    {
      id: 'r_wat_2', title: 'NSF/ANSI 61 Certification on Wetted Materials', type: 'Risk', severity: 'HIGH',
      desc: 'Any component in contact with drinking water requires NSF/ANSI 61 certification, and NSF 372 caps lead content. A supplier changing a resin, elastomer, or brass alloy without notification invalidates the certification, and the resulting non-compliance can force removal of installed equipment.',
      mitigation: 'Require certification numbers per component and verify them against the NSF listing database, which is public. Include change-notification clauses with pre-approval rights for any wetted-material substitution. Re-verify certification validity annually, as listings lapse.'
    },
    {
      id: 'r_wat_3', title: 'Membrane Supply Concentration', type: 'Risk', severity: 'MEDIUM',
      desc: 'Reverse-osmosis membrane element supply is concentrated among a small number of manufacturers, and elements are not freely interchangeable between vessel and system designs. A supplier disruption or allocation event affects plant operation directly since membranes require periodic replacement.',
      mitigation: 'Design systems to accept elements from more than one manufacturer where hydraulics permit. Hold replacement element inventory sized to at least one full changeout for critical plants. Negotiate supply agreements with allocation priority rather than buying spot.'
    },
    {
      id: 'r_wat_4', title: 'EU Urban Wastewater Directive Capex Wave', type: 'Risk', severity: 'MEDIUM',
      desc: 'The recast Urban Wastewater Treatment Directive adds quaternary treatment for micropollutants and an extended producer responsibility levy on pharmaceutical and cosmetics companies. This creates a large simultaneous capex wave across Europe with the same equipment and engineering constraints as the PFAS build-out.',
      mitigation: 'Position long-lead equipment orders ahead of the compliance wave. For pharma and cosmetics companies, model the EPR levy into product cost planning now. Engage with national implementation consultations, since member-state transposition varies materially.'
    }
  ],
  defense_military: [
    {
      id: 'r_def_1', title: 'ITAR, DFARS & CMMC Compliance Burden', type: 'Risk', severity: 'HIGH',
      desc: 'Defence suppliers face overlapping regimes: ITAR registration and licensing, DFARS specialty metals and cybersecurity clauses, and CMMC Level 2 certification for handling controlled unclassified information. Non-compliance means contract loss, False Claims Act exposure, and debarment. Many capable commercial suppliers simply cannot meet the bar.',
      mitigation: 'Budget genuinely for compliance infrastructure - it is a cost of entry, not overhead to be minimised. Segregate CUI environments with certified enclaves rather than trying to certify the whole enterprise. Flow down requirements explicitly to sub-tiers and verify rather than assume. Start CMMC assessment 12+ months before it becomes an award gate.'
    },
    {
      id: 'r_def_2', title: 'Specialty Metals & Energetics Sourcing Restrictions', type: 'Risk', severity: 'HIGH',
      desc: 'DFARS 252.225-7014 restricts the origin of steel, titanium, tungsten, and certain alloys to the US and qualifying countries. Separately, US energetics and solid rocket motor capacity is highly concentrated, and ammonium perchlorate has effectively one domestic producer. Demand surges cannot be met.',
      mitigation: 'Verify melt-and-pour origin documentation for all specialty metals, not just the final processor. Qualify multiple mills within qualifying countries. For energetics, place long-horizon orders and accept allocation terms - there is no spot market. Track DPA Title III investments that may add capacity.'
    },
    {
      id: 'r_def_3', title: 'Counterfeit & Non-Conforming Electronic Parts', type: 'Risk', severity: 'HIGH',
      desc: 'Long programme lifecycles mean defence systems rely on obsolete electronic components sourced from the aftermarket, where counterfeit rates are significant. A counterfeit part in a fielded system creates safety-of-flight risk and DFARS 252.246-7007 liability for the contractor.',
      mitigation: 'Purchase only from OEMs or franchised distributors; treat independent distributors as last resort with full test and inspection per AS6081. Implement a counterfeit avoidance plan meeting AS5553. Plan obsolescence proactively with lifetime buys rather than reacting when a part goes end-of-life.'
    },
    {
      id: 'r_def_4', title: 'Budget Cycle & Programme Cancellation Exposure', type: 'Risk', severity: 'MEDIUM',
      desc: 'Defence revenue depends on appropriations that shift with political cycles. Continuing resolutions delay new starts, and programmes are cancelled at any maturity level. Suppliers who invest in dedicated capacity against a programme forecast carry stranded-asset risk.',
      mitigation: 'Negotiate termination-for-convenience cost recovery explicitly in contracts. Avoid dedicating capacity to a single programme where the facility has no commercial alternative use. Diversify across programmes, services, and allied customers rather than depending on a single line item.'
    }
  ],
  maritime: [
    {
      id: 'r_mar_1', title: 'Shipyard Berth Scarcity & Delivery Slippage', type: 'Risk', severity: 'HIGH',
      desc: 'Korean and Japanese yards capable of LNG carriers and complex tonnage are booked into 2028-29. Newbuild prices have risen sharply and delivery dates slip. For an operator with a charter commitment or a regulatory deadline, a delayed vessel means chartering replacement tonnage at spot.',
      mitigation: 'Reserve berths well ahead of firm requirement, accepting option fees. Include liquidated damages for late delivery calibrated to actual charter exposure. Evaluate second-hand tonnage and life-extension of existing vessels as bridging options. Diversify across yards rather than concentrating a series.'
    },
    {
      id: 'r_mar_2', title: 'USTR Section 301 Action on Chinese-Built Vessels', type: 'Risk', severity: 'HIGH',
      desc: 'USTR action targeting Chinese shipbuilding dominance introduces port-entry fees and tariffs affecting Chinese-built vessels, cranes, and containers calling at US ports. This changes the economics of a fleet composition decision made years earlier and cannot be unwound quickly.',
      mitigation: 'Model fleet deployment to route Chinese-built tonnage away from US calls where the fee structure makes it uneconomic. Factor origin into newbuild decisions for any vessel expected to trade to the US. Track the fee schedule and phase-in, which have been revised during consultation.'
    },
    {
      id: 'r_mar_3', title: 'IMO Decarbonisation & Fuel Transition Uncertainty', type: 'Risk', severity: 'MEDIUM',
      desc: 'IMO net-zero-by-2050 trajectory, EEXI/CII ratings, and EU ETS coverage of shipping all impose costs, but the winning alternative fuel - methanol, ammonia, LNG, biofuel - is not settled. A dual-fuel newbuild ordered for the wrong fuel becomes a stranded asset over a 25-year life.',
      mitigation: 'Specify fuel-flexible or conversion-ready designs even at capex premium. Secure green fuel offtake alongside vessel orders where committing to a pathway. Model EU ETS and FuelEU Maritime cost into charter rate assumptions. Avoid single-fuel commitment for the full fleet.'
    },
    {
      id: 'r_mar_4', title: 'Chokepoint & Route Disruption Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Red Sea attacks, Panama Canal drought restrictions, and Strait of Hormuz tension have each independently disrupted major trade lanes in recent years, adding 10-14 days of transit and sharply higher war-risk insurance premiums. These are now recurring rather than exceptional events.',
      mitigation: 'Build routing contingency into service contracts with pre-agreed surcharge mechanisms rather than negotiating during a crisis. Hold safety stock sized to the Cape of Good Hope routing delay for Asia-Europe flows. Confirm war-risk insurance coverage and premium exposure before committing to affected lanes.'
    }
  ],

  railway: [
    {
      id: 'r_rail_1', title: 'Buy America Content Threshold Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'FTA-funded rolling stock requires 70% domestic content and US final assembly, audited by pre-award and post-delivery review. Failure means loss of federal funding for the procurement. Simultaneously, NDAA Section 7613 bars Chinese state-controlled manufacturers entirely, removing the lowest-cost option.',
      mitigation: 'Document component-level cost and origin from contract award, not at audit. Require suppliers to certify domestic content with supporting cost data. Engage FTA early on waiver possibilities for genuinely unavailable components. Budget the domestic content premium into the capital plan honestly.'
    },
    {
      id: 'r_rail_2', title: 'Braking System Duopoly Dependency', type: 'Risk', severity: 'HIGH',
      desc: 'Knorr-Bremse and Wabtec supply the substantial majority of world rail braking systems. There is no third source at scale for many applications, and braking is safety-critical with long homologation cycles, so substitution is not a short-term option under any circumstances.',
      mitigation: 'Negotiate long-term agreements with capacity commitments and spare-parts stocking obligations. Hold critical spares inventory for the fleet life rather than relying on just-in-time supply. Factor the dependency into vehicle platform selection, since brake system choice largely follows the vehicle.'
    },
    {
      id: 'r_rail_3', title: 'ETCS / Signalling Homologation Delay', type: 'Risk', severity: 'MEDIUM',
      desc: 'ETCS and PTC signalling deployments have repeatedly overrun on schedule and budget because vehicle-infrastructure interoperability testing surfaces issues late. A vehicle cannot enter service without authorisation, so signalling delay directly strands delivered rolling stock.',
      mitigation: 'Sequence signalling authorisation ahead of vehicle delivery in the programme plan. Budget realistic contingency for interoperability testing. Contract signalling and rolling stock with aligned milestones and shared risk rather than as independent procurements.'
    },
    {
      id: 'r_rail_4', title: '30-40 Year Obsolescence Management', type: 'Risk', severity: 'MEDIUM',
      desc: 'Rail vehicles have design lives far longer than the electronic components inside them. Traction control electronics, HVAC controllers, and passenger information systems reach end of life multiple times over the vehicle life, and original suppliers exit the market.',
      mitigation: 'Contract for spares availability and design documentation escrow at time of purchase - it cannot be obtained later. Plan mid-life refurbishment as a funded programme, not a surprise. Specify open interfaces where possible so subsystems can be replaced independently.'
    }
  ],
  robotics_automation: [
    {
      id: 'r_rob_1', title: 'Precision Reducer Single-Source Bottleneck', type: 'Risk', severity: 'HIGH',
      desc: 'Nabtesco and Harmonic Drive supply the overwhelming majority of world cycloidal and strain-wave gearboxes used in industrial robot joints. In tight cycles lead times reach 30-52 weeks. Every robot brand depends on the same two Japanese suppliers, so a disruption affects the entire industry simultaneously.',
      mitigation: 'Place reducer orders on the longest horizon of any component in the build. Qualify Chinese alternatives (Leaderdrive, Zhongda) for non-critical axes to widen options, accepting the precision trade-off. Hold buffer inventory sized to a full quarter of build plan for high-runner models.'
    },
    {
      id: 'r_rob_2', title: 'EU Machinery Regulation 2023/1230 Transition', type: 'Risk', severity: 'MEDIUM',
      desc: 'The Machinery Regulation replaces the Machinery Directive from January 2027 and adds explicit cybersecurity, software update, and AI-related safety requirements. Existing CE conformity assessments will not automatically satisfy it, and notified-body capacity for reassessment is limited.',
      mitigation: 'Begin gap assessment against the new regulation now rather than in 2026. Book notified-body capacity early. Design new machines to the regulation from the outset. Confirm that software-update and cybersecurity documentation practices meet the new requirements, since these are genuinely new obligations.'
    },
    {
      id: 'r_rob_3', title: 'Foreign Ownership Review on Automation Suppliers', type: 'Risk', severity: 'MEDIUM',
      desc: 'KUKA is Midea-owned, and several automation and sensing suppliers have Chinese ownership. Defence, aerospace, and critical-infrastructure customers increasingly bar equipment from Chinese-controlled suppliers or require security review, which can disqualify an installed standard mid-programme.',
      mitigation: 'Map ownership structure for all automation suppliers, not just country of manufacture. Maintain an alternate qualified robot brand for any line that may serve controlled work. Confirm customer restrictions before specifying, since retrofitting a line to a different robot brand is expensive.'
    },
    {
      id: 'r_rob_4', title: 'AMR Component Tariff & Origin Exposure', type: 'Risk', severity: 'MEDIUM',
      desc: 'Autonomous mobile robots assembled domestically still depend on China-origin motors, LiDAR, batteries, and drive wheels, all carrying Section 301 exposure. LiDAR specifically has concentrated Chinese supply, and some suppliers face US entity-list scrutiny.',
      mitigation: 'Map subassembly origin and model landed cost with tariffs included. Qualify non-Chinese LiDAR (Ouster, Sick, Hokuyo) for any deployment with government or critical-infrastructure end users. Verify battery UN38.3 documentation and FEOC status if any incentive eligibility is involved.'
    }
  ],
  instruments_scientific: [
    {
      id: 'r_ins_1', title: 'Dual-Use Export Controls on Precision Instruments', type: 'Risk', severity: 'HIGH',
      desc: 'High-accuracy coordinate measuring machines, electron microscopes, and certain mass spectrometers fall under Wassenaar dual-use controls (ECCN 2B006, 3A233 and related). Shipment to China or to a restricted end user without licence is a criminal violation, and controls have tightened for semiconductor-related metrology.',
      mitigation: 'Classify every instrument by ECCN before quoting, not at shipment. Screen end users and obtain end-use statements. Build licence lead time into delivery commitments for controlled destinations. Retain export counsel for any semiconductor or defence end use.'
    },
    {
      id: 'r_ins_2', title: 'Helium Supply Dependency', type: 'Risk', severity: 'HIGH',
      desc: 'GC carrier gas, NMR and MRI cryogens, and leak detection all depend on helium, which has repeatedly gone into global allocation. Supply is concentrated in a small number of production facilities including in Qatar, Algeria, and Russia, and there is no substitute for cryogenic applications.',
      mitigation: 'Qualify hydrogen or nitrogen carrier gas for GC methods where the analytical requirement permits - this is the single largest consumption reduction available. Install helium recovery and recycling systems on NMR. Contract multi-year supply with allocation priority rather than buying spot.'
    },
    {
      id: 'r_ins_3', title: 'GxP Qualification Lock-In on Instrument Changes', type: 'Risk', severity: 'MEDIUM',
      desc: 'Instruments used in regulated pharmaceutical or clinical environments require IQ/OQ/PQ qualification and method validation. Changing instrument model or vendor requires revalidation of every method running on it, taking months and creating regulatory filing implications.',
      mitigation: 'Standardise on platforms with long committed lifecycles and confirm vendor end-of-support horizons before purchase. Plan replacement in advance of obsolescence so revalidation can be scheduled rather than forced. Negotiate extended support contracts for instruments running critical validated methods.'
    },
    {
      id: 'r_ins_4', title: 'Long Instrument Lead Times & Service Network Gaps', type: 'Risk', severity: 'MEDIUM',
      desc: 'Analytical instruments carry 16-30 week lead times, and in emerging markets the local service and spare-parts network is often the real constraint on uptime. An instrument down for eight weeks awaiting a part halts the laboratory work depending on it.',
      mitigation: 'Order capital instruments against the project timeline with realistic buffer. Verify local service coverage and parts stocking before purchasing into a new geography. Hold critical spares (detectors, pumps, source components) on site for instruments on the critical path.'
    }
  ],
  glass_ceramics: [
    {
      id: 'r_gc_1', title: 'Energy Cost & Furnace Campaign Risk', type: 'Risk', severity: 'HIGH',
      desc: 'Glass melting is among the most energy-intensive industrial processes, so gas price shocks pass directly into price - European producers were severely affected in 2022. A furnace also cannot be stopped and restarted economically: an unplanned shutdown means a full rebuild costing tens of millions and 6-12 months.',
      mitigation: 'Contract with energy-hedged suppliers or accept index-linked pricing with caps. Understand each supplier furnace campaign age - a furnace late in its 10-15 year campaign is a supply risk regardless of current performance. Dual-source across furnaces in different plants, not just different sales offices.'
    },
    {
      id: 'r_gc_2', title: 'MLCC and Palladium Input Concentration', type: 'Risk', severity: 'HIGH',
      desc: 'Multilayer ceramic capacitors depend on palladium and nickel electrodes and high-purity barium titanate. Palladium has significant Russian supply exposure that sanctions have not resolved. MLCC lead times have historically swung from 12 to 40+ weeks, and there is no design-around for most circuits.',
      mitigation: 'Hold buffer inventory on high-runner MLCC case sizes and values. Qualify multiple manufacturers per part number where AEC-Q200 or equivalent allows. Monitor palladium market conditions as a leading indicator. Design with commonly available case sizes rather than the newest miniaturised parts where possible.'
    },
    {
      id: 'r_gc_3', title: 'CBAM Carbon Cost on Imported Glass', type: 'Risk', severity: 'MEDIUM',
      desc: 'The EU Carbon Border Adjustment Mechanism prices embedded carbon on glass and ceramics imports from 2026. Non-EU glass with a coal-heavy energy profile will carry a significant additional landed cost, and reporting obligations begin before the financial obligation does.',
      mitigation: 'Collect verified embedded emissions data from non-EU suppliers now to meet reporting obligations and to model the future cost. Favour suppliers with high cullet ratios and low-carbon energy. Rerun EU landed-cost comparisons with CBAM included before extending non-EU contracts past 2026.'
    },
    {
      id: 'r_gc_4', title: 'Pharmaceutical Glass Qualification Rigidity', type: 'Risk', severity: 'MEDIUM',
      desc: 'Primary packaging glass for injectables must meet USP <660> Type I requirements with extractables and leachables studies specific to the drug product. Changing vial or syringe supplier requires regulatory filing, so the supplier relationship is effectively locked for the product life.',
      mitigation: 'Qualify a secondary glass supplier in parallel during development, before commercial launch, when the filing cost is lowest. Include capacity commitments in supply agreements given the lock-in. Monitor supplier capacity expansion plans, since demand for injectable packaging is growing faster than supply.'
    }
  ],
  paint_coatings: [
    {
      id: 'r_pc_1', title: 'PFAS and Chromate Restriction on Coatings', type: 'Risk', severity: 'HIGH',
      desc: 'The proposed EU universal PFAS restriction would affect fluoropolymer topcoats and many additives, while REACH authorisation is progressively withdrawing hexavalent chromium corrosion inhibitors. Qualified alternatives often do not match performance, and requalification in aerospace, marine, and automotive applications takes years.',
      mitigation: 'Inventory PFAS and chromate content across your coating specifications now. Begin alternative qualification on lower-criticality applications to build performance data. Track the ECHA PFAS dossier and chromate sunset dates as programme milestones. Confirm your applicators hold valid authorisations for the specific use.'
    },
    {
      id: 'r_pc_2', title: 'Titanium Dioxide Cost & Trade Remedy Exposure', type: 'Risk', severity: 'HIGH',
      desc: 'TiO2 is typically 20-25% of paint cost and the EU has imposed anti-dumping duties on Chinese TiO2, with US proceedings also active. TiO2 pricing is cyclical and supply is concentrated. The EU classification of inhalable TiO2 powder as a suspected carcinogen adds handling and labelling obligations.',
      mitigation: 'Diversify TiO2 sourcing across chloride and sulphate route producers in multiple jurisdictions. Model AD duty scenarios into formulation cost. Evaluate opacity-efficient formulation and extender substitution to reduce TiO2 loading. Update SDS and handling procedures for the classification change.'
    },
    {
      id: 'r_pc_3', title: 'VOC Regulation Divergence Across Jurisdictions', type: 'Risk', severity: 'MEDIUM',
      desc: 'VOC limits differ by product category and by jurisdiction, with California SCAQMD and EU Directive 2004/42/EC each stricter than US federal rules. A single formulation cannot be sold everywhere, and non-compliant product shipped into a strict jurisdiction results in stop-sale.',
      mitigation: 'Maintain a formulation-to-jurisdiction compliance matrix and gate shipments against it. Formulate new products to the strictest applicable limit. Track SCAQMD and CARB rulemaking, which typically leads the rest of the US market by several years.'
    },
    {
      id: 'r_pc_4', title: 'Dangerous Goods Transport & Storage Constraints', type: 'Risk', severity: 'MEDIUM',
      desc: 'Solvent-borne coatings ship as Class 3 flammable liquids with restrictions on air freight, quantity limits, and segregation requirements in warehousing. Non-compliant documentation causes shipment rejection, and improper storage creates fire risk and insurance exposure.',
      mitigation: 'Use DG-certified forwarders and keep SDS and DG declarations current for every SKU and pack size. Confirm warehouse licensing for flammable storage volumes. Where feasible, shift to waterborne or powder systems, which removes the DG burden entirely alongside the VOC benefit.'
    }
  ],
  nutraceuticals: [
    {
      id: 'r_nut_1', title: 'Botanical Adulteration & Identity Fraud', type: 'Risk', severity: 'HIGH',
      desc: 'Economically motivated adulteration is endemic in botanical extracts - curcumin spiked with synthetic curcuminoids, ashwagandha diluted with starch, bilberry substituted with dyed cheaper species. Supplier certificates of analysis are routinely unreliable, and the brand carries the liability for a mislabelled product.',
      mitigation: 'Run independent identity testing (HPTLC, DNA barcoding, or orthogonal chromatography) on every incoming lot - not just the first shipment. Use USP or AHP monograph methods rather than supplier methods. Audit suppliers on site. Treat a price materially below market as a fraud indicator, not a bargain.'
    },
    {
      id: 'r_nut_2', title: 'FDA cGMP Import Alerts & Facility Compliance', type: 'Risk', severity: 'HIGH',
      desc: 'FDA maintains import alerts against specific Indian and Chinese ingredient suppliers for cGMP failures and adulteration, resulting in detention without physical examination. A supplier added to an import alert after your order stops shipments immediately with no appeal at the border.',
      mitigation: 'Check the FDA import alert database before qualification and monitor it monthly for existing suppliers. Require recent FDA or third-party GMP audit reports and 483 observation history. Maintain a qualified alternate for every critical ingredient. Hold 3-6 months of inventory on ingredients with concentrated supply.'
    },
    {
      id: 'r_nut_3', title: 'Heavy Metal & Contaminant Limits', type: 'Risk', severity: 'HIGH',
      desc: 'Botanical and mineral ingredients carry lead, arsenic, cadmium, and mercury risk from soil and processing. California Proposition 65 thresholds are far below federal limits and have generated extensive private litigation against supplement brands, independent of any actual safety issue.',
      mitigation: 'Test every lot for the four heavy metals per USP <2232> and against Prop 65 thresholds, not just federal limits. Specify limits contractually with rejection rights. Prefer cultivated over wild-harvested material where soil conditions are documented. Carry Prop 65 warning language assessment in the label review process.'
    },
    {
      id: 'r_nut_4', title: 'Novel Food & NDI Authorisation Barriers', type: 'Risk', severity: 'MEDIUM',
      desc: 'The EU Novel Food Regulation requires pre-market authorisation taking 18-36 months for ingredients without significant EU consumption history before 1997, and the US requires New Dietary Ingredient notification for post-1994 ingredients. A product formulated for one market may be unlaunchable in the other.',
      mitigation: 'Screen every ingredient against EU Novel Food catalogue and US NDI status at formulation stage, not at launch planning. Prefer ingredients with existing authorisation or an established supplier dossier. Budget authorisation timelines into the product roadmap where a novel ingredient is central to the concept.'
    }
  ]
}