import './App.css';
import { useMemo, useState } from 'react';

const NAV_ITEMS = ['Dashboard', 'Simulator', 'Fraud Detection', 'History'];

const MODULES = [
  {
    id: 'simulator',
    title: 'Transaction Simulation',
    description:
      'Test payment flows with AI-driven risk review before approving live transfers.',
    cta: 'Open module',
    icon: 'shield',
  },
  {
    id: 'fraud',
    title: 'Fraud Detection',
    description:
      'Analyze suspicious text and images with confidence scoring and threat signals.',
    cta: 'Open module',
    icon: 'alert',
  },
  {
    id: 'history',
    title: 'History',
    description:
      'Track your last security checks, payment decisions, and risk trends in one place.',
    cta: 'Open module',
    icon: 'clock',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [lastAction, setLastAction] = useState('Ready');
  const [notificationCount, setNotificationCount] = useState(1);

  const actionHandlers = useMemo(
    () => ({
      navigate: (tab) => {
        setActiveTab(tab);
        setLastAction(`Switched to ${tab}`);
      },
      openModule: (moduleId, moduleTitle) => {
        setLastAction(`Opening ${moduleTitle} (${moduleId})`);
      },
      openSettings: () => {
        setLastAction('Opening settings');
      },
      openProfile: () => {
        setNotificationCount(0);
        setLastAction('Opening profile');
      },
    }),
    [],
  );

  return (
    <div className="dashboard-shell">
      <header className="navbar">
        <div className="brand-group">
          <button
            className="logo-wrap"
            type="button"
            onClick={() => actionHandlers.navigate('Dashboard')}
          >
            <span className="logo-mark" aria-hidden="true">◆</span>
            <span className="logo-text">FinShield</span>
          </button>
          <span className="nav-divider" aria-hidden="true"></span>
          <span className="page-label">{activeTab}</span>
        </div>

        <div className="nav-right">
          <button
            className="glass-button"
            type="button"
            onClick={actionHandlers.openSettings}
          >
            Settings
          </button>
          <button
            className="avatar-button"
            type="button"
            onClick={actionHandlers.openProfile}
            aria-label="Open profile"
          >
            AS
            {notificationCount > 0 ? (
              <span className="notif-dot" aria-label={`${notificationCount} notifications`}>
                {notificationCount}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <nav className="top-nav" aria-label="Dashboard sections">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-pill ${activeTab === item ? 'is-active' : ''}`}
            onClick={() => actionHandlers.navigate(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        <section className="hero">
          <h1>Secure every payment decision</h1>
          <p>
            FinShield combines real-time transaction simulation and fraud detection into one
            modern fintech command center.
          </p>
        </section>

        <section className="module-grid" aria-label="Main modules">
          {MODULES.map((module) => (
            <article key={module.id} className="module-card glass-card">
              <div className={`module-icon ${module.icon}`} aria-hidden="true"></div>
              <h2>{module.title}</h2>
              <p>{module.description}</p>
              <button
                type="button"
                className="module-link"
                onClick={() => actionHandlers.openModule(module.id, module.title)}
              >
                {module.cta}
                <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </section>

        <aside className="bottom-row">
          <div className="team-card glass-card">
            <h3>Team FinShield</h3>
            <p>Abhijeet Singh · Rahul Das</p>
            <p>Priya Sharma · Deepak Verma</p>
          </div>

          <div className="status-card glass-card" role="status" aria-live="polite">
            <h3>Action Status</h3>
            <p>{lastAction}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;