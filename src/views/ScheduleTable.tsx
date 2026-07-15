import React, { useMemo, useState } from 'react';
import { Search, Filter, MapPin, Clock, Users, Star, ArrowUpDown, Table2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SESSIONS, CONFERENCE_DAYS } from '../constants';
import { useWishlistContext } from '../context/WishlistContext';
import { StarButton } from '../components/StarButton';

type SortKey = 'date' | 'time' | 'location' | 'title';

const TRACKS = Array.from(new Set(SESSIONS.map((s) => s.category || s.type))).sort();

export default function ScheduleTableView() {
  const [query, setQuery] = useState('');
  const [day, setDay] = useState<string>('All');
  const [track, setTrack] = useState<string>('All');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortAsc, setSortAsc] = useState(true);
  const { isWishlisted, toggle } = useWishlistContext();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = SESSIONS.filter((s) => {
      if (day !== 'All' && s.date !== day) return false;
      if (track !== 'All' && (s.category || s.type) !== track) return false;
      if (q === '') return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        (s.category || s.type).toLowerCase().includes(q)
      );
    });

    const dayIndex = (d: string) => CONFERENCE_DAYS.indexOf(d);
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'time':
          cmp = a.startHour - b.startHour || dayIndex(a.date) - dayIndex(b.date);
          break;
        case 'location':
          cmp = a.location.localeCompare(b.location);
          break;
        case 'title':
          cmp = a.title.localeCompare(b.title);
          break;
        case 'date':
        default:
          cmp = dayIndex(a.date) - dayIndex(b.date) || a.startHour - b.startHour;
      }
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [query, day, track, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      <section className="mb-10">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Full Programme</span>
        <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter uppercase mb-3 flex items-center gap-3">
          <Table2 className="text-tertiary" /> Schedule <span className="text-tertiary">Table</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-medium opacity-80">
          Search and filter every session by day, track, room, or speaker. Star any row to add it to My Schedule.
        </p>
      </section>

      {/* Controls */}
      <section className="mb-6 space-y-4 sticky top-16 bg-background/90 backdrop-blur-md z-40 py-4 border-b border-slate-100">
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-outline" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, speaker, room, or track…"
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-primary placeholder:text-outline focus:ring-4 focus:ring-secondary/10 shadow-sm"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center gap-2 flex-none">
            <Filter size={16} className="text-secondary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Day:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', ...CONFERENCE_DAYS].map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                  day === d ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest flex-none">Track:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTrack('All')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                track === 'All' ? 'bg-secondary text-white' : 'bg-white border border-slate-100 text-on-surface-variant hover:text-secondary'
              }`}
            >
              All
            </button>
            {TRACKS.map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                  track === t ? 'bg-secondary text-white' : 'bg-white border border-slate-100 text-on-surface-variant hover:text-secondary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden ambient-shadow">
        <div className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-outline border-b border-slate-100">
          {rows.length} session{rows.length === 1 ? '' : 's'}
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-surface-container-low text-primary">
                <Th label="Day" onClick={() => toggleSort('date')} active={sortKey === 'date'} asc={sortAsc} />
                <Th label="Time" onClick={() => toggleSort('time')} active={sortKey === 'time'} asc={sortAsc} />
                <Th label="Session" onClick={() => toggleSort('title')} active={sortKey === 'title'} asc={sortAsc} />
                <Th label="Room" onClick={() => toggleSort('location')} active={sortKey === 'location'} asc={sortAsc} />
                <Th label="Speaker" onClick={() => {}} active={false} asc={sortAsc} />
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-right">Save</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const starred = isWishlisted(s.id);
                return (
                  <tr
                    key={s.id}
                    className={`border-b border-slate-50 hover:bg-surface-container-low/60 transition-colors ${
                      starred ? 'bg-tertiary-container/20' : ''
                    }`}
                  >
                    <td className="px-4 py-4 align-top">
                      <span className="font-black text-secondary text-xs whitespace-nowrap">{s.date}</span>
                    </td>
                    <td className="px-4 py-4 align-top whitespace-nowrap">
                      <span className="font-bold text-primary text-xs">{s.time}</span>
                      <span className="block text-[10px] text-outline uppercase tracking-widest">{s.endTime}</span>
                    </td>
                    <td className="px-4 py-4 align-top max-w-[320px]">
                      <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest mb-1.5 ${
                        s.type === 'Keynote' ? 'bg-primary text-white' : s.type === 'Workshop' ? 'bg-secondary text-white' : 'bg-surface-container-highest text-primary'
                      }`}>
                        {s.category || s.type}
                      </span>
                      <p className="font-bold text-primary text-sm leading-snug">{s.title}</p>
                    </td>
                    <td className="px-4 py-4 align-top whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary/80">
                        <MapPin size={12} className="text-tertiary" /> {s.location}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                        <Users size={12} className="text-secondary flex-none" /> {s.speaker}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top text-right">
                      <StarButton
                        active={starred}
                        onToggle={() => toggle(s.id)}
                        className="p-2 bg-slate-50 hover:bg-white shadow-sm"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <p className="text-center text-on-surface-variant py-16">No sessions match your search and filters.</p>
        )}
      </div>
    </main>
  );
}

function Th({
  label,
  onClick,
  active,
  asc,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
  asc: boolean;
}) {
  return (
    <th className="px-4 py-4">
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors ${
          active ? 'text-primary' : 'text-outline hover:text-primary'
        }`}
      >
        {label}
        <ArrowUpDown size={12} className={active ? 'opacity-100' : 'opacity-40'} />
        {active && <span className="text-[8px]">{asc ? '▲' : '▼'}</span>}
      </button>
    </th>
  );
}
