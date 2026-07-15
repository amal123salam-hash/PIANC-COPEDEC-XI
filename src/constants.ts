import { Speaker, TimelineItem, Session, Paper, SponsorshipTier, MapLocation, ContactPerson } from './types';

export const SPEAKERS: Speaker[] = [
  {
    id: 's1',
    name: 'Prof. Arjan Van der Velde',
    role: 'Chair of Maritime Infrastructure',
    institution: 'Delft University of Technology, Netherlands',
    talk: 'Climate Resilient Coastal Infrastructure: A Global Perspective',
    isKeynote: true
  },
  {
    id: 's2',
    name: 'Dr. Elena Rodriguez',
    role: 'Director of Coastal Resilience',
    institution: 'UN-Oceans & Coasts, Spain',
    talk: 'Nature-Based Defences for a Warming Coastline',
    isKeynote: true
  },
  {
    id: 's3',
    name: 'Prof. T. Rajasekar',
    role: 'Head of Ocean Engineering',
    institution: 'IIT Madras, India',
    talk: 'Monsoon-Ready Ports: Engineering for the Indian Subcontinent',
    isKeynote: true
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 't1',
    number: '01',
    title: 'Abstract Submission',
    date: '15 March 2026',
    description: 'Last date to submit 300-word abstracts for technical sessions.',
    status: 'closed'
  },
  {
    id: 't2',
    number: '02',
    title: 'Paper Notification',
    date: '30 June 2026',
    description: 'Notification of acceptance for oral and poster presentations.',
    status: 'upcoming'
  },
  {
    id: 't3',
    number: '03',
    title: 'Early Bird Registration',
    date: '15 October 2026',
    description: 'Deadline for discounted registration rates for early birds.',
    status: 'upcoming'
  },
  {
    id: 't4',
    number: '04',
    title: 'Full Paper Submission',
    date: '30 November 2026',
    description: 'Final submission of camera-ready manuscripts for proceedings.',
    status: 'upcoming'
  }
];

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    id: 'diamond',
    name: 'Diamond',
    price: 'USD 25,000',
    icon: 'Gem',
    features: ['Premium Exhibition Booth', 'Keynote Speaking Slot'],
    color: '#C8A84B'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 'USD 15,000',
    icon: 'Award',
    features: ['Prime Branding Space', 'Full Session Sponsorship'],
    color: '#E5E4E2'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 'USD 10,000',
    icon: 'Trophy',
    features: ['Exhibition Presence', 'Logo in Proceedings'],
    color: '#FFD700'
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 'USD 5,000',
    icon: 'Star',
    features: ['Program Listing', 'Networking Access'],
    color: '#C0C0C0'
  }
];

