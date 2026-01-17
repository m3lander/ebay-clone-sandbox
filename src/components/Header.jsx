import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isSellingFlow = location.pathname.startsWith('/sell');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" id="logo">
          <span className="logo-e">e</span>
          <span className="logo-b">b</span>
          <span className="logo-a">a</span>
          <span className="logo-y">y</span>
          <span className="logo-sandbox"> Sandbox</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link" id="nav-home">Home</Link>
          <Link to="/listings" className="nav-link" id="nav-listings">My Listings</Link>
          {!isSellingFlow && (
            <Link to="/sell" className="sell-button-header" id="nav-sell">
              Sell
            </Link>
          )}
        </nav>
      </div>

      {isSellingFlow && (
        <div className="selling-progress-bar">
          <div className="progress-container">
            <ProgressStep
              number={1}
              label="Category"
              active={location.pathname === '/sell'}
              completed={location.pathname !== '/sell'}
            />
            <ProgressStep
              number={2}
              label="Details"
              active={location.pathname === '/sell/details'}
              completed={location.pathname === '/sell/review' || location.pathname.includes('/success')}
            />
            <ProgressStep
              number={3}
              label="Review"
              active={location.pathname === '/sell/review'}
              completed={location.pathname.includes('/success')}
            />
            <ProgressStep
              number={4}
              label="Complete"
              active={location.pathname.includes('/success')}
              completed={false}
            />
          </div>
        </div>
      )}
    </header>
  );
}

function ProgressStep({ number, label, active, completed }) {
  return (
    <div className={`progress-step ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
      <div className="step-circle">
        {completed ? '✓' : number}
      </div>
      <span className="step-label">{label}</span>
    </div>
  );
}

export default Header;
