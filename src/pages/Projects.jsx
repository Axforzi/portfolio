import { useTranslation } from 'react-i18next';
import { allProjects, wordpressSites } from '../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.substring(0, 2) || 'es';

  return (
    <>
      <section className="projects-hero">
        <h1 className="text-gradient">{t('projectsPage.title')}</h1>
        <p>{t('projectsPage.subtitle')}</p>
      </section>

      <div className="container-projects">
        {allProjects.map((project) => (
          <article key={project.id} className="project glass-panel">
            <div className="container-img">
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text">
              <h2>
                <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a>
              </h2>
              <p>{lang === 'en' ? project.descriptionEn : project.description}</p>
              <div className="project-actions">
                <a className="project-action" href={project.url} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github" aria-hidden="true"></i>
                  {t('projectsPage.viewRepo')}
                </a>
                {project.demo && (
                  <a className="project-action project-action-demo" href={project.demo} target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    {t('projectsPage.visitSite')}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="wordpress-projects">
        <div className="case-study-header">
          <span className="case-study-tag">
            <i className="fa-solid fa-chart-line" aria-hidden="true"></i> {t('projectsPage.caseStudyLabel')}
          </span>
        </div>

        <div className="case-study-metrics">
          <div className="cs-metric-card glass-panel">
            <span className="cs-metric-num">200+</span>
            <span className="cs-metric-label">{t('projectsPage.metric1')}</span>
          </div>
          <div className="cs-metric-card glass-panel">
            <span className="cs-metric-num">95+</span>
            <span className="cs-metric-label">{t('projectsPage.metric2')}</span>
          </div>
          <div className="cs-metric-card glass-panel">
            <span className="cs-metric-num">&lt; 15d</span>
            <span className="cs-metric-label">{t('projectsPage.metric3')}</span>
          </div>
        </div>

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
