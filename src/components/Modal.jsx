import { useState, useEffect } from 'react';

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/mzdjlvgn';

export default function Modal({ isOpen, closeModal, planName, planPrice }) {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const priceDisplay = planPrice === 0 ? 'A convenir' : `$${planPrice}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.target;
    const body = {
      plan: planName,
      precio: priceDisplay,
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      descripcion: form.descripcion.value.trim(),
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        const msg = (data.errors && data.errors.map(err => err.message).join(', ')) || 'Error al enviar.';
        setErrorMsg(msg);
        setStatus('error');
      }
    } catch {
      setErrorMsg('Error de red. Verifica tu conexión e inténtalo de nuevo.');
      setStatus('error');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal-box glass-panel">
        <button className="modal-close" onClick={closeModal} aria-label="Cerrar modal">&times;</button>

        {status !== 'success' ? (
          <>
            <div className="modal-plan-badge">
              <i className="fa-solid fa-code" aria-hidden="true"></i>
              <span>{planName}</span> &mdash; <strong>{priceDisplay}</strong>
            </div>
            <h2>Iniciemos tu <span className="text-gradient">Proyecto</span></h2>
            <p className="modal-subtitle">Llena estos datos y me comunicaré contigo en tiempo récord.</p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="field-name">Tu nombre / Empresa</label>
                <input type="text" id="field-name" name="nombre" placeholder="Ej: Carlos Rodríguez" required />
              </div>
              <div className="form-group">
                <label htmlFor="field-email">Tu email</label>
                <input type="email" id="field-email" name="email" placeholder="tu@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="field-description">Descripción detallada</label>
                <textarea id="field-description" name="descripcion" placeholder="Coméntame qué necesitas solucionar o construir, referencias y plazos." required></textarea>
              </div>

              {errorMsg && <p className="form-error">{errorMsg}</p>}

              <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'submitting'}>
                <span>{status === 'submitting' ? 'Enviando...' : 'Enviar detalles de inmediato'}</span>
                {status === 'submitting' && <i className="fa-solid fa-spinner fa-spin btn-submit-spinner"></i>}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success active">
            <div className="success-icon"><i className="fa-solid fa-check"></i></div>
            <h3 className="modal-success-title">¡Datos recibidos con éxito!</h3>
            <p className="modal-success-text">
              Me comunicaré contigo desde <strong>garcia.maikelr@gmail.com</strong> en menos de <strong>24 horas</strong>.
            </p>
            <p className="modal-success-text">
              Mientras tanto, ¿quieres ver mis trabajos anteriores?
            </p>
            <a href="/#/projects" className="btn btn-primary btn-close-full">
              <i className="fa-solid fa-arrow-right"></i> Ver proyectos
            </a>
            <button className="btn btn-outline btn-close-full" onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}
