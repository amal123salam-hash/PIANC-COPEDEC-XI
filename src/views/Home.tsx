import React from 'react';
import { Calendar, MapPin, Download, MessageSquare, ChevronRight, Users, FileText, Clock, Waves, ArrowRight, Handshake, Gem, Award, Trophy, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { SPEAKERS, TIMELINE, SPONSORSHIP_TIERS } from '../constants';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function HomeView() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=2000" 
            alt="Coastline"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 py-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container mb-6 shadow-lg">
              <Calendar size={14} className="fill-current" />
              <span className="font-label text-[10px] uppercase tracking-widest font-bold">21–26 February 2027</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
              PIANC – <br/>COPEDEC XI
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/90 font-medium mb-8 leading-relaxed border-l-4 border-tertiary pl-6">
              "Adapting coastal, port and waterway infrastructure to the changing climate."
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-tertiary text-primary px-8 py-4 rounded-full font-display font-black text-lg hover:scale-105 transition-transform shadow-xl">
                Register Now
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-display font-black text-lg hover:bg-white/20 transition-all">
                Submit Abstract
              </button>
            </div>
            <div className="flex items-start gap-4 text-blue-100">
              <MapPin className="text-tertiary mt-1" />
              <div>
                <p className="font-bold text-lg">IIT Madras, Chennai</p>
                <p className="text-sm opacity-80">Tamil Nadu, India</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Countdown Floating Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-12 right-6 lg:right-24 z-20 hidden lg:block"
        >
          <div className="glass-effect p-8 rounded-2xl border border-white/10 shadow-2xl ambient-shadow">
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary-container mb-4 text-center font-bold">Countdown to Event</p>
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-4xl font-black text-white">840</span>
                <span className="text-[10px] uppercase font-bold text-white/50">Days</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-black text-white">12</span>
                <span className="text-[10px] uppercase font-bold text-white/50">Hrs</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-black text-white">45</span>
                <span className="text-[10px] uppercase font-bold text-white/50">Min</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Quick Actions */}
      <section className="max-w-screen-xl mx-auto px-6 -mt-24 relative z-30 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BentoLink to="#" icon={<Download />} title="Downloads" desc="Brochures, templates, and guidelines." />
          <BentoLink to="#" icon={<MessageSquare />} title="Contact" desc="Get in touch with the committee." />
          
          <div className="sm:col-span-2 grid grid-cols-2 gap-4">
            <QuickAction to="/registration" icon={<Users />} label="Registration" />
            <QuickAction to="/abstracts" icon={<FileText />} label="Abstracts" />
            <QuickAction to="/schedule" icon={<Calendar />} label="Schedule" />
            <QuickAction to="/papers" icon={<FileText />} label="Papers" />
          </div>
        </div>
        
        <Link to="/about" className="mt-4 block group bg-primary p-8 rounded-2xl shadow-2xl overflow-hidden relative min-h-[160px] transition-transform hover:scale-[1.005]">
          <div className="absolute top-0 right-0 opacity-10">
            <Waves size={160} />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-display font-black text-2xl text-white mb-2">Venue & Accommodation</h3>
              <p className="text-blue-200/80 text-sm max-w-lg">Explore the historic IIT Madras campus and find nearby luxury hotels in the heart of Chennai.</p>
            </div>
            <div className="flex items-center gap-2 text-tertiary mt-6 font-bold">
              <span>Explore Campus</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </Link>
      </section>

      {/* Keynote Speakers */}
      <section className="max-w-screen-xl mx-auto px-6 py-12 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Distinguished Faculty</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">Keynote Speakers</h2>
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-all flex items-center gap-3">
            View All Speakers <Users size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPEAKERS.map((speaker, idx) => (
            <motion.div 
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all ambient-shadow"
            >
              <div className="aspect-square bg-slate-100 overflow-hidden">
                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h4 className="font-black text-xl text-primary mb-1">{speaker.name}</h4>
                <p className="text-secondary text-sm font-bold mb-3">{speaker.role}</p>
                <p className="text-on-surface-variant text-xs italic opacity-70">{speaker.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-screen-xl mx-auto px-6 py-12 mb-32">
        <div className="mb-16">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Key Milestones</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">Timeline & Dates</h2>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -translate-y-1/2 hidden lg:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {TIMELINE.map((item, idx) => (
              <div key={item.id} className="relative group">
                <div className="lg:mb-12">
                  <div className="text-5xl font-black text-primary/10 group-hover:text-primary transition-colors duration-500 mb-2">{item.number}</div>
                  <h4 className="font-display font-black text-primary text-lg leading-tight mb-1">{item.title}</h4>
                  <p className="text-secondary font-bold text-sm tracking-tight">{item.date}</p>
                </div>
                <div className="w-4 h-4 bg-tertiary border-4 border-white rounded-full absolute top-1/2 left-0 -translate-y-1/2 hidden lg:block z-10 shadow-sm transition-transform group-hover:scale-125"></div>
                <div className="lg:mt-12 bg-surface-container-low p-6 rounded-2xl border-l-2 border-tertiary/20">
                  <p className="text-xs text-on-surface-variant leading-relaxed font-medium italic opacity-80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="bg-primary text-white py-32 overflow-hidden relative rounded-t-[3rem]">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Handshake size={480} className="absolute -right-24 -top-24 rotate-12" />
        </div>
        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary font-bold mb-4 block">Partner with Us</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Sponsorship</h2>
            <p className="text-blue-100/70 text-lg">Showcase your organization to global maritime leaders. Various tiers available to suit your marketing goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPONSORSHIP_TIERS.map((tier) => (
              <div key={tier.id} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-tertiary transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  {tier.id === 'diamond' && <Gem className="text-tertiary" size={40} />}
                  {tier.id === 'platinum' && <Award className="text-slate-300" size={40} />}
                  {tier.id === 'gold' && <Trophy className="text-[#FFD700]" size={40} />}
                  {tier.id === 'silver' && <Star className="text-slate-400" size={40} />}
                  <h3 className="font-display font-black text-xl">{tier.name}</h3>
                </div>
                <p className="text-3xl font-black text-tertiary mb-6">{tier.price}</p>
                <ul className="text-sm text-blue-100/60 space-y-3 mb-10">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <ChevronRight size={14} className="text-tertiary" />
                       {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all ${tier.id === 'diamond' ? 'bg-tertiary text-primary hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BentoLink({ to, icon, title, desc }: { to: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Link to={to} className="group bg-white p-8 rounded-2xl shadow-sm ambient-shadow hover:translate-y-[-4px] transition-all">
      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-display font-black text-lg text-primary mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm opacity-70">{desc}</p>
    </Link>
  );
}

function QuickAction({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link to={to} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-secondary transition-all flex flex-col items-center text-center justify-center">
      <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3 group-hover:bg-secondary group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="font-black text-primary text-[10px] uppercase tracking-widest">{label}</span>
    </Link>
  );
}
