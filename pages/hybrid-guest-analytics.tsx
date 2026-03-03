import { useState, useEffect } from 'react';
import styles from './hybrid-guest-analytics.module.css';

const timePeriods = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date'];
const segments = ['All segments', 'Dormant High Spenders', 'Breakfast Regulars', 'Vegetarian Segment'];
const locations = ['All locations', 'Atlanta, GA', 'Dallas, TX', 'Chicago, IL'];
const channels = ['All channels', 'POS', 'Mobile App', 'Web Ordering'];

// Swappable hero metrics - each slot has alternatives
const metricAlternatives: Record<number, Array<{
  id: string;
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  previous: string;
}>> = {
  0: [
    { id: 'total', label: 'Total Unified Guests', value: '1,248,392', change: '+3.2%', changePositive: true, previous: '1,209,488 previous period' },
    { id: 'new', label: 'New Guests', value: '38,904', change: '+3.2%', changePositive: true, previous: '37,714 previous period' },
    { id: 'churn', label: 'Churn Rate', value: '2.1%', change: '-0.2%', changePositive: true, previous: '2.3% previous period' },
  ],
  1: [
    { id: 'active', label: 'Active Guests', value: '842,109', change: '+1.8%', changePositive: true, previous: '827,219 previous period' },
    { id: 'dormant', label: 'Dormant Guests', value: '406,283', change: '+4.1%', changePositive: false, previous: '390,312 previous period' },
    { id: 'engagement', label: 'Engagement Rate', value: '67%', change: '+1.2%', changePositive: true, previous: '65.8% of total' },
  ],
  2: [
    { id: 'repeat', label: 'Repeat Rate', value: '24.8%', change: '-0.5%', changePositive: false, previous: '25.3% previous period' },
    { id: 'firstTime', label: 'First-Time Rate', value: '75.2%', change: '+0.5%', changePositive: false, previous: '74.7% previous period' },
    { id: 'loyalty', label: 'Loyalty Enrollment', value: '12%', change: '+0.8%', changePositive: true, previous: '11.2% of guests' },
  ],
  3: [
    { id: 'avgVisits', label: 'Avg Visits per Guest', value: '2.4', change: '+2.1%', changePositive: true, previous: '2.3 previous period' },
    { id: 'superRegulars', label: 'Super Regulars', value: '2.3%', change: '+0.4%', changePositive: true, previous: '2.2% of guests' },
    { id: 'freqIndex', label: 'Visit Frequency Index', value: '1.08', change: '+2.1%', changePositive: true, previous: '1.06 baseline' },
  ],
};

const topSegments = [
  { name: 'Dormant High Spenders', guestCount: 4208, avgLtv: '$512.40', status: 'Active' },
  { name: 'Breakfast Regulars', guestCount: 12942, avgLtv: '$84.20', status: 'Active' },
  { name: 'Vegetarian Segment', guestCount: 8115, avgLtv: '$124.00', status: 'Active' },
];

const menuItems = [
  { name: 'Fire Chicken Sandwich', attachRate: '64%', freqDriver: 'High', growth: '+12.4%' },
  { name: 'Double Delight Burger', attachRate: '42%', freqDriver: 'Medium', growth: '+2.1%' },
  { name: 'Truffle Waffle Fries', attachRate: '88%', freqDriver: 'High', growth: '-1.5%' },
];

// Repeat Guest Trend - 12 months of repeat rate %
const repeatTrendData = [
  { month: 'Jul', value: 25.5 },
  { month: 'Aug', value: 25.2 },
  { month: 'Sep', value: 25.0 },
  { month: 'Oct', value: 24.9 },
  { month: 'Nov', value: 25.1 },
  { month: 'Dec', value: 24.8 },
  { month: 'Jan', value: 24.9 },
  { month: 'Feb', value: 24.7 },
  { month: 'Mar', value: 24.8 },
  { month: 'Apr', value: 24.6 },
  { month: 'May', value: 24.7 },
  { month: 'Jun', value: 24.8 },
];

// Frequency distribution data
const freqDistribution = [
  { label: '1 visit', pct: 72.4 },
  { label: '2-3 visits', pct: 18.2 },
  { label: '4-9 visits', pct: 7.1 },
  { label: '10+ visits', pct: 2.3 },
];

