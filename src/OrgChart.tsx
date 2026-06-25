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

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  function matchesPerson(p: Person): boolean {
    return !query || (p.name + ' ' + p.title + ' ' + (p.cred || '')).toLowerCase().includes(query);
  }

  return (
    <div className="chart-wrap" ref={wrapRef}>
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
