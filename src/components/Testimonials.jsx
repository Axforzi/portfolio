import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: 'fa-solid fa-globe',
      number: '200+',
      titleKey: 'stats.sitesDelivered',
      descKey: 'stats.sitesDesc',
    },
    {
      icon: 'fa-brands fa-github',
      number: '5+',
      titleKey: 'stats.publicProjects',
      descKey: 'stats.projectsDesc',
    },
    {
      icon: 'fa-solid fa-code',
      number: '+5',
      titleKey: 'stats.techMastered',
      descKey: 'stats.techDesc',
    },
  ];

  return (
    <section className="stats container">
      <h2>{t('stats.heading')}</h2>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stats-card glass-panel">
            <div className="stats-icon"><i className={s.icon} aria-hidden="true"></i></div>
            <div className="stats-number">{s.number}</div>
            <h3>{t(s.titleKey)}</h3>
            <p>{t(s.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