// AOV Trend - 12 months
const aovTrendData = [
  { month: 'Jul', value: 18.2 },
  { month: 'Aug', value: 18.5 },
  { month: 'Sep', value: 18.3 },
  { month: 'Oct', value: 18.8 },
  { month: 'Nov', value: 18.6 },
  { month: 'Dec', value: 19.1 },
  { month: 'Jan', value: 18.9 },
  { month: 'Feb', value: 19.2 },
  { month: 'Mar', value: 19.0 },
  { month: 'Apr', value: 19.3 },
  { month: 'May', value: 19.1 },
  { month: 'Jun', value: 19.4 },
];

// Alternative chart data for chart 0 (trend charts)
const activeGuestTrendData = repeatTrendData.map((d) => ({ ...d, value: 65 + (d.value - 24) * 2 }));
const newGuestTrendData = repeatTrendData.map((d, i) => ({ ...d, value: 28 + i * 0.5 + (i % 3) }));

// Alternative for chart 1 - segment share of total guests
const segmentMixData = [
  { label: 'Other', pct: 94 },
  { label: 'Breakfast Regulars', pct: 2.5 },
  { label: 'Dormant High Spenders', pct: 2 },
  { label: 'Vegetarian', pct: 1.5 },
];
const visitFreqOverTime = [
  { label: 'Jan', pct: 2.2 },
  { label: 'Mar', pct: 2.25 },
  { label: 'May', pct: 2.35 },
  { label: 'Jun', pct: 2.4 },
];

// Alternative for chart 2 (revenue)
const revenueByChannel = { primary: 52, secondary: 28, tertiary: 20 };
const revenueBySegment = { primary: 48, secondary: 32, tertiary: 20 };

// Alternative for chart 3 (AOV)
const checkSizeData = [
  { label: 'Under $10', pct: 18 },
  { label: '$10–20', pct: 42 },
  { label: '$20–35', pct: 28 },
  { label: '$35+', pct: 12 },
];
const itemsPerOrderData = aovTrendData.map((d, i) => ({ ...d, value: 2.8 + i * 0.05 }));

const maxRepeat = Math.max(...repeatTrendData.map((d) => d.value));
const minRepeat = Math.min(...repeatTrendData.map((d) => d.value));
const maxAov = Math.max(...aovTrendData.map((d) => d.value));
const minAov = Math.min(...aovTrendData.map((d) => d.value));

type SwapId = `metric-${number}` | `chart-${number}` | null;

const chartAlternatives: Record<number, string[]> = {
  0: ['Repeat Guest Trend', 'Active Guest Trend'],
  1: ['Frequency Distribution', 'Segment Mix'],
  2: ['Revenue by Guest Type', 'Revenue by Channel'],
  3: ['Average Order Value Trend', 'Items per Order Trend'],
};

