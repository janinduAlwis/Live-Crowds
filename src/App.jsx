import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LocationCard from './components/LocationCard';
import ActiveSessionBanner from './components/ActiveSessionBanner';
import './App.css';

// 120 minutes in milliseconds
const CHECKOUT_TIMEOUT_MS = 120 * 60 * 1000;

// The simulated backend database
const defaultLocations = [
  // Popular / High Traffic Places
  { id: 1, name: "Sigiriya", category: "Popular", image_url: "/sigiriya.png", capacity: 800 },
  { id: 2, name: "Galle Fort", category: "Popular", image_url: "/gallefort.jpg", capacity: 800 },
  { id: 3, name: "Ella", category: "Popular", image_url: "/ella.jpg", capacity: 300 },
  { id: 4, name: "Temple of the Sacred Tooth Relic", category: "Popular", image_url: "/temple.jpg", capacity: 1000 },
  { id: 5, name: "Yala National Park", category: "Popular", image_url: "/yala.jpg", capacity: 400 },

  // Nature & Scenic Places
  { id: 6, name: "Ella Rock", category: "Nature", image_url: "/ellarock.jpg", capacity: 150 },
  { id: 7, name: "Little Adam's Peak", category: "Nature", image_url: "/adams.jpg", capacity: 200 },
  { id: 8, name: "Horton Plains National Park", category: "Nature", image_url: "/horton.jpg", capacity: 300 },
  { id: 9, name: "World's End", category: "Nature", image_url: "/worldsend.jpg", capacity: 250 },

  // Beaches
  { id: 10, name: "Unawatuna Beach", category: "Beaches", image_url: "/Unawatuna.jpg", capacity: 500 },
  { id: 11, name: "Mirissa Beach", category: "Beaches", image_url: "/mirissa.jpg", capacity: 600 },
  { id: 12, name: "Arugam Bay", category: "Beaches", image_url: "/arugam.jpeg", capacity: 300 },
  { id: 13, name: "Bentota Beach", category: "Beaches", image_url: "/bentota.jpg", capacity: 400 }
];

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track active session { locationId, timestamp, count }
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    // 1. Load active check-in session
    const savedSession = localStorage.getItem('tourist_session');
    if (savedSession) {
      setActiveSession(JSON.parse(savedSession));
    }

    // 2. Load or Initialize Dummy Database
    const savedData = localStorage.getItem('tourist_crowd_data');
    if (savedData) {
      setLocations(JSON.parse(savedData));
      setLoading(false);
    } else {
      // First time visiting: generate realistic initial crowd seeds
      const seededData = defaultLocations.map(loc => ({
        ...loc,
        current_count: Math.floor(Math.random() * loc.capacity * 0.8)
      }));
      setLocations(seededData);
      localStorage.setItem('tourist_crowd_data', JSON.stringify(seededData));
      setLoading(false);
    }
  }, []);

  // Smart Auto Check-out Loop
  useEffect(() => {
    if (!activeSession) return;

    const checkTimeout = async () => {
      const now = Date.now();
      if (now - activeSession.timestamp > CHECKOUT_TIMEOUT_MS) {
        console.log("Session expired. Auto-checking out...");
        handleCheckOut(activeSession.locationId);
      }
    };

    const intervalId = setInterval(checkTimeout, 60000);
    return () => clearInterval(intervalId);
  }, [activeSession]);

  const updateLocationInStorage = (id, newCount) => {
    const updatedLocations = locations.map(loc => {
      if (loc.id === id) {
        return { ...loc, current_count: newCount };
      }
      return loc;
    });
    setLocations(updatedLocations);
    localStorage.setItem('tourist_crowd_data', JSON.stringify(updatedLocations));
  };

  const handleCheckIn = async (id, count = 1) => {
    try {
      const loc = locations.find(l => l.id === id);
      if (!loc) return;
      
      // Update local storage DB directly
      const newCount = loc.current_count + count;
      updateLocationInStorage(id, newCount);

      // Save Session
      const sessionData = { locationId: id, timestamp: Date.now(), count };
      localStorage.setItem('tourist_session', JSON.stringify(sessionData));
      setActiveSession(sessionData);

    } catch (err) {
      console.error("Check-in error:", err);
      alert("Failed to check-in. Please try again.");
    }
  };

  const handleCheckOut = async (id) => {
    const checkoutCount = activeSession?.count || 1;
    try {
      const loc = locations.find(l => l.id === id);
      if (!loc) return;

      // Ensure count doesn't drop below 0
      const newCount = Math.max(0, loc.current_count - checkoutCount);
      updateLocationInStorage(id, newCount);

      // Clear Session
      localStorage.removeItem('tourist_session');
      setActiveSession(null);

    } catch (err) {
      console.error("Check-out error:", err);
      alert("Failed to check-out. Please try again.");
    }
  };

  // Group locations by category
  const categories = locations.reduce((acc, loc) => {
    if (!acc[loc.category]) {
      acc[loc.category] = [];
    }
    acc[loc.category].push(loc);
    return acc;
  }, {});

  const activeLocation = activeSession ? locations.find(l => l.id === activeSession.locationId) : null;

  return (
    <div className="app-container">
      <Navbar />
      
      {activeLocation && (
        <ActiveSessionBanner 
          locationName={activeLocation.name} 
          onCheckOut={() => handleCheckOut(activeSession.locationId)} 
        />
      )}

      <main className="main-content">
        <Hero />
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading locations...</div>
        ) : (
          Object.keys(categories).map(category => (
            <div key={category} className="category-section">
              <h2 className="category-title">
                {category === 'Popular' ? '🏝️' : category === 'Nature' ? '🌄' : '🏖️'} {category} Places
              </h2>
              <div className="locations-grid">
                {categories[category].map(location => (
                  <LocationCard 
                    key={location.id} 
                    location={location} 
                    onCheckIn={handleCheckIn}
                    onCheckOut={handleCheckOut}
                    activeSessionId={activeSession?.locationId}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
