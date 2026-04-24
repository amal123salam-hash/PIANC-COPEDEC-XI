import React from 'react';
import { Target, Landmark, History, Waves, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function InformationView() {
  const footprint = [
    { year: '1983 / 1991', city: 'Colombo', country: 'Sri Lanka' },
    { year: '1987', city: 'Beijing', country: 'China' },
    { year: '1995', city: 'Rio de Janeiro', country: 'Brazil' },
    { year: '1999', city: 'Cape Town', country: 'South Africa' },
    { year: '2003', city: 'Colombo', country: 'Sri Lanka' },
    { year: '2008', city: 'Dubai', country: 'UAE' },
    { year: '2012', city: 'Chennai', country: 'India' },
    { year: '2016', city: 'Rio de Janeiro', country: 'Brazil' },
    { year: '2020', city: 'Manila', country: 'Philippines' },
    { year: 'Upcoming', city: 'Amsterdam', country: 'Netherlands' }
  ];

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      {/* Hero Section */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter mb-8 leading-tight">
              PIANC-COPEDEC <br/>Conferences
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
              The International Conference on Coastal and Port Engineering in Developing Countries (COPEDEC) is the premier global exchange for maritime infrastructure innovation.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full font-label text-[10px] uppercase tracking-widest font-bold">Established 1983</span>
              <span className="bg-primary/5 text-primary px-4 py-1 rounded-full font-label text-[10px] uppercase tracking-widest font-bold">Maritime Excellence</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 relative"
        >
          <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl ambient-shadow border border-slate-100">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1494412574743-0112f05c78ec?auto=format&fit=crop&q=80&w=800" 
              alt="Industrial shipping"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-tertiary text-primary p-8 rounded-3xl shadow-xl hidden lg:block">
            <Waves className="block mb-2" size={32} />
            <span className="font-label uppercase tracking-widest text-[10px] font-black">Global Coastal Leadership</span>
          </div>
        </motion.div>
      </section>

      {/* Mission & Secretariat */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
        {/* Mission Card */}
        <div className="md:col-span-8 bg-primary text-white p-10 rounded-3xl relative overflow-hidden group min-h-[300px]">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
              <Target className="text-tertiary" size={32} />
              The Active Mission
            </h3>
            <div>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                To provide an international forum where coastal and port engineers from developing countries can exchange experience and knowledge with each other and with their counterparts from industrialized nations. 
              </p>
              <div className="opacity-70 border-l-2 border-tertiary pl-4 italic text-sm">
                Fostering sustainable development through technical rigor and collaborative engineering excellence.
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Waves size={240} className="rotate-45" />
          </div>
        </div>

        {/* Secretariat Card */}
        <div className="md:col-span-4 bg-surface-container-high p-10 rounded-3xl flex flex-col justify-between border border-primary/5">
          <div>
            <Landmark className="text-primary mb-6" size={40} />
            <h3 className="text-2xl font-black text-primary mb-4">Permanent Secretariat</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Located at the prestigious Indian Institute of Technology (IIT) Madras, the secretariat ensures continuity and institutional memory for the conference series.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <span className="font-label text-[10px] text-primary uppercase font-black tracking-widest">Chennai, India</span>
            <MapPin className="text-primary" size={20} />
          </div>
        </div>
      </div>

      {/* Legacy Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 text-primary">
            <History size={18} />
            <span className="font-label text-[10px] uppercase font-black tracking-[0.2em]">History & Legacy</span>
          </div>
          <h3 className="text-4xl font-black text-primary tracking-tighter">From Colombo to the World</h3>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            The journey began in 1983 in Colombo, Sri Lanka. Since its inception, COPEDEC has successfully bridged the gap between academic research and practical coastal engineering applications. 
          </p>
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm ambient-shadow">
            <h4 className="text-2xl font-black text-secondary mb-3">The 2003 Merger</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              In September 2003, a significant milestone was achieved when COPEDEC merged with PIANC, creating a unified global force in navigation and coastal infrastructure.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400" alt="Harbor" className="aspect-square rounded-3xl shadow-lg object-cover" />
          <img src="https://images.unsplash.com/photo-1574015974293-817f0efebb1b?auto=format&fit=crop&q=80&w=400" alt="Engineers" className="aspect-square rounded-3xl shadow-lg object-cover mt-12" />
        </div>
      </section>

      {/* Footprint Grid */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-primary tracking-tighter mb-2">Global Footprint</h3>
          <p className="text-on-surface-variant">Decades of successful international collaboration</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {footprint.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:border-primary transition-all group ambient-shadow">
              <span className="font-label text-[10px] text-tertiary font-black mb-1 block uppercase tracking-widest">{f.year}</span>
              <span className="font-black text-primary text-lg block leading-tight">{f.city}</span>
              <span className="text-[9px] text-on-surface-variant uppercase mt-2 font-bold tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{f.country}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
