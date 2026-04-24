import React, { useState } from 'react';
import { Calendar, MapPin, Search, Filter, Plus, Clock, Users, Laptop, Celebration, Bell, Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { SESSIONS } from '../constants';

export default function ScheduleView() {
  const days = ['Feb 21', 'Feb 22', 'Feb 23', 'Feb 24', 'Feb 25', 'Feb 26'];
  const [selectedDay, setSelectedDay] = useState('Feb 21');
  const [activeFilter, setActiveFilter] = useState('All Sessions');

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      {/* Header Section */}
      <section className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter mb-4 uppercase">
          Conference <span className="text-tertiary">Schedule</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg md:text-xl font-medium opacity-80">
          Explore technical sessions, keynote addresses, and workshops planned for PIANC-COPEDEC XI at IIT Madras.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="mb-16 space-y-8 sticky top-16 bg-background/90 backdrop-blur-md z-40 py-6 border-b border-slate-100">
        <div className="flex flex-col gap-4">
          <span className="font-label text-[10px] uppercase tracking-widest font-bold text-secondary">Select Conference Day</span>
          <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
            {days.map((day) => (
              <button 
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-none px-8 py-3 rounded-full font-black transition-all text-xs uppercase tracking-widest shadow-lg ${selectedDay === day ? 'bg-primary text-white shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-5 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Filter size={16} className="text-secondary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">SESSION TYPES:</span>
          </div>
          {['All Sessions', 'Keynote', 'Technical', 'Workshop', 'Social'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-full ${activeFilter === filter ? 'bg-secondary text-white' : 'text-on-surface-variant hover:text-secondary'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Sessions Timeline */}
      <section className="relative">
        <div className="absolute left-0 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent hidden md:block"></div>
        
        <div className="space-y-12 mb-24">
          {SESSIONS.filter(s => activeFilter === 'All Sessions' || s.type === activeFilter).map((session, idx) => (
            <motion.div 
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative grid md:grid-cols-[120px_1fr] gap-8 items-start group"
            >
              <div className="hidden md:flex flex-col items-end pt-2 pr-10">
                <span className="text-sm font-black text-secondary tracking-tighter">{session.time}</span>
                <span className="text-[10px] uppercase font-bold text-outline tracking-widest opacity-60">{session.endTime}</span>
              </div>
              
              <div className={`bg-white rounded-3xl p-8 transition-all duration-500 border border-slate-50 ambient-shadow hover:bg-surface-container-low relative overflow-hidden group-hover:translate-x-1`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${session.type === 'Keynote' ? 'bg-tertiary' : session.type === 'Workshop' ? 'bg-secondary' : 'bg-primary'}`}></div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${session.type === 'Keynote' ? 'bg-primary text-white' : session.type === 'Workshop' ? 'bg-secondary text-white' : 'bg-surface-container-highest text-primary'}`}>
                        {session.category || session.type}
                      </span>
                      <span className="text-secondary text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                        <MapPin size={12} className="text-tertiary" /> {session.location}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-primary leading-tight max-w-2xl">{session.title}</h3>
                    
                    {session.speakerImage && (
                      <div className="flex items-center gap-4 pt-2">
                        <img src={session.speakerImage} alt={session.speaker} className="w-10 h-10 rounded-xl object-cover shadow-md" />
                        <span className="text-sm font-bold text-primary/80">{session.speaker}</span>
                      </div>
                    )}
                  </div>
                  
                  <button className="flex items-center justify-center gap-3 px-8 py-3 bg-primary text-white rounded-full hover:opacity-90 transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/10 active:scale-95 flex-none">
                    <Plus size={16} /> Add to Schedule
                  </button>
                </div>
              </div>
              
              <div className="absolute left-[92px] top-6 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-background hidden md:block z-10"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights Bento */}
      <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-primary rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-black text-white tracking-widest mb-2 uppercase opacity-40">Highlight</h2>
              <p className="text-blue-200 text-2xl font-black max-w-lg leading-tight mb-8">"Sustainability in Maritime Transport" Panel Discussion</p>
            </div>
            <div className="flex gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 min-w-[140px]">
                <span className="block text-white font-black text-4xl mb-1">140+</span>
                <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Attendees</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 min-w-[140px]">
                <span className="block text-white font-black text-4xl mb-1">5</span>
                <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Expert Panelists</span>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <Waves size={300} className="text-blue-400 rotate-90" />
          </div>
        </div>
        
        <div className="bg-tertiary rounded-[2.5rem] p-10 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
              <Bell size={28} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-3">Real-time Feed</h3>
            <p className="text-primary/70 text-sm font-medium leading-relaxed">Stay updated with last-minute session changes, venue shifts, and live results.</p>
          </div>
          <button className="mt-8 w-full py-4 bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:scale-105 transition-transform shadow-lg">Enable Notifications</button>
        </div>
      </section>
    </main>
  );
}
