export const webPlans = [
  {
    id: 'basic',
    name: 'Web Básica',
    price: 100,
    icon: 'fa-solid fa-rocket',
    features: [
      '1 abstract 3 páginas',
      'Diseño responsive impecable',
      'HTML, CSS y JavaScript modernos',
      'Formulario de contacto nativo',
      '⏱️ Entrega garantizada en máximo 7 días',
    ],
  },
  {
    id: 'medium',
    name: 'Web Media',
    price: 250,
    icon: 'fa-solid fa-layer-group',
    featured: true,
    badge: 'Popular',
    features: [
      '4 a 7 páginas premium',
      'Componentes dinámicos interactivos',
      'Base de datos + API Restful',
      'Panel de administración custom',
      '⏱️ Entrega garantizada en máximo 15 días',
    ],
  },
  {
    id: 'advanced',
    name: 'Web Avanzada',
    price: 500,
    suffix: '+',
    icon: 'fa-solid fa-code',
    note: 'Presupuesto ajustado según complejidad.',
    features: [
      '8+ páginas o Web App tipo SaaS',
      'Autenticación de usuarios Segura',
      'CMS, Dashboard o Arquitectura SPA',
      'Integraciones de terceros (Pagos, IA)',
      '⏱️ Plazo personalizado según alcance',
    ],
  },
];

export const customServices = [
  {
    id: 'scraping',
    name: 'Scraping & Scripts',
    modalName: 'Scraping / Automatización',
    icon: 'fa-solid fa-spider',
    description: 'Extracción de datos complejos de sitios web, bots automatizados para Telegram/Discord y scripts de utilidades a medida creados en Python puro.',
    priceRange: 'Desde $50',
  },
  {
    id: 'maintenance',
    name: 'Mantenimiento & Fixes',
    modalName: 'Arreglos / Mantenimiento Web',
    icon: 'fa-solid fa-wrench',
    description: 'Depuración de errores (Bugs) Frontend/Backend, mejoras drásticas de rendimiento para Core Web Vitals, refactorización y despliegue de VPS.',
    priceRange: 'Desde $30',
  },
];
