import { useCallback, useEffect, useRef, useState } from 'react';
import { SESSIONS } from '../constants';

/** The conference year — used to turn "Feb 21, 09:00" into a concrete Date. */
const CONFERENCE_YEAR = 2027;

function parseDay(dateLabel: string): number {
  // e.g. "Feb 21" -> 21
  const m = dateLabel.match(/(\d{1,2})/);
  return m ? parseInt(m[1], 10) : 1;
}

export type ConferenceSession = (typeof SESSIONS)[number];

/** Build a concrete Date for a session start on the conference calendar. */
export function sessionDate(session: ConferenceSession): Date {
  const month = 1; // February (0-indexed)
  const day = parseDay(session.date);
  const hour = session.startHour;
  const minutes = Math.round((hour % 1) * 60);
  return new Date(CONFERENCE_YEAR, month, day, Math.floor(hour), minutes);
}

export interface UpcomingSession {
  session: ConferenceSession;
  startsAt: Date;
  /** Whole minutes until the session starts (clamped at 0). */
  minutesUntil: number;
}

export type NotifyPermission = 'default' | 'granted' | 'denied' | 'unsupported';

/**
 * Decides which wishlisted sessions start within `windowMinutes` from `now`, and
 * exposes a requestable browser Notification permission. Ticks every 30s so the
 * in-app banner stays fresh during an active conference day.
 */
export function useSessionReminders(
  wishlisted: ConferenceSession[],
  windowMinutes = 30,
) {
  const [now, setNow] = useState(() => Date.now());
  const [permission, setPermission] = useState<NotifyPermission>(() =>
    typeof window !== 'undefined' && 'Notification' in window
      ? (Notification.permission as NotifyPermission)
      : 'unsupported',
  );
  const notifiedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported' as const;
    try {
      const result = await Notification.requestPermission();
      setPermission(result as NotifyPermission);
      return result as NotifyPermission;
    } catch {
      return 'denied' as const;
    }
  }, []);

  const fireNotification = useCallback((s: ConferenceSession) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try {
      new Notification('COPEDEC 9 — starting soon', {
        body: `${s.title}\n${s.time} · ${s.location}`,
        icon: '/PIANC-COPEDEC-9/icons/icon-192x192.png',
      });
    } catch {
      /* notifications can throw on some platforms; the in-app banner still shows */
    }
  }, []);

  const upcoming: UpcomingSession[] = wishlisted
    .map((session) => {
      const startsAt = sessionDate(session);
      const diffMs = startsAt.getTime() - now;
      return { session, startsAt, minutesUntil: Math.round(diffMs / 60_000) };
    })
    .filter((u) => u.minutesUntil >= 0 && u.minutesUntil <= windowMinutes)
    .sort((a, b) => a.minutesUntil - b.minutesUntil);

  // Fire browser notifications for sessions that just entered the window.
  useEffect(() => {
    upcoming.forEach((u) => {
      if (!notifiedIds.current.has(u.session.id)) {
        notifiedIds.current.add(u.session.id);
        fireNotification(u.session);
      }
    });
  }, [upcoming, fireNotification]);

  return { upcoming, now, permission, requestPermission };
}
