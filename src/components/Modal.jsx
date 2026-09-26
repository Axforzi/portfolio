import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/mzdjlvgn';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ isOpen, closeModal, planName, planPrice }) {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const closeModalRef = useRef(closeModal);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    closeModalRef.current = closeModal;
  });

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeModalRef.current(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen]);

  // Move focus into the dialog, restore it on close and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement;
    if (dialogRef.current) dialogRef.current.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      const lastFocused = lastFocusedRef.current;
      if (lastFocused && typeof lastFocused.focus === 'function' && document.contains(lastFocused)) {
        lastFocused.focus();
      }
    };
  }, [isOpen]);

  const handleDialogKeyDown = (e) => {
    if (e.key !== 'Tab') return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      if (active === first || !dialog.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !dialog.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  const priceDisplay = planPrice === 0 ? t('modal.customPrice') : `$${planPrice}`;

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
        const msg = (data.errors && data.errors.map(err => err.message).join(', ')) || t('modal.errorSend');
        setErrorMsg(msg);
        setStatus('error');
      }
    } catch {
      setErrorMsg(t('modal.errorNetwork'));
      setStatus('error');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div
        className="modal-box glass-panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <button className="modal-close" onClick={closeModal} aria-label={t('modal.closeAria')}>&times;</button>

        {status !== 'success' ? (
          <>
            <div className="modal-plan-badge">
              <i className="fa-solid fa-code" aria-hidden="true"></i>
              <span>{planName}</span> &mdash; <strong>{priceDisplay}</strong>
            </div>
            <h2 id="modal-title">{t('modal.startProject')}</h2>
            <p className="modal-subtitle">{t('modal.subtitle')}</p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="field-name">{t('modal.nameLabel')}</label>
                <input type="text" id="field-name" name="nombre" placeholder={t('modal.namePlaceholder')} required />
              </div>
              <div className="form-group">
                <label htmlFor="field-email">{t('modal.emailLabel')}</label>
                <input type="email" id="field-email" name="email" placeholder={t('modal.emailPlaceholder')} required />
              </div>
              <div className="form-group">
                <label htmlFor="field-description">{t('modal.descLabel')}</label>
                <textarea id="field-description" name="descripcion" placeholder={t('modal.descPlaceholder')} required></textarea>
              </div>

              {errorMsg && <p className="form-error">{errorMsg}</p>}

              <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'submitting'}>
                <span>{status === 'submitting' ? t('modal.sending') : t('modal.submitBtn')}</span>
                {status === 'submitting' && <i className="fa-solid fa-spinner fa-spin btn-submit-spinner"></i>}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success active">
            <div className="success-icon"><i className="fa-solid fa-check"></i></div>
            <h3 id="modal-title" className="modal-success-title">{t('modal.successTitle')}</h3>
            <p className="modal-success-text">
              {t('modal.successMsg1')} <strong>garcia.maikelr@gmail.com</strong> {t('modal.successMsg2')} <strong>24</strong> {t('modal.successMsg3')}.
            </p>
            <p className="modal-success-text">
              {t('modal.successMsg4')}
            </p>
            <Link to="/projects" className="btn btn-primary btn-close-full">
              <i className="fa-solid fa-arrow-right"></i> {t('modal.viewProjects')}
            </Link>
            <button className="btn btn-outline btn-close-full" onClick={closeModal}>{t('modal.close')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
