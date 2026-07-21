import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="menu">
      <nav aria-label="Navegación principal">
        <ul className="menu-elements">
          <li className="menu-element">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className="fa-solid fa-home" aria-hidden="true"></i> INICIO
            </NavLink>
          </li>
          <li className="menu-element">
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className="fa-solid fa-briefcase" aria-hidden="true"></i> PROYECTOS
            </NavLink>
          </li>
          <li className="menu-element">
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className="fa-solid fa-laptop-code" aria-hidden="true"></i> SERVICIOS
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
