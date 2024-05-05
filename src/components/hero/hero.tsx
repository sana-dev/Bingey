import './Hero.css';
import bgImage from './images/video.mp4';

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
        <button className="btn">
          <span>EXPLORE</span>
        </button>
      </div>
    </section>
  );
}

export default Hero;
