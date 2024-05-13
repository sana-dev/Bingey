import './Hero.css';
import bgImage from './images/video.mp4';
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <section className="hero">
      <video controls autoPlay muted loop>
        <source src={bgImage} type="video/mp4" />
      </video>
      <div className="text-wrapper">
        <h1>
          Get Ready to Be Captivated: Dive Into a Universe of Unforgettable
          Films
        </h1>
        <Link to="/movies">
          <span className="btn">EXPLORE</span>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
