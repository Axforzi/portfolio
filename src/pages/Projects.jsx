import { useTranslation } from 'react-i18next';
import { allProjects, wordpressSites } from '../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.substring(0, 2) || 'es';

  return (
    <>
      <h1 className="text-gradient" style={{paddingTop: 60}}>{t('projectsPage.title')}</h1>

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
                <p>{lang === 'en' ? project.descriptionEn : project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <section className="wordpress-projects">
        <details className="wp-list">
          <summary>{t('projectsPage.wpSummary')}</summary>
          <div className="wp-content">
            <p>
              {t('projectsPage.wpDesc1')} <strong className="text-main">{t('projectsPage.wpKitDigital')}</strong>{t('projectsPage.wpDesc2')}
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
