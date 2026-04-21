import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Live Crowds</h1>
        </div>
        <div className="navbar-actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
