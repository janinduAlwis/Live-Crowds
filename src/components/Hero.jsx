import './Hero.css';

const COLLAGE_IMAGES = [
  '/sigiriya.png',
  '/gallefort.jpg',
  '/ella.jpg',
  '/Unawatuna.jpg',
  '/temple.jpg',
  '/yala.jpg',
  '/ellarock.jpg',
  '/mirissa.jpg'
];

export default function Hero() {
  return (
    <div className="hero-section-wrapper">
      <div className="hero-container">
        <div className="hero-content">
          <h2>Avoid the crowds. <br />Enjoy the journey.</h2>
          <p>Live crowd updates for Sri Lanka's top tourist destinations. Check before you go, and check-in when you arrive.</p>
        </div>
      </div>
      
      {/* Infinite scrolling collage */}
      <div className="hero-collage">
        <div className="collage-track">
          {[...COLLAGE_IMAGES, ...COLLAGE_IMAGES].map((src, index) => (
            <div key={index} className="collage-item">
              <img src={src} alt="Sri Lanka Tourist Destination" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
