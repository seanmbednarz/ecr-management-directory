import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Download } from 'lucide-react';
import { PEOPLE, byId } from './data';
import OrgChart from './OrgChart';
import Directory from './Directory';
import PersonDrawer from './PersonDrawer';

type View = 'chart' | 'directory';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function App() {
  const [view, setView] = useState<View>('chart');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandTrigger, setExpandTrigger] = useState(0);
  const [collapseTrigger, setCollapseTrigger] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // On mobile always show directory
  const effectiveView: View = isMobile ? 'directory' : view;

  const totalShown = PEOPLE.filter(p => {
    return !query || (p.name + ' ' + p.title + ' ' + (p.cred || '')).toLowerCase().includes(query);
  }).length;

  const isFiltered = !!query;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const generatedOn = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  // Save/print the chart as a single landscape PDF page. Scales the currently
  // expanded tree to fit the printable page width, then opens the print dialog
  // (which offers "Save as PDF"). Collapse branches first for a cleaner sheet.
  const handleExportPdf = useCallback(() => {
    const tree = document.querySelector('.org-tree') as HTMLElement | null;
    if (tree) {
      const PRINTABLE_W = 950; // US Letter landscape printable width @96dpi
      const zoom = Math.min(1, PRINTABLE_W / tree.scrollWidth);
      document.documentElement.style.setProperty('--print-zoom', String(zoom));
    }
    window.print();
  }, []);

  return (
    <div className="app-root">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="header-inner">
          {/* Top bar: logo + title */}
          <div className="header-top">
            <img src="/ECR_Logo.svg" alt="ECR" className="header-logo" />
            <div className="header-divider" />
            <div className="header-brand">
              <h1 className="header-title">Team Directory</h1>
              <p className="header-sub">Equitable Commercial Realty &middot; Austin, TX</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            {/* Search */}
            <div className="search-wrap">
              <Search size={16} className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search name or title…"
                autoComplete="off"
                value={query}
                onChange={e => setQuery(e.target.value.toLowerCase())}
                className="search-input"
              />
            </div>

            {/* View toggle — hidden on mobile */}
            {!isMobile && (
              <div className="seg" role="tablist">
                <button
                  className={`seg-btn ${view === 'chart' ? 'active' : ''}`}
                  onClick={() => setView('chart')}
                >
                  Chart
                </button>
                <button
                  className={`seg-btn ${view === 'directory' ? 'active' : ''}`}
                  onClick={() => setView('directory')}
                >
                  Directory
                </button>
              </div>
            )}

            {/* Expand / Collapse (chart only, desktop only) */}
            {!isMobile && effectiveView === 'chart' && (
              <>
                <button className="tool-btn" onClick={() => setExpandTrigger(t => t + 1)}>
                  Expand all
                </button>
                <button className="tool-btn" onClick={() => setCollapseTrigger(t => t + 1)}>
                  Collapse all
                </button>
                <button
                  className="tool-btn print-btn"
                  onClick={handleExportPdf}
                  title="Save or print the org chart as a PDF"
                >
                  <Download size={13} /> Save as PDF
                </button>
              </>
            )}

            {/* Count */}
            <span className="count-badge">
              {isFiltered ? `${totalShown} of ${PEOPLE.length} people` : `${PEOPLE.length} people`}
            </span>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main>
        {effectiveView === 'chart' && (
          <>
            <div className="print-only print-header">
              <div className="print-brand">
                <img src="/ECR_Logo.svg" alt="ECR" className="print-logo" />
                <div>
                  <div className="print-title">Management Org Chart</div>
                  <div className="print-sub">Equitable Commercial Realty &middot; Austin, TX</div>
                </div>
              </div>
              <div className="print-meta">
                {PEOPLE.length} people<br />Generated {generatedOn}
              </div>
            </div>
            <OrgChart
              query={query}
              onSelect={handleSelect}
              expandTrigger={expandTrigger}
              collapseTrigger={collapseTrigger}
            />
            <div className="print-only print-footer">
              <span>management.ecrtx.io</span>
              <span>Equitable Commercial Realty</span>
            </div>
          </>
        )}
        {effectiveView === 'directory' && (
          <div className="dir-wrap">
            <Directory
              query={query}
              onSelect={handleSelect}
            />
          </div>
        )}
      </main>

      {/* ===== DETAIL DRAWER ===== */}
      <PersonDrawer
        person={selectedId ? byId[selectedId] ?? null : null}
        onClose={() => setSelectedId(null)}
        onSelect={handleSelect}
      />
    </div>
  );
}
