import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <header className="menu">
      <nav aria-label={t('nav.ariaLabel')}>
        <ul className="menu-elements">
          <li className="menu-element">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className="fa-solid fa-home" aria-hidden="true"></i> {t('nav.home')}
            </NavLink>
          </li>
          <li className="menu-element">
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className="fa-solid fa-briefcase" aria-hidden="true"></i> {t('nav.projects')}
            </NavLink>
          </li>
          <li className="menu-element">
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className="fa-solid fa-laptop-code" aria-hidden="true"></i> {t('nav.services')}
            </NavLink>
          </li>
          <li className="menu-element">
            <button onClick={toggleLang} className="lang-toggle" aria-label="Toggle language" style={{marginTop: 2, padding: "7px 12px"}}>
              {i18n.language === 'es' ? '🇪🇸' : '🇬🇧'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
