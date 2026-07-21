import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Modal from './components/Modal.jsx'

import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Services from './pages/Services.jsx'

function App() {
  const location = useLocation();
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
      
      <Header />
      
      <main id="main-content" className={mainClass}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services openModal={openModal} />} />
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
