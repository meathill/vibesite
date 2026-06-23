// Navbar.jsx — sticky glass nav, mirrors web-shared/components/navbar.tsx.
const { useState } = React;

function Navbar({ active = 'home' }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#" className="nav-brand">
            <img src="../../assets/favicon.svg" alt="Meathill" />
            Meathill
          </a>
          <div className="nav-links">
            <a href="#" className={active === 'home' ? 'active' : ''}>Product</a>
            <a href="#use-cases">Use cases</a>
            <a href="#pricing">Pricing</a>
            <a href="#extension">Extension</a>
            <a href="#docs">Docs</a>
          </div>
        </div>
        <div className="nav-right">
          <button className="lang-pill"><i className="ph ph-globe"></i> EN</button>
          <ThemeToggle />
          <a href="#" className="btn btn-md btn-ghost">Sign in</a>
          <a href="../app-dashboard/index.html" className="btn btn-md btn-primary">Get started →</a>
        </div>
      </div>
    </nav>
  );
}

window.Navbar = Navbar;
