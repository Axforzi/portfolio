const stats = [
  {
    icon: 'fa-solid fa-globe',
    number: '200+',
    title: 'Sitios web entregados',
    description: 'Desarrollados para empresas y negocios a través del programa Kit Digital en España.',
  },
  {
    icon: 'fa-brands fa-github',
    number: '5+',
    title: 'Proyectos públicos',
    description: 'Aplicaciones web, bots y herramientas open-source disponibles en GitHub.',
  },
  {
    icon: 'fa-solid fa-code',
    number: '+5',
    title: 'Tecnologías dominadas',
    description: 'Python, React, Django, Flask, Web Scraping y bases de datos.',
  },
];

export default function Testimonials() {
  return (
    <section className="stats container">
      <h2>Mi <span className="text-gradient">trabajo</span> habla por mí</h2>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stats-card glass-panel">
            <div className="stats-icon"><i className={s.icon} aria-hidden="true"></i></div>
            <div className="stats-number">{s.number}</div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
