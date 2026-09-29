import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Modal from './components/Modal.jsx'

import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Services from './pages/Services.jsx'
import NotFound from './pages/NotFound.jsx'

// Route pathname -> i18n key suffix under `meta`. Anything missing falls through
// to the 404 copy, which is exactly what the catch-all Route renders.
const META_ROUTES = {
  '/': 'home',
  '/projects': 'projects',
  '/services': 'services',
}

function App() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [modalData, setModalData] = useState({ isOpen: false, planName: '', planPrice: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Per-route title and description. No react-helmet (zero new dependencies), so
  // the two values are written onto the document by hand. The description tag is
  // looked up and never created, so a route or language change updates the
  // existing <meta> instead of appending a duplicate.
  useEffect(() => {
    // This map has to agree with <Routes>, and the router is more forgiving than a
    // plain object lookup: matchRoutes() is case-insensitive and treats a trailing
    // slash as a match. Without this, "/PROJECTS/" would render the Projects page
    // under a "page not found" title.
    const raw = location.pathname;
    const path = (raw === '/' ? '/' : raw.replace(/\/+$/, '')).toLowerCase();
    const route = META_ROUTES[path] || 'notFound';

    document.title = t(`meta.${route}.title`);
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', t(`meta.${route}.description`));
    }
  }, [location.pathname, i18n.language]);

  const openModal = (planName, planPrice) => {
    setModalData({ isOpen: true, planName, planPrice });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  // Determine class for main based on route
    // 'container' is deliberately absent here. Its `padding: 0 1.5rem`
    // shorthand has specificity (0,1,0) and outranks `main { padding-top: 80px }`
    // at (0,0,1), so putting both on the same element silently zeroed the
    // fixed-header clearance and the page title tucked under the header.
    // Horizontal gutters are owned by .projects-hero and .container-projects
    // instead, exactly as .services-hero and .plans-section own theirs.
    const mainClass = location.pathname === '/projects' ? 'projects-main' : 
                      location.pathname === '/services' ? 'services-main' : '';

  return (
    <>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      
      <a className="skip-link" href="#main-content">{t('nav.skipToContent')}</a>

      <Header />
      
      <main id="main-content" className={mainClass} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services openModal={openModal} />} />
          {/* Without this, an unmatched path renders an empty <main>. Now that real
              URLs exist, a typo or a stale link can reach the router. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Modal 
        isOpen={modalData.isOpen} 
        closeModal={closeModal} 
        planName={modalData.planName} 
        planPrice={modalData.planPrice} 
      />
    </>
  )
}

export default App