export default function HybridGuestAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [selectedSegment, setSelectedSegment] = useState('All segments');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedChannel, setSelectedChannel] = useState('All channels');
  const [showKeyStory, setShowKeyStory] = useState(true);
  const [selectedMetrics, setSelectedMetrics] = useState([0, 0, 0, 0]);
  const [selectedCharts, setSelectedCharts] = useState([0, 0, 0, 0]);
  const [openContextMenu, setOpenContextMenu] = useState<SwapId>(null);
  const [openSwapModal, setOpenSwapModal] = useState<SwapId>(null);

  const handleSelectMetric = (slot: number, index: number) => {
    setSelectedMetrics((prev) => {
      const next = [...prev];
      next[slot] = index;
      return next;
    });
    setOpenSwapModal(null);
  };

  const handleSelectChart = (slot: number, index: number) => {
    setSelectedCharts((prev) => {
      const next = [...prev];
      next[slot] = index;
      return next;
    });
    setOpenSwapModal(null);
  };

  const openSwapFor = (id: SwapId) => {
    setOpenContextMenu(null);
    setOpenSwapModal(id);
  };

  useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (openContextMenu && !target.closest(`[data-swap-area="${openContextMenu}"]`)) {
        setOpenContextMenu(null);
      }
    };
    document.addEventListener('click', closeOnClickOutside);
    return () => document.removeEventListener('click', closeOnClickOutside);
  }, [openContextMenu]);

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarSearch}>
          <span className={`${styles.skeleton} ${styles.skeletonSearch}`} aria-hidden />
        </div>
        <nav className={styles.sidebarNav} aria-label="Navigation">
          <span className={styles.sidebarNavItem}>
            <span className={`${styles.skeleton} ${styles.skeletonNav}`} style={{ width: '60%' }} aria-hidden />
          </span>
          <div className={styles.sidebarNavSection}>
            <span className={`${styles.skeleton} ${styles.skeletonSection}`} aria-hidden />
          </div>
          <span className={`${styles.sidebarNavItem} ${styles.sidebarNavItemActive}`}>
            <span className={`${styles.skeleton} ${styles.skeletonNav}`} style={{ width: '55%' }} aria-hidden />
          </span>
          <span className={styles.sidebarNavSubItem}>
            <span className={`${styles.skeleton} ${styles.skeletonSub}`} style={{ width: '70%' }} aria-hidden />
          </span>
          <span className={styles.sidebarNavSubItem}>
            <span className={`${styles.skeleton} ${styles.skeletonSub}`} style={{ width: '45%' }} aria-hidden />
          </span>
          <span className={styles.sidebarNavItem}>
            <span className={`${styles.skeleton} ${styles.skeletonNav}`} style={{ width: '40%' }} aria-hidden />
          </span>
          <span className={styles.sidebarNavItem}>
            <span className={`${styles.skeleton} ${styles.skeletonNav}`} style={{ width: '65%' }} aria-hidden />
          </span>
          <span className={styles.sidebarNavItem}>
            <span className={`${styles.skeleton} ${styles.skeletonNav}`} style={{ width: '35%' }} aria-hidden />
          </span>
          <span className={styles.sidebarNavItem}>
            <span className={`${styles.skeleton} ${styles.skeletonNav}`} style={{ width: '30%' }} aria-hidden />
          </span>
        </nav>
      </aside>

      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Guest Analytics</h1>
            <p className={styles.subtitle}>
              Understand guest behavior, retention, and value across segments and locations.
            </p>
            <span className={styles.tag}>Hybrid</span>
          </div>
        </header>

        <main className={styles.main}>
          {/* Filters - traditional dashboard */}
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              {timePeriods.map((p) => (
                <button
                  key={p}
                  className={`${styles.filterChip} ${selectedPeriod === p ? styles.active : ''}`}
                  onClick={() => setSelectedPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className={styles.filterRow}>
              <select
                className={styles.filterSelect}
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
              >
                {segments.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                className={styles.filterSelect}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <select
                className={styles.filterSelect}
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
              >
                {channels.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button className={styles.filterButtonSecondary}>Advanced Filters</button>
            </div>
          </div>

          {/* Narrative: Key Story banner */}
          {showKeyStory && (
            <div className={styles.keyStory}>
              <div className={styles.keyStoryContent}>
                <h3 className={styles.keyStoryTitle}>This period in one sentence</h3>
                <p className={styles.keyStoryText}>
                  Your guest base grew 3.2% to 1.2M unified guests, but repeat rate dipped slightly—likely tied to summer travel. Loyalty members continue to drive 65% of revenue, and Dormant High Spenders (4,208 guests averaging $512 LTV) represent a clear re-engagement opportunity.
                </p>
                <button
                  className={styles.keyStoryDismiss}
                  onClick={() => setShowKeyStory(false)}
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Guest Overview - swappable KPI cards */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Guest Overview</h2>
            <div className={styles.metricsGrid}>
              {[0, 1, 2, 3].map((slot) => {
                const options = metricAlternatives[slot];
                const m = options[selectedMetrics[slot]];
                const menuOpen = openContextMenu === `metric-${slot}`;
                return (
                  <div key={slot} className={`${styles.metricCard} ${styles.swappable}`} data-swap-area={`metric-${slot}`}>
                    <button
                      type="button"
                      className={styles.moreButton}
                      onClick={(e) => { e.stopPropagation(); setOpenContextMenu(menuOpen ? null : `metric-${slot}`); }}
                      aria-expanded={menuOpen}
                      aria-haspopup="menu"
                      aria-label="More options"
                      title="More options"
                    >
                      <span className={styles.moreIcon}>⋮</span>
                    </button>
                    {menuOpen && (
                      <div className={styles.contextMenu} role="menu">
                        <button
                          type="button"
                          className={styles.contextMenuItem}
                          role="menuitem"
                          onClick={() => openSwapFor(`metric-${slot}`)}
                        >
                          Swap
                        </button>
                      </div>
                    )}
                    <div className={styles.metricLabel}>{m.label}</div>
                    {m.change && (
                      <div className={`${styles.metricChange} ${m.changePositive ? styles.positive : styles.negative}`}>
                        {m.change}
                      </div>
                    )}
                    <div className={styles.metricValue}>{m.value}</div>
                    <div className={styles.metricPrevious}>{m.previous}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Charts row - swappable visualizations */}
          <div className={styles.chartsRow}>
            {/* Chart slot 0: Repeat Guest Trend | Active Guest Trend */}
            <div className={`${styles.chartCard} ${styles.swappable}`} data-swap-area="chart-0">
              <button
                type="button"
                className={styles.moreButton}
                onClick={(e) => { e.stopPropagation(); setOpenContextMenu(openContextMenu === 'chart-0' ? null : 'chart-0'); }}
                aria-expanded={openContextMenu === 'chart-0'}
                aria-haspopup="menu"
                aria-label="More options"
                title="More options"
              >
                <span className={styles.moreIcon}>⋮</span>
              </button>
              {openContextMenu === 'chart-0' && (
                <div className={styles.contextMenu} role="menu">
                  <button
                    type="button"
                    className={styles.contextMenuItem}
                    role="menuitem"
                    onClick={() => openSwapFor('chart-0')}
                  >
                    Swap
                  </button>
                </div>
              )}
              <h3 className={styles.chartTitle}>
                {selectedCharts[0] === 0 ? 'Repeat Guest Trend' : 'Active Guest Trend'}
              </h3>
              <div className={styles.chartArea}>
                <div className={styles.chartYAxis}>
                  <span>{selectedCharts[0] === 0 ? '26%' : '68%'}</span>
                  <span>{selectedCharts[0] === 0 ? '25%' : '66%'}</span>
                  <span>{selectedCharts[0] === 0 ? '24%' : '64%'}</span>
                </div>
                <div className={styles.chartMain}>
                  <div className={styles.barChart}>
                    {(selectedCharts[0] === 0 ? repeatTrendData : activeGuestTrendData).map((d, i) => {
                      const arr = selectedCharts[0] === 0 ? repeatTrendData : activeGuestTrendData;
                      const mn = Math.min(...arr.map((x) => x.value));
                      const mx = Math.max(...arr.map((x) => x.value));
                      return (
                        <div key={i} className={styles.barWrapper}>
                          <div
                            className={styles.bar}
                            style={{
                              height: `${mx === mn ? 100 : ((d.value - mn) / (mx - mn)) * 100}%`,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.chartXAxis}>
                    {(selectedCharts[0] === 0 ? repeatTrendData : activeGuestTrendData).map((d, i) => (
                      <span key={i}>{d.month}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.insightCallout}>
                {selectedCharts[0] === 0
                  ? 'Repeat rate dipped in June—consider re-engagement campaigns for dormant guests during travel season.'
                  : 'Active guest share is holding steady—focus on reactivating dormant guests.'}
              </div>
            </div>

            {/* Chart slot 1: Frequency Distribution | Segment Mix */}
            <div className={`${styles.chartCard} ${styles.swappable}`} data-swap-area="chart-1">
              <button
                type="button"
                className={styles.moreButton}
                onClick={(e) => { e.stopPropagation(); setOpenContextMenu(openContextMenu === 'chart-1' ? null : 'chart-1'); }}
                aria-expanded={openContextMenu === 'chart-1'}
                aria-haspopup="menu"
                aria-label="More options"
                title="More options"
              >
                <span className={styles.moreIcon}>⋮</span>
              </button>
              {openContextMenu === 'chart-1' && (
                <div className={styles.contextMenu} role="menu">
                  <button
                    type="button"
                    className={styles.contextMenuItem}
                    role="menuitem"
                    onClick={() => openSwapFor('chart-1')}
                  >
                    Swap
                  </button>
                </div>
              )}
              <h3 className={styles.chartTitle}>
                {selectedCharts[1] === 0 ? 'Frequency Distribution' : 'Segment Mix'}
              </h3>
              <div className={styles.chartArea}>
                <div className={styles.freqBars}>
                  {(selectedCharts[1] === 0 ? freqDistribution : segmentMixData).map((item) => (
                    <div key={item.label} className={styles.freqBarRow}>
                      <span className={styles.freqLabel}>{item.label}</span>
                      <div className={styles.freqBarBg}>
                        <div className={styles.freqBarFill} style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className={styles.freqPct}>{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.insightCallout}>
                {selectedCharts[1] === 0
                  ? '72% visit only once—converting 10% to 2–3 visits would add significant recurring revenue.'
                  : 'Breakfast Regulars are the largest segment—consider segment-specific promotions.'}
              </div>
            </div>
          </div>

          {/* Revenue by Guest Type + AOV - swappable */}
          <div className={styles.chartsRow}>
            <div className={`${styles.chartCard} ${styles.swappable}`} data-swap-area="chart-2">
              <button
                type="button"
                className={styles.moreButton}
                onClick={(e) => { e.stopPropagation(); setOpenContextMenu(openContextMenu === 'chart-2' ? null : 'chart-2'); }}
                aria-expanded={openContextMenu === 'chart-2'}
                aria-haspopup="menu"
                aria-label="More options"
                title="More options"
              >
                <span className={styles.moreIcon}>⋮</span>
              </button>
              {openContextMenu === 'chart-2' && (
                <div className={styles.contextMenu} role="menu">
                  <button
                    type="button"
                    className={styles.contextMenuItem}
                    role="menuitem"
                    onClick={() => openSwapFor('chart-2')}
                  >
                    Swap
                  </button>
                </div>
              )}
              <h3 className={styles.chartTitle}>
                {selectedCharts[2] === 0 ? 'Revenue by Guest Type' : 'Revenue by Channel'}
              </h3>
              <div className={styles.chartArea}>
                <div className={styles.revenuePie}>
                  <div
                    className={styles.pieChart}
                    style={{
                      background: selectedCharts[2] === 0
                        ? `conic-gradient(var(--primary) 0% 65%, var(--textMuted) 65% 100%)`
                        : `conic-gradient(var(--primary) 0% 52%, var(--orange) 52% 80%, var(--textMuted) 80% 100%)`,
                    }}
                  />
                  <div className={styles.pieLegend}>
                    {selectedCharts[2] === 0 ? (
                      <>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDot} style={{ background: 'var(--primary)' }} />
                          Loyalty — $2.73M (65%)
                        </div>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDot} style={{ background: 'var(--textMuted)' }} />
                          Non-Loyalty — $1.47M (35%)
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDot} style={{ background: 'var(--primary)' }} />
                          POS — 52%
                        </div>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDot} style={{ background: 'var(--orange)' }} />
                          Mobile App — 28%
                        </div>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDot} style={{ background: 'var(--textMuted)' }} />
                          Web — 20%
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.chartCard} ${styles.swappable}`} data-swap-area="chart-3">
              <button
                type="button"
                className={styles.moreButton}
                onClick={(e) => { e.stopPropagation(); setOpenContextMenu(openContextMenu === 'chart-3' ? null : 'chart-3'); }}
                aria-expanded={openContextMenu === 'chart-3'}
                aria-haspopup="menu"
                aria-label="More options"
                title="More options"
              >
                <span className={styles.moreIcon}>⋮</span>
              </button>
              {openContextMenu === 'chart-3' && (
                <div className={styles.contextMenu} role="menu">
                  <button
                    type="button"
                    className={styles.contextMenuItem}
                    role="menuitem"
                    onClick={() => openSwapFor('chart-3')}
                  >
                    Swap
                  </button>
                </div>
              )}
              <h3 className={styles.chartTitle}>
                {selectedCharts[3] === 0 ? 'Average Order Value Trend' : 'Items per Order Trend'}
              </h3>
              <div className={styles.chartArea}>
                <div className={styles.chartYAxis}>
                  <span>{selectedCharts[3] === 0 ? '$19.50' : '3.2'}</span>
                  <span>{selectedCharts[3] === 0 ? '$19' : '3.0'}</span>
                  <span>{selectedCharts[3] === 0 ? '$18.50' : '2.8'}</span>
                  <span>{selectedCharts[3] === 0 ? '$18' : '2.6'}</span>
                </div>
                <div className={styles.chartMain}>
                  <div className={styles.barChart}>
                    {(selectedCharts[3] === 0 ? aovTrendData : itemsPerOrderData).map((d, i) => {
                      const arr = selectedCharts[3] === 0 ? aovTrendData : itemsPerOrderData;
                      const mn = Math.min(...arr.map((x) => x.value));
                      const mx = Math.max(...arr.map((x) => x.value));
                      return (
                        <div key={i} className={styles.barWrapper}>
                          <div
                            className={styles.bar}
                            style={{
                              height: `${mx === mn ? 100 : ((d.value - mn) / (mx - mn)) * 100}%`,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.chartXAxis}>
                    {(selectedCharts[3] === 0 ? aovTrendData : itemsPerOrderData).map((d, i) => (
                      <span key={i}>{d.month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Segments - table with narrative */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Top Performing Segments</h2>
              <a href="#" className={styles.viewAllLink}>View all</a>
            </div>
            <div className={styles.tableNarrative}>
              <strong>Insight:</strong> Dormant High Spenders ($512 LTV) haven&apos;t visited recently—Truffle Waffle Fries (88% attach rate) could anchor a re-engagement campaign.
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Segment Name</th>
                    <th>Guest Count</th>
                    <th>Avg. LTV</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topSegments.map((seg) => (
                    <tr key={seg.name}>
                      <td>{seg.name}</td>
                      <td>{seg.guestCount.toLocaleString()}</td>
                      <td>{seg.avgLtv}</td>
                      <td><span className={styles.statusBadge}>{seg.status}</span></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Menu Items - table with narrative */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Top Menu Items by Segment Affinity</h2>
            </div>
            <div className={styles.tableNarrative}>
              Showing data for <strong>Dormant High Spenders</strong>. Truffle Waffle Fries drive frequency—use in re-engagement offers.
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Attach Rate</th>
                    <th>Freq. Driver Score</th>
                    <th>Growth vs PW</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.attachRate}</td>
                      <td><span className={styles.scoreBadge}>{item.freqDriver}</span></td>
                      <td className={item.growth.startsWith('+') ? styles.positive : styles.negative}>
                        {item.growth}
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Ask AVA - narrative AI assistant */}
          <div className={styles.askAva}>
            <h3 className={styles.askAvaTitle}>Ask AVA</h3>
            <p className={styles.askAvaSubtext}>Your Guest Analytics assistant</p>
            <div className={styles.askAvaSuggestions}>
              <button type="button">Why did repeat visits drop last month?</button>
              <button type="button">Compare loyal vs non-loyal guest spend</button>
              <button type="button">Which menu items drive frequency for this segment?</button>
            </div>
            <div className={styles.askAvaInput}>
              <input type="text" placeholder="Ask a question..." />
            </div>
          </div>
        </main>
      </div>

      {/* Swap modal */}
      {openSwapModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setOpenSwapModal(null)}
          role="presentation"
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="swap-modal-title"
          >
            <div className={styles.modalHeader}>
              <h2 id="swap-modal-title" className={styles.modalTitle}>
                {openSwapModal.startsWith('metric-') ? 'Swap metric' : 'Swap visualization'}
              </h2>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setOpenSwapModal(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalSubtext}>Choose an option to display in this card:</p>
              <ul className={styles.modalOptions}>
                {openSwapModal.startsWith('metric-') ? (
                  (() => {
                    const slot = parseInt(openSwapModal.replace('metric-', ''), 10);
                    return metricAlternatives[slot].map((opt, idx) => (
                      <li key={opt.id}>
                        <button
                          type="button"
                          className={`${styles.modalOption} ${selectedMetrics[slot] === idx ? styles.modalOptionSelected : ''}`}
                          onClick={() => handleSelectMetric(slot, idx)}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ));
                  })()
                ) : (
                  (() => {
                    const slot = parseInt(openSwapModal.replace('chart-', ''), 10);
                    return chartAlternatives[slot].map((opt, idx) => (
                      <li key={opt}>
                        <button
                          type="button"
                          className={`${styles.modalOption} ${selectedCharts[slot] === idx ? styles.modalOptionSelected : ''}`}
                          onClick={() => handleSelectChart(slot, idx)}
                        >
                          {opt}
                        </button>
                      </li>
                    ));
                  })()
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