export const SESSIONS: Session[] = [
  // ── Day 1 · Feb 21 ──────────────────────────────────────────────
  {
    id: 'sess1',
    date: 'Feb 21',
    time: '09:00',
    endTime: '10:30',
    startHour: 9,
    type: 'Keynote',
    location: 'Main Auditorium',
    title: 'Climate Resilient Coastal Infrastructure: A Global Perspective',
    speaker: 'Prof. Robert Van Der Meer, TU Delft',
  },
  {
    id: 'sess2',
    date: 'Feb 21',
    time: '10:45',
    endTime: '12:15',
    startHour: 10.75,
    type: 'Technical',
    category: 'Coastal Engineering',
    location: 'Seminar Hall 1',
    title: 'Wave-Structure Interaction in Deep Water Ports',
    speaker: 'Dr. Ananya Sharma (Chair)',
  },
  {
    id: 'sess3',
    date: 'Feb 21',
    time: '14:00',
    endTime: '16:00',
    startHour: 14,
    type: 'Workshop',
    category: 'Maritime Logistics',
    location: 'Tech Lab 3',
    title: 'Advanced Computational Fluid Dynamics for Coastal Engineering',
    speaker: 'Lead: Mike Richards, HydroSim Corp',
  },
  {
    id: 'sess4',
    date: 'Feb 21',
    time: '18:00',
    endTime: '20:00',
    startHour: 18,
    type: 'Social',
    location: 'Beachfront Terrace',
    title: 'Welcome Gala Dinner & Networking Event',
    speaker: 'All Delegates',
  },
  // ── Day 2 · Feb 22 ──────────────────────────────────────────────
  {
    id: 'sess5',
    date: 'Feb 22',
    time: '09:30',
    endTime: '10:30',
    startHour: 9.5,
    type: 'Keynote',
    location: 'Main Auditorium',
    title: 'Nature-Based Defences for a Warming Coastline',
    speaker: 'Dr. Elena Rodriguez, UN-Oceans & Coasts',
  },
  {
    id: 'sess6',
    date: 'Feb 22',
    time: '11:00',
    endTime: '12:30',
    startHour: 11,
    type: 'Technical',
    category: 'Climate Adaptation',
    location: 'Seminar Hall 2',
    title: 'Hybrid Nature-Based Solutions for Low-Lying Delta Regions',
    speaker: 'Dr. Elena Moretti (Chair)',
  },
  {
    id: 'sess7',
    date: 'Feb 22',
    time: '14:00',
    endTime: '15:30',
    startHour: 14,
    type: 'Technical',
    category: 'Port Infrastructure',
    location: 'Seminar Hall 1',
    title: 'Digital Twin Implementation for Smart Container Terminals',
    speaker: 'Takumi Sato (Chair)',
  },
  {
    id: 'sess8',
    date: 'Feb 22',
    time: '16:00',
    endTime: '17:30',
    startHour: 16,
    type: 'Workshop',
    category: 'Marine Environment',
    location: 'Tech Lab 3',
    title: 'Monitoring Water Quality in Working Harbours',
    speaker: 'Lead: Dr. Priya Nair, NIO',
  },
  // ── Day 3 · Feb 23 ──────────────────────────────────────────────
  {
    id: 'sess9',
    date: 'Feb 23',
    time: '09:30',
    endTime: '10:30',
    startHour: 9.5,
    type: 'Keynote',
    location: 'Main Auditorium',
    title: 'Monsoon-Ready Ports: Engineering for the Indian Subcontinent',
    speaker: 'Prof. T. Rajasekar, IIT Madras',
  },
  {
    id: 'sess10',
    date: 'Feb 23',
    time: '11:00',
    endTime: '12:30',
    startHour: 11,
    type: 'Technical',
    category: 'Coastal Engineering',
    location: 'Seminar Hall 1',
    title: 'Numerical Modeling of Wave Overtopping under Extreme Storm Conditions',
    speaker: 'Dr. Ananya Sharma (Chair)',
  },
  {
    id: 'sess11',
    date: 'Feb 23',
    time: '14:00',
    endTime: '15:30',
    startHour: 14,
    type: 'Workshop',
    category: 'Maritime Logistics',
    location: 'Tech Lab 1',
    title: 'Hands-on Port Operations Simulation with Real-Time Data',
    speaker: 'Lead: Yukihiro Tanaka, PortOfTokyo',
  },
  {
    id: 'sess12',
    date: 'Feb 23',
    time: '18:30',
    endTime: '20:30',
    startHour: 18.5,
    type: 'Social',
    location: 'IIT Madras Guest House Lawn',
    title: 'Young Professionals Networking Mixer',
    speaker: 'All Delegates',
  },
  // ── Day 4 · Feb 24 ──────────────────────────────────────────────
  {
    id: 'sess13',
    date: 'Feb 24',
    time: '09:00',
    endTime: '10:30',
    startHour: 9,
    type: 'Technical',
    category: 'Climate Adaptation',
    location: 'Seminar Hall 2',
    title: 'Coastal Retreat and Managed Realignment: Policy to Practice',
    speaker: 'Robert Sterling (Chair)',
  },
  {
    id: 'sess14',
    date: 'Feb 24',
    time: '11:00',
    endTime: '12:30',
    startHour: 11,
    type: 'Technical',
    category: 'Port Infrastructure',
    location: 'Seminar Hall 1',
    title: 'Resilient Quay Wall Design for Sea-Level Rise',
    speaker: 'Prof. Hans De Vries (Chair)',
  },
  {
    id: 'sess15',
    date: 'Feb 24',
    time: '16:00',
    endTime: '17:30',
    startHour: 16,
    type: 'Workshop',
    category: 'Marine Environment',
    location: 'Tech Lab 2',
    title: 'Ecological Impact Assessment for Dredging Projects',
    speaker: 'Lead: Dr. Lena Fischer, EU-Consult',
  },
  {
    id: 'sess16',
    date: 'Feb 24',
    time: '19:00',
    endTime: '21:00',
    startHour: 19,
    type: 'Social',
    location: 'Main Auditorium Foyer',
    title: 'Best Paper Awards Ceremony & Banquet',
    speaker: 'Organizing Committee',
  },
  // ── Day 5 · Feb 25 ──────────────────────────────────────────────
  {
    id: 'sess17',
    date: 'Feb 25',
    time: '09:30',
    endTime: '11:00',
    startHour: 9.5,
    type: 'Technical',
    category: 'Coastal Engineering',
    location: 'Seminar Hall 2',
    title: 'Sediment Transport Modelling for Navigational Channels',
    speaker: 'Dr. Marco Bianchi (Chair)',
  },
  {
    id: 'sess18',
    date: 'Feb 25',
    time: '11:15',
    endTime: '12:45',
    startHour: 11.25,
    type: 'Technical',
    category: 'Maritime Logistics',
    location: 'Seminar Hall 1',
    title: 'Autonomous Vessels in Port Logistics: A Safety Review',
    speaker: 'Sofia Andersson (Chair)',
  },
  {
    id: 'sess19',
    date: 'Feb 25',
    time: '14:00',
    endTime: '16:00',
    startHour: 14,
    type: 'Workshop',
    category: 'Climate Adaptation',
    location: 'Tech Lab 1',
    title: 'Design Charrette: Adapting a Coastal Town to 2050 Sea Levels',
    speaker: 'Lead: Prof. T. Rajasekar, IIT Madras',
  },
  // ── Day 6 · Feb 26 ──────────────────────────────────────────────
  {
    id: 'sess20',
    date: 'Feb 26',
    time: '09:30',
    endTime: '11:00',
    startHour: 9.5,
    type: 'Keynote',
    location: 'Main Auditorium',
    title: 'The Next Century of Coastal Engineering: A Closing Vision',
    speaker: 'Prof. Arjan Van der Velde, TU Delft',
  },
  {
    id: 'sess21',
    date: 'Feb 26',
    time: '11:15',
    endTime: '12:45',
    startHour: 11.25,
    type: 'Technical',
    category: 'Marine Environment',
    location: 'Seminar Hall 1',
    title: 'Coral Reef Restoration as Breakwater: Field Evidence',
    speaker: 'Dr. Mei Lin (Chair)',
  },
  {
    id: 'sess22',
    date: 'Feb 26',
    time: '14:00',
    endTime: '15:30',
    startHour: 14,
    type: 'Workshop',
    category: 'Port Infrastructure',
    location: 'Tech Lab 3',
    title: 'Procurement & Life-Cycle Costing for Port Authorities',
    speaker: 'Lead: James Okoro, AfriPorts',
  }
];

