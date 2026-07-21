import { useTranslation } from 'react-i18next';
import { webPlans, customServices } from '../data/services';

export default function Services({ openModal }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.substring(0, 2) || 'es';

  return (
    <>
      <section className="services-hero">
        <h1 className="text-gradient">{t('services.title')}</h1>
        <p>{t('services.heroDesc')}</p>
        <p className="response-time"><i className="fa-solid fa-bolt" aria-hidden="true"></i> {t('services.responseTime')}</p>
      </section>

      <section className="plans-section" aria-labelledby="plans-title">
        <h2 id="plans-title">{t('services.plansTitle')}</h2>
        <div className="plans-grid">
          {webPlans.map((plan) => {
            const planName = lang === 'en' ? plan.nameEn : plan.name;
            const planFeatures = lang === 'en' ? plan.featuresEn : plan.features;
            return (
              <article key={plan.id} className={`plan-card${plan.featured ? ' featured' : ''}`}>
                {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                <div className="plan-icon" aria-hidden="true"><i className={plan.icon}></i></div>
                <h3>{planName}</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  {plan.suffix && <span className="suffix">{plan.suffix}</span>}
                </div>
                {plan.note && <p className="plan-note">{plan.note}</p>}
                <ul className="plan-features" aria-label={t('services.plansTitle')}>
                  {planFeatures.map((feature, i) => (
                    <li key={i}><i className="fa-solid fa-check" aria-hidden="true"></i> {feature}</li>
                  ))}
                </ul>
                <button
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-select`}
                  onClick={() => openModal(planName, plan.price)}
                  aria-label={t('services.choosePlan')}
                >
                  {t('services.choosePlan')}
                  {plan.featured && <i className="fa-solid fa-bolt plan-bolt-icon"></i>}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="hourly-section" aria-labelledby="hourly-title">
        <h2 id="hourly-title">{t('services.customTitle')}</h2>
        <div className="hourly-grid">
          {customServices.map((service) => {
            const serviceName = lang === 'en' ? service.nameEn : service.name;
            const serviceDesc = lang === 'en' ? service.descriptionEn : service.description;
            const servicePrice = lang === 'en' ? (service.priceRangeEn || t('services.fallbackPrice')) : (service.priceRange || t('services.fallbackPrice'));
            return (
              <article
                key={service.id}
                className="hourly-card"
                role="button"
                tabIndex="0"
                onClick={() => openModal(service.modalName, 0)}
                onKeyDown={(e) => { if (e.key === 'Enter') openModal(service.modalName, 0); }}
                aria-label={t('services.request')}
              >
                <div className="plan-icon" aria-hidden="true"><i className={service.icon}></i></div>
                <h3>{serviceName}</h3>
                <p>{serviceDesc}</p>
                <span className="hourly-price">{servicePrice}</span>
                <button className="btn btn-outline btn-select">{t('services.request')}</button>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
