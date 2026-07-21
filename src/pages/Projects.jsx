import { allProjects, wordpressSites } from '../data/projects';

export default function Projects() {
  return (
    <>
      <h1 className="text-gradient" style={{paddingTop: 60}}>PROYECTOS</h1>

      <div className="container-projects">
        {allProjects.map((project) => (
          <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
            <div className="project glass-panel">
              <div className="container-img">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  style={project.imageInvert ? { filter: 'brightness(0) invert(1)' } : undefined}
                />
              </div>
              <div className="text">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <section className="wordpress-projects">
        <details className="wp-list">
          <summary>Otros Proyectos (WordPress) — Trabajos en Clinmedia</summary>
          <div className="wp-content">
            <p>
              Estos son algunos de los sitios web realizados en WordPress durante mi participación en Clinmedia como parte del programa <strong className="text-main">Kit Digital en España</strong>. Demostrando mi versatilidad como desarrollador Full-Stack, trabajé exitosamente en el maquetado, diseño UI, implementación y mantenimiento de los siguientes corporativos:
            </p>
            <ul>
              {wordpressSites.map((site) => (
                <li key={site.url}>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </section>
    </>
  );
}
