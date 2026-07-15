import React from 'react';
import { Mail, Phone, Users, ClipboardList, Siren, Bus, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACTS } from '../constants';
import type { ContactPerson } from '../types';

const GROUP_META: Record<
  ContactPerson['group'],
  { title: string; icon: React.ReactNode; color: string; blurb: string }
> = {
  Committee: {
    title: 'Organizing Committee',
    icon: <Users size={18} />,
    color: '#003366',
    blurb: 'Programme, scientific, and international coordination.',
  },
  Registration: {
    title: 'Registration & Delegates',
    icon: <ClipboardList size={18} />,
    color: '#006781',
    blurb: 'Badges, sponsorship, and on-site queries.',
  },
  Emergency: {
    title: 'Emergency & Medical',
    icon: <Siren size={18} />,
    color: '#dc2626',
    blurb: 'Health, safety, and 24×7 delegate support.',
  },
  Transport: {
    title: 'Transport & Travel',
    icon: <Bus size={18} />,
    color: '#7c3aed',
    blurb: 'Airport transfers and local mobility.',
  },
};

const GROUPS: ContactPerson['group'][] = ['Committee', 'Registration', 'Emergency', 'Transport'];

export default function ContactView() {
  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      <section className="mb-12">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Help & Support</span>
        <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter uppercase mb-3">Contact <span className="text-tertiary">Us</span></h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-medium opacity-80">
          Reach the right desk before, during, and after the conference. For on-site help, the Conference Help Centre is open daily 08:00–18:00.
        </p>
      </section>

      {/* Quick emergency strip */}
      <section className="mb-12 rounded-3xl bg-red-600 text-white p-6 md:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/15 rounded-2xl p-3"><Siren size={26} /></div>
          <div>
            <h3 className="font-black text-lg">Emergency? Call the 24×7 Helpline</h3>
            <p className="text-white/80 text-sm">Medical, security, and lost & found support around the clock.</p>
          </div>
        </div>
        <a href="tel:+919000000000" className="inline-flex items-center gap-2 bg-white text-red-600 font-black px-6 py-3 rounded-full text-sm hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
          <Phone size={16} /> +91 90000 00000
        </a>
      </section>

      {GROUPS.map((group, gi) => {
        const meta = GROUP_META[group];
        const people = CONTACTS.filter((c) => c.group === group);
        return (
          <section key={group} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: meta.color }}>
                {meta.icon}
              </span>
              <div>
                <h2 className="font-black text-2xl text-primary tracking-tight">{meta.title}</h2>
                <p className="text-xs text-on-surface-variant">{meta.blurb}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + gi * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-50 ambient-shadow hover:border-secondary transition-all"
                >
                  <h3 className="font-black text-primary text-lg leading-tight">{p.name}</h3>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">{p.role}</p>
                  <div className="space-y-2">
                    {p.email && (
                      <a href={`mailto:${p.email}`} className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
                        <Mail size={14} className="text-tertiary flex-none" /> {p.email}
                      </a>
                    )}
                    {p.phone && (
                      <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
                        <Phone size={14} className="text-tertiary flex-none" /> {p.phone}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Venue & transport info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden">
          <MapPin size={200} className="absolute -right-8 -bottom-8 opacity-10" />
          <h3 className="font-black text-xl mb-2">Venue</h3>
          <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
            IIT Madras, Sardar Patel Road, Adyar, Chennai 600036, Tamil Nadu, India.
            The campus is ~12 km from Chennai International Airport (MAA).
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=IIT+Madras+Chennai"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-tertiary text-primary font-black text-[10px] uppercase tracking-widest px-5 py-3 rounded-full hover:scale-105 transition-transform"
          >
            Open in Maps <ExternalLink size={14} />
          </a>
        </div>
        <div className="bg-surface-container-low rounded-3xl p-8 border border-slate-100">
          <h3 className="font-black text-xl text-primary mb-3 flex items-center gap-2"><MessageCircle size={18} className="text-secondary" /> Local Transport</h3>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li className="flex gap-2"><Bus size={16} className="text-secondary flex-none mt-0.5" /> Auto-rickshaws and app-cabs (Uber / Ola) are available at the campus East Gate.</li>
            <li className="flex gap-2"><Bus size={16} className="text-secondary flex-none mt-0.5" /> Taramani Metro is ~3 km away; shared shuttles run each morning.</li>
            <li className="flex gap-2"><Bus size={16} className="text-secondary flex-none mt-0.5" /> Pre-booked airport transfers: contact the Transport desk above.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
