import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';

const customStyles = {
  root: {
    '--bg-color': '#FFFFFF',
    '--text-primary': '#000000',
    '--text-secondary': '#98989E',
    '--text-tertiary': '#D1D1D6',
    '--accent-ui': '#F2F2F7',
    '--radius-l': '32px',
    '--radius-m': '20px',
    '--radius-s': '12px',
    '--radius-pill': '100px',
    '--space-unit': '8px',
    '--safe-area-top': '44px',
    '--safe-area-bottom': '34px',
    '--font-main': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  body: {
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-main)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  appContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--safe-area-top) 24px 0 24px',
    overflowY: 'auto',
    position: 'relative',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch'
  },
  heroSection: {
    marginBottom: '32px',
    marginTop: '12px',
    position: 'relative'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  dateLabel: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  mealImageContainer: {
    width: '100%',
    aspectRatio: '4/3',
    backgroundColor: 'var(--accent-ui)',
    borderRadius: 'var(--radius-l)',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)'
  },
  mealImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
  },
  analysisTag: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '8px 14px',
    borderRadius: 'var(--radius-pill)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--text-primary)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  tagText: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    paddingBottom: '120px'
  },
  nutritionHeader: {
    marginBottom: '16px'
  },
  headline: {
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--text-secondary)',
    letterSpacing: '-0.02em',
    marginBottom: '4px'
  },
  headlineStrong: {
    color: 'var(--text-primary)',
    fontWeight: 600
  },
  subHeadline: {
    fontSize: '15px',
    color: 'var(--text-tertiary)'
  },
  macroGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px'
  },
  macroItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  macroValue: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em'
  },
  macroLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  progressTrack: {
    height: '2px',
    width: '100%',
    backgroundColor: 'var(--accent-ui)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--text-primary)',
    borderRadius: '2px'
  },
  wellnessCard: {
    backgroundColor: 'var(--bg-color)',
    borderTop: '1px solid var(--accent-ui)',
    paddingTop: '24px'
  },
  tipHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  cimasLogo: {
    width: '16px',
    height: '16px',
    backgroundColor: 'var(--text-secondary)',
    borderRadius: '4px'
  },
  tipLabel: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em'
  },
  dnaText: {
    color: 'var(--text-secondary)',
    fontSize: '17px',
    lineHeight: 1.4,
    letterSpacing: '-0.01em'
  },
  dnaTextStrong: {
    color: 'var(--text-primary)',
    fontWeight: 600
  },
  floatingNavContainer: {
    position: 'absolute',
    bottom: '34px',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 100,
    pointerEvents: 'none'
  },
  navPill: {
    pointerEvents: 'auto',
    backgroundColor: 'var(--text-primary)',
    borderRadius: 'var(--radius-pill)',
    padding: '6px',
    display: 'flex',
    gap: '4px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    transform: 'translateY(0)',
    transition: 'transform 0.2s ease'
  },
  navItem: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s'
  },
  navItemActive: {
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  navItemScan: {
    width: '64px',
    backgroundColor: '#FFFFFF'
  },
  navSvg: {
    width: '20px',
    height: '20px',
    stroke: '#FFFFFF',
    strokeWidth: 2,
    fill: 'none'
  },
  navSvgScan: {
    stroke: 'var(--text-primary)'
  }
};

const NavItem = ({ active, isScan, onClick, children }) => {
  const baseStyle = { ...customStyles.navItem };
  if (active) Object.assign(baseStyle, customStyles.navItemActive);
  if (isScan) Object.assign(baseStyle, customStyles.navItemScan);

  return (
    <div style={baseStyle} onClick={onClick}>
      {children}
    </div>
  );
};

const HomePage = () => {
  const [activeNav, setActiveNav] = useState('scan');

  return (
    <div style={customStyles.appContainer}>
      <div style={customStyles.headerRow}>
        <span style={customStyles.dateLabel}>Today, 10:42 AM</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-tertiary)' }}>
          <path d="M1 1L6 6L11 1"></path>
        </svg>
      </div>

      <div style={customStyles.heroSection}>
        <div style={customStyles.mealImageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" 
            alt="Healthy Bowl" 
            style={customStyles.mealImage}
          />
          <div style={customStyles.analysisTag}>
            <div style={customStyles.statusDot}></div>
            <span style={customStyles.tagText}>Analyzed</span>
          </div>
        </div>
      </div>

      <div style={customStyles.contentSection}>
        <div style={customStyles.nutritionBlock}>
          <div style={customStyles.nutritionHeader}>
            <h1 style={customStyles.headline}>
              Found <span style={customStyles.headlineStrong}>452</span> kcal
            </h1>
            <p style={customStyles.subHeadline}>Salmon & Avocado Bowl</p>
          </div>

          <div style={customStyles.macroGrid}>
            <div style={customStyles.macroItem}>
              <span style={customStyles.macroValue}>32g</span>
              <div style={customStyles.progressTrack}>
                <div style={{ ...customStyles.progressFill, width: '80%' }}></div>
              </div>
              <span style={customStyles.macroLabel}>Protein</span>
            </div>
            <div style={customStyles.macroItem}>
              <span style={customStyles.macroValue}>12g</span>
              <div style={customStyles.progressTrack}>
                <div style={{ ...customStyles.progressFill, width: '30%' }}></div>
              </div>
              <span style={customStyles.macroLabel}>Carbs</span>
            </div>
            <div style={customStyles.macroItem}>
              <span style={customStyles.macroValue}>28g</span>
              <div style={customStyles.progressTrack}>
                <div style={{ ...customStyles.progressFill, width: '65%' }}></div>
              </div>
              <span style={customStyles.macroLabel}>Fat</span>
            </div>
          </div>
        </div>

        <div style={customStyles.wellnessCard}>
          <div style={customStyles.tipHeader}>
            <div style={customStyles.cimasLogo}></div>
            <span style={customStyles.tipLabel}>Cimas Health Group</span>
          </div>
          <p style={customStyles.dnaText}>
            This meal is high in healthy fats. <br />
            Consider adding <span style={customStyles.dnaTextStrong}>fiber</span> to feel full longer.
          </p>
        </div>
      </div>

      <div style={customStyles.floatingNavContainer}>
        <div style={customStyles.navPill}>
          <NavItem active={activeNav === 'stats'} onClick={() => setActiveNav('stats')}>
            <svg viewBox="0 0 24 24" style={customStyles.navSvg}>
              <path d="M18 20V10M12 20V4M6 20v-6"></path>
            </svg>
          </NavItem>
          <NavItem active={activeNav === 'scan'} isScan onClick={() => setActiveNav('scan')}>
            <svg viewBox="0 0 24 24" style={{ ...customStyles.navSvg, ...customStyles.navSvgScan }}>
              <circle cx="12" cy="12" r="5"></circle>
              <path d="M5 5h3v3H5zM16 5h3v3h-3zM5 16h3v3H5zM16 16h3v3h-3z"></path>
            </svg>
          </NavItem>
          <NavItem active={activeNav === 'profile'} onClick={() => setActiveNav('profile')}>
            <svg viewBox="0 0 24 24" style={customStyles.navSvg}>
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M20 21a8 8 0 1 0-16 0"></path>
            </svg>
          </NavItem>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: transparent;
      }
      
      #root {
        height: 100vh;
        width: 100vw;
      }

      @keyframes pulse {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
      }

      .app-container::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  return (
    <Router basename="/">
      <div style={{ ...customStyles.body, ...customStyles.root }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;