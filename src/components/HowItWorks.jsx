import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      number: '1',
      icon: 'fa-solid fa-comments',
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
    },
    {
      number: '2',
      icon: 'fa-solid fa-file-invoice',
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
    },
    {
      number: '3',
      icon: 'fa-solid fa-rocket',
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
    },
  ];

  return (
    <section className="how-it-works container">
      <h2>{t('howItWorks.title')}</h2>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={i} className="step-card glass-panel">
            <div className="step-number">{step.number}</div>
            <div className="step-icon"><i className={step.icon} aria-hidden="true"></i></div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
      <Link to="/services" className="see-more btn btn-outline">
        {t('howItWorks.viewPlans')} <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </section>
  );
}
