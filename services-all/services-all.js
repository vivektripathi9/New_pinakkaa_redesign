document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('servicesAllGrid');
  if (!grid) return;

  // servicesData is declared in services-pages/services-pages.js
  if (!Array.isArray(window.servicesData)) return;
  const serviceSlugMap = {
    'website-designing': 'website-designing-agency-in-bangalore',
    'seo-digital-marketing': 'seo-company-in-bangalore',
    'social-media-optimization': 'social-media-optimization-services-bangalore',
    'online-reputation-management': 'orm-services-in-bangalore',
    'search-engine-marketing': 'search-engine-marketing-agency-bangalore',
    'social-media-marketing': 'social-media-marketing-company-in-bangalore',
    'branding-rebranding': 'branding-rebranding-agency-bangalore',
    'display-advertising': 'display-advertising-agency-bangalore',
    'ecommerce-solutions': 'ecommerce-marketing-agency-bangalore',
    'pr-marketing-services': 'pr-and-marketing-agency-bangalore',
    'software-development': 'software-development-company-bangalore',
    'api-integration': 'api-integration-services-bangalore',
    'email-marketing': 'email-marketing-company-in-bangalore',
    'sms-marketing': 'sms-marketing-company-in-bangalore',
    'whatsapp-marketing': 'whatsapp-marketing-services-bangalore',
    'shopify-website-development': 'shopify-website-development-services-in-bangalore'
  };
  const getServiceUrl = (id) => {
    const slug = serviceSlugMap[id];
    return slug ? `${slug}.html` : `service-detail.html?service=${encodeURIComponent(id)}`;
  };

  const fragment = document.createDocumentFragment();

  window.servicesData.forEach((svc) => {
    const link = document.createElement('a');
    link.href = getServiceUrl(svc.id);
    link.className = 'services-all-card';

    const media = document.createElement('div');
    media.className = 'services-all-card-media';
    const img = document.createElement('img');
    img.src = svc.image || 'components/142846.webp';
    img.alt = svc.title || 'Service';
    img.loading = 'lazy';
    img.decoding = 'async';
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'services-all-card-body';
    const title = document.createElement('h3');
    title.className = 'services-all-card-title section-title';
    title.textContent = svc.title || 'Service';
    const desc = document.createElement('p');
    desc.className = 'services-all-card-desc section-para';
    desc.textContent = svc.shortDescription || 'Learn more about this service.';
    body.appendChild(title);
    body.appendChild(desc);

    link.appendChild(media);
    link.appendChild(body);
    fragment.appendChild(link);
  });

  grid.appendChild(fragment);
});

