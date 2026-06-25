import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Person, kidMap, roots, colorOf, initials } from './data';

function Avatar({ person, size = 52 }: { person: Person; size?: number }) {
  const color = colorOf(person);
  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden font-bold mx-auto"
      style={{
        width: size,
        height: size,
        background: `color-mix(in srgb, ${color} 12%, white)`,
        color,
        fontSize: size * 0.32,
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      {person.photo ? (
        <img src={person.photo} alt="" className="w-full h-full object-cover" />
      ) : (
        initials(person)
      )}
    </div>
  );
}

interface FilteredCardProps {
  person: Person;
  isFiltered: boolean;
  matchesPerson: (p: Person) => boolean;
  onSelect: (id: string) => void;
  forceExpand: number;
  forceCollapse: number;
  isRoot?: boolean;
}

function OrgNode({ person, isFiltered, matchesPerson, onSelect, forceExpand, forceCollapse, isRoot }: FilteredCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const color = colorOf(person);
  const children = kidMap[person.id] ?? [];
  const hit = isFiltered && matchesPerson(person);
  const dim = isFiltered && !matchesPerson(person);

  const prevExpand = useRef(forceExpand);
  const prevCollapse = useRef(forceCollapse);

  useEffect(() => {
    if (forceExpand !== prevExpand.current) {
      prevExpand.current = forceExpand;
      setCollapsed(false);
    }
  }, [forceExpand]);

  useEffect(() => {
    if (forceCollapse !== prevCollapse.current) {
      prevCollapse.current = forceCollapse;
      if (children.length > 0) setCollapsed(true);
    }
  }, [forceCollapse, children.length]);

  // When filter is active, always expand
  useEffect(() => {
    if (isFiltered) setCollapsed(false);
  }, [isFiltered]);

  const showChildren = children.length > 0 && !collapsed;

  return (
    <li className={`org-li${isRoot ? ' org-li-root' : ''}`}>
      <div
        className="org-card"
        tabIndex={0}
        style={{
          borderTopColor: color,
          opacity: dim ? 0.28 : 1,
          outline: hit ? `2px solid ${color}` : undefined,
          outlineOffset: hit ? 2 : undefined,
        }}
        onClick={() => onSelect(person.id)}
        onKeyDown={e => e.key === 'Enter' && onSelect(person.id)}
      >
        <Avatar person={person} size={52} />
        <div className="org-name">{person.name}</div>
        {person.cred && <div className="org-cred">{person.cred}</div>}
        <div className="org-title">{person.title}</div>
        {children.length > 0 && (
          <button
            className="org-twist"
            style={{ color }}
            onClick={e => { e.stopPropagation(); setCollapsed(c => !c); }}
            aria-label={collapsed ? 'Expand' : 'Collapse'}
          >
            <ChevronDown
              size={13}
              style={{
                transition: 'transform .15s ease',
                transform: collapsed ? 'rotate(-90deg)' : 'none',
              }}
            />
            {children.length}
          </button>
        )}
      </div>
      {showChildren && (
        <ul className="org-ul">
          {children.map(child => (
            <OrgNode
              key={child.id}
              person={child}
              isFiltered={isFiltered}
              matchesPerson={matchesPerson}
              onSelect={onSelect}
              forceExpand={forceExpand}
              forceCollapse={forceCollapse}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

interface OrgChartProps {
  query: string;
  onSelect: (id: string) => void;
  expandTrigger: number;
  collapseTrigger: number;
}

export default function OrgChart({ query, onSelect, expandTrigger, collapseTrigger }: OrgChartProps) {
  const isFiltered = !!query;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // Click-and-drag panning (mouse only; touch keeps native scrolling).
  const drag = useRef({ active: false, startX: 0, startY: 0, left: 0, top: 0, vWindow: false, moved: false });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = wrapRef.current;
    if (!el) return;
    // The wrap scrolls horizontally; vertical overflow usually scrolls the
    // window. Pan whichever is actually the vertical scroller.
    const vWindow = el.scrollHeight <= el.clientHeight;
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      left: el.scrollLeft,
      top: vWindow ? window.scrollY : el.scrollTop,
      vWindow,
      moved: false,
    };
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const d = drag.current;
    const el = wrapRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) > 5) d.moved = true;
    if (d.moved) {
      e.preventDefault();
      el.scrollLeft = d.left - dx;
      if (d.vWindow) {
        window.scrollTo(window.scrollX, d.top - dy);
      } else {
        el.scrollTop = d.top - dy;
      }
    }
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  // Swallow the click that follows a drag so it doesn't open a person card.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  function matchesPerson(p: Person): boolean {
    return !query || (p.name + ' ' + p.title + ' ' + (p.cred || '')).toLowerCase().includes(query);
  }

  return (
    <div
      className={`chart-wrap${dragging ? ' dragging' : ''}`}
      ref={wrapRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onClickCapture={onClickCapture}
    >
      <div className="chart-scroll-inner">
        <ul className="org-tree">
          {roots.map(r => (
            <OrgNode
              key={r.id}
              person={r}
              isFiltered={isFiltered}
              matchesPerson={matchesPerson}
              onSelect={onSelect}
              forceExpand={expandTrigger}
              forceCollapse={collapseTrigger}
              isRoot
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
