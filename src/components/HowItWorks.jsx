import { Link } from 'react-router-dom';

const steps = [
  {
    number: '1',
    icon: 'fa-solid fa-comments',
    title: 'Cuéntame tu proyecto',
    description: 'Llena el formulario con tu idea y lo que necesitas. No importa si no tienes todos los detalles.',
  },
  {
    number: '2',
    icon: 'fa-solid fa-file-invoice',
    title: 'Te doy una propuesta',
    description: 'Te contacto en menos de 24 horas con un plan claro, presupuesto y plazos.',
  },
  {
    number: '3',
    icon: 'fa-solid fa-rocket',
    title: 'Construimos tu web',
    description: 'Desarrollo, revisiones, ajustes y entrega final. Siempre contigo en el proceso.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works container">
      <h2>Cómo <span className="text-gradient">funciona</span></h2>
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
        Ver planes y precios <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </section>
  );
}
