"use client";

import { useState } from 'react';
import styles from './styles.module.css';

interface Insight {
  id: string;
  title: string;
  narrative: string;
  metrics: {
    primary: string;
    change: string;
    context: string;
  };
  category: 'guests' | 'revenue' | 'behavior' | 'segments' | 'menu';
  relatedInsights: string[];
  priority: 'high' | 'medium' | 'low';
}

const insights: Insight[] = [
  {
    id: 'guest-growth',
    title: 'Your guest base is growing steadily',
    narrative: 'You\'ve added 38,904 new unified guests in the last 30 days—a 3.2% increase. This growth is consistent across all channels, suggesting your marketing efforts are reaching new audiences effectively.',
    metrics: { primary: '1,248,392', change: '+3.2%', context: 'Total Unified Guests' },
    category: 'guests',
    relatedInsights: ['active-guests', 'repeat-rate'],
    priority: 'high'
  },
  {
    id: 'active-guests',
    title: 'More guests are staying engaged',
    narrative: '842,109 guests visited in the last 30 days, up 1.8% from the previous period. This means 67% of your total guest base is actively visiting—a healthy engagement rate for the restaurant industry.',
    metrics: { primary: '842,109', change: '+1.8%', context: 'Active Guests (67% of total)' },
    category: 'guests',
    relatedInsights: ['guest-growth', 'repeat-rate', 'frequency'],
    priority: 'high'
  },
  {
    id: 'repeat-rate',
    title: 'Repeat visits dipped slightly',
    narrative: 'Your repeat rate dropped 0.5 percentage points to 24.8%. While this is a small change, it\'s worth investigating. The trend shows this started mid-June—coinciding with summer travel season. Consider re-engagement campaigns for dormant guests.',
    metrics: { primary: '24.8%', change: '-0.5%', context: 'Repeat Rate (vs 25.3% previous)' },
    category: 'behavior',
    relatedInsights: ['frequency', 'dormant-segment', 'active-guests'],
    priority: 'high'
  },
  {
    id: 'frequency',
    title: 'Most guests visit once, but your regulars are valuable',
    narrative: '72% of guests visit only once, but those who return average 2.4 visits. Your 2.3% of super-regulars (10+ visits) likely drive a disproportionate share of revenue. Focus on converting one-time visitors to repeat guests.',
    metrics: { primary: '2.4', change: '+2.1%', context: 'Avg Visits per Guest' },
    category: 'behavior',
    relatedInsights: ['repeat-rate', 'revenue-loyalty', 'frequency-distribution'],
    priority: 'medium'
  },
  {
    id: 'revenue-loyalty',
    title: 'Loyalty members drive 65% of revenue',
    narrative: 'Loyalty program members generated $2.73M (65% of total revenue) despite likely being a smaller portion of your guest base. This highlights the value of your loyalty program and suggests expansion opportunities.',
    metrics: { primary: '$4.2M', change: '', context: 'Total Revenue (Loyalty: $2.73M, Non-Loyalty: $1.47M)' },
    category: 'revenue',
    relatedInsights: ['frequency', 'dormant-segment', 'top-segments'],
    priority: 'high'
  },
  {
    id: 'dormant-segment',
    title: 'Dormant High Spenders: A hidden opportunity',
    narrative: 'You have 4,208 guests who used to spend heavily but haven\'t visited recently. Their average lifetime value is $512.40—much higher than average. A targeted re-engagement campaign could unlock significant revenue.',
    metrics: { primary: '4,208', change: '', context: 'Guests (Avg LTV: $512.40)' },
    category: 'segments',
    relatedInsights: ['repeat-rate', 'revenue-loyalty', 'menu-affinity'],
    priority: 'high'
  },
  {
    id: 'top-segments',
    title: 'Breakfast Regulars are your largest segment',
    narrative: '12,942 guests consistently visit for breakfast, with an average lifetime value of $84.20. This segment shows strong loyalty patterns. Consider breakfast-specific promotions to increase visit frequency.',
    metrics: { primary: '12,942', change: '', context: 'Guests (Avg LTV: $84.20)' },
    category: 'segments',
    relatedInsights: ['menu-affinity', 'frequency', 'revenue-loyalty'],
    priority: 'medium'
  },
  {
    id: 'menu-affinity',
    title: 'Truffle Waffle Fries drive frequency for high spenders',
    narrative: 'Among Dormant High Spenders, Truffle Waffle Fries have an 88% attach rate and are a strong frequency driver. This item might be a key to re-engaging this valuable segment.',
    metrics: { primary: '88%', change: '', context: 'Attach Rate (High Frequency Driver)' },
    category: 'menu',
    relatedInsights: ['dormant-segment', 'top-segments'],
    priority: 'medium'
  },
  {
    id: 'frequency-distribution',
    title: 'The 72% problem: Converting one-time visitors',
    narrative: 'Nearly three-quarters of your guests (72.4%) visit only once. If you could convert just 10% of these to 2-3 visit guests, you\'d add significant recurring revenue. Consider first-visit incentives or follow-up campaigns.',
    metrics: { primary: '72.4%', change: '', context: 'Single-visit guests' },
    category: 'behavior',
    relatedInsights: ['frequency', 'repeat-rate', 'revenue-loyalty'],
    priority: 'high'
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [discoveredInsights, setDiscoveredInsights] = useState<Set<string>>(
    new Set(['guest-growth', 'active-guests', 'repeat-rate'])
  );

  const categories = ['guests', 'revenue', 'behavior', 'segments', 'menu'] as const;
  const filteredInsights = selectedCategory
    ? insights.filter(insight => insight.category === selectedCategory)
    : insights;
  const visibleInsights = filteredInsights.filter(insight => discoveredInsights.has(insight.id));

  const handleInsightClick = (insight: Insight) => {
    setExpandedInsight(expandedInsight === insight.id ? null : insight.id);
    insight.relatedInsights.forEach(relatedId => {
      setDiscoveredInsights(prev => new Set([...prev, relatedId]));
    });
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setExpandedInsight(null);
  };

  const handleDiscoverAll = () => {
    setDiscoveredInsights(new Set(insights.map(i => i.id)));
  };

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
            <h1 className={styles.title}>Guest Insights</h1>
            <p className={styles.subtitle}>
              Discover what&apos;s happening with your guests through interactive insights.
            </p>
            <span className={styles.tag}>Insight discovery</span>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${selectedCategory === null ? styles.active : ''}`}
              onClick={() => handleCategoryClick(null)}
            >
              All Insights
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.discoveryStats}>
            <span className={styles.discoveryText}>
              {discoveredInsights.size} of {insights.length} insights discovered
            </span>
            {discoveredInsights.size < insights.length && (
              <button className={styles.discoverAllButton} onClick={handleDiscoverAll}>
                Discover All
              </button>
            )}
          </div>

          <div className={styles.insightsGrid}>
            {visibleInsights.map(insight => {
              const isExpanded = expandedInsight === insight.id;
              const hasRelated = insight.relatedInsights.some(id => !discoveredInsights.has(id));
              return (
                <div
                  key={insight.id}
                  className={`${styles.insightCard} ${isExpanded ? styles.expanded : ''} ${styles[insight.priority]}`}
                  onClick={() => handleInsightClick(insight)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.categoryBadge}>{insight.category}</div>
                    {hasRelated && !isExpanded && (
                      <span className={styles.newBadge}>New connections available</span>
                    )}
                  </div>
                  <h2 className={styles.insightTitle}>{insight.title}</h2>
                  <div className={styles.metrics}>
                    <div className={styles.primaryMetric}>{insight.metrics.primary}</div>
                    {insight.metrics.change && (
                      <div className={styles.changeMetric}>{insight.metrics.change}</div>
                    )}
                    <div className={styles.contextMetric}>{insight.metrics.context}</div>
                  </div>
                  <div className={`${styles.narrative} ${isExpanded ? styles.visible : ''}`}>
                    <p>{insight.narrative}</p>
                    {isExpanded && insight.relatedInsights.length > 0 && (
                      <div className={styles.relatedInsights}>
                        <p className={styles.relatedLabel}>Related insights:</p>
                        <ul>
                          {insight.relatedInsights.map(relatedId => {
                            const related = insights.find(i => i.id === relatedId);
                            if (!related) return null;
                            const isDiscovered = discoveredInsights.has(relatedId);
                            return (
                              <li key={relatedId} className={isDiscovered ? styles.discovered : styles.undiscovered}>
                                {isDiscovered ? '✓' : '○'} {related.title}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  {!isExpanded && <div className={styles.expandHint}>Click to explore</div>}
                </div>
              );
            })}
          </div>

          {discoveredInsights.size < insights.length && (
            <div className={styles.hint}>
              <p>💡 Click on insights to discover related connections</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
