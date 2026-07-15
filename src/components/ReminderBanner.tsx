import React from 'react';
import { Bell, X, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SESSIONS } from '../constants';
import { useWishlistContext } from '../context/WishlistContext';
import { useSessionReminders } from '../hooks/useSessionReminders';

function formatCountdown(minutes: number): string {
  if (minutes <= 0) return 'starting now';
  if (minutes < 60) return `in ${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `in ${h}h ${m}m`;
}

/**
 * In-app "upcoming from your list" reminder banner. Lives near the top of the app
 * and surfaces wishlisted sessions that start within 30 minutes. Doubles as the
 * opt-in entry point for browser notifications when they aren't yet granted.
 */
export function ReminderBanner() {
  const { ids } = useWishlistContext();
  const wishlistedSessions = SESSIONS.filter((s) => ids.includes(s.id));
  const { upcoming, permission, requestPermission } = useSessionReminders(wishlistedSessions);

  const [dismissed, setDismissed] = React.useState<string[]>([]);
  const visible = upcoming.filter((u) => !dismissed.includes(u.session.id));
  const next = visible[0];

  return (
    <AnimatePresence>
      {next && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 inset-x-0 z-40 px-4 pt-3 pointer-events-none"
        >
          <div className="max-w-screen-xl mx-auto pointer-events-auto rounded-2xl bg-primary text-white shadow-2xl border border-tertiary/30 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-tertiary" />
            <div className="flex items-start gap-3 p-4 pl-5">
              <div className="mt-0.5 bg-tertiary/20 text-tertiary rounded-xl p-2 flex-none">
                <Bell size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label text-[10px] uppercase tracking-widest font-black text-tertiary">
                    From your schedule
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-tertiary text-primary px-2 py-0.5 rounded-full">
                    <Clock size={10} /> {formatCountdown(next.minutesUntil)}
                  </span>
                </div>
                <p className="font-black text-sm leading-tight truncate">{next.session.title}</p>
                <p className="text-[11px] text-blue-100/80 flex items-center gap-1.5 mt-0.5">
                  <MapPin size={11} className="text-tertiary" /> {next.session.location} · {next.session.time}
                </p>

                {permission !== 'granted' && permission !== 'unsupported' && (
                  <button
                    onClick={() => requestPermission()}
                    className="mt-2 text-[11px] font-bold underline underline-offset-2 text-tertiary hover:text-tertiary-container"
                  >
                    Enable browser notifications for these reminders
                  </button>
                )}
              </div>
              <button
                onClick={() => setDismissed((d) => [...d, next.session.id])}
                aria-label="Dismiss reminder"
                className="flex-none p-1.5 rounded-full hover:bg-white/10 transition-colors text-blue-100/70"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
