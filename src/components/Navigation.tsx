import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Calendar, FileText, Info, MoreHorizontal, Download, MessageSquare, MapPin, Users, Store, Handshake, Mail, AppWindow } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm shadow-blue-900/5">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-200/50 transition-colors text-primary"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-primary font-black tracking-tighter text-xl hidden sm:block">PIANC-COPEDEC XI</span>
              <span className="text-primary font-black tracking-tighter text-xl sm:hidden">COPEDEC XI</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>Home</NavLink>
            <NavLink to="/info" className={({ isActive }) => `text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>Information</NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>About</NavLink>
            <NavLink to="/schedule" className={({ isActive }) => `text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>Schedule</NavLink>
            <NavLink to="/papers" className={({ isActive }) => `text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}>Papers</NavLink>
          </nav>

          <div className="flex items-center gap-2">
             <button className="p-2 rounded-full hover:bg-slate-200/50 transition-colors text-primary">
                <AppWindow size={20} />
             </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-slate-900 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex flex-col gap-2 relative">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="text-xl font-bold text-primary tracking-tight pr-8">PIANC-COPEDEC XI</div>
                <div className="font-label text-[10px] text-secondary uppercase tracking-widest font-bold">IIT Madras, India</div>
              </div>

              <nav className="flex-1 py-4 overflow-y-auto no-scrollbar">
                <DrawerLink to="/" icon={<Home size={20} />} label="Home" onClick={() => setIsDrawerOpen(false)} />
                <DrawerLink to="/info" icon={<Info size={20} />} label="Information" onClick={() => setIsDrawerOpen(false)} />
                <DrawerLink to="/about" icon={<Users size={20} />} label="About the Conference" onClick={() => setIsDrawerOpen(false)} />
                <DrawerLink to="/schedule" icon={<Calendar size={20} />} label="Schedule" onClick={() => setIsDrawerOpen(false)} />
                <DrawerLink to="/papers" icon={<FileText size={20} />} label="Papers" onClick={() => setIsDrawerOpen(false)} />
                
                <div className="my-2 border-t border-slate-100 mx-4" />
                
                <DrawerLink to="/registration" icon={<AppWindow size={20} />} label="Registration" onClick={() => setIsDrawerOpen(false)} />
                <DrawerLink to="/sponsors" icon={<Handshake size={20} />} label="Sponsorship" onClick={() => setIsDrawerOpen(false)} />
                <DrawerLink to="/contact" icon={<Mail size={20} />} label="Contact Us" onClick={() => setIsDrawerOpen(false)} />
              </nav>

              <div className="p-4 bg-slate-50 text-[10px] text-slate-500 uppercase tracking-widest font-bold border-t border-slate-100">
                © 2027 IIT Madras • Coastal Engineering
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DrawerLink({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => `flex items-center px-6 py-3 transition-all duration-200 ${isActive ? 'bg-blue-50 text-primary font-bold border-l-4 border-tertiary' : 'text-slate-600 hover:bg-slate-50'}`}
    >
      <span className="mr-4 text-primary opacity-70">{icon}</span>
      {label}
    </NavLink>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-primary dark:bg-slate-950 md:hidden border-t border-white/10 rounded-t-xl shadow-[0_-4px_20px_rgba(0,30,64,0.15)]">
      <div className="flex justify-around items-center h-16 px-4">
        <NavIcon to="/" icon={<Home size={20} />} label="Home" />
        <NavIcon to="/schedule" icon={<Calendar size={20} />} label="Schedule" />
        <NavIcon to="/papers" icon={<FileText size={20} />} label="Papers" />
        <NavIcon to="/info" icon={<MoreHorizontal size={20} />} label="Info" />
      </div>
    </nav>
  );
}

function NavIcon({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex flex-col items-center justify-center pt-2 transition-all gap-1 ${isActive ? 'text-tertiary font-bold border-t-2 border-tertiary' : 'text-blue-200/60 hover:text-amber-200'}`}>
      {icon}
      <span className="uppercase tracking-widest text-[9px] font-bold font-sans">{label}</span>
    </NavLink>
  );
}
