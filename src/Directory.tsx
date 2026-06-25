import { PEOPLE, colorOf, initials } from './data';
import type { Person } from './data';

interface Props {
  query: string;
  onSelect: (id: string) => void;
}

function Avatar({ person }: { person: Person }) {
  const color = colorOf(person);
  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden font-bold flex-shrink-0"
      style={{
        width: 42,
        height: 42,
        background: `color-mix(in srgb, ${color} 12%, white)`,
        color,
        fontSize: 14,
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

export default function Directory({ query, onSelect }: Props) {
  const members = PEOPLE.filter(p =>
    !query || (p.name + ' ' + p.title + ' ' + (p.cred || '')).toLowerCase().includes(query)
  );

  if (!members.length) {
    return (
      <div className="py-8 text-sm" style={{ color: '#5B6663' }}>
        No one matches that search. Try a different name or title.
      </div>
    );
  }

  return (
    <div className="dir-grid">
      {members.map(p => {
        const color = colorOf(p);
        return (
          <button
            key={p.id}
            className="dir-card"
            style={{ borderLeftColor: color }}
            onClick={() => onSelect(p.id)}
          >
            <Avatar person={p} />
            <div className="text-left">
              <div className="text-sm font-bold" style={{ color: '#172220' }}>{p.name}</div>
              <div className="text-xs mt-0.5" style={{ color: '#5B6663' }}>{p.title}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
