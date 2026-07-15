/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Speaker {
  id: string;
  name: string;
  role: string;
  institution: string;
  talk: string;
  image?: string;
  isKeynote?: boolean;
}

export interface TimelineItem {
  id: string;
  number: string;
  title: string;
  date: string;
  description: string;
  status: 'upcoming' | 'closed' | 'open';
}

export interface Session {
  id: string;
  date: string;
  time: string;
  endTime: string;
  /** 24h start hour in [0, 24) used for reminder scheduling; parsed from `time`. */
  startHour: number;
  type: 'Keynote' | 'Technical' | 'Workshop' | 'Social';
  category?: string;
  location: string;
  title: string;
  speaker: string;
  speakerImage?: string;
}

export interface Paper {
  id: string;
  displayId: string;
  track: string;
  title: string;
  authors: string;
  abstract: string;
  country: string;
  date: string;
  isBookmarked?: boolean;
}

export interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  icon: string;
  features: string[];
  color: string;
}

export interface MapLocation {
  id: string;
  name: string;
  category: 'Hall' | 'Facility' | 'Service' | 'Transport' | 'Stay';
  description: string;
  lat: number;
  lng: number;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  group: 'Committee' | 'Registration' | 'Emergency' | 'Transport';
}
