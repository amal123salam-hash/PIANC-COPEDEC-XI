import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Star, Bell, Heart, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SESSIONS, CONFERENCE_DAYS } from '../constants';
import { useWishlistContext } from '../context/WishlistContext';
import { useSessionReminders } from '../hooks/useSessionReminders';
import { StarButton } from '../components/StarButton';

const PERMISSION_COPY: Record<string, string> = {
  default: 'Enable browser notifications to get alerted even when this tab is in the background.',
  granted: 'Browser notifications are on — you’ll be alerted before each session.',
  denied: 'Notifications are blocked in your browser. In-app reminders will still appear here.',
  unsupported: 'This browser doesn’t support notifications — in-app reminders will still appear here.',
};

function formatCountdown(minutes: number): string {
  if (minutes <= 0) return 'Starting now';
  if (minutes < 60) return `in ${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `in ${h}h ${m}m`;
}

export default function WishlistView() {
  const { ids, isWishlisted, toggle, clear, count } = useWishlistContext();
  const wishlistedSessions = SESSIONS.filter((s) => ids.includes(s.id));
  const { upcoming, permission, requestPermission } = useSessionReminders(wishlistedSessions);

  const byDay = CONFERENCE_DAYS.map((day) => ({
    day,
    items: wishlistedSessions
      .filter((s) => s.date === day)
      .sort((a, b) => a.startHour - b.startHour),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      <section className="mb-12">
        <Link to="/schedule" className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest mb-6 hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back to full schedule
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-12 h-12 rounded-2xl bg-tertiary/15 text-tertiary flex items-center justify-center">
            <Heart size={24} className="fill-current" />
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter uppercase">My Schedule</h1>
        </div>
        <p className="text-on-surface-variant max-w-2xl text-lg font-medium opacity-80">
          Your personal wishlist of sessions. Starred items are saved on this device and remind you before they start.
        </p>
      </section>

      {/* Notification opt-in */}
      <section className="mb-12 bg-primary rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 opacity-10"><Bell size={160} /></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-tertiary/20 text-tertiary rounded-xl p-3 flex-none"><Bell size={22} /></div>
            <div>
              <h3 className="font-black text-lg mb-1">Session reminders</h3>
              <p className="text-blue-100/80 text-sm max-w-md">{PERMISSION_COPY[permission]}</p>
            </div>
          </div>
          {permission !== 'granted' && permission !== 'unsupported' && (
            <button
              onClick={() => requestPermission()}
              className="flex-none bg-tertiary text-primary font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Enable notifications
            </button>
          )}
          {permission === 'granted' && (
            <span className="flex-none inline-flex items-center gap-2 bg-white/10 text-tertiary-container px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={14} /> Active
            </span>
          )}
        </div>
      </section>

      {/* Upcoming from your list */}
      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-black text-secondary mb-4">Upcoming from your list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((u) => (
              <div key={u.session.id} className="bg-tertiary-container/40 border border-tertiary/30 rounded-2xl p-5 flex items-center gap-4">
                <div className="text-center flex-none w-16">
                  <span className="block font-black text-primary text-lg leading-none">{formatCountdown(u.minutesUntil)}</span>
                  <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">reminder</span>
                </div>
                <div className="min-w-0">
                  <p className="font-black text-primary text-sm leading-tight truncate">{u.session.title}</p>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1.5 mt-1">
                    <MapPin size={11} className="text-tertiary" /> {u.session.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {count === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={clear}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary transition-colors px-4 py-2"
            >
              <Trash2 size={14} /> Clear all ({count})
            </button>
          </div>

          {byDay.map((group) => (
            <section key={group.day} className="mb-16">
              <div className="flex items-center gap-3 mb-6 sticky top-16 bg-background/90 backdrop-blur-md py-3 z-30">
                <Calendar size={18} className="text-secondary" />
                <h3 className="font-black text-2xl text-primary tracking-tight">{group.day}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-outline bg-surface-container-high px-3 py-1 rounded-full">
                  {group.items.length} session{group.items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {group.items.map((session, idx) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-50 ambient-shadow flex items-start gap-4"
                  >
                    <div className="flex-none text-center w-16 pt-1">
                      <span className="block font-black text-secondary text-sm">{session.time}</span>
                      <span className="text-[9px] uppercase font-bold text-outline tracking-widest opacity-60">{session.endTime}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-widest ${
                          session.type === 'Keynote' ? 'bg-primary text-white' : session.type === 'Workshop' ? 'bg-secondary text-white' : 'bg-surface-container-highest text-primary'
                        }`}>
                          {session.category || session.type}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-1">
                          <MapPin size={11} className="text-tertiary" /> {session.location}
                        </span>
                      </div>
                      <h4 className="font-black text-lg text-primary leading-tight">{session.title}</h4>
                      <p className="text-sm text-on-surface-variant mt-1">{session.speaker}</p>
                    </div>
                    <StarButton
                      active={isWishlisted(session.id)}
                      onToggle={() => toggle(session.id)}
                      className="p-2 bg-slate-50 hover:bg-white shadow-sm flex-none"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </main>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 bg-surface-container-low rounded-3xl border border-slate-100">
      <div className="w-16 h-16 rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center mx-auto mb-6">
        <Star size={28} />
      </div>
      <h3 className="font-black text-2xl text-primary mb-2">No sessions yet</h3>
      <p className="text-on-surface-variant max-w-sm mx-auto mb-8">Browse the schedule and tap the star on any session to add it here.</p>
      <Link to="/schedule" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg">
        <Calendar size={16} /> Go to Schedule
      </Link>
    </div>
  );
}
