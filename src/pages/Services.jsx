import { webPlans, customServices } from '../data/services';

export default function Services({ openModal }) {
  return (
    <>
      <section className="services-hero">
        <h1 className="text-gradient">Servicios Freelance</h1>
        <p>Desarrollo web, scraping y automatización a tu medida. Precios claros, comunicación directa y código de altisima calidad.</p>
        <p className="response-time"><i className="fa-solid fa-bolt" aria-hidden="true"></i> Respondo en menos de 24 horas</p>
      </section>

      <section className="plans-section" aria-labelledby="plans-title">
        <h2 id="plans-title">Planes de <span className="text-gradient">Desarrollo Web</span></h2>
        <div className="plans-grid">
          {webPlans.map((plan) => (
            <article key={plan.id} className={`plan-card${plan.featured ? ' featured' : ''}`}>
              {plan.badge && <span className="plan-badge">{plan.badge}</span>}
              <div className="plan-icon" aria-hidden="true"><i className={plan.icon}></i></div>
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                {plan.suffix && <span className="suffix">{plan.suffix}</span>}
              </div>
              {plan.note && <p className="plan-note">{plan.note}</p>}
              <ul className="plan-features" aria-label={`Características del plan ${plan.name}`}>
                {plan.features.map((feature, i) => (
                  <li key={i}><i className="fa-solid fa-check" aria-hidden="true"></i> {feature}</li>
                ))}
              </ul>
              <button
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-select`}
                onClick={() => openModal(plan.name, plan.price)}
                aria-label={`Elegir plan ${plan.name} por $${plan.price}`}
              >
                Elegir plan
                {plan.featured && <i className="fa-solid fa-bolt plan-bolt-icon"></i>}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="hourly-section" aria-labelledby="hourly-title">
        <h2 id="hourly-title">Servicios a <span className="text-gradient">Medida</span></h2>
        <div className="hourly-grid">
          {customServices.map((service) => (
            <article
              key={service.id}
              className="hourly-card"
              role="button"
              tabIndex="0"
              onClick={() => openModal(service.modalName, 0)}
              onKeyDown={(e) => { if (e.key === 'Enter') openModal(service.modalName, 0); }}
              aria-label={`Solicitar servicio de ${service.name}`}
            >
              <div className="plan-icon" aria-hidden="true"><i className={service.icon}></i></div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span className="hourly-price">{service.priceRange || 'Presupuesto a convenir'}</span>
              <button className="btn btn-outline btn-select">Solicitar</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