/** Distinct conference days in chronological order (derived from SESSIONS). */
export const CONFERENCE_DAYS: string[] = Array.from(
  new Set(SESSIONS.map((s) => s.date)),
);

export const PAPERS: Paper[] = [
  {
    id: 'p1',
    displayId: 'PC-24-082',
    track: 'Coastal Engineering',
    title: 'Numerical Modeling of Wave Overtopping under Extreme Storm Conditions',
    authors: 'Dr. Ananya Sharma, Prof. Hans De Vries, et al.',
    abstract: 'This paper presents a comprehensive numerical study on wave overtopping discharge at vertical breakwaters during extreme monsoon events. Utilizing advanced OpenFOAM simulations, we analyze the impact of changing seabed bathymetry and sea-level rise...',
    country: 'INDIA',
    date: 'OCT 12'
  },
  {
    id: 'p2',
    displayId: 'PC-24-115',
    track: 'Port Infrastructure',
    title: 'Digital Twin Implementation for Smart Container Terminals: A Case Study',
    authors: 'Takumi Sato, Yukihiro Tanaka',
    abstract: 'The integration of IoT sensors and real-time data analytics has enabled the creation of high-fidelity digital twins for port operations. This research explores how Japanese ports are utilizing these models...',
    country: 'JAPAN',
    date: 'OCT 13'
  },
  {
    id: 'p3',
    displayId: 'PC-24-204',
    track: 'Climate Adaptation',
    title: 'Hybrid Nature-Based Solutions for Coastal Protection in Low-Lying Delta Regions',
    authors: 'Dr. Elena Moretti, Robert Sterling',
    abstract: 'This study investigates the synergy between mangrove restoration and traditional engineering structures. Results indicate that hybrid systems significantly increase wave energy dissipation...',
    country: 'AUSTRALIA',
    date: 'OCT 14'
  }
];

/**
 * Key locations around the IIT Madras campus (Chennai) used by the venue map.
 * Coordinates are approximate placements for an on-campus wayfinding map and are
 * not survey-grade. Category drives the pin colour and the legend filter.
 */
