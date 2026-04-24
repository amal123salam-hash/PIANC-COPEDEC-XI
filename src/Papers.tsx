import React from 'react';
import { Search, Filter, Bookmark, Share2, Download, MapPin, Calendar, Users, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { PAPERS } from '../constants';

export default function PapersView() {
  const tracks = [
    { name: 'Coastal Engineering', count: 85 },
    { name: 'Port Infrastructure', count: 42 },
    { name: 'Climate Adaptation', count: 38 },
    { name: 'Maritime Logistics', count: 24 },
    { name: 'Marine Environment', count: 21 }
  ];

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      {/* Search Header */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter mb-4 uppercase">
              Technical <span className="text-secondary">Papers</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-medium opacity-80 leading-relaxed">
              Explore the latest research in maritime engineering presented at COPEDEC XI. Access over 200 abstracts from global experts.
            </p>
          </div>
          <div className="bg-surface-container-high border-l-4 border-tertiary px-6 py-4 rounded-r-2xl shadow-sm">
            <span className="block text-[10px] uppercase tracking-widest font-black text-tertiary mb-1">Status Update</span>
            <span className="text-sm font-black text-primary">Abstract Submission Closed</span>
          </div>
        </div>

        <div className="relative group max-w-4xl">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-outline group-focus-within:text-secondary transition-colors" />
          </div>
          <input 
            className="w-full bg-white border border-slate-100 rounded-2xl py-6 pl-16 pr-8 text-on-surface placeholder:text-outline focus:ring-4 focus:ring-secondary/10 transition-all shadow-sm ambient-shadow" 
            placeholder="Search by title, keyword, or author..." 
            type="text"
          />
        </div>
      </section>

      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="space-y-10">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary mb-6 border-b border-slate-100 pb-2">Topic Tracks</h3>
            <div className="space-y-1">
              {tracks.map((track) => (
                <label key={track.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary bg-white" />
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{track.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-outline opacity-50">{track.count}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary mb-6 border-b border-slate-100 pb-2">Location</h3>
            <select className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-4 focus:ring-secondary/10 shadow-sm appearance-none">
              <option>All Countries</option>
              <option>India</option>
              <option>Netherlands</option>
              <option>Japan</option>
            </select>
          </div>

          <div className="p-8 bg-primary rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <Award className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform duration-1000" size={120} />
            <h4 className="font-black text-xl mb-3">Paper Awards</h4>
            <p className="text-xs text-blue-100 opacity-80 leading-relaxed mb-6">Join the ceremony for the best technical papers on Feb 24th.</p>
            <button className="w-full py-4 bg-tertiary text-primary text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-lg">VIEW SHORTLIST</button>
          </div>
        </aside>

        {/* List */}
        <div className="space-y-6 flex-grow">
          {PAPERS.map((paper, idx) => (
            <motion.div 
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 ambient-shadow border border-slate-50 transition-all hover:bg-surface-container-low group relative"
            >
              <div className={`absolute left-0 top-12 bottom-12 w-1.5 rounded-r-full ${idx % 2 === 0 ? 'bg-secondary' : 'bg-terary'}`}></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-secondary/10 text-secondary text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-secondary/10">ID: {paper.displayId}</span>
                    <span className="text-[10px] text-outline font-black uppercase tracking-widest opacity-60">{paper.track}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary leading-[1.1] group-hover:text-secondary transition-colors">{paper.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-white transition-all shadow-sm">
                    <Bookmark size={18} />
                  </button>
                  <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-white transition-all shadow-sm">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm font-bold text-primary/70 mb-4 bg-slate-50 w-fit px-4 py-1.5 rounded-full">
                  <Users size={16} className="text-tertiary" /> {paper.authors}
                </div>
                <p className="text-on-surface-variant text-base leading-relaxed opacity-80 line-clamp-3 font-medium">
                  {paper.abstract}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-[10px] font-black text-outline uppercase tracking-widest">
                    <MapPin size={14} className="text-primary" /> {paper.country}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-black text-outline uppercase tracking-widest">
                    <Calendar size={14} className="text-primary" /> {paper.date}
                  </span>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all">
                    DETAILS
                  </button>
                  <button className="flex-1 md:flex-none px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                    <Download size={14} /> ABSTRACT
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Pagination */}
          <nav className="flex items-center justify-center gap-2 pt-12">
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-outline hover:bg-white transition-all ambient-shadow">
              <ChevronLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary text-white font-black text-sm shadow-xl shadow-primary/20">1</button>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-outline hover:bg-white hover:text-primary transition-all font-black text-sm">2</button>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-outline hover:bg-white hover:text-primary transition-all font-black text-sm">3</button>
            <span className="text-outline/40 font-black">...</span>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-outline hover:bg-white hover:text-primary transition-all font-black text-sm">18</button>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-outline hover:bg-white transition-all ambient-shadow">
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
}
