import { Speaker, TimelineItem, Session, Paper, SponsorshipTier } from './types';

export const SPEAKERS: Speaker[] = [
  {
    id: 's1',
    name: 'Prof. Arjan Van der Velde',
    role: 'Chair of Maritime Infrastructure',
    institution: 'Delft University of Technology, Netherlands',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    isKeynote: true
  },
  {
    id: 's2',
    name: 'Dr. Elena Rodriguez',
    role: 'Director of Coastal Resilience',
    institution: 'UN-Oceans & Coasts, Spain',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    isKeynote: true
  },
  {
    id: 's3',
    name: 'Prof. T. Rajasekar',
    role: 'Head of Ocean Engineering',
    institution: 'IIT Madras, India',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
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
  {
    id: 'sess1',
    time: '09:00',
    endTime: '10:30 AM',
    type: 'Keynote',
    location: 'Main Auditorium',
    title: 'Climate Resilient Coastal Infrastructure: A Global Perspective',
    speaker: 'Prof. Robert Van Der Meer, TU Delft',
    speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'sess2',
    time: '10:45',
    endTime: '12:15 PM',
    type: 'Technical',
    category: 'Technical Session A',
    location: 'Seminar Hall 1',
    title: 'Wave-Structure Interaction in Deep Water Ports',
    speaker: 'Dr. Ananya Sharma (Chair)',
    speakerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'sess3',
    time: '02:00',
    endTime: '04:00 PM',
    type: 'Workshop',
    location: 'Tech Lab 3',
    title: 'Advanced Computational Fluid Dynamics for Coastal Engineering',
    speaker: 'Lead: Mike Richards, HydroSim Corp',
    speakerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'sess4',
    time: '06:00',
    endTime: '08:00 PM',
    type: 'Social',
    location: 'Beachfront Terrace',
    title: 'Welcome Gala Dinner & Networking Event',
    speaker: 'All Delegates'
  }
];

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
