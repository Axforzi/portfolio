import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typewriter from '../components/Typewriter';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import { featuredProjects } from '../data/projects';

export default function Home() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const initTimer = setTimeout(() => {
      if (window.particlesJS) {
        window.particlesJS({
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#00f2fe" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#4facfe", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
          },
          retina_detect: true
        });
      }
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  const lang = i18n.language?.substring(0, 2) || 'es';
  const cvFile = lang === 'en' ? './files/Maikel_Garcia_CV_EN.pdf' : './files/Maikel_Garcia_CV_ES.pdf';
  const typewriterWords = lang === 'en' ? t('typewriterEn', { returnObjects: true }) : t('typewriter.words', { returnObjects: true });

  return (
    <>
      <div className="welcome">
        <div id="particles-js"></div>
        <div className="container">
          <h1 className="title">Maikel <span className="text-gradient">García</span></h1>
          <h2 className="sub-title">{t('hero.subtitle')}</h2>
          <h2 className="sub-title welcome-specialization">
            {t('hero.specializedIn')} <Typewriter words={typewriterWords} />
          </h2>
          <div className="cv">
            <a href={cvFile} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fa-solid fa-download"></i> {t('hero.downloadCV')}
            </a>
            <Link to="/services" className="btn btn-primary">
              <i className="fa-solid fa-arrow-right"></i> {t('hero.viewServices')}
            </Link>
          </div>
        </div>
      </div>

      <HowItWorks />

      <div className="about container">
        <div className="intro">
          <h2>{t('about.title').split(' ')[0]} <span className="text-gradient">{t('about.title').split(' ').slice(1).join(' ')}</span></h2>
          <div className="description glass-panel">
            <img src="./img/coding.svg" alt={t('about.alt')} />
            <p>{t('about.bio1')}</p>
            <p>{t('about.bio2')}</p>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>

      <div className="skills container">
        <h2><span className="text-gradient">{t('skills.title')}</span> {t('skills.subtitle')}</h2>
        <ul className="container-skills">
          <li className="glass-panel">
            <span>Python & JavaScript</span>
            <div className="img-skills">
              <img src="./img/logos/python-logo.png" alt="Python logo" />
              <img src="./img/logos/javascript-logo.webp" alt="JavaScript logo" />
            </div>
          </li>
          <li className="glass-panel">
            <span>Flask & Django</span>
            <div className="img-skills">
              <img src="./img/logos/django-logo.png" alt="Django logo" />
              <img src="./img/logos/flask.svg" alt="Flask logo" className="img-invert" />
            </div>
          </li>
          <li className="glass-panel">
            <span>{t('skills.databases')}</span>
            <div className="img-skills">
              <img src="./img/logos/mysql-logo.webp" alt="MySQL logo" />
              <img src="./img/logos/mongodb-logo.png" alt="MongoDB logo" />
            </div>
          </li>
        </ul>
      </div>

      <Testimonials />

      <div className="projects container">
        <h2>{t('featuredProjects.title')} <span className="text-gradient">{t('featuredProjects.highlight')}</span></h2>
        <div className="container-projects">
          {featuredProjects.map((project) => (
            <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
              <div className="project glass-panel">
                <div className="container-img">
                  <img src={project.image} alt={project.imageAlt} />
                </div>
                <div className="text">
                  <h2>{project.title}</h2>
                  <p>{lang === 'en' ? project.descriptionEn : project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <Link className="see-more btn btn-outline" to="/projects">
          {t('featuredProjects.seeAll')} <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </>
  );
}
