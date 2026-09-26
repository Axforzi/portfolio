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

function App() {
  const location = useLocation();
  const { t } = useTranslation();
  const [modalData, setModalData] = useState({ isOpen: false, planName: '', planPrice: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openModal = (planName, planPrice) => {
    setModalData({ isOpen: true, planName, planPrice });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  // Determine class for main based on route
  const mainClass = location.pathname === '/projects' ? 'projects-main container' : 
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
