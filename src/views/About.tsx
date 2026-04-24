import React from 'react';
import { Anchor, Ship, Waves, GraduationCap, MapPin, ExternalLink, Award, Microscope, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const commissions = [
    { title: 'MarCom', icon: <Anchor />, desc: 'Maritime Navigation Commission focuses on sea-going commercial navigation and env issues.', color: 'text-blue-500' },
    { title: 'RecCom', icon: <Ship />, desc: 'Recreational Navigation Commission deals with yachting, marina and sports infra.', color: 'text-teal-500' },
    { title: 'InCom', icon: <Waves />, desc: 'Inland Navigation Commission technical advice on rivers and canals transport.', color: 'text-cyan-500' }
  ];

  const labs = [
    { name: 'Hydrodynamics Lab', color: 'bg-blue-50 text-blue-700' },
    { name: 'Deep Sea Lab', color: 'bg-slate-100 text-slate-700' },
    { name: 'Coastal Dynamics', color: 'bg-teal-50 text-teal-700' }
  ];

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      <section className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden mb-12 group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container"></div>
        <img 
          src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
          alt="Ocean Visual"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <span className="text-tertiary-container font-label text-xs tracking-[0.3em] uppercase mb-3 font-black">Conference Heritage</span>
          <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter">OUR LEGACY</h2>
        </div>
      </section>

      <nav className="flex overflow-x-auto no-scrollbar gap-10 mb-16 border-b border-slate-100 sticky top-16 bg-background/80 backdrop-blur-md z-40 py-2">
        <button className="flex-none pb-4 font-black tracking-widest text-[10px] uppercase border-b-2 border-secondary text-secondary">About PIANC</button>
        <button className="flex-none pb-4 font-black tracking-widest text-[10px] uppercase text-outline hover:text-secondary transition-colors">COPEDEC Journey</button>
        <button className="flex-none pb-4 font-black tracking-widest text-[10px] uppercase text-outline hover:text-secondary transition-colors">IIT Madras</button>
        <button className="flex-none pb-4 font-black tracking-widest text-[10px] uppercase text-outline hover:text-secondary transition-colors">Ocean Eng.</button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 w-16 bg-tertiary rounded-full"></div>
              <h3 className="text-3xl font-black text-primary tracking-tighter">Global Maritime Leadership</h3>
            </div>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12">
              PIANC is the global organization providing guidance for sustainable waterborne transport infrastructure for ports and waterways. Established in 1885, it continues to be the leading partner for govt and private sector professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commissions.map((c, i) => (
                <div key={i} className="bg-surface-container-low p-8 rounded-3xl hover:bg-surface-container-high transition-all group">
                  <div className={`mb-6 ${c.color} transition-transform group-hover:scale-110`}>
                    {React.cloneElement(c.icon as React.ReactElement, { size: 40 })}
                  </div>
                  <h4 className="font-black text-primary text-xl mb-3">{c.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-sm border border-slate-50 ambient-shadow">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-secondary font-label text-[10px] uppercase tracking-[0.2em] font-black block mb-3 text-tertiary">The Heritage</span>
                <h3 className="text-4xl font-black text-primary tracking-tighter mb-6 leading-none">COPEDEC Journey</h3>
                <p className="text-on-surface-variant text-base leading-relaxed opacity-90">
                  Since 1983, COPEDEC has been a pivotal platform for sharing coastal knowledge. The merger with PIANC in 2003 has strengthened this mission, bringing world-class expertise to regional challenges.
                </p>
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover" 
                  alt="Heritage"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-primary text-white rounded-3xl overflow-hidden shadow-2xl relative">
             <div className="absolute top-4 right-4 z-10">
                <span className="bg-tertiary/90 text-primary text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg">NAAC A++</span>
             </div>
             <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" className="w-full h-56 object-cover opacity-60" alt="IIT Madras" />
             <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-2xl font-black tracking-tighter">IIT Madras</h4>
                  <GraduationCap className="text-tertiary" size={24} />
                </div>
                <p className="text-sm text-blue-100 opacity-80 mb-8 leading-relaxed font-medium">Ranked #1 in India for Engineering, IIT Madras is a global hub of tech innovation.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-blue-200">
                    <MapPin size={16} /> <span>Chennai, TN, India</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-blue-200">
                    <Award size={16} /> <span>Established 1959</span>
                  </div>
                </div>
             </div>
          </div>
          <div className="border-l-4 border-tertiary bg-surface-container-low p-8 rounded-3xl">
            <h4 className="text-xl font-black text-primary mb-3">Dept. of Ocean Engineering</h4>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed opacity-80">Founded in 1981, the department leads in wave dynamics and coastal research.</p>
            <div className="flex flex-wrap gap-2">
              {labs.map((lab, i) => (
                <span key={i} className={`text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest flex items-center gap-1 ${lab.color} shadow-sm`}>
                  <Microscope size={10} /> {lab.name}
                </span>
              ))}
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-secondary text-white py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-secondary-container hover:text-primary transition-all">
            Official Website <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </main>
  );
}