export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'm1',
    name: 'Main Auditorium',
    category: 'Hall',
    description: 'All keynote addresses and the Best Paper Awards Banquet.',
    lat: 12.9898,
    lng: 80.2316,
  },
  {
    id: 'm2',
    name: 'Seminar Hall 1',
    category: 'Hall',
    description: 'Technical sessions A — Coastal & Port Infrastructure tracks.',
    lat: 12.9912,
    lng: 80.2331,
  },
  {
    id: 'm3',
    name: 'Seminar Hall 2',
    category: 'Hall',
    description: 'Technical sessions B — Climate Adaptation & Coastal Engineering.',
    lat: 12.9906,
    lng: 80.2324,
  },
  {
    id: 'm4',
    name: 'Tech Lab 1',
    category: 'Hall',
    description: 'Hands-on workshops — simulation & operations.',
    lat: 12.9920,
    lng: 80.2340,
  },
  {
    id: 'm5',
    name: 'Tech Lab 2',
    category: 'Hall',
    description: 'Hands-on workshops — environmental assessment.',
    lat: 12.9924,
    lng: 80.2346,
  },
  {
    id: 'm6',
    name: 'Tech Lab 3',
    category: 'Hall',
    description: 'CFD & digital-twin workshops.',
    lat: 12.9928,
    lng: 80.2352,
  },
  {
    id: 'm7',
    name: 'Registration Desk',
    category: 'Service',
    description: 'Badge collection, on-site help, and queries. Open 08:00–18:00 daily.',
    lat: 12.9900,
    lng: 80.2308,
  },
  {
    id: 'm8',
    name: 'Conference Help Centre',
    category: 'Service',
    description: 'Volunteer desk for transport, accessibility, and lost & found.',
    lat: 12.9895,
    lng: 80.2310,
  },
  {
    id: 'm9',
    name: 'Medical / First Aid Post',
    category: 'Facility',
    description: 'On-campus health centre with first-aid and ambulance access.',
    lat: 12.9888,
    lng: 80.2322,
  },
  {
    id: 'm10',
    name: 'IIT Madras Guest House',
    category: 'Stay',
    description: 'Delegates accommodation and the Young Professionals Mixer.',
    lat: 12.9879,
    lng: 80.2295,
  },
  {
    id: 'm11',
    name: 'Beachfront Terrace',
    category: 'Facility',
    description: 'Welcome Gala Dinner & networking — sea-facing open venue.',
    lat: 12.9865,
    lng: 80.2368,
  },
  {
    id: 'm12',
    name: 'Campus Main Gate (East)',
    category: 'Transport',
    description: 'Primary taxi / auto-rickshaw pickup point. Sardar Patel Road.',
    lat: 12.9915,
    lng: 80.2372,
  },
  {
    id: 'm13',
    name: 'Taramani Metro / Rail Link',
    category: 'Transport',
    description: 'Nearest metro station ~3 km — shared shuttles run each morning.',
    lat: 12.9840,
    lng: 80.2410,
  },
];

/** Centre point for the venue map (IIT Madras campus). */
export const MAP_CENTER: [number, number] = [12.9904, 80.2328];

export const CONTACTS: ContactPerson[] = [
  // Organizing committee
  {
    id: 'c1',
    name: 'Prof. T. Rajasekar',
    role: 'Conference Chair',
    email: 'chair@copedec9.org',
    phone: '+91 44 2257 1000',
    group: 'Committee',
  },
  {
    id: 'c2',
    name: 'Dr. Ananya Sharma',
    role: 'Scientific Programme Chair',
    email: 'programme@copedec9.org',
    group: 'Committee',
  },
  {
    id: 'c3',
    name: 'Dr. Elena Moretti',
    role: 'International Liaison',
    email: 'liaison@copedec9.org',
    group: 'Committee',
  },
  // Registration desk
  {
    id: 'c4',
    name: 'Registration Desk',
    role: 'On-site badge collection & queries',
    email: 'registration@copedec9.org',
    phone: '+91 44 2257 2000',
    group: 'Registration',
  },
  {
    id: 'c5',
    name: 'Sponsorship & Exhibitors',
    role: 'Booth & partnership support',
    email: 'sponsors@copedec9.org',
    group: 'Registration',
  },
  // Emergency
  {
    id: 'c6',
    name: 'Campus Medical / First Aid',
    role: 'Health emergencies & ambulance',
    phone: '+91 44 2257 3333',
    group: 'Emergency',
  },
  {
    id: 'c7',
    name: '24×7 Helpline',
    role: 'Lost & found, security, delegate support',
    phone: '+91 90000 00000',
    group: 'Emergency',
  },
  // Transport
  {
    id: 'c8',
    name: 'Airport Transfers',
    role: 'Pre-booked pickup from Chennai (MAA)',
    email: 'transport@copedec9.org',
    group: 'Transport',
  },
  {
    id: 'c9',
    name: 'Local Taxi & Auto Desk',
    role: 'Main Gate (East) · Sardar Patel Road',
    phone: '+91 44 2257 4000',
    group: 'Transport',
  },
];
