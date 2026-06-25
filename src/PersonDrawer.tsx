import { X, Mail, Phone, Link, Linkedin, ArrowUp } from 'lucide-react';
import { Person, byId, kidMap, colorOf, initials } from './data';

interface Props {
  person: Person | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

function Avatar({ person, size = 52 }: { person: Person; size?: number }) {
  const color = colorOf(person);
  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `color-mix(in srgb, ${color} 12%, white)`,
        color,
        fontSize: size * 0.32,
        letterSpacing: '0.02em',
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

export default function PersonDrawer({ person, onClose, onSelect }: Props) {
  const open = !!person;
  const color = person ? colorOf(person) : '#172220';
  const reports = person ? (kidMap[person.id] ?? []) : [];
  const manager = person?.parent ? byId[person.parent] : null;

  return (
    <>
      {/* Scrim */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-200"
        style={{
          background: 'rgba(23,34,32,.35)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full z-60 flex flex-col"
        style={{
          width: 'min(380px, 100vw)',
          left: 'max(0px, calc(100vw - 380px))',
          right: 0,
          background: '#fff',
          boxShadow: '-8px 0 30px rgba(23,34,32,.15)',
          transform: open ? 'translateX(0)' : 'translateX(105%)',
          transition: 'transform .25s cubic-bezier(.3,.7,.3,1)',
          zIndex: 60,
        }}
        aria-label="Person details"
      >
        {/* Color band */}
        <div style={{ height: 6, background: color, flexShrink: 0 }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          style={{ border: '1px solid #D8DDDB', background: '#fff' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>

        {person && (
          <>
            {/* Head */}
            <div className="px-6 pt-6 text-center flex-shrink-0">
              <div className="flex justify-center mb-3">
                <Avatar person={person} size={84} />
              </div>
              <div className="text-xl font-extrabold tracking-tight" style={{ color: '#172220' }}>
                {person.name}
              </div>
              {person.cred && (
                <div className="text-xs font-semibold mt-0.5 tracking-wide" style={{ color: '#5B6663' }}>
                  {person.cred}
                </div>
              )}
              <div className="text-sm mt-1" style={{ color: '#5B6663' }}>
                {person.title}
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto flex-1">
              {/* Contact rows */}
              {person.email ? (
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-3 py-3 text-sm no-underline transition-colors hover:text-[var(--cc)]"
                  style={{ borderBottom: '1px solid #D8DDDB', color: '#172220', ['--cc' as string]: color } as React.CSSProperties}
                >
                  <Mail size={17} className="flex-shrink-0" style={{ stroke: '#5B6663' }} />
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: '#5B6663' }}>Email</span>
                    <span className="break-all">{person.email}</span>
                  </span>
                </a>
              ) : null}

              {person.phone && (
                <a
                  href={`tel:${person.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 py-3 text-sm no-underline"
                  style={{ borderBottom: '1px solid #D8DDDB', color: '#172220' }}
                >
                  <Phone size={17} className="flex-shrink-0" style={{ stroke: '#5B6663' }} />
                  <span>
                    <span className="block text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: '#5B6663' }}>Direct</span>
                    {person.phone}
                  </span>
                </a>
              )}

              {person.mobile && (
                <a
                  href={`tel:${person.mobile.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 py-3 text-sm no-underline"
                  style={{ borderBottom: '1px solid #D8DDDB', color: '#172220' }}
                >
                  <Phone size={17} className="flex-shrink-0" style={{ stroke: '#5B6663' }} />
                  <span>
                    <span className="block text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: '#5B6663' }}>Mobile</span>
                    {person.mobile}
                  </span>
                </a>
              )}

              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 text-sm no-underline"
                  style={{ borderBottom: '1px solid #D8DDDB', color: '#172220' }}
                >
                  <Linkedin size={17} className="flex-shrink-0" style={{ stroke: '#5B6663' }} />
                  <span>
                    <span className="block text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: '#5B6663' }}>LinkedIn</span>
                    View profile
                  </span>
                </a>
              )}

              {person.bio && (
                <a
                  href={person.bio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 text-sm no-underline"
                  style={{ borderBottom: '1px solid #D8DDDB', color: '#172220' }}
                >
                  <Link size={17} className="flex-shrink-0" style={{ stroke: '#5B6663' }} />
                  <span>
                    <span className="block text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: '#5B6663' }}>ECR Bio</span>
                    ecrtx.com/team/{person.id}
                  </span>
                </a>
              )}

              {manager && (
                <button
                  className="flex items-center gap-3 py-3 w-full text-left text-sm font-semibold"
                  style={{ borderBottom: '1px solid #D8DDDB', color: '#172220' }}
                  onClick={() => onSelect(manager.id)}
                >
                  <ArrowUp size={17} className="flex-shrink-0" style={{ stroke: '#5B6663' }} />
                  <span>
                    <span className="block text-xs font-bold tracking-wide uppercase mb-0.5" style={{ color: '#5B6663' }}>Reports to</span>
                    {manager.name}
                  </span>
                </button>
              )}

              {/* Direct reports */}
              {reports.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-xs font-extrabold tracking-widest uppercase mb-2" style={{ color: '#5B6663' }}>
                    Direct Reports &middot; {reports.length}
                  </h4>
                  {reports.map(r => (
                    <button
                      key={r.id}
                      className="flex items-center gap-2.5 w-full text-left py-1.5 px-1 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => onSelect(r.id)}
                    >
                      <Avatar person={r} size={28} />
                      <span className="text-sm font-semibold" style={{ color: '#172220' }}>
                        {r.name}
                        <span className="font-normal text-xs ml-1.5" style={{ color: '#5B6663' }}>
                          &middot; {r.title}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
