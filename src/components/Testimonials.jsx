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
      icon: 'fa-solid fa-bolt',
      number: '< 24h',
      titleKey: 'stats.fastDelivery',
      descKey: 'stats.fastDeliveryDesc',
    },
    {
      icon: 'fa-solid fa-gauge-high',
      number: '95+',
      titleKey: 'stats.performance',
      descKey: 'stats.performanceDesc',
    },
    {
      icon: 'fa-solid fa-gears',
      number: '100%',
      titleKey: 'stats.automation',
      descKey: 'stats.automationDesc',
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
