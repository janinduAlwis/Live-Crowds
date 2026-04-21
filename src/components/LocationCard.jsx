import { Users } from 'lucide-react';
import { useState } from 'react';
import './LocationCard.css';

export default function LocationCard({ location, onCheckIn, onCheckOut, activeSessionId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [groupCount, setGroupCount] = useState(1);
  
  const fillPercentage = (location.current_count / location.capacity) * 100;
  
  let statusText = "Quiet";
  let statusClass = "status-quiet";
  
  if (fillPercentage >= 80) {
    statusText = "Very Crowded";
    statusClass = "status-crowded";
  } else if (fillPercentage >= 50) {
    statusText = "Moderate";
    statusClass = "status-moderate";
  }

  const isMyActiveLocation = activeSessionId === location.id;
  const isAnotherLocationActive = activeSessionId !== null && activeSessionId !== undefined && !isMyActiveLocation;

  const handleInitialClick = async () => {
    if (isMyActiveLocation) {
        setIsProcessing(true);
        await onCheckOut(location.id);
        setIsProcessing(false);
    } else {
        // Show the popup Modal
        setShowCounter(true);
        setGroupCount(1); // Reset to 1 on open
    }
  };

  const confirmCheckIn = async () => {
    setIsProcessing(true);
    await onCheckIn(location.id, groupCount);
    setShowCounter(false);
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  return (
    <>
      <div className={`location-card glass-panel ${isMyActiveLocation ? 'active-location-card' : ''}`}>
        <div className="card-image-container">
          <img src={location.image_url} alt={location.name} loading="lazy" />
          <div className={`status-badge ${statusClass}`}>
            {statusText}
          </div>
        </div>
        
        <div className="card-content">
          <h3>{location.name} {isMyActiveLocation && <span className="active-dot" title="You are here">●</span>}</h3>
          
          <div className="crowd-stats">
            <div className="crowd-count">
              <Users size={18} className="text-secondary" />
              <span><strong>{location.current_count}</strong> people here</span>
            </div>
            
            <div className="progress-bar-bg">
              <div 
                className={`progress-bar-fill ${statusClass}-bg`} 
                style={{ width: `${Math.min(fillPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="capacity-text">Capacity: {location.capacity}</div>
          </div>
          
          <button 
            className={`checkin-btn ${isMyActiveLocation ? 'checkout-btn' : ''} ${isProcessing ? 'processing' : ''}`}
            onClick={handleInitialClick}
            disabled={isProcessing || isAnotherLocationActive}
          >
            {isProcessing ? 'Processing...' : isMyActiveLocation ? 'Check Out' : isAnotherLocationActive ? 'Unavailable' : 'Check In'}
          </button>
        </div>
      </div>

      {/* iOS Modal Popup Overlay */}
      {showCounter && (
        <div className="ios-modal-overlay">
          <div className="ios-modal glass-panel">
            <h3>How many people?</h3>
            <p>Select your group size</p>
            
            <div className="modal-counter-row">
              <button 
                className="modal-counter-btn" 
                onClick={() => setGroupCount(Math.max(1, groupCount - 1))}
              >-</button>
              <span className="modal-counter-value">{groupCount}</span>
              <button 
                className="modal-counter-btn" 
                onClick={() => setGroupCount(groupCount + 1)}
              >+</button>
            </div>
            
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setShowCounter(false)}>Cancel</button>
              <button 
                className="modal-confirm-btn" 
                onClick={confirmCheckIn}
                disabled={isProcessing}
              >
                {isProcessing ? 'Loading...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
