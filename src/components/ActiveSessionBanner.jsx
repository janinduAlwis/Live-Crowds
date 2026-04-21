import { MapPin, LogOut } from 'lucide-react';
import './ActiveSessionBanner.css';

export default function ActiveSessionBanner({ locationName, onCheckOut }) {
  return (
    <div className="active-session-banner">
      <div className="banner-content">
        <div className="banner-text">
          <MapPin size={20} className="pulse-icon" />
          <span>You are currently checked into <strong>{locationName}</strong></span>
        </div>
        <button className="banner-checkout-btn" onClick={onCheckOut}>
          <LogOut size={16} />
          Check Out Now
        </button>
      </div>
    </div>
  );
}
