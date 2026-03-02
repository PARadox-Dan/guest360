import { useState } from 'react';
import styles from './hybrid-guest-analytics.module.css';

const timePeriods = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date'];
const segments = ['All segments', 'Dormant High Spenders', 'Breakfast Regulars', 'Vegetarian Segment'];
const locations = ['All locations', 'Atlanta, GA', 'Dallas, TX', 'Chicago, IL'];
const channels = ['All channels', 'POS', 'Mobile App', 'Web Ordering'];

const overviewMetrics = [
  {
    label: 'Total Unified Guests',
    value: '1,248,392',
    change: '+3.2%',
    changePositive: true,
    previous: '1,209,488 previous period',
  },
  {
    label: 'Active Guests',
    value: '842,109',
    change: '+1.8%',
    changePositive: true,
    previous: '827,219 previous period',
  },
  {
    label: 'Repeat Rate',
    value: '24.8%',
    change: '-0.5%',
    changePositive: false,
    previous: '25.3% previous period',
  },
  {
    label: 'Avg Visits per Guest',
    value: '2.4',
    change: '+2.1%',
    changePositive: true,
    previous: '2.3 previous period',
  },
];

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

const maxRepeat = Math.max(...repeatTrendData.map((d) => d.value));
const minRepeat = Math.min(...repeatTrendData.map((d) => d.value));
const maxAov = Math.max(...aovTrendData.map((d) => d.value));
const minAov = Math.min(...aovTrendData.map((d) => d.value));

export default function HybridGuestAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [selectedSegment, setSelectedSegment] = useState('All segments');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedChannel, setSelectedChannel] = useState('All channels');
  const [showKeyStory, setShowKeyStory] = useState(true);

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

          {/* Guest Overview - traditional KPI cards */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Guest Overview</h2>
            <div className={styles.metricsGrid}>
              {overviewMetrics.map((m) => (
                <div key={m.label} className={styles.metricCard}>
                  <div className={styles.metricLabel}>{m.label}</div>
                  {m.change && (
                    <div className={`${styles.metricChange} ${m.changePositive ? styles.positive : styles.negative}`}>
                      {m.change}
                    </div>
                  )}
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricPrevious}>{m.previous}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Charts row - traditional dashboard visualizations */}
          <div className={styles.chartsRow}>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Repeat Guest Trend</h3>
              <div className={styles.chartArea}>
                <div className={styles.chartYAxis}>
                  <span>26%</span>
                  <span>25%</span>
                  <span>24%</span>
                </div>
                <div className={styles.chartMain}>
                  <div className={styles.barChart}>
                    {repeatTrendData.map((d, i) => (
                      <div key={i} className={styles.barWrapper}>
                        <div
                          className={styles.bar}
                          style={{ height: `${maxRepeat === minRepeat ? 100 : ((d.value - minRepeat) / (maxRepeat - minRepeat)) * 100}%` }}
                          title={`${d.month}: ${d.value}%`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.chartXAxis}>
                    {repeatTrendData.map((d, i) => (
                      <span key={i}>{d.month}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.insightCallout}>
                Repeat rate dipped in June—consider re-engagement campaigns for dormant guests during travel season.
              </div>
            </div>

            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Frequency Distribution</h3>
              <div className={styles.chartArea}>
                <div className={styles.freqBars}>
                  {freqDistribution.map((item) => (
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
                72% visit only once—converting 10% to 2–3 visits would add significant recurring revenue.
              </div>
            </div>
          </div>

          {/* Revenue by Guest Type + AOV */}
          <div className={styles.chartsRow}>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Revenue by Guest Type</h3>
              <div className={styles.chartArea}>
                <div className={styles.revenuePie}>
                  <div
                    className={styles.pieChart}
                    style={{
                      background: `conic-gradient(var(--primary) 0% 65%, var(--textMuted) 65% 100%)`,
                    }}
                  />
                  <div className={styles.pieLegend}>
                    <div className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ background: 'var(--primary)' }} />
                      Loyalty — $2.73M (65%)
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ background: 'var(--textMuted)' }} />
                      Non-Loyalty — $1.47M (35%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Average Order Value Trend</h3>
              <div className={styles.chartArea}>
                <div className={styles.chartYAxis}>
                  <span>$19.50</span>
                  <span>$19</span>
                  <span>$18.50</span>
                  <span>$18</span>
                </div>
                <div className={styles.chartMain}>
                  <div className={styles.barChart}>
                    {aovTrendData.map((d, i) => (
                      <div key={i} className={styles.barWrapper}>
                        <div
                          className={styles.bar}
                          style={{ height: `${maxAov === minAov ? 100 : ((d.value - minAov) / (maxAov - minAov)) * 100}%` }}
                          title={`${d.month}: $${d.value}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.chartXAxis}>
                    {aovTrendData.map((d, i) => (
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
    </div>
  );
}
