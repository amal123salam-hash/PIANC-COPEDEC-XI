import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Layers, X } from 'lucide-react';
import { motion } from 'motion/react';
import { MAP_LOCATIONS, MAP_CENTER } from '../constants';
import type { MapLocation } from '../types';

type Category = MapLocation['category'];

const CATEGORY_COLORS: Record<Category, string> = {
  Hall: '#003366',
  Facility: '#006781',
  Service: '#C8A84B',
  Transport: '#7c3aed',
  Stay: '#db2777',
};

const CATEGORY_ORDER: Category[] = ['Hall', 'Facility', 'Service', 'Transport', 'Stay'];

function pinIcon(color: string, active: boolean) {
  const size = active ? 38 : 30;
  return L.divIcon({
    className: 'copedec-pin',
    html: `
      <div style="width:${size}px;height:${size}px;transform:translate(-50%,-50%);position:relative;">
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" style="filter:drop-shadow(0 4px 6px rgba(0,30,64,.35));">
          <path fill="${color}" stroke="white" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.6" fill="white"/>
        </svg>
      </div>`,
    iconSize: [0, 0],
  });
}

export default function MapView() {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const [activeCats, setActiveCats] = useState<Set<Category>>(new Set(CATEGORY_ORDER));
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const [query, setQuery] = useState('');

  // Initialise the map once.
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;
    const map = L.map(mapElRef.current, {
      center: MAP_CENTER,
      zoom: 16,
      scrollWheelZoom: true,
      zoomControl: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;

    MAP_LOCATIONS.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: pinIcon(CATEGORY_COLORS[loc.category], false),
      })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px"><strong style="color:#001e40">${loc.name}</strong><br/><span style="font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#006781">${loc.category}</span><p style="margin:6px 0 0;font-size:12px">${loc.description}</p></div>`,
        );
      marker.on('click', () => setSelected(loc));
      markersRef.current[loc.id] = marker;
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MAP_LOCATIONS.filter(
      (l) => activeCats.has(l.category) && (q === '' || l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)),
    );
  }, [activeCats, query]);

  // Show/hide markers based on the active category + query filter.
  useEffect(() => {
    MAP_LOCATIONS.forEach((loc) => {
      const marker = markersRef.current[loc.id];
      if (!marker || !mapRef.current) return;
      if (filtered.includes(loc)) {
        if (!mapRef.current.hasLayer(marker)) marker.addTo(mapRef.current);
      } else {
        if (mapRef.current.hasLayer(marker)) mapRef.current.removeLayer(marker);
      }
    });
  }, [filtered]);

  const focusLocation = (loc: MapLocation) => {
    setSelected(loc);
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([loc.lat, loc.lng], 17, { duration: 0.6 });
    markersRef.current[loc.id]?.openPopup();
  };

  const toggleCat = (cat: Category) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      <section className="mb-10">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">IIT Madras Campus</span>
        <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter uppercase mb-3">Venue <span className="text-tertiary">Map</span></h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-medium opacity-80">
          Find your session halls, the registration desk, medical help, and transport points across the campus.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Map */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 h-[420px] lg:h-[600px]">
          <div ref={mapElRef} className="w-full h-full" />
          {selected && (
            <div className="absolute bottom-4 left-4 right-4 z-[500] bg-white rounded-2xl shadow-2xl p-4 border-l-4 border-tertiary">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: CATEGORY_COLORS[selected.category] }}>{selected.category}</span>
                  <h3 className="font-black text-primary text-lg leading-tight">{selected.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{selected.description}</p>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Close" className="flex-none p-1 rounded-full hover:bg-slate-100">
                  <X size={16} />
                </button>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-primary-container transition-all"
              >
                <Navigation size={14} /> Directions
              </a>
            </div>
          )}
        </div>

        {/* Side panel */}
        <aside className="space-y-4">
          <div className="relative">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search locations…"
              className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-primary placeholder:text-outline focus:ring-4 focus:ring-secondary/10 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => {
              const on = activeCats.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                    on ? 'text-white border-transparent' : 'text-outline border-slate-200 bg-white'
                  }`}
                  style={on ? { backgroundColor: CATEGORY_COLORS[cat] } : undefined}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: on ? 'white' : CATEGORY_COLORS[cat] }} />
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto no-scrollbar pr-1">
            {filtered.length === 0 && (
              <p className="text-on-surface-variant text-sm text-center py-8">No locations match your filters.</p>
            )}
            {filtered.map((loc) => (
              <motion.button
                key={loc.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => focusLocation(loc)}
                className={`w-full text-left bg-white rounded-2xl p-4 shadow-sm border transition-all hover:border-secondary ${
                  selected?.id === loc.id ? 'border-tertiary ring-2 ring-tertiary/30' : 'border-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ backgroundColor: CATEGORY_COLORS[loc.category] }} />
                  <span className="font-black text-primary text-sm leading-tight">{loc.name}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug pl-4">{loc.description}</p>
              </motion.button>
            ))}
          </div>

          <p className="text-[10px] text-outline leading-relaxed flex items-start gap-2">
            <Layers size={12} className="mt-0.5 flex-none" />
            Map data © OpenStreetMap contributors. Pin locations are approximate campus waypoints.
          </p>
        </aside>
      </div>
    </main>
  );
}
