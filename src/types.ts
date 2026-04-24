/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Speaker {
  id: string;
  name: string;
  role: string;
  institution: string;
  image: string;
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
  time: string;
  endTime: string;
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
